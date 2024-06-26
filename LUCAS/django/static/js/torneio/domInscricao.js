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
}

export { initTournamentSetup };
