import { apiBuscarUsuario, apiListarAmigos, apiEnviarSolicitacaoAmizade, apiListarSolicitacoesPendentes, apiAprovarSolicitacaoAmizade, apiListarSolicitacoesEnviadas, apiExcluirSolicitacaoAmizade } from "../apis.js";
const token = localStorage.getItem('token');

export async function carregarSolicitacoesPendentes() {
    const token = localStorage.getItem('token');

    try {
        console.log('Chamando API para listar solicitações pendentes');
        const solicitacoesPendentesData = await apiListarSolicitacoesPendentes(token);
        console.log('Dados recebidos da API:', solicitacoesPendentesData);

        const solicitacoesPendentesList = document.getElementById('solicitacoes-pendentes');
        solicitacoesPendentesList.innerHTML = '';

        if (!Array.isArray(solicitacoesPendentesData) || solicitacoesPendentesData.length === 0) {
            solicitacoesPendentesList.innerHTML = '<li>Não há solicitações pendentes</li>';
        } else {
            solicitacoesPendentesData.forEach(solicitacao => {
                const li = document.createElement('li');
                li.style.display = 'flex';
                li.style.alignItems = 'center';
                li.style.justifyContent = 'space-between';

                const textSpan = document.createElement('span');
                textSpan.textContent = `${solicitacao.user.username} (${solicitacao.user.email})`;
                textSpan.style.flexGrow = 1;

                const approveButton = document.createElement('button');
                approveButton.textContent = 'Confirmar';
                approveButton.className = 'btn btn-confirmar';
                approveButton.onclick = async () => {
                    try {
                        const approveResponse = await apiAprovarSolicitacaoAmizade(solicitacao.id, token);
                        if (approveResponse.message) {
                            alert(approveResponse.message);
                            carregarSolicitacoesPendentes(); // Atualiza a lista após aprovar a solicitação
                            carregarListaAmigos(); // Atualiza a lista de amigos após aprovação
                        } else {
                            alert('Erro ao aprovar solicitação de amizade');
                        }
                    } catch (error) {
                        console.error('Erro ao aprovar solicitação de amizade:', error);
                        alert('Erro ao aprovar solicitação de amizade');
                    }
                };

                const excluirButton = document.createElement('button');
                excluirButton.textContent = 'Excluir';
                excluirButton.className = 'btn btn-excluir';
                excluirButton.onclick = async () => {
                    try {
                        const excluirResponse = await apiAprovarSolicitacaoAmizade(solicitacao.id, token);
                        if (excluirResponse.message) {
                            alert(excluirResponse.message);
                            carregarSolicitacoesPendentes(); // Atualiza a lista após aprovar a solicitação
                            carregarListaAmigos(); // Atualiza a lista de amigos após aprovação
                        } else {
                            alert('Erro ao excluir solicitação de amizade');
                        }
                    } catch (error) {
                        console.error('Erro ao excluir solicitação de amizade:', error);
                        alert('Erro ao excluir solicitação de amizade');
                    }
                };

                li.appendChild(textSpan);
                li.appendChild(approveButton);
                li.appendChild(excluirButton);
                solicitacoesPendentesList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Erro ao listar solicitações de amizade pendentes:', error);
        alert('Erro ao listar solicitações de amizade pendentes');
    }
}

export async function carregarSolicitacoesEnviadas() {
    const token = localStorage.getItem('token');

    try {
        console.log('Chamando API para listar solicitações enviadas');
        const solicitacoesEnviadasData = await apiListarSolicitacoesEnviadas(token);
        console.log('Dados recebidos da API:', solicitacoesEnviadasData);

        const solicitacoesEnviadasList = document.getElementById('solicitacoes-enviadas');
        solicitacoesEnviadasList.innerHTML = '';

        if (!Array.isArray(solicitacoesEnviadasData) || solicitacoesEnviadasData.length === 0) {
            solicitacoesEnviadasList.innerHTML = '<li>Não há solicitações enviadas</li>';
        } else {
            solicitacoesEnviadasData.forEach(solicitacao => {
                const li = document.createElement('li');
                li.textContent = `${solicitacao.amigo.username} (${solicitacao.amigo.email})`;
                solicitacoesEnviadasList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Erro ao listar solicitações de amizade enviadas:', error);
        alert('Erro ao listar solicitações de amizade enviadas');
    }
}

export async function carregarListaAmigos() {
    const token = localStorage.getItem('token');

    try {
        console.log('Chamando API para listar amigos');
        const amigosData = await apiListarAmigos(token);
        console.log('Dados recebidos da API - Listar Amigos:', amigosData);

        const listaAmigos = document.getElementById('lista-amigos');
        listaAmigos.innerHTML = '';

        if (!Array.isArray(amigosData) || amigosData.length === 0) {
            listaAmigos.innerHTML = '<div class="mt-3 mb-3 text-center">Você ainda não tem amigos</div>';
        } else {
            const friendTemplate = document.getElementById('friend-template').content;

            amigosData.forEach(amigo => {
                const friendClone = document.importNode(friendTemplate, true);
                friendClone.querySelector('.profile-photo').src = amigo.profile_image || 'static/img/user_default.png';
                friendClone.querySelector('.friend-username').textContent = amigo.username;
                friendClone.querySelector('.status-icon').src = amigo.is_online ? 'static/img/online.png' : 'static/img/offline.png';

                friendClone.querySelector('.profile-btn').addEventListener('click', () => {
                    // Função para ver perfil
                    viewProfile(amigo.id);
                });
                friendClone.querySelector('.delete-btn').addEventListener('click', () => {
                    // Função para deletar amigo
                    deleteFriend(amigo.id);
                });

                listaAmigos.appendChild(friendClone);
            });

            document.getElementById('total-amigos').textContent = amigosData.length;
        }
    } catch (error) {
        console.error('Erro ao listar amigos:', error);
        alert('Erro ao listar amigos');
    }
}

function viewProfile(friendId) {
    console.log('Visualizando perfil do amigo ID:', friendId);
}

function deleteFriend(friendId) {
    console.log('Deletando amigo ID:', friendId);
	apiExcluirSolicitacaoAmizade(friendId, token);
}


export function domBtnBuscarAmigos() {
    document.getElementById('buscar-amigos-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const nickname = event.target.nickname.value;
        try {
            console.log('Chamando API para buscar usuário:', nickname);
            const response = await apiBuscarUsuario(nickname, token);
            console.log('Resposta da API para buscar usuário:', response);

            if (response.ok) {
                const data = await response.json();
                console.log('Dados do usuário recebidos da API:', data);
                const userId = data.id;

                const enviarSolicitacaoBtn = document.getElementById('enviar-solicitacao-btn');
                enviarSolicitacaoBtn.style.display = 'block';

                enviarSolicitacaoBtn.onclick = async () => {
                    try {
                        console.log('Enviando solicitação de amizade para usuário ID:', userId);
                        const solicitacaoResponse = await apiEnviarSolicitacaoAmizade(userId, token);
                        console.log('Resposta da API para enviar solicitação de amizade:', solicitacaoResponse);

                        if (solicitacaoResponse.ok) {
                            const solicitacaoData = await solicitacaoResponse.json();
                            alert(solicitacaoData.message);
                            carregarSolicitacoesPendentes(); // Atualiza a lista após enviar a solicitação
                        } else {
                            alert('Erro ao enviar solicitação de amizade');
                        }
                    } catch (error) {
                        console.error('Erro ao enviar solicitação de amizade:', error);
                        alert('Erro ao enviar solicitação de amizade');
                    }
                };
			}
            else {
                alert('Usuário não encontrado');
            }
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            alert('Erro ao buscar usuário');
        }
    });
}