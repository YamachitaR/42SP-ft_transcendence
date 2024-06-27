import { user } from '../crud/user.js';

let chatSocket = null; // Variável global para armazenar a conexão WebSocket

function generateRoomId(friendId) {
    const ids = [user.id, friendId].sort(); // Ordena os IDs
    return `join_${ids[0]}_${ids[1]}`;
}

function initializeChat(params) {
    console.log('Initializing chat with params:', params);

    const roomId = generateRoomId(params.id); // Gera o roomId
    console.log('Generated roomId:', roomId);

    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const host = window.location.host;
    const chatSocketUrl = `${protocol}${host}/ws/chat/${roomId}/`;

    // Verifica se a conexão WebSocket já está estabelecida
    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
        console.log('WebSocket is already connected');
    } else {
        // Fecha a conexão WebSocket existente, se houver
        if (chatSocket) {
            chatSocket.close();
        }

        chatSocket = new WebSocket(chatSocketUrl);

        chatSocket.onopen = function() {
            console.log('WebSocket connection established to room:', roomId);
        };

        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            const chatLog = document.getElementById('chat-log');
            const messageClass = data.username === user.username ? 'message sent' : 'message received';
            const timestamp = new Date().toLocaleString(); // Data e hora atuais

            chatLog.innerHTML += `
                <div class="${messageClass}">
                    <div class="header">
                        <strong>${data.username}</strong> <span>${timestamp}</span>
                    </div>
                    <div class="content">
                        ${data.message}
                    </div>
                </div>`;
            chatLog.scrollTop = chatLog.scrollHeight; // Scroll para a última mensagem
        };

        chatSocket.onclose = function(e) {
            console.log('WebSocket connection closed:', e);
        };

        chatSocket.onerror = function(e) {
            console.error('WebSocket error:', e);
        };
    }

    // Sempre configure o botão de envio de mensagens
    document.getElementById('chat-message-submit').onclick = function() {
        const messageInputDom = document.getElementById('chat-message-input');
        const message = messageInputDom.value.trim();
        if (message) {
            if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
                const timestamp = new Date().toLocaleString(); // Data e hora atuais
                console.log('Sending message:', message); // Log da mensagem a ser enviada
                chatSocket.send(JSON.stringify({ 'message': message, 'username': user.username, 'timestamp': timestamp }));
                messageInputDom.value = '';
            } else {
                console.error('Chat WebSocket is not connected');
            }
        } else {
            console.warn('Cannot send empty message');
        }
    };
}

function closeChatSocket() {
    if (chatSocket) {
        chatSocket.close();
        chatSocket = null;
        console.log('Chat WebSocket connection closed');
    }
}

export { initializeChat, closeChatSocket };
