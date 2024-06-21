import { domBtnRegister, domBtnBackHome } from "./registerDom.js";
import  renderRegister  from "../views/registerViews.js";

export function domBtnLogin() {
    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } else {
            alert('Login failed');
        }
    });
}


export function domBtnCad() {
    document.getElementById('register-button').addEventListener('click', () => {
        document.getElementById('content').innerHTML = renderRegister();
        domBtnRegister();
		domBtnBackHome();
    });
}

export function domBtn42() {
	document.getElementById('login-42-button').addEventListener('click', () => {
	        window.location.href = 'http://localhost/login-external/';
	    });
}
