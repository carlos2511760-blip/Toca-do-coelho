const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Desabilitar antialiasing para efeito pixel art
ctx.imageSmoothingEnabled = false;

// --- ELEMENTOS DE UI ---
const screens = {
    mainMenu: document.getElementById('main-menu'),
    hud: document.getElementById('hud'),
    gameOver: document.getElementById('game-over'),
    victory: document.getElementById('victory')
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

// --- VARIÁVEIS GLOBAIS ---
let gameState = 'MENU'; // MENU, PLAYING, GAMEOVER, VICTORY
let selectedChar = 0; // 0: Veloz, 1: Tanque
let lastTime = 0;

// Entidades
let player;
let enemies = [];
let projectiles = [];
let particles = [];
let currentRoom;
let mapLevel = 1;
const MAX_LEVELS = 5;

// Inputs
const keys = {};
const mouse = { x: 0, y: 0, down: false };

// --- EVENT LISTENERS ---
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
    if (e.code === 'Space' && gameState === 'PLAYING' && player) {
        player.jump();
    }
    if (e.code === 'KeyQ' && gameState === 'PLAYING' && player) {
        player.useAbility();
    }
});
window.addEventListener('keyup', (e) => keys[e.code] = false);

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mouse.x = (e.clientX - rect.left) * scaleX;
    mouse.y = (e.clientY - rect.top) * scaleY;
});

canvas.addEventListener('mousedown', () => {
    mouse.down = true;
});
canvas.addEventListener('mouseup', () => {
    mouse.down = false;
    if (player && gameState === 'PLAYING') {
        player.shoot(); // Single shot on click
    }
});

// UI Event Listeners
charCards.forEach(card => {
    card.addEventListener('click', () => {
        charCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedChar = parseInt(card.dataset.char);
    });
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', returnToMenu);
victoryBtn.addEventListener('click', returnToMenu);

function switchScreen(screenId) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    if (screenId) {
        screens[screenId].classList.add('active');
    }
}

function returnToMenu() {
    gameState = 'MENU';
    switchScreen('mainMenu');
}

// --- UTILIDADES ---
function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

// --- CLASSES ---
class Particle {
    constructor(x, y, color, speed, size, life) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.color = color;
        this.size = size;
        this.life = life;
        this.maxLife = life;
    }
    update(dt) {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= dt * 60; // scale based on 60fps
        return this.life > 0;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        ctx.globalAlpha = 1.0;
    }
}

function spawnExplosion(x, y, color, numParticles) {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y, color, 8, Math.random() * 4 + 2, Math.random() * 20 + 10));
    }
}

class Projectile {
    constructor(x, y, vx, vy, speed, radius, color, isPlayerObj) {
        this.x = x;
        this.y = y;
        this.vx = vx * speed;
        this.vy = vy * speed;
        this.radius = radius;
        this.color = color;
        this.isPlayerObj = isPlayerObj;
        this.damage = 1;
        this.active = true;
    }
    update(dt) {
        this.x += this.vx * (dt * 60);
        this.y += this.vy * (dt * 60);
        // Colisão com parede
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.active = false;
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Actor {
    constructor(x, y, radius, color, maxHp, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.speed = speed;
        this.vx = 0;
        this.vy = 0;
        this.isJumping = false;
        this.jumpTimer = 0;
        this.invincibleTimer = 0;
    }

    takeDamage(amount) {
        if (this.invincibleTimer > 0 || this.isJumping) return;
        this.hp -= amount;
        this.invincibleTimer = 0.5; // meio segundo de i-frames
        if (this.hp <= 0 && this instanceof Enemy) {
            spawnExplosion(this.x, this.y, this.color, 15);
        }
    }

    updatePhysics(dt) {
        this.x += this.vx * (dt * 60);
        this.y += this.vy * (dt * 60);

        if (this.invincibleTimer > 0) {
            this.invincibleTimer -= dt;
        }

        if (this.isJumping) {
            this.jumpTimer -= dt;
            if (this.jumpTimer <= 0) {
                this.isJumping = false;
            }
        }

        this.constrainToBounds();
    }

    constrainToBounds() {
        // Paredes (espessura 40)
        let wallThickness = 40;
        this.x = Math.max(wallThickness + this.radius, Math.min(canvas.width - wallThickness - this.radius, this.x));
        this.y = Math.max(wallThickness + this.radius, Math.min(canvas.height - wallThickness - this.radius, this.y));
    }
}

class Player extends Actor {
    constructor(x, y, charType) {
        let maxHp = 5;
        let speed = 4;
        let color = '#e0e0e0';

        if (charType === 0) { speed = 5.5; color = '#00d2d3'; } // Veloz
        else if (charType === 1) { maxHp = 8; speed = 3.5; color = '#ff9f43'; } // Tanque
        else if (charType === 2) { maxHp = 4; speed = 4.5; color = '#ff4757'; } // Atirador
        else if (charType === 3) { maxHp = 5; speed = 4.2; color = '#833471'; } // Vampiro

        super(x, y, 15, color, maxHp, speed);
        this.charType = charType;

        this.dashCooldown = 0;
        this.shieldTimer = 0;
        this.shieldCooldown = 0;

        this.burstCooldown = 0;
        this.fearTimer = 0;
        this.fearCooldown = 0;

        this.baseWeaponCooldown = charType === 2 ? 0.12 : 0.25; // Atirador atira rapido
        this.weaponCooldown = 0;
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpTimer = 0.8; // dura 0.8s
        }
    }

    useAbility() {
        if (this.charType === 0) { // Dash Rápido
            if (this.dashCooldown <= 0) {
                let dx = 0; let dy = 0;
                if (keys['KeyW']) dy -= 1;
                if (keys['KeyS']) dy += 1;
                if (keys['KeyA']) dx -= 1;
                if (keys['KeyD']) dx += 1;

                if (dx === 0 && dy === 0) return;
                let len = Math.hypot(dx, dy);
                dx /= len; dy /= len;

                this.x += dx * 100; // teleport curto
                this.y += dy * 100;
                this.dashCooldown = 2.0;
                spawnExplosion(this.x, this.y, '#00d2d3', 10);
            }
        } else if (this.charType === 1) { // Escudo
            if (this.shieldCooldown <= 0) {
                this.shieldTimer = 3.0;
                this.shieldCooldown = 8.0;
            }
        } else if (this.charType === 2) { // Rajada
            if (this.burstCooldown <= 0) {
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        this.weaponCooldown = 0; // zera o cooldown pra atirar já
                        if (gameState === 'PLAYING') this.shoot();
                    }, i * 80);
                }
                this.burstCooldown = 4.0;
            }
        } else if (this.charType === 3) { // Medo
            if (this.fearCooldown <= 0) {
                this.fearTimer = 2.0;
                this.fearCooldown = 8.0;
                spawnExplosion(this.x, this.y, '#833471', 30);
            }
        }
    }

    shoot() {
        if (this.weaponCooldown > 0) return;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist === 0) return;

        const dirX = dx / dist;
        const dirY = dy / dist;

        projectiles.push(new Projectile(this.x, this.y, dirX, dirY, 10, 5, '#feca57', true));
        this.weaponCooldown = this.baseWeaponCooldown; // taxa de tiro
    }

    takeDamage(amount) {
        if (this.shieldTimer > 0) return; // Imune com escudo
        super.takeDamage(amount);
        updateHealthBar();

        if (this.hp <= 0) {
            triggerGameOver();
        }
    }

    update(dt) {
        // Movimentação
        let dx = 0;
        let dy = 0;
        if (keys['KeyW']) dy -= 1;
        if (keys['KeyS']) dy += 1;
        if (keys['KeyA']) dx -= 1;
        if (keys['KeyD']) dx += 1;

        if (dx !== 0 && dy !== 0) {
            let len = Math.hypot(dx, dy);
            dx /= len;
            dy /= len;
        }

        this.vx = dx * this.speed;
        this.vy = dy * this.speed;

        this.updatePhysics(dt);

        // Cooldowns
        if (this.weaponCooldown > 0) this.weaponCooldown -= dt;
        if (this.dashCooldown > 0) this.dashCooldown -= dt;
        if (this.shieldCooldown > 0) this.shieldCooldown -= dt;
        if (this.shieldTimer > 0) this.shieldTimer -= dt;
        if (this.burstCooldown > 0) this.burstCooldown -= dt;
        if (this.fearCooldown > 0) this.fearCooldown -= dt;
        if (this.fearTimer > 0) this.fearTimer -= dt;

        // Auto-fire while holding mouse
        if (mouse.down && this.weaponCooldown <= 0) {
            this.shoot();
        }
    }

    draw(ctx) {
        // Sombra de pulo
        if (this.isJumping) {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.beginPath();
            ctx.ellipse(this.x, this.y + 20, this.radius, this.radius / 2, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.fillStyle = (this.invincibleTimer > 0 && Math.floor(this.invincibleTimer * 20) % 2 === 0) ? '#fff' : this.color;

        let drawY = this.y;
        let drawRad = this.radius;
        if (this.isJumping) {
            let jumpPhase = Math.sin((1 - this.jumpTimer / 0.8) * Math.PI); // Parábola
            drawY -= jumpPhase * 40; // sobe até 40px
            drawRad += jumpPhase * 5; // parece mais perto (maior)
        }

        ctx.beginPath();
        // Desenha "orelhas" do coelho
        ctx.moveTo(this.x - drawRad / 2, drawY - drawRad);
        ctx.lineTo(this.x - drawRad / 2, drawY - drawRad - 15);
        ctx.lineTo(this.x - drawRad / 4, drawY - drawRad);

        ctx.moveTo(this.x + drawRad / 2, drawY - drawRad);
        ctx.lineTo(this.x + drawRad / 2, drawY - drawRad - 15);
        ctx.lineTo(this.x + drawRad / 4, drawY - drawRad);

        ctx.arc(this.x, drawY, drawRad, 0, Math.PI * 2);
        ctx.fill();

        // Escudo ou Medo (indicadores visuais)
        if (this.shieldTimer > 0) {
            ctx.strokeStyle = '#48dbfb';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(this.x, drawY, drawRad + 8, 0, Math.PI * 2);
            ctx.stroke();
        }
        if (this.fearTimer > 0) {
            ctx.strokeStyle = '#833471';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, drawY, drawRad + 5 + Math.sin(Date.now() / 100) * 15, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Mira (indicador)
        const mx = mouse.x - this.x;
        const my = mouse.y - this.y;
        const mag = Math.hypot(mx, my);
        if (mag > 0) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x + (mx / mag) * drawRad, drawY + (my / mag) * drawRad);
            ctx.lineTo(this.x + (mx / mag) * (drawRad + 20), drawY + (my / mag) * (drawRad + 20));
            ctx.stroke();
        }
    }
}

class Enemy extends Actor {
    constructor(x, y, type) {
        let hp, speed, color, radius;
        if (type === 'minion') {
            hp = 2; speed = 2; color = '#ff4757'; radius = 15;
        } else if (type === 'miniboss') {
            hp = 15; speed = 2.5; color = '#ff6348'; radius = 25;
        } else if (type === 'boss') {
            hp = 80; speed = 1.5; color = '#1e272e'; radius = 40;
        }
        super(x, y, radius, color, hp, speed);
        this.type = type;
        this.fireCooldown = 0;
        this.stateTimer = 0;

        if (type === 'boss') {
            this.maxHp = hp + (mapLevel * 20); // Escala com o nível
            this.hp = this.maxHp;
        }
    }

    update(dt) {
        if (!player) return;

        // Comportamento
        let dx = player.x - this.x;
        let dy = player.y - this.y;
        let dist = Math.hypot(dx, dy);

        if (dist > 0) {
            dx /= dist; dy /= dist;
        }

        if (this.type === 'minion') {
            // Persegue
            this.vx = dx * this.speed;
            this.vy = dy * this.speed;

            // Foge e não atira (Medo)
            if (player.fearTimer > 0 && dist < 150) {
                this.vx = -dx * this.speed * 1.5;
                this.vy = -dy * this.speed * 1.5;
            } else {
                // Período de tiro
                this.fireCooldown -= dt;
                if (this.fireCooldown <= 0 && dist < 300) {
                    projectiles.push(new Projectile(this.x, this.y, dx, dy, 4, 6, '#ff4757', false));
                    this.fireCooldown = 1.5 + Math.random();
                }
            }
        }
        else if (this.type === 'miniboss') {
            // Persegue
            this.vx = dx * this.speed;
            this.vy = dy * this.speed;

            // Foge (Medo)
            if (player.fearTimer > 0 && dist < 200) {
                this.vx = -dx * this.speed * 1.5;
                this.vy = -dy * this.speed * 1.5;
            }

            this.fireCooldown -= dt;
            if (this.fireCooldown <= 0) {
                // Tiro triplo (spread)
                for (let i = -1; i <= 1; i++) {
                    let angle = Math.atan2(dy, dx) + (i * 0.3);
                    projectiles.push(new Projectile(this.x, this.y, Math.cos(angle), Math.sin(angle), 5, 8, '#ffa502', false));
                }
                this.fireCooldown = 2.0;
            }
        }
        else if (this.type === 'boss') {
            this.stateTimer += dt;
            this.fireCooldown -= dt;

            // Movimentação em 8 ou perseguição lenta
            this.vx = dx * this.speed;
            this.vy = dy * this.speed;

            if (this.fireCooldown <= 0) {
                if (Math.random() < 0.5) {
                    // Círculo de projéteis (Bullet Hell)
                    let bullets = 12 + mapLevel * 2;
                    for (let i = 0; i < bullets; i++) {
                        let angle = (i / bullets) * Math.PI * 2 + this.stateTimer;
                        projectiles.push(new Projectile(this.x, this.y, Math.cos(angle), Math.sin(angle), 3, 10, '#ff4757', false));
                    }
                    this.fireCooldown = 1.8;
                } else {
                    // Rajada focada (Spiral)
                    let angle = Math.atan2(player.y - this.y, player.x - this.x);
                    projectiles.push(new Projectile(this.x, this.y, Math.cos(angle), Math.sin(angle), 6, 15, '#c0392b', false));
                    this.fireCooldown = 0.5;
                }
            }

            // Atualiza barra do boss
            bossHealthBar.style.width = (this.hp / this.maxHp) * 100 + '%';
        }

        this.updatePhysics(dt);
    }

    draw(ctx) {
        ctx.fillStyle = (this.invincibleTimer > 0) ? '#fff' : this.color;
        ctx.beginPath();
        if (this.type === 'boss') {
            // Forma assustadora com espinhos
            let spikes = 8;
            for (let i = 0; i < spikes * 2; i++) {
                let r = (i % 2 === 0) ? this.radius : this.radius + 15;
                let angle = (i / (spikes * 2)) * Math.PI * 2 + this.stateTimer;
                ctx.lineTo(this.x + Math.cos(angle) * r, this.y + Math.sin(angle) * r);
            }
            ctx.fill();

            // Olho central
            ctx.fillStyle = '#ff4757';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Capangas em forma de losangos/caixas com borda
            ctx.rect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        }
    }
}

class RoomSystem {
    constructor() {
        this.roomsCleared = 0;
        this.generateRoom('spawn');
    }

    generateRoom(type) {
        this.type = type;
        this.isCleared = false;
        this.doors = []; // {x, y, w, h, outType}
        enemies = [];
        projectiles = [];
        particles = [];

        let wallThickness = 40;

        // Porta Norte, Sul, Leste, Oeste (dependendo da sala)
        let cx = canvas.width / 2;
        let cy = canvas.height / 2;

        if (type === 'spawn') {
            this.isCleared = true;
            this.doors.push({ x: cx - 40, y: 0, w: 80, h: wallThickness, side: 'N' });
            this.doors.push({ x: cx - 40, y: canvas.height - wallThickness, w: 80, h: wallThickness, side: 'S' });
            this.doors.push({ x: canvas.width - wallThickness, y: cy - 40, w: wallThickness, h: 80, side: 'E' });
            roomCounter.innerText = "Sala Segura";
            roomCounter.style.color = "#a4b0be";
        } else {
            // Cria inimigos
            if (mapLevel > 5) {
                // Fim do jogo na sala atual?
                gameState = 'VICTORY';
                switchScreen('victory');
                return;
            }

            if (this.roomsCleared >= 3) {
                // Sala do chefe
                this.type = 'boss';
                enemies.push(new Enemy(cx, cy, 'boss'));
                roomCounter.innerText = `Nível ${mapLevel} - O GRANDE CHEFE`;
                roomCounter.style.color = "#ff4757"; // vermelho
                bossHealthContainer.style.display = 'block';
                bossNameEl.innerText = `Chefe do Nível ${mapLevel}`;
            } else {
                // Sala normal ou mini-chefe
                roomCounter.innerText = `Nível ${mapLevel} - Batalha ${this.roomsCleared + 1}/3`;
                roomCounter.style.color = "#e0e0e0";

                let isMiniboss = (Math.random() < 0.3) && this.roomsCleared > 0;
                if (isMiniboss) {
                    // Miniboss encerra sala rápido mas é mais difícil
                    enemies.push(new Enemy(cx, cy, 'miniboss'));
                    enemies.push(new Enemy(cx - 100, cy, 'minion'));
                    enemies.push(new Enemy(cx + 100, cy, 'minion'));
                    roomCounter.innerText += ' (Mini-Chefe)';
                    roomCounter.style.color = "#ffa502";
                } else {
                    let minionCount = 3 + mapLevel + Math.floor(Math.random() * 3);
                    for (let i = 0; i < minionCount; i++) {
                        enemies.push(new Enemy(
                            wallThickness + 50 + Math.random() * (canvas.width - wallThickness * 2 - 100),
                            wallThickness + 50 + Math.random() * (canvas.height - wallThickness * 2 - 100),
                            'minion'
                        ));
                    }
                }
            }

            // Portas só aparecem quando isCleared = true
            this.exitsGenerators = [];
            // Adiciona de 1 a 3 portas possíveis para próxima
            const sides = ['N', 'S', 'E', 'W'];
            // O jogador veio de uma porta, não vamos calcular complexo, apenas gerar portas aleatórias ao limpar
        }
    }

    update(dt) {
        if (!this.isCleared && enemies.length === 0 && this.type !== 'spawn') {
            this.isCleared = true;
            this.roomsCleared++;

            if (this.type === 'boss') {
                bossHealthContainer.style.display = 'none';
                mapLevel++;
                this.roomsCleared = 0;

                if (mapLevel > MAX_LEVELS) {
                    gameState = 'VICTORY';
                    switchScreen('victory');
                    return;
                }
            }

            // Gera portas de saída após limpar
            let cx = canvas.width / 2;
            let cy = canvas.height / 2;
            let wallThickness = 40;
            this.doors = [];
            let numDoors = this.type === 'boss' ? 1 : Math.floor(Math.random() * 2) + 2; // de 2 a 3 portas normais

            const dirs = ['N', 'S', 'E', 'W'];
            const shuffled = dirs.sort(() => 0.5 - Math.random());

            for (let i = 0; i < numDoors; i++) {
                let side = shuffled[i];
                if (side === 'N') this.doors.push({ x: cx - 40, y: 0, w: 80, h: wallThickness, side: 'N' });
                if (side === 'S') this.doors.push({ x: cx - 40, y: canvas.height - wallThickness, w: 80, h: wallThickness, side: 'S' });
                if (side === 'E') this.doors.push({ x: canvas.width - wallThickness, y: cy - 40, w: wallThickness, h: 80, side: 'E' });
                if (side === 'W') this.doors.push({ x: 0, y: cy - 40, w: wallThickness, h: 80, side: 'W' });
            }
        }

        // Checar interação de porta
        if (this.isCleared && player) {
            for (let door of this.doors) {
                // Simples AABB (player bounds vs door bounds) expandido para facilitar entrada
                if (player.x + player.radius + 10 > door.x && player.x - player.radius - 10 < door.x + door.w &&
                    player.y + player.radius + 10 > door.y && player.y - player.radius - 10 < door.y + door.h) {

                    // Transição de sala!
                    this.transition(door.side);
                    break;
                }
            }
        }
    }

    transition(side) {
        // Move o player para o outro lado da porta, centralizando-o
        let wallThickness = 40;
        let cx = canvas.width / 2;
        let cy = canvas.height / 2;

        if (side === 'N') {
            player.x = cx;
            player.y = canvas.height - wallThickness - player.radius - 20;
        } else if (side === 'S') {
            player.x = cx;
            player.y = wallThickness + player.radius + 20;
        } else if (side === 'E') {
            player.x = wallThickness + player.radius + 20;
            player.y = cy;
        } else if (side === 'W') {
            player.x = canvas.width - wallThickness - player.radius - 20;
            player.y = cy;
        }

        this.generateRoom('battle');
    }

    draw(ctx) {
        let wallThickness = 40;

        // Chão
        ctx.fillStyle = this.type === 'boss' ? '#2c0407' : '#1e2029';
        if (this.type === 'spawn') ctx.fillStyle = '#1e2922'; // Verde seguro
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Paredes
        ctx.fillStyle = '#2f3542';
        // Topo, Baixo, Esquerda, Direita
        ctx.fillRect(0, 0, canvas.width, wallThickness);
        ctx.fillRect(0, canvas.height - wallThickness, canvas.width, wallThickness);
        ctx.fillRect(0, 0, wallThickness, canvas.height);
        ctx.fillRect(canvas.width - wallThickness, 0, wallThickness, canvas.height);

        // Desenhar Portas
        if (this.isCleared) {
            ctx.fillStyle = '#2ed573'; // porta aberta verde
            for (let door of this.doors) {
                ctx.fillRect(door.x, door.y, door.w, door.h);
            }
        } else if (this.type !== 'spawn') {
            // Desenhar portas fechadas e grade vermelha
            ctx.fillStyle = '#ff4757';
            ctx.font = '20px VT323';
            ctx.textAlign = 'center';
            ctx.fillText("BLOQUEADO", canvas.width / 2, wallThickness - 10);
        }
    }
}

// --- FUNÇÕES PRINCIPAIS --- //

function startGame() {
    gameState = 'PLAYING';
    switchScreen('hud');
    mapLevel = 1;

    player = new Player(canvas.width / 2, canvas.height / 2, selectedChar);
    currentRoom = new RoomSystem();
    bossHealthContainer.style.display = 'none';

    updateHealthBar();
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}

function updateHealthBar() {
    if (!player) return;
    const percentage = Math.max(0, (player.hp / player.maxHp) * 100);
    healthBar.style.width = percentage + '%';
    if (percentage < 30) {
        healthBar.style.backgroundColor = '#ff4757';
    } else {
        healthBar.style.backgroundColor = 'var(--health)';
    }
}

function triggerGameOver() {
    gameState = 'GAMEOVER';
    switchScreen('gameOver');
    bossHealthContainer.style.display = 'none';
}

function checkCollisions() {
    // Projéteis x Entidades
    for (let i = projectiles.length - 1; i >= 0; i--) {
        let p = projectiles[i];

        if (p.isPlayerObj) {
            // Colisão com Inimigos
            for (let j = enemies.length - 1; j >= 0; j--) {
                let e = enemies[j];
                if (distance(p.x, p.y, e.x, e.y) < p.radius + e.radius) {
                    e.takeDamage(p.damage);
                    spawnExplosion(p.x, p.y, p.color, 3);
                    if (e.hp <= 0) {
                        enemies.splice(j, 1);
                        if (player.charType === 3 && Math.random() < 0.25) { // 25% de chance de curar 1 hp no Vampiro
                            player.hp = Math.min(player.maxHp, player.hp + 1);
                            updateHealthBar();
                            spawnExplosion(player.x, player.y, '#2ed573', 10);
                        }
                    }
                    p.active = false;
                    break;
                }
            }
        } else {
            // Colisão com Player
            // Pulo desvia de projéteis
            if (!player.isJumping) {
                if (distance(p.x, p.y, player.x, player.y) < p.radius + player.radius * 0.8) { // hitbox levemente menor para satisfação
                    player.takeDamage(p.damage);
                    p.active = false;
                }
            }
        }

        if (!p.active) projectiles.splice(i, 1);
    }

    // Inimigos colidindo com jogador dão dano contato?
    if (player && !player.isJumping) {
        for (let e of enemies) {
            if (distance(player.x, player.y, e.x, e.y) < player.radius + e.radius - 5) {
                player.takeDamage(1);
                // empurrão leve
                let dx = player.x - e.x;
                let dy = player.y - e.y;
                let mag = Math.hypot(dx, dy);
                if (mag > 0) {
                    player.x += (dx / mag) * 20;
                    player.y += (dy / mag) * 20;
                }
            }
        }
    }
}

function gameLoop(timestamp) {
    if (gameState !== 'PLAYING') return;

    let dt = (timestamp - lastTime) / 1000;
    if (dt > 0.1) dt = 0.1; // Limite de variação
    lastTime = timestamp;

    // --- UPDATES ---
    player.update(dt);
    currentRoom.update(dt);

    enemies.forEach(e => e.update(dt));
    projectiles.forEach(p => p.update(dt));
    particles = particles.filter(p => p.update(dt));

    checkCollisions();

    // --- DRAWS ---
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    currentRoom.draw(ctx);

    // Z-index sorteing simplificado: itens estáticos e inimigos -> player pulando na frente
    enemies.forEach(e => e.draw(ctx));
    projectiles.forEach(p => p.draw(ctx));
    particles.forEach(p => p.draw(ctx));

    player.draw(ctx);

    requestAnimationFrame(gameLoop);
}
