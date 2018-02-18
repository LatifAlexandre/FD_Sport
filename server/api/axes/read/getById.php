<?php 
    header('Content-Type: application/json');
    include_once '../axes.php';
    
    if (isset($_GET["id"])){
        $id = $_GET["id"];
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$id.'?transform=1');
        
        $axes = createAxesWithJson($response);
		echo json_encode($axes);
    } else {
        echo 'please set [id]';
    }
?>
