import startGameVsIA from './gameIAPlayViews.js';
import  { navigateTo }  from '../../router.js';
import gameVsIaVictory from './gameIAVictoryViews.js'

export function clickGameIAPage() {

    document.getElementById('startGame').addEventListener('click', () => handleButtonClick());
    //document.getElementById('returnGameSelect').addEventListener('click', () => navigateTo('/playGame/', {}));

    function handleButtonClick(buttonId) {
        content = 'none';
        content = startGameVsIA();
        document.getElementById('content').innerHTML = content;
        
        // chama o jogo e entrega o nome do usuario, quando acabar a partida o jogo retorna o nome do ganhador
        //      nome_do_ganhador = pong(jogador1)

        // chama a pagina de vitoria com o nome de quem ganhou 
        //      content = gameVsIaVictory(nome_do_ganhador)
        //      document.getElementById('content').innerHTML = content;
    }
}