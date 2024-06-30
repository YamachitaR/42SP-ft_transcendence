(function () {
  'use strict';

  if (typeof window.PongGameIA === "undefined") {
    window.PongGameIA = {};
  }
  var Player = window.PongGameIA.Player = function (context, side, player_color, paddle_v) {
    this.context = context;
    var paddleStartPosition = side == "left" ? [20, 215] : [780, 215];
    this.paddle = new PongGameIA.Paddle(this.context, paddleStartPosition, player_color);
    this.side = side;
    this.paddle_v = paddle_v;
    this.paddleDirection = 0;
    this.points = 0;
    this.setListeners();
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
    window.addEventListener("keydown", function (event) {
      if (event.keyCode == upCode) {
        player.paddleDirection = -1 * player.paddle_v;
      } else if (event.keyCode == downCode) {
        player.paddleDirection = player.paddle_v;
      }

    });
    window.addEventListener("keyup", function (event) {
      player.paddleDirection = 0;
    });
  }

  Player.prototype.cleanup = function() {
    window.removeEventListener("keydown", this.keypressListener);
    window.removeEventListener("keyup", this.keyupListener);
    this.paddle.cleanup();  // Certifique-se de que a classe Paddle também tenha um método cleanup
    this.context = null;
    this.paddle = null;
    this.side = null;
    this.paddle_v = null;
    this.paddleDirection = null;
    this.points = null;
    console.log('Recursos de Player limpos');
  };
})();