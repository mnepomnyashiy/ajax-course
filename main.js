const url = 'https://graphqlzero.almansi.me/api';

const addForm = document.forms.addtask;
const searchForm = document.forms.findtask;
const todos = document.getElementById('todos');

addForm.addEventListener('submit', addTaskHandler);
searchForm.addEventListener('submit', findTodos);

const getData = (query) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    }).then((res) => res.json());
};
const postData = (mutation) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
    }).then((res) => res.json());
};

async function addTaskHandler(e) {
    e.preventDefault();
    if (addForm.taskname.value) {
        const newTaskQuery = `mutation CreateTodo {
            createTodo(input:{title: "${addForm.taskname.value}", completed: false}){
              title
              completed
              id
            }
          }`;

        const data = await postData(newTaskQuery);
        printTodo(data.data.createTodo);
        addForm.reset();
    }
}

function printTodo({ title, completed = false, id = '' }) {
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

async function handleTodoStatus() {
    const todoId = this.parentElement.dataset.id;

    const changeStatusQuery = `mutation ChangeStatus {
        updateTodo(id: "${todoId}", input: {completed: ${this.checked}}) {
            completed
        }
    }`;

    const data = await postData(changeStatusQuery);
    if (data.data.updateTodo.completed) {
        this.setAttribute('checked', 'true');
    } else {
        this.removeAttribute('checked');
    }
}

async function handleDeleteTodo() {
    const todoId = this.parentElement.dataset.id;
    const deleteQuery = `mutation DeleteTodo {
        deleteTodo(id: "${todoId}")
    }`;

    const data = await postData(deleteQuery);

    if (data.data.deleteTodo) {
        this.parentElement.remove();
    }
}

async function findTodos(e) {
    e.preventDefault();
    const searchText = searchForm.searchname.value;

    if (searchText) {
        const searchQuery = `query searchQuery{
            todos(options:{search:{q: "${searchText}"}, sort:{field: "id", order: DESC}}){
                data {
                  id
                  title
                  completed
                }
              }
        }`;
        const data = await getData(searchQuery);

        data.data.todos.data.forEach((todo) => printTodo(todo));
    }
}
