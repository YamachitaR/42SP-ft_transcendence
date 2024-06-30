//importa o redirecionamento de rotas
import  { navigateTo }  from '../main.js';
// Para puxar a preferencia do usuario
import  { userPreferences } from '../crud/user.js';
// defines do pong
import setDefines from "../pong/defines.js";
// View da tela onde o pong sera renderizado
import startGameClassic from "../views/startGameClassic.js";

// Função para carregar a página de configuração dos nomes dos jogadores
function initTournamentSetup() {
    const playerCount = parseInt(localStorage.getItem('playerCount'), 10);
    if (isNaN(playerCount) || playerCount <= 0) {
        alert('Quantidade de jogadores inválida. Por favor, volte e insira novamente.');
        return;
    }

    const playersInputsContainer = document.getElementById('playersInputsContainer');
    let playersInputs = '';

    for (let i = 1; i <= playerCount; i++) {
        playersInputs += `
            <div class="mb-3 text-center">
                <label for="player${i}" class="form-label" style="color: #fff;">Jogador ${i}</label>
                <input type="text" class="form-control" id="player${i}" name="player${i}" required/>
            </div>
        `;
    }

    playersInputsContainer.innerHTML = playersInputs;

    document.getElementById('startClassic').addEventListener('click', handleStartTournament);
}

async function handleStartTournament() {
    const playerCount = parseInt(localStorage.getItem('playerCount'), 10);
    const players = new Set();

    for (let i = 1; i <= playerCount; i++) {
        const playerName = document.getElementById(`player${i}`).value.trim();
        if (!playerName) {
            alert(`Por favor, insira um nome para o Jogador ${i}.`);
            return;
        }
        if (players.has(playerName)) {
            alert(`Os nomes dos jogadores devem ser únicos. O nome "${playerName}" foi usado mais de uma vez.`);
            return;
        }
        players.add(playerName);
    }

    const playersArray = Array.from(players);

    localStorage.setItem('players', JSON.stringify(playersArray));

    alert('Jogadores registrados com sucesso!');
    console.log('Iniciando Torneio');
    let winner = await criarTorneio(playersArray , playerCount);
    if (winner === null) {
        location.reload(true);
        return null;
    }
    console.log('Torneio Finalizado');
    alert('Fim do torneio, Parabens ao jogador: ' + winner);
    navigateTo('/playGame/', {});
}

function sorteioVitoriaDireta(x) {
    const vetor = Array.from({ length: x }, (_, index) => index);
    
    for (let i = vetor.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
    }

    for (let i = 0; i < x; i++) {
        if (vetor[i] === 1) {
            return i;
        }
    }

    return 0;
}

function calculaQtRodadas(x) {
    return Math.ceil(Math.log2(x));
}

async function criarTorneio(nomesJogadores, numeroJogadores) {

    var numeroDeRodadas = calculaQtRodadas(numeroJogadores);
    var jogadoresVivos = nomesJogadores;
    var qtCompetidores = numeroJogadores;
    var i = 0;
    
    while (i < numeroDeRodadas) {
        console.log('Iniciando rodada: ' + i);
        jogadoresVivos = await criarRodadas(jogadoresVivos, qtCompetidores, i);
        if (jogadoresVivos === null) {
            return null;
        }
        qtCompetidores = Math.ceil(qtCompetidores / 2);
        i++;
    }
    return jogadoresVivos;
}

function definirJogos(jogadoresVivos, qtJogos) {
    let result = [];
    let indexPartidas = 0;
    let indexCompetidores = 0;

    while (indexPartidas < qtJogos) {
        if (jogadoresVivos[indexCompetidores] === '') {
            indexCompetidores++;
        }
        result.push(jogadoresVivos[indexCompetidores]);
        indexCompetidores++;

        if (jogadoresVivos[indexCompetidores] === '') {
            indexCompetidores++;
        }
        result.push(jogadoresVivos[indexCompetidores]);
        indexCompetidores++;
        indexPartidas++;
    }
    return result;
}

function anunciarJogosRodada(qtJogos, jogosDefinidos, qtCompetidores, jogadoresVencedores) {
    let msg = '';
    for (let i = 0; i < qtJogos * 2; i += 2) {
        msg += ('\n' + jogosDefinidos[i] + ' vs ' + jogosDefinidos[i+1]);
    }
    if (qtCompetidores % 2 === 1) {
        msg += ('\n\nJogador: ' + jogadoresVencedores + ', foi sorteado para passar automaticamente para a proxima rodada');
    }
    return msg;
}

async function criarRodadas(jogadoresVivos, qtCompetidores, indexRodada) {

    var qtVagas = Math.ceil(qtCompetidores / 2);
    var qtJogos = Math.floor(qtCompetidores / 2);

    let jogadoresVencedores = new Array(qtVagas).fill(null);

    if (qtCompetidores % 2 === 1) {
        let sorteio = sorteioVitoriaDireta(qtCompetidores);
        jogadoresVencedores[0] = jogadoresVivos[sorteio];
        jogadoresVivos[sorteio] = '';
        sorteio = 0;
    }

    let jogosDefinidos = definirJogos(jogadoresVivos, qtJogos);
    let msg =  anunciarJogosRodada(qtJogos, jogosDefinidos, qtCompetidores, jogadoresVencedores[0]);
    alert ('Iniciando a rodada: ' + (indexRodada + 1) + ' com os seguintes jogos:\n' + msg);

    let indexPartidas = 0;
    let indexJogosDefinidos = 0
    let vencedorTemp = '';

    while (indexPartidas < qtJogos)
    {

        alert('Inicio da proxima partida, ' + jogosDefinidos[indexJogosDefinidos] + ' vs ' + jogosDefinidos[indexJogosDefinidos+1]);
        vencedorTemp = await chamarJogo(jogosDefinidos[indexJogosDefinidos], jogosDefinidos[indexJogosDefinidos+1]);
        if (vencedorTemp === null) {
            console.log('Torneio Cancelado.');
            jogosDefinidos = null;
            jogadoresVencedores = null;
            return null;
        }

        if (qtCompetidores % 2 === 1) {
            jogadoresVencedores[indexPartidas + 1] = vencedorTemp;
        }
        else {
            jogadoresVencedores[indexPartidas] = vencedorTemp;
        }
        indexPartidas++;
        indexJogosDefinidos += 2;
    }
    return jogadoresVencedores;
}

function myDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForGameToEnd(game) {
    while (!game.gameFinish()) {
        await myDelay(2000);
    }
    console.log('Game finished');
}

async function chamarJogo(jogador1, jogador2) {
    
    console.log(`Starting game between ${jogador1} and ${jogador2}`);

    const defines = setDefines(userPreferences); 
    const content = startGameClassic();

    defines.name_left = jogador1;
    defines.name_right = jogador2;

    document.getElementById('content').innerHTML = content;
    document.getElementById('p1').innerHTML = defines.name_left;
    document.getElementById('p2').innerHTML = defines.name_right;

    let canvas = document.getElementById('canvas');
    if (!canvas) {
        throw new Error('Canvas element not found');
    }

    let game = new PongGame.Game(canvas, defines);
    game.play();

    console.log('Game started');

    await waitForGameToEnd(game);

    const winner = game.getWinner();
    console.log('Winner:', winner);

    if (!winner || winner === 'none') {
        game.cleanup();
        return null;
    }
    game.cleanup();
    game = null;
    return winner;
}

export { initTournamentSetup };
