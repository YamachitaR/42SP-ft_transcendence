import { userPreferences, getGamePreferences } from '../crud/user.js';
import start4 from "../views/startGame4.js";
import { navigateTo } from "../main.js";
import setDefines from "../pong4/defines.js";
import {apiCriarHistoricoJogo } from '../apis.js'


export async function game4Dom() {
    const startClassicButton = document.getElementById('start4game');

    if (startClassicButton) {
        const handleClick = async (event) => {
            startClassicButton.removeEventListener('click', handleClick);

            let defines = setDefines(userPreferences);
            let player1Input = document.getElementById('player1');
            let player2Input = document.getElementById('player2');
            let player3Input = document.getElementById('player3');
            let player4Input = document.getElementById('player4');

            defines.name_left = player1Input.value;
            defines.name_right = player2Input.value;
            defines.name_left1 = player3Input.value;
            defines.name_right1 = player4Input.value;

            if (player1Input.parentNode) {
                player1Input.parentNode.removeChild(player1Input);
            }
            if (player2Input.parentNode) {
                player2Input.parentNode.removeChild(player2Input);
            }
            if (player3Input.parentNode) {
                player3Input.parentNode.removeChild(player3Input);
            }
            if (player4Input.parentNode) {
                player4Input.parentNode.removeChild(player4Input);
            }
            player1Input = null;
            player2Input = null;
            player3Input = null;
            player4Input = null;

            var content = start4();
            document.getElementById('content').innerHTML = content;
            document.getElementById('p1').innerHTML = defines.name_left; 
            document.getElementById('p2').innerHTML = defines.name_right;
            document.getElementById('p3').innerHTML = defines.name_left1; 
            document.getElementById('p4').innerHTML = defines.name_right1; 

            var canvas = document.getElementById('canvas');
            var game = new PongGameFour.Game(canvas, defines);
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
                let nomes_left = defines.name_left + ', e ' + defines.name_left1;
                let nomes_right = defines.name_right + ', e ' + defines.name_right1;
                let nomesJogadores = nomes_left + ' vs ' + nomes_right;
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