<?php
/**
 * Created by PhpStorm.
 * User: ctrek
 * Date: 3/29/2018
 * Time: 10:18 PM
 */

$ipData=json_decode(file_get_contents("ips.json"), true);
$first=true;
foreach($ipData as $key=>$value) {
    if(!$first) echo ",";
    echo $key;
    $first=false;
}