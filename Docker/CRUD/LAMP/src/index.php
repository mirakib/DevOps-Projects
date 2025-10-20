<?php
$mysqli = new mysqli("db", "user", "userpass", "myapp");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

echo "Connected to MySQL successfully!";
?>
