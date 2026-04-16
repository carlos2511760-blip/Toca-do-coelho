// =============================================
// SISTEMA DE INTERNACIONALIZAÇÃO (i18n) — VOIDFALL
// Idiomas: PT (Português), EN (English), ES (Español), FR (Français)
// =============================================

const I18N = {
    // ─── Idioma atual ────────────────────────────────────────
    currentLang: 'pt',

    // ─── Dicionários de tradução ─────────────────────────────
    translations: {

        // ============================================================
        // PORTUGUÊS (padrão)
        // ============================================================
        pt: {
            // — Tela Título —
            title_subtitle: 'Desça até o fundo da toca...',
            btn_play: '⚔️ Jogar',
            btn_manual: '📖 Manual',
            btn_achievements: '🏆 Conquistas',
            btn_leaderboard: '🌍 Placar Global',
            btn_settings: '⚙️ Configurações',
            btn_logout: '👋 Sair',
            version_text: 'v2.0 — Pressione qualquer botão',

            // — Auth Screen —
            auth_hint: 'Faça login para adentrar a masmorra.',
            auth_login: 'Entrar',
            auth_register: 'Criar Conta',
            auth_or: '― OU ―',
            auth_google: 'Entrar com Google',
            auth_guest: 'Jogar sem conta (progresso não será salvo)',
            auth_email_placeholder: 'E-mail',
            auth_pass_placeholder: 'Senha',

            // — Nickname Screen —
            nickname_title: 'Bem-vindo ao Vazio',
            nickname_placeholder: 'Seu nome',
            nickname_confirm: 'Confirmar Nome',

            // — Leaderboard —
            leaderboard_title: '🌍 Placar Global',
            leaderboard_hint: 'Em Breve: Os maiores desafiantes de Voidfall.',
            leaderboard_loading: 'Sincronizando com os Arcontes...',
            btn_back_menu: 'Voltar ao Menu',

            // — Configurações —
            settings_title: '⚙️ Configurações',
            tab_audio: '🔊 Áudio',
            tab_video: '🖥️ Vídeo',
            tab_controls: '🎮 Controles',
            tab_access: '🌐 Acessibilidade',
            tab_cheats: '💀 Cheats',

            // Áudio
            label_vol_master: 'Volume Geral',
            label_vol_music: 'Música',
            label_vol_sfx: 'Efeitos Sonoros',

            // Vídeo
            label_resolution: 'Resolução',
            label_fullscreen: 'Tela Cheia',
            btn_activate: 'Ativar',
            btn_deactivate: 'Desativar',
            label_quality: 'Qualidade Gráfica',
            quality_low: 'Baixa',
            quality_medium: 'Média',
            quality_high: 'Alta',
            label_lighting: 'Iluminação Dinâmica',
            lighting_on: 'Ligado',
            lighting_off: 'Desligado',

            // Controles
            controls_hint: 'Clique no botão e pressione uma tecla ou clique com um botão do mouse para remapear.',
            label_move_up: 'Mover Cima',
            label_move_down: 'Mover Baixo',
            label_move_left: 'Mover Esquerda',
            label_move_right: 'Mover Direita',
            label_jump: 'Pular',
            label_ability: 'Habilidade',
            label_skill: 'Skill Extra',
            label_map: 'Mapa',
            btn_reset_keys: '🔄 Restaurar Padrão',
            controls_gamepad_hint: '🎮 Suporte a Gamepad disponível. | Atirar = Clique Esq. | Pausar = Esc',

            // Acessibilidade
            label_language: 'Idioma',
            label_colorblind: 'Filtro Daltonismo',
            colorblind_none: 'Nenhum',
            label_hud_size: 'Tamanho da HUD',
            label_mobile_size: 'Tamanho Controles Mobile',
            label_joystick_x: 'Joystick (X)',
            label_joystick_y: 'Joystick (Y)',
            label_btn_action_x: 'Botões Ação (X)',
            label_btn_action_y: 'Botões Ação (Y)',

            // Cheats
            cheat_label: 'Habilitar Trapaças (Modo Deus)',
            cheat_warning: '⚠️ O modo Trapaça ativará:<br>- 999.999 Ouro Ilimitado<br>- Vida Infinita (Invencível)<br>- Voo Livre por paredes<br>- Brilho Total no escuro<br><br>O uso de cheats bloqueia novas conquistas e envios de recorde.',

            // Reset
            btn_reset_save: '🗑️ Apagar Progresso',
            btn_back: '← Voltar',
            reset_confirm: "⚠️ TEM CERTEZA? ⚠️\n\nIsso apagará TODO o seu progresso, incluindo:\n- Todos os recordes de tempo\n- Personagens Desbloqueados\n- Conquistas\n- Ouro e Itens comprados\n\nEssa ação é IRREVERSÍVEL! Deseja continuar?",
            reset_done: 'O seu progresso foi totalmente apagado. O jogo será reiniciado.',

            // — Manual —
            manual_title: '📖 Manual do Jogo',
            manual_objective_title: '🎯 Objetivo',
            manual_objective: 'Explore a toca, derrote inimigos e chefes em cada andar, colete ouro e itens, e sobreviva até escapar no 5º andar!',
            manual_controls_title: '🕹️ Controles',
            manual_controls: '<strong>WASD</strong> — Mover | <strong>Mouse</strong> — Mirar e Atirar<br><strong>Espaço</strong> — Pular (evita dano) | <strong>Q</strong> — Habilidade do Herói<br><strong>E</strong> — Skill Extra (comprada na loja) | <strong>ESC</strong> — Pausar',
            manual_map_title: '🗺️ Mapa',
            manual_map: 'O mapa é gerado aleatoriamente. Cada sala pode ser de batalha, mini-chefe, chefe, tesouro, NPC ou loja. O minimapa no canto inferior direito mostra as salas próximas.',
            manual_shop_title: '🏪 Loja',
            manual_shop: 'Após derrotar cada chefe, uma loja aparece com 3 itens aleatórios. Use ouro para comprar curas, armas, buffs ou habilidades especiais.',
            manual_weapons_title: '⚔️ Armas',
            manual_weapons: '🔥 <strong>Cajado de Fogo</strong> — Queima inimigos<br>⚡ <strong>Arma de Raio</strong> — Paralisa inimigos<br>❄️ <strong>Cetro de Gelo</strong> — Desacelera inimigos',
            manual_bosses_title: '👹 Chefes',
            manual_bosses: 'Cada andar tem um chefe com padrão de ataque único. O chefe final do 5º andar é o <strong>Colosso do Apocalipse</strong>, com chuva de meteoros e barreiras de pedra!',
            manual_difficulty_title: '🎖️ Dificuldades',
            manual_difficulty: '<strong>Fácil</strong> — Mais vida, inimigos fracos<br><strong>Normal</strong> — Experiência padrão<br><strong>Difícil</strong> — Menos vida, inimigos fortes<br><strong>Pesadelo</strong> — Para verdadeiros coelhos guerreiros!',

            // — Conquistas —
            achievements_title: '🏆 Conquistas',
            achievements_count: 'Desbloqueadas',
            ach_toast_label: 'CONQUISTA DESBLOQUEADA',

            // — Seleção de Jogo —
            prep_title: '⚔️ Preparar Expedição',
            diff_label: 'Dificuldade:',
            diff_easy: '🌿 Fácil',
            diff_easy_desc: '+3 Vida, Inimigos -30%',
            diff_normal: '⚔️ Normal',
            diff_normal_desc: 'Experiência padrão',
            diff_hard: '🔥 Difícil',
            diff_hard_desc: '-1 Vida, Inimigos +50%',
            diff_nightmare: '💀 Pesadelo',
            diff_nightmare_desc: '-2 Vida, Inimigos +100%',
            duration_label: 'Duração da Jornada:',
            dur_short: '🏃 Curta',
            dur_short_desc: '3 Andares',
            dur_normal: '⚔️ Padrão',
            dur_normal_desc: '5 Andares',
            dur_long: '🌕 Longa',
            dur_long_desc: '8 Andares',
            hero_label: 'Escolha seu Herói:',
            btn_start: '🚀 Iniciar Exploração',
            locked_text: 'Bloqueado: Desafio Secreto',

            // — HUD —
            hud_floor: 'Nív.',
            hud_location: 'Local:',
            hud_weapon: '🔫 Arma:',
            hud_weapon_default: 'Padrão',
            hud_ability: '✨ Habil.',
            hud_ability_ready: 'PRONTO',
            hud_skill: '⚡ Extra',
            hud_boss: 'Chefe',
            hud_ghost_title: 'Missão Fantasma: < 20 abates',

            // — Pausa —
            pause_title: '⏸️ Pausado',
            pause_level: 'Nível:',
            pause_time: 'Tempo:',
            btn_resume: '▶️ Continuar',
            btn_pause_settings: '⚙️ Configurações',
            btn_restart: '🔄 Reiniciar',
            btn_quit: '🚪 Menu Principal',

            // — Recompensa NPC —
            reward_title: '🧚 Anjo Libertado!',
            reward_subtitle: 'O guardião está grato. Escolha sua recompensa:',
            reward_damage_title: 'Poder Sombrio',
            reward_damage_desc: '+20% de dano permanente em todos os ataques e habilidades',
            reward_heal_title: 'Bênção Vital',
            reward_heal_desc: 'Recupera toda a vida e ganha +1 de HP máximo',
            reward_gold_title: 'Fortuna Celestial',
            reward_gold_desc: 'Recebe 60 de ouro e bônus de +25% em coleta futura',

            // — Loja —
            shop_title: '🏪 Loja da Toca',
            shop_gold: 'Seu Ouro:',
            shop_close: 'Continuar Explorando',

            // — Casino —
            casino_title: '🎰 Sala do Cassino',
            casino_desc: 'Tente a sorte! Consiga três \'1\' para ganhar, ou quatro \'1\' para o Jackpot!',
            casino_cost: 'Custo:',
            casino_cost_val: '🪙 15 Ouro',
            casino_gold_label: 'Seu ouro atual:',
            casino_spin: 'Girar (15G)',
            casino_leave: 'Sair',
            casino_no_gold: 'Sem ouro suficiente! (15 moedas)',
            casino_jackpot: 'JACKPOT! 🎉 +250 Ouro!',
            casino_win: 'VITÓRIA! 💰 +40 Ouro!',
            casino_lose: 'PERDEU! 😢 Tente novamente.',

            // — Game Over —
            gameover_title: 'Fim da Linha',
            gameover_desc: 'Você foi derrotado na masmorra.',
            gameover_time: 'Tempo Sobrevivido:',
            gameover_best: 'Melhor Sobrevivência:',
            gameover_retry: 'Tentar Novamente',

            // — Vitória —
            victory_title: 'Vitória!',
            victory_desc: 'Você sobreviveu à Toca do Coelho e escapou!',
            victory_time: 'Tempo Total:',
            victory_best: 'Melhor Tempo:',
            victory_retry: 'Jogar Novamente',

            // — Room labels (canvas) —
            room_spawn: 'Início',
            room_shop: 'Loja',
            room_exit: 'Saída - Próx Andar',
            room_exit_locked: '🔒 Saída Trancada — Derrote o Boss!',
            room_treasure: 'Sala do Tesouro',
            room_casino: 'Cassino',
            room_npc: 'Anjo Guardião',
            room_arena: 'Arena',
            room_miniboss: 'Mini-Chefe',
            room_battle: 'Lobisomens',
            room_cleared: 'Limpo',
            room_final_bosses: '⚠️ CHEFES FINAIS!',
            room_prepare: 'PREPARE-SE:',
            room_blocked: 'BLOQUEADO',
            room_doors_open: '💰 Portas estão abertas',
            room_npc_cage: '🔒 Derrote o guardião para libertar o Anjo!',

            // — Door labels (canvas) —
            door_boss: 'BOSS',
            door_exit: 'SAÍDA',
            door_treasure: 'BAÚ',
            door_npc: 'NPC',
            door_arena: 'ARENA',
            door_casino: 'CASSINO',
            door_mini: 'MINI',

            // — Map overlay —
            map_title: 'MAPA GLOBAL (Aperte M ou Tab para fechar)',

            // — Misc —
            operator_alert: '🔧 MODO OPERADOR ATIVADO!\nTodos os personagens secretos foram liberados temporariamente para teste.\nConquistas e recordes estão desativados nesta sessão.',
            cheats_suffix: '(Cheats)',
            na: 'N/A',

            // — Conquistas individuais —
            ach_first_blood: 'Primeira Sangue',
            ach_first_blood_desc: 'Elimine seu primeiro inimigo',
            ach_hunter: 'Caçador',
            ach_hunter_desc: 'Elimine 25 inimigos em uma run',
            ach_reaper: 'Ceifeiro',
            ach_reaper_desc: 'Elimine 75 inimigos em uma run',
            ach_relentless: 'Implacável',
            ach_relentless_desc: 'Elimine 150 inimigos em uma run',
            ach_power_awakened: 'Poder Desperto',
            ach_power_awakened_desc: 'Use sua habilidade especial pela primeira vez',
            ach_specialist: 'Especialista',
            ach_specialist_desc: 'Use sua habilidade especial 15 vezes em uma run',
            ach_first_floor: 'Explorador',
            ach_first_floor_desc: 'Complete o primeiro andar',
            ach_pathfinder: 'Desbravador',
            ach_pathfinder_desc: 'Complete 3 andares em uma run',
            ach_boss_hunter: 'Caçador de Chefes',
            ach_boss_hunter_desc: 'Derrote seu primeiro Boss',
            ach_boss_no_dmg: 'Invulnerável',
            ach_boss_no_dmg_desc: 'Derrote um Boss sem sofrer dano',
            ach_floor_no_dmg: 'Intocável',
            ach_floor_no_dmg_desc: 'Complete um andar inteiro sem tomar dano',
            ach_rich: 'Milionário',
            ach_rich_desc: 'Acumule 500 de ouro em uma run',
            ach_golden_era: 'A Era de Ouro',
            ach_golden_era_desc: 'Compre o total de 50 itens na loja (Acumulativo em várias partidas)',
            ach_winner: 'Vencedor',
            ach_winner_desc: 'Complete o jogo e escape da toca!',
            ach_nightmare_clear: 'Lendário',
            ach_nightmare_clear_desc: 'Complete o jogo no modo Pesadelo',
            ach_impossible_clear: 'Impossível',
            ach_impossible_clear_desc: 'Complete o jogo no Pesadelo (Jornada Longa) sem tomar dano',
            ach_speed_demon: 'Velocista Supremo',
            ach_speed_demon_desc: 'Escape da Toca e vença o jogo em menos de 8 minutos!',
            ach_ghost_runner: 'Fantasma',
            ach_ghost_runner_desc: 'Complete o jogo eliminando menos de 20 inimigos totais',

            // Categorias de conquistas
            ach_cat_combat: '⚔️ Combate',
            ach_cat_abilities: '✨ Habilidades',
            ach_cat_exploration: '🗺️ Exploração',
            ach_cat_bosses: '👑 Chefes',
            ach_cat_survival: '🛡️ Sobrevivência',
            ach_cat_shop: '🏪 Loja',
            ach_cat_victory: '🏆 Vitória',

            // Tier labels
            tier_bronze: '🥉 Bronze',
            tier_silver: '🥈 Prata',
            tier_gold: '🥇 Ouro',
            tier_platinum: '💎 Platina',
            tier_mythic: '🌌 Mítico',

            // — KeyLabel override —
            key_space: 'Espaço',
            key_m1: 'M1 (Esq.)',
            key_m2: 'M2 (Dir.)',
            key_m3: 'M3 (Meio)',

            // — Boss Names —
            boss_0: 'Olho Sombrio',
            boss_1: 'Dragão de Fogo',
            boss_2: 'Golem de Gelo',
            boss_3: 'Fantasma Elétrico',
            boss_4: 'Rei das Sombras',
            boss_5: 'Vento Cortante',
            boss_6: 'Colmeia Tóxica',
            boss_7: 'Núcleo Gravitacional',
            boss_8: 'Colosso do Apocalipse',

            // — Items (shop) —
            item_heal_10: 'Gota Menor',
            item_heal_10_desc: 'Cura 10% da vida',
            item_heal_25: 'Poção Menor',
            item_heal_25_desc: 'Cura 25% da vida',
            item_heal_50: 'Poção Média',
            item_heal_50_desc: 'Cura 50% da vida',
            item_heal_100: 'Poção Máxima',
            item_heal_100_desc: 'Cura 100% da vida',
            item_heal_5: 'Elixir Fraco',
            item_heal_5_desc: 'Cura 5% da vida',
            item_heal_1: 'Gota Mística',
            item_heal_1_desc: 'Cura 1% + Reg 1hp/5s por 30s',
            item_heal_regen2: 'Raiz da Vida',
            item_heal_regen2_desc: 'Regen leve por 45s',
            item_heal_speed: 'Sangue Mágico',
            item_heal_speed_desc: 'Cura 15% e +Velocidade 5s',
            item_weapon_fire: 'Cajado de Fogo',
            item_weapon_fire_desc: 'Projéteis que queimam',
            item_weapon_taser: 'Arma de Raio',
            item_weapon_taser_desc: 'Raios paralisam',
            item_weapon_ice: 'Cetro de Gelo',
            item_weapon_ice_desc: 'Projéteis lentos',
            item_weapon_sniper: 'Lança Longa',
            item_weapon_sniper_desc: 'Disparo único poderoso',
            item_weapon_poison: 'Zarabatana',
            item_weapon_poison_desc: 'Envenena ao longo do tempo',
            item_weapon_pierce: 'Espada de Luz',
            item_weapon_pierce_desc: 'Atravessa inimigos',
            item_weapon_shuriken: 'Shuriken',
            item_weapon_shuriken_desc: 'Rápidos, mas menos dano',
            item_weapon_bubble: 'Arma de Bolhas',
            item_weapon_bubble_desc: 'Lentas, mas enormes',
            item_buff_strength: 'Poção de Força',
            item_buff_strength_desc: 'Dano +25% permanente',
            item_buff_speed: 'Poção de Velocidade',
            item_buff_speed_desc: 'Velocidade +15% permanente',
            item_buff_maxhp: 'Coração de Ferro',
            item_buff_maxhp_desc: 'Vida Máxima +2 permanente',
            item_buff_luck: 'Trevo Dourado',
            item_buff_luck_desc: 'Mais ouro coletado',
            item_buff_resist: 'Couro Resistente',
            item_buff_resist_desc: 'Reduz dano recebido',
            item_buff_maxhp2: 'Maçã Dourada',
            item_buff_maxhp2_desc: 'Vida Máx +4, perde vida atual',
            item_buff_regen_perm: 'Coração Vivo',
            item_buff_regen_perm_desc: 'Regen leve HP perm (20s)',
            item_skill_gravity: 'Gravidade (Ativa E)',
            item_skill_gravity_desc: 'Puxa todos os inimigos ao centro',
            item_skill_fly: 'Voo (Ativa E)',
            item_skill_fly_desc: 'Voe por 4s, imune a projéteis',
            item_skill_earthquake: 'Terremoto (Ativa E)',
            item_skill_earthquake_desc: 'Dano enorme em área',
            item_skill_iceberg: 'Criar Iceberg (Ativa E)',
            item_skill_iceberg_desc: 'Cria barreiras de gelo',
            item_skill_explosion: 'Explosão (Ativa E)',
            item_skill_explosion_desc: 'Dano massivo em área',
            item_skill_timewarp: 'Distorção (Ativa E)',
            item_skill_timewarp_desc: 'Desacelera todos inimigos',
            item_skill_heal: 'Kit Médico (Ativa E)',
            item_skill_heal_desc: 'Restaura 3HP imediatamente',
            item_skill_shatter: 'Estilhaçar (Ativa E)',
            item_skill_shatter_desc: 'Dano forte em área e paralisa',
            item_skill_invis: 'Fumaça (Ativa E)',
            item_skill_invis_desc: 'Invisibilidade temporária',
        },

        // ============================================================
        // ENGLISH
        // ============================================================
        en: {
            title_subtitle: 'Descend to the depths of the burrow...',
            btn_play: '⚔️ Play',
            btn_manual: '📖 Manual',
            btn_achievements: '🏆 Achievements',
            btn_leaderboard: '🌍 Leaderboard',
            btn_settings: '⚙️ Settings',
            btn_logout: '👋 Logout',
            version_text: 'v2.0 — Press any button',

            auth_hint: 'Log in to enter the dungeon.',
            auth_login: 'Login',
            auth_register: 'Register',
            auth_or: '― OR ―',
            auth_google: 'Sign in with Google',
            auth_guest: 'Play without account (progress won\'t be saved)',
            auth_email_placeholder: 'Email',
            auth_pass_placeholder: 'Password',

            nickname_title: 'Welcome to the Void',
            nickname_placeholder: 'Your name',
            nickname_confirm: 'Confirm Name',

            leaderboard_title: '🌍 Leaderboard',
            leaderboard_hint: 'Coming Soon: The greatest challengers of Voidfall.',
            leaderboard_loading: 'Syncing with the Archons...',
            btn_back_menu: 'Back to Menu',

            settings_title: '⚙️ Settings',
            tab_audio: '🔊 Audio',
            tab_video: '🖥️ Video',
            tab_controls: '🎮 Controls',
            tab_access: '🌐 Accessibility',
            tab_cheats: '💀 Cheats',

            label_vol_master: 'Master Volume',
            label_vol_music: 'Music',
            label_vol_sfx: 'Sound Effects',

            label_resolution: 'Resolution',
            label_fullscreen: 'Fullscreen',
            btn_activate: 'Enable',
            btn_deactivate: 'Disable',
            label_quality: 'Graphics Quality',
            quality_low: 'Low',
            quality_medium: 'Medium',
            quality_high: 'High',
            label_lighting: 'Dynamic Lighting',
            lighting_on: 'On',
            lighting_off: 'Off',

            controls_hint: 'Click the button and press a key or mouse button to remap.',
            label_move_up: 'Move Up',
            label_move_down: 'Move Down',
            label_move_left: 'Move Left',
            label_move_right: 'Move Right',
            label_jump: 'Jump',
            label_ability: 'Ability',
            label_skill: 'Extra Skill',
            label_map: 'Map',
            btn_reset_keys: '🔄 Reset Default',
            controls_gamepad_hint: '🎮 Gamepad supported. | Shoot = Left Click | Pause = Esc',

            label_language: 'Language',
            label_colorblind: 'Colorblind Filter',
            colorblind_none: 'None',
            label_hud_size: 'HUD Size',
            label_mobile_size: 'Mobile Controls Size',
            label_joystick_x: 'Joystick (X)',
            label_joystick_y: 'Joystick (Y)',
            label_btn_action_x: 'Action Buttons (X)',
            label_btn_action_y: 'Action Buttons (Y)',

            cheat_label: 'Enable Cheats (God Mode)',
            cheat_warning: '⚠️ Cheat mode will enable:<br>- 999,999 Unlimited Gold<br>- Infinite Health (Invincible)<br>- Free flight through walls<br>- Full brightness in the dark<br><br>Using cheats blocks new achievements and record submissions.',

            btn_reset_save: '🗑️ Delete Progress',
            btn_back: '← Back',
            reset_confirm: "⚠️ ARE YOU SURE? ⚠️\n\nThis will erase ALL your progress, including:\n- All time records\n- Unlocked Characters\n- Achievements\n- Gold and purchased Items\n\nThis action is IRREVERSIBLE! Continue?",
            reset_done: 'Your progress has been completely erased. The game will restart.',

            manual_title: '📖 Game Manual',
            manual_objective_title: '🎯 Objective',
            manual_objective: 'Explore the burrow, defeat enemies and bosses on each floor, collect gold and items, and survive to escape on the 5th floor!',
            manual_controls_title: '🕹️ Controls',
            manual_controls: '<strong>WASD</strong> — Move | <strong>Mouse</strong> — Aim and Shoot<br><strong>Space</strong> — Jump (avoids damage) | <strong>Q</strong> — Hero Ability<br><strong>E</strong> — Extra Skill (bought at shop) | <strong>ESC</strong> — Pause',
            manual_map_title: '🗺️ Map',
            manual_map: 'The map is randomly generated. Each room can be battle, mini-boss, boss, treasure, NPC or shop. The minimap in the bottom right shows nearby rooms.',
            manual_shop_title: '🏪 Shop',
            manual_shop: 'After defeating each boss, a shop appears with 3 random items. Use gold to buy heals, weapons, buffs or special abilities.',
            manual_weapons_title: '⚔️ Weapons',
            manual_weapons: '🔥 <strong>Fire Staff</strong> — Burns enemies<br>⚡ <strong>Lightning Gun</strong> — Stuns enemies<br>❄️ <strong>Ice Scepter</strong> — Slows enemies',
            manual_bosses_title: '👹 Bosses',
            manual_bosses: 'Each floor has a boss with a unique attack pattern. The final boss of the 5th floor is the <strong>Apocalypse Colossus</strong>, with meteor rain and rock barriers!',
            manual_difficulty_title: '🎖️ Difficulties',
            manual_difficulty: '<strong>Easy</strong> — More health, weak enemies<br><strong>Normal</strong> — Standard experience<br><strong>Hard</strong> — Less health, strong enemies<br><strong>Nightmare</strong> — For true warrior rabbits!',

            achievements_title: '🏆 Achievements',
            achievements_count: 'Unlocked',
            ach_toast_label: 'ACHIEVEMENT UNLOCKED',

            prep_title: '⚔️ Prepare Expedition',
            diff_label: 'Difficulty:',
            diff_easy: '🌿 Easy',
            diff_easy_desc: '+3 Health, Enemies -30%',
            diff_normal: '⚔️ Normal',
            diff_normal_desc: 'Standard experience',
            diff_hard: '🔥 Hard',
            diff_hard_desc: '-1 Health, Enemies +50%',
            diff_nightmare: '💀 Nightmare',
            diff_nightmare_desc: '-2 Health, Enemies +100%',
            duration_label: 'Journey Length:',
            dur_short: '🏃 Short',
            dur_short_desc: '3 Floors',
            dur_normal: '⚔️ Standard',
            dur_normal_desc: '5 Floors',
            dur_long: '🌕 Long',
            dur_long_desc: '8 Floors',
            hero_label: 'Choose your Hero:',
            btn_start: '🚀 Start Exploration',
            locked_text: 'Locked: Secret Challenge',

            hud_floor: 'Floor',
            hud_location: 'Location:',
            hud_weapon: '🔫 Weapon:',
            hud_weapon_default: 'Default',
            hud_ability: '✨ Abil.',
            hud_ability_ready: 'READY',
            hud_skill: '⚡ Extra',
            hud_boss: 'Boss',
            hud_ghost_title: 'Ghost Mission: < 20 kills',

            pause_title: '⏸️ Paused',
            pause_level: 'Level:',
            pause_time: 'Time:',
            btn_resume: '▶️ Resume',
            btn_pause_settings: '⚙️ Settings',
            btn_restart: '🔄 Restart',
            btn_quit: '🚪 Main Menu',

            reward_title: '🧚 Angel Freed!',
            reward_subtitle: 'The guardian is grateful. Choose your reward:',
            reward_damage_title: 'Dark Power',
            reward_damage_desc: '+20% permanent damage on all attacks and abilities',
            reward_heal_title: 'Vital Blessing',
            reward_heal_desc: 'Restore all health and gain +1 max HP',
            reward_gold_title: 'Celestial Fortune',
            reward_gold_desc: 'Receive 60 gold and +25% bonus on future collection',

            shop_title: '🏪 Burrow Shop',
            shop_gold: 'Your Gold:',
            shop_close: 'Continue Exploring',

            casino_title: '🎰 Casino Room',
            casino_desc: 'Try your luck! Get three \'1\'s to win, or four \'1\'s for the Jackpot!',
            casino_cost: 'Cost:',
            casino_cost_val: '🪙 15 Gold',
            casino_gold_label: 'Your current gold:',
            casino_spin: 'Spin (15G)',
            casino_leave: 'Leave',
            casino_no_gold: 'Not enough gold! (15 coins)',
            casino_jackpot: 'JACKPOT! 🎉 +250 Gold!',
            casino_win: 'WIN! 💰 +40 Gold!',
            casino_lose: 'LOST! 😢 Try again.',

            gameover_title: 'End of the Line',
            gameover_desc: 'You were defeated in the dungeon.',
            gameover_time: 'Survival Time:',
            gameover_best: 'Best Survival:',
            gameover_retry: 'Try Again',

            victory_title: 'Victory!',
            victory_desc: 'You survived the Rabbit Burrow and escaped!',
            victory_time: 'Total Time:',
            victory_best: 'Best Time:',
            victory_retry: 'Play Again',

            room_spawn: 'Start',
            room_shop: 'Shop',
            room_exit: 'Exit - Next Floor',
            room_exit_locked: '🔒 Exit Locked — Defeat the Boss!',
            room_treasure: 'Treasure Room',
            room_casino: 'Casino',
            room_npc: 'Angel Guardian',
            room_arena: 'Arena',
            room_miniboss: 'Mini-Boss',
            room_battle: 'Werewolves',
            room_cleared: 'Cleared',
            room_final_bosses: '⚠️ FINAL BOSSES!',
            room_prepare: 'GET READY:',
            room_blocked: 'BLOCKED',
            room_doors_open: '💰 Doors are open',
            room_npc_cage: '🔒 Defeat the guardian to free the Angel!',

            door_boss: 'BOSS',
            door_exit: 'EXIT',
            door_treasure: 'CHEST',
            door_npc: 'NPC',
            door_arena: 'ARENA',
            door_casino: 'CASINO',
            door_mini: 'MINI',

            map_title: 'GLOBAL MAP (Press M or Tab to close)',

            operator_alert: '🔧 OPERATOR MODE ACTIVATED!\nAll secret characters have been temporarily unlocked for testing.\nAchievements and records are disabled this session.',
            cheats_suffix: '(Cheats)',
            na: 'N/A',

            ach_first_blood: 'First Blood', ach_first_blood_desc: 'Kill your first enemy',
            ach_hunter: 'Hunter', ach_hunter_desc: 'Kill 25 enemies in a run',
            ach_reaper: 'Reaper', ach_reaper_desc: 'Kill 75 enemies in a run',
            ach_relentless: 'Relentless', ach_relentless_desc: 'Kill 150 enemies in a run',
            ach_power_awakened: 'Power Awakened', ach_power_awakened_desc: 'Use your special ability for the first time',
            ach_specialist: 'Specialist', ach_specialist_desc: 'Use your special ability 15 times in a run',
            ach_first_floor: 'Explorer', ach_first_floor_desc: 'Complete the first floor',
            ach_pathfinder: 'Pathfinder', ach_pathfinder_desc: 'Complete 3 floors in a run',
            ach_boss_hunter: 'Boss Hunter', ach_boss_hunter_desc: 'Defeat your first Boss',
            ach_boss_no_dmg: 'Invulnerable', ach_boss_no_dmg_desc: 'Defeat a Boss without taking damage',
            ach_floor_no_dmg: 'Untouchable', ach_floor_no_dmg_desc: 'Complete an entire floor without taking damage',
            ach_rich: 'Millionaire', ach_rich_desc: 'Accumulate 500 gold in a run',
            ach_golden_era: 'The Golden Era', ach_golden_era_desc: 'Buy a total of 50 items in the shop (Cumulative across runs)',
            ach_winner: 'Winner', ach_winner_desc: 'Complete the game and escape the burrow!',
            ach_nightmare_clear: 'Legendary', ach_nightmare_clear_desc: 'Complete the game on Nightmare mode',
            ach_impossible_clear: 'Impossible', ach_impossible_clear_desc: 'Complete the game on Nightmare (Long Journey) without taking damage',
            ach_speed_demon: 'Speed Demon', ach_speed_demon_desc: 'Escape the Burrow and win the game in under 8 minutes!',
            ach_ghost_runner: 'Ghost', ach_ghost_runner_desc: 'Complete the game killing less than 20 enemies total',

            ach_cat_combat: '⚔️ Combat', ach_cat_abilities: '✨ Abilities', ach_cat_exploration: '🗺️ Exploration',
            ach_cat_bosses: '👑 Bosses', ach_cat_survival: '🛡️ Survival', ach_cat_shop: '🏪 Shop', ach_cat_victory: '🏆 Victory',

            tier_bronze: '🥉 Bronze', tier_silver: '🥈 Silver', tier_gold: '🥇 Gold', tier_platinum: '💎 Platinum', tier_mythic: '🌌 Mythic',

            key_space: 'Space', key_m1: 'M1 (Left)', key_m2: 'M2 (Right)', key_m3: 'M3 (Middle)',

            boss_0: 'Shadow Eye', boss_1: 'Fire Dragon', boss_2: 'Ice Golem', boss_3: 'Electric Ghost',
            boss_4: 'Shadow King', boss_5: 'Cutting Wind', boss_6: 'Toxic Hive', boss_7: 'Gravitational Core', boss_8: 'Apocalypse Colossus',

            item_heal_10: 'Minor Drop', item_heal_10_desc: 'Heals 10% health',
            item_heal_25: 'Minor Potion', item_heal_25_desc: 'Heals 25% health',
            item_heal_50: 'Medium Potion', item_heal_50_desc: 'Heals 50% health',
            item_heal_100: 'Max Potion', item_heal_100_desc: 'Heals 100% health',
            item_heal_5: 'Weak Elixir', item_heal_5_desc: 'Heals 5% health',
            item_heal_1: 'Mystic Drop', item_heal_1_desc: 'Heals 1% + Regen 1hp/5s for 30s',
            item_heal_regen2: 'Life Root', item_heal_regen2_desc: 'Light regen for 45s',
            item_heal_speed: 'Magic Blood', item_heal_speed_desc: 'Heals 15% and +Speed 5s',
            item_weapon_fire: 'Fire Staff', item_weapon_fire_desc: 'Burning projectiles',
            item_weapon_taser: 'Lightning Gun', item_weapon_taser_desc: 'Paralysing rays',
            item_weapon_ice: 'Ice Scepter', item_weapon_ice_desc: 'Slowing projectiles',
            item_weapon_sniper: 'Long Lance', item_weapon_sniper_desc: 'Powerful single shot',
            item_weapon_poison: 'Blowpipe', item_weapon_poison_desc: 'Poisons over time',
            item_weapon_pierce: 'Light Sword', item_weapon_pierce_desc: 'Pierces enemies',
            item_weapon_shuriken: 'Shuriken', item_weapon_shuriken_desc: 'Fast, less damage',
            item_weapon_bubble: 'Bubble Gun', item_weapon_bubble_desc: 'Slow, but huge',
            item_buff_strength: 'Strength Potion', item_buff_strength_desc: 'Damage +25% permanent',
            item_buff_speed: 'Speed Potion', item_buff_speed_desc: 'Speed +15% permanent',
            item_buff_maxhp: 'Iron Heart', item_buff_maxhp_desc: 'Max HP +2 permanent',
            item_buff_luck: 'Golden Clover', item_buff_luck_desc: 'More gold collected',
            item_buff_resist: 'Tough Leather', item_buff_resist_desc: 'Reduces damage taken',
            item_buff_maxhp2: 'Golden Apple', item_buff_maxhp2_desc: 'Max HP +4, lose current HP',
            item_buff_regen_perm: 'Living Heart', item_buff_regen_perm_desc: 'Permanent light HP regen (20s)',
            item_skill_gravity: 'Gravity (Active E)', item_skill_gravity_desc: 'Pulls all enemies to center',
            item_skill_fly: 'Flight (Active E)', item_skill_fly_desc: 'Fly for 4s, immune to projectiles',
            item_skill_earthquake: 'Earthquake (Active E)', item_skill_earthquake_desc: 'Huge area damage',
            item_skill_iceberg: 'Create Iceberg (Active E)', item_skill_iceberg_desc: 'Creates ice barriers',
            item_skill_explosion: 'Explosion (Active E)', item_skill_explosion_desc: 'Massive area damage',
            item_skill_timewarp: 'Time Warp (Active E)', item_skill_timewarp_desc: 'Slows all enemies',
            item_skill_heal: 'Med Kit (Active E)', item_skill_heal_desc: 'Restores 3HP immediately',
            item_skill_shatter: 'Shatter (Active E)', item_skill_shatter_desc: 'Strong area damage and stuns',
            item_skill_invis: 'Smoke (Active E)', item_skill_invis_desc: 'Temporary invisibility',
        },

        // ============================================================
        // ESPAÑOL
        // ============================================================
        es: {
            title_subtitle: 'Desciende hasta el fondo de la madriguera...',
            btn_play: '⚔️ Jugar',
            btn_manual: '📖 Manual',
            btn_achievements: '🏆 Logros',
            btn_leaderboard: '🌍 Tabla Global',
            btn_settings: '⚙️ Configuración',
            btn_logout: '👋 Salir',
            version_text: 'v2.0 — Presiona cualquier botón',

            auth_hint: 'Inicia sesión para entrar a la mazmorra.',
            auth_login: 'Entrar',
            auth_register: 'Crear Cuenta',
            auth_or: '― O ―',
            auth_google: 'Entrar con Google',
            auth_guest: 'Jugar sin cuenta (el progreso no se guardará)',
            auth_email_placeholder: 'Correo',
            auth_pass_placeholder: 'Contraseña',

            nickname_title: 'Bienvenido al Vacío',
            nickname_placeholder: 'Tu nombre',
            nickname_confirm: 'Confirmar Nombre',

            leaderboard_title: '🌍 Tabla Global',
            leaderboard_hint: 'Próximamente: Los mayores desafiantes de Voidfall.',
            leaderboard_loading: 'Sincronizando con los Arcontes...',
            btn_back_menu: 'Volver al Menú',

            settings_title: '⚙️ Configuración',
            tab_audio: '🔊 Audio',
            tab_video: '🖥️ Vídeo',
            tab_controls: '🎮 Controles',
            tab_access: '🌐 Accesibilidad',
            tab_cheats: '💀 Trucos',

            label_vol_master: 'Volumen General',
            label_vol_music: 'Música',
            label_vol_sfx: 'Efectos de Sonido',

            label_resolution: 'Resolución',
            label_fullscreen: 'Pantalla Completa',
            btn_activate: 'Activar',
            btn_deactivate: 'Desactivar',
            label_quality: 'Calidad Gráfica',
            quality_low: 'Baja',
            quality_medium: 'Media',
            quality_high: 'Alta',
            label_lighting: 'Iluminación Dinámica',
            lighting_on: 'Encendido',
            lighting_off: 'Apagado',

            controls_hint: 'Haz clic en el botón y presiona una tecla o botón del ratón para reasignar.',
            label_move_up: 'Mover Arriba',
            label_move_down: 'Mover Abajo',
            label_move_left: 'Mover Izquierda',
            label_move_right: 'Mover Derecha',
            label_jump: 'Saltar',
            label_ability: 'Habilidad',
            label_skill: 'Habilidad Extra',
            label_map: 'Mapa',
            btn_reset_keys: '🔄 Restaurar Predeterminado',
            controls_gamepad_hint: '🎮 Gamepad disponible. | Disparar = Clic Izq. | Pausar = Esc',

            label_language: 'Idioma',
            label_colorblind: 'Filtro de Daltonismo',
            colorblind_none: 'Ninguno',
            label_hud_size: 'Tamaño del HUD',
            label_mobile_size: 'Tamaño Controles Móvil',
            label_joystick_x: 'Joystick (X)',
            label_joystick_y: 'Joystick (Y)',
            label_btn_action_x: 'Botones Acción (X)',
            label_btn_action_y: 'Botones Acción (Y)',

            cheat_label: 'Activar Trucos (Modo Dios)',
            cheat_warning: '⚠️ El modo Trucos activará:<br>- 999.999 Oro Ilimitado<br>- Vida Infinita (Invencible)<br>- Vuelo Libre por paredes<br>- Brillo Total en la oscuridad<br><br>El uso de trucos bloquea nuevos logros y envíos de récord.',

            btn_reset_save: '🗑️ Borrar Progreso',
            btn_back: '← Volver',
            reset_confirm: "⚠️ ¿ESTÁS SEGURO? ⚠️\n\nEsto borrará TODO tu progreso, incluyendo:\n- Todos los récords de tiempo\n- Personajes Desbloqueados\n- Logros\n- Oro e Ítems comprados\n\n¡Esta acción es IRREVERSIBLE! ¿Deseas continuar?",
            reset_done: 'Tu progreso ha sido completamente borrado. El juego se reiniciará.',

            manual_title: '📖 Manual del Juego',
            manual_objective_title: '🎯 Objetivo',
            manual_objective: '¡Explora la madriguera, derrota enemigos y jefes en cada piso, recolecta oro e ítems, y sobrevive hasta escapar en el 5º piso!',
            manual_controls_title: '🕹️ Controles',
            manual_controls: '<strong>WASD</strong> — Mover | <strong>Ratón</strong> — Apuntar y Disparar<br><strong>Espacio</strong> — Saltar (evita daño) | <strong>Q</strong> — Habilidad del Héroe<br><strong>E</strong> — Habilidad Extra (comprada en tienda) | <strong>ESC</strong> — Pausar',
            manual_map_title: '🗺️ Mapa',
            manual_map: 'El mapa se genera aleatoriamente. Cada sala puede ser de batalla, mini-jefe, jefe, tesoro, NPC o tienda. El minimapa en la esquina inferior derecha muestra las salas cercanas.',
            manual_shop_title: '🏪 Tienda',
            manual_shop: 'Después de derrotar a cada jefe, aparece una tienda con 3 ítems aleatorios. Usa oro para comprar curaciones, armas, mejoras o habilidades especiales.',
            manual_weapons_title: '⚔️ Armas',
            manual_weapons: '🔥 <strong>Bastón de Fuego</strong> — Quema enemigos<br>⚡ <strong>Arma de Rayo</strong> — Paraliza enemigos<br>❄️ <strong>Cetro de Hielo</strong> — Ralentiza enemigos',
            manual_bosses_title: '👹 Jefes',
            manual_bosses: 'Cada piso tiene un jefe con un patrón de ataque único. El jefe final del 5º piso es el <strong>Coloso del Apocalipsis</strong>, ¡con lluvia de meteoros y barreras de piedra!',
            manual_difficulty_title: '🎖️ Dificultades',
            manual_difficulty: '<strong>Fácil</strong> — Más vida, enemigos débiles<br><strong>Normal</strong> — Experiencia estándar<br><strong>Difícil</strong> — Menos vida, enemigos fuertes<br><strong>Pesadilla</strong> — ¡Para verdaderos conejos guerreros!',

            achievements_title: '🏆 Logros',
            achievements_count: 'Desbloqueados',
            ach_toast_label: 'LOGRO DESBLOQUEADO',

            prep_title: '⚔️ Preparar Expedición',
            diff_label: 'Dificultad:',
            diff_easy: '🌿 Fácil', diff_easy_desc: '+3 Vida, Enemigos -30%',
            diff_normal: '⚔️ Normal', diff_normal_desc: 'Experiencia estándar',
            diff_hard: '🔥 Difícil', diff_hard_desc: '-1 Vida, Enemigos +50%',
            diff_nightmare: '💀 Pesadilla', diff_nightmare_desc: '-2 Vida, Enemigos +100%',
            duration_label: 'Duración del Viaje:',
            dur_short: '🏃 Corta', dur_short_desc: '3 Pisos',
            dur_normal: '⚔️ Estándar', dur_normal_desc: '5 Pisos',
            dur_long: '🌕 Larga', dur_long_desc: '8 Pisos',
            hero_label: 'Elige tu Héroe:',
            btn_start: '🚀 Iniciar Exploración',
            locked_text: 'Bloqueado: Desafío Secreto',

            hud_floor: 'Piso', hud_location: 'Ubicación:', hud_weapon: '🔫 Arma:', hud_weapon_default: 'Estándar',
            hud_ability: '✨ Habil.', hud_ability_ready: 'LISTO', hud_skill: '⚡ Extra', hud_boss: 'Jefe',
            hud_ghost_title: 'Misión Fantasma: < 20 eliminaciones',

            pause_title: '⏸️ Pausado', pause_level: 'Nivel:', pause_time: 'Tiempo:',
            btn_resume: '▶️ Continuar', btn_pause_settings: '⚙️ Configuración', btn_restart: '🔄 Reiniciar', btn_quit: '🚪 Menú Principal',

            reward_title: '🧚 ¡Ángel Liberado!', reward_subtitle: 'El guardián está agradecido. Elige tu recompensa:',
            reward_damage_title: 'Poder Oscuro', reward_damage_desc: '+20% de daño permanente en todos los ataques y habilidades',
            reward_heal_title: 'Bendición Vital', reward_heal_desc: 'Recupera toda la vida y gana +1 de HP máximo',
            reward_gold_title: 'Fortuna Celestial', reward_gold_desc: 'Recibe 60 de oro y bonificación de +25% en recolección futura',

            shop_title: '🏪 Tienda de la Madriguera', shop_gold: 'Tu Oro:', shop_close: 'Continuar Explorando',

            casino_title: '🎰 Sala de Casino', casino_desc: '¡Prueba tu suerte! ¡Consigue tres \'1\' para ganar, o cuatro \'1\' para el Jackpot!',
            casino_cost: 'Costo:', casino_cost_val: '🪙 15 Oro', casino_gold_label: 'Tu oro actual:',
            casino_spin: 'Girar (15G)', casino_leave: 'Salir',
            casino_no_gold: '¡Oro insuficiente! (15 monedas)', casino_jackpot: '¡JACKPOT! 🎉 +250 Oro!',
            casino_win: '¡VICTORIA! 💰 +40 Oro!', casino_lose: '¡PERDISTE! 😢 Inténtalo de nuevo.',

            gameover_title: 'Fin del Camino', gameover_desc: 'Fuiste derrotado en la mazmorra.',
            gameover_time: 'Tiempo Sobrevivido:', gameover_best: 'Mejor Supervivencia:', gameover_retry: 'Intentar de Nuevo',

            victory_title: '¡Victoria!', victory_desc: '¡Sobreviviste a la Madriguera y escapaste!',
            victory_time: 'Tiempo Total:', victory_best: 'Mejor Tiempo:', victory_retry: 'Jugar de Nuevo',

            room_spawn: 'Inicio', room_shop: 'Tienda', room_exit: 'Salida - Sig. Piso', room_exit_locked: '🔒 Salida Bloqueada — ¡Derrota al Jefe!',
            room_treasure: 'Sala del Tesoro', room_casino: 'Casino', room_npc: 'Ángel Guardián', room_arena: 'Arena', room_miniboss: 'Mini-Jefe',
            room_battle: 'Hombres Lobo', room_cleared: 'Despejado', room_final_bosses: '⚠️ ¡JEFES FINALES!',
            room_prepare: 'PREPÁRATE:', room_blocked: 'BLOQUEADO', room_doors_open: '💰 Las puertas están abiertas',
            room_npc_cage: '🔒 ¡Derrota al guardián para liberar al Ángel!',

            door_boss: 'JEFE', door_exit: 'SALIDA', door_treasure: 'COFRE', door_npc: 'NPC', door_arena: 'ARENA', door_casino: 'CASINO', door_mini: 'MINI',

            map_title: 'MAPA GLOBAL (Presiona M o Tab para cerrar)',

            operator_alert: '🔧 ¡MODO OPERADOR ACTIVADO!\nTodos los personajes secretos han sido desbloqueados temporalmente para pruebas.\nLogros y récords están desactivados en esta sesión.',
            cheats_suffix: '(Trucos)', na: 'N/A',

            ach_first_blood: 'Primera Sangre', ach_first_blood_desc: 'Elimina a tu primer enemigo',
            ach_hunter: 'Cazador', ach_hunter_desc: 'Elimina 25 enemigos en una partida',
            ach_reaper: 'Segador', ach_reaper_desc: 'Elimina 75 enemigos en una partida',
            ach_relentless: 'Implacable', ach_relentless_desc: 'Elimina 150 enemigos en una partida',
            ach_power_awakened: 'Poder Despierto', ach_power_awakened_desc: 'Usa tu habilidad especial por primera vez',
            ach_specialist: 'Especialista', ach_specialist_desc: 'Usa tu habilidad especial 15 veces en una partida',
            ach_first_floor: 'Explorador', ach_first_floor_desc: 'Completa el primer piso',
            ach_pathfinder: 'Pionero', ach_pathfinder_desc: 'Completa 3 pisos en una partida',
            ach_boss_hunter: 'Cazador de Jefes', ach_boss_hunter_desc: 'Derrota a tu primer Jefe',
            ach_boss_no_dmg: 'Invulnerable', ach_boss_no_dmg_desc: 'Derrota a un Jefe sin recibir daño',
            ach_floor_no_dmg: 'Intocable', ach_floor_no_dmg_desc: 'Completa un piso entero sin recibir daño',
            ach_rich: 'Millonario', ach_rich_desc: 'Acumula 500 de oro en una partida',
            ach_golden_era: 'La Era de Oro', ach_golden_era_desc: 'Compra un total de 50 ítems en la tienda (Acumulativo)',
            ach_winner: 'Ganador', ach_winner_desc: '¡Completa el juego y escapa de la madriguera!',
            ach_nightmare_clear: 'Legendario', ach_nightmare_clear_desc: 'Completa el juego en modo Pesadilla',
            ach_impossible_clear: 'Imposible', ach_impossible_clear_desc: 'Completa el juego en Pesadilla (Viaje Largo) sin recibir daño',
            ach_speed_demon: 'Velocista Supremo', ach_speed_demon_desc: '¡Escapa de la Madriguera y gana el juego en menos de 8 minutos!',
            ach_ghost_runner: 'Fantasma', ach_ghost_runner_desc: 'Completa el juego eliminando menos de 20 enemigos totales',

            ach_cat_combat: '⚔️ Combate', ach_cat_abilities: '✨ Habilidades', ach_cat_exploration: '🗺️ Exploración',
            ach_cat_bosses: '👑 Jefes', ach_cat_survival: '🛡️ Supervivencia', ach_cat_shop: '🏪 Tienda', ach_cat_victory: '🏆 Victoria',

            tier_bronze: '🥉 Bronce', tier_silver: '🥈 Plata', tier_gold: '🥇 Oro', tier_platinum: '💎 Platino', tier_mythic: '🌌 Mítico',

            key_space: 'Espacio', key_m1: 'M1 (Izq.)', key_m2: 'M2 (Der.)', key_m3: 'M3 (Centro)',

            boss_0: 'Ojo Sombrío', boss_1: 'Dragón de Fuego', boss_2: 'Gólem de Hielo', boss_3: 'Fantasma Eléctrico',
            boss_4: 'Rey de las Sombras', boss_5: 'Viento Cortante', boss_6: 'Colmena Tóxica', boss_7: 'Núcleo Gravitacional', boss_8: 'Coloso del Apocalipsis',

            item_heal_10: 'Gota Menor', item_heal_10_desc: 'Cura 10% de vida',
            item_heal_25: 'Poción Menor', item_heal_25_desc: 'Cura 25% de vida',
            item_heal_50: 'Poción Media', item_heal_50_desc: 'Cura 50% de vida',
            item_heal_100: 'Poción Máxima', item_heal_100_desc: 'Cura 100% de vida',
            item_heal_5: 'Elixir Débil', item_heal_5_desc: 'Cura 5% de vida',
            item_heal_1: 'Gota Mística', item_heal_1_desc: 'Cura 1% + Regen 1hp/5s por 30s',
            item_heal_regen2: 'Raíz de Vida', item_heal_regen2_desc: 'Regen leve por 45s',
            item_heal_speed: 'Sangre Mágica', item_heal_speed_desc: 'Cura 15% y +Velocidad 5s',
            item_weapon_fire: 'Bastón de Fuego', item_weapon_fire_desc: 'Proyectiles que queman',
            item_weapon_taser: 'Arma de Rayo', item_weapon_taser_desc: 'Rayos paralizan',
            item_weapon_ice: 'Cetro de Hielo', item_weapon_ice_desc: 'Proyectiles lentos',
            item_weapon_sniper: 'Lanza Larga', item_weapon_sniper_desc: 'Disparo único poderoso',
            item_weapon_poison: 'Cerbatana', item_weapon_poison_desc: 'Envenena con el tiempo',
            item_weapon_pierce: 'Espada de Luz', item_weapon_pierce_desc: 'Atraviesa enemigos',
            item_weapon_shuriken: 'Shuriken', item_weapon_shuriken_desc: 'Rápidos, menos daño',
            item_weapon_bubble: 'Arma de Burbujas', item_weapon_bubble_desc: 'Lentas, pero enormes',
            item_buff_strength: 'Poción de Fuerza', item_buff_strength_desc: 'Daño +25% permanente',
            item_buff_speed: 'Poción de Velocidad', item_buff_speed_desc: 'Velocidad +15% permanente',
            item_buff_maxhp: 'Corazón de Hierro', item_buff_maxhp_desc: 'HP Máx +2 permanente',
            item_buff_luck: 'Trébol Dorado', item_buff_luck_desc: 'Más oro recolectado',
            item_buff_resist: 'Cuero Resistente', item_buff_resist_desc: 'Reduce daño recibido',
            item_buff_maxhp2: 'Manzana Dorada', item_buff_maxhp2_desc: 'HP Máx +4, pierde vida actual',
            item_buff_regen_perm: 'Corazón Vivo', item_buff_regen_perm_desc: 'Regen HP perm leve (20s)',
            item_skill_gravity: 'Gravedad (Activa E)', item_skill_gravity_desc: 'Atrae todos los enemigos al centro',
            item_skill_fly: 'Vuelo (Activa E)', item_skill_fly_desc: 'Vuela por 4s, inmune a proyectiles',
            item_skill_earthquake: 'Terremoto (Activa E)', item_skill_earthquake_desc: 'Daño enorme en área',
            item_skill_iceberg: 'Crear Iceberg (Activa E)', item_skill_iceberg_desc: 'Crea barreras de hielo',
            item_skill_explosion: 'Explosión (Activa E)', item_skill_explosion_desc: 'Daño masivo en área',
            item_skill_timewarp: 'Distorsión (Activa E)', item_skill_timewarp_desc: 'Ralentiza todos los enemigos',
            item_skill_heal: 'Kit Médico (Activa E)', item_skill_heal_desc: 'Restaura 3HP inmediatamente',
            item_skill_shatter: 'Fragmentar (Activa E)', item_skill_shatter_desc: 'Daño fuerte en área y paraliza',
            item_skill_invis: 'Humo (Activa E)', item_skill_invis_desc: 'Invisibilidad temporal',
        },

        // ============================================================
        // FRANÇAIS
        // ============================================================
        fr: {
            title_subtitle: 'Descendez au fond du terrier...',
            btn_play: '⚔️ Jouer',
            btn_manual: '📖 Manuel',
            btn_achievements: '🏆 Succès',
            btn_leaderboard: '🌍 Classement',
            btn_settings: '⚙️ Paramètres',
            btn_logout: '👋 Déconnexion',
            version_text: 'v2.0 — Appuyez sur un bouton',

            auth_hint: 'Connectez-vous pour entrer dans le donjon.',
            auth_login: 'Connexion',
            auth_register: 'Créer un Compte',
            auth_or: '― OU ―',
            auth_google: 'Se connecter avec Google',
            auth_guest: 'Jouer sans compte (la progression ne sera pas sauvegardée)',
            auth_email_placeholder: 'E-mail',
            auth_pass_placeholder: 'Mot de passe',

            nickname_title: 'Bienvenue dans le Vide',
            nickname_placeholder: 'Votre nom',
            nickname_confirm: 'Confirmer le Nom',

            leaderboard_title: '🌍 Classement',
            leaderboard_hint: 'Bientôt : Les plus grands challengers de Voidfall.',
            leaderboard_loading: 'Synchronisation avec les Archontes...',
            btn_back_menu: 'Retour au Menu',

            settings_title: '⚙️ Paramètres',
            tab_audio: '🔊 Audio',
            tab_video: '🖥️ Vidéo',
            tab_controls: '🎮 Contrôles',
            tab_access: '🌐 Accessibilité',
            tab_cheats: '💀 Triches',

            label_vol_master: 'Volume Général',
            label_vol_music: 'Musique',
            label_vol_sfx: 'Effets Sonores',

            label_resolution: 'Résolution',
            label_fullscreen: 'Plein Écran',
            btn_activate: 'Activer',
            btn_deactivate: 'Désactiver',
            label_quality: 'Qualité Graphique',
            quality_low: 'Basse',
            quality_medium: 'Moyenne',
            quality_high: 'Haute',
            label_lighting: 'Éclairage Dynamique',
            lighting_on: 'Activé',
            lighting_off: 'Désactivé',

            controls_hint: 'Cliquez sur le bouton et appuyez sur une touche ou un bouton de souris pour reconfigurer.',
            label_move_up: 'Déplacer Haut',
            label_move_down: 'Déplacer Bas',
            label_move_left: 'Déplacer Gauche',
            label_move_right: 'Déplacer Droite',
            label_jump: 'Sauter',
            label_ability: 'Capacité',
            label_skill: 'Compétence Extra',
            label_map: 'Carte',
            btn_reset_keys: '🔄 Réinitialiser',
            controls_gamepad_hint: '🎮 Manette disponible. | Tirer = Clic Gauche | Pause = Échap',

            label_language: 'Langue',
            label_colorblind: 'Filtre Daltonisme',
            colorblind_none: 'Aucun',
            label_hud_size: 'Taille de l\'ATH',
            label_mobile_size: 'Taille Contrôles Mobile',
            label_joystick_x: 'Joystick (X)',
            label_joystick_y: 'Joystick (Y)',
            label_btn_action_x: 'Boutons Action (X)',
            label_btn_action_y: 'Boutons Action (Y)',

            cheat_label: 'Activer Triches (Mode Dieu)',
            cheat_warning: '⚠️ Le mode Triche activera :<br>- 999 999 Or Illimité<br>- Vie Infinie (Invincible)<br>- Vol Libre à travers les murs<br>- Luminosité Totale dans l\'obscurité<br><br>L\'utilisation de triches bloque les nouveaux succès et les soumissions de records.',

            btn_reset_save: '🗑️ Effacer la Progression',
            btn_back: '← Retour',
            reset_confirm: "⚠️ ÊTES-VOUS SÛR ? ⚠️\n\nCela effacera TOUTE votre progression, incluant :\n- Tous les records de temps\n- Personnages Débloqués\n- Succès\n- Or et Objets achetés\n\nCette action est IRRÉVERSIBLE ! Continuer ?",
            reset_done: 'Votre progression a été complètement effacée. Le jeu va redémarrer.',

            manual_title: '📖 Manuel du Jeu',
            manual_objective_title: '🎯 Objectif',
            manual_objective: 'Explorez le terrier, battez les ennemis et les boss à chaque étage, collectez l\'or et les objets, et survivez pour vous échapper au 5ème étage !',
            manual_controls_title: '🕹️ Contrôles',
            manual_controls: '<strong>ZQSD</strong> — Déplacer | <strong>Souris</strong> — Viser et Tirer<br><strong>Espace</strong> — Sauter (évite les dégâts) | <strong>Q</strong> — Capacité du Héros<br><strong>E</strong> — Compétence Extra (achetée en boutique) | <strong>ÉCHAP</strong> — Pause',
            manual_map_title: '🗺️ Carte',
            manual_map: 'La carte est générée aléatoirement. Chaque salle peut être de combat, mini-boss, boss, trésor, PNJ ou boutique. La minicarte en bas à droite montre les salles proches.',
            manual_shop_title: '🏪 Boutique',
            manual_shop: 'Après avoir vaincu chaque boss, une boutique apparaît avec 3 objets aléatoires. Utilisez l\'or pour acheter des soins, armes, améliorations ou capacités spéciales.',
            manual_weapons_title: '⚔️ Armes',
            manual_weapons: '🔥 <strong>Bâton de Feu</strong> — Brûle les ennemis<br>⚡ <strong>Pistolet Éclair</strong> — Paralyse les ennemis<br>❄️ <strong>Sceptre de Glace</strong> — Ralentit les ennemis',
            manual_bosses_title: '👹 Boss',
            manual_bosses: 'Chaque étage a un boss avec un schéma d\'attaque unique. Le boss final du 5ème étage est le <strong>Colosse de l\'Apocalypse</strong>, avec une pluie de météores et des barrières de pierre !',
            manual_difficulty_title: '🎖️ Difficultés',
            manual_difficulty: '<strong>Facile</strong> — Plus de vie, ennemis faibles<br><strong>Normal</strong> — Expérience standard<br><strong>Difficile</strong> — Moins de vie, ennemis forts<br><strong>Cauchemar</strong> — Pour les vrais lapins guerriers !',

            achievements_title: '🏆 Succès',
            achievements_count: 'Débloqués',
            ach_toast_label: 'SUCCÈS DÉBLOQUÉ',

            prep_title: '⚔️ Préparer l\'Expédition',
            diff_label: 'Difficulté :',
            diff_easy: '🌿 Facile', diff_easy_desc: '+3 Vie, Ennemis -30%',
            diff_normal: '⚔️ Normal', diff_normal_desc: 'Expérience standard',
            diff_hard: '🔥 Difficile', diff_hard_desc: '-1 Vie, Ennemis +50%',
            diff_nightmare: '💀 Cauchemar', diff_nightmare_desc: '-2 Vie, Ennemis +100%',
            duration_label: 'Durée du Voyage :',
            dur_short: '🏃 Courte', dur_short_desc: '3 Étages',
            dur_normal: '⚔️ Standard', dur_normal_desc: '5 Étages',
            dur_long: '🌕 Longue', dur_long_desc: '8 Étages',
            hero_label: 'Choisissez votre Héros :',
            btn_start: '🚀 Lancer l\'Exploration',
            locked_text: 'Verrouillé : Défi Secret',

            hud_floor: 'Ét.', hud_location: 'Lieu :', hud_weapon: '🔫 Arme :', hud_weapon_default: 'Défaut',
            hud_ability: '✨ Cap.', hud_ability_ready: 'PRÊT', hud_skill: '⚡ Extra', hud_boss: 'Boss',
            hud_ghost_title: 'Mission Fantôme : < 20 éliminations',

            pause_title: '⏸️ En Pause', pause_level: 'Niveau :', pause_time: 'Temps :',
            btn_resume: '▶️ Reprendre', btn_pause_settings: '⚙️ Paramètres', btn_restart: '🔄 Redémarrer', btn_quit: '🚪 Menu Principal',

            reward_title: '🧚 Ange Libéré !', reward_subtitle: 'Le gardien est reconnaissant. Choisissez votre récompense :',
            reward_damage_title: 'Pouvoir Sombre', reward_damage_desc: '+20% de dégâts permanents sur toutes les attaques et capacités',
            reward_heal_title: 'Bénédiction Vitale', reward_heal_desc: 'Restaure toute la vie et gagne +1 PV max',
            reward_gold_title: 'Fortune Céleste', reward_gold_desc: 'Reçoit 60 d\'or et bonus de +25% sur la collecte future',

            shop_title: '🏪 Boutique du Terrier', shop_gold: 'Votre Or :', shop_close: 'Continuer l\'Exploration',

            casino_title: '🎰 Salle du Casino', casino_desc: 'Tentez votre chance ! Obtenez trois \'1\' pour gagner, ou quatre \'1\' pour le Jackpot !',
            casino_cost: 'Coût :', casino_cost_val: '🪙 15 Or', casino_gold_label: 'Votre or actuel :',
            casino_spin: 'Tourner (15G)', casino_leave: 'Quitter',
            casino_no_gold: 'Pas assez d\'or ! (15 pièces)', casino_jackpot: 'JACKPOT ! 🎉 +250 Or !',
            casino_win: 'VICTOIRE ! 💰 +40 Or !', casino_lose: 'PERDU ! 😢 Réessayez.',

            gameover_title: 'Fin de la Route', gameover_desc: 'Vous avez été vaincu dans le donjon.',
            gameover_time: 'Temps de Survie :', gameover_best: 'Meilleure Survie :', gameover_retry: 'Réessayer',

            victory_title: 'Victoire !', victory_desc: 'Vous avez survécu au Terrier du Lapin et vous êtes échappé !',
            victory_time: 'Temps Total :', victory_best: 'Meilleur Temps :', victory_retry: 'Rejouer',

            room_spawn: 'Départ', room_shop: 'Boutique', room_exit: 'Sortie - Étage Suiv.', room_exit_locked: '🔒 Sortie Verrouillée — Battez le Boss !',
            room_treasure: 'Salle du Trésor', room_casino: 'Casino', room_npc: 'Ange Gardien', room_arena: 'Arène', room_miniboss: 'Mini-Boss',
            room_battle: 'Loups-Garous', room_cleared: 'Dégagé', room_final_bosses: '⚠️ BOSS FINAUX !',
            room_prepare: 'PRÉPAREZ-VOUS :', room_blocked: 'BLOQUÉ', room_doors_open: '💰 Les portes sont ouvertes',
            room_npc_cage: '🔒 Battez le gardien pour libérer l\'Ange !',

            door_boss: 'BOSS', door_exit: 'SORTIE', door_treasure: 'COFFRE', door_npc: 'PNJ', door_arena: 'ARÈNE', door_casino: 'CASINO', door_mini: 'MINI',

            map_title: 'CARTE GLOBALE (Appuyez M ou Tab pour fermer)',

            operator_alert: '🔧 MODE OPÉRATEUR ACTIVÉ !\nTous les personnages secrets ont été temporairement débloqués pour les tests.\nLes succès et records sont désactivés cette session.',
            cheats_suffix: '(Triches)', na: 'N/A',

            ach_first_blood: 'Premier Sang', ach_first_blood_desc: 'Éliminez votre premier ennemi',
            ach_hunter: 'Chasseur', ach_hunter_desc: 'Éliminez 25 ennemis en une partie',
            ach_reaper: 'Faucheur', ach_reaper_desc: 'Éliminez 75 ennemis en une partie',
            ach_relentless: 'Implacable', ach_relentless_desc: 'Éliminez 150 ennemis en une partie',
            ach_power_awakened: 'Pouvoir Éveillé', ach_power_awakened_desc: 'Utilisez votre capacité spéciale pour la première fois',
            ach_specialist: 'Spécialiste', ach_specialist_desc: 'Utilisez votre capacité spéciale 15 fois en une partie',
            ach_first_floor: 'Explorateur', ach_first_floor_desc: 'Complétez le premier étage',
            ach_pathfinder: 'Éclaireur', ach_pathfinder_desc: 'Complétez 3 étages en une partie',
            ach_boss_hunter: 'Chasseur de Boss', ach_boss_hunter_desc: 'Battez votre premier Boss',
            ach_boss_no_dmg: 'Invulnérable', ach_boss_no_dmg_desc: 'Battez un Boss sans subir de dégâts',
            ach_floor_no_dmg: 'Intouchable', ach_floor_no_dmg_desc: 'Complétez un étage entier sans subir de dégâts',
            ach_rich: 'Millionnaire', ach_rich_desc: 'Accumulez 500 d\'or en une partie',
            ach_golden_era: 'L\'Âge d\'Or', ach_golden_era_desc: 'Achetez un total de 50 objets en boutique (Cumulatif)',
            ach_winner: 'Vainqueur', ach_winner_desc: 'Terminez le jeu et échappez-vous du terrier !',
            ach_nightmare_clear: 'Légendaire', ach_nightmare_clear_desc: 'Terminez le jeu en mode Cauchemar',
            ach_impossible_clear: 'Impossible', ach_impossible_clear_desc: 'Terminez le jeu en Cauchemar (Long Voyage) sans subir de dégâts',
            ach_speed_demon: 'Démon de Vitesse', ach_speed_demon_desc: 'Échappez-vous du Terrier et gagnez le jeu en moins de 8 minutes !',
            ach_ghost_runner: 'Fantôme', ach_ghost_runner_desc: 'Terminez le jeu en éliminant moins de 20 ennemis au total',

            ach_cat_combat: '⚔️ Combat', ach_cat_abilities: '✨ Capacités', ach_cat_exploration: '🗺️ Exploration',
            ach_cat_bosses: '👑 Boss', ach_cat_survival: '🛡️ Survie', ach_cat_shop: '🏪 Boutique', ach_cat_victory: '🏆 Victoire',

            tier_bronze: '🥉 Bronze', tier_silver: '🥈 Argent', tier_gold: '🥇 Or', tier_platinum: '💎 Platine', tier_mythic: '🌌 Mythique',

            key_space: 'Espace', key_m1: 'M1 (Gauche)', key_m2: 'M2 (Droit)', key_m3: 'M3 (Milieu)',

            boss_0: 'Œil de l\'Ombre', boss_1: 'Dragon de Feu', boss_2: 'Golem de Glace', boss_3: 'Fantôme Électrique',
            boss_4: 'Roi des Ombres', boss_5: 'Vent Tranchant', boss_6: 'Ruche Toxique', boss_7: 'Noyau Gravitationnel', boss_8: 'Colosse de l\'Apocalypse',

            item_heal_10: 'Goutte Mineure', item_heal_10_desc: 'Soigne 10% de vie',
            item_heal_25: 'Potion Mineure', item_heal_25_desc: 'Soigne 25% de vie',
            item_heal_50: 'Potion Moyenne', item_heal_50_desc: 'Soigne 50% de vie',
            item_heal_100: 'Potion Maximale', item_heal_100_desc: 'Soigne 100% de vie',
            item_heal_5: 'Élixir Faible', item_heal_5_desc: 'Soigne 5% de vie',
            item_heal_1: 'Goutte Mystique', item_heal_1_desc: 'Soigne 1% + Régén 1pv/5s pendant 30s',
            item_heal_regen2: 'Racine de Vie', item_heal_regen2_desc: 'Régén légère pendant 45s',
            item_heal_speed: 'Sang Magique', item_heal_speed_desc: 'Soigne 15% et +Vitesse 5s',
            item_weapon_fire: 'Bâton de Feu', item_weapon_fire_desc: 'Projectiles brûlants',
            item_weapon_taser: 'Pistolet Éclair', item_weapon_taser_desc: 'Rayons paralysants',
            item_weapon_ice: 'Sceptre de Glace', item_weapon_ice_desc: 'Projectiles ralentissants',
            item_weapon_sniper: 'Lance Longue', item_weapon_sniper_desc: 'Tir unique puissant',
            item_weapon_poison: 'Sarbacane', item_weapon_poison_desc: 'Empoisonne avec le temps',
            item_weapon_pierce: 'Épée de Lumière', item_weapon_pierce_desc: 'Traverse les ennemis',
            item_weapon_shuriken: 'Shuriken', item_weapon_shuriken_desc: 'Rapides, moins de dégâts',
            item_weapon_bubble: 'Arme à Bulles', item_weapon_bubble_desc: 'Lentes, mais énormes',
            item_buff_strength: 'Potion de Force', item_buff_strength_desc: 'Dégâts +25% permanent',
            item_buff_speed: 'Potion de Vitesse', item_buff_speed_desc: 'Vitesse +15% permanent',
            item_buff_maxhp: 'Cœur de Fer', item_buff_maxhp_desc: 'PV Max +2 permanent',
            item_buff_luck: 'Trèfle Doré', item_buff_luck_desc: 'Plus d\'or collecté',
            item_buff_resist: 'Cuir Résistant', item_buff_resist_desc: 'Réduit les dégâts reçus',
            item_buff_maxhp2: 'Pomme Dorée', item_buff_maxhp2_desc: 'PV Max +4, perd la vie actuelle',
            item_buff_regen_perm: 'Cœur Vivant', item_buff_regen_perm_desc: 'Régén PV perm légère (20s)',
            item_skill_gravity: 'Gravité (Active E)', item_skill_gravity_desc: 'Attire tous les ennemis au centre',
            item_skill_fly: 'Vol (Active E)', item_skill_fly_desc: 'Volez 4s, immunisé aux projectiles',
            item_skill_earthquake: 'Séisme (Active E)', item_skill_earthquake_desc: 'Dégâts énormes en zone',
            item_skill_iceberg: 'Créer Iceberg (Active E)', item_skill_iceberg_desc: 'Crée des barrières de glace',
            item_skill_explosion: 'Explosion (Active E)', item_skill_explosion_desc: 'Dégâts massifs en zone',
            item_skill_timewarp: 'Distorsion (Active E)', item_skill_timewarp_desc: 'Ralentit tous les ennemis',
            item_skill_heal: 'Kit Médical (Active E)', item_skill_heal_desc: 'Restaure 3PV immédiatement',
            item_skill_shatter: 'Briser (Active E)', item_skill_shatter_desc: 'Dégâts forts en zone et paralyse',
            item_skill_invis: 'Fumée (Active E)', item_skill_invis_desc: 'Invisibilité temporaire',
        },
    },

    // ─── Funções Públicas ────────────────────────────────────

    /** Retorna a tradução para uma chave no idioma atual */
    t(key) {
        const lang = this.translations[this.currentLang];
        if (lang && lang[key] !== undefined) return lang[key];
        // Fallback para PT
        const fallback = this.translations.pt;
        if (fallback && fallback[key] !== undefined) return fallback[key];
        return key; // Retorna a chave crua se não achar
    },

    /** Define o idioma e aplica em todos os elementos com data-i18n */
    setLanguage(lang) {
        if (!this.translations[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('toca_language', lang);

        // Atualiza o atributo lang do HTML
        document.documentElement.lang = lang === 'pt' ? 'pt-br' : lang;

        // Aplica traduções em todos os elementos HTML marcados
        this.applyHTMLTranslations();

        // Notifica o game engine
        if (typeof window.onLanguageChanged === 'function') {
            window.onLanguageChanged(lang);
        }
    },

    /** Aplica traduções nos elementos HTML com data-i18n */
    applyHTMLTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = this.t(key);
            if (el.tagName === 'INPUT' && el.type !== 'range') {
                el.placeholder = val;
            } else if (el.tagName === 'OPTION') {
                el.textContent = val;
            } else {
                // Verifica se a chave contém HTML (como <br> ou <strong>)
                if (val.includes('<') && val.includes('>')) {
                    el.innerHTML = val;
                } else {
                    el.textContent = val;
                }
            }
        });

        // Atualiza atributos title com data-i18n-title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            el.title = this.t(el.getAttribute('data-i18n-title'));
        });
    },

    /** Inicializa o sistema de i18n */
    init() {
        // Carrega o idioma salvo ou detecta do navegador
        let saved = localStorage.getItem('toca_language');
        if (!saved) {
            const browserLang = (navigator.language || 'pt').substring(0, 2);
            saved = this.translations[browserLang] ? browserLang : 'pt';
        }
        this.currentLang = saved;

        // Sincroniza o dropdown de idioma
        const sel = document.getElementById('set-language');
        if (sel) {
            sel.value = saved;
            sel.addEventListener('change', () => {
                this.setLanguage(sel.value);
            });
        }

        // Aplica traduções iniciais
        this.applyHTMLTranslations();
    }
};

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => I18N.init());

// Se o DOM já foi carregado (script no final do body)
if (document.readyState !== 'loading') {
    I18N.init();
}
