import { fetchUserProfileById } from '../apis.js';
import { apiListarHistoricoJogo } from '../apis.js';
import { token } from '../main.js';

export async function initProfileUser(params) {
    const userId = params.id;
    const token = localStorage.getItem('token'); // Obter o token do localStorage
    const userProfile = await fetchUserProfileById(userId, token);

    if (userProfile) {
		console.log(userProfile);
        document.getElementById('profile_photo').src = userProfile.image || 'static/img/pf.jpg';
        document.getElementById('nickname_user').textContent = userProfile.nome;
        document.getElementById('user-profile-title').textContent = `${userProfile.nome} Profile`;
		document.getElementById('status_icon').src = userProfile.is_online ? 'static/img/online.png' : 'static/img/offline.png';
	}

	carregarHistoricoJogos(userProfile.id);
}



export async function carregarHistoricoJogos(id) {
    try {
        console.log('Chamando API para listar histórico de jogos');
        const historicoJogos = await apiListarHistoricoJogo(id, token);
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
                historicoClone.querySelector('.historico-item').textContent = `(${jogo.result})    ${jogo.description}    ${jogo.score}    ${jogo.game}`;
                listaHistorico.appendChild(historicoClone);
            });

            // Atualiza os campos de resumo
            document.getElementById('games_play').innerText = `Jogos: ${totalJogos}`;
            document.getElementById('games_win').innerText = `Vitórias: ${totalVitorias}`;
            document.getElementById('games_loss').innerText = `Derrotas: ${totalDerrotas}`;
        }
    } catch (error) {
        console.error('Erro ao listar histórico de jogos:', error);
        alert('Erro ao listar histórico de jogos');
    }
}
