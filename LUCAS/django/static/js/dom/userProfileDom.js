import { user } from '../crud/user.js';

export function renderUserInfo() {
	document.getElementById('user-id').textContent = user.id;
	document.getElementById('user-username').textContent = user.username;
	document.getElementById('user-email').textContent = user.email;
}
