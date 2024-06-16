// myapp/static/myapp/main.js

function createItem() {
    const name = prompt('Enter item name:');
    const description = prompt('Enter item description:');
    if (name && description) {
        fetch('/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: `name=${name}&description=${description}`
        }).then(response => response.json()).then(data => {
            const itemList = document.getElementById('item-list');
            const newItem = document.createElement('div');
            newItem.className = 'item';
            newItem.dataset.id = data.id;
            newItem.innerHTML = `<h2>${data.name}</h2><p>${data.description}</p><button onclick="editItem(${data.id})">Edit</button><button onclick="deleteItem(${data.id})">Delete</button>`;
            itemList.appendChild(newItem);
        });
    }
}

function editItem(id) {
    const item = document.querySelector(`.item[data-id='${id}']`);
    const name = prompt('Enter new item name:', item.querySelector('h2').innerText);
    const description = prompt('Enter new item description:', item.querySelector('p').innerText);
    if (name && description) {
        fetch(`/update/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: `name=${name}&description=${description}`
        }).then(response => response.json()).then(data => {
            item.querySelector('h2').innerText = data.name;
            item.querySelector('p').innerText = data.description;
        });
    }
}

function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        fetch(`/delete/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': getCookie('csrftoken')
            },
        }).then(response => response.json()).then(data => {
            if (data.result === 'success') {
                const item = document.querySelector(`.item[data-id='${id}']`);
                item.remove();
            }
        });
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
