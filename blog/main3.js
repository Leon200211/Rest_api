var params = window
    .location
    .search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );

async function getPosts() {
    let res = await fetch('http://test.api.ru/posts/' + params['id']);
    let post = await res.json();

    document.querySelector('.post-list').innerHTML = "";

        document.querySelector('.post-list').innerHTML += `
                <div class="card" style="width: 18rem; margin-left: 10px; margin-bottom: 10px;">
                    <div class="card-body">
                        <h5 class="card-title">Номер записи: ${post.message.id_posts}</h5>
                        <h5 class="card-title">Компания: ${post.message.company}</h5>
                        <h5 class="card-title">ФИО: ${post.message.name}</h5>
                        <h5 class="card-title">Тел.: ${post.message.phone}</h5>
                        <h5 class="card-title">Почта: ${post.message.email}</h5>
                        <h5 class="card-title">Дата: ${post.message.date}</h5>
                        <h5 class="card-title">Фото: ${post.message.photo}</h5>
                        <div style="margin-top: 20px;"><a href="index.html">Вернуться</a></div>
                    </div>
                </div>
        `
}

getPosts();