<?php 
    header('Content-Type: application/json');
    include_once '../../user/user.php';
    
    $usersJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/user_?transform=1');
    
    $users = createUserArrayWithJson($usersJson, 0, 2);
    echo json_encode($users);
?>
