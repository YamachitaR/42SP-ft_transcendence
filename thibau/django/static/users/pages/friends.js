function renderUser(user) {
	return `
		<button class="menu-users-link" data-route="/profile/${user.username}">
			<div class="container" data-user-id="${user.id}">
				<img class="users-img" src="${user.photo_url}" alt="profile picture">
				<p class="users-user">${safeText(user.username)}</p>
				<p class="status">${user.status.includes("chat") ? "online" : safeText(user.status)}</p>
			</div>
		</button>
	`;
}


function renderUsersSection(title, users) {
	if (Object.keys(users).length === 0) {
		return `
			<div class="${title.toLowerCase()}">
				<h1>${safeText(title)}</h1>
				<div class="list-empty">
					<img class="no-users-img" src="/static/users/img/empty.png">
					<h4 class="no-users">No ${title.toLowerCase()}</h4>
				</div>
			</div>
		`;
	} else {
		return `
			<div class="${title.toLowerCase()}">
				<h1>${safeText(title)}</h1>
				<div class="list">
					${Object.values(users).map(renderUser).join('')}
				</div>
			</div>
		`;
	}
}


function renderFriendsPage() {
	// Check if the user is authenticated
	fetchAPI('/api/isAuthenticated').then(data => {
		if (!data.isAuthenticated) {
			router.navigate('/sign_in/');
			return;
		}

		// Get the users
		fetchAPI('/api/users').then(dataUsers => {
			// Define categories
			let followed = {};

			for (const user of Object.values(dataUsers.users)) {
				if (user.followed) {
					followed[user.id] = user;
				}
			}

			// Display the HTML
			document.getElementById('app').innerHTML = `
				<div class="friends-screen">
					<div id="status-log" class="status-log">
						${renderUsersSection('Friends', followed)}
					</div>
				</div>
			`;
		});
	});
}