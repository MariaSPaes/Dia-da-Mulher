// ========================================
// JOGO DA MEMÓRIA - MULHERES NA TECNOLOGIA
// Design: #7B0F33 (Marrom), #AE607F (Rosa)
// ========================================

const women = [
  {
    id: "margaret",
    name: "Margaret Hamilton",
    achievement: "Desenvolveu o software de voo do Apollo 11 que levou o homem à Lua",
    image: "imagensFundo/mulheresjogo/Margaret_Hamilton_1995.jpg"
  },
  {
    id: "hedy",
    name: "Hedy Lamarr",
    achievement: "Inventou a tecnologia de 'frequency hopping' que inspirou WiFi, Bluetooth e GPS modernos",
    image: "imagensFundo/mulheresjogo/HedyLammar.jpg"
  },
  {
    id: "ada",
    name: "Ada Lovelace",
    achievement: "Escreveu o primeiro algoritmo destinado a ser processado por uma máquina (1843)",
    image: "imagensFundo/mulheresjogo/ada.jpg"
  },
  {
    id: "grace",
    name: "Grace Hopper",
    achievement: "Desenvolveu o primeiro compilador e revolucionou a programação em linguagem natural",
    image: "imagensFundo/mulheresjogo/hopper grace.jpg"
  },
  {
    id: "katherine",
    name: "Katherine Johnson",
    achievement: "Calculou as trajetórias de voo para as missões Apollo e Mercury da NASA",
    image: "imagensFundo/mulheresjogo/katherine johnson.jpg"
  },
  {
    id: "annie",
    name: "Annie Easley",
    achievement: "Desenvolveu software para a tecnologia Centaur da NASA e foi ativista pelos direitos civis",
    image: "imagensFundo/mulheresjogo/Annie_Easley.jpg"
  },
  {
    id: "feifei",
    name: "Fei-Fei Li",
    achievement: "Pioneira em inteligência artificial humanizada e visão computacional, criadora do ImageNet",
    image: "imagensFundo/mulheresjogo/feifeili.jpg"
  },
  {
    id: "kimberly",
    name: "Kimberly Bryant",
    achievement: "Fundou Black Girls Code para ensinar programação a mais de 100 mil meninas de cor",
    image: "imagensFundo/mulheresjogo/Bryant_Kimberly.jpg"
  }
];

class MemoryGame {
  constructor() {
    this.cards = [];
    this.flipped = [];
    this.matched = [];
    this.moves = 0;
    this.score = 0;
    this.gameWon = false;
    this.difficulty = null;
    this.init();
  }

  init() {
    this.createGameHTML();
    this.attachEventListeners();
  }

  createGameHTML() {
    const gameHTML = `
      <section id="jogo-memoria" class="jogo-memoria-wrapper">
        <div class="jogo-memoria-container">
          <div id="jogo-intro" class="jogo-intro">
            <h2>Jogo da Memória</h2>
            <p class="intro-subtitle">Mulheres que Transformaram a Tecnologia</p>
            <p class="intro-description">
              Encontre os pares correspondentes entre as fotos das mulheres pioneiras e suas principais realizações.
              Quanto menos movimentos, melhor sua pontuação!
            </p>
            
            <div class="difficulty-selector">
              <p class="difficulty-title">Escolha o Nível de Dificuldade:</p>
              
              <div class="difficulty-buttons">
                <button class="difficulty-btn easy" data-difficulty="easy">
                  <span class="difficulty-name">Fácil</span>
                  <span class="difficulty-info">4 Mulheres<br/>8 Cards</span>
                </button>
                
                <button class="difficulty-btn medium" data-difficulty="medium">
                  <span class="difficulty-name">Médio</span>
                  <span class="difficulty-info">8 Mulheres<br/>16 Cards</span>
                </button>
              </div>
            </div>
          </div>

          <div id="jogo-game" class="jogo-game" style="display: none;">
            <div class="jogo-header">
              <div class="jogo-title">
                <h2>Jogo da Memória</h2>
                <p>Mulheres que Transformaram a Tecnologia</p>
                <p class="difficulty-badge" id="difficulty-badge"></p>
              </div>
              
              <div class="jogo-stats">
                <div class="stat">
                  <span class="stat-label">Movimentos</span>
                  <span class="stat-value" id="moves">0</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Pontuação</span>
                  <span class="stat-value" id="score">0</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Pares</span>
                  <span class="stat-value"><span id="matched-count">0</span> / <span id="total-pairs">4</span></span>
                </div>
              </div>
            </div>

            <div class="jogo-board" id="jogo-board"></div>

            <div class="jogo-controls">
              <button class="reset-button" id="restart-btn">Reiniciar Jogo</button>
              <button class="back-button" id="back-btn">Voltar ao Menu</button>
            </div>
          </div>

          <div id="jogo-won" class="jogo-won-modal" style="display: none;">
            <div class="won-content">
              <h3>Parabéns!</h3>
              <p>Você completou o jogo!</p>
              <div class="final-stats">
                <p><strong>Nível:</strong> <span id="final-difficulty"></span></p>
                <p><strong>Movimentos:</strong> <span id="final-moves"></span></p>
                <p><strong>Pontuação Final:</strong> <span class="score-highlight" id="final-score"></span></p>
              </div>
              <div class="modal-buttons">
                <button class="restart-button" id="play-again-btn">Jogar Novamente</button>
                <button class="restart-button" id="change-level-btn">Mudar Nível</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    const frase = document.querySelector('.frase');
    if (frase) {
      frase.insertAdjacentHTML('afterend', gameHTML);
    } else {
      document.body.insertAdjacentHTML('beforeend', gameHTML);
    }

    this.addStyles();
  }

  addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .jogo-memoria-wrapper { width: 100%; padding: 60px 20px; background: linear-gradient(135deg, rgba(123, 15, 51, 0.03) 0%, rgba(174, 96, 127, 0.03) 100%); }
      .jogo-memoria-container { width: 100%; max-width: 1600px; margin: 0 auto; padding: 60px 30px; background: white; border-radius: 20px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column; align-items: center; }
      .jogo-intro { text-align: center; padding: 80px 50px; animation: fadeIn 0.6s ease-in; width: 100%; }
      .jogo-intro h2 { font-family: 'Bricolage Grotesque', sans-serif; font-size: 72px; font-weight: 700; color: #7B0F33; margin-bottom: 15px; letter-spacing: 2px; font-style: italic; }
      .intro-subtitle { font-size: 36px; color: #AE607F; margin-bottom: 30px; font-weight: 600; }
      .intro-description { font-size: 22px; color: #555; max-width: 800px; margin: 0 auto 50px; line-height: 1.8; }
      .difficulty-selector { margin: 50px 0; }
      .difficulty-title { font-size: 28px; font-weight: 700; color: #7B0F33; margin-bottom: 40px; font-family: 'Bricolage Grotesque', sans-serif; }
      .difficulty-buttons { display: flex; justify-content: center; gap: 50px; flex-wrap: wrap; margin-bottom: 50px; }
      .difficulty-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px; padding: 50px 60px; border: 3px solid #AE607F; background: white; border-radius: 20px; cursor: pointer; transition: all 0.3s ease; font-family: 'Bricolage Grotesque', sans-serif; min-width: 250px; }
      .difficulty-btn:hover { transform: translateY(-8px); box-shadow: 0 15px 40px rgba(123, 15, 51, 0.3); }
      .difficulty-btn.easy { border-color: #AE607F; }
      .difficulty-btn.easy:hover { background: linear-gradient(135deg, rgba(144, 238, 144, 0.1) 0%, rgba(144, 238, 144, 0.05) 100%); }
      .difficulty-btn.medium { border-color: #AE607F; }
      .difficulty-btn.medium:hover { background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%); }
      .difficulty-name { font-size: 28px; font-weight: 700; color: #7B0F33; }
      .difficulty-info { font-size: 18px; color: #999; text-align: center; line-height: 1.6; }
      .jogo-header { display: flex; justify-content: center; align-items: center; margin-bottom: 50px; flex-wrap: wrap; gap: 60px; padding-bottom: 30px; border-bottom: 3px solid #f0f0f0; width: 100%; }
      .jogo-title { text-align: center; }
      .jogo-title h2 { font-family: 'Bricolage Grotesque', sans-serif; font-size: 56px; font-weight: 700; color: #7B0F33; margin: 0; letter-spacing: 2px; font-style: italic; }
      .jogo-title p { font-size: 22px; color: #AE607F; margin: 8px 0 0 0; font-weight: 600; }
      .difficulty-badge { font-size: 18px !important; color: #7B0F33 !important; margin-top: 12px !important; background: linear-gradient(135deg, rgba(123, 15, 51, 0.1) 0%, rgba(174, 96, 127, 0.1) 100%); padding: 10px 18px !important; border-radius: 25px; display: inline-block; font-weight: 700; }
      .jogo-stats { display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; }
      .stat { display: flex; flex-direction: column; align-items: center; background: linear-gradient(135deg, rgba(123, 15, 51, 0.05) 0%, rgba(174, 96, 127, 0.05) 100%); padding: 25px 35px; border-radius: 15px; border-left: 5px solid #AE607F; }
      .stat-label { font-size: 16px; color: #999; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; }
      .stat-value { font-size: 40px; font-weight: 700; color: #7B0F33; margin-top: 8px; font-family: 'Bricolage Grotesque', sans-serif; }
      .jogo-board { display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; margin-bottom: 50px; padding: 40px; background: linear-gradient(135deg, rgba(123, 15, 51, 0.02) 0%, rgba(174, 96, 127, 0.02) 100%); border-radius: 20px; width: 100%; max-width: 1400px; }
      
      /* CARTA MAIOR PARA DESKTOP */
      .memory-card { width: 240px; height: 300px; cursor: pointer; perspective: 1000px; position: relative; border-radius: 15px; overflow: hidden; flex-shrink: 0; }
      .memory-card.matched { cursor: default; opacity: 0.6; pointer-events: none; }
      .card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); transform-style: preserve-3d; }
      .memory-card.flipped .card-inner { transform: rotateY(180deg); }
      .card-front, .card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; border-radius: 15px; font-weight: 700; }
      .card-front { background: linear-gradient(135deg, #7B0F33 0%, #AE607F 100%); color: white; box-shadow: 0 8px 20px rgba(123, 15, 51, 0.4); border: 3px solid rgba(255, 255, 255, 0.3); font-size: 90px; animation: bounce 1s infinite; }
      .card-front:hover { box-shadow: 0 12px 35px rgba(123, 15, 51, 0.6); }
      .card-back { background: white; transform: rotateY(180deg); border: 3px solid #AE607F; padding: 12px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); }
      .card-content { text-align: center; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 10px; overflow: hidden; box-sizing: border-box; }
      .card-photo { width: 100%; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 12px; }
      .card-photo img { width: 100%; height: 100%; object-fit: cover; border-radius: 12px; }
      
      /* FONTES MAIORES */
      .card-name-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(123, 15, 51, 0.98), rgba(123, 15, 51, 0.75)); color: white; padding: 12px 10px; font-size: 18px; font-weight: 700; font-family: 'Bricolage Grotesque', sans-serif; text-align: center; line-height: 1.3; }
      .card-achievement { font-size: 16px; color: #333; line-height: 1.4; font-weight: 600; text-align: center; padding: 15px; box-sizing: border-box; }
      
      .memory-card.matched .card-front { background: linear-gradient(135deg, #d4a5b4 0%, #c9919a 100%); opacity: 0.6; }
      .memory-card.matched .card-back { background: #f5f5f5; opacity: 0.6; }
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
      .jogo-won-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.3s ease; }
      .won-content { background: white; padding: 70px 60px; border-radius: 25px; text-align: center; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4); max-width: 600px; animation: slideUp 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
      .won-content h3 { font-family: 'Bricolage Grotesque', sans-serif; font-size: 56px; color: #7B0F33; margin: 0 0 20px 0; letter-spacing: 2px; font-style: italic; }
      .won-content p { font-size: 24px; color: #555; margin: 15px 0; }
      .final-stats { background: linear-gradient(135deg, rgba(123, 15, 51, 0.05) 0%, rgba(174, 96, 127, 0.05) 100%); padding: 30px; border-radius: 15px; margin: 35px 0; border-left: 5px solid #AE607F; }
      .final-stats p { margin: 15px 0; font-size: 20px; color: #333; }
      .score-highlight { font-size: 32px; font-weight: 700; color: #7B0F33; font-family: 'Bricolage Grotesque', sans-serif; }
      .modal-buttons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 30px; }
      .restart-button { background: linear-gradient(135deg, #7B0F33 0%, #AE607F 100%); color: white; border: none; padding: 18px 40px; font-size: 20px; font-weight: 700; border-radius: 60px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(123, 15, 51, 0.4); font-family: 'Bricolage Grotesque', sans-serif; }
      .restart-button:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(123, 15, 51, 0.5); }
      .jogo-controls { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 40px; width: 100%; }
      .reset-button { background: white; color: #7B0F33; border: 3px solid #AE607F; padding: 16px 40px; font-size: 18px; font-weight: 700; border-radius: 60px; cursor: pointer; transition: all 0.3s ease; font-family: 'Bricolage Grotesque', sans-serif; letter-spacing: 1px; }
      .reset-button:hover { background: #AE607F; color: white; transform: translateY(-3px); }
      .back-button { background: linear-gradient(135deg, #7B0F33 0%, #AE607F 100%); color: white; border: none; padding: 16px 40px; font-size: 18px; font-weight: 700; border-radius: 60px; cursor: pointer; transition: all 0.3s ease; font-family: 'Bricolage Grotesque', sans-serif; letter-spacing: 1px; }
      .back-button:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(123, 15, 51, 0.4); }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      
      /* RESPONSIVIDADE AJUSTADA - AUMENTANDO TUDO */
      @media (max-width: 1024px) {
        .memory-card { width: 200px; height: 260px; }
        .card-front { font-size: 70px; }
        .card-name-overlay { font-size: 16px; padding: 10px; }
        .card-achievement { font-size: 14px; padding: 12px; }
        .jogo-board { gap: 20px; }
      }
      @media (max-width: 768px) {
        .jogo-memoria-wrapper { padding: 40px 15px; }
        .jogo-memoria-container { padding: 40px 20px; }
        .jogo-intro { padding: 50px 30px; }
        .jogo-intro h2 { font-size: 40px; }
        .intro-subtitle { font-size: 22px; }
        .intro-description { font-size: 15px; }
        .difficulty-title { font-size: 20px; }
        .difficulty-buttons { gap: 20px; }
        .difficulty-btn { padding: 30px 35px; min-width: 180px; }
        .difficulty-name { font-size: 20px; }
        .difficulty-info { font-size: 13px; }
        .jogo-header { gap: 30px; flex-direction: column; }
        .jogo-title h2 { font-size: 34px; }
        .jogo-title p { font-size: 15px; }
        .jogo-stats { gap: 15px; }
        .stat { padding: 18px 22px; }
        .stat-value { font-size: 28px; }
        .jogo-board { gap: 12px; padding: 20px 10px; }
        
        /* Tablets */
        .memory-card { width: 150px; height: 195px; }
        .card-front { font-size: 50px; }
        .card-name-overlay { font-size: 13px; padding: 8px; }
        .card-achievement { font-size: 12px; padding: 10px; line-height: 1.3; }
        
        .won-content { padding: 45px 35px; }
        .won-content h3 { font-size: 38px; }
        .won-content p { font-size: 17px; }
        .final-stats p { font-size: 15px; }
        .score-highlight { font-size: 22px; }
        .restart-button { padding: 14px 28px; font-size: 16px; }
        .reset-button, .back-button { padding: 12px 28px; font-size: 14px; }
      }
      @media (max-width: 480px) {
        .jogo-memoria-wrapper { padding: 30px 10px; }
        .jogo-memoria-container { padding: 25px 12px; border-radius: 14px; }
        .jogo-intro { padding: 30px 15px; }
        .jogo-intro h2 { font-size: 28px; }
        .intro-subtitle { font-size: 16px; }
        .intro-description { font-size: 13px; }
        .difficulty-title { font-size: 16px; margin-bottom: 20px; }
        .difficulty-buttons { flex-direction: column; gap: 15px; }
        .difficulty-btn { width: 100%; min-width: unset; padding: 22px 20px; }
        .difficulty-name { font-size: 18px; }
        .difficulty-info { font-size: 12px; }
        .jogo-header { gap: 20px; margin-bottom: 25px; }
        .jogo-title h2 { font-size: 22px; }
        .jogo-title p { font-size: 13px; }
        .jogo-stats { gap: 10px; }
        .stat { padding: 12px 16px; }
        .stat-label { font-size: 11px; }
        .stat-value { font-size: 20px; }
        .jogo-board { gap: 8px; padding: 15px 8px; }
        
        /* Celulares - cards menores */
        .memory-card { width: calc(50% - 10px); max-width: 160px; height: 160px; }
        .card-front { font-size: 40px; }
        .card-name-overlay { font-size: 11px; padding: 5px; }
        .card-achievement { font-size: 10px; padding: 7px; line-height: 1.25; }
        
        .won-content { padding: 30px 20px; margin: 10px; }
        .won-content h3 { font-size: 28px; }
        .won-content p { font-size: 14px; }
        .final-stats { padding: 20px 15px; }
        .final-stats p { font-size: 14px; }
        .score-highlight { font-size: 22px; }
        .modal-buttons { flex-direction: column; gap: 12px; }
        .restart-button, .reset-button, .back-button { width: 100%; padding: 14px 20px; font-size: 15px; }
        .jogo-controls { flex-direction: column; gap: 12px; }
      }
      @media (max-width: 360px) {
        .memory-card { width: calc(50% - 6px); height: 140px; }
        .card-front { font-size: 32px; }
        .card-name-overlay { font-size: 10px; padding: 4px; }
        .card-achievement { font-size: 9px; padding: 5px; }
        .jogo-intro h2 { font-size: 22px; }
        .jogo-title h2 { font-size: 18px; }
        .stat-value { font-size: 18px; }
      }
    `;
    document.head.appendChild(style);
  }

  attachEventListeners() {
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.startGame(e.target.closest('.difficulty-btn').dataset.difficulty);
      });
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
      this.startGame(this.difficulty);
    });

    document.getElementById('back-btn').addEventListener('click', () => {
      this.backToMenu();
    });

    document.getElementById('play-again-btn').addEventListener('click', () => {
      this.startGame(this.difficulty);
    });

    document.getElementById('change-level-btn').addEventListener('click', () => {
      this.backToMenu();
    });
  }

  startGame(difficulty) {
    this.difficulty = difficulty;
    this.moves = 0;
    this.score = 0;
    this.flipped = [];
    this.matched = [];
    this.gameWon = false;

    const numWomen = difficulty === 'easy' ? 4 : 8;
    const selectedWomen = women.slice(0, numWomen);

    this.cards = [
      ...selectedWomen.map(woman => ({
        id: `${woman.id}-photo`,
        type: 'photo',
        content: woman.name,
        image: woman.image,
        pair: `${woman.id}-achievement`,
        woman
      })),
      ...selectedWomen.map(woman => ({
        id: `${woman.id}-achievement`,
        type: 'achievement',
        content: woman.achievement,
        pair: `${woman.id}-photo`,
        woman
      }))
    ].sort(() => Math.random() - 0.5);

    this.renderGame();
    this.updateUI();

    document.getElementById('jogo-intro').style.display = 'none';
    document.getElementById('jogo-game').style.display = 'block';
    document.getElementById('jogo-won').style.display = 'none';

    const badgeName = difficulty === 'easy' ? 'Nível: Fácil' : 'Nível: Médio';
    document.getElementById('difficulty-badge').textContent = badgeName;
    document.getElementById('total-pairs').textContent = numWomen;
  }

  renderGame() {
    const board = document.getElementById('jogo-board');
    board.innerHTML = '';

    this.cards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = `memory-card ${this.flipped.includes(card.id) || this.matched.includes(card.id) ? 'flipped' : ''} ${this.matched.includes(card.id) ? 'matched' : ''}`;
      cardEl.innerHTML = `
        <div class="card-inner">
          <div class="card-front">?</div>
          <div class="card-back">
            <div class="card-content">
              ${card.type === 'photo' && card.image ? `
                <div class="card-photo">
                  <img src="${card.image}" alt="${card.content}" onerror="this.src='https://via.placeholder.com/200x240?text=${encodeURIComponent(card.content)}'">
                  <div class="card-name-overlay">${card.content}</div>
                </div>
              ` : card.type === 'bonus' ? `
                <div style="font-size: 60px; font-weight: 700; color: #7B0F33;">${card.content}</div>
              ` : `
                <div class="card-achievement">${card.content}</div>
              `}
            </div>
          </div>
        </div>
      `;

      cardEl.addEventListener('click', () => this.handleCardClick(card.id));
      board.appendChild(cardEl);
    });
  }

  handleCardClick(cardId) {
    if (this.gameWon || this.flipped.includes(cardId) || this.matched.includes(cardId) || this.flipped.length >= 2) {
      return;
    }

    this.flipped.push(cardId);
    this.renderGame();

    if (this.flipped.length === 2) {
      this.moves++;
      this.updateUI();

      const card1 = this.cards.find(c => c.id === this.flipped[0]);
      const card2 = this.cards.find(c => c.id === this.flipped[1]);

      if (card1 && card2 && card1.pair === card2.id) {
        this.matched.push(this.flipped[0], this.flipped[1]);
        this.flipped = [];
        this.renderGame();
        this.checkWin();
      } else {
        setTimeout(() => {
          this.flipped = [];
          this.renderGame();
        }, 1000);
      }
    }
  }

  updateUI() {
    document.getElementById('moves').textContent = this.moves;
    const finalScore = Math.max(1000 - (this.moves * 10), 100);
    document.getElementById('score').textContent = finalScore;
    document.getElementById('matched-count').textContent = this.matched.length / 2;
  }

  checkWin() {
    if (this.matched.length === this.cards.length) {
      this.gameWon = true;
      const finalScore = Math.max(1000 - (this.moves * 10), 100);
      this.score = finalScore;

      document.getElementById('final-difficulty').textContent = this.difficulty === 'easy' ? 'Fácil' : 'Médio';
      document.getElementById('final-moves').textContent = this.moves;
      document.getElementById('final-score').textContent = finalScore;

      document.getElementById('jogo-game').style.display = 'none';
      document.getElementById('jogo-won').style.display = 'flex';
    }
  }

  backToMenu() {
    document.getElementById('jogo-intro').style.display = 'block';
    document.getElementById('jogo-game').style.display = 'none';
    document.getElementById('jogo-won').style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MemoryGame();
});