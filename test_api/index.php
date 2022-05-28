<?php


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: json/application');


require_once 'connect_to_database.php';
require_once 'functions.php';


$method = $_SERVER['REQUEST_METHOD'];

$q = $_GET['q'];
$params = explode('/', $q);

$type = $params[0];
if(isset($params[1])){
    $id = $params[1];
}



switch ($method) {
    case "GET":
        if($type === 'posts'){
            if(isset($id)){
                getPost($connect, $id);
            } else {
                getPosts($connect);
            }
        }
        break;
    case "POST":
        if($type === 'posts'){
            addPost($connect, $_POST);
        }
        break;
    case "PATCH":
        if($type === 'posts'){
            if(isset($id)) {
                $info = file_get_contents('php://input');
                $info = json_decode($info, true);
                updatePost($connect, $id, $info);
            }
        }
        break;
    case "DELETE":
        if($type === 'posts') {
            if(isset($id)) {
                delPost($connect, $id);
            }
        }
}






