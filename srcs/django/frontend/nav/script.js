// myapp/static/scripts.js

document.addEventListener('DOMContentLoaded', function () {
    loadPage('home'); // Load the home page by default
});

function loadPage(page) {
    const content = document.getElementById('content');
    switch (page) {
        case 'home':
            fetch('/api/home/')
                .then(response => response.json())
                .then(data => {
                    content.innerHTML = `<h1>${data.message}</h1>`;
                });
            break;
        case 'game':
            content.innerHTML = '<h1>Criar o jogo.</h1>';
            break;
        case 'ranking':
            content.innerHTML = '<h1>Ranking</h1><p>Ranking details...</p>';
            break;
        default:
            content.innerHTML = '<h1>404 Not Found</h1>';
    }
}
