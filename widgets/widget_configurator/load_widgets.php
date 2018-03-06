<?php
  header('Access-Control-Allow-Origin: *');
  header("Content-type:application/json");
  $servername = "sml-dev-aurora.c0dkrh3gf98q.us-east-1.rds.amazonaws.com";
  $username = "dev";
  $password = '$ntMed!A';
  $dbname = "synapsys-2-dev";

  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) {
      // uncomment out for verbose mode
      // die("Connection failed: " . $conn->connect_error);
      die("MYSQL Connection failed");
  }

  $sql = "SELECT * FROM widget_configurator_widgets";
  $result = $conn->query($sql);

  $sql2 = "SELECT * FROM widget_configurator_settings";
  $result2 = $conn->query($sql2);

  if ($result->num_rows > 0) {
    echo "{";
    $i = 0;
      while($row = $result->fetch_assoc()) {
        $i++;
        $settingsToUse = json_decode($row["settings"], true);
        echo '"' . $row["reference"] . '":{';
        echo '"name":"' . $row["name"] . '",';
        echo '"image":"' . $row["image"] . '",';
        echo '"output":"' . str_replace('"', '\"', $row["output"]) . '",';
        echo '"settings":{';
        if ($result2->num_rows > 0) {
          $i2 = 0;
          // var_dump($result2);
            foreach ($result2 as $row2) {
              if (in_array($row2["reference"], $settingsToUse)) {
                $i2++;
                echo '"' . $row2["reference"] . '":{';
                echo '"default":"' . $row2["default"] . '",';
                if ($row2["enabled"] == "1") {
                  echo '"enabled":"true",';
                }
                else {
                  echo '"enabled":"false",';
                }
                echo '"explanation":"' . $row2["explanation"] . '",';
                echo '"name":"' . $row2["name"] . '",';
                echo '"type":"' . $row2["type"] . '",';
                if ($row2["options"]) {
                  echo '"options":' . $row2["options"] . '}';
                }
                else {
                  echo '"options":""}';
                }
                if ($i2 < count($settingsToUse)) {
                  echo ",";
                }
              }
            }
            echo "},";
        }
        echo '"embed":{"type":"' . $row["product_type"] . '",';
        echo '"style":"' . $row["product_style"] . '"}}';
        if ($i < $result->num_rows) {
          echo ",";
        }
      }
      echo "}";
  }
  else {
      echo '{"success":"false"}';
  }

?>
