(function () {
  'use strict';
  
	if (typeof window.PongGame === "undefined") {
    window.PongGame = {};
  }

	var Ground = window.PongGame.Ground = function(context, height, width, ground_color, ground_url) {
    this.context = context;
    this.ground_color = ground_color;
    this.ground_url = ground_url;
    this.ground_image = new Image();
    this.size = [height, width];
    this.ground_image.src = this.ground_url;
  };

  
  Ground.prototype.render = function () {
    if (this.ground_image.complete && this.ground_image.naturalWidth > 0) {
      this.context.drawImage(this.ground_image, 0, 0, this.size[0], this.size[1]);
    } else {
      this.context.fillStyle = this.ground_color;
      this.context.fillRect(0, 0, this.size[0], this.size[1]);
    }
  }
    
})();