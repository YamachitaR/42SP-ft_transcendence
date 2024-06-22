import { user } from '../crud/user.js';

export function renderUserInfo() {
    document.getElementById('user-id').textContent = user.id;
    document.getElementById('user-username').textContent = user.username;
    document.getElementById('user-email').textContent = user.email;

    const userImage = document.getElementById('user-image');
    const defaultImage = document.getElementById('user-info').getAttribute('data-default-image');

    if (user.image) {  // Verifique se o usuário tem uma imagem
        userImage.src = user.image;
    } else {
        userImage.src = defaultImage;
    }
    userImage.style.display = 'block';  // Certifique-se de que a imagem está visível
}
