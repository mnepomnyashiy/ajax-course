const form = document.forms.login;
const email = form.email;
const pass = form.password;

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    if (email.value && pass.value) {
        logIn().then(({ token }) => {
            console.log(token);
            localStorage.setItem('authToken', token);
            form.removeEventListener('submit', handleSubmit);
            location.href = '/';
        });
    } else {
        alert('Введите все данные');
    }
}

function logIn() {
    // return fetch('fakeurl', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         email: email.value,
    //         password: pass.value,
    //     }),
    // }).then((response) => response.json());

    return Promise.resolve({
        token: 'some token',
    });
}
