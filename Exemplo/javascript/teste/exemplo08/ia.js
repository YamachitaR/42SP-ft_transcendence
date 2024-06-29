
        
        function simularTecla(tecla, keyCode) {
            let eventoTecla = new KeyboardEvent('keydown', {
                key: tecla,
                keyCode: keyCode,
                code: 'Key' + tecla.toUpperCase(),
                which: keyCode,
                bubbles: true,
                cancelable: true
            });
          document.getElementById('canvas').dispatchEvent(eventoTecla);
        }
        



updateAI() {
  let aiSpeed = 3; // Velocidade da IA

  if (this.ball.y < this.player2.y + this.paddleHeight / 2) {
    simularTecla('ArrowDown', 40);
  } else if (this.ball.y > this.player2.y + this.paddleHeight / 2) {
    simularTecla('ArrowUp', 40);
  }

}