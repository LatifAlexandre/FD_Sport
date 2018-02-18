<?php
    error_reporting(E_ALL ^ E_WARNING);
	include_once '../../ticket/ticket.php';
	include_once '../../axes/axes.php';
	
    class Product{
        public $id;
        public $name;
        public $price;
        public $reduction;
        public $stock;
        public $description;
        public $pictureLink;
        
        public $relatedProducts;
        public $relatedTickets;
        public $floating;
        public $axes;

        public function __construct($productParams) {
            $this->id = strval($productParams['id']);
            $this->name = $productParams['name'];
            $this->price = $productParams['price'];
            $this->reduction = $productParams['discount'];
            $this->stock = $productParams['stock'];
            $this->description = $productParams['description'];
            $this->pictureLink = $productParams['pictureurl'];
            $this->floating = $productParams['floating'];
            $this->axes = $productParams['axes'];
            if (isset($productParams['relatedProducts']))
                $this->relatedProducts = $productParams['relatedProducts'];
            if (isset($productParams['relatedTickets']))
                $this->relatedTickets = $productParams['relatedTickets'];
        }
    }

     function &createProductArrayWithJson($json, $currentDepth, $depthToAttain){
        
        $products = array();
        $i = 0;
        $productParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);
            
        foreach ($jsonIterator as $key => $val) {
            if(is_array($val)) {
                if (count($productParams) > 0){
                    if ($currentDepth < $depthToAttain){
                        /****** START RELATED PRODUCTS ******/
                        $daProductAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$productParams['axes']);
                        $daProductAxes = createAxesWithJson($daProductAxesJson);

                        //create prodcuts list
                        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?transform=1');
                        $relatedroducts = createProductArrayWithJson($response, 0, 0);

                        $productsArray = array();
                        $distancesArray = array();
                        $j = 0;
                        foreach ($relatedroducts as $product){
                            //get axes object
                            //calculate distance from user axes
                            if ($productParams['axes'] !== $product->axes){
                                $productAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$product->axes);
                                $productAxes = createAxesWithJson($productAxesJson);

                                $productsArray[$j] = $product;
                                $distance = getDistanceBetweenAxes($daProductAxes, $productAxes);
                                $distancesArray[$j] = $distance;
                                $j++;
                            }
                        }
                        //order by distance
                        asort($distancesArray);
                        //get last 5 elements and conserve keys
                        $slicedDistanceArray = array_slice($distancesArray, 0, 5, true);
                        $finalProductsArray = array();
                        //return top 5 products
                        foreach($slicedDistanceArray as $key => $val){
                            // echo $key."->".$val."\n";
                            array_push($finalProductsArray, $productsArray[$key]);
                        }
                        // echo json_encode($finalProductsArray);
                        // $relatedProducts = createProductArrayWithJson($relatedProductsJson, $currentDepth + 1, $depthToAttain);
                        $productParams['relatedProducts'] = $finalProductsArray;
                        
                        
                        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_?transform=1');
                        $tickets = createTicketArrayWithJson($response, 0, 0);
                
                        $ticketsArray = array();
                        $distancesArray = array();
                        $i = 0;
                        foreach ($tickets as $ticket){
                            //get axes object
                            //calculate distance from user axes
                            $ticketAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$ticket->axes);
                            $ticketAxes = createAxesWithJson($ticketAxesJson);
                            $ticketsArray[$i] = $ticket;
                            $distance = getDistanceBetweenAxes($daProductAxes, $ticketAxes);
                            $distancesArray[$i] = $distance;
                            $i++;
                        }
        
                        //order by distance
                        asort($distancesArray);
                        //reverse
                        $slicedDistanceArray = array_slice($distancesArray, 0, 3, true);
                        $finalTicketsArray = array();
                        //return top 5 products
                        foreach($slicedDistanceArray as $key => $val){
                            array_push($finalTicketsArray, $ticketsArray[$key]);
                        }
                        $productParams['relatedTickets'] = $finalTicketsArray;
                    }
                    $products[$i] = new Product($productParams);
                    $productParams = array();
                    $i++;
                }  
            } else {
                $productParams[$key] = $val;
            }
        }

        if (count($productParams) > 0){
            if ($currentDepth < $depthToAttain){
                /****** START RELATED PRODUCTS ******/
                $daProductAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$productParams['axes']);
                $daProductAxes = createAxesWithJson($daProductAxesJson);

                //create prodcuts list
                $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?transform=1');
                $relatedroducts = createProductArrayWithJson($response, 0, 0);

                $productsArray = array();
                $distancesArray = array();
                $j = 0;
                foreach ($relatedroducts as $product){
                    //get axes object
                    //calculate distance from user axes
                    if ($productParams['axes'] !== $product->axes){
                        $productAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$product->axes);
                        $productAxes = createAxesWithJson($productAxesJson);

                        $productsArray[$j] = $product;
                        $distance = getDistanceBetweenAxes($daProductAxes, $productAxes);
                        $distancesArray[$j] = $distance;
                        $j++;
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
                // echo json_encode($finalProductsArray);
                // $relatedProducts = createProductArrayWithJson($relatedProductsJson, $currentDepth + 1, $depthToAttain);
                $productParams['relatedProducts'] = $finalProductsArray;
                
                $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_?transform=1');
                $tickets = createTicketArrayWithJson($response, 0, 0);
        
                $ticketsArray = array();
                $distancesArray = array();
                $i = 0;
                foreach ($tickets as $ticket){
                    //get axes object
                    //calculate distance from user axes
                    $ticketAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$ticket->axes);
                    $ticketAxes = createAxesWithJson($ticketAxesJson);
                    $ticketsArray[$i] = $ticket;
                    $distance = getDistanceBetweenAxes($daProductAxes, $ticketAxes);
                    $distancesArray[$i] = $distance;
                    $i++;
                }
        
                //order by distance
                asort($distancesArray);
                //reverse
                $slicedDistanceArray = array_slice($distancesArray, 0, 3, true);
                $finalTicketsArray = array();
                //return top 5 products
                foreach($slicedDistanceArray as $key => $val){
                    array_push($finalTicketsArray, $ticketsArray[$key]);
                }
			    $productParams['relatedTickets'] = $finalTicketsArray;
            }
            $products[$i] = new Product($productParams);
        }

        return $products;
    }

    function &createProductWithJson($json, $currentDepth, $depthToAttain){
        $i = 0;
        $productParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);

        foreach ($jsonIterator as $key => $val) {
                $productParams[$key] = $val;
        }

        if ($currentDepth < $depthToAttain){
			    $daProductAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$productParams['axes']);
                $daProductAxes = createAxesWithJson($daProductAxesJson);

                //create prodcuts list
                $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?transform=1');
                $relatedroducts = createProductArrayWithJson($response, 0, 0);

                $productsArray = array();
                $distancesArray = array();
                $j = 0;
                foreach ($relatedroducts as $product){
                    //get axes object
                    //calculate distance from user axes
                    if ($productParams['axes'] !== $product->axes){
                        $productAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$product->axes);
                        $productAxes = createAxesWithJson($productAxesJson);

                        $productsArray[$j] = $product;
                        $distance = getDistanceBetweenAxes($daProductAxes, $productAxes);
                        $distancesArray[$j] = $distance;
                        $j++;
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
                // echo json_encode($finalProductsArray);
                // $relatedProducts = createProductArrayWithJson($relatedProductsJson, $currentDepth + 1, $depthToAttain);
                $productParams['relatedProducts'] = $finalProductsArray;
			
        
                //create prodcuts list
                $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_?transform=1');
                $tickets = createTicketArrayWithJson($response, 0, 0);
        
                $ticketsArray = array();
                $distancesArray = array();
                $i = 0;
                foreach ($tickets as $ticket){
                    //get axes object
                    //calculate distance from user axes
                    $ticketAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$ticket->axes);
                    $ticketAxes = createAxesWithJson($ticketAxesJson);
                    $ticketsArray[$i] = $ticket;
                    $distance = getDistanceBetweenAxes($daProductAxes, $ticketAxes);
                    $distancesArray[$i] = $distance;
                    $i++;
                }
        
                //order by distance
                asort($distancesArray);
                //reverse
                $slicedDistanceArray = array_slice($distancesArray, 0, 3, true);
                $finalTicketsArray = array();
                //return top 5 products
                foreach($slicedDistanceArray as $key => $val){
                    array_push($finalTicketsArray, $ticketsArray[$key]);
                }
			    $productParams['relatedTickets'] = $finalTicketsArray;
        }

        $product = new Product($productParams);

        return $product;
    }
?>
