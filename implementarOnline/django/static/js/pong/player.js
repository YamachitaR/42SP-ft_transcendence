(function () {
  'use strict';

  if (typeof window.PongGame === "undefined") {
    window.PongGame = {};
  }

  var Player = window.PongGame.Player = function (context, side, ball) {
    this.context = context;
    var paddleStartPosition = side == "left" ? [20, 215] : [780, 215];
    this.paddle = new PongGame.Paddle(this.context, paddleStartPosition);
    this.side = side;
    this.setListeners();
    this.paddleDirection = 0;
    this.points = 0;
  }

  Player.prototype.render = function () {
    this.paddle.move(this.paddleDirection);
    this.paddle.render();
  }

  Player.prototype.checkPaddlePosition = function () {
    if (this.paddle.isTop()) {
        this.paddleDirection = 0;
    } else if (this.paddle.isBottom()) {
        this.paddleDirection = 0;
    }
  }

  Player.prototype.setListeners = function () {
    var player = this;
    var upCode = this.side == "left" ? 119 : 111;
    var downCode = this.side == "left" ? 115 : 108; 
    window.addEventListener("keypress", function (event) {
      if (event.keyCode == upCode) {
        player.paddleDirection = -1.5;
      } else if (event.keyCode == downCode) {
        player.paddleDirection = 1.5;
      }

    });
    window.addEventListener("keyup", function (event) {
      player.paddleDirection = 0;
    });
  }
})();