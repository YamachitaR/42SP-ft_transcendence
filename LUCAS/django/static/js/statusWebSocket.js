import { user } from './crud/user.js';

let statusSocket = null;

function initializeStatusSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const host = window.location.host;
    const statusSocketUrl = `${protocol}${host}/ws/status/${user.id}/`;

    // Verifica se a conexão WebSocket de status já está estabelecida
    if (statusSocket && statusSocket.readyState === WebSocket.OPEN) {
        console.log('Status WebSocket is already connected');
        return;
    }

    // Fecha a conexão WebSocket existente, se houver
    if (statusSocket) {
        statusSocket.close();
    }

    statusSocket = new WebSocket(statusSocketUrl);

    statusSocket.onopen = function() {
        console.log('Status WebSocket connection established');
    };

    statusSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        console.log('Status WebSocket message received:', data);
    };

    statusSocket.onclose = function(e) {
        console.log('Status WebSocket connection closed:', e);
    };

    statusSocket.onerror = function(e) {
        console.error('Status WebSocket error:', e);
    };
}

function closeStatusSocket() {
    if (statusSocket) {
        statusSocket.close();
        statusSocket = null;
        console.log('Status WebSocket connection closed');
    }
}

export { initializeStatusSocket, closeStatusSocket };
