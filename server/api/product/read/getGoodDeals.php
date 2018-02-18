<?php 
    header('Content-Type: application/json');
    include_once '../product.php';

    $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?filter[]=discount,ge,30&filter[]=price,le,20&satisfy=any&transform=1');
    
    $products = createProductArrayWithJson($response, 0, 0); //TODO replace static values with params
    echo json_encode($products);
?>
