<?php
    error_reporting(E_ALL ^ E_WARNING);
    include_once '../../event/event.php';
    include_once '../../product/product.php';
    class Competition{
            public $id;
            public $name;
            public $startDate;
            public $endDate;
            public $pictureLink;

            public $products;
            public $events;

            public function __construct($competitionParams) {
                if (isset($competitionParams['id']))
                    $this->id = strval($competitionParams['id']);
                if (isset($competitionParams['name']))
                    $this->name = $competitionParams['name'];
                if (isset($competitionParams['startdate']))
                    $this->startDate = $competitionParams['startdate'];
                if (isset($competitionParams['enddate']))
                    $this->endDate = $competitionParams['enddate'];
                if (isset($competitionParams['pictureurl']))
                    $this->pictureLink = $competitionParams['pictureurl'];

                if (!isset($competitionParams['products']) || (strpos($competitionParams['products'], '{}') === 0))
                    $this->products = null;
                else
                    $this->products = $competitionParams['products'];

                if (!isset($competitionParams['events']) || (strpos($competitionParams['events'], '{}') === 0))
                    $this->events = null;
                else
                    $this->events = $competitionParams['events'];
            }
    }

    function &createCompetitionArrayWithJson($json, $currentDepth, $depthToAttain){
        $competitions = array();
        $i = 0;
        $competitionParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);

        foreach ($jsonIterator as $key => $val) {
            if(is_array($val)) {
                if (count($competitionParams) > 0){
                    if ($currentDepth < $depthToAttain){
                        //TODO get events
                        $competitionEvents = array();
                        $competitionEventIds = $competitionParams['events'];
                        $competitionEventIds = str_replace(array('{', '}'),'', $competitionEventIds);
                        $competitionEventIdsArray = array_filter(explode(',', $competitionEventIds));
                        foreach($competitionEventIdsArray as $competitionEventId){
                            $eventJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_/'.$competitionEventId);
                            array_push($competitionEvents, createEventWithJson($eventJson, $currentDepth + 1, $depthToAttain));
                        }
                        $competitionParams['events'] = $competitionEvents;
                        //TODO get products
                        $competitionProducts = array();
                        $competitionProductIds = $competitionParams['products'];
                        $competitionProductIds = str_replace(array('{', '}'),'', $competitionProductIds);
                        $competitionProductIdsArray = array_filter(explode(',', $competitionProductIds));
                        foreach($competitionProductIdsArray as $competitionProductId){
                            $productsJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_/'.$competitionProductId);
                            array_push($competitionProducts, createProductWithJson($productsJson, $currentDepth + 1, $depthToAttain));
                        }
                        $competitionParams['products'] = $competitionProducts;
                    }
                    $competitions[$i] = new Competition($competitionParams);
                    $competitionParams = array();
                    $i++;
                }  
            } else {
                $competitionParams[$key] = $val;
            }
        }

        if (count($competitionParams) > 0){
            if ($currentDepth < $depthToAttain){
                $competitionEvents = array();
                $competitionEventIds = $competitionParams['events'];
                $competitionEventIds = str_replace(array('{', '}'),'', $competitionEventIds);
                $competitionEventIdsArray = array_filter(explode(',', $competitionEventIds));
                foreach($competitionEventIdsArray as $competitionEventId){
                    $eventJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_/'.$competitionEventId);
                    array_push($competitionEvents, createEventWithJson($eventJson, $currentDepth + 1, $depthToAttain));
                }
                $competitionParams['events'] = $competitionEvents;
                //TODO get products
                $competitionProducts = array();
                $competitionProductIds = $competitionParams['products'];
                $competitionProductIds = str_replace(array('{', '}'),'', $competitionProductIds);
                $competitionProductIdsArray = array_filter(explode(',', $competitionProductIds));
                foreach($competitionProductIdsArray as $competitionProductId){
                    $productsJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/product_/'.$competitionProductId);
                    array_push($competitionProducts, createProductWithJson($productsJson, $currentDepth + 1, $depthToAttain));
                }
                $competitionParams['products'] = $competitionProducts;
            }
            $competitions[$i] = new Competition($competitionParams);
        }

        return $competitions;
    }

    function &createCompetitionWithJson($json, $currentDepth, $depthToAttain){
        $i = 0;
        $competitionParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);

        foreach ($jsonIterator as $key => $val) {
                $competitionParams[$key] = $val;
        }

        if ($currentDepth < $depthToAttain){
            $competitionEvents = array();
            $competitionEventIds = $competitionParams['events'];
            $competitionEventIds = str_replace(array('{', '}'),'', $competitionEventIds);
            $competitionEventIdsArray = array_filter(explode(',', $competitionEventIds));
            foreach($competitionEventIdsArray as $competitionEventId){
                $eventJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_/'.$competitionEventId);
                array_push($competitionEvents, createEventWithJson($eventJson, $currentDepth + 1, $depthToAttain));
            }
            $competitionParams['events'] = $competitionEvents;
        }

        $competition = new Competition($competitionParams);

        return $competition;
    }


?>