import { user } from '../crud/user.js';

let chatSocket = null;

function generateRoomId(friendId) {
    const ids = [user.id, friendId].sort();
    return `join_${ids[0]}_${ids[1]}`;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function initializeChat(params) {
    const roomId = generateRoomId(params.id);
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const host = window.location.host;
    const chatSocketUrl = `${protocol}${host}/ws/chat/${roomId}/`;

    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
        console.log('WebSocket is already connected');
    } else {
        if (chatSocket) {
            chatSocket.close();
        }

        chatSocket = new WebSocket(chatSocketUrl);

        chatSocket.onopen = function() {
            console.log('WebSocket connection established to room:', roomId);
            const chatLog = document.getElementById('chat-log');
            chatLog.innerHTML = '<div class="loading">Loading chat history...</div>';
        };

        chatSocket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            const chatLog = document.getElementById('chat-log');
            const loadingElement = chatLog.querySelector('.loading');

            if (loadingElement) {
                loadingElement.remove();
            }

            const messageClass = data.username === user.username ? 'message sent' : 'message received';
            const timestamp = data.timestamp;

            chatLog.innerHTML += `
                <div class="${messageClass}">
                    <div class="header">
                        <strong>${data.username}</strong> <span>${timestamp}</span>
                    </div>
                    <div class="content">
                        ${data.message}
                    </div>
                </div>`;
            chatLog.scrollTop = chatLog.scrollHeight;
        };

        chatSocket.onclose = function(e) {
            console.log('WebSocket connection closed:', e);
        };

        chatSocket.onerror = function(e) {
            console.error('WebSocket error:', e);
        };
    }

    document.getElementById('chat-message-submit').onclick = function() {
        const messageInputDom = document.getElementById('chat-message-input');
        const message = messageInputDom.value.trim();
        if (message) {
            if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
                const timestamp = formatDate(new Date());
                console.log('Sending message:', message);
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
