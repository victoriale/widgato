<?php
  header("Access-Control-Allow-Origin: *");
  header("Cache-Control: max-age=86400, public");
  header("Content-Type: text/html");
  $file = file_get_contents('bar.html');
  echo $file;
 ?>
