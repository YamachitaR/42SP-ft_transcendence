export default function renderSettingsUser() {
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
    </div>
    `;
}