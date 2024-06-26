//instruções das api´s utilizadas no projeto

// curl -X POST \
//      -H "Content-Type: application/json" \
//      -d '{"email": "seu_email@example.com", "password": "sua_senha"}' \
//      http://localhost/api/login/
//
// retorno se positivo - Object { token: "1c3432fc61d9769eea1e7512aac72a65185e2caf" }

export async function apiLogin(email, password) {
    const response = await fetch('/api/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return await response;
}

// curl -X POST \
//      -H "Content-Type: application/json" \
//      -H "Authorization: Token SEU_TOKEN" \
//      http://localhost/api/logout/
//

export async function apiLogout(token) {
	const response = await fetch('/api/logout/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${token}`
		}
	});
	return await response;
}


// curl -X POST http://localhost/api/signup/ \
// -H "Content-Type: application/json" \
// -d '{
//   "username": "seu_username",
//   "email": "seu_email",
//   "password": "sua_senha"
// }'


// curl -X POST http://localhost:8000/api/signup/ \
//     -H "Content-Type: multipart/form-data" \
//     -F "username=testeuser" \
//     -F "email=testeuser@example.com" \
//     -F "password=123456" \
//     -F "image=@/caminho/para/sua/imagem.jpg"



export async function apiSignup(username, email, password) {
	const response = await fetch('/api/signup/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, email, password })
	});
	return await response;
}


// curl -X GET http://localhost/api/get-user-info/ \
//      -H "Authorization: Token your_token_here"

export async function apiUserInfo(token) {
    const url = '/api/get-user-info/';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return fetch(url, options);
}

export async function apiPreferencesInfo(token) {
    const url = '/api/user-preferences/';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    };

    return fetch(url, options);
}

// % curl -X PUT http://localhost:8000/api/update-user/ \
// -H "Authorization: Token 420b23dcc80960c9ee6920dff59a86b2ba6da8c5" \
// -H "Content-Type: application/json" \
// -d '{
//   "username": "Lucas",
//   "email": "mail@example.com"
// }'

// {"id": 2, "username": "Lucas", "email": "mail@example.com", "image": "/media/profile_images/logo.png"}%









// % curl -X PUT http://localhost:8000/api/user-preferences/ \
// -H "Authorization: Token 724fbf6d8d4dd99eff614d6a3fd72a33d3876012" \
// -H "Content-Type: application/json" \
// -d '{
// 	  "preference1": "value1",
// 	  "preference2": "true"
// 	}'


// {"id":1,"preference1":"value1","preference2":"true","preference3":null,"preference4":null,"preference5":false,"user":2}%







// curl -X GET http://localhost:8000/api/user-preferences/ \
// -H "Authorization: Token 724fbf6d8d4dd99eff614d6a3fd72a33d3876012"

// {"id":1,"preference1":"va2","preference2":"tr","preference3":null,"preference4":null,"preference5":false,"user":2}%





// curl -X POST http://localhost:8000/api/amizades/ \
//     -H "Authorization: Token 130c67d8f66dfe4040ae2574c231b1ab51e5e53a" \
//     -H "Content-Type: application/json" \
//     -d '{"amigo_id": 2}'
// {"id":2,"user":3,"amigo":2,"criado_em":"2024-06-23T07:08:36.938181-03:00"}


// PRIMEIRO ARGUMENTO É O ID DA SOLICITAÇÃO DE AMIZADE DEPOIS A AÇÃO
// curl -X POST http://localhost:8000/api/amizades/1/aceitar/ \
//     -H "Authorization: Token 5c05849940e785755f469adca6778cf26e0de1e9"
// {"status":"Amizade aceita"}%

// PRIMEIRO ARGUMENTO É O ID DA SOLICITAÇÃO DE AMIZADE DEPOIS A AÇÃO
// curl -X POST http://localhost:8000/api/amizades/1/recusar/ \
//     -H "Authorization: Token 5c05849940e785755f469adca6778cf26e0de1e9"
// {"status":"Amizade recusada"}%


// curl -X GET http://localhost:8000/amizades/pendentes/ \
// -H "Authorization: Token 5c05849940e785755f469adca6778cf26e0de1e9"
// // {"id":2,"user":3,"amigo":2,"criado_em":"2024-06-23T07:08:36.938181-03:00"}


// % curl -X GET http://localhost:8000/api/amizades/amigos/ \
// -H "Authorization: Token 130c67d8f66dfe4040ae2574c231b1ab51e5e53a "
// [{"id":2,"name":"2","email":"2@2.com"}]%



// % curl -X GET http://localhost:8000/api/usuarios/ \
// -H "Authorization: Token 5c05849940e785755f469adca6778cf26e0de1e9"
// [{"id":1,"email":"1@1.com","username":"1","first_name":"","last_name":"","profile_image":null},{"id":2,"email":"2@2.com","username":"2","first_name":"","last_name":"","profile_image":null},{"id":3,"email":"3@3.com","username":"3","first_name":"","last_name":"","profile_image":null}]%

//ide do usuario se é amigo e ou não
// curl -X GET http://localhost:8000/amizades/verificar/3/ \
//     -H "Authorization: Token 5c05849940e785755f469adca6778cf26e0de1e9"
// {"amizade":true}%

export async function apiBuscarUsuario(nickname, token) {
    const response = await fetch('/api/usuarios/buscar-id/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ username: nickname })
    });
    return await response;
}

export async function apiListarAmigos(token) {
    const response = await fetch('/api/amizades/amigos/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    return await response.json();
}

export async function apiListarAmigosOnLine(token) {
    const response = await fetch('/api/amigos/online/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    return await response.json();
}



export async function apiEnviarSolicitacaoAmizade(amigoId, token) {
    const response = await fetch('/api/amizades/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ amigo_id: amigoId })
    });
    return await response.json();
}


export async function apiListarSolicitacoesPendentes(token) {
    const response = await fetch('/api/amizades/pendentes/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    return response.json();
}

export async function apiAprovarSolicitacaoAmizade(solicitacaoId, token) {
    const response = await fetch('/api/amizades/aprovar/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ solicitacao_id: solicitacaoId })
    });
    return response.json();
}

export async function apiExcluirSolicitacaoAmizade(solicitacaoId, token) {
    const response = await fetch('/api/amizades/rejeitar/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ solicitacao_id: solicitacaoId })
    });
    return response.json();
}


export async function apiListarSolicitacoesEnviadas(token) {
    const response = await fetch('/api/amizades/enviadas/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    return response.json();
}


// curl -X POST http://localhost:8000/excluir_amizade/ \
// -H "Authorization: Token SEU_TOKEN" \
// -H "Content-Type: application/json" \
// -d '{"amigo_id": 123}'

export async function apiExcluirAmizade(amigoId, token) {
    const response = await fetch('/api/excluir_amizade/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ amigo_id: amigoId })
    });
    return response.json();
}

export async function fetchUserProfileById(userId, token) {
    const response = await fetch(`/api/user-info/${userId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });
    if (!response.ok) {
        console.error('Erro ao buscar o perfil do usuário:', response.statusText);
        return null;
    }
    return response.json();
}



// % curl -X POST http://127.0.0.1:8000/api/game-history/ \
// -H "Authorization: Token 0e9f8323a37b6d87fd10c765370fdc94e6e3fc4a" \
// -H "Content-Type: application/json" \
// -d '{
// 	"game": "classic",
// 	"description": "Lucasmar x Ricardo",
// 	"score": "5-2",
// 	 "result": "win"
// }'
// {"id":2,"user":2,"game":"classic","description":"Lucasmar x Ricardo","score":"5-2","result":"win","date":"2024-06-26T23:28:56.210115-03:00"}%


// const jogo = 'classic';
// const descricao = 'lucasmar x ricado';
// const placar = '2-1';
// const resultado = 'win'; // ou 'loss', 'draw'
// const token = 'seu_token_aqui';

// apiCriarHistoricoJogo(jogo, descricao, placar, resultado, token)
//     .then(data => {
//         console.log('Histórico de jogo criado com sucesso:', data);
//     })
//     .catch(error => {
//         console.error('Erro ao criar histórico de jogo:', error);
//     });


export async function apiCriarHistoricoJogo(jogo, descricao, placar, resultado, token) {
    const response = await fetch('/api/game-history/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            game: jogo,
            description: descricao,
            score: placar,
            result: resultado
        })
    });

    return response.json();
}



// curl -X GET http://127.0.0.1:8000/game-history/user/1/ \
//     -H "Authorization: Token seu_token_aqui"

// const userId = 1;  // Substitua pelo ID do usuário real
// const token = 'seu_token_aqui';

// apiListarHistoricoJogoPorUsuario(userId, token)
//     .then(data => {
//         console.log('Histórico de jogo do usuário:', data);
//     })
//     .catch(error => {
//         console.error('Erro ao listar histórico de jogo:', error);
//     });


export async function apiListarHistoricoJogo(userId, token) {
    const response = await fetch(`/api/game-history-list/${userId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    });

    return response.json();
}

export async function apiVerificarBloqueio(userId, token) {
    const response = await fetch(`/api/verificar_bloqueio/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
		body: JSON.stringify({ amigo_id: userId })
    });
    return response.json();
}

export async function apiBloquearAmigo(amigoId, token) {
    const response = await fetch('/api/bloquear_amigo/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amigo_id: amigoId })
    });

    if (!response.ok) {
        throw new Error('Erro ao bloquear amigo');
    }

    return await response.json();
}

export async function apiDesbloquearAmigo(amigoId, token) {
    const response = await fetch('/api/desbloquear_amigo/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amigo_id: amigoId })
    });

    if (!response.ok) {
        throw new Error('Erro ao desbloquear amigo');
    }

    return await response.json();
}
