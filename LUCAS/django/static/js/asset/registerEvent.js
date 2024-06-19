import renderLogin from '../views/login.js';
import { addLoginFormListener } from './loginEvent.js';

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

    // document.getElementById('login-button').addEventListener('click', () => {
    //     document.getElementById('content').innerHTML = renderLogin();
    //     addLoginFormListener();
    //     addRegisterButtonListener();
    // });
}

export function addLoginButtonListener() {
    document.getElementById('login-button').addEventListener('click', () => {
        document.getElementById('content').innerHTML = renderLogin();
        addLoginFormListener();
        addRegisterButtonListener();
    });
}
