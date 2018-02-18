<?php
    header('Content-Type: application/json');
    include_once 'axes/axes.php';
    include_once 'product/product.php';
    include_once 'ticket/ticket.php';

    // $axes1Json = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/1');
    // $axes2Json = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/2');

    // $axes1 = createAxesWithJson($axes1Json);
    // $axes2 = createAxesWithJson($axes2Json);
    getRelevantProductsByUserId(1);

    function getRelevantProductsByUserId($userId){
        //get user axes
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
    }

    function getRelevantTicketsByUserId($userId){

    }
?>