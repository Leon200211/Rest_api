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
    //document.querySelector('.post-list').innerHTML = "<h5> Редактирование записи №" + post.message.id_posts +"</h5>";
    document.getElementById('exampleInputName2').value = post.message.name;
    document.getElementById('exampleInputEmail2').value = post.message.email;
    document.getElementById('exampleInputPhone2').value = post.message.phone;
    document.getElementById('exampleInputCompany2').value = post.message.company;
    document.getElementById('exampleInputDate2').value = post.message.date;
    document.getElementById('exampleInputPhoto2').value = post.message.photo;
}


async function updatePost(){
    const name = document.getElementById('exampleInputName2').value,
        email = document.getElementById('exampleInputEmail2').value,
        phone = document.getElementById('exampleInputPhone2').value,
        company = document.getElementById('exampleInputCompany2').value,
        date = document.getElementById('exampleInputDate2').value,
        photo = document.getElementById('exampleInputPhoto2').value;
    const info = {
        name: name,
        email: email,
        phone: phone,
        company: company,
        date: date,
        photo: photo
    }
    const res = await fetch(`http://test.api.ru/posts/${params['id']}`, {
        method: 'PATCH',
        body: JSON.stringify(info)
    });
    let resData = res.json();
    if (resData.status === true){
        window.location.href = 'index.html';
    } else {
        document.querySelector('.errors').innerHTML = "Заполните все обязательные поля";
    }
}



getPosts();