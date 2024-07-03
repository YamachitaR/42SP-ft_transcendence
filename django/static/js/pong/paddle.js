(function () {
  'use strict';

  if (typeof window.PongGame === "undefined") {
    window.PongGame = {};
  }

  var Paddle = window.PongGame.Paddle = function (context, position, player_color) {
    this.context = context;
    this.position = position;
    this.player_color = player_color;
    this.width = 10;
    this.height = 70;
  }

  Paddle.prototype.render = function () {
    this.context.beginPath();
    this.context.rect(this.position[0], this.position[1], this.width, this.height);
    this.context.fillStyle = this.player_color;
    this.context.fill();
  }

  Paddle.prototype.move = function (direction) {
    this.position[1] += direction;
    if (this.position[1] < 0) {
        this.position[1] = 0;
    } else if (this.position[1] + this.height > this.context.canvas.height) {
      this.position[1] = this.context.canvas.height - this.height;
    }
  }

  Paddle.prototype.isTop = function () {
    return (this.position[1] <= 0)
  }

  Paddle.prototype.isBottom = function () {
    return (this.position[1] + this.height >= this.context.canvas.height)
  }

  Paddle.prototype.cleanup = function() {
    this.context = null;
    this.position = null;
    this.player_color = null;
    this.width = null;
    this.height = null;
    console.log('Recursos de Paddle limpos');
  };

})();