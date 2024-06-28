import { userPreferences } from '../../crud/user.js';
import { getGamePreferences } from '../../crud/user.js';
import { token } from '../../main.js';

export async function renderPreferencesGame() {
    await getGamePreferences();
    loadUserPreferences();
}

export function loadUserPreferences() {
    setSingleOption('preference1', userPreferences.preference1);
    setSingleOption('preference2', userPreferences.preference2);
    setSingleOption('preference3', userPreferences.preference3);
    setSingleOption('preference4', userPreferences.preference4);
    setSingleOption('preference5', userPreferences.preference5);

}

function setSingleOption(selectId, value) {
    const selectElement = document.getElementById(selectId);
    selectElement.value = value;
}

export async function sendUpdateGame() {
    if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
    }

    document.getElementById('user-preference-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const preferencesData = {
            preference1: document.getElementById('preference1').value,
            preference2: document.getElementById('preference2').value,
            preference3: document.getElementById('preference3').value,
            preference4: document.getElementById('preference4').value,
            preference5: document.getElementById('preference5').value
        };

        await fetch('/api/user-preferences/', {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preferencesData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Preferências do usuário atualizadas:', data);
            alert('Preferências atualizadas com sucesso!');
            location.reload(true);
        })
        .catch(error => {
            console.error('Erro ao atualizar as preferências do usuário:', error);
            alert('Erro ao atualizar as preferências do usuário.');
        });
    });
}
