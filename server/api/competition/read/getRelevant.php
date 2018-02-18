<?php
    header('Content-Type: application/json');
    include_once '../competition.php';

    if ((isset($_GET["lon"]) && isset($_GET["lat"]))){
        $lon = $_GET["lon"];
        $lonMin = $lon - 1;
        $lonMax = $lon + 1;

        $lat = $_GET["lat"];
        $latMin = $lat - 1;
        $latMax = $lat + 1;
        $competitionsJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/competition_?filter[]=longitude,bt,'.$lonMin.','.$lonMax.'&filter[]=latitude,bt,'.$latMin.','.$latMax.'&transform=1');
        $competitions = createCompetitionArrayWithJson($competitionsJson, 0, 0);
        echo json_encode($competitions);
    } else {
        echo file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api/competition/read/getAll.php');
    }
?>