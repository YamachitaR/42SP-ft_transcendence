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
      this.playerLeft1 = new PongGame.Player(this.context, "left1", defines.l_color, defines.paddle_v);
      this.playerRight1 = new PongGame.Player(this.context, "right1", defines.r_color, defines.paddle_v);

      this.leftDetector = new PongGame.CollisionDetector(this.playerLeft, this.ball, this.context);
      this.rightDetector = new PongGame.CollisionDetector(this.playerRight, this.ball, this.context);
      this.leftDetector1 = new PongGame.CollisionDetector(this.playerLeft1, this.ball, this.context);
      this.rightDetector1 = new PongGame.CollisionDetector(this.playerRight1, this.ball, this.context);
    

      this.maxPoints = defines.MaxPoints;
    
      this.playerLeftName = defines.name_left;
      this.playerRightName = defines.name_right;
    
      this.gameInterval = null;
      this.isFinish = false;
      this.isPaused = false;
      this.winner = null;
    
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
        clearInterval(this.gameInterval);
      } else {
        console.log('Retornou para a pag do jogo');
        if (!this.gameInterval && !this.isFinish) {
          this.isPaused = false;
          this.play();
        }
      }
    }

    Game.prototype.handleRouteChange = function () {
      console.log('Evento de mudança de rota disparado');
      if (window.location.pathname !== '/caminho-do-jogo') {
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
      this.playerLeft1.render();
      this.playerRight1.render();


      this.playerLeft.checkPaddlePosition();
      this.playerRight.checkPaddlePosition();
      this.playerLeft1.checkPaddlePosition();
      this.playerRight1.checkPaddlePosition();


      this.leftDetector.checkCollision();
      this.rightDetector.checkCollision();
      this.leftDetector1.checkCollision();
      this.rightDetector1.checkCollision();


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
  
  
    Game.prototype.getWinner = function () {
      if (this.isFinish) {
        return this.winner;
      }
      else {
        return 'none';
      }
    }

    Game.prototype.cleanup = function() {
    
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
      window.removeEventListener('popstate', this.handleRouteChange);
      window.history.pushState = null;
      window.history.replaceState = null;
      window.removeEventListener('locationchange', this.handleRouteChange);

    
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
      this.isFinish = null;
      this.isPaused = null;
      this.winner = null;

      console.log('Jogo limpo e recursos liberados');
    }

  })();