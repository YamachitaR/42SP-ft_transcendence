//{% load static %}
import gameClassicViews from "../views/gameClassicViews.js";

export function initPlayGame() {
    // Adiciona event listeners para os botões
    document.getElementById('gameClassic').addEventListener('click', () => handleButtonClick('gameClassic'));
    document.getElementById('game3d').addEventListener('click', () => handleButtonClick('game3d'));
    document.getElementById('game4players').addEventListener('click', () => handleButtonClick('game4players'));
    document.getElementById('gameTorneio').addEventListener('click', () => handleButtonClick('gameTorneio'));

    // Função para lidar com cliques nos botões
    function handleButtonClick(buttonId) {
        let content = '';
        switch (buttonId) {
            case 'gameClassic':
                content = gameClassicViews();
                document.getElementById('content').innerHTML = content;
                
                
                var canvas = document.getElementById('canvas');
                //var game = new PongGame.Game(canvas, 800, 400, 'red', 'green', 'blue', 'gray', 'ball.png', 'quadra_basquete.jpg');
                var game = new PongGame.Game(canvas, 800, 400, 'red', 'green', 'blue', 'gray', "{% static 'js/pong/ball.png' %}", "{% static 'js/pong/quadra_basquete.jpg' %}");
                game.play();

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
                content = 'You clicked Option 4!';
                document.getElementById('content').innerHTML = content;
                break;
            default:
                content = 'Unknown button!';
                document.getElementById('content').innerHTML = content;
        }
        

    }
}
