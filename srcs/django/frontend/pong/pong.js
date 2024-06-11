(function () {
  'use strict';

  if (typeof window.PongGame === "undefined") {
    window.PongGame = {};
  }
    var Game = PongGame.Game = function (canvas, width, height, ball_color, ground_color, l_color, r_color, ball_url, ground_url) {
      this.canvas = canvas;
      this.ball_color = ball_color;
      this.ground_color = ground_color;
      this.ground_url = ground_url;
      this.l_color = l_color;
      this.r_color = r_color;
      this.context = canvas.getContext('2d');
      this.canvas.width = width;
      this.canvas.height = height;
      this.ball = new PongGame.Ball(this.context, this.ball_color, ball_url);
      this.groud = new PongGame.Ground(this.context, width, height, this.ground_color, this.ground_url);
      this.playerLeft = new PongGame.Player(this.context, "left", this.l_color);
      this.playerRight = new PongGame.Player(this.context, "right", this.r_color);
      this.leftDetector = new PongGame.CollisionDetector(this.playerLeft, this.ball, this.context);
      this.rightDetector = new PongGame.CollisionDetector(this.playerRight, this.ball, this.context);
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
    }

    Game.prototype.renderScores = function () {
      this.context.fillStyle = 'white';
      this.context.font = '30px Tahoma';
      this.context.fillText(this.playerLeft.points, this.canvas.width/4 *2 - 40, 40);
      this.context.fillText(this.playerRight.points, this.canvas.width/4 *2 + 25, 40);
    }

    Game.prototype.play = function () {  
        setInterval(this.render.bind(this), 7);
    }
  })();