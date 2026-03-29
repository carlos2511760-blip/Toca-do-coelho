const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800; canvas.height = 600;
ctx.imageSmoothingEnabled = false;

const lightCanvas = document.createElement('canvas');
lightCanvas.width = 800; lightCanvas.height = 600;
const lightCtx = lightCanvas.getContext('2d');

// UI - All screens
const screens = {
    titleScreen: document.getElementById('title-screen'),
    mainMenu: document.getElementById('main-menu'),
    hud: document.getElementById('hud'),
    gameOver: document.getElementById('game-over'),
    victory: document.getElementById('victory'),
    shop: document.getElementById('shop-screen'),
    settings: document.getElementById('settings-screen'),
    manual: document.getElementById('manual-screen'),
    pause: document.getElementById('pause-screen'),
    reward: document.getElementById('reward-screen')
};
const startBtn = document.getElementById('start-btn');
const charCards = document.querySelectorAll('.char-card');
const healthBar = document.getElementById('health-bar');
const roomCounter = document.getElementById('room-counter');
const bossHealthContainer = document.getElementById('boss-health-container');
const bossHealthBar = document.getElementById('boss-health-bar');
const bossNameEl = document.getElementById('boss-name');
const restartBtn = document.getElementById('restart-btn');
const victoryBtn = document.getElementById('victory-btn');
const goldCounter = document.getElementById('gold-counter');
const weaponNameEl = document.getElementById('weapon-name');
const abilityNameEl = document.getElementById('ability-name');
const charAbilityCdEl = document.getElementById('char-ability-cd');
const skillCdEl = document.getElementById('skill-cd');
const shopItemsEl = document.getElementById('shop-items');
const shopGoldEl = document.getElementById('shop-gold-amount');
const shopCloseBtn = document.getElementById('shop-close-btn');

const floorCounterEl = document.getElementById('floor-counter');
const gameTimerEl = document.getElementById('game-timer');
const goFinalTimeEl = document.getElementById('go-final-time');
const goBestTimeEl = document.getElementById('go-best-time');
const vicFinalTimeEl = document.getElementById('vic-final-time');
const vicBestTimeEl = document.getElementById('vic-best-time');

let gameState = 'MENU';
let selectedChar = 0;
let selectedDiff = 'normal';
let lastTime = 0;
let gameTime = 0;
let screenShakeT = 0, screenShakeM = 0;
let prevScreenBeforeSettings = 'titleScreen';
let lightingEnabled = true;
let goldMult = 1.0; 
let fullBright = false, flyMode = false, cheatsUsed = false, takenBossDamage = false;
let flashT = 0;
let joystickPos = { x: 0, y: 0 }, joystickActive = false;
let gamepadActive = false;

// DIFFICULTY MODIFIERS
const DIFF_MODS = {
    easy: { hpBonus: 3, enemyHpMult: 0.7, enemySpdMult: 0.85, enemyDmgMult: 0.7, label: '🌿 Fácil', rewardMult: 0.7 },
    normal: { hpBonus: 0, enemyHpMult: 1.0, enemySpdMult: 1.0, enemyDmgMult: 1.0, label: '⚔️ Normal', rewardMult: 0.45 },
    hard: { hpBonus: -1, enemyHpMult: 1.5, enemySpdMult: 1.15, enemyDmgMult: 1.3, label: '🔥 Difícil', rewardMult: 0.25 },
    nightmare: { hpBonus: -2, enemyHpMult: 2.0, enemySpdMult: 1.3, enemyDmgMult: 1.4, label: '💀 Pesadelo', rewardMult: 0.12 }
};

function getDiff() { return DIFF_MODS[selectedDiff] || DIFF_MODS.normal; }

function shake(t, m) { screenShakeT = t; screenShakeM = m; }
function flash() { flashT = 0.2; }
function formatTime(s) { let m = Math.floor(s / 60); let sm = Math.floor(s % 60); return `${m < 10 ? '0' : ''}${m}:${sm < 10 ? '0' : ''}${sm}`; }
let player, enemies = [], projectiles = [], particles = [], pickups = [], icebergs = [], warnings = [];
let currentRoom, mapLevel = 1;
let MAX_LEVELS = 5;
const WALL = 40;
const keys = {};
const mouse = { x: 0, y: 0, down: false };

// SCREEN MANAGEMENT
const isTouchDevice = () => {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
};

function switchScreen(id) { 
    Object.values(screens).forEach(s => s.classList.remove('active')); 
    if (id && screens[id]) screens[id].classList.add('active'); 
    
    // Controle de visibilidade dos botões mobile - apenas em dispositivos touch
    const mCtrls = document.getElementById('mobile-controls');
    if (mCtrls) {
        if (id === 'hud' && isTouchDevice()) mCtrls.style.display = 'block';
        else mCtrls.style.display = 'none';
    }
}

function returnToMenu() { 
    gameState = 'MENU'; 
    document.body.style.backgroundImage = "url('./imagens/Capa.png')"; 
    document.getElementById('game-container').classList.add('menu-mode');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (typeof lightCtx !== 'undefined') lightCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reiniciar música da capa ao voltar para o menu
    if (typeof audio !== 'undefined') audio.playTitleMusic();
    
    switchScreen('titleScreen'); 
}

function dist(x1, y1, x2, y2) { return Math.hypot(x2 - x1, y2 - y1); }

// ===== TITLE SCREEN BUTTONS =====
document.getElementById('btn-play').addEventListener('click', () => switchScreen('mainMenu'));
document.getElementById('btn-manual').addEventListener('click', () => switchScreen('manual'));
document.getElementById('btn-settings').addEventListener('click', () => { prevScreenBeforeSettings = 'titleScreen'; switchScreen('settings'); });
document.getElementById('btn-settings-back').addEventListener('click', () => switchScreen(prevScreenBeforeSettings));
document.getElementById('btn-manual-back').addEventListener('click', () => switchScreen('titleScreen'));
document.getElementById('btn-back-title').addEventListener('click', () => switchScreen('titleScreen'));

// ===== PAUSE SYSTEM =====
document.getElementById('btn-resume').addEventListener('click', resumeGame);
document.getElementById('btn-pause-settings').addEventListener('click', () => { prevScreenBeforeSettings = 'pause'; switchScreen('settings'); });
document.getElementById('btn-restart').addEventListener('click', () => { 
    document.body.style.backgroundImage = "url('./imagens/Capa.png')"; 
    document.getElementById('game-container').classList.add('menu-mode');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (typeof lightCtx !== 'undefined') lightCtx.clearRect(0, 0, canvas.width, canvas.height);
    switchScreen('mainMenu'); 
    gameState = 'MENU'; 
});
document.getElementById('btn-quit').addEventListener('click', returnToMenu);

function pauseGame() {
    if (gameState !== 'PLAYING') return;
    gameState = 'PAUSED';
    document.getElementById('pause-level').innerText = mapLevel;
    document.getElementById('pause-time').innerText = formatTime(gameTime);
    switchScreen('pause');
}

function resumeGame() {
    if (gameState !== 'PAUSED') return;
    gameState = 'PLAYING';
    switchScreen('hud');
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

// ===== SETTINGS TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Volume sliders
['vol-master', 'vol-music', 'vol-sfx', 'set-hud-size'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => {
        const valEl = document.getElementById(id + '-val');
        if (valEl) valEl.innerText = el.value + '%';
        if (typeof audio !== 'undefined') {
            audio.updateVolumes(
                document.getElementById('vol-master').value,
                document.getElementById('vol-music').value,
                document.getElementById('vol-sfx').value
            );
        }
    });
});

// Sincronizar toque para mira e TIRO no mobile
const updateMobileAim = (e) => {
    if (gameState !== 'PLAYING') return;
    const r = canvas.getBoundingClientRect();
    // Procurar por um toque que NÃO seja o do joystick (se houver mais de um)
    let touch = null;
    for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].target.id === 'gameCanvas') {
            touch = e.touches[i];
            break;
        }
    }
    if (!touch && e.changedTouches) touch = e.changedTouches[0];
    if (touch) {
        mouse.x = (touch.clientX - r.left) * (canvas.width / r.width);
        mouse.y = (touch.clientY - r.top) * (canvas.height / r.height);
    }
};

window.addEventListener('touchstart', (e) => {
    if (e.target.id === 'gameCanvas' && gameState === 'PLAYING') {
        updateMobileAim(e);
        mouse.down = true;
        if (player) player.shoot();
    }
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (e.target.id === 'gameCanvas' && gameState === 'PLAYING') {
        updateMobileAim(e);
    }
}, { passive: false });

window.addEventListener('touchend', (e) => {
    if (e.target.id === 'gameCanvas') mouse.down = false;
});

// ---------- MOBILE INPUTS ----------
(function initMobile() {
    let activeTouchId = null;
    const jBase = document.getElementById('joystick-base');
    const jThumb = document.getElementById('joystick-thumb');
    if (!jBase || !jThumb) return;

    const moveJoystick = (clientX, clientY) => {
        const rect = jBase.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let dx = clientX - centerX;
        let dy = clientY - centerY;
        let dist = Math.hypot(dx, dy);
        let maxDist = rect.width / 2;
        
        if (dist > maxDist) {
            dx = (dx / dist) * maxDist;
            dy = (dy / dist) * maxDist;
            dist = maxDist;
        }

        // Deadzone
        if (dist < 5) {
            joystickPos = { x: 0, y: 0 };
        } else {
            joystickPos = { x: dx / maxDist, y: dy / maxDist };
        }

        jThumb.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    };

    jBase.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (activeTouchId !== null) return;
        const touch = e.changedTouches[0];
        activeTouchId = touch.identifier;
        joystickActive = true;
        moveJoystick(touch.clientX, touch.clientY);
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (!joystickActive) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === activeTouchId) {
                moveJoystick(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
                break;
            }
        }
    }, { passive: false });

    const endJoystick = (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === activeTouchId) {
                activeTouchId = null;
                joystickActive = false;
                joystickPos = { x: 0, y: 0 };
                jThumb.style.transform = 'translate(-50%, -50%)';
                break;
            }
        }
    };

    window.addEventListener('touchend', endJoystick);
    window.addEventListener('touchcancel', endJoystick);

    // Botoes de Acao
    const setupBtn = (id, start, end) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('touchstart', (e) => { e.preventDefault(); start(); }, { passive: false });
        if (end) el.addEventListener('touchend', (e) => { e.preventDefault(); end(); }, { passive: false });
    };

    setupBtn('btn-m-jump', () => { if (player) player.jump(); });
    setupBtn('btn-m-ability', () => { if (player) player.useAbility(); });
    setupBtn('btn-m-skill', () => { if (player) player.useSkill(); });
    
    // Tiro removido do botão fixo para ser no toque da tela por pedido do user
    
    setupBtn('btn-m-pause', () => {
        if (gameState === 'PLAYING') { gameState = 'PAUSED'; switchScreen('pause'); }
        else if (gameState === 'PAUSED') { gameState = 'PLAYING'; switchScreen('hud'); }
    });
})();

// ---------- GAMEPAD SUPPORT ----------
window.addEventListener("gamepadconnected", (e) => {
    console.log("Gamepad conectado!", e.gamepad.id);
    gamepadActive = true;
});

window.addEventListener("gamepaddisconnected", (e) => {
    console.log("Gamepad desconectado.");
    gamepadActive = false;
});

function handleGamepad() {
    if (!gamepadActive) return;
    const gamepads = navigator.getGamepads();
    const gp = gamepads[0];
    if (!gp) return;

    // Movimentação (Analógico Esquerdo)
    const axisLX = gp.axes[0];
    const axisLY = gp.axes[1];
    if (Math.abs(axisLX) > 0.2 || Math.abs(axisLY) > 0.2) {
        joystickActive = true;
        joystickPos = { x: axisLX, y: axisLY };
    } else if (!joystickActive) { // se não houver joystick mobile ativo
        joystickPos = { x: 0, y: 0 };
    }

    // Mira (Analógico Direito)
    const axisRX = gp.axes[2];
    const axisRY = gp.axes[3];
    if (Math.abs(axisRX) > 0.2 || Math.abs(axisRY) > 0.2) {
        // Mirar na direção do analógico relativo ao jogador
        mouse.x = player.x + axisRX * 200;
        mouse.y = player.y + axisRY * 200;
    }

    // Botões
    // R2 ou R1 para atirar (Botoes 7 ou 5)
    mouse.down = gp.buttons[7].pressed || gp.buttons[5].pressed || gp.buttons[6].pressed;
    
    // Botão Sul (A/X) para pular (Botão 0)
    if (gp.buttons[0].pressed && player) player.jump();
    
    // Botão Oeste (X/Quadrado) para habilidade (Botão 2 ou 3)
    if (gp.buttons[2].pressed && player) player.useAbility();
    
    // Start/Options para pausa (Botão 9)
    if (gp.buttons[9].pressed) {
        if (gameState === 'PLAYING') pauseGame();
    }
}

// Fullscreen toggle
document.getElementById('btn-fullscreen').addEventListener('click', function () {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => { });
        this.innerText = 'Desativar';
    } else {
        document.exitFullscreen();
        this.innerText = 'Ativar';
    }
});

// Lighting toggle
document.getElementById('btn-lighting').addEventListener('click', function () {
    lightingEnabled = !lightingEnabled;
    this.innerText = lightingEnabled ? 'Ligado' : 'Desligado';
    this.classList.toggle('on', lightingEnabled);
});

// Colorblind filter
document.getElementById('set-colorblind').addEventListener('change', function () {
    const v = this.value;
    const gc = document.getElementById('game-container');
    gc.style.filter = '';
    if (v === 'protanopia') gc.style.filter = 'saturate(0.8) hue-rotate(-20deg)';
    else if (v === 'deuteranopia') gc.style.filter = 'saturate(0.7) hue-rotate(30deg)';
    else if (v === 'tritanopia') gc.style.filter = 'saturate(0.8) hue-rotate(60deg)';
});

// CHEATS
document.getElementById('btn-cheat-unlock').addEventListener('click', function() {
    const list = document.getElementById('cheats-list');
    const isLocked = list.classList.toggle('locked');
    this.innerText = isLocked ? 'Ativar' : 'Desativar';
    this.classList.toggle('on', !isLocked);
    
    // Habilitar/Desabilitar botões internos
    const btns = list.querySelectorAll('button');
    btns.forEach(b => b.disabled = isLocked);
});

document.getElementById('btn-cheat-bright').addEventListener('click', function() {
    fullBright = !fullBright;
    cheatsUsed = true;
    this.innerText = fullBright ? 'Ligado' : 'Ativar';
    this.classList.toggle('on', fullBright);
});
document.getElementById('btn-cheat-fly').addEventListener('click', function() {
    flyMode = !flyMode;
    cheatsUsed = true;
    this.innerText = flyMode ? 'Ligado' : 'Ativar';
    this.classList.toggle('on', flyMode);
});
document.getElementById('btn-cheat-gold').addEventListener('click', () => {
    if (player) {
        player.gold += 999;
        goldCounter.innerText = player.gold;
        cheatsUsed = true;
    }
});

// ===== DIFFICULTY CARDS =====
const diffCards = document.querySelectorAll('.diff-card');
diffCards.forEach(c => c.addEventListener('click', () => {
    diffCards.forEach(x => x.classList.remove('selected'));
    c.classList.add('selected');
    selectedDiff = c.dataset.diff;
}));

// ===== SIZE SELECTION =====
document.querySelectorAll('.size-card').forEach(c => c.addEventListener('click', () => {
    document.querySelectorAll('.size-card').forEach(card => card.classList.remove('selected'));
    c.classList.add('selected');
    MAX_LEVELS = parseInt(c.dataset.size);
}));

// ===== MOBILE SETTINGS SYNC =====
const updateMobileStyles = () => {
    const size = document.getElementById('set-m-size').value;
    const joyX = document.getElementById('set-m-joy-x').value;
    const joyY = document.getElementById('set-m-joy-y').value;
    const btnX = document.getElementById('set-m-btn-x').value;
    const btnY = document.getElementById('set-m-btn-y').value;
    document.documentElement.style.setProperty('--m-size', size / 100);
    document.documentElement.style.setProperty('--m-joy-x', joyX + 'px');
    document.documentElement.style.setProperty('--m-joy-y', joyY + 'px');
    document.documentElement.style.setProperty('--m-btn-x', btnX + 'px');
    document.documentElement.style.setProperty('--m-btn-y', btnY + 'px');
    document.getElementById('set-m-size-val').innerText = size + '%';
    document.getElementById('set-m-joy-x-val').innerText = joyX + 'px';
    document.getElementById('set-m-joy-y-val').innerText = joyY + 'px';
    document.getElementById('set-m-btn-x-val').innerText = btnX + 'px';
    document.getElementById('set-m-btn-y-val').innerText = btnY + 'px';
};
['set-m-size', 'set-m-joy-x', 'set-m-joy-y', 'set-m-btn-x', 'set-m-btn-y'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateMobileStyles);
});

// ===== REWARD CARDS (NPC) =====
document.querySelectorAll('.reward-card').forEach(card => {
    card.addEventListener('click', () => {
        const r = card.dataset.reward;
        if (r === 'damage') {
            player.dmgMult += 0.2;
            boom(player.x, player.y, '#e74c3c', 30);
        } else if (r === 'heal') {
            player.maxHp += 1;
            player.hp = player.maxHp;
            updateHUD();
            boom(player.x, player.y, '#2ed573', 30);
        } else if (r === 'gold') {
            player.gold += Math.round(60 * goldMult);
            goldCounter.innerText = player.gold;
            goldMult += 0.25;
            boom(player.x, player.y, '#feca57', 30);
        }
        switchScreen('hud');
        gameState = 'PLAYING';
        let rd = currentRoom.rooms[`${currentRoom.currentX},${currentRoom.currentY}`];
        if (rd) rd.rewardTaken = true;
        lastTime = performance.now();
        requestAnimationFrame(gameLoop);
    });
});

// ===== INPUT =====
window.addEventListener('keydown', e => {
    keys[e.code] = true;
    if (['Space', 'KeyW', 'KeyS', 'KeyA', 'KeyD', 'KeyQ', 'KeyE'].includes(e.code)) e.preventDefault();
    if (e.code === 'Space' && gameState === 'PLAYING' && player) player.jump();
    if (e.code === 'KeyQ' && gameState === 'PLAYING' && player) player.useAbility();
    if (e.code === 'KeyE' && gameState === 'PLAYING' && player) player.useSkill();
    if (e.code === 'Escape') {
        if (gameState === 'PLAYING') pauseGame();
        else if (gameState === 'PAUSED') resumeGame();
    }
});
window.addEventListener('keyup', e => keys[e.code] = false);
window.addEventListener('blur', () => { for (let k in keys) keys[k] = false; mouse.down = false; });
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('mousemove', e => { const r = canvas.getBoundingClientRect(); mouse.x = (e.clientX - r.left) * (canvas.width / r.width); mouse.y = (e.clientY - r.top) * (canvas.height / r.height); });
document.addEventListener('mousedown', e => { if (e.button === 0) mouse.down = true; });
document.addEventListener('mouseup', e => { if (e.button === 0) { mouse.down = false; if (player && gameState === 'PLAYING') player.shoot(); } });
charCards.forEach(c => c.addEventListener('click', () => { 
    if (c.classList.contains('locked')) return;
    charCards.forEach(x => x.classList.remove('selected')); 
    c.classList.add('selected'); 
    selectedChar = parseInt(c.dataset.char); 
}));
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', returnToMenu);
victoryBtn.addEventListener('click', returnToMenu);
shopCloseBtn.addEventListener('click', closeShop);

// PARTICLES
class Particle { constructor(x, y, col, spd, sz, life) { this.x = x; this.y = y; this.vx = (Math.random() - .5) * spd; this.vy = (Math.random() - .5) * spd; this.color = col; this.size = sz; this.life = life; this.maxLife = life; } update(dt) { this.x += this.vx; this.y += this.vy; this.life -= dt * 60; return this.life > 0; } draw(c) { c.fillStyle = this.color; c.globalAlpha = Math.max(0, this.life / this.maxLife); c.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size); c.globalAlpha = 1; } }
function boom(x, y, col, n) { 
    if (n >= 20) { shake(0.15, n / 5); if (n > 30 && typeof audio !== 'undefined') audio.playHurt(); } 
    for (let i = 0; i < n; i++) particles.push(new Particle(x, y, col, 8, Math.random() * 4 + 2, Math.random() * 20 + 10)); 
}

// PICKUP (gold bag, exit, etc)
class Pickup { constructor(x, y, type, value) { this.x = x; this.y = y; this.type = type; this.value = value; this.radius = type === 'exit' ? 20 : 12; this.bobT = 0; } update(dt) { this.bobT += dt * 3; } draw(c) { let by = this.y + Math.sin(this.bobT) * 5; c.font = '22px VT323'; c.textAlign = 'center'; if (this.type === 'gold') c.fillText('💰', this.x, by); else if (this.type === 'exit') { c.fillStyle = '#9b59b6'; c.fillRect(this.x - 15, by - 15, 30, 30); c.fillStyle = '#fff'; c.fillText('SAÍDA', this.x, by + 7); } else if (this.type === 'heart') c.fillText('❤️', this.x, by); else if (this.type === 'buff') c.fillText('🧚', this.x, by); } }

// WARNING (Ataques de área)
class Warning { 
    constructor(x, y, r, time, type, isPlayerObj=false) { 
        this.x = x; this.y = y; 
        this.radius = r; 
        this.time = time; 
        this.maxTime = time; 
        this.type = type; 
        this.isPlayerObj = isPlayerObj;
    } 
    update(dt) { 
        this.time -= dt; 
        if (this.time <= 0 && this.type === 'meteor') { 
            boom(this.x, this.y, '#e74c3c', 40); 
            boom(this.x, this.y, '#f1c40f', 30); 
            if (this.isPlayerObj) {
                enemies.forEach(e => {
                    if (dist(e.x, e.y, this.x, this.y) < this.radius + e.radius) { 
                        e.takeDamage(15 * (player ? player.dmgMult : 1)); 
                        e.stunTimer = 1.0;
                    }
                });
            } else {
                if (player && dist(player.x, player.y, this.x, this.y) < this.radius + player.radius) { 
                    if (typeof currentRoom !== 'undefined' && currentRoom.type === 'boss') takenBossDamage = true;
                    player.takeDamage(1 + (mapLevel - 1) * 0.5); 
                    let dx = player.x - this.x, dy = player.y - this.y, mg = Math.hypot(dx, dy) || 1; 
                    player.x += (dx / mg) * 60; player.y += (dy / mg) * 60; 
                    player.slowTimer = 3; 
                } 
            }
        } 
        return this.time > 0; 
    } 
    draw(c) { 
        let rgb = this.isPlayerObj ? '52, 152, 219' : '231, 76, 60';
        let strokeCol = this.isPlayerObj ? '#3498db' : '#e74c3c';
        let fallCol = this.isPlayerObj ? '#2980b9' : '#d35400';
        c.fillStyle = `rgba(${rgb}, ${0.2 + (1 - this.time / this.maxTime) * 0.5})`; 
        c.beginPath(); c.arc(this.x, this.y, this.radius, 0, Math.PI * 2); c.fill(); 
        c.strokeStyle = strokeCol; c.lineWidth = 2; c.stroke(); 
        let fallY = this.y - 800 * (this.time / this.maxTime); 
        c.fillStyle = fallCol; c.beginPath(); c.arc(this.x, fallY, this.radius * 0.5, 0, Math.PI * 2); c.fill(); 
    } 
}

// ICEBERG E PEDRA
class Iceberg { constructor(x, y, type) { this.x = x; this.y = y; this.w = 50; this.h = 60; this.hp = 10; this.timer = 15; this.type = type || 'ice'; } update(dt) { this.timer -= dt; return this.timer > 0 && this.hp > 0; } draw(c) { if (this.type === 'rock') { c.fillStyle = '#7f8fa6'; c.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h); c.strokeStyle = '#2f3640'; c.lineWidth = 2; c.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h); } else { c.fillStyle = '#a8e6cf'; c.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h); c.strokeStyle = '#55efc4'; c.lineWidth = 2; c.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h); } } }

// PROJECTILE
class Projectile { 
    constructor(x, y, vx, vy, spd, rad, col, isP, wType) { 
        this.x = x; this.y = y; this.vx = vx * spd; this.vy = vy * spd; 
        this.radius = rad; this.color = col; this.isPlayerObj = isP; 
        this.damage = 1; this.active = true; this.weaponType = wType || 'normal'; 
        this.bounces = 0; this.lastHitId = -1;
    } 
    update(dt) { 
        this.x += this.vx * (dt * 60); this.y += this.vy * (dt * 60); 
        if (this.x < WALL || this.x > 800 - WALL || this.y < WALL || this.y > 600 - WALL) { 
            if (this.bounces > 0) { 
                if (this.x < WALL || this.x > 800 - WALL) this.vx = -this.vx; 
                if (this.y < WALL || this.y > 600 - WALL) this.vy = -this.vy; 
                this.x = Math.max(WALL + 1, Math.min(800 - WALL - 1, this.x)); 
                this.y = Math.max(WALL + 1, Math.min(600 - WALL - 1, this.y)); 
                this.bounces--; 
                boom(this.x, this.y, this.color, 3);
            } else { this.active = false; } 
        } 
        for (let ib of icebergs) { if (this.x > ib.x - ib.w / 2 && this.x < ib.x + ib.w / 2 && this.y > ib.y - ib.h / 2 && this.y < ib.y + ib.h / 2) { ib.hp--; this.active = false; } } 
    } 
    draw(c) { c.fillStyle = this.color; c.beginPath(); c.arc(this.x, this.y, this.radius, 0, Math.PI * 2); c.fill(); if (this.weaponType === 'fire') { c.fillStyle = 'rgba(255,165,0,0.4)'; c.beginPath(); c.arc(this.x, this.y, this.radius + 4, 0, Math.PI * 2); c.fill(); } if (this.weaponType === 'taser') { c.strokeStyle = '#f1c40f'; c.lineWidth = 1; c.beginPath(); c.moveTo(this.x - 5, this.y - 5); c.lineTo(this.x + 5, this.y + 5); c.stroke(); } if (this.weaponType === 'ice') { c.strokeStyle = '#74b9ff'; c.lineWidth = 2; c.beginPath(); c.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2); c.stroke(); } if (this.bounces > 0) { c.strokeStyle = '#e056fd'; c.lineWidth = 2; c.beginPath(); c.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2); c.stroke(); } } 
}

// ACTOR
class Actor { constructor(x, y, r, col, hp, spd) { this.x = x; this.y = y; this.radius = r; this.color = col; this.maxHp = hp; this.hp = hp; this.speed = spd; this.vx = 0; this.vy = 0; this.isJumping = false; this.jumpTimer = 0; this.invTimer = 0; this.slowTimer = 0; this.stunTimer = 0; this.stunImmune = 0; this.levitateT = 0; this.maxJumpTime = 0.8; } takeDamage(amt) { if (this.invTimer > 0 || this.isJumping) return; this.hp -= amt; this.invTimer = 0.5; if (this instanceof Player && typeof audio !== 'undefined') audio.playHurt(); if (this.hp <= 0 && this instanceof Enemy) { boom(this.x, this.y, this.color, 15); if (typeof audio !== 'undefined') audio.playHit(); } } updatePhysics(dt) { if (this.stunTimer > 0) { this.stunTimer -= dt; this.vx = 0; this.vy = 0; } let sm = this.slowTimer > 0 ? 0.4 : 1; this.x += this.vx * sm * (dt * 60); this.y += this.vy * sm * (dt * 60); if (this.invTimer > 0) this.invTimer -= dt; if (this.stunImmune > 0) this.stunImmune -= dt; if (this.levitateT > 0) this.levitateT -= dt; if (this.isJumping) { let jMod = (this instanceof Player && this.charType === 13) ? 0.6 : 1.0; this.jumpTimer -= dt * jMod; if (this.jumpTimer <= 0) this.isJumping = false; } if (this.slowTimer > 0) this.slowTimer -= dt; this.x = Math.max(WALL + this.radius, Math.min(800 - WALL - this.radius, this.x)); this.y = Math.max(WALL + this.radius, Math.min(600 - WALL - this.radius, this.y)); } }

// PLAYER
class Player extends Actor {
    constructor(x, y, ct) {
        let hp = 5, spd = 4, col = '#e0e0e0';
        // ORIGINAIS
        if (ct === 0) { spd = 5.5; col = '#00d2d3'; }
        else if (ct === 1) { hp = 8; spd = 3.5; col = '#ff9f43'; }
        else if (ct === 2) { hp = 4; spd = 4.5; col = '#ff4757'; }
        else if (ct === 3) { hp = 5; spd = 4.0; col = '#833471'; }
        else if (ct === 4) { hp = 4; spd = 4.8; col = '#7f8fa6'; }
        else if (ct === 5) { hp = 4; spd = 4.0; col = '#2980b9'; }
        else if (ct === 6) { hp = 6; spd = 3.5; col = '#2ecc71'; }
        else if (ct === 7) { hp = 7; spd = 3.0; col = '#f1c40f'; }
        else if (ct === 8) { hp = 5; spd = 4.0; col = '#d35400'; }
        else if (ct === 9) { hp = 5; spd = 4.2; col = '#f368e0'; }
        // NOVOS
        else if (ct === 10) { hp = 4; spd = 5.0; col = '#2f3542'; } // Ninja
        else if (ct === 11) { hp = 5; spd = 4.0; col = '#1dd1a1'; } // Alquimista
        else if (ct === 12) { hp = 6; spd = 3.2; col = '#10ac84'; } // Druida
        else if (ct === 13) { hp = 4; spd = 4.0; col = '#54a0ff'; } // Astronauta
        else if (ct === 14) { hp = 6; spd = 3.8; col = '#ee5253'; } // Pirata
        else if (ct === 15) { hp = 7; spd = 4.5; col = '#ff9f43'; } // Viking
        else if (ct === 16) { hp = 6; spd = 4.0; col = '#576574'; } // Ciborgue
        else if (ct === 17) { hp = 5; spd = 3.5; col = '#feca57'; } // Zen
        else if (ct === 18) { hp = 5; spd = 4.0; col = '#57606f'; } // Mineiro
        else if (ct === 19) { hp = 5; spd = 4.5; col = '#fffa65'; } // Radiante
        else if (ct === 20) { hp = 5; spd = 4.5; col = '#f5f6fa'; } // Dimensional
        else if (ct === 21) { hp = 5; spd = 4.2; col = '#e056fd'; } // Colecionador
        else { hp = 5; spd = 4.0; col = '#000000'; }

        hp = Math.max(1, hp + getDiff().hpBonus);
        super(x, y, 15, col, hp, spd);
        this.charType = ct;
        this.dashCD = 0; this.shieldT = 0; this.shieldCD = 0; this.burstCD = 0; this.fearT = 0; this.fearCD = 0; this.ghostT = 0; this.ghostCD = 0; this.magicCD = 0; this.toxicCD = 0; this.empCD = 0; this.fireCD = 0; this.luckCD = 0;
        this.ninjaCD = 0; this.chemCD = 0; this.rootCD = 0; this.jetCD = 0; this.cannonCD = 0; this.roarCD = 0; this.laserCD = 0; this.medCD = 0; this.tntCD = 0; this.sunCD = 0; this.dimCD = 0; this.bubbleCD = 0;
        this.baseFireRate = (ct === 2 || ct === 15) ? 0.12 : 0.25;
        this.weaponCD = 0;
        this.gold = (ct === 5 || ct === 14) ? 50 : 0;
        this.currentWeapon = 'normal'; this.activeSkill = null; this.skillCD = 0; this.dmgMult = 1; this.regenT = 0; this.regenDur = 0; this.flyT = 0; this.noDamageT = 0; this.auraT = 0; this.burnTimer = 0; this.burnTick = 0;
        this.maxJumpTime = (this.charType === 13) ? 1.2 : 0.8;
    }
    jump() { 
        if (!this.isJumping && this.flyT <= 0) { 
            this.isJumping = true; 
            this.jumpTimer = this.maxJumpTime; 
            if (typeof audio !== 'undefined') audio.playJump(); 
        } 
    }
    getInnateCD() { 
        const cds = [
            this.dashCD, this.shieldCD, this.burstCD, this.fearCD, this.ghostCD, 
            this.magicCD, this.toxicCD, this.empCD, this.fireCD, this.luckCD,
            this.ninjaCD, this.chemCD, this.rootCD, this.jetCD, this.cannonCD,
            this.roarCD, this.laserCD, this.medCD, this.tntCD, this.sunCD,
            this.dimCD, this.bubbleCD
        ];
        return cds[this.charType] || 0;
    }
    useAbility() {
        if (this.charType === 0 && this.dashCD <= 0) {
            let dx = 0, dy = 0;
            if (keys['KeyW']) dy--; if (keys['KeyS']) dy++; if (keys['KeyA']) dx--; if (keys['KeyD']) dx++;
            if (joystickActive) { dx = joystickPos.x; dy = joystickPos.y; }
            if (!dx && !dy) return;
            let l = Math.hypot(dx, dy);
            this.x += dx / l * 120; this.y += dy / l * 120;
            this.dashCD = 2.5; boom(this.x, this.y, '#00d2d3', 15);
        }
        else if (this.charType === 1 && this.shieldCD <= 0) { this.shieldT = 5; this.shieldCD = 8; }
        else if (this.charType === 2 && this.burstCD <= 0) { for (let i = 0; i < 3; i++)setTimeout(() => { this.weaponCD = 0; if (gameState === 'PLAYING') this.shoot(); }, i * 80); this.burstCD = 4; }
        else if (this.charType === 3 && this.fearCD <= 0) { this.fearT = 4.5; this.fearCD = 8; boom(this.x, this.y, '#833471', 30); }
        else if (this.charType === 4 && this.ghostCD <= 0) { this.ghostT = 4.5; this.invTimer = 4.5; this.ghostCD = 8; boom(this.x, this.y, '#7f8fa6', 20); }
        else if (this.charType === 5 && this.magicCD <= 0) { for (let i = 0; i < 12; i++) { let a = (i / 12) * Math.PI * 2; projectiles.push(new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 6, 8, '#74b9ff', true, 'ice')); } this.magicCD = 10; boom(this.x, this.y, '#2980b9', 30); }
        else if (this.charType === 6 && this.toxicCD <= 0) { enemies.forEach(e => { if (dist(this.x, this.y, e.x, e.y) < 150) { e.takeDamage(10 * this.dmgMult); e.slowTimer = (e.type === 'boss') ? 1 : 3; } }); this.toxicCD = 8; boom(this.x, this.y, '#2ecc71', 40); }
        else if (this.charType === 7 && this.empCD <= 0) { enemies.forEach(e => { if (dist(this.x, this.y, e.x, e.y) < 250) { e.stunTimer = (e.type === 'boss') ? 0.5 : 3; e.takeDamage(5 * this.dmgMult); } }); this.empCD = 12; boom(this.x, this.y, '#f1c40f', 50); }
        else if (this.charType === 8 && this.fireCD <= 0) { let dx = mouse.x - this.x, dy = mouse.y - this.y, d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d; for (let i = -2; i <= 2; i++) { let a = Math.atan2(dy, dx) + i * 0.15; projectiles.push(new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 8, 10, '#e74c3c', true, 'fire')); } this.fireCD = 6; boom(this.x, this.y, '#d35400', 30); }
        else if (this.charType === 9 && this.luckCD <= 0) { pickups.push(new Pickup(this.x + 30, this.y, 'gold', Math.floor(Math.random() * 20) + 5)); this.luckCD = 15; boom(this.x, this.y, '#f368e0', 15); }
        else if (this.charType === 10 && this.ninjaCD <= 0) { 
            boom(this.x, this.y, '#2f3542', 25);
            this.x += (Math.random() - 0.5) * 250; this.y += (Math.random() - 0.5) * 250; 
            this.ninjaCD = 3; 
            boom(this.x, this.y, '#2f3542', 20); 
            for(let i=0; i<5; i++) particles.push(new Particle(this.x, this.y, '#000', 4, 10, 40));
        }
        else if (this.charType === 11 && this.chemCD <= 0) { enemies.forEach(e => { if (dist(this.x, this.y, e.x, e.y) < 200) { e.slowTimer = 4; e.takeDamage(4 * this.dmgMult); } }); this.chemCD = 7; boom(this.x, this.y, '#1dd1a1', 25); }
        else if (this.charType === 12 && this.rootCD <= 0) { enemies.forEach(e => { if (dist(this.x, this.y, e.x, e.y) < 180) e.stunTimer = 2; }); this.rootCD = 10; boom(this.x, this.y, '#10ac84', 30); }
        else if (this.charType === 13 && this.jetCD <= 0) { this.flyT = 6.0; this.jetCD = 12; boom(this.x, this.y, '#54a0ff', 15); }
        else if (this.charType === 14 && this.cannonCD <= 0) { for (let i = 0; i < 5; i++) { let tx = this.x + (Math.random() - 0.5) * 400, ty = this.y + (Math.random() - 0.5) * 400; warnings.push(new Warning(tx, ty, 60, 0.5, 'meteor', true)); } this.cannonCD = 8; }
        else if (this.charType === 15 && this.roarCD <= 0) { this.dmgMult *= 1.5; setTimeout(() => this.dmgMult /= 1.5, 8000); this.roarCD = 15; boom(this.x, this.y, '#ff9f43', 40); }
        else if (this.charType === 16 && this.laserCD <= 0) { 
            let dx = mouse.x - this.x, dy = mouse.y - this.y, d = Math.hypot(dx, dy) || 1; 
            let pb = new Projectile(this.x, this.y, dx/d, dy/d, 8.5, 18, '#00d2d3', true, 'cyborg_emp_ball'); 
            pb.damage = 18; 
            projectiles.push(pb); 
            this.laserCD = 5.5; 
            boom(this.x, this.y, '#0984e3', 25); 
        }
        else if (this.charType === 17 && this.medCD <= 0) { this.hp = Math.min(this.maxHp, this.hp + 2); updateHUD(); this.medCD = 20; boom(this.x, this.y, '#feca57', 30); }
        else if (this.charType === 18 && this.tntCD <= 0) { warnings.push(new Warning(this.x, this.y, 120, 1.0, 'meteor', true)); this.tntCD = 6; }
        else if (this.charType === 19 && this.sunCD <= 0) { enemies.forEach(e => { e.takeDamage(8); e.stunTimer = 1; }); this.sunCD = 12; boom(this.x, this.y, '#fffa65', 50); }
        else if (this.charType === 20 && this.dimCD <= 0) {
            enemies.forEach(e => {
                let dmg = e.maxHp / 2;
                e.takeDamage(dmg);
                boom(e.x, e.y, '#f5f6fa', 15);
            });
            this.dimCD = 50;
            flashT = 0.5;
            if (typeof audio !== 'undefined') audio.playShoot();
        }
        else if (this.charType === 21 && this.bubbleCD <= 0) {
            // Bolha Coletora: encapsula, levita e choca todos no centro
            enemies.forEach(e => {
                e.stunTimer = 2.5;
                e.levitateT = 1.5;
                boom(e.x, e.y, '#e056fd', 12);
            });
            setTimeout(() => {
                enemies.forEach(e => {
                    let d = Math.hypot(400 - e.x, 300 - e.y);
                    let dmg = 6 + Math.min(d / 30, 10); // 6~16 dano baseado na distância
                    e.takeDamage(dmg * (player ? player.dmgMult : 1));
                    e.x = 400 + (Math.random() - 0.5) * 50;
                    e.y = 300 + (Math.random() - 0.5) * 50;
                    boom(e.x, e.y, '#6c5ce7', 8);
                });
                boom(400, 300, '#e056fd', 45);
                shake(0.4, 8);
            }, 1500);
            this.bubbleCD = 35;
            boom(this.x, this.y, '#e056fd', 25);
        }
    }
    useSkill() { if (!this.activeSkill || this.skillCD > 0) return; let sk = this.activeSkill; this.skillCD = 10; if (sk === 'gravity') { enemies.forEach(e => { let dx = 400 - e.x, dy = 300 - e.y, d = Math.hypot(dx, dy); if (d > 0) { e.x += dx / d * 180; e.y += dy / d * 180; if (e.stunImmune <= 0) { e.stunTimer = 1.0; e.stunImmune = 3.0; } } }); boom(400, 300, '#9b59b6', 25); } else if (sk === 'fly') { this.flyT = 6; } else if (sk === 'earthquake') { enemies.forEach(e => { if (dist(this.x, this.y, e.x, e.y) < 220) { e.takeDamage(10 * this.dmgMult); if (e.stunImmune <= 0) { e.stunTimer = (e.type === 'boss') ? 0.5 : 2.5; e.stunImmune = (e.type === 'boss') ? 3.0 : 5.0; } } }); boom(this.x, this.y, '#e67e22', 40); for (let i = 0; i < 20; i++)particles.push(new Particle(this.x + (Math.random() - 0.5) * 300, this.y + (Math.random() - 0.5) * 300, '#795548', 3, 6, 30)); } else if (sk === 'iceberg') { let dx = mouse.x - this.x, dy = mouse.y - this.y, d = Math.hypot(dx, dy) || 1; icebergs.push(new Iceberg(this.x + dx / d * 120, this.y + dy / d * 120)); icebergs.push(new Iceberg(this.x + dx / d * 80 + 40, this.y + dy / d * 80)); icebergs.push(new Iceberg(this.x + dx / d * 80 - 40, this.y + dy / d * 80)); } else if (sk === 'explosion') { enemies.forEach(e => { if (dist(this.x, this.y, e.x, e.y) < 300) e.takeDamage(15 * this.dmgMult); }); boom(this.x, this.y, '#e74c3c', 60); boom(this.x, this.y, '#f39c12', 40); } else if (sk === 'timewarp') { enemies.forEach(e => { e.slowTimer = 6.0; boom(e.x, e.y, '#a29bfe', 5); }); boom(this.x, this.y, '#6c5ce7', 30); this.skillCD = 15; } }
    shoot() { 
        if (this.weaponCD > 0 || this.isJumping) return; 
        let dx = mouse.x - this.x, dy = mouse.y - this.y, d = Math.hypot(dx, dy); 
        if (!d) return; 
        dx /= d; dy /= d; 
        let col = '#feca57', spd = 10, rad = 5, wt = this.currentWeapon; 
        if (wt === 'fire') { col = '#e74c3c'; rad = 7; } 
        else if (wt === 'taser') { col = '#f1c40f'; spd = 12; } 
        else if (wt === 'ice') { col = '#74b9ff'; rad = 6; } 
        
        if (this.charType === 21) {
            let px = -dy, py = dx;
            let c1 = wt === 'normal' ? '#e056fd' : col;
            let p1 = new Projectile(this.x, this.y, dx, dy, spd, rad, c1, true, wt);
            p1.damage = this.dmgMult; p1.bounces = 5;
            projectiles.push(p1);
        } else if (this.charType === 20) {
            let px = -dy, py = dx;
            let c1 = wt === 'normal' ? '#f5f6fa' : col;
            let p1 = new Projectile(this.x + px*8, this.y + py*8, dx, dy, spd, rad, c1, true, wt);
            let p2 = new Projectile(this.x - px*8, this.y - py*8, dx, dy, spd, rad, c1, true, wt);
            p1.damage = this.dmgMult; p2.damage = this.dmgMult;
            projectiles.push(p1, p2);
        } else {
            let p = new Projectile(this.x, this.y, dx, dy, spd, rad, col, true, wt); 
            p.damage = this.dmgMult; 
            projectiles.push(p); 
        }
        
        this.weaponCD = this.baseFireRate; 
        if (typeof audio !== 'undefined') audio.playShoot(); 
    }
    takeDamage(a) { 
        if (this.shieldT > 0 || this.flyT > 0 || this.ghostT > 0 || flyMode) return; 
        
        // Passive: Ninja Dodge
        if (this.charType === 10 && Math.random() < 0.15) {
            boom(this.x, this.y, '#fff', 5);
            return;
        }
        
        // Passive: Zen Resistance
        if (this.charType === 17) a = Math.max(0.5, a - 0.5);

        super.takeDamage(a); 
        shake(0.2, 5); 
        flash(); 
        this.noDamageT = 0; 
        if (this.charType === 4 && this.hp > 0) this.invTimer = 1.0; 
        if (this.charType === 8 && a > 0 && this.hp > 0) { 
            enemies.forEach(e => { if (dist(this.x, this.y, e.x, e.y) < 150) e.takeDamage(5 * this.dmgMult); }); 
            boom(this.x, this.y, '#d35400', 35); 
        } 
        updateHUD(); 
        if (this.hp <= 0 && !flyMode) triggerGameOver(); 
    }
    update(dt) { 
        let dx = 0, dy = 0; 
        if (keys['KeyW']) dy--; if (keys['KeyS']) dy++; 
        if (keys['KeyA']) dx--; if (keys['KeyD']) dx++; 
        if (joystickActive) { dx = joystickPos.x; dy = joystickPos.y; }
        else if (dx && dy) { let l = Math.hypot(dx, dy); dx /= l; dy /= l; } 
        this.vx = dx * this.speed; this.vy = dy * this.speed; 
        if (this.flyT > 0 && !flyMode) { this.isJumping = false; this.flyT -= dt; } 
        else if (flyMode) this.isJumping = false; 
        this.updatePhysics(dt);
        if (this.charType === 6) { this.auraT += dt; if (this.auraT >= 1.0) { this.auraT = 0; enemies.forEach(e => { if (dist(this.x, this.y, e.x, e.y) < 80) { e.takeDamage(2 * this.dmgMult); boom(e.x, e.y, '#2ecc71', 3); } }); } }
        if (this.charType === 7) { this.noDamageT += dt; if (this.noDamageT >= 8 && this.hp < this.maxHp) { this.noDamageT = 0; this.hp++; updateHUD(); boom(this.x, this.y, '#f1c40f', 10); } }
        this.dashCD -= dt; this.shieldCD -= dt; this.burstCD -= dt; this.fearCD -= dt; this.ghostCD -= dt; this.magicCD -= dt; this.toxicCD -= dt; this.empCD -= dt; this.fireCD -= dt; this.luckCD -= dt; 
        this.ninjaCD -= dt; this.chemCD -= dt; this.rootCD -= dt; this.jetCD -= dt; this.cannonCD -= dt; this.roarCD -= dt; this.laserCD -= dt; this.medCD -= dt; this.tntCD -= dt; this.sunCD -= dt; this.dimCD -= dt; this.bubbleCD -= dt;
        if (this.shieldT > 0) this.shieldT -= dt; if (this.fearT > 0) this.fearT -= dt; if (this.ghostT > 0) this.ghostT -= dt; if (this.weaponCD > 0) this.weaponCD -= dt; if (this.skillCD > 0) this.skillCD -= dt;
        if (this.regenDur > 0) { this.regenDur -= dt; this.regenT -= dt; if (this.regenT <= 0) { this.hp = Math.min(this.maxHp, this.hp + 1); this.regenT = 5; updateHUD(); boom(this.x, this.y, '#2ed573', 5); } }
        if (this.burnTimer > 0) { this.burnTimer -= dt; this.burnTick += dt; if (this.burnTick >= 1) { this.burnTick = 0; this.hp -= 0.25; boom(this.x, this.y, '#e74c3c', 5); updateHUD(); if (this.hp <= 0 && !flyMode) triggerGameOver(); } }
        if (mouse.down && this.weaponCD <= 0) this.shoot();
    }
    draw(c) { if (this.isJumping) { c.fillStyle = 'rgba(0,0,0,0.5)'; c.beginPath(); c.ellipse(this.x, this.y + 20, this.radius, this.radius / 2, 0, 0, Math.PI * 2); c.fill(); } c.fillStyle = (this.invTimer > 0 && Math.floor(this.invTimer * 20) % 2 === 0) ? '#fff' : this.color; let dY = this.y, dR = this.radius; if (this.flyT > 0) { dY -= 30; c.fillStyle = 'rgba(0,0,0,0.3)'; c.beginPath(); c.ellipse(this.x, this.y + 15, 12, 6, 0, 0, Math.PI * 2); c.fill(); c.fillStyle = this.color; } else if (this.isJumping) { let jp = Math.sin((1 - this.jumpTimer / this.maxJumpTime) * Math.PI); dY -= jp * 50; dR += jp * 5; } c.beginPath(); c.moveTo(this.x - dR / 2, dY - dR); c.lineTo(this.x - dR / 2, dY - dR - 15); c.lineTo(this.x - dR / 4, dY - dR); c.moveTo(this.x + dR / 2, dY - dR); c.lineTo(this.x + dR / 2, dY - dR - 15); c.lineTo(this.x + dR / 4, dY - dR); c.arc(this.x, dY, dR, 0, Math.PI * 2); c.fill(); if (this.shieldT > 0) { c.strokeStyle = '#48dbfb'; c.lineWidth = 3; c.beginPath(); c.arc(this.x, dY, dR + 8, 0, Math.PI * 2); c.stroke(); } if (this.fearT > 0) { c.strokeStyle = '#833471'; c.lineWidth = 2; c.beginPath(); c.arc(this.x, dY, dR + 5 + Math.sin(Date.now() / 100) * 15, 0, Math.PI * 2); c.stroke(); } let mx = mouse.x - this.x, my = mouse.y - this.y, mg = Math.hypot(mx, my); if (mg > 0) { c.strokeStyle = 'rgba(255,255,255,0.3)'; c.lineWidth = 2; c.beginPath(); c.moveTo(this.x + (mx / mg) * dR, dY + (my / mg) * dR); c.lineTo(this.x + (mx / mg) * (dR + 20), dY + (my / mg) * (dR + 20)); c.stroke(); } if (this.burnTimer > 0 && Math.random() < 0.3) { c.fillStyle = '#e74c3c'; c.beginPath(); c.arc(this.x + (Math.random() - 0.5) * 15, dY - 15 + (Math.random() - 0.5) * 15, 4, 0, Math.PI * 2); c.fill(); } }
}

// ENEMY
class Enemy extends Actor {
    constructor(x, y, type, bossIdx) {
        let hp, spd, col, r, bd;
        let mbTypeLocal = 0;
        if (type === 'minion') { hp = 2 + (mapLevel - 1) * 1.5; spd = 2 + (mapLevel - 1) * 0.2; col = '#747d8c'; r = 16; } // Lobisomem Grey
        else if (type === 'miniboss') { hp = 15 + (mapLevel - 1) * 10; spd = 2.5 + (mapLevel - 1) * 0.3; mbTypeLocal = Math.floor(Math.random() * 3); col = ['#ff6348', '#1dd1a1', '#5f27cd'][mbTypeLocal]; r = 25; }
        else if (type === 'boss') {
            bd = BOSS_DEFS[bossIdx || 0];
            hp = 80 + mapLevel * 20;
            spd = 1.5;
            col = bd.color;
            r = 40;
        }
        hp = Math.ceil(hp * getDiff().enemyHpMult);
        spd = spd * getDiff().enemySpdMult;
        super(x, y, r, col, hp, spd);
        this.type = type;
        this.mbType = mbTypeLocal;
        this.fireCD = 0;
        this.stateT = 0;
        this.tpCD = 0;
        if (type === 'boss') {
            this.bossIdx = bossIdx || 0;
            this.bossDef = bd;
        }
    }
    update(dt) { if (!player) return; let dx = player.x - this.x, dy = player.y - this.y, d = Math.hypot(dx, dy); if (d > 0) { dx /= d; dy /= d; } if (this.type === 'minion') { this.vx = dx * this.speed; this.vy = dy * this.speed; if (player.fearT > 0 && d < 150) { this.vx = -dx * this.speed * 1.5; this.vy = -dy * this.speed * 1.5; } else { this.fireCD -= dt; if (this.fireCD <= 0 && d < 300) { projectiles.push(new Projectile(this.x, this.y, dx, dy, 4, 6, '#ff4757', false)); this.fireCD = 1.5 + Math.random(); } } } else if (this.type === 'miniboss') { this.vx = dx * this.speed; this.vy = dy * this.speed; if (player.fearT > 0 && d < 200) { this.vx = -dx * this.speed * 1.5; this.vy = -dy * this.speed * 1.5; } this.fireCD -= dt; if (this.fireCD <= 0) { if (this.mbType === 0) { for (let i = -1; i <= 1; i++) { let a = Math.atan2(dy, dx) + i * 0.3; projectiles.push(new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 5, 8, '#ff6348', false)); } this.fireCD = 2; } else if (this.mbType === 1) { for (let i = 0; i < 3; i++) setTimeout(() => { if (this.hp > 0) projectiles.push(new Projectile(this.x, this.y, dx, dy, 7, 7, '#1dd1a1', false)); }, i * 200); this.fireCD = 2.2; } else { for (let i = 0; i < 8; i++) { let a = (i / 8) * Math.PI * 2 + Date.now() / 1000; projectiles.push(new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 3, 9, '#5f27cd', false, 'taser')); } this.fireCD = 2.5; } } } else if (this.type === 'boss') { this.stateT += dt; this.fireCD -= dt; this.vx = dx * this.speed; this.vy = dy * this.speed; let pat = this.bossDef.pattern; if (this.fireCD <= 0) { if (pat === 'circle') { let b = 12 + mapLevel * 2; for (let i = 0; i < b; i++) { let a = (i / b) * Math.PI * 2 + this.stateT; projectiles.push(new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 3, 10, '#ff4757', false)); } this.fireCD = 1.8; } else if (pat === 'fire') { for (let i = 0; i < 5; i++) { let a = Math.atan2(dy, dx) + (i - 2) * 0.15 + this.stateT * 0.5; projectiles.push(new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 5, 8, '#e74c3c', false, 'fire')); } this.fireCD = 1.2; } else if (pat === 'ice') { let b = 8; for (let i = 0; i < b; i++) { let a = (i / b) * Math.PI * 2; let p = new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 2.5, 12, '#74b9ff', false, 'ice'); projectiles.push(p); } this.fireCD = 2.5; } else if (pat === 'thunder') { if (this.tpCD <= 0 && Math.random() < 0.3) { this.x = WALL + 60 + Math.random() * (800 - WALL * 2 - 120); this.y = WALL + 60 + Math.random() * (600 - WALL * 2 - 120); boom(this.x, this.y, '#f1c40f', 15); this.tpCD = 3; } let a = Math.atan2(dy, dx); for (let i = 0; i < 3; i++)projectiles.push(new Projectile(this.x, this.y, Math.cos(a + i * 0.1), Math.sin(a + i * 0.1), 8, 5, '#f1c40f', false, 'taser')); this.fireCD = 0.8; } else if (pat === 'shadow') { if (Math.random() < 0.4 && enemies.length < 8) { enemies.push(new Enemy(this.x + 50, this.y, 'minion')); enemies.push(new Enemy(this.x - 50, this.y, 'minion')); } let a = Math.atan2(dy, dx); projectiles.push(new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 6, 15, '#636e72', false)); this.fireCD = 1.5; } else if (pat === 'wind') { let a = Math.atan2(dy, dx); for (let i = 0; i < 3; i++) setTimeout(() => { if (this.hp > 0) projectiles.push(new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 12, 4, '#ecf0f1', false)); }, i * 100); this.fireCD = 1.0; } else if (pat === 'toxic') { for (let i = 0; i < 6; i++) { let a = (i / 6) * Math.PI * 2 + this.stateT; projectiles.push(new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 2, 8, '#55efc4', false, 'ice')); } this.fireCD = 2.0; } else if (pat === 'gravity') { if (d < 300) { player.x -= dx * 2; player.y -= dy * 2; } for (let i = 0; i < 4; i++) { let a = (i / 4) * Math.PI * 2 - this.stateT; projectiles.push(new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 4, 10, '#6c5ce7', false)); } this.fireCD = 1.5; } else if (pat === 'final_meteor') { if (this.shieldTimer === undefined) { this.shieldTimer = 5; this.meteorSeq = 0; this.atkState = 0; } this.shieldTimer -= dt; if (this.shieldTimer <= 0) { let a = Math.atan2(dy, dx); icebergs.push(new Iceberg(this.x + Math.cos(a) * 80, this.y + Math.sin(a) * 80, 'rock')); this.shieldTimer = 25; boom(this.x + Math.cos(a) * 80, this.y + Math.sin(a) * 80, '#7f8fa6', 15); } if (this.fireCD <= 0) { if (this.atkState === 0) { let b = 16; for (let i = 0; i < b; i++) { let a = (i / b) * Math.PI * 2 + this.stateT; projectiles.push(new Projectile(this.x, this.y, Math.cos(a), Math.sin(a), 4, 10, '#d35400', false, 'hellfire')); } this.meteorSeq++; this.fireCD = 0.6; if (this.meteorSeq >= 3) { this.atkState = 1; this.meteorSeq = 0; this.fireCD = 2.5; } } else if (this.atkState === 1) { for (let i = 0; i < 8; i++) { let tx = player.x + (Math.random() - 0.5) * 350; let ty = player.y + (Math.random() - 0.5) * 350; warnings.push(new Warning(tx, ty, 60, 2.0 + Math.random(), 'meteor')); } this.atkState = 0; this.fireCD = 4.0; } } } } if (this.tpCD > 0) this.tpCD -= dt; bossHealthBar.style.width = (this.hp / this.maxHp) * 100 + '%'; } this.updatePhysics(dt); }
    draw(c) { 
        c.fillStyle = (this.invTimer > 0) ? '#fff' : this.color; 
        if (this.stunTimer > 0) { c.fillStyle = '#f1c40f'; } 
        let dY = this.y;
        if (this.levitateT > 0) {
            dY -= 20 + Math.sin(Date.now() / 150) * 10;
        }
        if (this.slowTimer > 0) { 
            c.strokeStyle = '#74b9ff'; c.lineWidth = 2; c.beginPath(); c.arc(this.x, dY, this.radius + 5, 0, Math.PI * 2); c.stroke(); 
        } 
        c.beginPath(); 
        if (this.type === 'boss') { 
            let sp = 8; 
            for (let i = 0; i < sp * 2; i++) { 
                let r2 = (i % 2 === 0) ? this.radius : this.radius + 15; 
                let a = (i / (sp * 2)) * Math.PI * 2 + this.stateT; 
                c.lineTo(this.x + Math.cos(a) * r2, dY + Math.sin(a) * r2); 
            } 
            c.fill(); 
            c.fillStyle = this.bossDef.eyeColor; c.beginPath(); c.arc(this.x, dY, this.radius / 2, 0, Math.PI * 2); c.fill(); 
        } else { // LOBISOMEM / MINION
            c.beginPath(); c.arc(this.x, dY, this.radius, 0, Math.PI * 2); c.fill(); // Cabeça
            c.fillStyle = '#fff'; c.beginPath(); c.arc(this.x - 5, dY - 3, 2, 0, Math.PI*2); c.arc(this.x + 5, dY - 3, 2, 0, Math.PI*2); c.fill(); // Olhos
            c.strokeStyle = '#2f3542'; c.lineWidth = 2; c.beginPath(); c.moveTo(this.x - this.radius, dY); c.lineTo(this.x - this.radius - 8, dY - 15); c.lineTo(this.x - this.radius + 5, dY - 8); c.moveTo(this.x + this.radius, dY); c.lineTo(this.x + this.radius + 8, dY - 15); c.lineTo(this.x + this.radius - 5, dY - 8); c.stroke(); // Orelhas
        } 
        if (this.levitateT > 0) {
            c.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            c.lineWidth = 2;
            c.beginPath();
            c.arc(this.x, dY, this.radius + 6, 0, Math.PI * 2);
            c.stroke();
            let grad = c.createRadialGradient(this.x - 5, dY - 5, 0, this.x, dY, this.radius + 6);
            grad.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
            grad.addColorStop(1, 'rgba(224, 86, 253, 0.1)');
            c.fillStyle = grad;
            c.fill();
        }
    }
}

// ROOM SYSTEM (DUNGEON MAP)
class RoomSystem {
    constructor() {
        this.rooms = {}; this.currentX = 0; this.currentY = 0;
        this.generateMap();
        this.enterRoom(0, 0);
    }
    generateMap() {
        this.rooms["0,0"] = { type: 'spawn', x: 0, y: 0, cleared: true };
        let roomsCreated = 1, queue = [{ x: 0, y: 0 }];
        const addRoom = (x, y) => {
            if (this.rooms[`${x},${y}`]) return false;
            this.rooms[`${x},${y}`] = { type: 'battle', x, y, cleared: false };
            roomsCreated++; queue.push({ x, y }); return true;
        };
        let needed = 12 + mapLevel * 2;
        while (roomsCreated < needed) {
            if (queue.length === 0) break;
            let idx = Math.floor(Math.random() * queue.length), curr = queue[idx];
            let dirs = [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }, { dx: 1, dy: 0 }].sort(() => Math.random() - 0.5);
            let added = false;
            for (let d of dirs) {
                let nx = curr.x + d.dx, ny = curr.y + d.dy;
                if (!this.rooms[`${nx},${ny}`]) {
                    if (addRoom(nx, ny)) { added = true; break; }
                }
            }
            if (!added) queue.splice(idx, 1);
        }
        let roomList = Object.values(this.rooms).filter(r => r.type !== 'spawn').sort((a, b) => (b.x ** 2 + b.y ** 2) - (a.x ** 2 + a.y ** 2));
        if (roomList.length >= 7) {
            roomList[0].type = 'boss'; roomList[1].type = 'exit';
            roomList[2].type = 'miniboss'; roomList[3].type = 'miniboss'; roomList[4].type = 'miniboss';
            roomList[5].type = 'treasure'; roomList[6].type = 'npc';
        } else if (roomList.length >= 5) {
            roomList[0].type = 'boss'; roomList[1].type = 'exit';
            roomList[2].type = 'miniboss'; roomList[3].type = 'miniboss'; roomList[4].type = 'miniboss';
        } else {
            for (let r of roomList) r.type = 'miniboss';
            if (roomList[0]) roomList[0].type = 'boss';
            if (roomList[1]) roomList[1].type = 'exit';
        }
    }
    enterRoom(x, y) {
        this.currentX = x; this.currentY = y;
        let rd = this.rooms[`${x},${y}`];
        this.type = rd.type; this.isCleared = rd.cleared; this.doors = []; this._hadMiniboss = false;

        // Passive: Druid Healing on entering room
        if (player && player.charType === 12 && !rd.visited) {
            player.hp = Math.min(player.maxHp, player.hp + 1);
            updateHUD();
        }

        enemies = []; projectiles = []; particles = []; icebergs = []; warnings = [];
        if (!rd.visited) { rd.pickups = []; rd.visited = true; }
        pickups = rd.pickups;
        let cx = 400, cy = 300;
        if (this.rooms[`${x},${y - 1}`]) this.doors.push({ x: cx - 40, y: 0, w: 80, h: Math.max(30, WALL), side: 'N', toType: this.rooms[`${x},${y - 1}`].type });
        if (this.rooms[`${x},${y + 1}`]) this.doors.push({ x: cx - 40, y: 600 - WALL, w: 80, h: Math.max(30, WALL), side: 'S', toType: this.rooms[`${x},${y + 1}`].type });
        if (this.rooms[`${x - 1},${y}`]) this.doors.push({ x: 0, y: cy - 40, w: WALL, h: 80, side: 'W', toType: this.rooms[`${x - 1},${y}`].type });
        if (this.rooms[`${x + 1},${y}`]) this.doors.push({ x: 800 - WALL, y: cy - 40, w: WALL, h: 80, side: 'E', toType: this.rooms[`${x + 1},${y}`].type });
        if (this.type === 'spawn') { roomCounter.innerText = `Início`; roomCounter.style.color = '#a4b0be'; }
        else if (this.type === 'shop') { roomCounter.innerText = 'Loja'; roomCounter.style.color = '#feca57'; if (!rd.shopVisited) { gameState = 'SHOP'; openShop(); } }
        else if (this.type === 'exit') { roomCounter.innerText = 'Saída - Próx Andar'; roomCounter.style.color = '#9b59b6'; this.isCleared = true; if (!rd.looted) { pickups.push(new Pickup(cx, cy, 'exit', 0)); rd.looted = true; } }
        else if (this.type === 'treasure') { 
            roomCounter.innerText = 'Sala do Tesouro'; roomCounter.style.color = '#f1c40f'; this.isCleared = true; 
            if (!rd.looted) { 
                let gAmt = 50;
                if (player && player.charType === 18) gAmt = 80; // Miner bonus
                pickups.push(new Pickup(cx - 30, cy, 'gold', gAmt)); 
                pickups.push(new Pickup(cx + 30, cy, 'gold', gAmt)); 
                pickups.push(new Pickup(cx, cy + 30, 'heart', Math.floor(Math.random() * 2) + 1)); 
                rd.looted = true; 
            } 
        }
        else if (this.type === 'npc') {
            roomCounter.innerText = 'Anjo Guardião'; roomCounter.style.color = '#3498db';
            if (rd.rewardTaken) {
                // Already done, just mark cleared
                this.isCleared = true;
            } else if (!rd.npcSpawned) {
                // Spawn the caged mini-boss
                rd.npcSpawned = true;
                rd.cleared = false;
                this.isCleared = false;
                this.spawnTimer = 2;
                this.pendingEnemies = [new Enemy(cx, cy, 'miniboss')];
                this._isNpcRoom = true;
            }
        }
        else if (!this.isCleared) {
            this.spawnTimer = 2; this.pendingEnemies = [];
            if (this.type === 'boss') { let bi; if (mapLevel >= MAX_LEVELS) { bi = BOSS_DEFS.findIndex(b => b.pattern === 'final_meteor'); if (bi === -1) bi = Math.floor(Math.random() * BOSS_DEFS.length); } else { let normalBosses = BOSS_DEFS.filter(b => b.pattern !== 'final_meteor'); let rBoss = normalBosses[Math.floor(Math.random() * normalBosses.length)]; bi = BOSS_DEFS.indexOf(rBoss); } this.pendingEnemies.push(new Enemy(cx, cy, 'boss', bi)); roomCounter.innerText = `${BOSS_DEFS[bi].name}`; roomCounter.style.color = '#ff4757'; bossHealthContainer.style.display = 'block'; bossNameEl.innerText = BOSS_DEFS[bi].name; }
            else if (this.type === 'miniboss') { this.pendingEnemies.push(new Enemy(cx, cy, 'miniboss'), new Enemy(cx - 100, cy, 'minion'), new Enemy(cx + 100, cy, 'minion')); roomCounter.innerText = `Mini-Chefe`; roomCounter.style.color = '#ffa502'; this._hadMiniboss = true; }
            else { let mc = 3 + mapLevel + Math.floor(Math.random() * 3); for (let i = 0; i < mc; i++)this.pendingEnemies.push(new Enemy(WALL + 50 + Math.random() * (700 - WALL * 2), WALL + 50 + Math.random() * (500 - WALL * 2), 'minion')); roomCounter.innerText = `Lobisomens`; roomCounter.style.color = '#e0e0e0'; }
        } else { roomCounter.innerText = `Limpo`; roomCounter.style.color = '#7f8fa6'; }
    }
    update(dt) {
        if (this.spawnTimer > 0) {
            this.spawnTimer -= dt;
            if (this.spawnTimer <= 0) {
                enemies = this.pendingEnemies;
                this.pendingEnemies = [];
                enemies.forEach(e => boom(e.x, e.y, '#fff', 15));
            }
        } else if (!this.isCleared && enemies.length === 0 && !['spawn', 'shop', 'exit', 'treasure', 'npc'].includes(this.type)) {
            this.isCleared = true; this.rooms[`${this.currentX},${this.currentY}`].cleared = true;
            if (this._hadMiniboss) pickups.push(new Pickup(400, 300, 'gold', 10 + Math.floor(Math.random() * 15)));
            if (this.type === 'boss') {
                bossHealthContainer.style.display = 'none'; pickups.push(new Pickup(400, 300, 'gold', 30 + Math.floor(Math.random() * 20)));
                this.rooms[`${this.currentX},${this.currentY}`].type = 'shop'; this.enterRoom(this.currentX, this.currentY); return;
            }
        } else if (this._isNpcRoom && !this.isCleared && enemies.length === 0 && this.spawnTimer <= 0) {
            // NPC room mini-boss defeated — offer reward
            this.isCleared = true;
            this.rooms[`${this.currentX},${this.currentY}`].cleared = true;
            this._isNpcRoom = false;
            gameState = 'REWARD';
            switchScreen('reward');
        }
        for (let i = pickups.length - 1; i >= 0; i--) {
            pickups[i].update(dt);
            if (dist(player.x, player.y, pickups[i].x, pickups[i].y) < player.radius + pickups[i].radius) {
                if (pickups[i].type === 'gold') { 
                    let v = Math.round(pickups[i].value * goldMult); 
                    if (player.charType === 9 || player.charType === 14) v = Math.ceil(v * 1.5); // Luck/Pirate
                    player.gold += v; goldCounter.innerText = player.gold; boom(pickups[i].x, pickups[i].y, '#feca57', 10); 
                    if (typeof audio !== 'undefined') audio.playCoin(); pickups.splice(i, 1); 
                }
                else if (pickups[i].type === 'heart') { 
                    let val = pickups[i].value;
                    if (player.charType === 11) val *= 1.5; // Alchemist
                    player.hp = Math.min(player.maxHp, player.hp + val); 
                    updateHUD(); boom(pickups[i].x, pickups[i].y, '#ff4757', 15); 
                    if (typeof audio !== 'undefined') audio.playHeal(); pickups.splice(i, 1); 
                }
                else if (pickups[i].type === 'buff') { 
                    player.dmgMult += 0.2; boom(pickups[i].x, pickups[i].y, '#3498db', 30); 
                    if (typeof audio !== 'undefined') audio.playHeal(); pickups.splice(i, 1); 
                }
                else if (pickups[i].type === 'exit') {
                    mapLevel++; 
                    if (mapLevel > MAX_LEVELS) {
                        if (MAX_LEVELS === 8 && !takenBossDamage && !cheatsUsed) {
                            localStorage.setItem('toca_char20', 'true');
                            if (typeof initSecretCharacters === 'function') initSecretCharacters();
                        }
                        gameState = 'VICTORY'; switchScreen('victory');
                        if (!cheatsUsed) {
                            let bvt = parseFloat(localStorage.getItem('toca_vic_time') || 999999);
                            if (gameTime < bvt) { localStorage.setItem('toca_vic_time', gameTime.toString()); bvt = gameTime; }
                            vicFinalTimeEl.innerText = `Tempo Total: ${formatTime(gameTime)}`; vicBestTimeEl.innerText = `Melhor Tempo: ${formatTime(bvt)}`;
                        } else {
                            vicFinalTimeEl.innerText = `Tempo Total: ${formatTime(gameTime)} (Cheats)`; vicBestTimeEl.innerText = `Melhor Tempo: N/A`;
                        }
                        return;
                    } else { floorCounterEl.innerText = mapLevel; currentRoom = new RoomSystem(); return; }
                }
            }
        }
        if (this.isCleared && player) {
            for (let d of this.doors) { if (player.x + player.radius + 10 > d.x && player.x - player.radius - 10 < d.x + d.w && player.y + player.radius + 10 > d.y && player.y - player.radius - 10 < d.y + d.h) { this.transition(d.side); break; } }
        }
    }
    transition(s) {
        let cx = 400, cy = 300, tx = this.currentX, ty = this.currentY;
        if (s === 'N') { player.x = cx; player.y = 600 - WALL - player.radius - 20; ty--; }
        else if (s === 'S') { player.x = cx; player.y = WALL + player.radius + 20; ty++; }
        else if (s === 'E') { player.x = WALL + player.radius + 20; player.y = cy; tx++; }
        else if (s === 'W') { player.x = 800 - WALL - player.radius - 20; player.y = cy; tx--; }
        this.enterRoom(tx, ty);
    }
    drawBase(c) {
        c.fillStyle = this.type === 'boss' ? '#2c0407' : this.type === 'shop' ? '#1a2a1e' : this.type === 'exit' ? '#23153c' : this.type === 'treasure' ? '#332918' : this.type === 'npc' ? '#103340' : '#1e2029';
        if (this.type === 'spawn') c.fillStyle = '#1e2922';
        c.fillRect(0, 0, 800, 600); c.fillStyle = '#2f3542'; c.fillRect(0, 0, 800, WALL); c.fillRect(0, 600 - WALL, 800, WALL); c.fillRect(0, 0, WALL, 600); c.fillRect(800 - WALL, 0, WALL, 600);
        if (this.type === 'shop' && this.isCleared) { c.font = '28px VT323'; c.fillStyle = '#feca57'; c.textAlign = 'center'; c.fillText('🏪 Portas estão abertas', 400, 300); }
        // Draw NPC cage when mini-boss is alive
        if (this.type === 'npc' && !this.isCleared && this.spawnTimer <= 0 && enemies.length > 0) {
            c.strokeStyle = '#3498db'; c.lineWidth = 4;
            let cageX = 400, cageY = 300, cageR = 60;
            for (let i = 0; i < 8; i++) {
                let a = (i / 8) * Math.PI * 2;
                let bx = cageX + Math.cos(a) * cageR, by = cageY + Math.sin(a) * cageR;
                c.beginPath(); c.moveTo(cageX + Math.cos(a) * (cageR - 20), cageY + Math.sin(a) * (cageR - 20));
                c.lineTo(bx, by); c.stroke();
            }
            c.strokeStyle = 'rgba(52,152,219,0.4)'; c.lineWidth = 3;
            c.beginPath(); c.arc(cageX, cageY, cageR, 0, Math.PI * 2); c.stroke();
            c.fillStyle = 'rgba(52,152,219,0.06)'; c.beginPath(); c.arc(cageX, cageY, cageR, 0, Math.PI * 2); c.fill();
            c.font = '20px VT323'; c.fillStyle = '#74b9ff'; c.textAlign = 'center';
            c.fillText('🔒 Derrote o guardião para libertar o Anjo!', 400, WALL + 22);
        }
        if (this.isCleared) {
            for (let d of this.doors) {
                let rClr = this.rooms[d.side === 'N' ? `${this.currentX},${this.currentY - 1}` : d.side === 'S' ? `${this.currentX},${this.currentY + 1}` : d.side === 'E' ? `${this.currentX + 1},${this.currentY}` : `${this.currentX - 1},${this.currentY}`].cleared;
                c.fillStyle = rClr ? '#2ed573' : d.toType === 'boss' ? '#ff4757' : d.toType === 'exit' ? '#9b59b6' : d.toType === 'miniboss' ? '#ffa502' : d.toType === 'treasure' ? '#f1c40f' : d.toType === 'npc' ? '#3498db' : '#2ed573';
                c.fillRect(d.x, d.y, d.w, d.h);
                if (!rClr && ['boss', 'exit', 'miniboss', 'treasure', 'npc'].includes(d.toType)) { c.font = '14px VT323'; c.fillStyle = '#fff'; c.textAlign = 'center'; let txt = d.toType === 'boss' ? 'BOSS' : d.toType === 'exit' ? 'SAIDA' : d.toType === 'treasure' ? 'BAU' : d.toType === 'npc' ? 'NPC' : 'MINI'; c.fillText(txt, d.x + d.w / 2, d.y + d.h / 2 + 5); }
            }
        } else if (!['spawn', 'shop', 'exit', 'treasure', 'npc'].includes(this.type)) {
            let txt = this.spawnTimer > 0 ? `PREPARE-SE: ${Math.ceil(this.spawnTimer)}s` : 'BLOQUEADO';
            let col = this.spawnTimer > 0 ? '#feca57' : '#ff4757';
            c.fillStyle = col; c.font = '20px VT323'; c.textAlign = 'center'; c.fillText(txt, 400, WALL + 20);
        }
        pickups.forEach(p => p.draw(c)); icebergs.forEach(ib => ib.draw(c));
    }
    drawUI(c) {
        this.drawMinimap(c);
    }
    drawMinimap(c) {
        c.save(); c.translate(700, 480); let s = 6, ms = 15;
        c.globalAlpha = 0.5; c.fillStyle = '#000'; c.fillRect(-50, -50, 100, 100); c.globalAlpha = 1;
        c.strokeStyle = '#576574'; c.lineWidth = 2;
        Object.values(this.rooms).forEach(r => {
            let cx = (r.x - this.currentX) * ms, cy = (r.y - this.currentY) * ms;
            if (this.rooms[`${r.x + 1},${r.y}`]) { c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + ms, cy); c.stroke(); }
            if (this.rooms[`${r.x},${r.y + 1}`]) { c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx, cy + ms); c.stroke(); }
        });
        Object.values(this.rooms).forEach(r => {
            let cx = (r.x - this.currentX) * ms, cy = (r.y - this.currentY) * ms;
            let isCurrent = (r.x === this.currentX && r.y === this.currentY);
            c.fillStyle = isCurrent ? '#fff' : r.cleared ? '#1dd1a1' : r.type === 'exit' ? '#9b59b6' : r.type === 'shop' ? '#feca57' : r.type === 'boss' ? '#ff4757' : r.type === 'miniboss' ? '#ffa502' : '#c8d6e5';
            
            let size = isCurrent ? s * 1.8 + Math.sin(Date.now() / 150) * 3 : s;
            if (r.type === 'exit' || Math.hypot(r.x - this.currentX, r.y - this.currentY) < 3 || isCurrent) {
                if (isCurrent) {
                    // Sombra/Brilho para o jogador no mapa
                    c.shadowColor = '#fff'; c.shadowBlur = 10;
                    c.beginPath(); c.arc(cx, cy, size/2, 0, Math.PI*2); c.fill();
                    c.shadowBlur = 0;
                } else {
                    c.fillRect(cx - size / 2, cy - size / 2, size, size);
                }
            }
        });
        c.restore();
    }
}

// SHOP
function openShop() { shopGoldEl.innerText = player.gold; shopItemsEl.innerHTML = ''; let items = getRandomShopItems(3); items.forEach(item => { let div = document.createElement('div'); div.className = `shop-item rarity-${item.rarity}`; div.innerHTML = `<div class="item-rarity">${item.rarity.toUpperCase()}</div><h4>${item.emoji} ${item.name}</h4><p class="item-desc">${item.desc}</p><p class="item-price">🪙 ${item.price}</p>`; div.addEventListener('click', () => buyItem(item, div)); shopItemsEl.appendChild(div); }); switchScreen('shop'); }
function buyItem(item, el) { if (player.gold < item.price) return; player.gold -= item.price; goldCounter.innerText = player.gold; shopGoldEl.innerText = player.gold; el.style.opacity = '0.3'; el.style.pointerEvents = 'none'; 
    // Rastrear compra para desbloqueio do Colecionador
    let purchased = JSON.parse(localStorage.getItem('toca_purchased') || '[]');
    if (item.key && !purchased.includes(item.key)) {
        purchased.push(item.key);
        localStorage.setItem('toca_purchased', JSON.stringify(purchased));
        let allItems = Object.keys(ITEM_CATALOG);
        if (allItems.every(k => purchased.includes(k))) {
            localStorage.setItem('toca_char21', 'true');
            if (typeof initSecretCharacters === 'function') initSecretCharacters();
        }
    }
    if (item.type === 'heal') { player.hp = Math.min(player.maxHp, player.hp + player.maxHp * item.value); updateHUD(); boom(player.x, player.y, '#2ed573', 15); } else if (item.type === 'heal_regen') { player.hp = Math.min(player.maxHp, player.hp + player.maxHp * item.value); player.regenDur = 30; player.regenT = 5; updateHUD(); } else if (item.type === 'weapon') { player.currentWeapon = item.weaponId; weaponNameEl.innerText = item.name; } else if (item.type === 'buff') { if (item.buffId === 'strength') player.dmgMult += 0.25; if (item.buffId === 'speed') player.speed *= 1.15; if (item.buffId === 'shield') { player.shieldT = 8; boom(player.x, player.y, '#48dbfb', 20); } if (item.buffId === 'maxhp') { player.maxHp += 2; player.hp += 2; updateHUD(); boom(player.x, player.y, '#e74c3c', 15); } } else if (item.type === 'skill') { player.activeSkill = item.skillId; abilityNameEl.innerText = item.name; } }
function closeShop() { let rd = currentRoom.rooms[`${currentRoom.currentX},${currentRoom.currentY}`]; if (rd) rd.shopVisited = true; switchScreen('hud'); gameState = 'PLAYING'; lastTime = performance.now(); requestAnimationFrame(gameLoop); }

// MAIN
function startGame() { 
    if (typeof audio !== 'undefined') audio.stopTitleMusic();
    document.body.style.backgroundImage = 'none'; // Limpa a capa para o jogo
    document.getElementById('game-container').classList.remove('menu-mode');
    gameState = 'PLAYING'; 
    switchScreen('hud'); 
    mapLevel = 1; 
    floorCounterEl.innerText = mapLevel; 
    gameTime = 0; 
    goldMult = 1.0; 
    takenBossDamage = false;
    player = new Player(400, 300, selectedChar); 
    currentRoom = new RoomSystem(); 
    bossHealthContainer.style.display = 'none'; 
    goldCounter.innerText = '0'; 
    weaponNameEl.innerText = 'Padrão'; 
    abilityNameEl.innerText = '-'; 
    skillCdEl.innerText = ''; 
    updateHUD(); 
    lastTime = performance.now(); 
    requestAnimationFrame(gameLoop); 
}
function updateHUD() { if (!player) return; let p = Math.max(0, (player.hp / player.maxHp) * 100); healthBar.style.width = p + '%'; healthBar.style.backgroundColor = p < 30 ? '#ff4757' : 'var(--health)'; }
function updateCooldowns() {
    if (!player) return;
    
    // Character Ability CD
    let icd = player.getInnateCD();
    if (icd > 0) { 
        charAbilityCdEl.innerText = `${Math.ceil(icd)}s`; 
        charAbilityCdEl.style.color = '#ff4757'; 
    } else { 
        charAbilityCdEl.innerText = 'PRONTO'; 
        charAbilityCdEl.style.color = '#2ed573'; 
    }

    // Extra Skill CD
    if (player.activeSkill) {
        if (player.skillCD > 0) {
            skillCdEl.innerText = `(${Math.ceil(player.skillCD)}s)`;
            skillCdEl.style.color = '#ff4757';
        } else {
            skillCdEl.innerText = 'PRONTO';
            skillCdEl.style.color = '#2ed573';
        }
    } else {
        skillCdEl.innerText = '';
    }

    // Mobile specific feedback
    if (isTouchDevice()) {
        const mAbBtn = document.getElementById('btn-m-ability');
        const mSkBtn = document.getElementById('btn-m-skill');
        
        if (mAbBtn) {
            if (icd > 0) {
                mAbBtn.setAttribute('data-cd', Math.ceil(icd));
                mAbBtn.classList.add('on-cd');
            } else {
                mAbBtn.removeAttribute('data-cd');
                mAbBtn.classList.remove('on-cd');
            }
        }
        
        if (mSkBtn && player.activeSkill) {
            if (player.skillCD > 0) {
                mSkBtn.setAttribute('data-cd', Math.ceil(player.skillCD));
                mSkBtn.classList.add('on-cd');
            } else {
                mSkBtn.removeAttribute('data-cd');
                mSkBtn.classList.remove('on-cd');
            }
        }
    }
}
function triggerGameOver() { if (flyMode) return; gameState = 'GAMEOVER'; switchScreen('gameOver'); bossHealthContainer.style.display = 'none'; if (!cheatsUsed) { let bt = parseFloat(localStorage.getItem('toca_surv_time') || 0); if (gameTime > bt) { localStorage.setItem('toca_surv_time', gameTime.toString()); bt = gameTime; } goFinalTimeEl.innerText = `Tempo Sobrevivido: ${formatTime(gameTime)}`; goBestTimeEl.innerText = `Melhor Sobrevivência: ${formatTime(bt)}`; } else { goFinalTimeEl.innerText = `Survive: ${formatTime(gameTime)} (Cheats)`; goBestTimeEl.innerText = "N/A"; } }

function checkCollisions() { 
    for (let i = projectiles.length - 1; i >= 0; i--) { 
        let p = projectiles[i]; 
        if (p.isPlayerObj) { 
            for (let j = enemies.length - 1; j >= 0; j--) { 
                let e = enemies[j]; 
                if (dist(p.x, p.y, e.x, e.y) < p.radius + e.radius) { 
                    e.takeDamage(p.damage); 
                    if (p.weaponType === 'fire') { e.takeDamage(0.5); boom(p.x, p.y, '#e74c3c', 5); } 
                    if (p.weaponType === 'taser') {
                        if (e.stunTimer <= 0 && e.stunImmune <= 0) {
                            e.stunTimer = (e.type === 'boss') ? 0.2 : 1.5;
                            e.stunImmune = (e.type === 'boss') ? 2.0 : 4.0;
                        }
                    }
                    if (p.weaponType === 'ice') e.slowTimer = (e.type === 'boss') ? 1.0 : 3.0; 
                    if (p.weaponType === 'cyborg_emp_ball') { 
                        // Explosão EMP em área GIGANTE - respeita imunidade a stun
                        enemies.forEach(ae => {
                            if (dist(p.x, p.y, ae.x, ae.y) < 200) {
                                ae.takeDamage(p.damage * 0.7);
                                if (ae.stunImmune <= 0) {
                                    ae.stunTimer = (ae.type === 'boss') ? 0.4 : 1.5;
                                    ae.stunImmune = (ae.type === 'boss') ? 3.0 : 5.0;
                                }
                                boom(ae.x, ae.y, '#74b9ff', 8);
                            }
                        });
                        if (e.stunImmune <= 0) {
                            e.stunTimer = (e.type === 'boss') ? 0.5 : 2.0;
                            e.stunImmune = (e.type === 'boss') ? 3.0 : 5.0;
                        }
                        boom(p.x, p.y, '#00d2d3', 50); 
                    } 
                    else if (player.charType === 16) { 
                        e.slowTimer = Math.min(e.slowTimer + 1.5, 3.0); 
                        enemies.forEach(other_e => { 
                            if (other_e !== e && dist(e.x, e.y, other_e.x, other_e.y) < 240) { 
                                other_e.takeDamage(p.damage * 0.65); 
                                other_e.slowTimer = Math.min(other_e.slowTimer + 1.5, 3.0); 
                                boom(other_e.x, other_e.y, '#00d2d3', 10); 
                                let ds = dist(e.x, e.y, other_e.x, other_e.y); 
                                let steps = Math.max(5, Math.floor(ds / 10)); 
                                for(let step=1; step<steps; step++) { 
                                    particles.push(new Particle(e.x + (other_e.x - e.x)*(step/steps), e.y + (other_e.y - e.y)*(step/steps), '#48dbfb', 3, 10, 20)); 
                                } 
                            } 
                        }); 
                    } 
                    boom(p.x, p.y, p.color, 4); 
                    if (e.hp <= 0) { 
                        enemies.splice(j, 1); 
                        if (player.charType === 3 && Math.random() < 0.20) { 
                            player.hp = Math.min(player.maxHp, player.hp + 1); 
                            updateHUD(); 
                            boom(player.x, player.y, '#2ed573', 12); 
                        } 
                    } 
                    p.active = false; 
                    // Ricochete: se tem bounces, redireciona para próximo inimigo
                    if (p.bounces > 0) {
                        p.active = true;
                        p.lastHitId = j;
                        let nearest = null, nd = Infinity;
                        for (let k = 0; k < enemies.length; k++) {
                            if (k === j) continue;
                            let dd = dist(p.x, p.y, enemies[k].x, enemies[k].y);
                            if (dd < nd) { nd = dd; nearest = enemies[k]; }
                        }
                        if (nearest) {
                            let rdx = nearest.x - p.x, rdy = nearest.y - p.y;
                            let rd = Math.hypot(rdx, rdy) || 1;
                            let spd = Math.hypot(p.vx, p.vy);
                            p.vx = (rdx / rd) * spd; p.vy = (rdy / rd) * spd;
                        } else {
                            // Sem alvo: reflete aleatório
                            let angle = Math.random() * Math.PI * 2;
                            let spd = Math.hypot(p.vx, p.vy);
                            p.vx = Math.cos(angle) * spd; p.vy = Math.sin(angle) * spd;
                        }
                        p.bounces--;
                        boom(p.x, p.y, p.color, 5);
                    }
                    break; 
                } 
            } 
        } else { 
            if (!player.isJumping && player.flyT <= 0) { 
                if (dist(p.x, p.y, player.x, player.y) < p.radius + player.radius * 0.8) { 
                    if (currentRoom.type === 'boss' && !(p.radius === 6 && p.color === '#ff4757' && p.weaponType === 'normal')) takenBossDamage = true;
                    if (p.weaponType === 'ice') player.slowTimer = 2.5; 
                    else if (p.weaponType === 'hellfire') player.burnTimer = 8; 
                    player.takeDamage(p.damage + (mapLevel - 1) * 0.55); 
                    p.active = false; 
                } 
            } 
        } 
        if (!p.active) projectiles.splice(i, 1); 
    } 
    if (player && !player.isJumping && player.flyT <= 0) { 
        for (let e of enemies) { 
            if (dist(player.x, player.y, e.x, e.y) < player.radius + e.radius - 6) { 
                if (e.type === 'boss') takenBossDamage = true;
                player.takeDamage(1.2 + (mapLevel - 1) * 0.4); 
                let dx = player.x - e.x, dy = player.y - e.y, mg = Math.hypot(dx, dy); 
                if (mg > 0) { player.x += dx / mg * 24; player.y += dy / mg * 24; } 
            } 
        } 
    } 
}

function initSecretCharacters() {
    let char20Unlocked = localStorage.getItem('toca_char20') === 'true';
    if (char20Unlocked) {
        let card = document.querySelector('.char-card[data-char="20"]');
        if (card) {
            card.classList.remove('locked');
            card.innerHTML = '<h4>Coelho Dimensional</h4><p>Passiva: Tiro Duplo Lâmina</p><p>Ativa (Q): Corte Dimensional (-50% HP Máx)</p>';
        }
    }
    let char21Unlocked = localStorage.getItem('toca_char21') === 'true';
    if (char21Unlocked) {
        let card = document.querySelector('.char-card[data-char="21"]');
        if (card) {
            card.classList.remove('locked');
            card.innerHTML = '<h4>Coelho Colecionador</h4><p>Passiva: Tiro Ricochete (5x)</p><p>Ativa (Q): Bolha Coletora (Choca ao centro)</p>';
        }
    }
}
initSecretCharacters();

function gameLoop(ts) { 
    if (gameState !== 'PLAYING') return; 
    let dt = (ts - lastTime) / 1000; 
    if (dt > 0.1) dt = 0.1; 
    lastTime = ts; 
    handleGamepad();
    gameTime += dt; 
    gameTimerEl.innerText = formatTime(gameTime); 
    player.update(dt); 
    currentRoom.update(dt); 
    enemies.forEach(e => e.update(dt)); 
    projectiles.forEach(p => p.update(dt)); 
    particles = particles.filter(p => p.update(dt)); 
    icebergs = icebergs.filter(ib => ib.update(dt)); 
    warnings = warnings.filter(w => w.update(dt)); 
    checkCollisions(); 
    updateCooldowns();
    
    // Atualizar visibilidade do botão de Skill Extra no mobile
    const mSkillBtn = document.getElementById('btn-m-skill');
    if (mSkillBtn && player) {
        mSkillBtn.style.display = player.activeSkill ? 'flex' : 'none';
        if (player.skillCD > 0) mSkillBtn.style.opacity = '0.5'; else mSkillBtn.style.opacity = '1';
    }

    ctx.clearRect(0, 0, 800, 600);
    ctx.save(); 
    if (screenShakeT > 0) { 
        ctx.translate((Math.random() - .5) * screenShakeM, (Math.random() - .5) * screenShakeM); 
        screenShakeT -= dt; 
    } 
    currentRoom.drawBase(ctx); 
    warnings.forEach(w => w.draw(ctx)); 
    enemies.forEach(e => e.draw(ctx)); 
    projectiles.forEach(p => p.draw(ctx)); 
    particles.forEach(p => p.draw(ctx)); 
    player.draw(ctx); 
    ctx.restore(); 
    if (lightingEnabled && !fullBright) { 
        lightCtx.globalCompositeOperation = 'source-over'; 
        lightCtx.clearRect(0, 0, 800, 600); 
        lightCtx.fillStyle = 'rgba(10, 10, 15, 0.88)'; 
        lightCtx.fillRect(0, 0, 800, 600); 
        lightCtx.globalCompositeOperation = 'destination-out'; 
        let drawLight = (X, Y, R, int) => { 
            let g = lightCtx.createRadialGradient(X, Y, 0, X, Y, R); 
            g.addColorStop(0, `rgba(0,0,0,${int})`); 
            g.addColorStop(1, 'rgba(0,0,0,0)'); 
            lightCtx.fillStyle = g; 
            lightCtx.beginPath(); 
            lightCtx.arc(X, Y, R, 0, Math.PI * 2); 
            lightCtx.fill(); 
        }; 
        let lRadius = 250;
        if (player.charType === 19) lRadius = 400; // Radiant
        else if (player.charType === 16) lRadius = 320; // Cyborg
        drawLight(player.x, player.y, lRadius, 1); 
        projectiles.forEach(p => drawLight(p.x, p.y, p.radius * 8, 0.7)); 
        particles.forEach(p => drawLight(p.x, p.y, p.size * 6, 0.5)); 
        enemies.forEach(e => { if (['boss', 'miniboss'].includes(e.type)) drawLight(e.x, e.y, e.radius * 5, 0.6); }); 
        icebergs.forEach(i => drawLight(i.x, i.y, 80, 0.4)); 
        pickups.forEach(p => drawLight(p.x, p.y, 90, 0.5)); 
        warnings.forEach(w => drawLight(w.x, w.y, 100, 0.5)); 
        if (['shop', 'treasure', 'spawn', 'npc'].includes(currentRoom.type)) drawLight(400, 300, 480, 0.6); 
        lightCtx.globalCompositeOperation = 'source-over'; 
        ctx.drawImage(lightCanvas, 0, 0); 
    } 
    if (flashT > 0) { 
        ctx.fillStyle = `rgba(255, 255, 255, ${flashT * 2})`; 
        ctx.fillRect(0, 0, 800, 600); 
        flashT -= dt; 
    } 
    currentRoom.drawUI(ctx); 
    requestAnimationFrame(gameLoop); 
}
