<?php
    error_reporting(E_ALL ^ E_WARNING);
    include_once '../../ticket/ticket.php';
    include_once '../../actor/actor.php';
    class Event{
        public $id;
        public $name;
        public $date;
        public $longitude;
        public $latitude;
        public $locationName;
        public $description;
        public $actors;
        public $tickets;
        public $pictureLink;

        public function __construct($eventParams) {
            if (isset($eventParams['id']))
                $this->id = strval($eventParams['id']);
            if (isset($eventParams['name']))
                $this->name = $eventParams['name'];
            if (isset($eventParams['date']))
                $this->date = $eventParams['date'];
            if (isset($eventParams['longitude']))
                $this->longitude = $eventParams['longitude'];
            if (isset($eventParams['latitude']))
                $this->latitude = $eventParams['latitude'];
            if (isset($eventParams['locationname']))
                $this->locationName = $eventParams['locationname'];
            if (isset($eventParams['description']))
                $this->description = $eventParams['description'];
            if (isset($eventParams['pictureurl']))
                $this->pictureLink = $eventParams['pictureurl'];
            if (!isset($eventParams['tickets']) || (strpos($eventParams['tickets'], '{') === 0))
                $this->tickets = null;
            else
                $this->tickets = $eventParams['tickets'];

            if (!isset($eventParams['actors']) || (strpos($eventParams['actors'], '{') === 0))
                $this->actors = null;
            else
                $this->actors = $eventParams['actors'];
        }
    }

    function &createEventArrayWithJson($json, $currentDepth, $depthToAttain){
        $events = array();
        $i = 0;
        $eventParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);

        foreach ($jsonIterator as $key => $val) {
            if(is_array($val)) {
                if (count($eventParams) > 0){
                    if ($currentDepth < $depthToAttain){
                        //TODO get tickets
                        $eventTickets = array();
                        $eventTicketIds = $eventParams['tickets'];
                        $eventTicketIds = str_replace(array('{', '}'),'', $eventTicketIds);
                        $eventTicketIdsArray = array_filter(explode(',', $eventTicketIds));
                        foreach($eventTicketIdsArray as $eventTicketId){
                            $ticketJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_/'.$eventTicketId);
                            array_push($eventTickets, createTicketWithJson($ticketJson, $currentDepth + 1, $depthToAttain));
                        }
                        $eventParams['tickets'] = $eventTickets;

                        //TODO get actors
                        $eventActors = array();
                        $eventActorIds = $eventParams['actors'];
                        $eventActorIds = str_replace(array('{', '}'),'', $eventActorIds);
                        $eventActorIdsArray = array_filter(explode(',', $eventActorIds));
                        foreach($eventActorIdsArray as $eventActorId){
                            $actorJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/actor_/'.$eventActorId);
                            array_push($eventActors, createActorWithJson($actorJson, $currentDepth + 1, $depthToAttain));
                        }
                        $eventParams['actors'] = $eventActors;
                    }
                    $events[$i] = new Event($eventParams);
                    $eventParams = array();
                    $i++;
                }  
            } else {
                $eventParams[$key] = $val;
            }
        }

        if (count($eventParams) > 0){
            if ($currentDepth < $depthToAttain){
                //TODO get tickets
                $eventTickets = array();
                $eventTicketIds = $eventParams['tickets'];
                $eventTicketIds = str_replace(array('{', '}'),'', $eventTicketIds);
                $eventTicketIdsArray = array_filter(explode(',', $eventTicketIds));
                foreach($eventTicketIdsArray as $eventTicketId){
                    $ticketJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_/'.$eventTicketId);
                    array_push($eventTickets, createTicketWithJson($ticketJson, $currentDepth + 1, $depthToAttain));
                }
                $eventParams['tickets'] = $eventTickets;

                //TODO get actors
                $eventActors = array();
                $eventActorIds = $eventParams['actors'];
                $eventActorIds = str_replace(array('{', '}'),'', $eventActorIds);
                $eventActorIdsArray = array_filter(explode(',', $eventActorIds));
                foreach($eventActorIdsArray as $eventActorId){
                    $actorJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/actor_/'.$eventActorId);
                    array_push($eventActors, createActorWithJson($actorJson, $currentDepth + 1, $depthToAttain));
                }
                $eventParams['actors'] = $eventActors;
            }
            $events[$i] = new Event($eventParams);
        }
        return $events;
    }

    function &createEventWithJson($json, $currentDepth, $depthToAttain){
        $i = 0;
        $eventParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);

        foreach ($jsonIterator as $key => $val) {
            if(is_array($val)) {
                if (count($eventParams) > 0){
                    // $eventParams = array();
                    // $i++;
                }  
            } else {
                $eventParams[$key] = $val;
            }
        }
        
        if (count($eventParams) > 0){
            if ($currentDepth < $depthToAttain){
                //TODO get tickets
                $eventTickets = array();
                $eventTicketIds = $eventParams['tickets'];
                $eventTicketIds = str_replace(array('{', '}'),'', $eventTicketIds);
                $eventTicketIdsArray = array_filter(explode(',', $eventTicketIds));
                foreach($eventTicketIdsArray as $eventTicketId){
                    $ticketJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/ticket_/'.$eventTicketId);
                    array_push($eventTickets, createTicketWithJson($ticketJson, $currentDepth + 1, $depthToAttain));
                    // print_r($eventTickets);
                }
                $eventParams['tickets'] = $eventTickets;

                //TODO get actors
                $eventActors = array();
                $eventActorIds = $eventParams['actors'];
                $eventActorIds = str_replace(array('{', '}'),'', $eventActorIds);
                $eventActorIdsArray = array_filter(explode(',', $eventActorIds));
                foreach($eventActorIdsArray as $eventActorId){
                    $actorJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/actor_/'.$eventActorId);
                    array_push($eventActors, createActorWithJson($actorJson, $currentDepth + 1, $depthToAttain));
                }
                $eventParams['actors'] = $eventActors;
            }
            $event = new Event($eventParams);
        }

        return $event;
    }
?>
