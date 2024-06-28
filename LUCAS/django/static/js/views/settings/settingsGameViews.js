export default function renderSettingsGame() {
    return `
    
    <!--Titulo da Pagina-->
    <div class="row mx-3 mt-4 text-light ">
        <div class="col shadow rounded d-flex align-items-center justify-content-center bg-dashboard text-center">
            <h3>Personalizar Game</h4>
        </div>
    </div>

    <!--Linha das Caixas-->
    <div class="row mx-3 mt-4 text-light d-flex align-items-center justify-content-center">

        <!--Caixa para modificar preferencias do Jogo-->
        <div id="user-preferences" class="col-5 bg-dashboard rounded mt-4 mx-auto">
            
            <div class="d-flex align-items-center justify-content-center mt-5">
                <h3 class=" mb-3">Preferências do Usuário</h3>
            </div>
            <form id="user-preference-form" enctype="multipart/form-data">
                <div class="mb-3">
                    <label for="preference1" class="form-label text-light">Velocidade Inicial do Jogo</label>
                    <select class="form-control" id="preference1" name="preference1">
                        <option value="option1">Padrão</option>
                        <option value="option2">Lenta</option>
                        <option value="option3">Rapida</option>
                        <option value="option4">Super Rapida</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="preference2" class="form-label text-light">Velocidade das Raquetes</label>
                    <select class="form-control" id="preference2" name="preference2">
                        <option value="option1">Padrão</option>
                        <option value="option2">Lenta</option>
                        <option value="option3">Rapida</option>
                        <option value="option4">Super Rapida</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="preference3" class="form-label text-light">Skin da Bola</label>
                    <select class="form-control" id="preference3" name="preference3">
                        <option value="option1">Branca (Padrão)</option>
                        <option value="option2">Tenis</option>
                        <option value="option3">Baseball</option>
                        <option value="option4">Basquete</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="preference4" class="form-label text-light">Skin da Quadra</label>
                    <select class="form-control" id="preference4" name="preference4">
                        <option value="option1">Preta (Padrão)</option>
                        <option value="option2">Tenis</option>
                        <option value="option3">Baseball</option>
                        <option value="option4">Basquete</option>
                    </select>
                </div>
                <div class="mb-5">
                    <label for="preference5" class="form-label text-light">Quantidade de Pontos para o fim do Jogo</label>
                    <select class="form-control" id="preference5" name="preference5">
                        <option value="option1">11 Pontos (Padrão)</option>
                        <option value="option2">1 Pontos</option>
                        <option value="option3">3 Pontos</option>
                        <option value="option4">20 Pontos</option>
                    </select>
                </div>
                <div class="d-grid gap-2 mb-4">
                    <button type="submit" class="btn-custom rounded p-2">Salvar Preferencias</button>
                </div>
            </form>
        </div>
    </div>
    `;
}
