<?php
    header('Content-Type: application/json');
    include_once '../event.php';
    include_once '../../actor/actor.php';
    if (isset($_GET["userId"]) || (isset($_GET["lon"]) && isset($_GET["lat"]))){
        $events = array();
        $userId = null;
        $actorsIds = null;
        $lonMin = null;
        $lonMax = null;
        $latMin = null;
        $latMax = null;
        if (isset($_GET["userId"])){
            //GET events by favorite clubs of user
            $userId = $_GET["userId"];
            $actorsIds = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/user_/'.$userId.'?columns=favoriteclubs');
            $actorsIds = str_replace(array('{', '}', ':', 'favoriteclubs', '"'),'', $actorsIds);
            $actorsIdsArray = array_filter(explode(',', $actorsIds));
            foreach($actorsIdsArray as $actorId){
                $eventsJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?filter=actors,ac,'.$actorId.'&transform=1');
                $eventsArray = createEventArrayWithJson($eventsJson, 0, 1);
                foreach ($eventsArray as $event)
                    array_push($events, $event);
            }
        }
        if (isset($_GET["lon"]) && isset($_GET["lat"])){
            //GET events by lon lat
            $lon = $_GET["lon"];
            $lonMin = $lon - 1;
            $lonMax = $lon + 1;

            $lat = $_GET["lat"];
            $latMin = $lat - 1;
            $latMax = $lat + 1;
            
            $eventsJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?filter[]=longitude,bt,'.$lonMin.','.$lonMax.'&filter[]=latitude,bt,'.$latMin.','.$latMax.'&transform=1');
            //if array, add each to $events
            $eventsArray = createEventArrayWithJson($eventsJson, 0, 1);
            foreach ($eventsArray as $event)
                array_push($events, $event);
        }
        echo json_encode(array_unique($events, SORT_REGULAR));
    } else {
        echo file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/event/read/getAll.php');
    }
?>