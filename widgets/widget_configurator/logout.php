<?php
   session_start();
   unset($_SESSION["username"]);
   unset($_SESSION["password"]);
   header('Refresh: 2; URL = index.php');

   echo 'You have logged out of session';
?>
