import Tournament from './tournament.js';

// Variável global para armazenar o torneio
let tournament = null;
let currentMatchIndex = 0;

function initnextviews() {
    const players = JSON.parse(localStorage.getItem('players'));
    if (!players || players.length === 0) {
        alert('Jogadores não encontrados. Por favor, volte e insira novamente.');
        return;
    }

    // Inicializa o torneio
    tournament = new Tournament(players);
    tournament.start();

    // Exibe a lista de partidas
    displayMatchList();

    document.getElementById('nextMatch').addEventListener('click', handleNextMatch);
}

function displayMatchList() {
    const matchListContainer = document.getElementById('matchListContainer');
    matchListContainer.innerHTML = '';

    tournament.matches.forEach((match, index) => {
        const matchElement = document.createElement('div');
        matchElement.className = 'mb-3 text-center bg-dashboard-2 p-3 rounded';
        matchElement.innerHTML = `Partida ${index + 1}: ${match[0]} vs ${match[1]}`;
        matchListContainer.appendChild(matchElement);
    });
}

function handleNextMatch() {
    if (currentMatchIndex < tournament.matches.length) {
        const match = tournament.matches[currentMatchIndex];
        alert(`Iniciando partida: ${match[0]} vs ${match[1]}`);
        // Aqui você pode adicionar a lógica para iniciar a partida real
        currentMatchIndex++;
    } else {
        alert('Todas as partidas foram concluídas.');
    }
}

export { initnextviews };
