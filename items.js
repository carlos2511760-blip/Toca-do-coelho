// ============= SISTEMA DE ITENS E LOJA =============

const ITEM_CATALOG = {
    // --- CURAS E UTILITARIOS ---
    heal_10: { name: 'Gota Menor', desc: 'Cura 10% da vida', type: 'heal', value: 0.10, price: 5, rarity: 'common', weight: 50, emoji: '🩸' },
    heal_25: { name: 'Poção Menor', desc: 'Cura 25% da vida', type: 'heal', value: 0.25, price: 15, rarity: 'common', weight: 40, emoji: '🧪' },
    heal_50: { name: 'Poção Média', desc: 'Cura 50% da vida', type: 'heal', value: 0.50, price: 30, rarity: 'uncommon', weight: 25, emoji: '🧪' },
    heal_100: { name: 'Poção Máxima', desc: 'Cura 100% da vida', type: 'heal', value: 1.0, price: 60, rarity: 'rare', weight: 12, emoji: '💊' },
    heal_5: { name: 'Elixir Fraco', desc: 'Cura 5% da vida', type: 'heal', value: 0.05, price: 8, rarity: 'epic', weight: 8, emoji: '🫧' },
    heal_1: { name: 'Gota Mística', desc: 'Cura 1% + Reg 1hp/5s por 30s', type: 'heal_regen', value: 0.01, price: 80, rarity: 'legendary', weight: 3, emoji: '✨' },
    heal_regen2: { name: 'Raiz da Vida', desc: 'Regen leve por 45s', type: 'heal_regen', value: 0.05, price: 40, rarity: 'rare', weight: 15, emoji: '🌿' },
    heal_speed: { name: 'Sangue Mágico', desc: 'Cura 15% e +Velocidade 5s', type: 'heal_speed', value: 0.15, price: 50, rarity: 'epic', weight: 8, emoji: '🩸' },

    // --- ARMAS ---
    weapon_fire: { name: 'Cajado de Fogo', desc: 'Projéteis que queimam', type: 'weapon', weaponId: 'fire', price: 50, rarity: 'rare', weight: 15, emoji: '🔥' },
    weapon_taser: { name: 'Arma de Raio', desc: 'Raios paralisam', type: 'weapon', weaponId: 'taser', price: 55, rarity: 'rare', weight: 15, emoji: '⚡' },
    weapon_ice: { name: 'Cetro de Gelo', desc: 'Projéteis lentos', type: 'weapon', weaponId: 'ice', price: 45, rarity: 'uncommon', weight: 18, emoji: '❄️' },
    weapon_sniper: { name: 'Lança Longa', desc: 'Disparo único poderoso', type: 'weapon', weaponId: 'sniper', price: 75, rarity: 'epic', weight: 10, emoji: '🔭' },
    weapon_poison: { name: 'Zarabatana', desc: 'Envenena ao longo do tempo', type: 'weapon', weaponId: 'poison', price: 45, rarity: 'uncommon', weight: 18, emoji: '🐍' },
    weapon_pierce: { name: 'Espada de Luz', desc: 'Atravessa inimigos', type: 'weapon', weaponId: 'pierce', price: 80, rarity: 'legendary', weight: 5, emoji: '🗡️' },
    weapon_shuriken: { name: 'Shuriken', desc: 'Rápidos, mas menos dano', type: 'weapon', weaponId: 'shuriken', price: 35, rarity: 'common', weight: 20, emoji: '🥷' },
    weapon_bubble: { name: 'Arma de Bolhas', desc: 'Lentas, mas enormes', type: 'weapon', weaponId: 'bubble', price: 40, rarity: 'uncommon', weight: 18, emoji: '🫧' },

    // --- BUFFS ---
    buff_strength: { name: 'Poção de Força', desc: 'Dano +25% permanente', type: 'buff', buffId: 'strength', price: 40, rarity: 'uncommon', weight: 20, emoji: '💪' },
    buff_speed: { name: 'Poção de Velocidade', desc: 'Velocidade +15% permanente', type: 'buff', buffId: 'speed', price: 35, rarity: 'uncommon', weight: 20, emoji: '👟' },
    buff_maxhp: { name: 'Coração de Ferro', desc: 'Vida Máxima +2 permanente', type: 'buff', buffId: 'maxhp', price: 70, rarity: 'rare', weight: 12, emoji: '🫀' },
    buff_luck: { name: 'Trevo Dourado', desc: 'Mais ouro coletado', type: 'buff', buffId: 'luck', price: 45, rarity: 'uncommon', weight: 15, emoji: '🍀' },
    buff_resist: { name: 'Couro Resistente', desc: 'Reduz dano recebido', type: 'buff', buffId: 'resist', price: 60, rarity: 'rare', weight: 10, emoji: '🐻' },
    buff_maxhp2: { name: 'Maçã Dourada', desc: 'Vida Máx +4, perde vida atual', type: 'buff', buffId: 'maxhp2', price: 30, rarity: 'epic', weight: 8, emoji: '🍎' },
    buff_regen_perm: { name: 'Coração Vivo', desc: 'Regen leve HP perm (20s)', type: 'buff', buffId: 'regen_perm', price: 100, rarity: 'legendary', weight: 2, emoji: '💚' },

    // --- HABILIDADES ATIVAS (tecla E) ---
    skill_gravity: { name: 'Gravidade (Ativa E)', desc: 'Puxa todos os inimigos ao centro', type: 'skill', skillId: 'gravity', price: 65, rarity: 'epic', weight: 10, emoji: '🌀' },
    skill_fly: { name: 'Voo (Ativa E)', desc: 'Voe por 4s, imune a projéteis', type: 'skill', skillId: 'fly', price: 55, rarity: 'rare', weight: 12, emoji: '🦅' },
    skill_earthquake: { name: 'Terremoto (Ativa E)', desc: 'Dano enorme em área', type: 'skill', skillId: 'earthquake', price: 70, rarity: 'epic', weight: 10, emoji: '🌋' },
    skill_iceberg: { name: 'Criar Iceberg (Ativa E)', desc: 'Cria barreiras de gelo', type: 'skill', skillId: 'iceberg', price: 50, rarity: 'rare', weight: 12, emoji: '🧊' },
    skill_explosion: { name: 'Explosão (Ativa E)', desc: 'Dano massivo em área', type: 'skill', skillId: 'explosion', price: 80, rarity: 'legendary', weight: 5, emoji: '💥' },
    skill_timewarp: { name: 'Distorção (Ativa E)', desc: 'Desacelera todos inimigos', type: 'skill', skillId: 'timewarp', price: 60, rarity: 'epic', weight: 8, emoji: '⏳' },
    skill_heal: { name: 'Kit Médico (Ativa E)', desc: 'Restaura 3HP imediatamente', type: 'skill', skillId: 'heal', price: 75, rarity: 'epic', weight: 6, emoji: '🩹' },
    skill_shatter: { name: 'Estilhaçar (Ativa E)', desc: 'Dano forte em área e paralisa', type: 'skill', skillId: 'shatter', price: 60, rarity: 'rare', weight: 10, emoji: '🪞' },
    skill_invis: { name: 'Fumaça (Ativa E)', desc: 'Invisibilidade temporária', type: 'skill', skillId: 'invis', price: 70, rarity: 'epic', weight: 8, emoji: '👻' },
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
