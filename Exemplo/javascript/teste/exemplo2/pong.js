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
            this.paddleHeight = 100;
            this.paddleSpeed = 5;

            this.player1 = { x: 0, y: (height - this.paddleHeight) / 2, score: 0, wins: 0 };
            this.player2 = { x: width - this.paddleWidth, y: (height - this.paddleHeight) / 2, score: 0, wins: 0 };

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
            if (this.keys['w'] && this.player1.y > 0) this.player1.y -= this.paddleSpeed;
            if (this.keys['s'] && this.player1.y < this.canvas.height - this.paddleHeight) this.player1.y += this.paddleSpeed;
            if (this.keys['ArrowUp'] && this.player2.y > 0) this.player2.y -= this.paddleSpeed;
            if (this.keys['ArrowDown'] && this.player2.y < this.canvas.height - this.paddleHeight) this.player2.y += this.paddleSpeed;

            // Atualiza posição da bola
            this.ball.x += this.ball.speedX;
            this.ball.y += this.ball.speedY;

            // Verifica colisões com paredes
            if (this.ball.y + this.ball.radius > this.canvas.height || this.ball.y - this.ball.radius < 0) {
                this.ball.speedY = -this.ball.speedY;
            }

            // Verifica colisões com raquetes
            if (this.ball.x - this.ball.radius < this.player1.x + this.paddleWidth &&
                this.ball.y > this.player1.y && this.ball.y < this.player1.y + this.paddleHeight) {
                this.ball.speedX = -this.ball.speedX;
            }
            if (this.ball.x + this.ball.radius > this.player2.x &&
                this.ball.y > this.player2.y && this.ball.y < this.player2.y + this.paddleHeight) {
                this.ball.speedX = -this.ball.speedX;
            }

            // Verifica se a bola saiu da tela (pontuação)
            if (this.ball.x + this.ball.radius > this.canvas.width) {
                this.player1.score++;
                this.checkWin();
            }
            if (this.ball.x - this.ball.radius < 0) {
                this.player2.score++;
                this.checkWin();
            }
        }

        checkWin() {
            if (this.player1.score >= 10) {
                this.player1.wins++;
                this.resetGame();
            } else if (this.player2.score >= 10) {
                this.player2.wins++;
                this.resetGame();
            }

            if (this.player1.wins >= this.totalGames / 2 || this.player2.wins >= this.totalGames / 2) {
                this.winner = this.player1.wins > this.player2.wins ? 'Jogador 1' : 'Jogador 2';
                this.messageElement.textContent = `O vencedor é: ${this.winner}`;
            }
        }

        resetGame() {
            this.ball.x = this.canvas.width / 2;
            this.ball.y = this.canvas.height / 2;
            this.ball.speedX = -this.ball.speedX;
            this.ball.speedY = this.ballSpeed;

            this.player1.score = 0;
            this.player2.score = 0;
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
            this.ctx.fillStyle = this.player1Color;
            this.ctx.fillRect(this.player1.x, this.player1.y, this.paddleWidth, this.paddleHeight);

            this.ctx.fillStyle = this.player2Color;
            this.ctx.fillRect(this.player2.x, this.player2.y, this.paddleWidth, this.paddleHeight);

            // Desenha bola
            this.ctx.drawImage(this.ballImage, this.ball.x - this.ball.radius, this.ball.y - this.ball.radius, this.ball.radius * 2, this.ball.radius * 2);

            // Desenha placar
            this.ctx.fillStyle = "white";
            this.ctx.font = "24px Arial";
            this.ctx.fillText(`Jogador 1: ${this.player1.score} (Vitórias: ${this.player1.wins})`, this.canvas.width / 4 - 100, 50);
            this.ctx.fillText(`Jogador 2: ${this.player2.score} (Vitórias: ${this.player2.wins})`, 3 * this.canvas.width / 4 - 100, 50);
            this.ctx.fillText(`Jogo: ${this.currentGame} / ${this.totalGames}`, this.canvas.width / 2 - 50, 100);
        }
    };
}
