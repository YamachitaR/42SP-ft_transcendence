//Primeira tela ao clicar em Torneio no Seletor de Jogos
export default function gameTorneioInitViews() {
    return `
    <div class="conteiner bg-dashboard shadow m-4 rounded">

        <div class="row mb-4 d-flex align-items-center justify-content-center">
            <div class="col-6 m-4 bg-dashboard-2 shadow text-center text-light rounded">
                <br>
                <h4>Sejam Bem Vindos ao Torneio!</h4>
                <br>
                <h6>Informem quantos Jogadores irão Participar:</h6>
                <br>
            </div>
        </div>

        <!--Inputs para os nomes dos jogadores-->
        <div class="row mb-4 d-flex align-items-center justify-content-center">
            <div class="col-5 col-xs-5 col-sm-5 col-md-3 col-lg-3 col-xl-3 p-4 text-center bg-dashboard-2 rounded">
                <br>
                <input type="name" class="form-control" id="qtPlayes" name="qtPlayes" required/>
                <br>
            </div>
        </div>

        <!--Botão de iniciar-->
        <div class="row d-flex align-items-center justify-content-center">
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 d-flex align-items-center justify-content-center">
                    <button type="button" id="next" class="btn-custom p-3 shadow rounded">
                        <h4>Proximo</h4>
                    </button>
                </div>
            </div>
        <br><br>
    </div>
    `;
}

//Idealmente deve receber o numero de jogadores
export function gamessTorneioInscricoesViews() {
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

//Idealmente deve receber o nome dos proximos dois jogadores
export function gameTorneioNextViews() {
    return `
    <div class="conteiner bg-dashboard shadow m-4 rounded">

        <div class="row mb-4 d-flex align-items-center justify-content-center">
            <div class="col-6 m-4 bg-dashboard-2 shadow text-center text-light rounded">
                <br><h4>Proximo Jogo</h4><br>
            </div>
        </div>

        <!--Imputs para os nomes dos jogadores-->
        <div class="row mb-4 d-flex align-items-center justify-content-center">
            <div class="col-5 col-xs-5 col-sm-5 col-md-3 col-lg-3 col-xl-3 p-4 text-center bg-dashboard-2 rounded">
                <h5>Jogador X vs Jogador Y</h5>
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

//Rece o Nome dos proximos 2 jogadores
export function gameTorneioPlayViews() {
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

export function gameTorneioVictoryViews() {
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
