<?php

$servername = "172.16.8.214";
$username = "usuario_desarrollo"; // Usuario por defecto de XAMPP
$password = "dev2024"; // Contraseña vacía por defecto en casa
$dbname = "smt_evento"; 

/* $servername = "127.0.0.1";
$username = "root"; // Usuario por defecto de XAMPP
$password = "marcos"; // Contraseña vacía por defecto en casa
$dbname = "smt_refercom"; */

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Fallo la Conexión: " . $conn->connect_error);
}


?>