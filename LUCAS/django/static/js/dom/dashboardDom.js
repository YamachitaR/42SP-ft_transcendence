import { user } from '../crud/user.js';
import { token } from '../router.js';
import { apiListarAmigosOnLine } from '../apis.js';

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

export async function carregarListaAmigosDashboard() {
    try {
        console.log('Chamando API para listar amigos');
        const amigosData = await apiListarAmigosOnLine(token);
        console.log('Dados recebidos da API - Listar Amigos:', amigosData);

        const listaAmigos = document.getElementById('lista-amigosDashboard');
        listaAmigos.innerHTML = '';

        if (!Array.isArray(amigosData) || amigosData.length === 0) {
            listaAmigos.innerHTML = '<div class="mt-3 mb-3 text-center">  *_* :{ @¬@¬ </div>';
        } else {
            const friendTemplate = document.getElementById('friend-templateDashboard').content;

            amigosData.forEach(amigo => {
                const friendClone = document.importNode(friendTemplate, true);
                friendClone.querySelector('.profile-photoDashboard').src = amigo.profile_image || 'static/img/pf.jpg';
                friendClone.querySelector('.friend-usernameDashboard').textContent = amigo.username;
                friendClone.querySelector('.status-iconDashboard').src = amigo.is_online ? 'static/img/online.png' : 'static/img/offline.png';
                listaAmigos.appendChild(friendClone);
            });
        }
    } catch (error) {
        console.error('Erro ao listar amigos:', error);
        alert('Erro ao listar amigos');
    }
}
