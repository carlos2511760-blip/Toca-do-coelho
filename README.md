# 🐇 Toca do Coelho

> **Desça até o fundo da toca...** — Um dungeon crawler 2D de top-down com 20+ personagens, geração procedural de mapas, sistema de conquistas e suporte a mobile/gamepad.

---

## 🎮 Sobre o Jogo

**Toca do Coelho** é um dungeon crawler 2D desenvolvido inteiramente em HTML, CSS e JavaScript puro. O jogador escolhe um herói coelho com habilidades únicas e explora masmorras geradas proceduralmente, derrotando inimigos, mini-chefes e chefões épicos para escapar da toca no andar final.

**Versão:** v2.0  
**Plataforma:** Navegador Web (Desktop + Mobile)  
**Idioma:** Português (com suporte a Inglês e Espanhol)

---

## ✨ Funcionalidades

### 🗺️ Mapa Procedural
- Geração aleatória de salas interconectadas a cada run
- Tipos de sala: Batalha, Mini-chefe, Chefe, Tesouro, NPC, Loja e Cassino
- Minimapa no canto inferior direito mostra salas próximas
- A saída só é desbloqueada após derrotar o chefe do andar

### 👹 Inimigos
| Tipo | Descrição |
|------|-----------|
| **Minion (Lobisomem)** | Persegue o jogador e atira projéteis básicos |
| **Mini-chefe** | 3 variantes elementais (Fogo, Veneno, Raio) com ataques especiais em área |
| **Chefe** | 9 chefes únicos com padrões de ataque distintos |

### 👑 Chefes (9 únicos)
| # | Nome | Padrão |
|---|------|--------|
| 1 | Olho Sombrio | Círculos de projéteis |
| 2 | Dragão de Fogo | Rajadas de fogo em espiral |
| 3 | Golem de Gelo | Projéteis que desaceleram + Icebergs |
| 4 | Fantasma Elétrico | Raios rápidos + teletransporte |
| 5 | Rei das Sombras | Invoca capangas + veneno |
| 6 | Vento Cortante | Rajadas ultra velozes |
| 7 | Colmeia Tóxica | Névoa ácida e disparos lentos |
| 8 | Núcleo Gravitacional | Puxa o jogador, dispara em órbita |
| 9 | **Colosso do Apocalipse** | Chuva de meteoros + barreiras de pedra |

---

## 🐰 Personagens (25 no total)

### Desbloqueados desde o início (20)
| # | Nome | Passiva | Habilidade (Q) |
|---|------|---------|----------------|
| 0 | Estrelar | +Velocidade de Movimento | Chuva de Estrelas Mágicas |
| 1 | Simbionte | +Resistência Base | Evolução Monstruosa (3x Dano) |
| 2 | Térmico | Tiro Ultra Rápido | Raio Colossal Acumulado |
| 3 | Cronos | Projéteis causam Lentidão | Rebobinar Tempo e Repelir |
| 4 | Espiritual | Imunidade Estendida | Evocar Espíritos Protetores |
| 5 | Coelho Mago | Nasce com +30 Ouro | Nova de Gelo em Área |
| 6 | Coelho Tóxico | Aura Tóxica (dano próximo) | Névoa Venenosa Drenante |
| 7 | Coelho Mecânico | Reparo Autônomo (+1 HP/8s) | Pulso Eletromagnético |
| 8 | Coelho Infernal | Explosão ao sofrer dano | Tempestade de Fogo |
| 9 | Coelho Sortudo | Moedas dão +50% Ouro | Criar Ouro Mágico |
| 10 | Coelho Ninja | +Esquiva (15% chance dodge) | Clonagem de Sombra |
| 11 | Coelho Alquimista | Poções Rendem +50% | Bomba de Ácido AoE |
| 12 | Coelho Druida | Toque da Natureza (Heal sala) | Raízes Aprisionantes |
| 13 | Coelho Astronauta | Gravidade Reduzida (pulo longo) | Propulsão a Jato (voo 6s) |
| 14 | Coelho Pirata | Pilhagem Extra + 50 Ouro inicial | Salva de Canhões |
| 15 | Coelho Viking | Fúria (<50% HP = +Vel/Dano) | Grito de Guerra (AoE+2x Dano) |
| 16 | Coelho Ciborgue | Raio em Cadeia (Lentidão) | Bola de Energia Paralisante |
| 17 | Coelho Zen | Mente Serena (−0.5 dano) | Meditação Curativa (+2 HP) |
| 18 | Coelho Mineiro | Detector de Metais | Dinamite Explosiva (AoE grande) |
| 19 | Coelho Radiante | Aura de Luz | Feixe Solar Purificador |

### Secretos (5) — Bloqueados por Desafios
| # | Nome | Status |
|---|---|--------|
| 20 | Coelho Dimensional | Corte de Realidade (Fatia inimigos) |
| 21 | Coelho Colecionador | Mestre das Armas (Ricochete insano) |
| 22 | Coelho Cósmico | Gênese e Colapso (Buraco Negro) |
| 23 | Coelho Arconte | Poder Divino (Congelamento & Cura) |
| 24 | Coelho Devorador | Fome Sombria (Hitkill Boomerang) |

---

## ⚙️ Configurações

### 🔊 Áudio
- Volume Geral, Música e Efeitos Sonoros ajustáveis individualmente

### 🖥️ Vídeo
- Resolução: 800×600 / 1024×768 / 1280×720 (HD)
- Tela Cheia
- Qualidade Gráfica: Baixa / Média / Alta
- Iluminação Dinâmica (toggle)

### 🎮 Controles (Remapeáveis)
| Ação | Padrão |
|------|--------|
| Mover | WASD |
| Atirar | Clique Esquerdo / Mouse |
| Pular | Espaço |
| Habilidade do Herói | Q |
| Skill Extra | E |
| Mapa | M / Tab |
| Pausar | ESC |

- Suporte completo a **Gamepad** (analógico esquerdo para mover, direito para mirar, R2 para atirar)
- Suporte a **Mobile** com joystick virtual e botões de ação

### 🌐 Acessibilidade
- Idioma: Português / English / Español
- Filtros de Daltonismo: Protanopia, Deuteranopia, Tritanopia
- Tamanho da HUD ajustável
- Posição e tamanho dos controles mobile configuráveis

### 💀 Cheats (Modo Deus)
> ⚠️ Ativar cheats **bloqueia conquistas e recordes**.

- 999.999 de Ouro Ilimitado
- Vida Infinita (Invencível)
- Voo Livre através de paredes
- Brilho Total no escuro

---

## 🎖️ Dificuldades

| Dificuldade | Vida | Inimigos HP | Velocidade Inimigos | Dano Inimigos |
|-------------|------|-------------|---------------------|---------------|
| 🌿 Fácil | +3 | −30% | −15% | −30% |
| ⚔️ Normal | Base | 100% | 100% | 100% |
| 🔥 Difícil | −1 | +50% | +15% | +30% |
| 💀 Pesadelo | −2 | +100% | +30% | +40% |

---

## ⏱️ Duração da Jornada

| Modo | Andares |
|------|---------|
| 🏃 Curta | 3 |
| ⚔️ Padrão | 5 |
| 🌕 Longa | 8 |

---

## 🏪 Loja & Itens

A loja aparece após cada chefe com 3 itens aleatórios. Categorias:

| Categoria | Exemplos |
|-----------|---------|
| **Curas** | Poção Menor, Poção Máxima, Raiz da Vida, Sangue Mágico |
| **Armas** | Cajado de Fogo (burn), Arma de Raio (stun), Cetro de Gelo (slow), Lança Longa (sniper), Zarabatana (veneno), Espada de Luz (pierce), Shuriken, Arma de Bolhas |
| **Buffs** | +Dano permanente, +Velocidade, +Vida Máxima, Regeneração Permanente |
| **Skills Ativas (E)** | Gravidade, Voo, Terremoto, Iceberg, Explosão, Distorção Temporal, Kit Médico, Fumaça |

---

## 🎰 Cassino

- Custa **15 de Ouro** por giro
- 4 slots de 0–9
- **Três "1"** = Vitória! | **Quatro "1"** = Jackpot!

---

## 🏆 Conquistas (15 no total)

| Tier | Conquistas |
|------|-----------|
| 🥉 Bronze | Primeira Sangue, Caçador, Poder Desperto, Explorador, Bom Comprador |
| 🥈 Silver | Ceifeiro, Especialista, Desbravador, Caçador de Chefes |
| 🥇 Gold | Implacável, Invulnerável, Intocável, Milionário, Vencedor |
| 💎 Platinum | Lendário (concluir no Pesadelo) |

As conquistas exibem **notificações toast** animadas no canto superior esquerdo ao serem desbloqueadas.

---

## 💾 Sistema de Save

- Salvo automaticamente via `localStorage`
- **Exportar Save** — gera um arquivo `.json` para backup
- **Importar Save** — restaura progresso de um arquivo `.json`
- **Apagar Progresso** — reseta todos os dados (recordes, conquistas, ouro)

---

## 📁 Estrutura de Arquivos

```
Toca do coelho/
├── index.html        # Estrutura HTML + todas as telas de UI
├── style.css         # Estilos, animações e tema visual
├── game.js           # Engine principal: física, personagens, inimigos, mapa, HUD
├── items.js          # Catálogo de itens, armas, buffs e definições de chefes
├── achievements.js   # Sistema de conquistas, hooks e renderização
├── audio.js          # Gerenciador de música e efeitos sonoros
├── imagens/          # Assets gráficos (backgrounds, etc.)
└── Musica/           # Trilhas sonoras e efeitos de áudio
```

---

## 🚀 Como Jogar

### Desktop
1. Abra `index.html` em qualquer navegador moderno
2. Ou utilize o servidor local:
   ```powershell
   .\server.ps1
   ```
3. Selecione dificuldade, duração da jornada e personagem
4. Clique em **"Iniciar Exploração"**

### Mobile
- Acesse pelo navegador do celular
- Use o **joystick virtual** para mover
- Toque na **tela** para atirar na direção do toque
- Use os **botões** de ação para pular, usar habilidade e skill extra

### Gamepad
- **Analógico Esquerdo** → Mover
- **Analógico Direito** → Mirar
- **R1/R2** → Atirar
- **Botão Sul (A/X)** → Pular
- **Botão Oeste (X/Quadrado)** → Habilidade
- **Start/Options** → Pausar

---

## 🛠️ Tecnologias

- **HTML5 Canvas** — Renderização 2D do jogo
- **CSS3** — UI, animações, glassmorphism
- **JavaScript (ES6+)** — Engine, física, IA de inimigos
- **localStorage** — Persistência de dados (saves, conquistas, configs)
- **Web Audio API** — Sistema de som via `audio.js`
- **Google Fonts** — VT323 + Passion One (tipografia retro)

---

## 🎨 Créditos

Desenvolvido com ❤️ como projeto pessoal.  
Arte pixel art, engine e sistemas criados do zero.
