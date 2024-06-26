import { user } from '../../crud/user.js';
import { token } from '../../router.js';
import renderSettingsUser from './settingsUserViews.js';

export function renderUserInfos() {
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
}


export async function sendUpdateUser() {
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
            renderSettingsUser();
        })
        .catch(error => {
            console.error('Erro ao atualizar os dados do usuário:', error);
            alert('Erro ao atualizar os dados do usuário.');
        });
    });
}

