export default function renderBuscarAmigos() {
    return `
        <!--Header do Dashboard-->
        <div class="row mx-3 mt-4 text-light">
		 	<link rel="stylesheet" href="static/css/userprofile.css">
            <div class="col shadow rounded bg-dashboard text-center">
                <h4 class="m-3">Lista de Amigos</h4>
            </div>
        </div>

        <!--Linha com lista de amigos e buscador-->
        <div class="row mx-3 mt-4 text-light">

            <!--Friends List-->
            <div class="col-7 bg-dashboard shadow rounded mx-auto text-center">
                <!--Linhas Com infos dos amigos-->
                <div class="row p-2 bg-dashboard-2 m-3 shadow rounded d-flex align-items-center justify-content-center">
                    <div class="col-1  d-flex align-items-center justify-content-center"><img src="static/img/user_default.png" id="profile_photo_friend1" class="icon-friend-dash-size"></div>
                    <div class="col-8"><h5>el_tigrinho</h5></div>
                    <div class="col-1 d-flex align-items-center justify-content-center"><img src="static/img/online.png" id="" class="icon-sm"></div>
                    <div class="col-2 d-flex align-items-center justify-content-center">
                        <button class="btn-custom rounded shadow d-flex align-items-center justify-content-center">
                            <img src="static/img/profile.png" id="" class="icon-sm">
                        </button>
                        <button class="btn-custom rounded shadow d-flex align-items-center justify-content-center">
                            <img src="static/img/delete_friend.png" id="" class="icon-sm">
                        </button>
                    </div>
                </div>
                <!--Linhas Com infos dos amigos-->
                <div class="row p-2 bg-dashboard-2 m-3 shadow rounded d-flex align-items-center justify-content-center">
                    <div class="col-1  d-flex align-items-center justify-content-center"><img src="static/img/user_default.png" id="profile_photo_friend1" class="icon-friend-dash-size"></div>
                    <div class="col-8"><h5>el_tigrinho</h5></div>
                    <div class="col-1 d-flex align-items-center justify-content-center"><img src="static/img/online.png" id="" class="icon-sm"></div>
                    <div class="col-2 d-flex align-items-center justify-content-center">
                        <button class="btn-custom rounded shadow d-flex align-items-center justify-content-center">
                            <img src="static/img/profile.png" id="" class="icon-sm">
                        </button>
                        <button class="btn-custom rounded shadow d-flex align-items-center justify-content-center">
                            <img src="static/img/delete_friend.png" id="" class="icon-sm">
                        </button>
                    </div>
                </div>
                <!--Linhas Com infos dos amigos-->
                <div class="row p-2 bg-dashboard-2 m-3 shadow rounded d-flex align-items-center justify-content-center">
                    <div class="col-1  d-flex align-items-center justify-content-center"><img src="static/img/user_default.png" id="profile_photo_friend1" class="icon-friend-dash-size"></div>
                    <div class="col-8"><h5>el_tigrinho</h5></div>
                    <div class="col-1 d-flex align-items-center justify-content-center"><img src="static/img/online.png" id="" class="icon-sm"></div>
                    <div class="col-2 d-flex align-items-center justify-content-center">
                        <button class="btn-custom rounded shadow d-flex align-items-center justify-content-center">
                            <img src="static/img/profile.png" id="" class="icon-sm">
                        </button>
                        <button class="btn-custom rounded shadow d-flex align-items-center justify-content-center">
                            <img src="static/img/delete_friend.png" id="" class="icon-sm">
                        </button>
                    </div>
                </div>
                <!--Linhas Com infos dos amigos-->
                <div class="row p-2 bg-dashboard-2 m-3 shadow rounded d-flex align-items-center justify-content-center">
                    <div class="col-1  d-flex align-items-center justify-content-center"><img src="static/img/user_default.png" id="profile_photo_friend1" class="icon-friend-dash-size"></div>
                    <div class="col-8"><h5>el_tigrinho</h5></div>
                    <div class="col-1 d-flex align-items-center justify-content-center"><img src="static/img/online.png" id="" class="icon-sm"></div>
                    <div class="col-2 d-flex align-items-center justify-content-center">
                        <button class="btn-custom rounded shadow d-flex align-items-center justify-content-center">
                            <img src="static/img/profile.png" id="" class="icon-sm">
                        </button>
                        <button class="btn-custom rounded shadow d-flex align-items-center justify-content-center">
                            <img src="static/img/delete_friend.png" id="" class="icon-sm">
                        </button>
                    </div>
                </div>
            </div>

            <!--Buscar Amigos-->
            <div class="col-4 bg-dashboard shadow rounded mx-auto ">
                <!--Titulo da caixa-->
                <div class="bg-dashboard-2 p-2 m-3 rounded text-center text-light shadow d-flex align-items-center justify-content-center">
                    <h3 class="">Buscar Amigos</h3>
                </div>
                <!--Formulario-->
                <div class="bg-dashboard-2 p-2 m-3 shadow rounded d-flex align-items-center justify-content-center">
                    <form class="w-100 p-4" id="buscar-amigos-form">
                        <div class="mt-3 mb-3">
                            <label for="nickname" class="form-label">Nickname</label>
                            <input type="text" class="form-control" id="nickname" name="nickname" required>
                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-3">
                            <button type="submit" class="btn-custom-nocolor w-100 shadow bg-dashboard rounded">Buscar</button>
                        </div>
                    </form>
                </div>
                <!--Solicitar amigos-->
                <div class="m-3 d-flex align-items-center justify-content-center">
                    <button id="enviar-solicitacao-btn" class="w-100 btn-custom-nocolor bg-dashboard-2 rounded" style="display: none;">Enviar Solicitação de Amizade</button>
                <!--Solicitações pendentes-->
                <div class="m-3 p-2 rounded bg-dashboard-2">
                    <h4>Solicitações de Amizade</h4>
                    <ul id="solicitacoes-pendentes"></ul>
                </div>
				<!--Solicitações pendentes-->
                <div class="m-3 p-2 rounded bg-dashboard-2">
                    <h4>Solicitações Enviadas</h4>
                    <ul id="solicitacoes-enviadas"></ul>
                </div>
                <!--lista de amigos  Excluir -->
                <div class="m-3 p-2 rounded bg-dashboard-2">
                    <h4 >Amigos</h4>
                    <ul id="lista-amigos"></ul>
                </div>
                <br>
            </div>
        </div>
        <!--Barra com função de adicionar novos amigos e qt de amigos que o usuario tem-->
        <div class="row mt-4 mb-4 mx-3 bg-dashboard shadow rounded d-flex justify-content-center align-items-center">
            <!--Imput e botão para adicionar novo amigo-->
            <div class="col-6 d-flex align-items-center justify-content-center">
                <form class="d-flex align-items-center justify-content-center">
                    <div class="m-2">
                        <input type="nickname" class="form-control " id="nickname" name="nickname" placeholder="nickname" required>
                    </div>
                    <div class="m-2">
                        <button type="submit" class="btn-custom rounded shadow d-flex align-items-center justify-content-center">
                            <img src="static/img/add_friend.png" id="" class="icon-sm">
                        </button>
                    </div>
                </form>
            </div>
            <!--Quantidade de amigos que o usuario tem-->
            <div class="col-4 text-light text-center">
                 Total Amigos: <span id="total-amigos"></span>
            </div>
        </div>
    `;
}
