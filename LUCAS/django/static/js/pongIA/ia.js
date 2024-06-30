(function () {
    'use strict';

    if (typeof window.PongGameIA === "undefined") {
        window.PongGameIA = {};
    }
    var Ia = window.PongGameIA.Ia = function (player, ball, paddle_v) {
        this.ball = ball;
        this.player = player;
        this.paddle_v = paddle_v;
        this.keyUP = false;
        this.keyDown = false;
    };

    /*
    Ia.prototype.pressionarTecla = function (tecla, keyCode) {
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

    Ia.prototype.soltarTecla = function (tecla, keyCode) {
        let eventoTecla = new KeyboardEvent('keyup', {
            key: tecla,
            keyCode: keyCode,
            code: tecla,
            which: keyCode,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(eventoTecla);
    };
    */

    Ia.prototype.pressionarTecla = function (codigoTecla) {
        let eventoTecla = new KeyboardEvent('keydown', {
            code: codigoTecla,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(eventoTecla);
    };
    
    Ia.prototype.soltarTecla = function (codigoTecla) {
        let eventoTecla = new KeyboardEvent('keyup', {
            code: codigoTecla,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(eventoTecla);
    };

    Ia.prototype.updateAI = function () {
    if (this.ball.position[0] > 0) {
        if (this.ball.position[1] < this.player.paddle.position[1] + 35){
            if (this.keyDown) {
                this.soltarTecla('KeyL'); // Solta a tecla 'l'
                this.keyDown = false;
            }
            if (!this.keyUP) {
                this.pressionarTecla('KeyO'); // Pressiona a tecla 'o'
                this.keyUP = true;
            }
        }else if(this.ball.position[1] > this.player.paddle.position[1] - 35){
            if (this.keyUP) {
                this.soltarTecla('KeyO'); // Solta a tecla 'o'
                this.keyUP = false;
            }
            if (!this.keyDown) {
                this.pressionarTecla('KeyL'); // Pressiona a tecla 'l'
                this.keyDown = true;
            }
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