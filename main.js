// получить форму и повесить на нее обработчик
const addTaskForm = document.forms.newtask;
addTaskForm.onsubmit = newTask;
// общий список задач
const taskList = document.querySelector('.tasks');

// ссылки на конечные точки REST API задач и авторов
const tasksUrl = `https://jsonplaceholder.typicode.com/todos`;
const authorsUrl = `https://jsonplaceholder.typicode.com/users`;

// будущие массивы задач и авторов
let tasks = null;
let authors = null;

printAllTasks();

// метод, вызывающий в себе получение всех задач и всех авторов
// по получению задач и авторов - добавляет все задачи на страницу в общий список
// а также вызывает метод по авто генерированию options для выбора исптолнителя
function printAllTasks() {}

// получить все задачи, вернуть js-объект (преобразованный из форматаJSON)
function getTasks() {}
// получить всех авторов, вернуть js-объект (преобразованный из форматаJSON)
function getAuthors() {}
// по идентификатору автора возврщает объект с его именем и прочей информацией
function getAuthor(authorId) {
    return authors.filter((el) => el.id == authorId)[0];
}
// автоматическая генерация options для выбора исптолнителя
function generateAuthorsSelect() {
    // выбрать select из формы, заменив null
    const select = null;

    authors &&
        authors.forEach((author) => {
            const option = new Option(author.name, author.id);
            select.add(option);
        });
}

// обработчик формы для создания новой задачи
// сделать POST-запрос к списку задач, передав тело новой задачи
// полученный в ответе результат добавить в общий список задач на странице
function newTask() {}

// метод создает разметку для одной задачи
// положить в элемент <li class="list-group-item">Cras justo odio</li>
// и прикрепить к общему списку <ul class="list-group list-group-flush tasks"></ul>
function createTask(data) {}
