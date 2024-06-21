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


// curl -X POST http://localhost:8000/api/users/ \
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
