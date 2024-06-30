(function () {
  'use strict';

  if (typeof window.PongGame === "undefined") {
    window.PongGame = {};
  }
  var Player = window.PongGame.Player = function (context, side, player_color, paddle_v) {
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

    if( this.side == "left"){
      var upCode = 119; //w
      var downCode = 115;  //s
    }else if (this.side == "left1"){
      var upCode = 116; //t
      var downCode = 103;  //g
    }else if (this.side == "right"){
      var upCode = 111; //o
      var downCode = 108;  //l
    }else{
      var upCode = 117; // u
      var downCode = 106;  //j
    }



    window.addEventListener("keypress", function (event) {
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