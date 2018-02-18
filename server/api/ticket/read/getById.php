<?php 
    header('Content-Type: application/json');
    include_once '../ticket.php';
    
    if (isset($_GET["id"])){
        $id = $_GET["id"];
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_/'.$id.'?transform=1');
        
        $ticket = createTicketWithJson($response, 0, 1); //TODO replace static values with params
		echo json_encode($ticket);
    }
?>
