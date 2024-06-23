document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();

    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch('/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                checkLoginStatus();
            } else {
                alert('Login failed');
            }
        });
    });

    document.getElementById('register-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        fetch('/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful');
                document.getElementById('login-tab').click();
            } else {
                alert('Registration failed: ' + data.error);
            }
        });
    });

    document.getElementById('logout-button').addEventListener('click', function() {
        fetch('/logout/')
        .then(() => {
            checkLoginStatus();
        });
    });
});

function checkLoginStatus() {
    fetch('/check_login/')
    .then(response => response.json())
    .then(data => {
        if (data.authenticated) {
            document.getElementById('user-info').innerText = `in as ${data.email}`;
            document.getElementById('user-info').style.display = 'block';
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('logout').style.display = 'block';
        } else {
            document.getElementById('user-info').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'block';
            document.getElementById('logout').style.display = 'none';
        }
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
