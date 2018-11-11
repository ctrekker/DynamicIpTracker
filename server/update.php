<?php
/**
 * Created by PhpStorm.
 * User: ctrek
 * Date: 3/29/2018
 * Time: 7:30 PM
 */

if(!isset($_GET["name"])||!isset($_GET["ip"])||!isset($_GET["key"])) die("Invalid parameters!");

$name=$_GET["name"];
$ip=$_GET["ip"];
$key=$_GET["key"];

if($key!="GgYUJRXrAWJpdtICCDsq") die("Invalid parameters!");
if(strlen($ip)>16) die("Ip too long!");
if(strlen($name)>16) die("Name too long!");

if(!file_exists("ips.json")) {
    file_put_contents("ips.json", "{}");
}
$ipData=json_decode(file_get_contents("ips.json"), true);
$ipData[$name]=array(
    "ip" => $ip,
    "update" => time()
);
file_put_contents("ips.json", json_encode($ipData));