<?php 
    header('Content-Type: application/json');
    include_once '../../axes/axes.php';
    include_once '../ticket.php';
    
    if (isset($_GET["userId"])){
        //TODO get interesting
        $userId = $_GET["userId"];
        $userAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/user_/'.$userId.'?columns=axes');
        $userAxesId = explode(':', str_replace('}', '', $userAxesJson))[1];
        $userAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$userAxesId);
        $userAxes = createAxesWithJson($userAxesJson);

        //create prodcuts list
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_?transform=1');
        $tickets = createTicketArrayWithJson($response, 0, 0);

        $ticketsArray = array();
        $distancesArray = array();
        $i = 0;
        foreach ($tickets as $ticket){
            //get axes object
            //calculate distance from user axes
            $ticketAxesJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/axes_/'.$ticket->axes);
            $ticketAxes = createAxesWithJson($ticketAxesJson);
            $ticketsArray[$i] = $ticket;
            $distance = getDistanceBetweenAxes($userAxes, $ticketAxes);
            $distancesArray[$i] = $distance;
            $i++;
        }

        //order by distance
        asort($distancesArray);
        //reverse
        array_reverse($distancesArray, true);
        //get last 5 elements and conserve keys
        $slicedDistanceArray = array_slice($distancesArray, -5, 5, true);

        $finalTicketsArray = array();
        //return top 5 products
        foreach($slicedDistanceArray as $key => $val){
            array_push($finalTicketsArray, $ticketsArray[$key]);
        }
        echo json_encode($finalTicketsArray);
    } else {
        // $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_?transform=1');
        
        // $ticket = createTicketArrayWithJson($response, 0, 1); //TODO replace static values with params
		echo json_encode([]);
    }
?>
