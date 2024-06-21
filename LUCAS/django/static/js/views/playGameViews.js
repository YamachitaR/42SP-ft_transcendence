export function renderPlayGame() {
    return `
        <!--Menu de Navegação do Site-->
        <div class="conteiner">
		    <div class="row h-2vh bg-body-color"></div>
				<div id="nav-buttons" class="row h-6vh d-flex align-items-center justify-content-center my-bg-gold">
					<div class="col-3"></div>
					<div class="col-1"><button type="button" class="btn-custom-menu shadow w-100" data-route="/dashboard/">Dashboard</button></div>
                    <div class="col-1"><button type="button" class="btn-custom-menu shadow w-100" data-route="/friends/">Friends</button></div>
					<div class="col-1"><button type="button" class="btn-custom-menu shadow w-100" data-route="/playGame/">Game</button></div>
					<div class="col-1"><button type="button" class="btn-custom-menu shadow w-100" data-route="/profile/">Profile</button></div>
					<div class="col-1"><button type="button" class="btn-custom-menu shadow w-100" data-route="/logout/">Logout</button></div>
					<div class="col-1 d-flex align-items-center justify-content-center">
						<button type="button" class="btn-custom-menu shadow d-flex align-items-center justify-content-center"><img src="../img/country_flags/br.png" class="country-flags-size"></button>
						<button type="button" class="btn-custom-menu shadow d-flex align-items-center justify-content-center"><img src="../img/country_flags/esp.png" class="country-flags-size"></button>
						<button type="button" class="btn-custom-menu shadow d-flex align-items-center justify-content-center"><img src="../img/country_flags/eua.png" class="country-flags-size"></button>
					</div>
                    <div class="col-3"></div>
				</div>
			</div>
        </div>

        <!--Pagina Selecionar o modo de Jogo-->
        <div class="conteiner bg-dashboard shadow m-4 rounded">
            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-6 m-4  bg-dashboard-2 shadow text-center rounded">
					<br><h4>Selecione o modo desejado</h4><br>
				</div>
            </div>
			<br>
            <div class="row">
                <div class="col-3 d-flex align-items-center justify-content-center">
                    <button type="button" id="gameClassic" class="btn-custom h-20vh w-100 m-4 shadow rounded">Classico 1x1</button>
                </div>
                <div class="col-3 d-flex align-items-center justify-content-center">
                    <button type="button" id="game3d" class="btn-custom h-20vh w-100 m-4 shadow rounded">Jogo 3D</button>
                </div>
                <div class="col-3 d-flex align-items-center justify-content-center">
                    <button type="button" id="game4players" class="btn-custom h-20vh w-100 m-4 shadow rounded">Modo 4 Jogadores</button>
                </div>
                <div class="col-3 d-flex align-items-center justify-content-center">
                    <button type="button" id="gameTorneio" class="btn-custom h-20vh w-100 m-4 shadow rounded">Modo Torneio</button>
                </div>
            </div>
			<br><br>
        </div>
    `;
}