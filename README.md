# 🌀 VOIDFALL (Toca do Coelho)

> **Desça até o fundo da toca...** — Um dungeon crawler 2D de top-down com 25 personagens, geração procedural de mapas, sistema de conquistas e suporte a cross-save via nuvem.

---

## 🎮 Sobre o Jogo

**Voidfall** (anteriormente conhecido como *Toca do Coelho*) é um dungeon crawler 2D desenvolvido inteiramente em HTML, CSS e JavaScript puro. O jogador escolhe um herói coelho com habilidades únicas e explora masmorras geradas proceduralmente, derrotando inimigos, mini-chefes e chefões épicos para escapar da toca no andar final.

**Versão:** v2.1 (Em desenvolvimento)  
**Plataforma:** Navegador Web (Desktop + Mobile)  
**Idioma:** Português (com suporte a Inglês e Espanhol)

---

## ✨ Funcionalidades Principais

### 🗺️ Mapa Procedural & Roguelike
- Geração aleatória de salas interconectadas a cada run.
- Minimapa dinâmico com névoa de guerra.
- Múltiplos caminhos e biomas (em breve).

### ☁️ Sincronização em Nuvem (Firebase)
- Sistema de contas de usuário (Login com Email ou Google).
- Cross-save: Seus progressos, ouro e personagens desbloqueados são salvos na nuvem.
- Perfil de usuário integrado à UI.

### 🏆 Sistema de Conquistas & Desafios
- 15+ conquistas únicas com notificações *toast* animadas.
- Personagens secretos desbloqueados através de feitos heróicos.
- Rastreamento de estatísticas globais (abates totais, vitórias, etc).

---

## 🐰 Personagens (25 no total)

O jogo conta com um elenco vasto, cada um com mecânicas de tiro e habilidades (Q) distintas.

- **20 Heróis Iniciais:** Do Coelho Mago ao Coelho Ciborgue.
- **5 Heróis Secretos:** Desbloqueados via conquistas específicas ou desafios pesadelo.
- **Heróis Modernizados:** Druida e Ninja agora possuem mecânicas de summons e clones.

---

## 🗺️ Roadmap de Desenvolvimento (Ativo)

### 🔴 Prioridade Máxima
- [x] **Placar Global (Leaderboard):** Implementação do ranking mundial via Firestore para exibir os melhores tempos por dificuldade. ✨
- [ ] **Tradução Completa (L10n):** Finalizar a implementação do sistema de idiomas nas telas de jogo e HUD.

### 🟡 Melhorias de Gameplay
- [ ] **Variedade de Inimigos:** Adicionar novos padrões de tiro para minions básicos.
- [ ] **Sistema de Pets:** Pequenos companheiros que coletam ouro ou atacam inimigos.
- [ ] **Eventos Aleatórios:** Salas com NPCs que oferecem desafios em troca de buffs raros.

### 🟢 Polimento & Visual
- [ ] **Ajuste de Iluminação:** Otimizar o sistema de luz dinâmica para performance em mobile.
- [ ] **Efeitos Sonoros:** Adicionar mais camadas de áudio para habilidades especiais.

---

## ⚙️ Configurações & Acessibilidade

- **Controles Remapeáveis:** Suporte completo a Teclado, Mouse e **Gamepad**.
- **Mobile Friendly:** Joystick virtual e botões de ação configuráveis.
- **Acessibilidade:** Filtros de daltonismo e redimensionamento de HUD.

---

## 📂 Estrutura de Arquivos

```
Toca do coelho/
├── index.html        # Estrutura HTML + UI do Jogo
├── style.css         # Design System, Animações e Glassmorphism
├── game.js           # Engine: Física, IA, Mapas e Gameplay Loop
├── achievements.js   # Lógica de Conquistas e Estatísticas
├── items.js          # Definições de Itens, Armas e Chefes
├── cloud.js          # Integração Firebase: Auth e Cloud Save
├── audio.js          # Gerenciador de Áudio (Web Audio API)
├── imagens/          # Assets Gráficos
└── Musica/           # Trilhas Sonoras
```

---

## 🚀 Como Executar

Basta abrir o `index.html` em qualquer navegador moderno. Para funcionalidades de nuvem, é necessário rodar em um ambiente com conexão estável.

Desenvolvido com ❤️ como um projeto de alta performance em Vanilla JS.
lassmorphism
- **JavaScript (ES6+)** — Engine, física, IA de inimigos
- **localStorage** — Persistência de dados (saves, conquistas, configs)
- **Web Audio API** — Sistema de som via `audio.js`
- **Google Fonts** — VT323 + Passion One (tipografia retro)

---

## 🎨 Créditos

Desenvolvido com ❤️ como projeto pessoal.  
Arte pixel art, engine e sistemas criados do zero.
