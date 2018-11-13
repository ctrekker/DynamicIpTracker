<?php

if(!isset($_GET["name"])) die("Missing parameter \"name\"");

$name=$_GET["name"];
$ipData=json_decode(file_get_contents("ips.json"), true);
if(isset($ipData)&&isset($ipData[$name])) {
    echo json_encode(array(
        "update" => date(DATE_ISO8601, $ipData[$name]["update"])
    ));
}
