(function () {

    'use strict';

    if (typeof window.PongGame === "undefined") {
        window.PongGame = {};
    }

    var Ia = window.PongGame.Ia = function (ball, player) {
        this.ball = ball;
        this.player = player;
    };

    Ia.prototype.simularTecla = function(tecla, keyCode) {
        // Cria um evento de teclado
        let eventoTecla = new KeyboardEvent('keydown', {
            key: tecla,
            keyCode: keyCode,
            code: tecla,
            which: keyCode,
            bubbles: true,
            cancelable: true
        });
        
        // Obtém o elemento do canvas pelo id 'canvas' e despacha o evento
        let canvasElement = document.getElementById("canvas");
        if (canvasElement) {
            canvasElement.dispatchEvent(eventoTecla);
        } else {
            console.error('Elemento canvas não encontrado.');
        }
        console.log('oi');
    };

    Ia.prototype.updateAI = function () {
        // let aiSpeed = 3;

        //if (this.ball.direction[1] <86

        //) {
        
        this.simularTecla('l', 76);
        
           
        //} else if (this.ball.direction[1] > this.player.paddleStartPosition[1]) {
          //  this.simularTecla('o', 79);
        //}

    };

})();
