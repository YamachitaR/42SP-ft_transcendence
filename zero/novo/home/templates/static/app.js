document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    
    const navigateTo = (url) => {
        history.pushState(null, null, url);
        renderContent();
    };
    
    const renderContent = () => {
        const path = window.location.hash.slice(1).toLowerCase() || '/';
        app.innerHTML = routes[path] || '<h1>404 Page Not Found</h1><p>The page you are looking for does not exist.</p>';
    };
    
    window.addEventListener('popstate', renderContent);
    
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    renderContent();
});
