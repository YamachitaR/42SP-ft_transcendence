import { user } from '../crud/user.js';
import { token } from '../router.js';

export function renderDashUserInfo() {
    document.getElementById('user-username').innerText = user.username;

    const userImage = document.getElementById('user-image');
    const defaultImage = document.getElementById('user-info').getAttribute('data-default-image');

    if (user.image) {  // Verifique se o usuário tem uma imagem
        userImage.src = user.image;
    } else {
        userImage.src = defaultImage;
    }
    userImage.style.display = 'block';  // Certifique-se de que a imagem está visível
}