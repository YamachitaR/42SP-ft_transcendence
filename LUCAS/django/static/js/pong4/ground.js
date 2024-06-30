(function () {
  'use strict';
  
	if (typeof window.PongGameFour === "undefined") {
    window.PongGameFour = {};
  }

	var Ground = window.PongGameFour.Ground = function(context, height, width, ground_color, ground_url) {
    this.context = context;
    this.ground_color = ground_color;
    this.ground_url = ground_url;
    if (ground_url !== 'none'){
      this.ground_image = new Image();
      this.ground_image.src = this.ground_url;
    }
    else {
      this.ground_image = null;
    }
    this.size = [height, width];
  };

  
  Ground.prototype.render = function () {
    if ((this.ground_url !== 'none') && this.ground_image.complete && (this.ground_image.naturalWidth > 0)) {
      this.context.drawImage(this.ground_image, 0, 0, this.size[0], this.size[1]);
    } else {
      this.context.fillStyle = this.ground_color;
      this.context.fillRect(0, 0, this.size[0], this.size[1]);
    }
  }

  Ground.prototype.cleanup = function() {
    this.context = null;
    this.ground_color = null;
    this.ground_url = null;
    if (this.ground_image) {
      this.ground_image = null;
    }
    this.size = null;
    console.log('Recursos de Ground limpos');
  };
})();