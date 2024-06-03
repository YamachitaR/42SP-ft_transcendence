document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const routes = {
        '#home': `
            <div class="jumbotron">
                <h1 class="display-4">Home</h1>
                <p class="lead">Welcome to the home page!</p>
                <hr class="my-4">
                <p>This is a simple SPA example using Bootstrap.</p>
            </div>`,
        '#about': `
            <div class="jumbotron">
                <h1 class="display-4">About</h1>
                <p class="lead">This is the about page.</p>
                <hr class="my-4">
                <p>More information about this SPA.</p>
            </div>`,
        '#contact': `
            <div class="jumbotron">
                <h1 class="display-4">Contact</h1>
                <p class="lead">Get in touch with us.</p>
                <hr class="my-4">
                <p>Fill out the form to reach us.</p>
            </div>`,
    };

    function navigate() {
        const hash = window.location.hash || '#home';
        app.innerHTML = routes[hash] || '<h1>404</h1><p>Page not found</p>';
    }

    window.addEventListener('hashchange', navigate);

    navigate(); // initial navigation
});
