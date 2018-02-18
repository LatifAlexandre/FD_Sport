<?php 
    header('Content-Type: application/json');
    include_once '../../actor/actor.php';
    
    $actorsJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/actor_?transform=1');
    
    $actors = createActorArrayWithJson($actorsJson, 0, 1);
    echo json_encode($actors);
?>
