export default function gameTorneioSimulacaoPartidaViews(player1, player2) {
    return `
        <div class="conteiner bg-dashboard shadow m-4 rounded">
            <div class="row mb-4 d-flex align-items-center justify-content-center">
                <div class="col-10 m-4 bg-dashboard-2 shadow text-center text-light rounded">
                    <br><h4>Simulação de Partida</h4><br>
                </div>
            </div>
            <!--Jogador 1-->
            <div class="row mb-4 d-flex align-items-center justify-content-center">
                <div class="col-5 p-4 text-center bg-dashboard-2 rounded">
                    <label for="player1Value" class="form-label" style="color: #fff;">${player1}</label>
                    <br>
                    <input type="number" class="form-control" id="player1Value" name="player1Value" required/>
                </div>
            </div>
            <!--Jogador 2-->
            <div class="row mb-4 d-flex align-items-center justify-content-center">
                <div class="col-5 p-4 text-center bg-dashboard-2 rounded">
                    <label for="player2Value" class="form-label" style="color: #fff;">${player2}</label>
                    <br>
                    <input type="number" class="form-control" id="player2Value" name="player2Value" required/>
                </div>
            </div>
            <!--Botão de finalizar-->
            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                    <button type="button" id="finishMatch" class="btn-custom p-3 shadow rounded">
                        <h4>Finalizar Partida</h4>
                    </button>
                </div>
            </div>
            <br><br>
        </div>
    `;
}
