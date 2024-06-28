import { userPreferences } from '../crud/user.js';
import startGameClassic from "../views/startGameClassic.js";
import { navigateTo } from "../main.js";
import setDefines from "../pong/defines.js";


export async function gameClassicDom() {
    
    // Seleciona o elemento com o ID 'startClassic'
    const startClassicButton = document.getElementById('startClassic');

    // Verifica se o elemento existe
    if (startClassicButton) {
        // Adiciona um evento de clique ao botão
        startClassicButton.addEventListener('click', async (event) => {
            // Chama a função navigateTo com a URL desejada
                            // Pega os valores dos inputs
            var defines = setDefines(userPreferences);
            
            defines.name_left = document.getElementById('player1').value;
            defines.name_right = document.getElementById('player2').value;
                
            var content = startGameClassic();
            alert('gm-p1: ' + userPreferences.preference1);
            alert('gm-p2: ' + userPreferences.preference2);
            alert('gm-p3: ' + userPreferences.preference3);
            alert('gm-p4: ' + userPreferences.preference4);
            alert('gm-p5: ' + userPreferences.preference5);
            
            document.getElementById('content').innerHTML = content;
            document.getElementById('p1').innerHTML = defines.name_left; 
            document.getElementById('p2').innerHTML = defines.name_right; 

            var canvas = document.getElementById('canvas');
            var game = new PongGame.Game(canvas, defines);
            game.play();

            var finishGame = false;
            while (finishGame === false) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                finishGame = game.gameFinish();
            }
            navigateTo('/', {});
        });
    }
}