const addTaskForm = document.forms.newtask;
addTaskForm.onsubmit = newTask;
const taskList = document.querySelector('.tasks');
const tasksUrl = `https://jsonplaceholder.typicode.com/todos`;
const authorsUrl = `https://jsonplaceholder.typicode.com/users`;

let tasks = null;
let authors = null;

printAllTasks();

function printAllTasks() {
    Promise.all([getTasks(), getAuthors()]).then((data) => {
        [tasks, authors] = data;

        tasks.forEach((task) => {
            const author = getAuthor(task.userId);
            createTask({ task, author });
        });
        generateAuthorsSelect();
    });
}

function newTask(e) {
    e.preventDefault();

    const title = addTaskForm.taskname.value;
    const authorId = addTaskForm.author.value;

    if (title) {
        fetch(tasksUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ userId: authorId, title }),
        })
            .then((res) => res.json())
            .then((data) => {
                const author = getAuthor(data.userId);
                console.log(author);
                createTask({ task: data, author });
            });
    } else {
        alert('Заполните все поля формы!');
    }
}

function getTasks() {
    return fetch(tasksUrl + '?_limit=15').then((res) => res.json());
}
function getAuthors() {
    return fetch(authorsUrl).then((res) => res.json());
}
function getAuthor(authorId) {
    return authors.filter((el) => el.id == authorId)[0];
}
function generateAuthorsSelect() {
    const select = addTaskForm.author;

    authors &&
        authors.forEach((author) => {
            const option = new Option(author.name, author.id);
            select.add(option);
        });
}

function createTask(data) {
    const { task, author } = data;

    taskList.insertAdjacentHTML(
        'afterbegin',
        `<li class="list-group-item" id="${task.id}">
           <input type="checkbox" data-id="${task.id}"> ${task.title}. | <b>Исполнитель:</b> ${author.name}
            <button class="btn btn-link" data-id="${task.id}">&times;</button> 
        </li>`
    );

    const newTask = document.querySelector(`input[data-id="${task.id}"]`);
    newTask.onchange = () => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ completed: newTask.checked }),
        })
            .then((res) => res.json())
            .then(console.log);
    };

    const deleteTask = document.querySelector(`button[data-id="${task.id}"]`);
    deleteTask.onclick = () => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(() => {
                document.getElementById(task.id).remove();
                alert('Задача успешно удалена');
            });
    };
}
