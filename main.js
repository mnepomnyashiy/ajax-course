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
        console.log(data);
        [{ data: tasks }, { data: authors }] = data;

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
        axios
            .post(tasksUrl, {
                userId: authorId,
                title,
            })
            .then((data) => {
                const author = getAuthor(data.data.userId);
                console.log(author);
                createTask({ task: data.data, author });
            });
    } else {
        alert('Заполните все поля формы!');
    }
}

function getTasks() {
    return axios(tasksUrl + '?_limit=15');
}
function getAuthors() {
    return axios(authorsUrl);
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
        axios
            .patch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
                completed: newTask.checked,
            })
            .then(console.log);
    };

    const deleteTask = document.querySelector(`button[data-id="${task.id}"]`);
    deleteTask.onclick = () => {
        axios
            .delete(`https://jsonplaceholder.typicode.com/todos/${task.id}`)
            .then(() => {
                document.getElementById(task.id).remove();
                alert('Задача успешно удалена');
            });
    };
}
