const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Gera um identificador único para cada navegador
const clientId = Math.random().toString(36).substr(2, 9);
const controlLeftPaddle = clientId < 'm'; // Navegadores com clientId começando com letras de 'a' a 'm' controlam a raquete esquerda

// WebSocket setup
const socket = new WebSocket('ws://' + window.location.host + '/ws/pong/');

socket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    // Update game state based on the received data
    if (data.type === 'update') {
        leftPaddle.y = data.leftPaddleY;
        rightPaddle.y = data.rightPaddleY;
    }
};

// Pong game setup
const paddleWidth = 10, paddleHeight = 100;
const ballSize = 10;

const leftPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2 };
const rightPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2 };
const ball = { x: canvas.width / 2, y: canvas.height / 2, vx: 4, vy: 4 };

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'white';
    context.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
    context.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);
    context.fillRect(ball.x, ball.y, ballSize, ballSize);
}

function update() {
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y < 0 || ball.y + ballSize > canvas.height) {
        ball.vy = -ball.vy;
    }

    if ((ball.x < leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) ||
        (ball.x + ballSize > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight)) {
        ball.vx = -ball.vx;
    }

    draw();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', function(event) {
    let move = false;
    if (controlLeftPaddle) {
        if (event.key === 'w') {
            leftPaddle.y -= 20;
            move = true;
        } else if (event.key === 's') {
            leftPaddle.y += 20;
            move = true;
        }
    } else {
        if (event.key === 'ArrowUp') {
            rightPaddle.y -= 20;
            move = true;
        } else if (event.key === 'ArrowDown') {
            rightPaddle.y += 20;
            move = true;
        }
    }

    if (move) {
        socket.send(JSON.stringify({
            type: 'move',
            clientId: clientId,
            leftPaddleY: leftPaddle.y,
            rightPaddleY: rightPaddle.y
        }));
    }
});

update();
