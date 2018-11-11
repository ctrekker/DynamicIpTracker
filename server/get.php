<?php
/**
 * Created by PhpStorm.
 * User: ctrek
 * Date: 3/29/2018
 * Time: 10:16 PM
 */

if(!isset($_GET["name"])) die("Missing parameter \"name\"");

$name=$_GET["name"];
$ipData=json_decode(file_get_contents("ips.json"), true);
if(isset($ipData)) echo $ipData[$name]["ip"];
else die("No name matches given name!");