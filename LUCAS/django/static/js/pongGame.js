const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 75;
const ballRadius = 7;

let upPressed = false;
let downPressed = false;

const player = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#daa520',
    score: 0
};

const ai = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#daa520',
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 5,
    dx: 5,
    dy: 5,
    color: '#fff'
};

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = '32px Arial';
    context.fillText(text, x, y);
}

function movePaddle() {
    if (upPressed && player.y > 0) {
        player.y -= 8;
    } else if (downPressed && player.y < canvas.height - player.height) {
        player.y += 8;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    let playerPaddle = ball.x < canvas.width / 2 ? player : ai;

    if (collision(ball, playerPaddle)) {
        ball.dx *= -1;
    }

    if (ball.x + ball.radius > canvas.width) {
        player.score++;
        resetBall();
    } else if (ball.x - ball.radius < 0) {
        ai.score++;
        resetBall();
    }
}

function collision(ball, paddle) {
    paddle.top = paddle.y;
    paddle.bottom = paddle.y + paddle.height;
    paddle.left = paddle.x;
    paddle.right = paddle.x + paddle.width;

    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    return paddle.left < ball.right &&
           paddle.top < ball.bottom &&
           paddle.right > ball.left &&
           paddle.bottom > ball.top;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx *= -1;
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, '#000');
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawText(player.score, canvas.width / 4, canvas.height / 5, '#daa520');
    drawText(ai.score, 3 * canvas.width / 4, canvas.height / 5, '#daa520');
}

function update() {
    movePaddle();
    moveBall();
}

function gameLoop() {
    update();
    draw();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    }
});

setInterval(gameLoop, 1000 / 60); // 60 FPS
