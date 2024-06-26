(function () {
  'use strict';
  if (typeof window.PongGame === "undefined") {
    window.PongGame = {};
  }

  var CollisionDetector = window.PongGame.CollisionDetector = function (player, ball, context) {
    this.player = player;
    this.ball = ball;
    this.context = context;
    this.hits = 0;
  }

  CollisionDetector.prototype.hitLeft = function() {
    return (this.ball.moreLeft(this.player.paddle.position[0], this.player.paddle.position[0] + this.player.paddle.width) && 
            this.ball.betweenY(this.player.paddle.position[1], this.player.paddle.position[1] + this.player.paddle.height));
  }

  CollisionDetector.prototype.hitRight = function() {
    return (this.ball.moreRight(this.player.paddle.position[0], this.player.paddle.position[0] + this.player.paddle.width) &&
            this.ball.betweenY(this.player.paddle.position[1], this.player.paddle.position[1] + this.player.paddle.height));
  }

  CollisionDetector.prototype.checkCollision = function() {
    if (this.player.side == "left" && this.hitLeft()) {
      this.ball.changeBallDirection()
      this.ball.hits += 1;
      this.ball.newHit += 1;
    } else if (this.player.side == "right" && this.hitRight()) {
      this.ball.changeBallDirection()
      this.ball.hits += 1;
      this.ball.newHit += 1;
    }
  };

  CollisionDetector.prototype.score = function () {
    if (this.player.side == "right" && this.ball.isLeft()) {
        this.player.points += 1;
        this.ball.resetIncrement();
        this.ball.changeBallDirection();
        this.ball.position[0] = this.context.canvas.width / 2;
        this.ball.position[1] = this.context.canvas.height / 2;
        
    } else if (this.player.side == "left" && this.ball.isRight()) {
              this.player.points +=1;
              this.ball.resetIncrement();
              //this.ball.changeBallDirection();
              this.ball.position[0] = this.context.canvas.width / 2;
              this.ball.position[1] = this.context.canvas.height / 2;
    }
  };

  CollisionDetector.prototype.cleanup = function() {
    // Removendo referências a objetos
    this.player = null;
    this.ball = null;
    this.context = null;
    this.hits = null;
    console.log('Recursos de CollisionDetector limpos');
  };
})();