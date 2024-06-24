import WebSocketManager from './websocket.js';

let wsManager = null;

export function initWebSocket() {
    const token = localStorage.getItem('token');
    if (token) {
        const url = `/wss/online_status/?token=${token}`;
        wsManager = new WebSocketManager(url);
        wsManager.connect();
    } else {
        console.error('Token não encontrado. Não é possível conectar ao WebSocket.');
    }
}

export function getWebSocketManager() {
    return wsManager;
}
