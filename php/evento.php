<?php

// Permitir acceso desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require('../php/conexion_db.php'); // Ajusta la ruta al archivo de conexión de la base de datos

// Leer el cuerpo de la solicitud (json)
$data = file_get_contents("php://input");
$datosRecibidos = json_decode($data, true);

if ($data) {
    // Determina qué acción realizar según la tarea
    switch ($datosRecibidos['tarea']) {
        case "busca_eventos":
            buscaEventos($conn);
            break;

        case "crear_evento":
            crearEvento($conn, $datosRecibidos);
            break;

        case "modievento": // Llamar a la nueva función de modificación
            modievento($conn, $datosRecibidos);
            break;

        case "eliminar_evento":
            eliminarEvento($conn, $datosRecibidos);
            break;

        default:
            echo json_encode(["mensaje" => "Tarea no válida."]);
            break;
    }
}

function buscaEventos($conn) {
    $sql = "SELECT * FROM evento"; // Ajusta esto según tu tabla
    $result = $conn->query($sql);
    $eventos = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $eventos[] = $row;
        }
    }
    
    echo json_encode($eventos);
    $conn->close();
}

function modievento($conn, $datos) {
    $id = $datos['evento']['id_evento'];
    $nombre = $datos['evento']['nombre_evento'];
    $fecha = $datos['evento']['fecha'];
    $hora = $datos['evento']['hora'];
    $descripcion = $datos['evento']['descripcion'];
    $cupo = $datos['evento']['cupo'];

    $sql = "UPDATE evento SET nombre_evento = ?, fecha = ?, hora = ?, descripcion = ?, cupo = ? WHERE id_evento = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssi", $nombre, $fecha, $hora, $descripcion, $cupo, $id);

    if ($stmt->execute()) {
        // Obtener el evento actualizado para enviarlo de vuelta
        $sql = "SELECT * FROM evento WHERE id_evento = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $eventoActualizado = $result->fetch_assoc();

        echo json_encode($eventoActualizado);  // Retornar el evento actualizado
    } else {
        echo json_encode(["mensaje" => "Error al modificar el evento."]);
    }

    $stmt->close();
    $conn->close();
}

function crearEvento($conn, $datos) {
    $nombre = $datos['evento']['nombre_evento'];
    $fecha = $datos['evento']['fecha'];
    $hora = $datos['evento']['hora'];
    $cupo = $datos['evento']['cupo'];
    $descripcion = $datos['evento']['descripcion'];

    $sql = "INSERT INTO evento (nombre_evento, fecha, hora, cupo, descripcion) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $nombre, $fecha, $hora, $cupo, $descripcion);

    if ($stmt->execute()) {
        echo json_encode(["mensaje" => "Evento creado con éxito."]);
    } else {
        echo json_encode(["mensaje" => "Error al crear el evento."]);
    }

    $stmt->close();
    $conn->close();
}

function eliminarEvento($conn, $datos) {
    $id = $datos['id_evento'];

    $sql = "DELETE FROM evento WHERE id_evento = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["mensaje" => "Evento eliminado con éxito."]);
    } else {
        echo json_encode(["mensaje" => "Error al eliminar el evento."]);
    }

    $stmt->close();
    $conn->close();
}
?>
