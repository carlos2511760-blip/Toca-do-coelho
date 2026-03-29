// ============= SISTEMA DE ITENS E LOJA =============

const ITEM_CATALOG = {
    // --- CURAS (com raridade) ---
    heal_25: { name: 'Poção Menor', desc: 'Cura 25% da vida', type: 'heal', value: 0.25, price: 15, rarity: 'common', weight: 40, emoji: '🧪' },
    heal_50: { name: 'Poção Média', desc: 'Cura 50% da vida', type: 'heal', value: 0.50, price: 30, rarity: 'uncommon', weight: 25, emoji: '🧪' },
    heal_100: { name: 'Poção Máxima', desc: 'Cura 100% da vida', type: 'heal', value: 1.0, price: 60, rarity: 'rare', weight: 12, emoji: '💊' },
    heal_5: { name: 'Elixir Fraco', desc: 'Cura 5% da vida', type: 'heal', value: 0.05, price: 8, rarity: 'epic', weight: 8, emoji: '🫧' },
    heal_1: { name: 'Gota Mística', desc: 'Cura 1% + Regenera 1hp/5s por 30s', type: 'heal_regen', value: 0.01, price: 80, rarity: 'legendary', weight: 3, emoji: '✨' },

    // --- ARMAS ---
    weapon_fire: { name: 'Cajado de Fogo', desc: 'Dispara bolas de fogo que queimam', type: 'weapon', weaponId: 'fire', price: 50, rarity: 'rare', weight: 15, emoji: '🔥' },
    weapon_taser: { name: 'Arma de Raio', desc: 'Raios paralisam (menos em chefes)', type: 'weapon', weaponId: 'taser', price: 55, rarity: 'rare', weight: 15, emoji: '⚡' },
    weapon_ice: { name: 'Cetro de Gelo', desc: 'Projéteis que deixam inimigos lentos', type: 'weapon', weaponId: 'ice', price: 45, rarity: 'uncommon', weight: 18, emoji: '❄️' },

    // --- BUFFS ---
    buff_strength: { name: 'Poção de Força', desc: 'Dano +25% permanente', type: 'buff', buffId: 'strength', price: 40, rarity: 'uncommon', weight: 20, emoji: '💪' },
    buff_speed: { name: 'Poção de Velocidade', desc: 'Velocidade +15% permanente', type: 'buff', buffId: 'speed', price: 35, rarity: 'uncommon', weight: 20, emoji: '👟' },
    buff_shield: { name: 'Escudo Abençoado', desc: 'Escudo temporário (8s)', type: 'buff', buffId: 'shield', price: 55, rarity: 'epic', weight: 8, emoji: '🛡️' },
    buff_maxhp: { name: 'Coração de Ferro', desc: 'Vida Máxima +2 permanente', type: 'buff', buffId: 'maxhp', price: 70, rarity: 'rare', weight: 12, emoji: '🫀' },

    // --- HABILIDADES ATIVAS (tecla E) ---
    skill_gravity: { name: 'Gravidade', desc: 'Puxa todos os inimigos ao centro', type: 'skill', skillId: 'gravity', price: 65, rarity: 'epic', weight: 10, emoji: '🌀' },
    skill_fly: { name: 'Voo', desc: 'Voe por 4s, imune a projéteis', type: 'skill', skillId: 'fly', price: 55, rarity: 'rare', weight: 12, emoji: '🦅' },
    skill_earthquake: { name: 'Terremoto', desc: 'Dano em área enorme ao redor', type: 'skill', skillId: 'earthquake', price: 70, rarity: 'epic', weight: 10, emoji: '🌋' },
    skill_iceberg: { name: 'Criar Iceberg', desc: 'Cria barreira de gelo bloqueadora', type: 'skill', skillId: 'iceberg', price: 50, rarity: 'rare', weight: 12, emoji: '🧊' },
    skill_explosion: { name: 'Explosão', desc: 'Mega explosão: dano massivo em área', type: 'skill', skillId: 'explosion', price: 80, rarity: 'legendary', weight: 5, emoji: '💥' },
    skill_timewarp: { name: 'Distorção Temporal', desc: 'Desacelera todos os inimigos por 6s', type: 'skill', skillId: 'timewarp', price: 60, rarity: 'epic', weight: 8, emoji: '⏳' },
};

// --- BOSSES (9 diferentes) ---
const BOSS_DEFS = [
    { name: 'Olho Sombrio', color: '#1e272e', eyeColor: '#ff4757', pattern: 'circle', desc: 'Dispara círculos de projéteis' },
    { name: 'Dragão de Fogo', color: '#c0392b', eyeColor: '#f39c12', pattern: 'fire', desc: 'Rajadas de fogo em espiral' },
    { name: 'Golem de Gelo', color: '#2980b9', eyeColor: '#ecf0f1', pattern: 'ice', desc: 'Projéteis que desaceleram' },
    { name: 'Fantasma Elétrico', color: '#8e44ad', eyeColor: '#f1c40f', pattern: 'thunder', desc: 'Raios rápidos e teletransporte' },
    { name: 'Rei das Sombras', color: '#2c3e50', eyeColor: '#e74c3c', pattern: 'shadow', desc: 'Invoca capangas e ataca' },
    { name: 'Vento Cortante', color: '#ecf0f1', eyeColor: '#3498db', pattern: 'wind', desc: 'Rajadas de vento ultra velozes' },
    { name: 'Colmeia Tóxica', color: '#55efc4', eyeColor: '#00b894', pattern: 'toxic', desc: 'Névoa ácida e disparos lentos' },
    { name: 'Núcleo Gravitacional', color: '#6c5ce7', eyeColor: '#a29bfe', pattern: 'gravity', desc: 'Puxa o jogador e distorce disparos' },
    { name: 'Colosso do Apocalipse', color: '#c23616', eyeColor: '#fbc531', pattern: 'final_meteor', desc: 'Chuva de meteoros e barreiras' },
];

function getRandomShopItems(count) {
    const allKeys = Object.keys(ITEM_CATALOG);
    const pool = [];
    for (const key of allKeys) {
        const item = ITEM_CATALOG[key];
        for (let i = 0; i < item.weight; i++) pool.push(key);
    }
    const chosen = [];
    const usedKeys = new Set();
    while (chosen.length < count && usedKeys.size < allKeys.length) {
        const rk = pool[Math.floor(Math.random() * pool.length)];
        if (!usedKeys.has(rk)) {
            usedKeys.add(rk);
            chosen.push({ ...ITEM_CATALOG[rk], key: rk });
        }
    }
    return chosen;
}
