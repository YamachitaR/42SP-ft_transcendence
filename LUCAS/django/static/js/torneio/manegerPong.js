import Tournament from './tournament.js';

// Lista de jogadores
const players = ['Jogador1', 'Jogador2', 'Jogador3', 'Jogador4', 'Jogador5', 'Jogador6', 'Jogador7', 'Jogador8'];

// Inicializar o torneio
const tournament = new Tournament(players);
tournament.start();

// Função para iniciar uma partida específica
function startSpecificMatch(matchIndex) {
    tournament.startMatch(matchIndex);
}

// Exemplo de uso no console
// Chame esta função manualmente no console do navegador para iniciar uma partida específica
window.startSpecificMatch = startSpecificMatch;

// Para iniciar a primeira partida, digite no console do navegador:
// startSpecificMatch(0)
