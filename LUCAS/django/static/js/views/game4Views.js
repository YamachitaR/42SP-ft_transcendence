export default function game4Views() {
    return `
    <div class="conteiner bg-dashboard shadow m-4 rounded">

        <div class="row mb-4 d-flex align-items-center justify-content-center">
            <div class="col-10 m-4 bg-dashboard-2 shadow text-center text-light rounded">
                <br><h4>Digite o Pseudonimo dos Jogadores</h4><br>
            </div>
        </div>

        <!--Imputs para os nomes dos jogadores-->
        <div class="row mb-4 d-flex align-items-center justify-content-center">
            <div class="col-5 col-xs-5 col-sm-5 col-md-3 col-lg-3 col-xl-3 p-4 mx-auto text-center bg-dashboard-2 rounded">
                <label for="player1" class="form-label" style="color: #fff;">Jogador 1</label>
                <br>
                <input type="name" class="form-control" id="player1" name="player1" required/>
            </div>
            <div class="col-5 col-xs-5 col-sm-5 col-md-3 col-lg-3 col-xl-3 p-4 mx-auto text-center bg-dashboard-2 rounded">
                <label for="player1" class="form-label" style="color: #fff;">Jogador 2</label>
                <br>
                <input type="name" class="form-control" id="player2" name="player2" required/>
            </div>
        </div>
        <div class="row mb-4 d-flex align-items-center justify-content-center">
            <div class="col-5 col-xs-5 col-sm-5 col-md-3 col-lg-3 col-xl-3 p-4 mx-auto text-center bg-dashboard-2 rounded">
                <label for="player3" class="form-label" style="color: #fff;">Jogador 3</label>
                <br>
                <input type="name" class="form-control" id="player3" name="player3" required/>
            </div>
            <div class="col-5 col-xs-5 col-sm-5 col-md-3 col-lg-3 col-xl-3 p-4 mx-auto text-center bg-dashboard-2 rounded">
                <label for="player3" class="form-label" style="color: #fff;">Jogador 4</label>
                <br>
                <input type="name" class="form-control" id="player4" name="player4" required/>
            </div>
        </div>

        <!--Botão de iniciar-->
        <div class="row d-flex align-items-center justify-content-center">
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                    <button type="button" id="start4game" class="btn-custom p-3 shadow rounded">
                        <h4>Iniciar Jogo</h4>
                    </button>
                </div>
            </div>
        <br><br>
    </div>
    `;
}
