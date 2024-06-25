import { user } from './crud/user.js';

export function connectWebSocket() {
	const userId = user.id;
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const host = window.location.host;
    const statusSocketUrl = `${protocol}${host}/ws/status/${userId}/`;

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
