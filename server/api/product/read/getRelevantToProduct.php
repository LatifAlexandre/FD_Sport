<?php 
    header('Content-Type: application/json');
    include_once '../../axes/axes.php';
    include_once '../product.php';
    
    if (isset($_GET["id"])){
        $id = $_GET["id"];
        $daProductAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_/'.$id.'?columns=axes');
        $daProductAxesId = explode(':', str_replace('}', '', $daProductAxesJson))[1];
        $daProductAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$daProductAxesId);
        $daProductAxes = createAxesWithJson($daProductAxesJson);

        //create prodcuts list
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?transform=1');
        $products = createProductArrayWithJson($response, 0, 0);

        $productsArray = array();
        $distancesArray = array();
        $i = 0;
        foreach ($products as $product){
            //get axes object
            //calculate distance from user axes
            if ($daProductAxesId != $product->axes){
                $productAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$product->axes);
                $productAxes = createAxesWithJson($productAxesJson);

                $productsArray[$i] = $product;
                $distance = getDistanceBetweenAxes($daProductAxes, $productAxes);
                $distancesArray[$i] = $distance;
                $i++;
            }
        }

        //order by distance
        asort($distancesArray);
        //get last 5 elements and conserve keys
        $slicedDistanceArray = array_slice($distancesArray, 0, 3, true);

        $finalProductsArray = array();
        //return top 5 products
        foreach($slicedDistanceArray as $key => $val){
            // echo $key."->".$val."\n";
            array_push($finalProductsArray, $productsArray[$key]);
        }
        echo json_encode($finalProductsArray);
    } else {
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?transform=1');
        
        $product = createProductArrayWithJson($response, 0, 1); //TODO replace static values with params
		echo json_encode($product);
    }
?>
