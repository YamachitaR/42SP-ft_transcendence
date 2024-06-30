//{% load static %}
import  { navigateTo }  from '../main.js';

export function initPlayGame() {
    // Adiciona event listeners para os botões
    document.getElementById('gameClassic').addEventListener('click', () => handleButtonClick('gameClassic'));
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
            case 'game4players':
                content = 'You clicked Option 3!';
                document.getElementById('content').innerHTML = content;
                break;
            case 'gameTorneio':
				navigateTo('/tournament/', {});
                break;
			case 'vsIa':
				navigateTo('/game-vs-ia/', {});
				break;
            default:
                content = 'Unknown button!';
                document.getElementById('content').innerHTML = content;
        }
    }
}
