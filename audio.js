/**
 * Toca do Coelho - Sistema de Áudio Procedural
 * Gera sons sintéticos para evitar dependência de arquivos .mp3
 */
class AudioManager {
    constructor() {
        this.ctx = null;
        this.masterVol = 0.8;
        this.sfxVol = 0.8;
        this.musicVol = 0.6;
        this.soundsEnabled = false;
        
        // Músicas em arquivo
        this.titleMusic = new Audio('musica/Musica capa.mp3');
        this.titleMusic.loop = true;
        this.titleMusic.volume = this.musicVol * this.masterVol;
        
        this.init();
    }

    init() {
        const unlock = () => {
            // Se já inicializou ou tocou, ignorar
            if (this.ctx && this.soundsEnabled) return;
            
            console.log("Tentando desbloquear áudio...");
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.soundsEnabled = true;
            
            // Força o play da música do título no primeiro clique
            this.playTitleMusic();
            
            // Remover listeners após sucesso
            document.removeEventListener('click', unlock);
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('keydown', unlock);
        };
        document.addEventListener('click', unlock);
        document.addEventListener('touchstart', unlock);
        document.addEventListener('keydown', unlock);
    }

    updateVolumes(master, music, sfx) {
        this.masterVol = master / 100;
        this.musicVol = music / 100;
        this.sfxVol = sfx / 100;
        
        // Atualizar volume da música de fundo
        if (this.titleMusic) {
            this.titleMusic.volume = this.musicVol * this.masterVol;
        }
    }

    playTitleMusic() {
        if (this.titleMusic) {
            this.titleMusic.play()
                .then(() => console.log("Música do título tocando!"))
                .catch(e => console.warn("Aguardando interação para tocar música:", e));
        }
    }

    stopTitleMusic() {
        this.titleMusic.pause();
        this.titleMusic.currentTime = 0;
    }

    playShoot() {
        if (!this.ctx) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(200, this.ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        g.gain.setValueAtTime(this.sfxVol * this.masterVol, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(); o.stop(this.ctx.currentTime + 0.1);
    }

    playHit() {
        if (!this.ctx) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'square';
        o.frequency.setValueAtTime(150, this.ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.15);
        g.gain.setValueAtTime(this.sfxVol * this.masterVol * 0.5, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(); o.stop(this.ctx.currentTime + 0.15);
    }

    playHurt() {
        if (!this.ctx) return;
        const n = this.ctx.createBufferSource();
        const b = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.1, this.ctx.sampleRate);
        const data = b.getChannelData(0);
        for (let i = 0; i < b.length; i++) data[i] = Math.random() * 2 - 1;
        n.buffer = b;
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(this.sfxVol * this.masterVol, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        n.connect(g);
        g.connect(this.ctx.destination);
        n.start();
    }

    playCoin() {
        if (!this.ctx) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(1200, this.ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.05);
        g.gain.setValueAtTime(this.sfxVol * this.masterVol * 0.4, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(); o.stop(this.ctx.currentTime + 0.2);
    }

    playHeal() {
        if (!this.ctx) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(600, this.ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.3);
        g.gain.setValueAtTime(this.sfxVol * this.masterVol * 0.5, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(); o.stop(this.ctx.currentTime + 0.4);
    }

    playJump() {
        if (!this.ctx) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(100, this.ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.2);
        g.gain.setValueAtTime(this.sfxVol * this.masterVol * 0.3, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start(); o.stop(this.ctx.currentTime + 0.2);
    }
}

const audio = new AudioManager();
