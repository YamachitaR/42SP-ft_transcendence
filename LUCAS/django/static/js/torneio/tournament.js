class Tournament {
    constructor(players) {
        this.players = players; // Lista de jogadores
        this.round = 1;
        this.matches = [];
        this.winners = [];
    }

    // Embaralhar os jogadores para as partidas iniciais
    shufflePlayers() {
        for (let i = this.players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
        }
    }

    // Criar as partidas para a rodada atual
    createMatches() {
        this.matches = [];
        for (let i = 0; i < this.players.length; i += 2) {
            if (i + 1 < this.players.length) {
                this.matches.push([this.players[i], this.players[i + 1]]);
            } else {
                // Jogador sem adversário avança automaticamente
                this.winners.push(this.players[i]);
            }
        }
    }

    // Exibir as partidas da rodada atual
    displayMatches() {
        console.log(`Rodada ${this.round}`);
        this.matches.forEach((match, index) => {
            console.log(`Partida ${index + 1}: ${match[0]} vs ${match[1]}`);
        });
    }

    // Registrar o vencedor de uma partida
    registerWinner(matchIndex, winner) {
        const match = this.matches[matchIndex];
        if (match && match.includes(winner)) {
            this.winners.push(winner);
        } else {
            console.error('Jogador inválido para esta partida');
        }
    }

    // Avançar para a próxima rodada
    nextRound() {
        if (this.winners.length === 1) {
            console.log(`O vencedor do torneio é ${this.winners[0]}!`);
            return;
        }

        this.players = [...this.winners];
        this.winners = [];
        this.round++;
        this.createMatches();
        this.displayMatches();
    }

    // Iniciar o torneio
    start() {
        this.shufflePlayers();
        this.createMatches();
        this.displayMatches();
    }

    // Iniciar uma partida
    startMatch(matchIndex) {
        const match = this.matches[matchIndex];
        if (!match) {
            console.error(`Partida ${matchIndex + 1} não encontrada.`);
            return;
        }

        console.log(`Iniciando partida: ${match[0]} vs ${match[1]}`);
        // Aqui você pode adicionar a lógica para iniciar o jogo real de Pong
        // Atualmente, apenas um log de simulação
        // Substitua isso pela lógica do jogo real quando implementado

        // Simulação de uma partida (substitua isso com a lógica real do jogo)
        setTimeout(() => {
            const winner = Math.random() > 0.5 ? match[0] : match[1];
            console.log(`Vencedor: ${winner}`);
            this.registerWinner(matchIndex, winner);
            this.checkAndProceed();
        }, 3000); // Simula uma partida de 3 segundos
    }

    // Verifica se todas as partidas da rodada foram concluídas e avança para a próxima rodada
    checkAndProceed() {
        if (this.winners.length === this.matches.length) {
            this.nextRound();
        }
    }
}

export default Tournament;
