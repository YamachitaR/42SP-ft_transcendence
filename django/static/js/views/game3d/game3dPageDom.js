import startGame3d from './game3dPlayViews.js';
import  { navigateTo }  from '../../main.js';
import game3dVictory from './game3dVictoryViews.js'

export function clickGame3dPage() {

    document.getElementById('startGame').addEventListener('click', () => handleButtonClick());
    //document.getElementById('returnGameSelect').addEventListener('click', () => navigateTo('/playGame/', {}));

    function handleButtonClick(buttonId) {
        content = 'none';
        content = startGame3d();
        document.getElementById('content').innerHTML = content;

        // chama o jogo e entrega o nome do usuario, quando acabar a partida o jogo retorna o nome do ganhador
        //      nome_do_ganhador = pong(jogador1)

        // chama a pagina de vitoria com o nome de quem ganhou
        //      content = game3dVictory(nome_do_ganhador)
        //      document.getElementById('content').innerHTML = content;
    }
}
