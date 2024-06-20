import renderLogin from '../views/login.js';

export function addRegisterFormListener() {
    document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
		const email = event.target.email.value;

        const response = await fetch('/api/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } else {
            alert('Registration failed');
        }
    });
}

export function addLoginButtonListener() {
	document.getElementById('login-button').addEventListener('click', () => {
	        window.location.href = 'http://localhost/';
	});
}
