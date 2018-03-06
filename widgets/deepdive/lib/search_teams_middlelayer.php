<?php
  header("Access-Control-Allow-Origin: *");
  header("Cache-Control: max-age=604800, public");
  header("Content-Type: application/x-javascript");
  $file = file_get_contents('search_teams.min.json');
  echo $file;
 ?>
