import { user } from '../crud/user.js';
import { token } from '../main.js';
import renderProfileUser from '../views/userProfileViews.js';

export function renderUserInfo() {
    document.getElementById('user-id').value = user.id;
    document.getElementById('user-username').value = user.username;
    document.getElementById('user-email').value = user.email;

    const userImage = document.getElementById('user-image');
    const defaultImage = document.getElementById('user-info').getAttribute('data-default-image');

    if (user.image) {
        userImage.src = user.image;
    } else {
        userImage.src = defaultImage;
    }
    userImage.style.display = 'block';

    // Carregar preferências do usuário
    loadUserPreferences();
}

async function loadUserPreferences() {
    if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
    }

    await fetch('/api/user-preferences/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const preferences = data;
        setSingleOption('preference1', preferences.preference1);
        setSingleOption('preference2', preferences.preference2);
        setSingleOption('preference3', preferences.preference3);
        setSingleOption('preference4', preferences.preference4);
        setSingleOption('preference5', preferences.preference5);
    })
    .catch(error => {
        console.error('Erro ao carregar as preferências do usuário:', error);
    });
}

function setSingleOption(selectId, value) {
    const selectElement = document.getElementById(selectId);
    selectElement.value = value;
}

export async function sendUpdate() {
    if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
    }

    document.getElementById('user-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', document.getElementById('user-username').value);
        formData.append('email', document.getElementById('user-email').value);

        const fileInput = document.getElementById('user-image-upload');
        const useDefaultImage = document.getElementById('use-default-image').checked;

        if (useDefaultImage) {
            formData.append('profile_image', '');
        } else if (fileInput.files[0]) {
            formData.append('profile_image', fileInput.files[0]);
        }

        await fetch('/api/update-user/', {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Dados do usuário atualizados:', data);
            alert('Dados atualizados com sucesso!');
            renderProfileUser();
        })
        .catch(error => {
            console.error('Erro ao atualizar os dados do usuário:', error);
            alert('Erro ao atualizar os dados do usuário.');
        });
    });

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
        })
        .catch(error => {
            console.error('Erro ao atualizar as preferências do usuário:', error);
            alert('Erro ao atualizar as preferências do usuário.');
        });
    });
}
