<?php
  /*
    Author: Lutz Lai
    Date: July 27, 2016
    Description: This file pulls a font file and allows cross origin access. This needed is due to firefox and chrome CORS checks
  */
  header("Access-Control-Allow-Origin: *");
  header("Cache-Control: max-age=86400, public");

  $fileType = $_GET["type"];

  switch($fileType){
    case "eot":
      header('Content-Type: application/vnd.ms-fontobject');
      $file = file_get_contents('fonts/takeover-deep-dive.eot');
      echo $file;
    break;
    case "svg":
      header('Content-Type: image/svg+xml');
      $file = file_get_contents('fonts/takeover-deep-dive.svg');
      echo $file;
    break;
    case "ttf":
      header('Content-Type: application/x-font-tff');
      $file = file_get_contents('fonts/takeover-deep-dive.ttf');
      echo $file;
    break;
    case "woff":
      header('Content-Type: application/x-font-woff');
      $file = file_get_contents('fonts/takeover-deep-dive.woff');
      echo $file;
    break;
    case "eot_iefix":
      header('Content-Type: application/vnd.ms-fontobject');
      $file = file_get_contents('fonts/takeover-deep-dive.eot?#iefix');
      echo $file;
    break;
    default:
      header('Content-Type: application/x-font-woff');
      $file = file_get_contents('fonts/takeover-deep-dive.woff');
      echo $file;
  }
 ?>
