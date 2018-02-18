<?php 
    header('Content-Type: application/json');
    include_once '../../competition/competition.php';
    
    $competitionsJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/competition_?transform=1');
    
    $competitions = createCompetitionArrayWithJson($competitionsJson, 0, 1);
    echo json_encode($competitions);
?>