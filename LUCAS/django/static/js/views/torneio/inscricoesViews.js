export default function gameTorneioInscricoesViews() {
    return `
    <div class="conteiner bg-dashboard shadow m-4 rounded">

        <div class="row mb-4 d-flex align-items-center justify-content-center">
            <div class="col-6 m-4 bg-dashboard-2 shadow text-center text-light rounded">
                <br><h4>Digite o Pseudonimo dos Jogadores</h4><br>
            </div>
        </div>

        <!--Imputs para os nomes dos jogadores-->
        <div class="row mb-4 d-flex align-items-center justify-content-center">
            <div class="col-5 col-xs-5 col-sm-5 col-md-3 col-lg-3 col-xl-3 p-4 text-center bg-dashboard-2 rounded">
                <label for="player1" class="form-label" style="color: #fff;">Jogador 1</label>
                <br>
                <input type="name" class="form-control" id="player1" name="player1" required/>
            </div>
            <div class="col-5 col-xs-5 col-sm-5 col-md-3 col-lg-3 col-xl-3 offset-1 p-4 text-center bg-dashboard-2 rounded">
                <label for="player1" class="form-label" style="color: #fff;">Jogador 2</label>
                <br>
                <input type="name" class="form-control" id="player1" name="player1" required/>
            </div>
        </div>

        <!--Botão de iniciar-->
        <div class="row d-flex align-items-center justify-content-center">
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                    <button type="button" id="startClassic" class="btn-custom p-3 shadow rounded">
                        <h4>Iniciar Torneio</h4>
                    </button>
                </div>
            </div>
        <br><br>
    </div>
    `;
}
