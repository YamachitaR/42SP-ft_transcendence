export default function gameTorneioNextViews() {
    return `
        <div class="conteiner bg-dashboard shadow m-4 rounded">
            <div class="row mb-4 d-flex align-items-center justify-content-center">
                <div class="col-10 m-4 bg-dashboard-2 shadow text-center text-light rounded">
                    <br><h4>Partidas do Torneio</h4><br>
                </div>
            </div>
            <!--Lista de partidas-->
            <div class="row mb-4 d-flex align-items-center justify-content-center">
                <div class="col-10" id="matchListContainer">
                    <!-- Lista de partidas será gerada aqui -->
                </div>
            </div>
            <!--Botão para iniciar próxima partida-->
            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                    <button type="button" id="nextMatch" class="btn-custom p-3 shadow rounded">
                        <h4>Iniciar Próxima Partida</h4>
                    </button>
                </div>
            </div>
            <br><br>
        </div>
    `;
}
