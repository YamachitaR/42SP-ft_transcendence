//importa o redirecionamento de rotas
import  { navigateTo }  from '../main.js';
// Para puxar a preferencia do usuario
import  { getGamePreferencesData, getGamePreferences, userPreferences } from '../crud/user.js';
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

// Inscrição do torneio
//      - coleta a quantidade de jogadores
//      - coleta os nomes

//Calculo de quantas rodadas serão preciso

// 
// [3][2][4][1][5]

function handleStartTournament() {
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

    // Converte o Set para um array
    const playersArray = Array.from(players);

    // Armazena a lista de jogadores em localStorage
    localStorage.setItem('players', JSON.stringify(playersArray));

    // Aqui você pode redirecionar para a próxima etapa ou iniciar o torneio
    alert('Jogadores registrados com sucesso!');
    let winner = criarTorneio(playersArray , playerCount);
    alert('Fim do torneio, Parabens ao jogador: ' + winner);
}

function sorteioVitoriaDireta(x) {
    // Cria um vetor com números de 1 a X
    var index = 0;
    
    let vetor = [];
    for (let i = 0; i < x; i++) {
        vetor.push(i);
    }

    // Embaralha o vetor usando o algoritmo de Fisher-Yates
    for (let i = vetor.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
    }
    let i = 0;
    while (i < x)
    {
        if (vetor[i] === 1) {
            return i;
        }
        i++;
    }
    return 0;
}

function calculaQtRodadas(x) {
    return Math.ceil(Math.log2(x));
}

function criarTorneio(nomesJogadores, numeroJogadores) {

    var numeroDeRodadas = calculaQtRodadas(numeroJogadores);
    var jogadoresVivos = nomesJogadores;
    var qtCompetidores = numeroJogadores;
    var i = 0;

    while (i < numeroDeRodadas) {
        jogadoresVivos = criarRodadas(jogadoresVivos, qtCompetidores);
        qtCompetidores = Math.ceil(qtCompetidores / 2);
        i++;
    }
    return jogadoresVivos;
}

async function criarRodadas(jogadoresVivos, qtCompetidores) {

    //calcular quantas vagas tem para a proxima rodada
    //ou seja, quantos ganhadores possiveis
    var qtVagas = Math.ceil(qtCompetidores / 2);
    //Calcula quantos jogos a rodada vai ter 
    var qtJogos = Math.floor(qtCompetidores / 2);

    //Cria a lista com a qt vagas para colocar os ganhadores da rodada
    const jogadoresVencedores = new Array(qtVagas).fill(null); // inicializa com null
    
    if (qtCompetidores % 2 === 1) {
        let sorteio = sorteioVitoriaDireta(qtCompetidores);
        jogadoresVencedores[0] = jogadoresVivos[sorteio];
        jogadoresVivos[sorteio] = ''; 
    }

    let indexPartidas = 0;
    let indexCompetidores = 0;

    let vencedorTemp = '';
    let jogador1 = '';
    let jogador2 = '';

    while (indexPartidas < qtJogos)
    {
        //define o jogador 1
        if (jogadoresVivos[indexCompetidores] === '') {
            indexCompetidores++;
        }
        jogador1 = jogadoresVivos[indexCompetidores];
        indexCompetidores++;

        //define o jogador 2
        if (jogadoresVivos[indexCompetidores] === '') {
            indexCompetidores++;
        }
        jogador2 = jogadoresVivos[indexCompetidores];
        indexCompetidores++;

        //inicia a partida e recebe o jogador que ganhou
        alert('Inicio da proxima partida, ' + jogador1 + ' vs ' + jogador2);

        vencedorTemp = await chamarJogo(jogador1, jogador2);

        //inclue o vencedor na lista dos que vão para o proximo round
        if (qtCompetidores % 2 === 1) {
            jogadoresVencedores[indexPartidas + 1] = vencedorTemp;
        }
        else {
            jogadoresVencedores[indexPartidas] = vencedorTemp;
        }
            
        //itera para para a proxima partida
        indexPartidas++;
    }

    return jogadoresVencedores;
}

async function chamarJogo(jogador1, jogador2) {
    debugger;
    const data = userPreferences;
    var defines = setDefines(data);
    var content = startGameClassic();
    
    defines.name_left = jogador1;
    defines.name_right = jogador2;

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
    let winner = game.getWinner();
    return winner;
}

export { initTournamentSetup };
