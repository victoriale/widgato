<?php
  header('Access-Control-Allow-Origin: *');
  $servername = "aa1k3h3h30af0eo.c0dkrh3gf98q.us-east-1.rds.amazonaws.com";
  $username = "dev";
  $password = '$ntMed!A';
  $dbname = "synapsys-2-dev";

  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) {
      // uncomment out for verbose mode
      // die("Connection failed: " . $conn->connect_error);
      die("MYSQL Connection failed");
  }

  $dom = mysqli_real_escape_string($conn,$_GET['dom']); //always sanitize database inputs ;)
  if ($dom != undefined) {
    $sql = "SELECT p_placement_id FROM partner where p_url ='$dom'";
  }
  else { //fallback
    $sql = "SELECT p_placement_id FROM partner where p_url ='joyfulhome.com'";
  }
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    echo "//content.synapsys.us/embeds/placement.js?p=";
    $i = 0;
      while($row = $result->fetch_assoc()) {
        $i++;
        if (count($result) > 0) {
          echo $row["p_placement_id"];
        }
      }
      echo "&type=".$_GET['type']."&style=standard";
  }
  else {
      echo '{"success":"false"}';
  }

?>
