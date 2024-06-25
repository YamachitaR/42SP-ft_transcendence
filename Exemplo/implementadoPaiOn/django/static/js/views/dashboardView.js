export default function renderLogin() {
    return `
        <div class="conteiner mt-4"></div>
				<!--Header do Dashboard-->
				<div class="row mx-3 mt-4 text-light">
					<div class="col shadow rounded d-flex align-items-center justify-content-center bg-dashboard text-center">
						<h3 class="mt-2" >Dashboard</h4>
					</div>
				</div>

				<div class="row mx-3 mt-4 text-light">
					<!--User Card-->
					<div id="user-info" data-default-image="../../static/img/pf.jpg" class="col-2 text-center bg-dashboard shadow rounded">
						<img id="user-image" class="rounded mt-3 img-fluid">
						<br>
						<h4 class="bg-dashboard-2 rounded shadow" id="user-username">nickname</h4>
						<br><br>
						<p class="bg-dashboard-2 rounded shadow" id="games_play">Games: 00</p>
						<p class="bg-dashboard-2 rounded shadow" id="games_win">Wins: 00</p>
						<br><br>
					</div>
					<!--Historico-->
					<div class="col-6 mx-auto bg-dashboard shadow rounded text-center">
						<div class="bg-dashboard-2 mb-4 mt-3 mx-2 rounded shadow"><h5 class="m-2">Historico de Jogos</h5></div>
						<div class="bg-dashboard-2 m-2 shadow rounded"><p>Fulano x Ciclano: 10-1</p></div>
						<div class="bg-dashboard-2 m-2 shadow rounded"><p>Fulano x Ciclano: 10-1</p></div>
						<div class="bg-dashboard-2 m-2 shadow rounded"><p>Fulano x Ciclano: 10-1</p></div>
						<div class="bg-dashboard-2 m-2 shadow rounded"><p>Fulano x Ciclano: 10-1</p></div>
						<div class="bg-dashboard-2 m-2 shadow rounded"><p>Fulano x Ciclano: 10-1</p></div>
					</div>
					<!--Friends List-->
					<div class="col-3 bg-dashboard shadow rounded text-center">
						<div class="bg-dashboard-2 mb-4 mt-3 mx-2 rounded shadow p-2"><h5>Online Friends</h5></div>
							<!--Linhas Com infos dos amigos-->
							<div class="row bg-dashboard-2 m-2 shadow rounded">
								<div class="col-2"><img src="static/img/user_default.png" id="profile_photo_friend1" class="icon-friend-dash-size"></div>
								<div class="col-8"><p>zezinho_plays</p></div>
								<div class="col-2"><img src="static/img/online.png" id="status_friend" class="icon-friend-dash-size"></div>
							</div>
							<div class="row bg-dashboard-2 m-2 shadow rounded">
								<div class="col-2"><img src="static/img/user_default.png" id="profile_photo_friend1" class="icon-friend-dash-size"></div>
								<div class="col-8"><p>zezinho_plays</p></div>
								<div class="col-2"><img src="static/img/online.png" id="status_friend" class="icon-friend-dash-size"></div>
							</div>
							<div class="row bg-dashboard-2 m-2 shadow rounded">
								<div class="col-2"><img src="static/img/user_default.png" id="profile_photo_friend1" class="icon-friend-dash-size"></div>
								<div class="col-8"><p>zezinho_plays</p></div>
								<div class="col-2"><img src="static/img/offline.png" id="status_friend" class="icon-friend-dash-size"></div>
							</div>
							<div class="row bg-dashboard-2 m-2 shadow rounded">
								<div class="col-2"><img src="static/img/user_default.png" id="profile_photo_friend1" class="icon-friend-dash-size"></div>
								<div class="col-8"><p>zezinho_plays</p></div>
								<div class="col-2"><img src="static/img/online.png" id="status_friend" class="icon-friend-dash-size"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="row mt-4 mb-4 mx-3 bg-dashboard shadow rounded p-2 d-flex justify-content-center align-items-center">
					<div class="col-3"></div>
					<div class="col-2"><button type="button" class="btn-custom w-100 rounded shadow">Friends</button></div>
					<div class="col-2"><button type="button" class="btn-custom w-100 rounded shadow">Play Game</button></div>
					<div class="col-2"><button type="button" class="btn-custom w-100 rounded shadow">My Profile</button></div>
					<div class="col-3"></div>
				</div>
			</div>
    `;
}
