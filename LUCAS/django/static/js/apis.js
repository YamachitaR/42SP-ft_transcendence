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
