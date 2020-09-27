// получаем ссылку на форму
const form;
// получаем ссылку на список дел ul
const todos;

// загрузка задач из фейковой БД
loadTasks();

// добавление "листнера" на отправку формы
form.addEventListener('submit', submitHandler);

// обработка отправки формы с заглушкой на время отсутствия бэка
function submitHandler() {}

// загрузка задач из фейковой БД (localStorage)
function loadTasks() {}

// имитация запроса к серверу и получение ответа от него
// пишем и комментируем fetch, реализуем загрушку через Promise
function fakePostTask(task) {}

// создание разметки для конкретной задачи
function createTaskHtml(task) {}
