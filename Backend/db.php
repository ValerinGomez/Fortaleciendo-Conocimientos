<?php
$host = "127.0.0.1";
$user = "root";
$pass = "";
$dbname = "proyectdb";

$conn = new mysqli($host, $user, $pass, $dbname, 3306);
if ($conn->connect error) {
    die("Error de conexion;" . $coon->connect error);
}
?>