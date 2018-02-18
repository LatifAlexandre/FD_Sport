<?php
    error_reporting(E_ALL ^ E_WARNING);
    include_once '../../product/product.php';
    include_once '../../event/event.php';
    class Actor{
        public $id;
        public $name;
        public $pictureLink;
        public $longitude;
        public $latitude;
        public $locationName;
        public $type;
        public $products;
        public $events;

        public function __construct($actorParams) {
            if (isset($actorParams['id']))
                $this->id = strval($actorParams['id']);
            if (isset($actorParams['name']))
                $this->name = $actorParams['name'];
            if (isset($actorParams['longitude']))
                $this->longitude = $actorParams['longitude'];
            if (isset($actorParams['latitude']))
                $this->latitude = $actorParams['latitude'];
            if (isset($actorParams['locationname']))
                $this->locationName = $actorParams['locationname'];
            if (isset($actorParams['pictureurl']))
                $this->pictureLink = $actorParams['pictureurl'];
            if (isset($actorParams['type']))
                $this->type = $actorParams['type'];
            if (!isset($actorParams['products']) || (strpos($actorParams['products'], '{}') === 0))
                $this->products = null;
            else
                $this->products = $actorParams['products'];

            // if (!isset($actorParams['events']) || (strpos($actorParams['events'], '{}') === 0))
            $this->events = null;
            // else
                // $this->events = $actorParams['events'];
        }
    }

    function &createActorArrayWithJson($json, $currentDepth, $depthToAttain){
        $actors = array();
        $i = 0;
        $actorParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);

        foreach ($jsonIterator as $key => $val) {
            if(is_array($val)) {
                if (count($actorParams) > 0){
                    if ($currentDepth < $depthToAttain){
                        //get events by actor
                        $actorEvents = array();
                        $actorId = $actorParams['id'];
                        $eventJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?filter=actors,ac,'.$actorId);
                        array_push($actorEvents, createEventWithJson($eventJson, $currentDepth + 1, $depthToAttain));
                        $actorParams['events'] = $actorEvents;

                        //get products
                        $actorProducts = array();
                        $actorProductIds = $actorParams['products'];
                        $actorProductIds = str_replace(array('{', '}'),'', $actorProductIds);
                        $actorProductIdsArray = array_filter(explode(',', $actorProductIds));
                        foreach($actorProductIdsArray as $actorProductId){
                            $productJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_/'.$actorProductId);
                            array_push($actorProducts, createProductWithJson($productJson, $currentDepth + 1, $depthToAttain));
                        }
                        $actorParams['products'] = $actorProducts;
                    }
                    $actors[$i] = new Actor($actorParams);
                    $actorParams = array();
                    $i++;
                }  
            } else {
                $actorParams[$key] = $val;
            }
        }

        if (count($actorParams) > 0){
            if ($currentDepth < $depthToAttain){
                //get events by actor
                $actorEvents = array();
                $actorId = $actorParams['id'];
                $eventJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?filter=actors,ac,'.$actorId.'&transform=1');
                array_push($actorEvents, createEventWithJson($eventJson, $currentDepth + 1, $depthToAttain));
                $actorParams['events'] = $actorEvents;

                //get products
                $actorProducts = array();
                $actorProductIds = $actorParams['products'];
                $actorProductIds = str_replace(array('{', '}'),'', $actorProductIds);
                $actorProductIdsArray = array_filter(explode(',', $actorProductIds));
                foreach($actorProductIdsArray as $actorProductId){
                    $productJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_/'.$actorProductId);
                    array_push($actorProducts, createProductWithJson($productJson, $currentDepth + 1, $depthToAttain));
                }
                $actorParams['products'] = $actorProducts;
            }
            $actors[$i] = new Actor($actorParams);
        }

        return $actors;
    }

    function &createActorWithJson($json, $currentDepth, $depthToAttain){
        // echo $json;
        $i = 0;
        $actorParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);

        foreach ($jsonIterator as $key => $val) {
            if(is_array($val)) {
                if (count($actorParams) > 0){
                    // $actorParams = array();
                    // $i++;
                }  
            } else {
                $actorParams[$key] = $val;
            }
        }
        
        if ($currentDepth < $depthToAttain){
            //get events
            $actorEvents = array();
            $actorId = $actorParams['id'];
            $eventJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?filter=actors,ac,'.$actorId);
            array_push($actorEvents, createEventArrayWithJson($eventJson, $currentDepth + 1, $depthToAttain));
            $actorParams['events'] = $actorEvents;

            //get products
            $actorProducts = array();
            $actorProductIds = $actorParams['products'];
            $actorProductIds = str_replace(array('{', '}'),'', $actorProductIds);
            $actorProductIdsArray = array_filter(explode(',', $actorProductIds));
            foreach($actorProductIdsArray as $actorProductId){
                $productJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_/'.$actorProductId);
                array_push($actorProducts, createProductWithJson($productJson, $currentDepth + 1, $depthToAttain));
            }
            $actorParams['products'] = $actorProducts;
        }
        $actor = new Actor($actorParams);

        return $actor;
    }

?>
