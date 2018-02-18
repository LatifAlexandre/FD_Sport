<?php 
    header('Content-Type: application/json');
    include_once '../../axes/axes.php';
    include_once '../ticket.php';
    
    if (isset($_GET["id"])){
        $id = $_GET["id"];
        $ticketAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_/'.$id.'?columns=axes');
        $ticketAxesId = explode(':', str_replace('}', '', $ticketAxesJson))[1];
        $ticketAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$ticketAxesId);
        $ticketAxes = createAxesWithJson($ticketAxesJson);

        //create prodcuts list
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_?transform=1');
        $products = createTicketArrayWithJson($response, 0, 0);

        $productsArray = array();
        $distancesArray = array();
        $i = 0;
        foreach ($products as $product){
            //get axes object
            //calculate distance from user axes
            $productAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$product->axes);
            $productAxes = createAxesWithJson($productAxesJson);
            $productsArray[$i] = $product;
            $distance = getDistanceBetweenAxes($ticketAxes, $productAxes);
            $distancesArray[$i] = $distance;
            $i++;
        }

        //order by distance
        asort($distancesArray);
        //reverse
        $slicedDistanceArray = array_slice($distancesArray, 0, 3, true);

        $finalProductsArray = array();
        //return top 5 products
        foreach($slicedDistanceArray as $key => $val){
            array_push($finalProductsArray, $productsArray[$key]);
        }
        echo json_encode($finalProductsArray);
    } else {
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?transform=1');
        
        $product = createProductArrayWithJson($response, 0, 1); //TODO replace static values with params
		echo json_encode($product);
    }
?>
