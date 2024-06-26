import { fetchUserProfileById } from '../apis.js';

export async function initProfileUser(params) {
    const userId = params.id;
    const token = localStorage.getItem('token'); // Obter o token do localStorage

    const userProfile = await fetchUserProfileById(userId, token);

	debugger;
    if (userProfile) {
		console.log(userProfile);
        document.getElementById('profile_photo').src = userProfile.image || 'static/img/pf.jpg';
        document.getElementById('nickname_user').textContent = userProfile.nome;
        document.getElementById('user-profile-title').textContent = `${userProfile.nome} Profile`;
		document.getElementById('status_icon').src = userProfile.is_online ? 'static/img/online.png' : 'static/img/offline.png';
	}
}
