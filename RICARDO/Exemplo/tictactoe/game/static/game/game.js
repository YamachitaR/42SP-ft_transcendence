const boardElement = document.getElementById('board');
const statusElement = document.createElement('div');
const restartButton = document.createElement('button');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// WebSocket connection
const ws = new WebSocket('ws://' + window.location.host + '/ws/game/');

ws.onopen = function() {
    console.log('WebSocket connection established');
};

ws.onmessage = function(e) {
    const data = JSON.parse(e.data);
    board = data['board'];
    console.log('Received board state:', board);
    updateBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

ws.onclose = function() {
    console.log('WebSocket connection closed');
};

ws.onerror = function(error) {
    console.error('WebSocket error:', error);
};

// Function to update the board in the DOM
const updateBoard = () => {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.textContent = cell;
        if (cell === '' && gameActive) {
            cellElement.addEventListener('click', () => makeMove(index));
        } else {
            cellElement.classList.add('disabled');
        }
        boardElement.appendChild(cellElement);
    });
    updateStatus();
};

// Function to handle a move
const makeMove = (index) => {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        console.log(`Player ${currentPlayer} made a move at index ${index}`);
        ws.send(JSON.stringify({ 'index': index, 'player': currentPlayer }));
        checkWinner();
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    } else {
        console.log(`Cell ${index} is already occupied or game is over`);
    }
};

// Function to check for a winner
const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false;

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        updateStatus(`Player ${currentPlayer} wins!`);
    } else if (!board.includes('')) {
        gameActive = false;
        updateStatus('Draw!');
    } else {
        updateStatus(`Player ${currentPlayer}'s turn`);
    }
};

// Function to update the status message
const updateStatus = (message) => {
    statusElement.textContent = message;
};

// Function to restart the game
const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    ws.send(JSON.stringify({ 'restart': true }));  // Inform other player about the restart
    updateBoard();
};

// Initial setup
statusElement.id = 'status';
restartButton.id = 'restart';
restartButton.textContent = 'Restart Game';
restartButton.addEventListener('click', restartGame);
document.body.insertBefore(statusElement, boardElement);
document.body.appendChild(restartButton);
updateBoard();
