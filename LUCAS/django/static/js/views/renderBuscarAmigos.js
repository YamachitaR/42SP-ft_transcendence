export default function renderBuscarAmigos() {
    return `
        <div class="d-flex justify-content-center align-items-center min-vh-100">
            <div class="card p-4" style="width: 100%; max-width: 400px; background-color: #333; border-color: #daa520;">
                <div class="card-body">
                    <h3 class="card-title text-center" style="color: #daa520;">Buscar Amigos</h3>
                    <form id="buscar-amigos-form">
                        <div class="mb-3">
                            <label for="nickname" class="form-label" style="color: #fff;">Nickname</label>
                            <input type="text" class="form-control" id="nickname" name="nickname" required>
                        </div>
                        <div class="d-grid">
                            <button type="submit" class="btn" style="background-color: #daa520; color: #333;">Buscar</button>
                        </div>
                    </form>
                    <div class="mt-3">
                        <span id="total-amigos" style="color: #fff;">Total Amigos: 0</span>
                    </div>
                    <div class="mt-3">
                        <button id="enviar-solicitacao-btn" class="btn" style="background-color: #daa520; color: #333; display: none;">Enviar Solicitação de Amizade</button>
                    </div>
                    <div class="mt-3">
                        <h4 style="color: #daa520;">Solicitações Pendentes</h4>
                        <ul id="solicitacoes-pendentes" style="color: #fff;"></ul>
                    </div>
                    <div class="mt-3">
                        <h4 style="color: #daa520;">Amigos</h4>
                        <ul id="lista-amigos" style="color: #fff;"></ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}
