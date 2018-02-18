<?php 
    header('Content-Type: application/json');
    include_once '../product.php';
    
    if (isset($_GET["ids"])){
        $ids = "";
        foreach ($_GET['ids'] as $id){
            $ids = $id.",";
        }
        $ids = substr($ids,0,-1);
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?filter=id,in,'.$ids.'&transform=1');
        
        $products = createProductArrayWithJson($response, 0, 1); //TODO replace static values with params
		echo json_encode($products);
    }
?>
