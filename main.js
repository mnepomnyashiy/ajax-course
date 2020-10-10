/* Изучите готовый код.
Напишите graphql-запросы в заданиях из многострочных js-комментариев */

const url = 'https://graphqlzero.almansi.me/api';

// форма добавления новой задачи
const addForm = document.forms.addtask;
// форма поиска задач
const searchForm = document.forms.findtask;
// общий список задач на странице
const todos = document.getElementById('todos');

// обработчики форм
addForm.addEventListener('submit', addTaskHandler);
searchForm.addEventListener('submit', findTodos);

// функция получения данных
const getData = (query) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    }).then((res) => res.json());
};
// функция изменения данных
const postData = (mutation) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
    }).then((res) => res.json());
};

// функция добавления новой задачи
// вызывает postData с передачей запроса типа mutation, с полем createTodo
// по получении ответа - создает разметку для задачи вызовом printTodo
async function addTaskHandler(e) {
    e.preventDefault();

    if (addForm.taskname.value) {
        /* создайте запрос типа mutation */
        const newTaskQuery = ``;

        const data = await postData(newTaskQuery);
        printTodo(data.data.createTodo);
    }
}

// функция создания разметки для одной задачи
function printTodo({ title, completed = false, id }) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `&nbsp; ${title} | ID: ${id} &nbsp;`;
    li.setAttribute('data-id', id);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (completed) {
        checkbox.setAttribute('checked', 'true');
    }
    checkbox.addEventListener('change', handleTodoStatus);
    li.prepend(checkbox);

    const del = document.createElement('button');
    del.className = 'btn btn-link mb-1';
    del.innerHTML = '&times;';
    del.addEventListener('click', handleDeleteTodo);
    li.append(del);

    todos.prepend(li);
}

// функция-обработчик изменения статуса задачи
async function handleTodoStatus() {
    const todoId = this.parentElement.dataset.id;

    /* напишите запрос типа mutation с полем updateTodo
     и параметрами id и input (с передачей в input обновленного состояния completed) */
    const changeStatusQuery = ``;

    const data = await postData(changeStatusQuery);
    if (data.data.updateTodo.completed) {
        this.setAttribute('checked', 'true');
    } else {
        this.removeAttribute('checked');
    }
}

// функция-обработчик удаления задачи
async function handleDeleteTodo() {
    const todoId = this.parentElement.dataset.id;

    /* напишите запрос типа mutation для удаления задачи по id */
    const deleteQuery = ``;

    const data = await postData(deleteQuery);

    if (data.data.deleteTodo) {
        this.parentElement.remove();
    }
}

// функция поиска задачи по запросу
// формирует поисковый запрос (с сортировкой) и по ответу для каждой задачи вызывает printTodo
async function findTodos(e) {
    e.preventDefault();
    const searchText = searchForm.searchname.value;

    if (searchText) {
        /* напишите запрос типа query для ключа todos с передачей аргументов options - search и sort (см. схему) */
        const searchQuery = ``;

        const data = await getData(searchQuery);
        data.data.todos.data.forEach((todo) => printTodo(todo));
    }
}
