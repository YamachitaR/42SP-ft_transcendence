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

export async function getGamePreferencesData() {

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token de autenticação não encontrado.');
        return Promise.reject(new Error('Token de autenticação não encontrado.'));
    }

    try {
        const response = await fetch('/api/user-preferences/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar as preferências do usuário: ' + response.statusText);
        }

        const data = await response.json();
        return data; // Retorna os dados das preferências do usuário
    } catch (error) {
        console.error(error.message);
        return Promise.reject(error); // Rejeita a Promise com o erro
    }
}

export async function getGamePreferences() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token de autenticação não encontrado.');
        return;
    }

    try {
        const response = await fetch('/api/user-preferences/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao carregar as preferências do usuário: ' + response.statusText);
        }
        let data = userPreferences;
        data = await response.json();
    } catch (error) {
        console.error(error.message);
    }
}
