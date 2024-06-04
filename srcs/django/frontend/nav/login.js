document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('changeContentButton');
    const contentDiv = document.getElementById('content');

    button.addEventListener('click', function () {
        contentDiv.innerHTML = `
            <h1>Conteúdo Alterado!</h1>
            <p>O conteúdo foi alterado com sucesso. Clique no botão para voltar ao conteúdo original.</p>
            <button id="changeContentButton" class="btn btn-secondary">Voltar Conteúdo</button>
        `;
        // Reatacha o evento ao novo botão
        document.getElementById('changeContentButton').addEventListener('click', function () {
            contentDiv.innerHTML = `
                <h1>Bem-vindo!</h1>
                <p>Clique no botão para mudar o conteúdo.</p>
                <button id="changeContentButton" class="btn btn-primary">Mudar Conteúdo</button>
            `;
            // Reatacha o evento ao novo botão
            attachButtonEvent();
        });
    });

    function attachButtonEvent() {
        document.getElementById('changeContentButton').addEventListener('click', function () {
            contentDiv.innerHTML = `
                <h1>Conteúdo Alterado!</h1>
                <p>O conteúdo foi alterado com sucesso. Clique no botão para voltar ao conteúdo original.</p>
                <button id="changeContentButton" class="btn btn-secondary">Voltar Conteúdo</button>
            `;
            attachButtonEvent();
        });
    }
});
