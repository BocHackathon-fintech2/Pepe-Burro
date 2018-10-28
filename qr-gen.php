<?php
include('/var/www/html/phpqrcode/qrlib.php'); 


$url = $_REQUEST['url'];
     
// we need to be sure ours script does not output anything!!! 
// otherwise it will break up PNG binary! 
 
ob_start("callback"); 
// end of processing here 
$debugLog = ob_get_contents(); 
ob_end_clean(); 
 
// outputs image directly into browser, as PNG stream 
QRcode::png($url);


/*
$url = $_REQUEST['url'];
$filename = md5($url).".png";
QRcode::png($url, "/var/www/html/qr/".$filename, "L", 4, 4);

//echo '<img src="/qr/'.$filename.'" />'; 
*/
?>