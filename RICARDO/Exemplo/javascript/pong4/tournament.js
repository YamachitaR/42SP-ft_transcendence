// tournament.js

let participants = [];

// Função para adicionar um participante à lista
function addParticipant(name) {
    if (name) {
        participants.push(name);
        displayParticipants();
    }
}

// Função para remover um participante da lista
function removeParticipant(index) {
    participants.splice(index, 1);
    displayParticipants();
}

// Função para exibir a lista de participantes
function displayParticipants() {
    const participantList = document.getElementById('participant-list');
    participantList.innerHTML = '';
    participants.forEach((participant, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = participant;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeParticipant(index);
        listItem.appendChild(removeButton);
        participantList.appendChild(listItem);
    });
}

// Função para embaralhar os participantes
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para gerar os jogos do torneio
function generateMatches(participants) {
    let matches = [];
    for (let i = 0; i < participants.length; i += 2) {
        matches.push([participants[i], participants[i + 1]]);
    }
    return matches;
}

// Função para exibir os jogos
function displayMatches(matches, round) {
    const tournamentDiv = document.getElementById('tournament');
    const roundDiv = document.createElement('div');
    roundDiv.classList.add('round');
    roundDiv.innerHTML = `<h2>Round ${round}</h2>`;
    matches.forEach(match => {
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');
        matchDiv.innerHTML = `<span>${match[0]}</span> <span>vs</span> <span>${match[1]}</span>`;
        roundDiv.appendChild(matchDiv);
    });
    tournamentDiv.appendChild(roundDiv);
}

// Função principal para iniciar o torneio
function startTournament(participants) {
    if (participants.length < 2) {
        alert('Adicione pelo menos 2 participantes para iniciar o torneio.');
        return;
    }
    shuffle(participants);
    let currentParticipants = participants;
    let round = 1;
    document.getElementById('tournament').innerHTML = ''; // Limpar torneio anterior

    while (currentParticipants.length > 1) {
        const matches = generateMatches(currentParticipants);
        displayMatches(matches, round);

        // Simular vencedores de cada jogo (vencedores são escolhidos aleatoriamente)
        currentParticipants = matches.map(match => match[Math.floor(Math.random() * match.length)]);
        round++;
    }

    // Exibir o vencedor final
    const tournamentDiv = document.getElementById('tournament');
    const winnerDiv = document.createElement('div');
    winnerDiv.classList.add('round');
    winnerDiv.innerHTML = `<h2>Vencedor: ${currentParticipants[0]}</h2>`;
    tournamentDiv.appendChild(winnerDiv);
}

// Adicionar eventos aos botões
document.getElementById('add-participant').addEventListener('click', () => {
    const name = document.getElementById('participant-name').value;
    addParticipant(name);
    document.getElementById('participant-name').value = ''; // Limpar o campo de entrada
});

document.getElementById('start-tournament').addEventListener('click', () => {
    startTournament(participants);
});
