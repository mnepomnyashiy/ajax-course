const addPostForm = document.forms.newpost;
addPostForm.onsubmit = newPost;
const postList = document.querySelector('.posts');
const postsUrl = `https://jsonplaceholder.typicode.com/posts`;
const authorsUrl = `https://jsonplaceholder.typicode.com/users`;

let posts = null;
let authors = null;

printAllPosts();

function printAllPosts() {
    Promise.all([getPosts(), getAuthors()]).then((data) => {
        [posts, authors] = data;

        posts.forEach((post) => {
            const author = getAuthor(post.userId);
            createPost({ post, author });
        });
        generateAuthorsSelect();
    });
}

function getPosts() {
    return fetch(postsUrl + '?_limit=15').then((res) => res.json());
}

function getAuthors() {
    return fetch(authorsUrl).then((res) => res.json());
}

function createPost(data) {
    const { post, author } = data;

    postList.insertAdjacentHTML(
        'afterbegin',
        `<div class="card">
        <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
                ${author.name}
            </h6>
            <p class="card-text">${post.body}</p>
        </div>
    </div>
    `
    );
}

function newPost(e) {
    e.preventDefault();
    const title = addPostForm.postname.value;
    const body = addPostForm.postbody.value;
    const authorId = addPostForm.author.value;

    if (title && body) {
        fetch(postsUrl, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ userId: authorId, title, body }),
        })
            .then((res) => res.json())
            .then((data) => {
                const author = getAuthor(data.userId);
                console.log(author);
                createPost({ post: data, author });
            });
    } else {
        alert('Заполните все поля формы!');
    }
}

function generateAuthorsSelect() {
    const select = addPostForm.author;

    authors &&
        authors.forEach((author) => {
            const option = new Option(author.name, author.id);
            select.add(option);
        });
}

function getAuthor(authorId) {
    return authors.filter((el) => el.id == authorId)[0];
}
