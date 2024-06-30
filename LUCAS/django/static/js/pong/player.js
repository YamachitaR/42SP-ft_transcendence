(function () {
  'use strict';

  if (typeof window.PongGame === "undefined") {
    window.PongGame = {};
  }
  var Player = window.PongGame.Player = function (context, side, player_color, paddle_v) {
    this.context = context;
    var paddleStartPosition = side == "left" ? [20, 215] : [780, 215];
    this.paddle = new PongGame.Paddle(this.context, paddleStartPosition, player_color);
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
    var upKey = this.side == "left" ? 'KeyW' : 'KeyO';
    var downKey = this.side == "left" ? 'KeyS' : 'KeyL';
    window.addEventListener("keydown", function (event) {
        if (event.code == upKey) {
            player.paddleDirection = -1 * player.paddle_v;
        } else if (event.code == downKey) {
            player.paddleDirection = player.paddle_v;
        }
    });
    window.addEventListener("keyup", function (event) {
        if (event.code == upKey || event.code == downKey) {
            player.paddleDirection = 0;
        }
    });
}

  Player.prototype.cleanup = function() {
    window.removeEventListener("keypress", this.keypressListener);
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