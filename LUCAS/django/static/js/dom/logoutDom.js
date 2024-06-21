import { apiLogout } from '../api/api.js';

export async function logout() {
    const token = localStorage.getItem('token');
    if (token) {

        const response = await apiLogout(token);

        if (response.ok) {
            localStorage.removeItem('token');
            console.log('Logout bem-sucedido');
			window.location.href = '/';
        } else {
            alert('Logout falhou');
        }
    }
}
