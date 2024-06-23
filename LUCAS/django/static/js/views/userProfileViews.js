export default function renderProfileUser() {
    return `
    <link rel="stylesheet" href="static/css/userprofile.css">
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div id="user-info" class="col-md-6" data-default-image="../../static/img/pf.jpg">
                                <div class="section-container">
                                    <h3>Informações do Usuário</h3>
                                    <hr>
                                    <div class="text-center">
                                        <img id="user-image" class="img-fluid rounded-circle" alt="User Image">
                                    </div>
                                    <form id="user-form" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <label for="user-id">ID:</label>
                                            <input type="text" id="user-id" name="user-id" class="form-control" readonly>
                                        </div>
                                        <div class="form-group">
                                            <label for="user-username">Username:</label>
                                            <input type="text" id="user-username" name="user-username" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label for="user-email">Email:</label>
                                            <input type="email" id="user-email" name="user-email" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label for="user-image-upload">Upload Image:</label>
                                            <input type="file" id="user-image-upload" name="profile_image" class="form-control">
                                        </div>
                                        <div class="form-group form-check">
                                            <input type="checkbox" id="use-default-image" class="form-check-input">
                                            <label class="form-check-label" for="use-default-image">Usar imagem padrão</label>
                                        </div>
                                        <button type="submit" class="btn btn-primary mt-3">Alterar</button>
                                    </form>
                                </div>
                            </div>

                            <div id="user-preferences" class="col-md-6">
                                <div class="section-container">
                                    <h3>Preferências do Usuário</h3>
                                    <hr>
                                    <form id="user-preference-form" enctype="multipart/form-data">
                                        <div class="form-group">
                                            <label for="preference1">Preferência 1:</label>
                                            <select class="form-control" id="preference1" name="preference1">
                                                <option value="option1">Opção 1</option>
                                                <option value="option2">Opção 2</option>
                                                <option value="option3">Opção 3</option>
                                                <option value="option4">Opção 4</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="preference2">Preferência 2:</label>
                                            <select class="form-control" id="preference2" name="preference2">
                                                <option value="option1">Opção 1</option>
                                                <option value="option2">Opção 2</option>
                                                <option value="option3">Opção 3</option>
                                                <option value="option4">Opção 4</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="preference3">Preferência 3:</label>
                                            <select class="form-control" id="preference3" name="preference3">
                                                <option value="option1">Opção 1</option>
                                                <option value="option2">Opção 2</option>
                                                <option value="option3">Opção 3</option>
                                                <option value="option4">Opção 4</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="preference4">Preferência 4:</label>
                                            <select class="form-control" id="preference4" name="preference4">
                                                <option value="option1">Opção 1</option>
                                                <option value="option2">Opção 2</option>
                                                <option value="option3">Opção 3</option>
                                                <option value="option4">Opção 4</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="preference5">Preferência 5:</label>
                                            <select class="form-control" id="preference5" name="preference5">
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                            </select>
                                        </div>
                                        <button type="submit" class="btn btn-primary mt-3">Alterar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
