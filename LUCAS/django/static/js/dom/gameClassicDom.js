import startGameClassic from "../views/startGameClassic.js";

export function gameClassicDom(){

      // Seleciona o elemento com o ID 'startClassic'
      const startClassicButton = document.getElementById('startClassic');
    
      // Verifica se o elemento existe
      if (startClassicButton) {
          // Adiciona um evento de clique ao botão
          startClassicButton.addEventListener('click', () => {
    
              // Chama a função navigateTo com a URL desejada
                         // Pega os valores dos inputs
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player2').value;
             
            const content =  startGameClassic();
            
            document.getElementById('content').innerHTML = content;
            document.getElementById('p1').innerHTML = player1Name; 
            document.getElementById('p2').innerHTML = player2Name; 

            console.log(player1Name);
            //navigateTo('/game-classic/', {player1Name, player2Name });
            

    var canvas = document.getElementById('canvas');
    var game = new PongGame.Game(canvas, 800, 500, 3, 'red', 'green', 'blue', 'gray', 'static/img/ball.png', 'static/img/quadra_basquete.jpg');
    game.play();

          });
      }


}