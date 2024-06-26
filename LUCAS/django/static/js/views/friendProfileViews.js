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
                <div class="col-xs-7 col-sm-7 col-md-3 col-lg-4 mt-3 text-center bg-dashboard shadow rounded">
                    <img src="" id="profile_photo" class="img-fluid">
                    <h4 class="bg-dashboard-2 rounded shadow" id="nickname_user">nickname</h4>
						<img id= "status_icon" src="static/img/online.png" class="icon-sm">
                    <br><br>
                    <p class="bg-dashboard-2 rounded shadow" id="games_play">Jogos: 00</p>
                    <p class="bg-dashboard-2 rounded shadow" id="games_win">Vitorias: 00</p>
                    <p class="bg-dashboard-2 rounded shadow" id="games_loss">Derrotas: 00</p> <!-- Corrigir ID duplicado -->
                    <br><br>
                </div>
                <!--Historico-->
                <div class="col-xs-7 col-sm-7 col-md-8 col-lg-7 mt-3 offset-md-1 offset-lg-1 bg-dashboard shadow rounded text-center">
                    <div class="bg-dashboard-2 mb-4 mt-3 mx-2 rounded shadow p-2"><h5>Historico de Jogos</h5></div>
                    <div class="bg-dashboard-2 m-2 shadow rounded"><p>Fulano x Ciclano: 10-1</p></div>
                    <div class="bg-dashboard-2 m-2 shadow rounded"><p>Fulano x Ciclano: 10-1</p></div>
                    <div class="bg-dashboard-2 m-2 shadow rounded"><p>Fulano x Ciclano: 10-1</p></div>
                    <div class="bg-dashboard-2 m-2 shadow rounded"><p>Fulano x Ciclano: 10-1</p></div>
                    <div class="bg-dashboard-2 m-2 shadow rounded"><p>Fulano x Ciclano: 10-1</p></div>
                </div>
            </div>
        </div>
    `;
}
