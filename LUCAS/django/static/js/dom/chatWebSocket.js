import { user } from '../crud/user.js';
import { token } from '../main.js';
import { fetchUserProfileById } from '../apis.js';
import { navigateTo } from '../main.js';

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

function loadChatHistory(roomId) {
    const chatLog = document.getElementById('chat-log');
    chatLog.innerHTML = '';

    const messages = JSON.parse(localStorage.getItem(roomId) || '[]');
    messages.forEach(message => {
        const messageClass = message.username === user.username ? 'message sent' : 'message received';
        chatLog.innerHTML += `
            <div class="${messageClass}">
                <div class="header">
                    <strong>${message.username}</strong> <span>${message.timestamp}</span>
                </div>
                <div class="content">
                    ${message.message}
                </div>
            </div>`;
    });
    chatLog.scrollTop = chatLog.scrollHeight;
}

function saveMessage(roomId, message) {
    const messages = JSON.parse(localStorage.getItem(roomId) || '[]');
    messages.push(message);
    localStorage.setItem(roomId, JSON.stringify(messages));
}

async function initializeChat(params) {
    const friend = await initProfileUser(params.id);
    const roomId = generateRoomId(params.id);
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const host = window.location.host;
    const chatSocketUrl = `${protocol}${host}/ws/chat/${roomId}/`;

    loadChatHistory(roomId);

    if (chatSocket && (chatSocket.readyState === WebSocket.OPEN || chatSocket.readyState === WebSocket.CONNECTING)) {
        console.log('WebSocket is already connected or in the process of connecting');
    } else {
        if (chatSocket) {
            chatSocket.onclose = function() {};
            chatSocket.close();
        }

        chatSocket = new WebSocket(chatSocketUrl);

        chatSocket.onopen = function() {
            console.log('WebSocket connection established to room:', roomId);
            const chatLog = document.getElementById('chat-log');
            chatLog.innerHTML = '<div class="loading">Loading chat history...</div>';
            loadChatHistory(roomId);
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

            const message = {
                username: data.username,
                message: data.message,
                timestamp: timestamp
            };

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

            saveMessage(roomId, message);
        };

        chatSocket.onclose = function(e) {
            console.log('WebSocket connection closed:', e);
            // Attempt to reconnect
            setTimeout(() => {
                initializeChat(params);
            }, 1000); // Try to reconnect after 1 second
        };

        chatSocket.onerror = function(e) {
            console.error('WebSocket error:', e);
        };
    }

    function sendMessage() {
        const messageInputDom = document.getElementById('chat-message-input');
        const message = messageInputDom.value.trim();
        if (message) {
            if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
                const timestamp = formatDate(new Date());
                console.log('Sending message:', message);
                const msg = {
                    message: message,
                    username: user.username,
                    timestamp: timestamp
                };
                chatSocket.send(JSON.stringify(msg));
                messageInputDom.value = '';
                saveMessage(roomId, msg);
            } else {
                console.error('Chat WebSocket is not connected');
            }
        } else {
            console.warn('Cannot send empty message');
        }
    }

    document.getElementById('chat-message-submit').onclick = sendMessage;

    document.getElementById('chat-message-input').onkeypress = function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    document.getElementById('view-profile-button').onclick = function() {
        // Lógica para visualizar o perfil do amigo
        alert('View profile clicked');
        viewProfile(friend.id);
    };

    document.getElementById('block-friend-button').onclick = function() {
        // Lógica para bloquear o amigo
       alert('Block friend clicked');
        // Adicione aqui a lógica para bloquear o amigo
    };

	debugger;
	console.log('friend', friend.name);
    // Adicione aqui a lógica para carregar as informações do amigo
    document.querySelector('.friend-name').innerText = friend.nome;
    document.querySelector('.friend-image').src = friend.image || 'static/img/pf.jpg';
}

async function initProfileUser(userId) {
	debugger;
	const userProfile = await fetchUserProfileById(userId, token);
	console.log('<<<___>>> userProfile', userProfile);
    return userProfile;
}
function viewProfile(amigo) {
	navigateTo('/friends-profile/', { id: amigo }); // Navegar para o perfil do amigo com parâmetros
}

function closeChatSocket() {
    if (chatSocket) {
        chatSocket.close();
        chatSocket = null;
        console.log('Chat WebSocket connection closed');
    }
}

export { initializeChat, closeChatSocket };
