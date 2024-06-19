export async function logout() {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch('/api/logout/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        if (response.ok) {
            localStorage.removeItem('token');
            console.log('Logout bem-sucedido');
        } else {
            alert('Logout falhou');
        }
    }
}
