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
            content.innerHTML = `
            <canvas id="canvas" width="800" height="500"></canvas>
        `;
            var canvas = document.getElementById('canvas');
            var game = new PongGame.Game(canvas, 800, 500);
            game.play();
            break;
        case 'ranking':
            content.innerHTML = '<h1 class="display-1">Display 1</h1>';
            break;
        case 'chat':
            content.innerHTML = '<h1>Chat </h1><p> Chat..</p>';
            break;
        default:
            content.innerHTML = '<h1>404 Not Found</h1>';
    }
}
