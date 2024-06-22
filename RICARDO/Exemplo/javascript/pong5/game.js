const boardElement = document.getElementById('board');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    if (data.type === 'move') {
        board[data.index] = data.player;
        updateBoard();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

const updateBoard = () => {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
};

const makeMove = (index) => {
    if (board[index] === '') {
        board[index] = currentPlayer;
        ws.send(JSON.stringify({ type: 'move', index: index, player: currentPlayer }));
        updateBoard();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

updateBoard();
