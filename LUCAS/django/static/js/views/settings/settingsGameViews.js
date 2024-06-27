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
                    <label for="preference1" class="form-label text-light">Preferência 1</label>
                    <select class="form-control" id="preference1" name="preference1">
                        <option value="option1">Opção 1</option>
                        <option value="option2">Opção 2</option>
                        <option value="option3">Opção 3</option>
                        <option value="option4">Opção 4</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="preference2" class="form-label text-light">Preferência 2</label>
                    <select class="form-control" id="preference2" name="preference2">
                        <option value="option1">Opção 1</option>
                        <option value="option2">Opção 2</option>
                        <option value="option3">Opção 3</option>
                        <option value="option4">Opção 4</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="preference3" class="form-label text-light">Preferência 3</label>
                    <select class="form-control" id="preference3" name="preference3">
                        <option value="option1">Opção 1</option>
                        <option value="option2">Opção 2</option>
                        <option value="option3">Opção 3</option>
                        <option value="option4">Opção 4</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="preference4" class="form-label text-light">Preferência 4</label>
                    <select class="form-control" id="preference4" name="preference4">
                        <option value="option1">Opção 1</option>
                        <option value="option2">Opção 2</option>
                        <option value="option3">Opção 3</option>
                        <option value="option4">Opção 4</option>
                    </select>
                </div>
                <div class="mb-5">
                    <label for="preference5" class="form-label text-light">Preferência 5</label>
                    <select class="form-control" id="preference5" name="preference5">
                        <option value="true">True</option>
                        <option value="false">False</option>
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
