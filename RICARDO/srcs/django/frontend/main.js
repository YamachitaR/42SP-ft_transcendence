// frontend/main.js

document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');
    const todoTitle = document.getElementById('todo-title');

    // Função para carregar as tarefas
    const loadTodos = async () => {
        const response = await fetch('/api/todos/');
        const todos = await response.json();
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;
            todoList.appendChild(li);
        });
    };

    // Função para adicionar uma nova tarefa
    const addTodo = async (title) => {
        await fetch('/api/todos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, completed: false }),
        });
        loadTodos();
    };

    // Evento de submit do formulário
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = todoTitle.value.trim();
        if (title) {
            addTodo(title);
            todoTitle.value = '';
        }
    });

    // Carregar as tarefas ao iniciar a página
    loadTodos();
});
