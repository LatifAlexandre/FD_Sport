<?php
    error_reporting(E_ALL ^ E_WARNING);

    class axes{
        public $id;
        public $young;
        public $old;
        public $male;
        public $female;
        public $csp_plus;
        public $csp_minus;
        public $football;
        public $tennis;
        public $ski;

        public function __construct($axesParams){
            if (isset($axesParams['id']))
                $this->id = strval($axesParams['id']);
            if (isset($axesParams['young']))
                $this->young = $axesParams['young'];
            if (isset($axesParams['old']))
                $this->old = $axesParams['old'];
            if (isset($axesParams['male']))
                $this->male = $axesParams['male'];
            if (isset($axesParams['female']))
                $this->female = $axesParams['female'];
            if (isset($axesParams['csp_plus']))
                $this->csp_plus = $axesParams['csp_plus'];
            if (isset($axesParams['csp_minus']))
                $this->csp_minus = $axesParams['csp_minus'];
            if (isset($axesParams['football']))
                $this->football = $axesParams['football'];
            if (isset($axesParams['tennis']))
                $this->tennis = $axesParams['tennis'];
            if (isset($axesParams['ski']))
                $this->ski = $axesParams['ski'];
        }
    }

    function &createAxesArrayWithJson($json){
        $axes = array();
        $i = 0;
        $axesParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);

        foreach ($jsonIterator as $key => $val) {
            if(is_array($val)) {
                if (count($axesParams) > 0){
                    $axes[$i] = new Axes($axesParams);
                    $axesParams = array();
                    $i++;
                }  
            } else {
                $axesParams[$key] = $val;
            }
        }

        if (count($axesParams) > 0){
            $axes[$i] = new Axes($axesParams);
        }

        return $axes;
    }

    function &createAxesWithJson($json){
        $i = 0;
        $axesParams = array();

        $jsonIterator = new RecursiveIteratorIterator(
            new RecursiveArrayIterator(json_decode($json, TRUE)),
            RecursiveIteratorIterator::SELF_FIRST);

        foreach ($jsonIterator as $key => $val) {
                $axesParams[$key] = $val;
        }

        $competition = new Axes($axesParams);

        return $competition;
    }

    function getDistanceBetweenAxes($axe1, $axe2){
        $distance = 0;
        $distanceStr = "";
        foreach($axe1 as $key => $value) {
            if ($key != 'id'){
                $distanceStr = $distanceStr."(".$axe1->$key." - ".$axe2->$key.")2 + ";
                $distance += pow($axe1->$key - $axe2->$key, 2);
                // print "axes1[$key] => ".$axe1->$key."\n";
                // print "axes2[$key] => ".$axe2->$key."\n";
            }
        }
        $distance = sqrt($distance);
        // echo $distanceStr." = $distance\n";
        return $distance;
    }
?>