<?php

// Permitir acceso desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require('../php/conexion_db.php');

// Leer el cuerpo de la solicitud (json)
$data = file_get_contents("php://input");
$datosRecibidos = json_decode($data, true);
if ($data) {
    //opcion procesar archivo////
    if ($datosRecibidos['tarea'] == "valida_login") {
        $usuario = $datosRecibidos['usuario'];
        $sql = "SELECT a.*,b.* FROM ciudadano_digital.empleado a 
LEFT JOIN ciudadano_digital.persona b ON b.id_persona=a.id_persona
WHERE a.afiliado=$usuario AND b.validado=1 AND b.habilita=1";
        $result = $conn->query($sql);

        $encontrado = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $encontrado[] = $row;
            }
        } else {
            $encontrado = [];
        }

        echo json_encode($encontrado);
        $conn->close();
        return;
    }
}
