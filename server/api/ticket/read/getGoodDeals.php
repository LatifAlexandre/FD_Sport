<?php 
    include_once '../../event/event.php';
    include_once '../ticket.php';
    header('Content-Type: application/json');
    $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_?filter[]=discount,ge,0&filter[]=price,le,100&satisfy=any&transform=1');

    $tickets = createTicketArrayWithJson($response, 0, 0); //TODO replace static values with params

    // $jsonIterator = new RecursiveIteratorIterator(
    //     new RecursiveArrayIterator(json_decode($response, TRUE)),
    //     RecursiveIteratorIterator::SELF_FIRST);
    
    // $tickets = array();
    
    // $i = 0;
    // $ticketParams = array();

    // foreach ($jsonIterator as $key => $val) {
    //     if(is_array($val)) {
    //         if (count($ticketParams) > 0){
    //             $ticketId = $ticketParams['id'];
    //             $eventJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?filter=tickets,ac,'.$ticketId.'&transform=1');
    //             $event = createEventWithJson($eventJson);
    //             $ticketParams['event'] = $event;
    //             // echo $event->tickets;
    //             //get tickets by event then exclude this ticket
    //             //get products by event

    //             $tickets[$i] = new Ticket($ticketParams);
    //             $ticketParams = array();
    //             $i++;
    //         }  
    //     } else {
    //         $ticketParams[$key] = $val;
    //     }
    // }
    echo json_encode($tickets);
?>
