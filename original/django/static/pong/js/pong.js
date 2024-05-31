const elements = {
	field: null,
	paddles: [],
	ball: null,
}

const   keyState = {
    w: false,
    s: false,
    o: false,
    l: false,
	z: false,
	x: false,
	ArrowLeft: false,
	ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
};

const	sizes = {
    canvas: 800,
    paddleSize: 100,
    paddleThickness: 20,
    offset: 20,
};
sizes.field = sizes.paddleThickness + sizes.offset;

function createGameCanvas() {
	const gameCanvas = document.getElementById('gameCanvas');
    gameCanvas.width = sizes.canvas;
    gameCanvas.height = sizes.canvas;

    const gameContext = gameCanvas.getContext('2d');
    gameContext.fillStyle = "#212121";
    gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

	elements.field = new Field(sizes.canvas);
	elements.field.draw(gameContext);

	return (gameCanvas, gameContext)
}

let pongSocket = null;

function gameProcess(isWaitingPage, gameMode, gameID, playerID) {
    var isReady = false;
	if (!isWaitingPage) {
		gameCanvas, gameContext = createGameCanvas();
	}

    if (pongSocket == null || pongSocket.socket.readyState === WebSocket.CLOSED || pongSocket.socket.readyState === WebSocket.CLOSING)
        pongSocket = getSocket(gameID);

    if (!isWaitingPage) {
        if (pongSocket.socket.readyState === WebSocket.OPEN) {
            const init_game_message = {
                type: gameMode,
                playerID: playerID,
            };
            pongSocket.socket.send(JSON.stringify(init_game_message));
        } else {
            pongSocket.socket.addEventListener('open', function (event) {
                const init_game_message = {
                    type: gameMode,
                    playerID: playerID,
                };
                pongSocket.socket.send(JSON.stringify(init_game_message));
            });
        }
    }

    pongSocket.socket.onopen = function() {
    };

    pongSocket.socket.onmessage = function(event) {
        const message = JSON.parse(event.data);

		if (message.type === 'reload_page' && isWaitingPage === true) {
            router.navigate('/pong/game/' + gameMode);
		}

		else if (message.type === 'init_paddle_position') {
			initPaddlePosition(message.id, message.position);
            isReady = true;
		}

		else if (message.type === 'update_score') {
			updateScore(message);
		}

		else if (message.type === 'update_paddle_position') {
			updatePaddlePosition(message.id, message.position);
		}

		else if (message.type === 'update_ball_position') {
            isReady = true;
			updateBallPosition(message.x, message.y, message.color, message.radius);
		}

        else if (message.type === 'game_over') {
            if (message.playerID === playerID) {
                pongSocket.socket.close();
                pongSocket = null;
                isReady = false;
                gameOver(message);
            }
        }
    };

    if (!isWaitingPage) {
        document.addEventListener('keydown', function(event) {
            const gameCanvas = document.getElementById('gameCanvas');
            if (gameCanvas && isReady) {
                if (!keyState[event.key] && keyState.hasOwnProperty(event.key)) {
                    keyState[event.key] = true;
                    const message = {
                        type: 'paddle_move',
                        key: 'keydown',
                        direction: getPaddleDirection(event.key),
                        playerID: playerID,
                        paddleKey: event.key,
                    };
                    if (pongSocket && pongSocket.socket.readyState === WebSocket.OPEN) {
                        pongSocket.socket.send(JSON.stringify(message));
                    }
                }

                if (event.key === "ArrowUp" || event.key === "ArrowDown" || 
                    event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    event.preventDefault();
                }
            }
        });

        document.addEventListener('keyup', function(event) {
            const gameCanvas = document.getElementById('gameCanvas');
            if (gameCanvas && isReady) {
                if (keyState.hasOwnProperty(event.key)) {
                    keyState[event.key] = false;
                    const message = {
                        type: 'paddle_move',
                        key: 'keyup',
                        direction: getPaddleDirection(event.key),
                        playerID: playerID,
                        paddleKey: event.key,
                    };
                    if (pongSocket && pongSocket.socket.readyState === WebSocket.OPEN) {
                        pongSocket.socket.send(JSON.stringify(message));
                    }
                }
            }
        });
    }
}