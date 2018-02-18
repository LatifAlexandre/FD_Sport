<?php 
    header('Content-Type: application/json');
    if (isset($_GET["lon"]) && isset($_GET["lat"]) && isset($_GET["dif"])){
        $lon = (float)$_GET['lon'];
        $lat = (float)$_GET['lat'];
        $dif = (float)$_GET['dif'];
        // $lonCon = $_GET['lonCon'];
        // $latCon = $_GET['latCon'];
        $lonMin = $lon - $dif;
        $lonMax = $lon + $dif;
        $latMin = $lat - $dif;
        $latMax = $lat + $dif;
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?filter[]=longitude,bt,'.$lonMin.','.$lonMax.'&filter[]=latitude,bt,'.$latMin.','.$latMax.'&satisfy=any&transform=1');
        echo $response;
    } else {
        echo 'Please set parameters : lon, lat, dif.';
    }
?>