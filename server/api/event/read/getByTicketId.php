<?php 
    header('Content-Type: application/json');
    if (isset($_GET["id"])){
        $id = $_GET['id'];
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?filter=tickets,ac,'.$id.'&transform=1');
        echo $response;
    }
?>