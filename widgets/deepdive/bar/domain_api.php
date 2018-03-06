<?php
header('Access-Control-Allow-Origin: *');  
$servername = "synapsys2.cluster-ro-c0dkrh3gf98q.us-east-1.rds.amazonaws.com";
$username = "synadmin";
$password = '93RsOsbSsvkwaYR';
$dbname = "synapsys-2-dev";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    // uncomment out for verbose mode
    // die("Connection failed: " . $conn->connect_error);
    die("MYSQL Connection failed");
}

$query = mysqli_real_escape_string($conn,$_GET['dom']); //always sanitize database inputs ;)
$sql = "SELECT p_type, p_sub_dom FROM partner where p_url like '%" . $query . "%'";
$result = $conn->query($sql);

if ($result->num_rows > 0 && $query != "" && $query != null) {
    while($row = $result->fetch_assoc()) {
      if (count($result) > 1) {
        if ($row["p_type"] == "partner") {
          echo $row["p_sub_dom"];
        }
      }
      else {
        echo $row["p_sub_dom"];
      }
    }
}else {
    //partner fallback if partner is not found, or config column is null
    $fallbackSql = "SELECT id, category, p_type, url FROM subdomain_defaults where p_type = 'principal'";
    $fallbackResult = $conn->query($fallbackSql);
    if ($fallbackResult->num_rows > 0) {
      echo "{ ";
        $i = 0;
        while($fallbackRow = $fallbackResult->fetch_assoc()) {
          $i++;
            echo '"' . $fallbackRow["category"] . '":"' . $fallbackRow["url"] . '"';
            if ($i < $fallbackResult->num_rows) {
              echo ",";
            }
        }
      echo " }";
    }else {
      //if fallback db is down, as a last resort, use this hardcoded fallback
      echo '{ "nba": "myhoopszone.com", "college_basketball": "myhoopszone.com", "mlb": "myhomerunzone.com", "nfl": "mytouchdownzone.com", "ncaaf": "mytouchdownzone.com", "nflncaaf": "mytouchdownzone.com", "finance": "myinvestkit.com", "weather": "myhousekit.com", "crime": "myhousekit.com", "demographics": "myhousekit.com", "politics": "myhousekit.com", "disaster": "myhousekit.com" }';
    }
}
$conn->close();
?>
