import { user } from './crud/user.js';

let statusSocket = null;

export function connectWebSocket() {
    const userId = user.id;
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const host = window.location.host;
    const statusSocketUrl = `${protocol}${host}/ws/status/${userId}/`;

    statusSocket = new WebSocket(statusSocketUrl);
    statusSocket.onopen = function() {
        console.log('WebSocket connection established');
        statusSocket.send(JSON.stringify({
            'message': 'Hello, WebSocket!'
        }));
    };

    statusSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log('WebSocket message received:', data);

        // Disparar um evento customizado baseado no tipo de mensagem
        if (data.type === 'chat') {
            document.dispatchEvent(new CustomEvent('chat-message', { detail: data }));
        } else if (data.type === 'status') {
            document.dispatchEvent(new CustomEvent('status-message', { detail: data }));
        }
    };

    statusSocket.onclose = function(e) {
        console.log('WebSocket connection closed:', e);
    };

    statusSocket.onerror = function(e) {
        console.error('WebSocket error:', e);
    };
}

export function sendMessage(message) {
    if (statusSocket && statusSocket.readyState === WebSocket.OPEN) {
        statusSocket.send(JSON.stringify(message));
    }
}
