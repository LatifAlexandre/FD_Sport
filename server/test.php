
<?php
// Connexion, sélection de la base de données
$dbconn = pg_connect("host=pedago02a.univ-avignon.fr dbname=etd user=uapv1404039 password=test")
    or die('Connexion impossible : ' . pg_last_error());

// Exécution de la requête SQL
$query = 'SELECT * FROM source_customer';
$result = pg_query($query) or die('Échec de la requête : ' . pg_last_error());

// Affichage des résultats en HTML
echo "<table>\n";
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
    echo "\t<tr>\n";
    foreach ($line as $col_value) {
        echo "\t\t<td>$col_value</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>\n";

// Libère le résultat
pg_free_result($result);

// Ferme la connexion
pg_close($dbconn);
?>
