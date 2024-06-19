import { checkAuth } from './asset/auth.js';
import { logout } from './asset/logout.js';
import { renderPong } from './views/pong.js';
import renderLogin from './views/login.js';

document.addEventListener('DOMContentLoaded', async () => {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
        console.log('Usuário está autenticado');
		document.getElementById('nav-buttons').style.display = 'block';
        document.getElementById('content').innerHTML = '<h1>Welcome to the Main Page</h1>';
    } else {
        console.log('Usuário não está autenticado');
		document.getElementById('nav-buttons').style.display = 'none';
		document.getElementById('content').innerHTML = renderLogin();
        addLoginFormListener();
    }

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', handleButtonClick);
    });
});

function handleButtonClick(event) {
    event.preventDefault();
    const route = event.target.getAttribute('data-route');
    let content = '';

    switch (route) {
        case '/pong/':
            content = renderPong();
            break;
        case '/logout/':
            logout();
            window.location.href = '/';
            addLoginFormListener(); // Adicionar o listener para o formulário de login após o logout
            break;
        default:
            content = '<h1>Welcome to the Main Page</h1>';
            break;
    }
    document.getElementById('content').innerHTML = content;
}

function addLoginFormListener() {
    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = '/'; // Recarregar a página para refletir o estado autenticado
        } else {
            alert('Login failed');
        }
    });
}
