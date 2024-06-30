(function () {
  'use strict';

  if (typeof window.PongGame === "undefined") {
    window.PongGame = {};
  }
    var Game = PongGame.Game = function (canvas, defines) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this.canvas.width = defines.width;
      this.canvas.height = defines.height;
      this.ball = new PongGame.Ball(this.context, defines.ball_color, defines.ball_url, defines.init_v);
      this.groud = new PongGame.Ground(this.context, defines.width, defines.height, defines.ground_color, defines.ground_url);

      this.playerLeft = new PongGame.Player(this.context, "left", defines.l_color, defines.paddle_v);
      this.playerRight = new PongGame.Player(this.context, "right", defines.r_color, defines.paddle_v);
  
      this.leftDetector = new PongGame.CollisionDetector(this.playerLeft, this.ball, this.context);
      this.rightDetector = new PongGame.CollisionDetector(this.playerRight, this.ball, this.context);
    
      this.maxPoints = defines.MaxPoints;
    
      this.playerLeftName = defines.name_left;
      this.playerRightName = defines.name_right;
    
      this.gameInterval = null;
      this.jogoVivo = true;
      this.jogoRodando = true;
      this.winner = null;
    
      this.handleRouteChangeBound = this.handleRouteChange.bind(this);
      this.locationChangeHandler = () => { window.dispatchEvent(new Event('locationchange')) };

      document.addEventListener('visibilitychange', this.handleVisibilityChangeBound);
      window.addEventListener('popstate', this.handleRouteChangeBound);

      window.history.pushState = (f => {
          const pushState = function pushState() {
              const ret = f.apply(this, arguments);
              window.dispatchEvent(new Event('pushstate'));
              window.dispatchEvent(new Event('locationchange'));
              return ret;
          };
          pushState._original = f;
          return pushState;
      })(window.history.pushState);
      window.history.replaceState = (f => {
          const replaceState = function replaceState() {
              const ret = f.apply(this, arguments);
              window.dispatchEvent(new Event('replacestate'));
              window.dispatchEvent(new Event('locationchange'));
              return ret;
          };
          replaceState._original = f;
          return replaceState;
      })(window.history.replaceState);
      window.addEventListener('popstate', this.locationChangeHandler);
      window.addEventListener('locationchange', this.handleRouteChangeBound);

      console.log('Eventos visibilitychange e locationchange configurados');
    };

    Game.prototype.handleVisibilityChange = function () {
      console.log('Evento visibilitychange disparado');
      if (document.hidden) {
        console.log('Saiu da pag do jogo');
        clearInterval(this.gameInterval);
        this.gameInterval = null;
        this.jogoRodando = false;
        clearInterval(this.gameInterval);
      } else {
        console.log('Retornou para a pag do jogo');
        if (!this.gameInterval && (this.jogoVivo === true)) {
          this.jogoRodando = true;
          this.play();
        }
      }
    };

    Game.prototype.handleRouteChange = function () {
      console.log('Evento de mudança de rota disparado');
      if (window.location.pathname !== '/caminho-do-jogo') {
        console.log('Saiu da página do jogo - Roteamento SPA');
          clearInterval(this.gameInterval);
          this.gameInterval = null;
          this.jogoVivo = false;
      }
    };
    
    Game.prototype.renderBackground = function () {
      if ((this.jogoVivo !== true) || !this.canvas || (this.jogoRodando !== true)) return;
      this.context.fillStyle = 'white';
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillRect(this.canvas.width/2, 0, 2, this.canvas.height);
    };

    Game.prototype.render = function () {
      if ((this.jogoVivo !== true) || (this.jogoRodando !== true)) return;
      this.renderBackground();
      this.groud.render();
      if (this.ball) {
        this.ball.move();
        this.ball.render();
        this.ball.increaseBallSpeed();
      }
      if (this.playerLeft && this.playerRight) {
        this.playerLeft.render();
        this.playerRight.render();
        this.playerLeft.checkPaddlePosition();
        this.playerRight.checkPaddlePosition();
      }
      if (this.leftDetector && this.rightDetector) {
        this.leftDetector.checkCollision();
        this.rightDetector.checkCollision();
        this.leftDetector.score();
        this.rightDetector.score();
      }

      if ((this.jogoVivo !== true) || (this.jogoRodando !== true)) return;
      this.renderScores();

      if (this.playerLeft.points >= this.maxPoints) {
        this.jogoVivo = false;
        this.showWinnerMessage(this.playerLeftName);
        this.winner = this.playerLeftName;
        clearInterval(this.gameInterval);
        return this.winner;
      } else if (this.playerRight.points >= this.maxPoints) {
        this.jogoVivo = false;
        this.showWinnerMessage(this.playerRightName);
        this.winner = this.playerRightName;
        clearInterval(this.gameInterval);
        return this.winner;
      }
    };

    Game.prototype.renderScores = function () {
      if ((this.jogoVivo !== true) || (this.jogoRodando !== true)) return;
      this.context.fillStyle = 'white';
      this.context.font = '30px Tahoma';
      this.context.fillText(this.playerLeft.points, this.canvas.width/4 *2 - 40, 40);
      this.context.fillText(this.playerRight.points, this.canvas.width/4 *2 + 25, 40);
    };
  
    Game.prototype.showWinnerMessage = function (winner) {
      alert(winner + ' venceu o jogo com ' + this.maxPoints + ' pontos');
    };

    Game.prototype.play = function() {
      if ((this.jogoVivo !== true) || (this.jogoRodando !== true)) return;
      console.log('Game play started');
      if (!this.gameInterval) {
          this.gameInterval = setInterval(this.render.bind(this), 7);
      }
    };

    Game.prototype.placar = function () {
      if (this.jogoVivo !== true) {
        return[this.playerLeft.points, this.playerRight.points];
      }
      else {
        return null;
      }
    };

    Game.prototype.gameFinish = function() {
      const finished = !this.jogoVivo;
      return finished;
    };
  
    Game.prototype.getWinner = function() {
      if (this.jogoVivo !== true) {
          console.log('Winner is determined:', this.winner);
          return this.winner;
      } else {
          console.log('No winner yet');
          return 'none';
      }
    };
  

    Game.prototype.cleanup = function() {

      document.removeEventListener('visibilitychange', this.handleVisibilityChangeBound);
      window.removeEventListener('popstate', this.handleRouteChangeBound);

      if (window.history.pushState._original) {
          window.history.pushState = window.history.pushState._original;
          delete window.history.pushState._original;
      }
      if (window.history.replaceState._original) {
          window.history.replaceState = window.history.replaceState._original;
          delete window.history.replaceState._original;
      }

      window.removeEventListener('popstate', this.locationChangeHandler);
      window.removeEventListener('locationchange', this.handleRouteChangeBound);

      if (this.gameInterval) {
        clearInterval(this.gameInterval);
        this.gameInterval = null;
      }
    
      if (this.ball) {
        this.ball.cleanup();
        this.ball = null;
      }
      if (this.ground) {
        this.ground.cleanup();
        this.ground = null;
      }
      if (this.playerLeft) {
        this.playerLeft.cleanup();
        this.playerLeft = null;
      }
      if (this.playerRight) {
        this.playerRight.cleanup();
        this.playerRight = null;
      }
      if (this.leftDetector) {
        this.leftDetector.cleanup();
        this.leftDetector = null;
      }
      if (this.rightDetector) {
        this.rightDetector.cleanup();
        this.rightDetector = null;
      }

      this.canvas = null;
      this.context = null;
      this.maxPoints = null;
      this.playerLeftName = null;
      this.playerRightName = null;
      this.jogoVivo = false;
      this.jogoRodando = false;
      this.winner = null;

      console.log('Jogo limpo e recursos liberados');
    };

  })();