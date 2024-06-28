import { apiUserInfo } from "../apis.js";

export let user = null;
export let userPreferences = null;

export async function fetchUserInfo() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            let response = await apiUserInfo(token);
            if (response.ok) {
                const data = await response.json();
                user = data;
                console.log("User info loaded", user);
            } else {
                const errorData = await response.json();
                console.error('Failed to load user info', errorData);
                alert('Failed to load user info');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.warn('No token found in localStorage');
    }
}

export async function getGamePreferences() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
    }

    await fetch('/api/user-preferences/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        userPreferences = data;
    })
    .catch(error => {
        console.error('Erro ao carregar as preferências do usuário:', error);
    });
}