import { user } from '../crud/user.js';
import { token } from '../main.js';
import { apiListarAmigosOnLine, apiListarHistoricoJogo } from '../apis.js';
import { navigateTo } from '../main.js';

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
            listaAmigos.innerHTML = '<div class="bg-dashboard-2 mt-3 mx-2 p-2 rounded shadow"><h5>Amigos Online</h5></div>';
        } else {
            const friendTemplate = document.getElementById('friend-templateDashboard').content;

            amigosData.forEach(amigo => {
                const friendClone = document.importNode(friendTemplate, true);
                friendClone.querySelector('.profile-photoDashboard').src = amigo.profile_image || 'static/img/pf.jpg';
                friendClone.querySelector('.friend-usernameDashboard').textContent = amigo.username;
                friendClone.querySelector('.status-iconDashboard').src = amigo.is_online ? 'static/img/online.png' : 'static/img/offline.png';

                friendClone.querySelector('.chat-iconDashboard').addEventListener('click', () => {
                    Chat(amigo.id);
                });

                listaAmigos.appendChild(friendClone);
            });
        }
    } catch (error) {
        console.error('Erro ao listar amigos:', error);
        alert('Erro ao listar amigos');
    }
}

function Chat(amigoId) {
    console.log('Visualizando chat amigo id:', amigoId);
    navigateTo('/chat/', { id: amigoId });
}

function formatDate(originalDateStr) {
    // Parse da string para um objeto Date
    let date = new Date(originalDateStr);

    // Extração das partes necessárias
    let hours = date.getHours().toString().padStart(2, '0');  // 14
    let minutes = date.getMinutes().toString().padStart(2, '0');  // 49
    let day = date.getDate().toString().padStart(2, '0');  // 30
    let month = (date.getMonth() + 1).toString().padStart(2, '0');  // 06
    let year = date.getFullYear();  // 2024

    // Construção da string no formato desejado
    return `${hours}:${minutes} ${day}-${month}-${year}`;
}

export async function carregarHistoricoJogosDashboard() {
    try {
        console.log('Chamando API para listar histórico de jogos');
        const historicoJogos = await apiListarHistoricoJogo(user.id, token);
        console.log('Dados recebidos da API - Histórico de Jogos:', historicoJogos);

        const listaHistorico = document.getElementById('lista-historicoDashboard');
        listaHistorico.innerHTML = `
            <div class="bg-dashboard-2 mt-3 mx-2 p-2 rounded shadow">
                <h5>Histórico de Jogos</h5>
            </div>
            <br>
        `;

        if (!Array.isArray(historicoJogos) || historicoJogos.length === 0) {
            listaHistorico.innerHTML += '<div class="mt-3 mb-3 text-center">Nenhum histórico de jogos encontrado</div>';
        } else {
            const historicoTemplate = document.getElementById('historico-templateDashboard').content;

            let totalJogos = 0;
            let totalVitorias = 0;
            let totalDerrotas = 0;

            historicoJogos.forEach(jogo => {
                totalJogos++;
                if (jogo.result === 'win') {
                    totalVitorias++;
                } else if (jogo.result === 'loss') {
                    totalDerrotas++;
                }

                const historicoClone = document.importNode(historicoTemplate, true);
                const dataRaw = jogo.date;
                const dataCorreta = formatDate(dataRaw);
                historicoClone.querySelector('.historico-item').textContent = `(${jogo.result}) ${jogo.description} ${jogo.score} ${jogo.game} ${dataCorreta}`;
                listaHistorico.appendChild(historicoClone);
            });

            // Atualiza os campos de resumo
            document.getElementById('games_play').innerText = `Jogos: ${totalJogos}`;
            document.getElementById('games_win').innerText = `Vitórias: ${totalVitorias}`;
            document.getElementById('games_loss').innerText = `Derrotas: ${totalDerrotas}`;
            document.getElementById('games_loss').innerText = `Derrotas: ${totalDerrotas}`;
        }
    } catch (error) {
        console.error('Erro ao listar histórico de jogos:', error);
        alert('Erro ao listar histórico de jogos');
    }
}
