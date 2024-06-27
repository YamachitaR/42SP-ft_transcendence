import { user } from '../crud/user.js';

function initializeChat() {
    let chatSocket = null;
    const roomName = 'myRoomName'; // Nome da sala de chat estática
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const host = window.location.host;
    const chatSocketUrl = `${protocol}${host}/ws/chat/${roomName}/`;

    chatSocket = new WebSocket(chatSocketUrl);

    chatSocket.onopen = function() {
        console.log('WebSocket connection established');
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
                console.error('WebSocket is not connected');
            }
        } else {
            console.warn('Cannot send empty message');
        }
    };
}

export default initializeChat;
