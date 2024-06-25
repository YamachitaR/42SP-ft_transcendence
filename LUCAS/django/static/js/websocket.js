export function connectWebSocket() {
    const statusSocketUrl = 'ws/status/';

    const statusSocket = new WebSocket(statusSocketUrl);

    statusSocket.onopen = function() {
        console.log('WebSocket connection established');
        statusSocket.send(JSON.stringify({
            'message': 'Hello, WebSocket!'
        }));
    };

    statusSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log('WebSocket message received:', data);
    };

    statusSocket.onclose = function(e) {
        console.log('WebSocket connection closed:', e);
    };

    statusSocket.onerror = function(e) {
        console.error('WebSocket error:', e);
    };
}
