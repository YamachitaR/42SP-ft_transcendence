
export function renderPlayGame() {
    return `
        <div class="conteiner bg-dashboard shadow m-4 rounded">

            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-6 m-4 bg-dashboard-2 shadow text-center text-light rounded">
                    <br><h4>Selecione o modo desejado</h4><br>
                </div>
            </div>

            <div class="row d-flex align-items-stretch">
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex">
                    <button type="button" id="gameClassic" class="btn-custom flex-fill m-4 p-4 shadow rounded">
                        <h4>Classico 1x1</h4>
                    </button>
                </div>
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex">
                    <button type="button" id="game3d" class="flex-fill btn-custom m-4 p-4 shadow rounded">
                        <h4>Modo 3D</h4>
                    </button>
                </div>
				<div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex">
                    <button type="button" id="game4players" class="flex-fill btn-custom m-4 p-4 shadow rounded">
                        <h4>4 Players</h4>
                    </button>
                </div>
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex">
                    <button type="button" id="vsIa" class="btn-custom  flex-fill m-4 p-4 shadow rounded">
                        <h4>JOgador vs IA</h4>
                    </button>
                </div>
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex">
                    <button type="button" id="gameTorneio" class="btn-custom flex-fill m-4 p-4 shadow rounded">
                        <h4>Torneiro</h4>
                    </button>
                </div>
            </div>
            <br><br>
        </div>
    `;
}

export function renderVictoryGame() {
    return `
        <div class="conteiner bg-dashboard shadow m-4 rounded">

            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-6 m-4 bg-dashboard-2 shadow text-center text-light rounded">
                    <br><h4>Vitoria de: Jogador X</h4><br>
                </div>
            </div>

            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                    <button type="button" id="gameClassic" class="btn-custom p-4 shadow rounded">
                        <h4>Voltar a Seleção</h4>
                    </button>
                </div>
            </div>
            <br><br>
        </div>
    `;
}
