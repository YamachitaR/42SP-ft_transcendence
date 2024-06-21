import { apiUserInfo } from "../apis.js";

export let user = null;

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
