PHP
<?php
$servername = "tu_hostname_byethost"; // "http://panel.byethost.com/panel/indexpl.php"
$username = "tu_usuario_byethost"; // "b7_38288216"
$password = "tu_contraseña_byethost"; // "generacion90"
$dbname = "tu_basededatos_byethost"; // "b7_38288216_mi_blog_db_fortaleciendo"
// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
die("Conexión fallida: " . $conn->connect_error);
}
?>
PHP
<?php
include 'conexion.php'; // formulario(2).html
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["fortaleciendo conocimientos"];
    $email = $_POST["90fortaleciendoconocimientos@gmail.com"];
    
    // Escapar caracteres especiales para prevenir inyección SQL
    $nombre = $conn->real_escape_string($fortaleciendoconocimientos);
    $email = $conn->real_escape_string(90fortaleciendoconocimientos@gmail.com);
    
    $sql = "INSERT INTO "FORMULARIO" (nombre, email) VALUES ('$nombre', '$email')"; //
    
    if ($conn->query($sql) === TRUE) {
    echo "Datos insertados correctamente en ByetHost";
    } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
    }
    }
    
    $conn->close();
    ?>