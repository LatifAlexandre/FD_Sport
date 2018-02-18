<?php
    error_reporting(E_ALL ^ E_WARNING);
    include_once '../../actor/actor.php';
    class User{
        public $id;
        public $username;
        public $password;
        public $favoriteclubs;

        public function __construct($userParams){
            $this->id = strval($userParams['id']);
            $this->username = $userParams['username'];
            $this->password = $userParams['password'];

            if (!isset($userParams['favoriteclubs']) || (strpos($userParams['favoriteclubs'], '{') === 0))
                $this->favoriteclubs = null;
            else
                $this->favoriteclubs = $userParams['favoriteclubs'];
        }
    }

    function &createUserArrayWithJson($json, $currentDepth, $depthToAttain){
        $users = array();
        $i = 0;
        $userParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);

        foreach ($jsonIterator as $key => $val) {
            if(is_array($val)) {
                if (count($userParams) > 0){
                    if ($currentDepth < $depthToAttain){
                        //TODO get clubs
                        $userClubs = array();
                        $userClubIds = $userParams['favoriteclubs'];
                        $userClubIds = str_replace(array('{', '}'),'', $userClubIds);
                        $userClubIdsArray = array_filter(explode(',', $userClubIds));
                        foreach($userClubIdsArray as $userClubId){
                            $clubJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/actor_/'.$userClubId);
                            array_push($userClubs, createActorWithJson($clubJson, $currentDepth + 1, $depthToAttain));
                        }
                        $userParams['favoriteclubs'] = $userClubs;
                    }
                    $users[$i] = new User($userParams);
                    $userParams = array();
                    $i++;
                }  
            } else {
                $userParams[$key] = $val;
            }
        }

        // if (count($users) == 0 && count($userParams) > 0){
            if ($currentDepth < $depthToAttain){
                $userClubs = array();
                $userClubIds = $userParams['favoriteclubs'];
                $userClubIds = str_replace(array('{', '}'),'', $userClubIds);
                $userClubIdsArray = array_filter(explode(',', $userClubIds));
                foreach($userClubIdsArray as $userClubId){
                    $clubJson = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/actor_/'.$userClubId);
                    array_push($userClubs, createActorWithJson($clubJson, $currentDepth + 1, $depthToAttain));
                }
                $userParams['favoriteclubs'] = $userClubs;
            }
            $users[$i] = new User($userParams);
        // }

        return $users;
    }

?>