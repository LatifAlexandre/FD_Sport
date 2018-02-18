<?php 
    header('Content-Type: application/json');
    include_once '../axes.php';
    include_once '../../product/product.php';
    
    if (isset($_GET["id"])){
        $id = $_GET["id"];
        $productJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_/'.$id.'?columns=axes&transform=1');
        
        $productAxesId = explode(':', str_replace('}', '', $productJson))[1];
        $productAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$productAxesId);
        $productAxes = createAxesWithJson($productAxesJson);

		echo json_encode($productAxes);
    } else {
        echo 'please set [id]';
    }
?>