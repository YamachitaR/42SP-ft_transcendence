(function () {
    'use strict';

    if (typeof window.PongGameIA === "undefined") {
        window.PongGameIA = {};
    }
    var Ia = window.PongGameIA.Ia = function (player, ball, paddle_v) {
        this.ball = ball;
        this.player = player;
        this.paddle_v = paddle_v;
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
        if( this.ball.position[0] > 0){
            if (this.ball.position[1] < this.player.paddle.position[1] +35){
                    this.player.paddle.position[1] -= this.paddle_v;
                    //this.simularTecla('l', 108);
            }else if(this.ball.position[1] > this.player.paddle.position[1] +35){
                    this.player.paddle.position[1] += this.paddle_v;
                    // this.simularTecla('o', 111);
            }
        }
    };

    Ia.prototype.cleanup = function () {
        // Limpar referências para o player e ball
        this.player = null;
        this.ball = null;
        this.paddle_v = null;
    };
})();