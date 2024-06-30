export default function startGameVsIA() {
    return `
    <div class="conteiner mt-4 mb-4">
            
        <div class="row mx-3 mt-4 text-light h-10vh ">
        <!--Titulo da Pagina-->
            <div class="col shadow rounded d-flex align-items-center justify-content-center bg-dashboard text-center">
                <h3>Player Vs IA</h4>
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
                    <h5>IA</h5>
                    <br>
                </div>
            </div>
        </div>
    </div>
    `;
}

