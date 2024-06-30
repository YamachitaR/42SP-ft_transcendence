
// No template
/**
		<script   src="{% static 'js/pongIA/pong.js' %}"></script>
        <script   src="{% static 'js/pongIA/collision_detector.js' %}"></script>
        <script   src="{% static 'js/pongIA/paddle.js' %}"></script>
		<script   src="{% static 'js/pongIA/ground.js' %}"></script>
        <script   src="{% static 'js/pongIA/player.js' %}"></script>
        <script   src="{% static 'js/pongIA/ball.js' %}"></script>
		<script   src="{% static 'js/pongIA/ia.js' %}"></script>


}
    
 */


(function () {

    'use strict';

    if (typeof window.PongGameIA === "undefined") {
        window.PongGameIA = {};
    }

    var Ia = window.PongGameIA.Ia = function (player, ball) {
        this.ball = ball;
        this.player = player;
    };

        
 Ia.prototype.simularTecla = function (tecla, keyCode) {
        let eventoTecla = new KeyboardEvent('keydown', {
            key: tecla,
            keyCode: keyCode,
            code: tecla,
            which: keyCode,
            bubbles: true,
            cancelable: true
        });
      document.dispatchEvent(eventoTecla);
     
    };
    




    Ia.prototype.updateAI = function () {
        
        

    if( this.ball.position[0] > 400){
        var aiSpeed = 1;
       if (this.ball.position[1] < this.player.paddle.position[1] +3){
            this.player.paddle.position[1] -= aiSpeed;
            //this.simularTecla('l', 108);
       }else if(this.ball.position[1] > this.player.paddle.position[1] +3){
            this.player.paddle.position[1] += aiSpeed;
            // this.simularTecla('o', 111);

       }
    }

    };

})();