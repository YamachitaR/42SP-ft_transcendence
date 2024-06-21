export function renderPlayGame() {
    return `
        <div class="d-flex justify-content-center align-items-center min-vh-100">
            <div class="card p-4" style="width: 80%; max-width: 800px; background-color: #333; border-color: #daa520;">
                <div class="card-body">
                    <h3 class="card-title text-center" style="color: #daa520;">Choose an Game Play</h3>
                    <div class="d-grid gap-2">
                        <button type="button" id="gameClassic" class="btn" style="background-color: #daa520; color: #333;">Game Clássico</button>
                        <button type="button" id="game3d" class="btn btn-outline" style="border: 2px solid #daa520; color: #daa520;">Game 3D</button>
                        <button type="button" id="game4players" class="btn" style="background-color: #000; color: #fff;">Game 4 Players</button>
                        <button type="button" id="gameTorneio" class="btn" style="background-color: #007bff; color: #fff;">Game Torneio</button>
                    </div>
                    <div id="result" class="mt-4" style="color: #fff;"></div>
                </div>
            </div>
        </div>
    `;
}
