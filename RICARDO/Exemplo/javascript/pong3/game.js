const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const score1Element = document.getElementById('score1');
const score2Element = document.getElementById('score2');
const score3Element = document.getElementById('score3');
const score4Element = document.getElementById('score4');
const winnerMessageElement = document.getElementById('winnerMessage');
const pauseButton = document.getElementById('pauseButton');

const maxScore = 10;
let gamePaused = false;

let score1 = 0;
let score2 = 0;
let score3 = 0;
let score4 = 0;

class Paddle {
    constructor(x, y, width, height, color, controlUp, controlDown, controlLeft, controlRight, isVertical) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.controlUp = controlUp;
        this.controlDown = controlDown;
        this.controlLeft = controlLeft;
        this.controlRight = controlRight;
        this.dy = 0;
        this.dx = 0;
        this.isVertical = isVertical;
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.isVertical) {
            if (this.y + this.dy > 0 && this.y + this.height + this.dy < canvas.height) {
                this.y += this.dy;
            }
        } else {
            if (this.x + this.dx > 0 && this.x + this.width + this.dx < canvas.width) {
                this.x += this.dx;
            }
        }
    }
}

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = 4;
        this.dy = 4;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update(paddles) {
        this.x += this.dx;
        this.y += this.dy;

        // Wall collision
        if (this.y - this.radius < 0) {
            score4++;
            updateScores();
            checkWinner();
            this.reset();
        } else if (this.y + this.radius > canvas.height) {
            score3++;
            updateScores();
            checkWinner();
            this.reset();
        }

        if (this.x - this.radius < 0) {
            score2++;
            updateScores();
            checkWinner();
            this.reset();
        } else if (this.x + this.radius > canvas.width) {
            score1++;
            updateScores();
            checkWinner();
            this.reset();
        }

        // Paddle collision
        paddles.forEach(paddle => {
            if (
                this.x + this.radius > paddle.x &&
                this.x - this.radius < paddle.x + paddle.width &&
                this.y + this.radius > paddle.y &&
                this.y - this.radius < paddle.y + paddle.height
            ) {
                if (paddle.isVertical) {
                    this.dx = -this.dx;
                } else {
                    this.dy = -this.dy;
                }
            }
        });
    }

    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
        this.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
    }
}

const paddles = [
    new Paddle(30, canvas.height / 2 - 50, 10, 100, 'red', 'KeyW', 'KeyS', null, null, true),
    new Paddle(canvas.width - 40, canvas.height / 2 - 50, 10, 100, 'blue', 'ArrowUp', 'ArrowDown', null, null, true),
    new Paddle(canvas.width / 2 - 50, 30, 100, 10, 'green', null, null, 'KeyA', 'KeyD', false),
    new Paddle(canvas.width / 2 - 50, canvas.height - 40, 100, 10, 'yellow', null, null, 'KeyJ', 'KeyL', false)
];

const ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 'black');

function update() {
    paddles.forEach(paddle => paddle.update());
    ball.update(paddles);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    paddles.forEach(paddle => paddle.draw());
    ball.draw();
}

function gameLoop() {
    if (!gamePaused) {
        update();
        draw();
    }
    requestAnimationFrame(gameLoop);
}

function updateScores() {
    score1Element.textContent = score1;
    score2Element.textContent = score2;
    score3Element.textContent = score3;
    score4Element.textContent = score4;
}

function checkWinner() {
    if (score1 >= maxScore) {
        displayWinner(1);
    } else if (score2 >= maxScore) {
        displayWinner(2);
    } else if (score3 >= maxScore) {
        displayWinner(3);
    } else if (score4 >= maxScore) {
        displayWinner(4);
    }
}

function displayWinner(player) {
    winnerMessageElement.textContent = `Player ${player} wins!`;
    resetGame();
}

function resetGame() {
    score1 = 0;
    score2 = 0;
    score3 = 0;
    score4 = 0;
    updateScores();
    setTimeout(() => {
        winnerMessageElement.textContent = '';
    }, 2000);
}

function togglePause() {
    gamePaused = !gamePaused;
    pauseButton.textContent = gamePaused ? 'Resume' : 'Pause';
}

pauseButton.addEventListener('click', togglePause);

window.addEventListener('keydown', (event) => {
    paddles.forEach(paddle => {
        if (event.code === paddle.controlUp) {
            paddle.dy = -5;
        } else if (event.code === paddle.controlDown) {
            paddle.dy = 5;
        } else if (event.code === paddle.controlLeft) {
            paddle.dx = -5;
        } else if (event.code === paddle.controlRight) {
            paddle.dx = 5;
        }
    });
});

window.addEventListener('keyup', (event) => {
    paddles.forEach(paddle => {
        if (event.code === paddle.controlUp || event.code === paddle.controlDown) {
            paddle.dy = 0;
        } else if (event.code === paddle.controlLeft || event.code === paddle.controlRight) {
            paddle.dx = 0;
        }
    });
});

gameLoop();
