export default function renderSettingsPage() {
    return `
        <div class="conteiner bg-dashboard shadow m-4 rounded">

            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-10 m-4 bg-dashboard-2 shadow text-center text-light rounded">
                    <br><h4>Configurações</h4><br>
                </div>
            </div>

            <div class="row d-flex align-items-stretch">
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex">
                    <button type="button" id="settingsUser" class="btn-custom flex-fill m-4 p-4 shadow rounded">
                        <h4>Alterar meus dados</h4>
                    </button>
                </div>
                <div class="col-xs-10 col-sm-5 col-md-3 col-lg-3 col-xl-3 mx-auto d-flex">
                    <button type="button" id="settingsGame" class="flex-fill btn-custom m-4 p-4 shadow rounded">
                        <h4>Personalizar Jogo</h4>
                    </button>
                </div>
            </div>
        </div>
    `;
}
