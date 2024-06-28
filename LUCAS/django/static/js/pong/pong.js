(function () {
  'use strict';

  if (typeof window.PongGame === "undefined") {
    window.PongGame = {};
  }
    var Game = PongGame.Game = function (canvas, defines) {
      //width, height, points, ball_color, ground_color, l_color, r_color, ball_url, ground_url
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      //Define o tamanho da tela do game
      this.canvas.width = defines.width;
      this.canvas.height = defines.height;
      //Define a bolinha e a quadra
      this.ball = new PongGame.Ball(this.context, defines.ball_color, defines.ball_url, defines.init_v);
      this.groud = new PongGame.Ground(this.context, defines.width, defines.height, defines.ground_color, defines.ground_url);
      //cria os players
      this.playerLeft = new PongGame.Player(this.context, "left", defines.l_color, defines.paddle_v);
      this.playerRight = new PongGame.Player(this.context, "right", defines.r_color, defines.paddle_v);
      //Cria a detecção de colisão
      this.leftDetector = new PongGame.CollisionDetector(this.playerLeft, this.ball, this.context);
      this.rightDetector = new PongGame.CollisionDetector(this.playerRight, this.ball, this.context);
      //Define quantos pontos para ganhar
      this.maxPoints = defines.MaxPoints;
      //Define o Nome dos Jogadores
      this.playerLeftName = defines.name_left;
      this.playerRightName = defines.name_right;
      // Seta como Null o game interval (faz parte da mecanica do loop principal)
      this.gameInterval = null;
      this.isFinish = false;
      this.isPaused = false;
      //Seta como null o ganhador
      this.winner = null;

      // Adiciona eventos de visibilidade e mudanças de rota
      document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
      window.addEventListener('popstate', this.handleRouteChange.bind(this));
      window.history.pushState = (f => function pushState(){
          var ret = f.apply(this, arguments);
          window.dispatchEvent(new Event('pushstate'));
          window.dispatchEvent(new Event('locationchange'));
          return ret;
      })(window.history.pushState);

      window.history.replaceState = (f => function replaceState(){
          var ret = f.apply(this, arguments);
          window.dispatchEvent(new Event('replacestate'));
          window.dispatchEvent(new Event('locationchange'));
          return ret;
      })(window.history.replaceState);

      window.addEventListener('popstate', ()=>{ window.dispatchEvent(new Event('locationchange')) });
      window.addEventListener('locationchange', this.handleRouteChange.bind(this));

      console.log('Eventos visibilitychange e locationchange configurados');
    }

    Game.prototype.handleVisibilityChange = function () {
      console.log('Evento visibilitychange disparado');
      if (document.hidden) {
        console.log('Saiu da pag do jogo');
        clearInterval(this.gameInterval);
        this.gameInterval = null;
        this.isPaused = true;
        clearInterval(this.gameInterval); // Pausar o jogo quando a página for escondida
      } else {
        console.log('Retornou para a pag do jogo');
        if (!this.gameInterval && !this.isFinish) {
          this.isPaused = false;
          this.play(); // Retomar o jogo se não estiver finalizado
        }
      }
    }

    Game.prototype.handleRouteChange = function () {
      console.log('Evento de mudança de rota disparado');
      if (window.location.pathname !== '/caminho-do-jogo') {
        // Saiu da página do jogo
        console.log('Saiu da página do jogo - Roteamento SPA');
        if (this.gameInterval) {
          clearInterval(this.gameInterval);
          this.gameInterval = null;
          this.isFinish = true;
        }
      }
    }
    
    Game.prototype.renderBackground = function () {
      this.context.fillStyle = 'white';
      if (!this.isFinish && this.canvas) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillRect(this.canvas.width/2, 0, 2, this.canvas.height);
      }
    }

    Game.prototype.render = function () {
      if (this.isFinish || this.isPaused) return;
      this.renderBackground();
      this.groud.render();
      this.ball.move();
      this.ball.render();
      this.ball.increaseBallSpeed();
      this.playerLeft.render();
      this.playerRight.render();
      this.playerLeft.checkPaddlePosition();
      this.playerRight.checkPaddlePosition();
      this.leftDetector.checkCollision();
      this.rightDetector.checkCollision();
      this.leftDetector.score();
      this.rightDetector.score();
      this.renderScores();

      if (this.isFinish || this.isPaused) return;
      if (this.playerLeft.points >= this.maxPoints) {
        this.showWinnerMessage(this.playerLeftName);
        this.winner = this.playerLeftName;
        clearInterval(this.gameInterval);
        this.isFinish = true;
        return this.winner;
      } else if (this.playerRight.points >= this.maxPoints) {
        this.showWinnerMessage(this.playerRightName);
        this.winner = this.playerRightName;
        clearInterval(this.gameInterval);
        this.isFinish = true;
        return this.winner;
      }
    }

    Game.prototype.renderScores = function () {
      this.context.fillStyle = 'white';
      this.context.font = '30px Tahoma';
      this.context.fillText(this.playerLeft.points, this.canvas.width/4 *2 - 40, 40);
      this.context.fillText(this.playerRight.points, this.canvas.width/4 *2 + 25, 40);
    }
  
    // Função para exibir a mensagem de vitória
    Game.prototype.showWinnerMessage = function (winner) {
      alert(winner + ' venceu o jogo com ' + this.maxPoints + ' pontos');
    }

    Game.prototype.play = function () {  
      if (!this.gameInterval) {
        this.gameInterval = setInterval(this.render.bind(this), 7);
      }
    }

    Game.prototype.placar = function () {
      if (this.gameFinish) {
        return[this.playerLeft.points, this.playerRight.points];
      }
      else {
        return null;
      }
    }

    Game.prototype.gameFinish = function () {
      return this.isFinish;
    }
  
    // Função para obter o vencedor
    Game.prototype.getWinner = function () {
      if (this.isFinish) {
        return this.winner;
      }
      else {
        return 'none';
      }
    }
  })();