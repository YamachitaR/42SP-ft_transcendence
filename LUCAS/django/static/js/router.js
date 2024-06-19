import { checkAuth } from './asset/auth.js';
import { logout } from './asset/logout.js';
import { renderPong } from './views/pong.js';
import renderLogin from './views/login.js';
import renderRegister from './views/register.js';
import { addLoginFormListener } from './asset/loginEvent.js';
import { addRegisterFormListener, addLoginButtonListener } from './asset/registerEvent.js';

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
        addRegisterButtonListener();
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
            break;
        default:
            content = '<h1>Welcome to the Main Page</h1>';
            break;
    }
    document.getElementById('content').innerHTML = content;
}

function addRegisterButtonListener() {
    document.getElementById('register-button').addEventListener('click', () => {
        document.getElementById('content').innerHTML = renderRegister();
        addRegisterFormListener();
        addLoginButtonListener();
    });
}
