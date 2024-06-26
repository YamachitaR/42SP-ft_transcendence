export default function gameClassicViews() {
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
                        <h4>Iniciar Jogo</h4>
                    </button>
                </div>
            </div>
        <br><br>
    </div>
    `;
}

export function gameClassicPlayyViews() {
    return `
    <div class="conteiner mt-4 mb-4">
            
        <div class="row mx-3 mt-4 text-light h-10vh ">
        <!--Titulo da Pagina-->
            <div class="col shadow rounded d-flex align-items-center justify-content-center bg-dashboard text-center">
                <h3>Classic Game 1x1</h4>
            </div>
        </div>

        <div class="row mt-3 mx-auto">

            <!--Caixa Lateral do Jogador 1-->
            <div class="col-2">
                <div class="rounded bg-dashboard p-4 text-light text-center">
                    <h5>Player x</h5>
                    <br>
                </div>
            </div>

            <!--Canvas do Jogo-->
            <div class="col-8 bg-dashboard rounded mx-auto d-flex align-items-center justify-content-center">
                <canvas id="canvas"></canvas>
            </div>

            <!--Caixa Lateral do Jogador 2-->
            <div class="col-2">
                <div class="rounded bg-dashboard p-4 text-light text-center">
                    <h5>Player y</h5>
                    <br>
                </div>
            </div>
        </div>
    </div>
  
    `;
}
