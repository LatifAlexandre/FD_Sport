<?php 
    error_reporting(E_ALL & ~(E_WARNING|E_NOTICE));
    header('Content-Type: application/json');
    include_once '../../event/event.php';
    
    $eventsJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?transform=1');
    
    $events = createEventArrayWithJson($eventsJson, 0, 2);
    echo json_encode($events);
?>
