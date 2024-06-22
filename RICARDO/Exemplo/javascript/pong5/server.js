const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

let players = [];

server.on('connection', (ws) => {
    players.push(ws);
    if (players.length > 2) {
        ws.send(JSON.stringify({ type: 'error', message: 'Only two players are allowed' }));
        ws.close();
    } else {
        ws.on('message', (message) => {
            players.forEach(player => {
                if (player !== ws && player.readyState === WebSocket.OPEN) {
                    player.send(message);
                }
            });
        });

        ws.on('close', () => {
            players = players.filter(player => player !== ws);
        });
    }
});

console.log('WebSocket server is running on ws://localhost:8080');
