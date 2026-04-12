// =============================================
// SISTEMA DE CONQUISTAS — TOCA DO COELHO
// =============================================

const TIER_COLOR = {
    bronze: { bg: '#2d1e0e', border: '#cd7f32', label: '#cd7f32', icon: '🥉' },
    silver: { bg: '#1a1e2d', border: '#c0c0c0', label: '#c0c0c0', icon: '🥈' },
    gold: { bg: '#2d2700', border: '#ffd700', label: '#ffd700', icon: '🥇' },
    platinum: { bg: '#0d1a2d', border: '#a8d8ea', label: '#a8d8ea', icon: '💎' },
    mythic: { bg: '#1c0a2b', border: '#9b59b6', label: '#e056fd', icon: '🌌' },
};

// ─── Definição das 15 Conquistas ─────────────────────────────────────────────
const ACHIEVEMENTS = [
    // ── COMBATE ─────────────────────────────────────────────
    {
        id: 'first_blood',
        name: 'Primeira Sangue',
        desc: 'Elimine seu primeiro inimigo',
        category: '⚔️ Combate',
        tier: 'bronze',
        check: s => s.kills >= 1,
    },
    {
        id: 'hunter',
        name: 'Caçador',
        desc: 'Elimine 25 inimigos em uma run',
        category: '⚔️ Combate',
        tier: 'bronze',
        check: s => s.kills >= 25,
    },
    {
        id: 'reaper',
        name: 'Ceifeiro',
        desc: 'Elimine 75 inimigos em uma run',
        category: '⚔️ Combate',
        tier: 'silver',
        check: s => s.kills >= 75,
    },
    {
        id: 'relentless',
        name: 'Implacável',
        desc: 'Elimine 150 inimigos em uma run',
        category: '⚔️ Combate',
        tier: 'gold',
        check: s => s.kills >= 150,
    },

    // ── HABILIDADES ─────────────────────────────────────────
    {
        id: 'power_awakened',
        name: 'Poder Desperto',
        desc: 'Use sua habilidade especial pela primeira vez',
        category: '✨ Habilidades',
        tier: 'bronze',
        check: s => s.abilitiesUsed >= 1,
    },
    {
        id: 'specialist',
        name: 'Especialista',
        desc: 'Use sua habilidade especial 15 vezes em uma run',
        category: '✨ Habilidades',
        tier: 'silver',
        check: s => s.abilitiesUsed >= 15,
    },

    // ── EXPLORAÇÃO ──────────────────────────────────────────
    {
        id: 'first_floor',
        name: 'Explorador',
        desc: 'Complete o primeiro andar',
        category: '🗺️ Exploração',
        tier: 'bronze',
        check: s => s.floorsCleared >= 1,
    },
    {
        id: 'pathfinder',
        name: 'Desbravador',
        desc: 'Complete 3 andares em uma run',
        category: '🗺️ Exploração',
        tier: 'silver',
        check: s => s.floorsCleared >= 3,
    },

    // ── CHEFES ──────────────────────────────────────────────
    {
        id: 'boss_hunter',
        name: 'Caçador de Chefes',
        desc: 'Derrote seu primeiro Boss',
        category: '👑 Chefes',
        tier: 'silver',
        check: s => s.bossKills >= 1,
    },
    {
        id: 'boss_no_dmg',
        name: 'Invulnerável',
        desc: 'Derrote um Boss sem sofrer dano',
        category: '👑 Chefes',
        tier: 'gold',
        check: s => s.bossKillNoDmg >= 1,
    },

    // ── SOBREVIVÊNCIA ────────────────────────────────────────
    {
        id: 'floor_no_dmg',
        name: 'Intocável',
        desc: 'Complete um andar inteiro sem tomar dano',
        category: '🛡️ Sobrevivência',
        tier: 'gold',
        check: s => s.floorNoDmg >= 1,
    },
    {
        id: 'rich',
        name: 'Milionário',
        desc: 'Acumule 500 de ouro em uma run',
        category: '🛡️ Sobrevivência',
        tier: 'gold',
        check: s => s.goldCollected >= 500,
    },

    // ── LOJA ────────────────────────────────────────────────
    {
        id: 'golden_era',
        name: 'A Era de Ouro',
        desc: 'Compre o total de 50 itens na loja (Acumulativo em várias partidas)',
        category: '🏪 Loja',
        tier: 'gold',
        check: (s, gs) => gs && gs.itemsBought >= 50,
    },

    // ── VITÓRIA ─────────────────────────────────────────────
    {
        id: 'winner',
        name: 'Vencedor',
        desc: 'Complete o jogo e escape da toca!',
        category: '🏆 Vitória',
        tier: 'gold',
        check: s => s.gameWon >= 1,
    },
    {
        id: 'nightmare_clear',
        name: 'Lendário',
        desc: 'Complete o jogo no modo Pesadelo',
        category: '🏆 Vitória',
        tier: 'platinum',
        check: s => s.nightmareWon >= 1,
    },
    {
        id: 'impossible_clear',
        name: 'Impossível',
        desc: 'Complete o jogo no Pesadelo (Jornada Longa) sem tomar dano',
        category: '🏆 Vitória',
        tier: 'mythic',
        check: s => s.impossibleWon >= 1,
    },
    {
        id: 'speed_demon',
        name: 'Velocista Supremo',
        desc: 'Escape da Toca e vença o jogo em menos de 8 minutos!',
        category: '🏆 Vitória',
        tier: 'platinum',
        check: s => s.gameWon >= 1 && (typeof gameTime !== 'undefined' && gameTime < 480),
    },
    {
        id: 'ghost_runner',
        name: 'Fantasma',
        desc: 'Complete o jogo eliminando menos de 20 inimigos totais',
        category: '🏆 Vitória',
        tier: 'platinum',
        check: s => s.gameWon >= 1 && s.kills <= 20,
    },
];

// ─── Estado: estatísticas da run atual ───────────────────────────────────────
let runStats = {
    kills: 0,
    abilitiesUsed: 0,
    floorsCleared: 0,
    bossKills: 0,
    bossKillNoDmg: 0,
    floorNoDmg: 0,
    goldCollected: 0,
    itemsBought: 0,
    gameWon: 0,
    nightmareWon: 0,
    impossibleWon: 0,
    speedWon: 0,
    pacifistWon: 0,
};

// ─── Estado: estatísticas globais persistentes ──────────────────────────────
function getGlobalStats() {
    try {
        let stats = JSON.parse(localStorage.getItem('tdc_global_stats') || '{"itemsBought":0, "totalBossKills":0, "totalGamesWon":0}');
        // Assegurar que campos novos existam
        if (stats.totalBossKills === undefined) stats.totalBossKills = 0;
        if (stats.totalGamesWon === undefined) stats.totalGamesWon = 0;
        return stats;
    } catch { return { itemsBought: 0, totalBossKills: 0, totalGamesWon: 0 }; }
}
function saveGlobalStats(stats) {
    localStorage.setItem('tdc_global_stats', JSON.stringify(stats));
}

// Rastrear flags temporárias
let _bossStartNoDmg = false;  // true se o jogador não tomou dano desde que entrou na sala do boss
let _floorStartNoDmg = false; // true se o jogador não tomou dano neste andar

function resetRunStats() {
    for (const k of Object.keys(runStats)) runStats[k] = 0;
    _bossStartNoDmg = true;
    _floorStartNoDmg = true;
}

// ─── Persistência via localStorage ───────────────────────────────────────────
function getUnlockedSet() {
    try {
        return new Set(JSON.parse(localStorage.getItem('tdc_achievements') || '[]'));
    } catch { return new Set(); }
}
function saveUnlocked(set) {
    localStorage.setItem('tdc_achievements', JSON.stringify([...set]));
}

// ─── Verificação e desbloqueio ────────────────────────────────────────────────
function checkAchievements() {
    if (typeof cheatsUsed !== 'undefined' && cheatsUsed) return;
    const unlocked = getUnlockedSet();
    const gs = getGlobalStats();
    for (const ach of ACHIEVEMENTS) {
        if (!unlocked.has(ach.id) && ach.check(runStats, gs)) {
            unlocked.add(ach.id);
            saveUnlocked(unlocked);
            showAchievementToast(ach);

            // Desbloqueio de personagens secretos atrelados a conquistas
            let charUnlocked = false;
            if (ach.id === 'speed_demon') { localStorage.setItem('toca_char20', 'true'); charUnlocked = true; }
            if (ach.id === 'golden_era') { localStorage.setItem('toca_char21', 'true'); charUnlocked = true; }
            if (ach.id === 'impossible_clear') { localStorage.setItem('toca_char22', 'true'); charUnlocked = true; }
            
            // Personagem 23: 200 chefes e 50 vitórias (Verificação global)
            let globals = getGlobalStats();
            if (globals.totalBossKills >= 200 && globals.totalGamesWon >= 50) {
                if (localStorage.getItem('toca_char23') !== 'true') {
                    localStorage.setItem('toca_char23', 'true');
                    charUnlocked = true;
                }
            }

            if (ach.id === 'ghost_runner') { localStorage.setItem('toca_char24', 'true'); charUnlocked = true; }

            if (charUnlocked && typeof initSecretCharacters === 'function') {
                initSecretCharacters();
            }
        }
    }
}

// ─── Toast de conquista (canto superior esquerdo) ─────────────────────────────
let toastQueue = [];
let toastShowing = false;

function showAchievementToast(ach) {
    toastQueue.push(ach);
    if (!toastShowing) processToastQueue();
}

function processToastQueue() {
    if (toastQueue.length === 0) { toastShowing = false; return; }
    toastShowing = true;
    const ach = toastQueue.shift();
    const t = TIER_COLOR[ach.tier];

    const el = document.createElement('div');
    el.className = 'ach-toast';
    el.style.cssText = `
        position: fixed;
        top: 16px;
        left: 16px;
        z-index: 99999;
        background: ${t.bg};
        border: 2px solid ${t.border};
        border-radius: 10px;
        padding: 12px 18px;
        min-width: 260px;
        max-width: 340px;
        box-shadow: 0 0 18px ${t.border}88, 0 4px 12px #0008;
        font-family: 'VT323', monospace;
        opacity: 0;
        transform: translateX(-120%);
        transition: transform 0.4s cubic-bezier(.22,1,.36,1), opacity 0.3s ease;
        pointer-events: none;
        backdrop-filter: blur(4px);
    `;

    el.innerHTML = `
        <div style="font-size:0.85rem; color:${t.label}; letter-spacing:1px; margin-bottom:2px; opacity:0.8;">
            ${t.icon} CONQUISTA DESBLOQUEADA &bull; <span style="text-transform:uppercase;">${ach.category}</span>
        </div>
        <div style="font-size:1.5rem; color:#fff; font-weight:bold; line-height:1.1;">${ach.name}</div>
        <div style="font-size:1.05rem; color:#b2bec3; margin-top:3px;">${ach.desc}</div>
        <div style="margin-top:6px; height:3px; background:${t.border}44; border-radius:2px; overflow:hidden;">
            <div style="height:100%; background:${t.border}; width:100%; animation: ach-bar 3.5s linear forwards;"></div>
        </div>
    `;

    // Injetar keyframe da barra de progresso se ainda não existir
    if (!document.getElementById('ach-style')) {
        const style = document.createElement('style');
        style.id = 'ach-style';
        style.textContent = `
            @keyframes ach-bar { from { width:100%; } to { width:0%; } }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(el);

    // Animar entrada
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
        });
    });

    // Animar saída após 4s
    setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-120%)';
        setTimeout(() => {
            el.remove();
            setTimeout(processToastQueue, 300);
        }, 400);
    }, 4000);
}

// ─── Hooks públicos (chamados pelo game.js) ───────────────────────────────────

/** Chamado quando um inimigo qualquer é eliminado */
function onEnemyKilled(enemyType) {
    runStats.kills++;
    if (enemyType === 'boss') {
        runStats.bossKills++;
        
        // Tracking global para Personagem 23
        let gs = getGlobalStats();
        gs.totalBossKills = (gs.totalBossKills || 0) + 1;
        saveGlobalStats(gs);

        if (_bossStartNoDmg) runStats.bossKillNoDmg++;
        _bossStartNoDmg = true; // reseta para o próximo boss
    }

    // Flag para o Necromante (Personagem 23)
    if (typeof player !== 'undefined' && player.charType === 23) {
        player.hasKilledSinceAbility = true;
    }

    checkAchievements();
}

/** Chamado quando o jogador usa uma habilidade (Q) */
function onAbilityUsed() {
    runStats.abilitiesUsed++;
    checkAchievements();
}

/** Chamado ao completar um andar (ir para o próximo nível) */
function onFloorCleared() {
    runStats.floorsCleared++;
    if (_floorStartNoDmg) runStats.floorNoDmg++;
    _floorStartNoDmg = true; // reinicia para o próximo andar
    checkAchievements();
}

/** Chamado quando o jogador sofre dano */
function onPlayerDamaged() {
    _bossStartNoDmg = false;
    _floorStartNoDmg = false;
}

/** Chamado quando o jogador coleta ouro */
function onGoldCollected(amount) {
    runStats.goldCollected += amount;
    checkAchievements();
}

/** Chamado quando o jogador compra um item na loja */
function onItemBought() {
    runStats.itemsBought++;
    let gs = getGlobalStats();
    gs.itemsBought = (gs.itemsBought || 0) + 1;
    saveGlobalStats(gs);
    checkAchievements();
}

/** Chamado ao vencer o jogo */
function onGameWon(difficulty, isLong, noDamage) {
    runStats.gameWon++;
    
    // Tracking global para Personagem 23
    let gs = getGlobalStats();
    gs.totalGamesWon = (gs.totalGamesWon || 0) + 1;
    saveGlobalStats(gs);

    if (difficulty === 'nightmare') runStats.nightmareWon++;
    if (difficulty === 'nightmare' && isLong && noDamage) runStats.impossibleWon++;
    checkAchievements();
}

/** Renderiza o painel principal de Conquistas */
function renderAchievements() {
    const listEl = document.getElementById('achievements-list');
    const countEl = document.getElementById('ach-count');
    const progEl = document.getElementById('ach-progress');

    if (!listEl) return;

    listEl.innerHTML = '';

    let unlockedObj = null;
    try {
        unlockedObj = JSON.parse(localStorage.getItem('tdc_achievements') || '[]');
    } catch (e) {
        unlockedObj = [];
    }

    // Convert to explicit array of unlocked IDs for easier checking
    const unlockedIds = Array.isArray(unlockedObj) ? unlockedObj : Object.keys(unlockedObj).filter(k => unlockedObj[k]);

    let unlockedTotal = 0;

    // Ordena por tier: bronze → silver → gold → platinum
    const TIER_ORDER = ['bronze', 'silver', 'gold', 'platinum'];
    const sorted = [...ACHIEVEMENTS].sort((a, b) =>
        TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier)
    );

    const TIER_LABEL = {
        bronze: '🥉 Bronze',
        silver: '🥈 Prata',
        gold: '🥇 Ouro',
        platinum: '💎 Platina',
    };

    let currentTier = null;

    sorted.forEach(ach => {
        const isUnlocked = unlockedIds.includes(ach.id);
        if (isUnlocked) unlockedTotal++;

        // Inserir separador de tier quando mudar de grupo
        if (ach.tier !== currentTier) {
            currentTier = ach.tier;
            const t = TIER_COLOR[currentTier];
            const separator = document.createElement('div');
            separator.style.cssText = `
                width: 100%; text-align: left; padding: 6px 4px 4px;
                font-family: 'VT323', monospace; font-size: 1.4rem;
                color: ${t.border}; border-bottom: 1px solid ${t.border}44;
                margin-top: 10px; letter-spacing: 2px;
            `;
            separator.innerText = TIER_LABEL[currentTier];
            listEl.appendChild(separator);
        }

        const tier = TIER_COLOR[ach.tier] || TIER_COLOR.bronze;

        const card = document.createElement('div');
        card.className = `ach-card ${isUnlocked ? 'unlocked' : ''}`;

        // Aplica cores do tier se desbloqueado
        if (isUnlocked) {
            card.style.borderColor = tier.border;
            card.style.boxShadow = `inset 0 0 10px ${tier.bg}`;
        }

        card.innerHTML = `
            <div class="ach-icon-container" style="border-color: ${isUnlocked ? tier.border : '#576574'}; background: ${isUnlocked ? tier.bg : '#2f3542'}">
                ${isUnlocked ? tier.icon : '🔒'}
            </div>
            <div class="ach-details">
                <h3 class="ach-title">${ach.name}</h3>
                <p class="ach-desc">${isUnlocked ? ach.desc : '???'}</p>
                <div class="ach-category">${ach.category}</div>
            </div>
        `;
        listEl.appendChild(card);
    });

    // Update stats
    countEl.innerText = `Desbloqueadas: ${unlockedTotal} / ${ACHIEVEMENTS.length}`;
}
