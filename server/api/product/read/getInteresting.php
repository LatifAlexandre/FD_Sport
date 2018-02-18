<?php 
    header('Content-Type: application/json');
    include_once '../../axes/axes.php';
    include_once '../product.php';
    
    if (isset($_GET["userId"])){
        $userId = $_GET["userId"];
        $userAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/user_/'.$userId.'?columns=axes');
        $userAxesId = explode(':', str_replace('}', '', $userAxesJson))[1];
        $userAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$userAxesId);
        $userAxes = createAxesWithJson($userAxesJson);

        //create prodcuts list
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?transform=1');
        $products = createProductArrayWithJson($response, 0, 0);

        $productsArray = array();
        $distancesArray = array();
        $i = 0;
        foreach ($products as $product){
            //get axes object
            //calculate distance from user axes
            $productAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$product->axes);
            $productAxes = createAxesWithJson($productAxesJson);
            $productsArray[$i] = $product;
            $distance = getDistanceBetweenAxes($userAxes, $productAxes);
            $distancesArray[$i] = $distance;
            $i++;
        }

        //order by distance
        asort($distancesArray);
        //reverse
        array_reverse($distancesArray, true);
        //get last 5 elements and conserve keys
        $slicedDistanceArray = array_slice($distancesArray, -5, 5, true);

        $finalProductsArray = array();
        //return top 5 products
        foreach($slicedDistanceArray as $key => $val){
            array_push($finalProductsArray, $productsArray[$key]);
        }
        echo json_encode($finalProductsArray);
    } else {
        // $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?transform=1');
        
        // $product = createProductArrayWithJson($response, 0, 1); //TODO replace static values with params
        
        echo json_encode([]);
    }
?>
