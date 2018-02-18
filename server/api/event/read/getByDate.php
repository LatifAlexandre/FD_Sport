<?php 
    header('Content-Type: application/json');
    if (isset($_GET["date"]) && isset($_GET["con"])){
        $date = $_GET['date'];
        $con = $_GET['con'];
        $response = file_get_contents('https://pedago02a.univ-avignon.fr/~uapv1404039/git/server/api.php/event_?filter=date,'.$con.','.$date.'&transform=1');
        echo $response;
    } else {
        echo "Please set parameters : date(yyyy-mm-dd), con.\n";
        echo 
        "#########################CONDITIONS##################################
        #																	#
        #    cs: contain string (string contains value)						#
        #    sw: start with (string starts with value)						#
        #    ew: end with (string end with value)							#
        #    eq: equal (string or number matches exactly)					#
        #    lt: lower than (number is lower than value)					#
        #    le: lower or equal (number is lower than or equal to value)	#
        #    ge: greater or equal (number is higher than or equal to value)	#
        #    gt: greater than (number is higher than value)					#
        #    bt: between (number is between two comma separated values)		#
        #    in: in (number is in comma separated list of values)			#
        #    is: is null (field contains 'NULL' value)						#
        #																	#
        #####################################################################";
    }
?>