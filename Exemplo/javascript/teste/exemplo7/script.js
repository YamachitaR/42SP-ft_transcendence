document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    function createHomePage() {
        app.innerHTML = `
            <h1>Bem-vindo ao Gerador de Torneio</h1>
            <button id="startTournament">Iniciar Torneio</button>
        `;

        document.getElementById('startTournament').addEventListener('click', createTournamentPage);
    }

    function createTournamentPage() {
        app.innerHTML = `
            <h1>Gerar Torneio</h1>
            <input type="number" id="numPlayers" placeholder="Número de Participantes" min="1">
            <button id="enterPlayers">Inserir Participantes</button>
            <button id="backHome">Voltar</button>
            <div id="playerForm"></div>
            <div id="tournamentResults"></div>
        `;

        document.getElementById('enterPlayers').addEventListener('click', createPlayerForm);
        document.getElementById('backHome').addEventListener('click', createHomePage);
    }

    function createPlayerForm() {
        const numPlayersInput = document.getElementById('numPlayers');
        const numPlayers = parseInt(numPlayersInput.value, 10);
        const playerFormContainer = document.getElementById('playerForm');

        if (isNaN(numPlayers) || numPlayers < 1) {
            playerFormContainer.innerHTML = `<p style="color: red;">Por favor, insira um número válido de participantes.</p>`;
            return;
        }

        playerFormContainer.innerHTML = `
            <h2>Insira os Nicks dos Participantes</h2>
            <form id="playerFormElements">
                ${Array.from({ length: numPlayers }, (_, i) => `
                    <input type="text" name="player${i + 1}" placeholder="Nick do Jogador ${i + 1}" required>
                `).join('')}
                <button type="submit">Gerar Torneio</button>
            </form>
        `;

        document.getElementById('playerFormElements').addEventListener('submit', generateTournament);
    }

    function generateTournament(event) {
        event.preventDefault();

        const playerForm = event.target;
        const formData = new FormData(playerForm);
        const players = Array.from(formData.values()).filter(name => name.trim() !== '');
        const resultsContainer = document.getElementById('tournamentResults');

        if (players.length < 2) {
            resultsContainer.innerHTML = `<p style="color: red;">Por favor, insira ao menos 2 jogadores.</p>`;
            return;
        }

        let rounds = [];
        let currentRound = 1;

        while (players.length > 1) {
            const roundMatches = [];
            for (let i = 0; i < players.length; i += 2) {
                if (i + 1 < players.length) {
                    roundMatches.push(`${players[i]} vs ${players[i + 1]}`);
                } else {
                    roundMatches.push(`${players[i]} avançou automaticamente`);
                }
            }
            rounds.push({ round: currentRound, matches: roundMatches });
            players.length = Math.ceil(players.length / 2);
            currentRound++;
        }

        resultsContainer.innerHTML = rounds.map(round => `
            <h2>Rodada ${round.round}</h2>
            <ul>
                ${round.matches.map(match => `<li>${match}</li>`).join('')}
            </ul>
        `).join('');
    }

    // Inicia a aplicação na página inicial
    createHomePage();
});
