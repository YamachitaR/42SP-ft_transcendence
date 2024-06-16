// frontend/js/app.js

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('home-link').addEventListener('click', function(event) {
        event.preventDefault();
        showPage('home');
    });

    document.getElementById('crud-link').addEventListener('click', function(event) {
        event.preventDefault();
        showPage('crud');
        loadCrudList();
    });

    // Função para mostrar a página especificada
    function showPage(pageId) {
        const pages = document.querySelectorAll('.content-page');
        pages.forEach(page => {
            page.style.display = page.id === pageId ? 'block' : 'none';
        });
    }

    // Carregar a página inicial por padrão
    showPage('home');

    // Função para carregar a lista do CRUD
    function loadCrudList() {
        fetch('/api/yourmodels/')
            .then(response => response.json())
            .then(data => {
                const crudList = document.getElementById('crud-list');
                crudList.innerHTML = '';
                data.forEach(item => {
                    const div = document.createElement('div');
                    div.textContent = item.name;
                    crudList.appendChild(div);
                });
            })
            .catch(error => console.warn(error));
    }

    // Manipular o formulário do CRUD
    document.getElementById('crud-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;

        fetch('/api/yourmodels/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        })
        .then(response => response.json())
        .then(data => {
            loadCrudList();
            document.getElementById('crud-form').reset();
        })
        .catch(error => console.warn(error));
    });
});
