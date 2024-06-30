(function () {
  'use strict';

  if (typeof window.PongGameIA === "undefined") {
    window.PongGameIA = {};
  }


  var Ball = window.PongGameIA.Ball = function(context, ball_color, ball_url, init_v) {
    this.context = context;
    this.ball_color = ball_color;
    if (ball_url !== 'none'){
      this.ball_image = new Image()
      this.ball_image.src = ball_url;
    }
    else
    {
      this.ball_image = null
    }
    this.ball_url = ball_url;
    this.position = [400, 250];
    this.radius = 15;
    this.speed = [init_v, init_v];
    this.init_v = init_v;
    this.hits = 0;
    this.newHit = 0;
  };

  Ball.prototype.isTop = function() {
    return (this.position[1] - this.radius) <= 0;
  }

  Ball.prototype.isBottom = function() {
    return (this.position[1] + this.radius) > this.context.canvas.height;
  } 

  Ball.prototype.isLeft = function() {
    return (this.position[0] + this.radius) < 0 && this.speed[0] < 0;
  }

  Ball.prototype.isRight = function() {
    return (this.position[0] + this.radius) > this.context.canvas.width && this.speed[0] > 0;
  }

  Ball.prototype.moreLeft = function(x1, x2) {
    return (this.position[0] - this.radius >= x1 && this.position[0] - this.radius <= x2);
  }

  Ball.prototype.moreRight = function(x1, x2) {
    return (this.position[0] + this.radius >= x1 && this.position[0] + this.radius <=x2);
  }

  Ball.prototype.betweenY = function(y1, y2) {
    return (this.position[1] >= y1 && this.position[1] <=y2);
  }

  Ball.prototype.move = function () {
    if (this.isTop() || this.isBottom()) {
      this.speed[1] = -this.speed[1];
    } 
    this.position[0] += this.speed[0];
    this.position[1] += this.speed[1];
  };

  Ball.prototype.changeBallDirection = function() {
    this.speed[0] = -this.speed[0];
  }

  Ball.prototype.resetIncrement = function () {
    this.speed[0] = this.init_v;
    this.speed[1] = this.init_v;
    this.hits = 0;
    this.newHit = 0;
  };

  Ball.prototype.checkHits = function () {
    console.log("ball hits: " + this.hits);
    return (this.newHit > 0)
  };

  Ball.prototype.increaseBallSpeed = function () {
    if (this.checkHits()) {
      console.log('velocidade aumentou, hit: ' + this.hits);
      this.speed[0] += (this.speed[0] < 0) ? -0.5 : 0.5;
      this.speed[1] += (this.speed[1] < 0) ? -0.5 : 0.5;
      this.newHit = 0;
    }

  };

  Ball.prototype.render = function () {
    if ((this.ball_url !== 'none') && this.ball_image.complete) {
      this.context.drawImage(this.ball_image, this.position[0] - this.radius, this.position[1] - this.radius, this.radius * 2, this.radius * 2);
    }
    else {
      this.context.beginPath();
      this.context.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI);
      this.context.fillStyle = this.ball_color;
      this.context.fill();
    }
  }

  Ball.prototype.cleanup = function() {
    // Removendo referências a objetos
    this.context = null;
    this.ball_color = null;
    if (this.ball_image) {
      this.ball_image.src = '';
      this.ball_image = null;
    }
    this.ball_url = null;
    this.position = null;
    this.speed = null;
    this.init_v = null;
    this.hits = null;
    this.newHit = null;
    console.log('Recursos de Ball limpos');
  };
})();