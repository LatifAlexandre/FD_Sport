<?php
    error_reporting(E_ALL ^ E_WARNING);
    include_once '../../product/product.php';
    include_once '../../event/event.php';
    include_once '../../axes/axes.php';
    class Ticket{
        public $id;
        public $name;
        public $price;
        public $reduction;
        public $stock;
        public $description;
        public $pictureLink;
        public $event;
        public $floating;
        public $axes;

        public $relatedProducts;
        public $relatedTickets;

        public function __construct($ticketParams) {
            $this->id = strval($ticketParams['id']);
            $this->name = $ticketParams['name'];
            $this->price = $ticketParams['price'];
            $this->reduction = $ticketParams['discount'];
            $this->stock = $ticketParams['stock'];
            $this->description = $ticketParams['description'];
            $this->pictureLink = $ticketParams['pictureurl'];
            $this->floating = $ticketParams['floating'];
            $this->axes = $ticketParams['axes'];
            if (isset($ticketParams['event']))
                $this->event = $ticketParams['event'];
            if (isset($ticketParams['relatedProducts']))
                $this->relatedProducts = $ticketParams['relatedProducts'];
            if (isset($ticketParams['relatedTickets']))
                $this->relatedTickets = $ticketParams['relatedTickets'];
        }
    }

    function &createTicketArrayWithJson($json, $currentDepth, $depthToAttain){
        $tickets = array();
        $i = 0;
        $ticketParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);
            
        foreach ($jsonIterator as $key => $val) {
            if(is_array($val)) {
                if (count($ticketParams) > 0){
                    if ($currentDepth < $depthToAttain){
                        $ticketId = $ticketParams['id'];
                        $eventJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?filter=tickets,ac,'.$ticketId.'&transform=1');
                        $event = createEventWithJson($eventJson, $currentDepth + 1, $depthToAttain);
                        $ticketParams['event'] = $event;

                        /****** START RELATED TICKETS ******/
                        $eventTickets = array();
                        $eventTicketIds = $event->tickets;
                        $eventTicketIds = str_replace(array('{', '}', $ticketId, ''),'', $eventTicketIds);
                        $eventTicketIdsArray = array_filter(explode(',', $eventTicketIds));
                        foreach($eventTicketIdsArray as $eventTicketId){
                            $ticketJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_/'.$eventTicketId);
                            array_push($eventTickets, createTicketWithJson($ticketJson, $currentDepth + 1, $depthToAttain));
                            // print_r($eventTickets);
                        }
                        if (count($eventTickets) == 0)
                            $eventTickets = null;
                        $ticketParams['relatedTickets'] = $eventTickets;
                        /****** END RELATED TICKETS ******/
                        /****** START RELATED PRODUCTS ******/
                        $ticketAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$ticketParams['axes']);
                        $ticketAxes = createAxesWithJson($ticketAxesJson);

                        //create prodcuts list
                        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?transform=1');
                        $products = createProductArrayWithJson($response, 0, 0);

                        $productsArray = array();
                        $distancesArray = array();
                        $i = 0;
                        foreach ($products as $product){
                            $productAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$product->axes);
                            $productAxes = createAxesWithJson($productAxesJson);
                            $productsArray[$i] = $product;
                            $distance = getDistanceBetweenAxes($ticketAxes, $productAxes);
                            $distancesArray[$i] = $distance;
                            $i++;
                        }

                        //order by distance
                        asort($distancesArray);
                        //get last 5 elements and conserve keys
                        $slicedDistanceArray = array_slice($distancesArray, 0, 3, true);

                        $finalProductsArray = array();
                        //return top 5 products
                        foreach($slicedDistanceArray as $key => $val){
                            array_push($finalProductsArray, $productsArray[$key]);
                        }
                        if (count($finalProductsArray) == 0)
                            $eventTickets = null;
                        $ticketParams['relatedProducts'] = $finalProductsArray;
                        /****** END RELATED PRODUCTS ******/
                    }
                    $tickets[$i] = new Ticket($ticketParams);
                    $ticketParams = array();
                    $i++;
                }  
            } else {
                $ticketParams[$key] = $val;
            }
        }
        
        // if (count($tickets) == 0 && count($ticketParams) > 0)
            $tickets[$i] = new Ticket($ticketParams);

        return $tickets;
    }

    function &createTicketWithJson($json, $currentDepth, $depthToAttain){
        $i = 0;
        $ticketParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);

        foreach ($jsonIterator as $key => $val) {
                $ticketParams[$key] = $val;
        }

        if ($currentDepth < $depthToAttain){
            $ticketId = $ticketParams['id'];
            $eventJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?filter=tickets,ac,'.$ticketId.'&transform=1');
            $event = createEventWithJson($eventJson, $currentDepth + 1, $depthToAttain);
            $ticketParams['event'] = $event;
            //get tickets by event then exclude this ticket
            $eventTickets = array();
            $eventTicketIds = $event->tickets;
            $eventTicketIds = str_replace(array('{', '}', $ticketId, ''),"", $eventTicketIds);
            $eventTicketIdsArray = array_filter(explode(',', $eventTicketIds));
            foreach($eventTicketIdsArray as $eventTicketId){
                // echo $eventTicketId;
                $ticketJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_/'.$eventTicketId);
                array_push($eventTickets, createTicketWithJson($ticketJson, $currentDepth + 1, $depthToAttain));
            }
            $ticketParams['relatedTickets'] = $eventTickets;
			/****** END RELATED TICKETS ******/
			/****** START RELATED PRODUCTS ******/
			$ticketAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$ticketParams['axes']);
            $ticketAxes = createAxesWithJson($ticketAxesJson);

            //create prodcuts list
            $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_?transform=1');
            $products = createProductArrayWithJson($response, 0, 0);

            $productsArray = array();
            $distancesArray = array();
            $i = 0;
            foreach ($products as $product){
                $productAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$product->axes);
                $productAxes = createAxesWithJson($productAxesJson);
                $productsArray[$i] = $product;
                $distance = getDistanceBetweenAxes($ticketAxes, $productAxes);
                $distancesArray[$i] = $distance;
                $i++;
            }

            //order by distance
            asort($distancesArray);
            //get last 5 elements and conserve keys
            $slicedDistanceArray = array_slice($distancesArray, 0, 3, true);

            $finalProductsArray = array();
            //return top 5 products
            foreach($slicedDistanceArray as $key => $val){
                array_push($finalProductsArray, $productsArray[$key]);
            }
            $ticketParams['relatedProducts'] = $finalProductsArray;

			//******************** TODO
            $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_?transform=1');
            $tickets = createTicketArrayWithJson($response, 0, 0);
    
            $ticketsArray = array();
            $distancesArray = array();
            $i = 0;
            foreach ($tickets as $ticket){
                //get axes object
                //calculate distance from user axes
                if ($ticketParams['axes'] != $ticket->axes){
                    $ticketAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$ticket->axes);
                    $ticketAxes = createAxesWithJson($ticketAxesJson);
                    $ticketsArray[$i] = $ticket;
                    $distance = getDistanceBetweenAxes($ticketAxes, $ticketAxes);
                    $distancesArray[$i] = $distance;
                    $i++;
                }
            }
    
            //order by distance
            asort($distancesArray);
            $slicedDistanceArray = array_slice($distancesArray, 0, 3, true);
            $finalTicketsArray = array();
            //return top 5 products
            foreach($slicedDistanceArray as $key => $val){
                array_push($finalTicketsArray, $ticketsArray[$key]);
            }
            $ticketParams['relatedTickets'] = $finalTicketsArray;
			//********************
            
        }

        $ticket = new Ticket($ticketParams);

        return $ticket;
    }
?>
