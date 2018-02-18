<?php
    header('Content-Type: application/json');
    include_once '../actor.php';

    if ((isset($_GET["lon"]) && isset($_GET["lat"]))){
        $lon = $_GET["lon"];
        $lonMin = $lon - 1;
        $lonMax = $lon + 1;

        $lat = $_GET["lat"];
        $latMin = $lat - 1;
        $latMax = $lat + 1;
        $clubsJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/actor_?filter[]=longitude,bt,'.$lonMin.','.$lonMax.'&filter[]=latitude,bt,'.$latMin.','.$latMax.'&filter[]=type,eq,CLUB&transform=1');
        $clubs = createActorArrayWithJson($clubsJson, 0, 1);
        echo json_encode($clubs);
    } else {
        $actorsJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/actor_?filter=type,eq,CLUB&transform=1');
    
        $actors = createActorArrayWithJson($actorsJson, 0, 1);
        echo json_encode($actors);
    }

?>