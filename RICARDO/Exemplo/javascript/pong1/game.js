const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const net = {
    x: canvas.width / 2 - 1,
    y: 0,
    width: 2,
    height: canvas.height,
    color: "#fff"
};

const player = {
    x: 0,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: "#fff",
    score: 0
};

const ai = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: "#fff",
    score: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "#05edff"
};

let gameState = "start"; // possible states: start, playing, gameover
let difficulty = "medium"; // possible values: easy, medium, hard
let maxScore = 10; // Default maximum score

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawArc(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawNet() {
    drawRect(net.x, net.y, net.width, net.height, net.color);
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "35px sans-serif";
    context.fillText(text, x, y);
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");

    if (gameState === "start") {
        drawText("Press 1 for Easy", canvas.width / 4, canvas.height / 2 - 100, "#fff");
        drawText("Press 2 for Medium", canvas.width / 4, canvas.height / 2 - 50, "#fff");
        drawText("Press 3 for Hard", canvas.width / 4, canvas.height / 2, "#fff");
        drawText(`Max Score: ${maxScore}`, canvas.width / 4, canvas.height / 2 + 50, "#fff");
        drawText("Press + or - to Adjust Max Score", canvas.width / 4, canvas.height / 2 + 100, "#fff");
    } else if (gameState === "gameover") {
        drawText("Game Over", canvas.width / 3, canvas.height / 2 - 50, "#fff");
        drawText(`Player: ${player.score} - AI: ${ai.score}`, canvas.width / 4, canvas.height / 2, "#fff");
        drawText("Press Enter to Restart", canvas.width / 4, canvas.height / 2 + 50, "#fff");
    } else {
        drawNet();

        drawText(player.score, canvas.width / 4, canvas.height / 5, "#fff");
        drawText(ai.score, 3 * canvas.width / 4, canvas.height / 5, "#fff");

        drawRect(player.x, player.y, player.width, player.height, player.color);
        drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);

        drawArc(ball.x, ball.y, ball.radius, ball.color);
    }
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

function anticipateBallPosition() {
    let futureBall = {
        x: ball.x,
        y: ball.y,
        velocityX: ball.velocityX,
        velocityY: ball.velocityY
    };

    while (futureBall.x + futureBall.radius < canvas.width && futureBall.x - futureBall.radius > 0) {
        futureBall.x += futureBall.velocityX;
        futureBall.y += futureBall.velocityY;

        if (futureBall.y + futureBall.radius > canvas.height || futureBall.y - futureBall.radius < 0) {
            futureBall.velocityY = -futureBall.velocityY;
        }
    }
    return futureBall.y;
}

function update() {
    if (gameState !== "playing") return;

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let playerOrAI = (ball.x < canvas.width / 2) ? player : ai;

    if (collision(ball, playerOrAI)) {
        let collidePoint = (ball.y - (playerOrAI.y + playerOrAI.height / 2));
        collidePoint = collidePoint / (playerOrAI.height / 2);
        let angleRad = (Math.PI / 4) * collidePoint;

        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        ball.speed += 0.5;
    }

    if (ball.x - ball.radius < 0) {
        ai.score++;
        resetBall();
        if (ai.score >= maxScore) {
            gameState = "gameover";
        }
    } else if (ball.x + ball.radius > canvas.width) {
        player.score++;
        resetBall();
        if (player.score >= maxScore) {
            gameState = "gameover";
        }
    }

    let anticipation = anticipateBallPosition();
    let difficultyFactor;

    switch (difficulty) {
        case "easy":
            difficultyFactor = 0.02;
            break;
        case "medium":
            difficultyFactor = 0.1;
            break;
        case "hard":
            difficultyFactor = 0.2;
            break;
        default:
            difficultyFactor = 0.1;
    }

    ai.y += (anticipation - (ai.y + ai.height / 2)) * difficultyFactor;
}

canvas.addEventListener("mousemove", (evt) => {
    if (gameState !== "playing") return;
    let rect = canvas.getBoundingClientRect();
    player.y = evt.clientY - rect.top - player.height / 2;
});

document.addEventListener("keydown", (evt) => {
    if (gameState === "start" || gameState === "gameover") {
        if (evt.key === "1") {
            difficulty = "easy";
            gameState = "playing";
        } else if (evt.key === "2") {
            difficulty = "medium";
            gameState = "playing";
        } else if (evt.key === "3") {
            difficulty = "hard";
            gameState = "playing";
        } else if (evt.key === "+") {
            maxScore++;
            render();
        } else if (evt.key === "-") {
            if (maxScore > 1) {
                maxScore--;
                render();
            }
        }
    }

    if (evt.key === "Enter" && gameState === "gameover") {
        player.score = 0;
        ai.score = 0;
        gameState = "start";
    }
});

function game() {
    update();
    render();
}

let framePerSecond = 50;
setInterval(game, 1000 / framePerSecond);
