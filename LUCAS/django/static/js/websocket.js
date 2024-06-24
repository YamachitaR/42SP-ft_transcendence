class WebSocketManager {
    constructor(url) {
        this.url = url;
        this.socket = null;
        this.handlers = {};
    }

    connect() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = (event) => {
            console.log('WebSocket conectado.');
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket desconectado.');
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket erro:', error);
        };
    }

    addHandler(type, handler) {
        if (!this.handlers[type]) {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    }

    handleMessage(data) {
        const handlers = this.handlers[data.type];
        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }

    sendMessage(type, message) {
        const data = JSON.stringify({ type, message });
        this.socket.send(data);
    }
}

export default WebSocketManager;
