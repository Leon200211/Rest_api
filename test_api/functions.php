<?php

//данные о всех записях
function getPosts($connect){
    $posts = mysqli_query($connect, "SELECT * FROM `posts`");
    $postsList = [];
    while($post = mysqli_fetch_assoc($posts)){
        $postsList[] = $post;
    }
    echo json_encode($postsList);
}

// данные о определенной записи
function getPost($connect, $id){
    $post = mysqli_query($connect, "SELECT * FROM `posts` WHERE `id_posts` ='$id'");
    if(mysqli_num_rows($post) === 0){
        http_response_code(404);
        $res = [
            "status" => false,
            "message" => "Post not found"
        ];
        echo json_encode($res);
    } else{
        $res = [
            "status" => true,
            "message" => mysqli_fetch_assoc($post)
        ];
        //$post = mysqli_fetch_assoc($post);
        echo json_encode($res);
    }
}


// добавить запись
function addPost($connect, $data){

    if(!empty($data['name']) AND !empty($data['email']) AND !empty($data['phone'])) {
        $sql = "SELECT * FROM `posts` ORDER BY id DESC LIMIT 1";
        $id_order = mysqli_query($connect, $sql);
        $id_order = mysqli_fetch_assoc($id_order);
        if (!empty($id_order['id_posts'])) {
            $id_posts = $id_order['id_posts'] += 1;
        } else {
            $id_posts = 1;
        }
        $name = $data['name'];
        $email = $data['email'];
        $phone = $data['phone'];
        $company = $data['company'];
        $date = $data['date'];
        $photo = $data['photo'];

        mysqli_query($connect, "INSERT INTO `posts` (`id`, `id_posts`, `company`, `name`, `phone`, `email`, `date`, `photo`) VALUES (NULL, '$id_posts', '$company', '$name', '$phone', '$email', '$date', '$photo')");
        http_response_code(201);
        $res = [
            "status" => true,
            "post_id" => mysqli_insert_id($connect)
        ];
        echo json_encode($res);
    } else {
        $res = [
            "status" => false
        ];
        echo json_encode($res);
    }
}

// обновить данные
function updatePost($connect, $id, $info){
    if(!empty($data['name']) AND !empty($data['email']) AND !empty($data['phone'])) {
        $company = $info['company'];
        $name = $info['name'];
        $phone = $info['phone'];
        $email = $info['email'];
        $date = $info['date'];
        $photo = $info['photo'];
        mysqli_query($connect, "UPDATE `posts` SET `company` = '$company', `name` = '$name', `phone` = '$phone', `email` = '$email', `date` = '$date', `photo` = '$photo' WHERE `posts`.`id_posts`  = '$id'");

        http_response_code(200);
        $res = [
            "status" => true,
            "message" => "Post is updated"
        ];
        echo json_encode($res);
    } else {
    $res = [
        "status" => false
    ];
    echo json_encode($res);
}
}



// удалить запись
function delPost($connect, $id) {

    mysqli_query($connect, "DELETE FROM `posts` WHERE `posts`.`id_posts` = '$id'");
    mysqli_query($connect, "UPDATE `posts` SET `id_posts` = `id_posts`-1 WHERE `id_posts` > '$id'");

    http_response_code(200);
    $res = [
        "status" => true,
        "message" => "Post is deleted"
    ];
    echo json_encode($res);
}

