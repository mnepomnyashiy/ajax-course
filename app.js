let logoutBtn = null;
isAuthenticated();

function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    if (!token) location.href = '/login.html';

    getUser(token).then(({ name }) => {
        document.addEventListener('DOMContentLoaded', () => {
            const username = document.getElementById('username');
            username.innerText = name;

            logoutBtn = document.getElementById('logout');

            logoutBtn.addEventListener('click', handleLogOut);
        });
    });
}

function handleLogOut() {
    localStorage.removeItem('authToken');
    logoutBtn.removeEventListener('click', handleLogOut);
    isAuthenticated();
}

// запрос на сервер, получающий данные пользователя по токену
function getUser(token) {
    // return fetch('fakeserver', {
    //     headers: {
    //         'X-JWT-Auth': token,
    //     },
    // }).then((response) => response.json()).catch((err) => {
    //     console.error(err);
    //     handleLogOut();
    // });

    return Promise.resolve({
        name: 'Mikhail',
    });
}
