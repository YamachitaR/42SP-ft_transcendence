(function () {
  'use strict';

  if (typeof window.PongGame === "undefined") {
    window.PongGame = {};
  }


  var Ball = window.PongGame.Ball = function(context, ball_color, ball_url) {
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
    this.direction = [1, 1];
    this.hits = 0;
  };

  Ball.prototype.isTop = function() {
    return (this.position[1] - this.radius) <= 0;
  }

  Ball.prototype.isBottom = function() {
    return (this.position[1] + this.radius) > this.context.canvas.height;
  } 

  Ball.prototype.isLeft = function() {
    return (this.position[0] + this.radius) < 0 && this.direction[0] < 0;
  }

  Ball.prototype.isRight = function() {
    return (this.position[0] + this.radius) > this.context.canvas.width && this.direction[0] > 0;
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
      this.direction[1] = -this.direction[1];
    } 
    this.position[0] += this.direction[0];
    this.position[1] += this.direction[1];
  };

  Ball.prototype.changeBallDirection = function() {
    this.direction[0] = -this.direction[0];
  }

  Ball.prototype.checkHits = function () {
    console.log("ball hits: " + this.hits);
    return (this.hits % 5 === 0 && this.hits > 0)
  };

  Ball.prototype.increaseBallSpeed = function () {
    if (this.checkHits()) {
      this.direction[0] += (this.direction[0] < 0) ? -0.1 : 0.1;
      this.direction[1] += (this.direction[1] < 0) ? -0.1 : 0.1;
      this.hits = 0;
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
})();