export default class Tournament {
    constructor(players) {
        this.players = players;
        this.matches = [];
        this.winners = [];
    }

    start() {
        this.matches = this.generateMatches(this.players);
    }

    generateMatches(players) {
        const matches = [];
        for (let i = 0; i < players.length; i += 2) {
            if (players[i + 1]) {
                matches.push([players[i], players[i + 1]]);
            } else {
                this.winners.push(players[i]); // Jogador sem oponente avança automaticamente
            }
        }
        return matches;
    }

    registerWinner(winner) {
        this.winners.push(winner);
    }

    advanceRound() {
        if (this.winners.length === 1) {
            return this.winners[0]; // Temos um campeão
        }
        this.players = this.winners;
        this.winners = [];
        this.matches = this.generateMatches(this.players);
        return null;
    }

    isTournamentComplete() {
        return this.winners.length === 1;
    }

    getChampion() {
        return this.winners[0];
    }
}
