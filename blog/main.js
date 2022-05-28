
let id = null;

async function getPosts() {
    let res = await fetch('http://test.api.ru/posts');
    let posts = await res.json();

    document.querySelector('.post-list').innerHTML = "";

    posts.forEach((post) => {
        document.querySelector('.post-list').innerHTML += `
                <div class="card" style="width: 18rem; margin-left: 10px; margin-bottom: 10px;">
                    <div class="card-body">
                        <h5 class="card-title">Номер записи: ${post.id_posts}</h5>
                        <h5 class="card-title">Компания: ${post.company}</h5>
                        <h5 class="card-title">ФИО: ${post.name}</h5>
                        <h5 class="card-title">Тел.: ${post.phone}</h5>
                        <h5 class="card-title">Почта: ${post.email}</h5>
                        <h5 class="card-title">Дата: ${post.date}</h5>
                        <h5 class="card-title">Фото: ${post.photo}</h5>
                        <a href="update.html?id=${post.id_posts}" class="card-link"')">Редактировать</a>
                        <a href="#" class="card-link" onclick="deletePost(${post.id_posts})">Удалить</a>
                        <a href="show.html?id=${post.id_posts}" class="card-link">Подробнее</a>
                    </div>
                </div>
        `
    })
}



async function addPost(){
    const name = document.getElementById('exampleInputName1').value,
        email = document.getElementById('exampleInputEmail1').value,
        phone = document.getElementById('exampleInputPhone1').value,
        company = document.getElementById('exampleInputCompany1').value,
        date = document.getElementById('exampleInputDate1').value,
        photo = document.getElementById('exampleInputPhoto1').value;


    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('company', company);
    formData.append('date', date);
    formData.append('photo', photo);

    const res = await fetch('http://test.api.ru/posts', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();
    console.log(data.status);
    if (data.status === true){
        document.querySelector('.errors').innerHTML = "";
        await getPosts();
    } else {
        document.querySelector('.errors').innerHTML = "Заполните все обязательные поля";
    }
}



async function deletePost(id_posts){
    const res = await fetch(`http://test.api.ru/posts/${id_posts}`, {
        method: "DELETE"
    });

    const data = await res.json();

    if(data.status === true){
        document.querySelector('.errors').innerHTML = "";
        await getPosts();
    }
}


getPosts();




