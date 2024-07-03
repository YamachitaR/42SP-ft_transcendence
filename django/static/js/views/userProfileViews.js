export default function renderProfileFriend() {
    return `
    
    <!--Titulo da Pagina-->
    <div class="row mx-3 mt-4 text-light ">
        <div class="col shadow rounded d-flex align-items-center justify-content-center bg-dashboard text-center">
            <h3>Editar informações</h4>
        </div>
    </div>

    <!--Linha das Caixas-->
    <div class="row mx-3 mt-4 text-light d-flex align-items-center justify-content-center">

        <!--Caixa de modificar Infos-->
        <div class="col-mb-5 col-xl-5 bg-dashboard shadow rounded mt-4 mx-auto">

            <!--Imagem Atual do Usuario-->
            <div id="user-info" class="mx-auto " data-default-image="../../static/img/pf.jpg">
                <img id="user-image" class="mx-auto mt-3 mb-3 w-50 rounded">
            </div>

            <form id="user-form" enctype="multipart/form-data">
                <!--Campo ID-->
                <div class="mb-3">
                    <label for="user-id" class="form-label text-light">User ID</label>
                    <input type="text" id="user-id" name="user-id"  class="form-control" readonly>
                </div>
                <!--Campo Username-->
                <div class="mb-3">
                    <label for="user-username" class="form-label text-light">Username</label>
                    <input type="text" id="user-username" name="user-username" class="form-control">
                </div>
                <!--Campo Email-->
                <div class="mb-3">
                    <label for="user-email" class="form-label text-light">Email</label>
                    <input type="email" id="user-email" name="user-email" class="form-control">
                </div>
                <!--Alterar o Avatar do usuario-->
                <div class="mb-5">
                    <label for="user-image-upload" class="form-label text-light">Avatar</label>
                    <input type="file" id="user-image-upload" name="profile_image"  class="form-control">
                    <input type="checkbox" id="use-default-image" class="form-check-input">
                    <label class="form-check-label" for="use-default-image">Usar imagem padrão</label>
                </div>
                <!--Botão Submit-->
                <div class="d-grid gap-2 mb-4">
                    <button type="submit" class="btn-custom rounded p-2">Salvar Alterações</button>
                </div>
            </form>
        </div>

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
