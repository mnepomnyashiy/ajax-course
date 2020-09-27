// получаем ссылку на форму
const form = document.forms[0];
// получаем ссылку на список дел ul
const todos = document.getElementById('todos');

// загрузка задач из фейковой БД
loadTasks();

// добавление "листнера" на отправку формы
form.addEventListener('submit', submitHandler);

// обработка отправки формы с заглушкой на время отсутствия бэка
function submitHandler(event) {
    event.preventDefault();
    const newTask = form.task.value;

    if (newTask.length) {
        fakePostTask(newTask)
            .then(task => {
                createTaskHtml(task)
                form.reset();
            })
    }
}

// загрузка задач из фейковой БД (localStorage)
function loadTasks() {
    const storage = localStorage.getItem('tasks') || '';
    const tasks = storage.split(';');

    tasks.length &&
        tasks.splice(0, tasks.length - 1).forEach(task => createTaskHtml(task))
}

// имитация запроса к серверу и получение ответа от него
// пишем и комментируем fetch, реализуем загрушку через Promise
function fakePostTask(task) {
    // return fetch('fakeUrl', {
    //     method: 'POST',
    //     body: task,
    // }).then(response => response.text())

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'tasks.php');
    // xhr.send(task);

    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4) {
    //         if (xhr.status === 200) {
    //             return xhr.responseText;
    //         }
    //     }
    // }

    const newTaskDate = new Date().toLocaleDateString();
    const newTaskText = `${task}. Время создания: ${newTaskDate};`

    // работа с фейковой БД
    const allItems = localStorage.getItem('tasks') || '';
    localStorage.setItem('tasks', allItems + newTaskText);

    return Promise.resolve(newTaskText);
}

// создание разметки для конкретной задачи
function createTaskHtml(task) {
    const li = document.createElement('li');
    li.className = "list-group-item";
    li.innerText = task;
    todos.append(li);
}
