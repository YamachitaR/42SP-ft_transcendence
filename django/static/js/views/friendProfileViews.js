export default function renderProfileUser() {
    return `
        <div class="conteiner mt-4"></div>
            <!--Titulo da Pagina-->
            <div class="row mt-4 mx-3 bg-dashboard rounded shadow text-light p-2">
                <div class="col-12 mx-auto d-flex align-items-center justify-content-center text-center">
                    <h3 id="user-profile-title">User_x Profile</h3> <!-- Adicionar ID para o título -->
                </div>
            </div>
            <div class="row mt-4 mx-3 text-light">

				<!--User Card-->
				<div class="order-1 col-xs-4 col-sm-5 col-md-4 col-lg-3 mt-3 text-center bg-dashboard shadow rounded" id="user-info" data-default-image="../../static/img/pf.jpg">
					<div d-flex align-items-center justify-content-center>
						<img id="profile_photo" class="rounded mt-3 img-fluid">
					</div>
					<br>
					<h4 class="bg-dashboard-2 rounded shadow" id="nickname_user">Username</h4>
					<img id="status_icon" src="static/img/online.png" class="icon-sm">
					<br><br>
					<p class="bg-dashboard-2 rounded shadow" id="games_play">Jogos: 00</p>
					<p class="bg-dashboard-2 rounded shadow" id="games_win">Vitórias: 00</p>
					<p class="bg-dashboard-2 rounded shadow" id="games_loss">Derrotas: 00</p>
					<br><br>
				</div>

				<!-- Historico -->
				<div class="order-2 col-xs-6 col-sm-6 col-md-7 col-lg-8 offset-sm-1 mt-3 bg-dashboard shadow rounded text-center">
				    <!-- Container para a lista de histórico -->
				    <div id="lista-historicoDashboard">
				        <div class="bg-dashboard-2 mt-3 mx-2 p-2 rounded shadow">
				            <h5>Histórico de Jogos</h5>
				        </div>
				        <br>
				        <!-- Os históricos serão inseridos aqui -->
				    </div>

				    <!-- Template para o histórico -->
				    <template id="historico-templateDashboard">
				        <div class="bg-dashboard-2 m-2 shadow rounded">
				            <p class="historico-item"></p>
				        </div>
				    </template>

				</div>
            </div>
        </div>
    `;
}
