(function () {
  'use strict';

  if (typeof window.PongGameFour === "undefined") {
    window.PongGameFour = {};
  }
  var Player = window.PongGameFour.Player = function (context, side, player_color, paddle_v) {
    this.context = context;


    if( side == "left"){
      var paddleStartPosition = [20, 143];
    }else if (side == "left1"){
      var paddleStartPosition = [20, 246];
    }else if (side == "right"){
      var paddleStartPosition =  [780, 143];
    }else{
      var paddleStartPosition =  [780, 246];
    }

    this.paddle = new PongGameFour.Paddle(this.context, paddleStartPosition, player_color);
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
    if( this.side === "left"){
      var upKey = 'KeyW'; //w
      var downKey = 'KeyS';  //s
    }else if (this.side === "left1"){
      var upKey = 'KeyT'; //t
      var downKey = 'KeyG';  //g
    }else if (this.side === "right"){
      var upKey = 'KeyO'; //o
      var downKey = 'KeyL';  //l
    }else{
      var upKey = 'KeyU'; // u
      var downKey = 'KeyJ';  //j
    }
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
    window.addEventListener("keyup", function (event) {
      player.paddleDirection = 0;
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