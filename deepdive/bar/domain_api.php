<?php
$servername = "aa1k3h3h30af0eo.c0dkrh3gf98q.us-east-1.rds.amazonaws.com";
$username = "dev";
$password = '$ntMed!A';
$dbname = "synapsys-2-dev";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = mysqli_real_escape_string($conn,$_GET['dom']); //always sanitize database inputs ;)
$sql = "SELECT p_id, p_name, p_url, p_type, p_sub_dom FROM partner where p_url like '%" . $query . "%'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["p_sub_dom"];
    }
} else {
    echo "0 results";
}
$conn->close();
?>
