export function renderPlayGame() {
    return `
        <div class="conteiner bg-dashboard shadow m-4 rounded">

            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-6 m-4 bg-dashboard-2 shadow text-center text-light rounded">
                    <br><h4>Selecione o modo desejado</h4><br>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex align-items-center justify-content-center">
                    <button type="button" id="gameClassic"  class="btn-custom h-20vh w-100 m-4 shadow rounded">Classico 1x1</button>
                </div>
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex align-items-center justify-content-center">
                    <button type="button" id="game3d" class="btn-custom h-20vh w-100 m-4 shadow rounded">Modo 3D</button>
                </div>
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex align-items-center justify-content-center">
                    <button type="button" id="game4players" class="btn-custom h-20vh w-100 m-4 shadow rounded">Modo 4x4</button>
                </div>
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex align-items-center justify-content-center">
                    <button type="button" id="gameTorneio" class="btn-custom h-20vh w-100 m-4 shadow rounded">Torneiro</button>
                </div>
            </div>
            <br><br>
        </div>
    `;
}