import createDefines from "../pong/defines.js";
import startGameClassic from "../views/startGameClassic.js";
import { navigateTo } from "../main.js";

export async function gameClassicDom() {
    
    // Seleciona o elemento com o ID 'startClassic'
    const startClassicButton = document.getElementById('startClassic');

    // Verifica se o elemento existe
    if (startClassicButton) {
        // Adiciona um evento de clique ao botão
        startClassicButton.addEventListener('click', async (event) => {
            // Chama a função navigateTo com a URL desejada
                            // Pega os valores dos inputs
            var player1Name = document.getElementById('player1').value;
            var player2Name = document.getElementById('player2').value;
                
            var content = startGameClassic();
            
            document.getElementById('content').innerHTML = content;
            document.getElementById('p1').innerHTML = player1Name; 
            document.getElementById('p2').innerHTML = player2Name; 

            console.log(player1Name);
            //navigateTo('/game-classic/', {player1Name, player2Name });
                
            var defines = createDefines();
            defines.name_left = player1Name;
            defines.name_right = player2Name;
            var canvas = document.getElementById('canvas');
            var game = new PongGame.Game(canvas, defines);
            game.play();
            var finishGame = false;
            while (finishGame === false) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                finishGame = game.gameFinish();
            }
            //var winner = game.getWinner();
            navigateTo('/', {});
        });
    }
}