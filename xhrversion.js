// Получить ссылку на список карточек .cards
const cardList = document.querySelector('.cards');
// Переменная для получения кнопки
let loadMoreBtn = null;
// Вызов функции-инициализации
initLoadBtn();

// Написать функцию, которая
// 1) получает ссылку на кнопку в переменную loadMoreBtn
// 2) Проверяет наличие кнопки на страницы
// 3) В случае наличия кнопки добавляет на нее обработчик клика (вызов функции loadMoreHandler)
function initLoadBtn() {
    loadMoreBtn = document.querySelector('button[data-more]');

    if (loadMoreBtn != null) {
        loadMoreBtn.addEventListener('click', loadMoreHandler)
    }
}

// Написать функцию, которая
// 1) получает ссылку для запроса из дата-атрибута кнопки 'data-more'
// 2) делает xhr запрос по ссылке
// 3) по получению данных:
// 3.1) с кнопки "Загрузить еще" снимается обработчик события
// 3.2) текущая кнопка "Загрузить еще" удаляется из DOM
// 3.3) к списку карточек добавляется полученный набор HTML-текста
// 3.3) вызывается функция initLoadBtn для обработки новой кнопки "Загрузить еще"
// 4) если данные не получены, должен появляться предупреждающий alert
function loadMoreHandler() {
    const url = this.dataset.more; // this.getAttributes('data-more')
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if (xhr.status === 200) {
                loadMoreBtn.removeEventListener('click', loadMoreHandler);
                loadMoreBtn.remove();
                cardList.insertAdjacentHTML('beforeend', xhr.responseText);
                initLoadBtn();
            } else {
                alert("Ошибка" + xhr.statusText);
            }
        }
    }
}
