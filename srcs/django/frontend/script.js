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
        case 'features':
            content.innerHTML = '<h1>Features</h1><p>List of features...</p>';
            break;
        case 'pricing':
            content.innerHTML = '<h1>Pricing</h1><p>Pricing details...</p>';
            break;
        default:
            content.innerHTML = '<h1>404 Not Found</h1>';
    }
}
