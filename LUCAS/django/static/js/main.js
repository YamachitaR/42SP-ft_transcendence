import routes from './routes.js';
import { fetchUserInfo } from './crud/user.js';

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

export let token = null;

function checkAndStoreToken() {
    token = getQueryParameter('token');
    if (token) {
        localStorage.setItem('token', token);
        window.location.href = '/';
    }
}

export async function checkAuth() {
    token = localStorage.getItem('token');
    if (!token) return false;

    const response = await fetch('/api/check-auth/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    return response.ok;
}

function loadPage(route, params = {}) {
    const routeConfig = routes[route] || routes['/'];
    document.getElementById('content').innerHTML = routeConfig.template;
    if (routeConfig.init) {
        routeConfig.init(params);
    }
}

function handleHashChange() {
    const hash = window.location.hash.slice(1); // Remove o caractere #
    loadPage(hash);
}

document.addEventListener('DOMContentLoaded', async () => {
    checkAndStoreToken();
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
        console.log('Usuário está autenticado');
        document.getElementById('nav-buttons').style.display = 'block';
        await fetchUserInfo();
        handleHashChange();
    } else {
        console.log('Usuário não está autenticado');
        window.location.hash = '#/login/';
        handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', handleButtonClick);
    });
});

function handleButtonClick(event) {
    event.preventDefault();
    const route = event.target.getAttribute('data-route');
    navigateTo(route);
}

function navigateTo(route, params = {}) {
    window.history.pushState(params, '', `#${route}`);
    loadPage(route, params);
}

export { navigateTo };
