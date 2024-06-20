export async function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const response = await fetch('/api/check-auth/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    return response.ok;
}

