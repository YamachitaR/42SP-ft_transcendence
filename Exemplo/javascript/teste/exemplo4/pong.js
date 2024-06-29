class PongGame {
    static Game = class {
        constructor(canvas, width, height, ballSpeed, player1Color, player2Color, ballColor, netColor, ballImageSrc, courtImageSrc, totalGames) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.canvas.width = width;
            this.canvas.height = height;
            this.ballSpeed = ballSpeed;
            this.player1Color = player1Color;
            this.player2Color = player2Color;
            this.ballColor = ballColor;
            this.netColor = netColor;
            this.ballImage = new Image();
            this.ballImage.src = ballImageSrc;
            this.courtImage = new Image();
            this.courtImage.src = courtImageSrc;

            this.paddleWidth = 10;
            this.paddleHeight = 70;
            this.paddleSpeed = 5;

            this.players = [
                { x: 0, y: (height - this.paddleHeight) / 4, score: 0, wins: 0, color: player1Color, keys: ['w', 's'] },
                { x: 0, y: (height - this.paddleHeight) / 4 * 3, score: 0, wins: 0, color: player1Color, keys: ['a', 'd'] },
                { x: width - this.paddleWidth, y: (height - this.paddleHeight) / 4, score: 0, wins: 0, color: player2Color, keys: ['ArrowUp', 'ArrowDown'] },
                { x: width - this.paddleWidth, y: (height - this.paddleHeight) / 4 * 3, score: 0, wins: 0, color: player2Color, keys: ['ArrowLeft', 'ArrowRight'] }
            ];

            this.ball = {
                x: width / 2,
                y: height / 2,
                radius: 10,
                speedX: this.ballSpeed,
                speedY: this.ballSpeed
            };

            this.keys = {};
            document.addEventListener('keydown', (event) => this.keys[event.key] = true);
            document.addEventListener('keyup', (event) => this.keys[event.key] = false);

            this.totalGames = totalGames;
            this.currentGame = 1;
            this.winner = null;

            this.messageElement = document.getElementById('message');
        }

        play() {
            if (this.winner) {
                this.messageElement.textContent = `O vencedor é: ${this.winner}`;
                return;
            }

            this.update();
            this.draw();
            requestAnimationFrame(() => this.play());
        }

        update() {
            if (this.winner) return;

            // Atualiza posição das raquetes
            this.players.forEach((player, index) => this.updatePlayer(player, index));

            // Atualiza posição da bola
            this.ball.x += this.ball.speedX;
            this.ball.y += this.ball.speedY;

            // Verifica colisões com paredes
            if (this.ball.y + this.ball.radius > this.canvas.height || this.ball.y - this.ball.radius < 0) {
                this.ball.speedY = -this.ball.speedY;
            }

            // Verifica colisões com raquetes
            this.players.forEach(player => {
                if (this.ball.x - this.ball.radius < player.x + this.paddleWidth &&
                    this.ball.y > player.y && this.ball.y < player.y + this.paddleHeight) {
                    this.ball.speedX = -this.ball.speedX;
                }
                if (this.ball.x + this.ball.radius > player.x &&
                    this.ball.y > player.y && this.ball.y < player.y + this.paddleHeight) {
                    this.ball.speedX = -this.ball.speedX;
                }
            });

            // Verifica se a bola saiu da tela (pontuação)
            if (this.ball.x + this.ball.radius > this.canvas.width) {
                this.players[0].score++;
                this.players[1].score++;
                this.checkWin();
            }
            if (this.ball.x - this.ball.radius < 0) {
                this.players[2].score++;
                this.players[3].score++;
                this.checkWin();
            }
        }

        updatePlayer(player, index) {
            if (this.keys[player.keys[0]] && player.y > 0) player.y -= this.paddleSpeed;
            if (this.keys[player.keys[1]] && player.y < this.canvas.height - this.paddleHeight) player.y += this.paddleSpeed;
        }

        checkWin() {
            const team1Score = this.players[0].score + this.players[1].score;
            const team2Score = this.players[2].score + this.players[3].score;

            if (team1Score >= 10) {
                this.players[0].wins++;
                this.players[1].wins++;
                this.resetGame();
            } else if (team2Score >= 10) {
                this.players[2].wins++;
                this.players[3].wins++;
                this.resetGame();
            }

            if (this.players[0].wins >= this.totalGames / 2 || this.players[2].wins >= this.totalGames / 2) {
                this.winner = this.players[0].wins > this.players[2].wins ? 'Equipe 1' : 'Equipe 2';
                this.messageElement.textContent = `O vencedor é: ${this.winner}`;
            }
        }

        resetGame() {
            this.ball.x = this.canvas.width / 2;
            this.ball.y = this.canvas.height / 2;
            this.ball.speedX = -this.ball.speedX;
            this.ball.speedY = this.ballSpeed;

            this.players.forEach(player => player.score = 0);
            this.currentGame++;
        }

        draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Desenha fundo
            this.ctx.drawImage(this.courtImage, 0, 0, this.canvas.width, this.canvas.height);

            // Desenha rede
            this.ctx.fillStyle = this.netColor;
            this.ctx.fillRect(this.canvas.width / 2 - 1, 0, 2, this.canvas.height);

            // Desenha raquetes
            this.players.forEach(player => {
                this.ctx.fillStyle = player.color;
                this.ctx.fillRect(player.x, player.y, this.paddleWidth, this.paddleHeight);
            });

            // Desenha bola
            this.ctx.drawImage(this.ballImage, this.ball.x - this.ball.radius, this.ball.y - this.ball.radius, this.ball.radius * 2, this.ball.radius * 2);

            // Desenha placar
            this.ctx.fillStyle = "white";
            this.ctx.font = "24px Arial";
            this.ctx.fillText(`Equipe 1: ${this.players[0].score + this.players[1].score} (Vitórias: ${this.players[0].wins})`, this.canvas.width / 4 - 100, 50);
            this.ctx.fillText(`Equipe 2: ${this.players[2].score + this.players[3].score} (Vitórias: ${this.players[2].wins})`, 3 * this.canvas.width / 4 - 100, 50);
            this.ctx.fillText(`Jogo: ${this.currentGame} / ${this.totalGames}`, this.canvas.width / 2 - 50, 100);
        }
    };
}
