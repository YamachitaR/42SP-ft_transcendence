import { userPreferences, getGamePreferences } from '../crud/user.js';
import startGameIA from "../views/startGameIA.js";
import { navigateTo } from "../main.js";
import setDefines from "../pong/defines.js";


export async function gameIADom() {
    const startClassicButton = document.getElementById('startClassic');

    if (startClassicButton) {
        const handleClick = async (event) => {
            startClassicButton.removeEventListener('click', handleClick);

            let defines = setDefines(userPreferences);
            let player1Input = document.getElementById('player1');

            defines.name_left = player1Input.value;
            defines.name_right = 'Skynet IA';

            if (player1Input.parentNode) {
                player1Input.parentNode.removeChild(player1Input);
            }

            player1Input = null;

            var content = startGameIA();
            document.getElementById('content').innerHTML = content;
            document.getElementById('p1').innerHTML = defines.name_left; 
            document.getElementById('p2').innerHTML = defines.name_right; 

            var canvas = document.getElementById('canvas');
            var game = new PongGameIA.Game(canvas, defines);
            game.play();
            game.playIAVision();
            game.playIA();

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