document.addEventListener('DOMContentLoaded', () => {
    function navigate(event) {
        event.preventDefault();
        const route = event.target.getAttribute('data-route');
		if (route) {
            handleRoute(route);
        } else {
            console.log('No route found for this element.');
        }
    }

	function handleRoute(route) {
        switch (route) {
            case '/example':
                console.log('Example route clicked.');
                break;
            case '/about':
                console.log('About route clicked.');
                break;
            case '/pong/':
                console.log('Pong route clicked.');
                break;
            default:
                console.log('Unknown route clicked.' + route);
                break;
        }
    }

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', navigate);
    });
});
