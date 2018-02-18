<?php 
    header('Content-Type: application/json');
    include_once '../axes.php';
    include_once '../../ticket/ticket.php';
    
    if (isset($_GET["id"])){
        $id = $_GET["id"];
        $ticketJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_/'.$id.'?columns=axes&transform=1');
        
        $ticketAxesId = explode(':', str_replace('}', '', $ticketJson))[1];
        $ticketAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$ticketAxesId);
        $ticketAxes = createAxesWithJson($ticketAxesJson);

		echo json_encode($ticketAxes);
    } else {
        echo 'please set [id]';
    }
?>