export default function renderLogin() {
    return `
        <div class="conteiner mt-4"></div>

			<!--Header do Dashboard-->
			<div class="row mx-4 mt-4 text-light d-flex align-items-center justify-content-center">
				<div class="col-xs-7 col-sm-8 col-md-7 col-lg-12 shadow rounded d-flex align-items-center justify-content-center bg-dashboard text-center">
					<h3 class="mt-2" >Dashboard</h4>
				</div>
			</div>

			<div class="row mx-4 mt-4 text-light d-flex justify-content-center">

				<!--User Card-->
				<div class="order-1 col-xs-7 col-sm-8 col-md-7 col-lg-2 mt-3 text-center bg-dashboard shadow rounded" id="user-info" data-default-image="../../static/img/pf.jpg">
					<div d-flex align-items-center justify-content-center>
						<img id="user-image" class="rounded mt-3 img-fluid">
					</div>
					<br>
					<h4 class="bg-dashboard-2 rounded shadow" id="user-username">Username</h4>
					<br><br>
					<p class="bg-dashboard-2 rounded shadow" id="games_play">Jogos: 00</p>
					<p class="bg-dashboard-2 rounded shadow" id="games_win">Vitorias: 00</p>
					<p class="bg-dashboard-2 rounded shadow" id="games_win">Derrotas: 00</p>
					<br><br>
				</div>

				<!--Historico-->
				<div class="order-2 col-xs-7 col-sm-8 col-md-7 col-lg-5 offset-lg-1 mt-3 bg-dashboard shadow rounded text-center">
					<div class="bg-dashboard-2 mt-3 mx-2 p-2 rounded shadow">
						<h5>Historico de Jogos</h5>
					</div>
		            <!--Friends List-->
		            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-3 mt-3 bg-dashboard shadow rounded mx-auto text-center">

		                <!--Linhas Com infos dos amigos-->
		                <!-- Container para a lista de amigos -->
		                <div id="lista-amigosDashboard">
		                    <!-- Os amigos serão inseridos aqui -->
		                </div>
		                <!-- Template para os amigos -->
		                <template id="friend-templateDashboard">
		                    <div class="row p-2 bg-dashboard-2 m-3 shadow rounded d-flex align-items-center justify-content-center">
		                        <div class="col-1 d-flex align-items-center justify-content-center">
		                            <img src="static/img/user_default.png" class="icon-friend-dash-size profile-photoDashboard">
		                        </div>
		                        <div class="col-8">
		                            <h5 class="friend-usernameDashboard"></h5>
		                        </div>
		                        <div class="col-1 d-flex align-items-center justify-content-center">
		                            <img src="static/img/online.png" class="icon-sm user-online-status">
		                        </div>
		                    </div>
		                </template>
					</div>

					<!-- Template para os amigos -->
					<template id="friend-templateDashboard">
						<div class="row p-2 bg-dashboard-2 m-3 shadow rounded d-flex align-items-center justify-content-center">

							<div class="col-1 d-flex align-items-center justify-content-center">
								<img src="static/img/user_default.png" class="icon-friend-dash-size profile-photoDashboard">
							</div>

							<div class="col-8">
								<h5 class="friend-usernameDashboard"></h5>
							</div>

							<div class="col-1 d-flex align-items-center justify-content-center">
								<img src="static/img/online.png" class="icon-sm status-iconDashboard">
							</div>
						</div>
					</template>

				</div>

			</div>

		</div>
    `;
}
