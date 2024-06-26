export default function renderBuscarAmigos() {
    return `
        <!--Header do Dashboard-->
        <div class="row mt-4 text-light">
		 	<link rel="stylesheet" href="static/css/userprofile.css">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-11 shadow mx-auto rounded bg-dashboard text-center">
                <h4 class="mt-2 mb-2">Lista de Amigos</h4>
            </div>
        </div>

        <!--Linha com lista de amigos e buscador-->
        <div class="row mx-3 mt-4 text-light">

            <!--Friends List-->
            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-7 mt-3 bg-dashboard shadow rounded mx-auto text-center">

                <!--Linhas Com infos dos amigos-->
                <!-- Container para a lista de amigos -->
                <div id="lista-amigos">
                    <!-- Os amigos serão inseridos aqui -->
                </div>
                <div id="total-amigos-container">
                    Total de amigos: <span id="total-amigos">0</span>
                </div>

<template id="friend-template">
    <div class="row p-2 bg-dashboard-2 m-3 shadow rounded d-flex align-items-center">
        <div class="col-1 d-flex align-items-center justify-content-start">
            <img src="static/img/user_default.png" class="icon-friend-dash-size profile-photo">
        </div>
        <div class="col-6 d-flex align-items-center justify-content-center">
            <h5 class="friend-username mb-0"></h5>
        </div>
        <div class="col-5 d-flex align-items-center justify-content-end">
            <div class="d-flex align-items-center justify-content-center me-3">
                <img src="static/img/online.png" class="icon-sm status-icon">
            </div>
            <div class="d-flex align-items-center justify-content-center me-3">
                <button class="btn-custom rounded shadow d-flex align-items-center justify-content-center chat-btn">
                    <img src="static/img/chat.png" class="icon-sm">
                </button>
            </div>
            <div class="d-flex align-items-center justify-content-center me-3">
                <button class="btn-custom rounded shadow d-flex align-items-center justify-content-center profile-btn">
                    <img src="static/img/profile.png" class="icon-sm">
                </button>
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <button class="btn-custom rounded shadow d-flex align-items-center justify-content-center delete-btn">
                    <img src="static/img/delete_friend.png" class="icon-sm">
                </button>
            </div>
        </div>
    </div>
</template>




                <!--Fim lista de Amigos-->
            </div>

            <!--Buscar Amigos-->
            <div class="col-xs-12 col-sm-10 col-md-10 col-lg-4 mt-3 bg-dashboard shadow rounded mx-auto ">
                <!--Titulo da caixa-->
                <div class="bg-dashboard-2 p-2 m-3 rounded text-center text-light shadow d-flex align-items-center justify-content-center">
                    <h3 class="">Buscar Amigos</h3>
                </div>

                <!--Formulario-->
                <div class="bg-dashboard-2 p-2 m-3 shadow rounded d-flex align-items-center justify-content-center">
                    <form class="w-100" id="buscar-amigos-form">
                        <div class="mt-2 mb-3">
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
                </div>

                <!--Solicitações pendentes-->
                <div class="m-3 p-2 rounded bg-dashboard-2 text-center">
                    <h4>Solicitações de Amizade</h4>
                    <ul id="solicitacoes-pendentes" class="text-center"></ul>
                </div>

				<!--Solicitações pendentes-->
                <div class="m-3 p-2 rounded bg-dashboard-2 text-center">
                    <h4>Solicitações Enviadas</h4>
                    <ul id="solicitacoes-enviadas" class="text-center"></ul>
                </div>
                <br>
            </div>
        </div>
    `;
}
