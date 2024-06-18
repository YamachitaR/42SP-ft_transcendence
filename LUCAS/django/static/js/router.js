import { renderPong } from './views/pong.js';
import renderLogin from './views/login.js';

document.addEventListener('DOMContentLoaded', () => {
    async function checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) return false;

        const response = await fetch('/api/check-auth/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        return response.ok;
    }

    async function loadPage(route) {
        const isAuthenticated = await checkAuth();

        if (!isAuthenticated) {
            document.getElementById('content').innerHTML = renderLogin();
            document.getElementById('login-form').addEventListener('submit', async (event) => {
                event.preventDefault();
                const username = event.target.username.value;
                const password = event.target.password.value;

                const response = await fetch('/api/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    window.location.href = '/'; // Reload the page to reflect the authenticated state
                } else {
                    alert('Login failed');
                }
            });
            return;
        }

        // Load authenticated content
        let content = '';
        switch (route) {
            case '/pong/':
                content = renderPong();
                break;
            // Add more routes as needed
            default:
                content = '<h1>Welcome to the Main Page</h1>';
                break;
        }
        document.getElementById('content').innerHTML = content;
    }

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const route = event.target.getAttribute('data-route');
            loadPage(route);
        });
    });

    // Load the initial page
    loadPage(window.location.pathname);
});
