//{% load static %}
import gameClassicViews from "../views/gameClassicViews.js";
import  { navigateTo }  from '../router.js';

export function initPlayGame() {
    // Adiciona event listeners para os botões
    document.getElementById('gameClassic').addEventListener('click', () => handleButtonClick('gameClassic'));
    document.getElementById('game3d').addEventListener('click', () => handleButtonClick('game3d'));
    document.getElementById('game4players').addEventListener('click', () => handleButtonClick('game4players'));
    document.getElementById('gameTorneio').addEventListener('click', () => handleButtonClick('gameTorneio'));
	document.getElementById('vsIa').addEventListener('click', () => handleButtonClick('vsIa'));

    // Função para lidar com cliques nos botões
    function handleButtonClick(buttonId) {
        let content = '';
        switch (buttonId) {
            case 'gameClassic':
                navigateTo('/gameClassicViews/', {});


              
                break;
            case 'game3d':
                content = 'You clicked Option 2!';
                document.getElementById('content').innerHTML = content;
                break;
            case 'game4players':
                content = 'You clicked Option 3!';
                document.getElementById('content').innerHTML = content;
                break;
            case 'gameTorneio':
				navigateTo('/tournament/', {});
                break;
			case 'vsIa':
				navigateTo('/tournament/', {});
				break;
            default:
                content = 'Unknown button!';
                document.getElementById('content').innerHTML = content;
        }


    }
}
