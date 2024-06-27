(function () {
  'use strict';

  if (typeof window.PongGame === "undefined") {
    window.PongGame = {};
  }
    var Game = PongGame.Game = function (canvas, width, height, points, ball_color, ground_color, l_color, r_color, ball_url, ground_url) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      //Define o tamanho da tela do game
      this.canvas.width = width;
      this.canvas.height = height;
      //Define a bolinha e a quadra
      this.ball = new PongGame.Ball(this.context, ball_color, ball_url);
      this.groud = new PongGame.Ground(this.context, width, height, ground_color, ground_url);
      //cria os players
      this.playerLeft = new PongGame.Player(this.context, "left", l_color);
      this.playerRight = new PongGame.Player(this.context, "right", r_color);
      //Cria a detecção de colisão
      this.leftDetector = new PongGame.CollisionDetector(this.playerLeft, this.ball, this.context);
      this.rightDetector = new PongGame.CollisionDetector(this.playerRight, this.ball, this.context);

      this.points = points;
      this.maxVictories = this.points;
    }
    
    Game.prototype.renderBackground = function () {
      this.context.fillStyle = 'white';
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      this.context.fillRect(canvas.width/2, 0, 2, canvas.height);
    }

    Game.prototype.render = function () {
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

      if (this.playerLeft.points >= this.maxVictories) {
        this.showWinnerMessage('Jogador Esquerdo');
        clearInterval(this.gameInterval);
      } else if (this.playerRight.points >= this.maxVictories) {
        this.showWinnerMessage('Jogador Direito');
        clearInterval(this.gameInterval);
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
      alert(winner + ' venceu o jogo com 3 vitórias!');
    }

    Game.prototype.play = function () {  
        setInterval(this.render.bind(this), 7);
    }
  })();