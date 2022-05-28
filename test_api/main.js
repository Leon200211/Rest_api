async function getPosts() {
    let res = await fetch('https://test.api.ru/posts');
    let posts = await res.json();

    posts.forEach((post) => {
        document.querySelector('.post-list').innerHTML += `

                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${post.name}</h5>
                        <a href="#" class="card-link">Редактировать</a>
                        <a href="#" class="card-link">Удалить</a>
                    </div>
                </div>

        `
    })
}

getPosts();