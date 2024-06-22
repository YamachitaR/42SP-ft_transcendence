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
