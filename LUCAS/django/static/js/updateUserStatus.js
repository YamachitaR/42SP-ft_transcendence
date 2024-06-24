import { getWebSocketManager } from './websocketManager.js';

export function initUserStatus() {
    const wsManager = getWebSocketManager();
    if (wsManager) {
        wsManager.addHandler('user_online', (data) => {
            if (data.user_id === getUserId()) {
                updateUserOnlineStatus(true);
            }
        });

        wsManager.addHandler('user_offline', (data) => {
            if (data.user_id === getUserId()) {
                updateUserOnlineStatus(false);
            }
        });
    }
}

function getUserId() {
    // Supondo que você tenha uma maneira de obter o ID do usuário logado
    return parseInt(localStorage.getItem('user_id'), 10);
}

function updateUserOnlineStatus(isOnline) {
    // Atualize a interface do usuário para mostrar o status online/offline
    const statusElement = document.getElementById('user-status');
    if (statusElement) {
        statusElement.textContent = isOnline ? 'Online' : 'Offline';
    }
}
