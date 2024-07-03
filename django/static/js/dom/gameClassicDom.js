import { userPreferences, getGamePreferences } from '../crud/user.js';
import startGameClassic from "../views/startGameClassic.js";
import { navigateTo } from "../main.js";
import setDefines from "../pong/defines.js";
import {apiCriarHistoricoJogo } from '../apis.js'


export async function gameClassicDom() {
    const startClassicButton = document.getElementById('startClassic');

    if (startClassicButton) {
        const handleClick = async (event) => {
            startClassicButton.removeEventListener('click', handleClick);

            let defines = setDefines(userPreferences);
            let player1Input = document.getElementById('player1');
            let player2Input = document.getElementById('player2');

            defines.name_left = player1Input.value;
            defines.name_right = player2Input.value;

            if (player1Input.parentNode) {
                player1Input.parentNode.removeChild(player1Input);
            }
            if (player2Input.parentNode) {
                player2Input.parentNode.removeChild(player2Input);
            }
            player1Input = null;
            player2Input = null;

            var content = startGameClassic();
            document.getElementById('content').innerHTML = content;
            document.getElementById('p1').innerHTML = defines.name_left; 
            document.getElementById('p2').innerHTML = defines.name_right; 

            var canvas = document.getElementById('canvas');
            var game = new PongGame.Game(canvas, defines);
            game.play();

            let finishGame = false;
            let idTimeout = null;
            while (!finishGame) {
                idTimeout = await new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                });
                finishGame = game.gameFinish();
            }
            let ganhador = game.getWinner();
            if (ganhador !== null) {
                let pontos = game.placar();
                let placar = pontos[0] + '-' + pontos[1]; 
                let nomesJogadores = defines.name_left + ' vs ' + defines.name_right;
                let resultadoPartida = defines.name_left === ganhador ? 'win' : 'loss';
                const chave = localStorage.getItem('token');
                await apiCriarHistoricoJogo('classic', nomesJogadores, placar, resultadoPartida, chave);
            }
            

            game.cleanup();
            canvas = null;
            game = null;
            defines = null;
            clearTimeout(idTimeout);

            navigateTo('/playGame/', {});
        };
        startClassicButton.addEventListener('click', handleClick);
    }
}