<?php
$jsonFile = 'datos.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos JSON enviados
    $data = json_decode(file_get_contents('php://input'), true);

    // Validar los campos requeridos
    $requiredFields = ['categoria', 'materia', 'numeroExpediente', 'carrera', 'facultad', 'dedicacion', 'condicion', 'estado'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            echo json_encode(['success' => false, 'message' => "El campo $field es obligatorio."]);
            exit;
        }
    }

    // Cargar los datos existentes
    $existingData = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : ['cargos' => []];

    // Verificar si el número de expediente ya existe
    foreach ($existingData['cargos'] as $cargo) {
        if ($cargo['numeroExpediente'] === $data['numeroExpediente']) {
            echo json_encode(['success' => false, 'message' => 'El número de expediente ya existe.']);
            exit;
        }
    }

    // Agregar el nuevo cargo
    $existingData['cargos'][] = $data;

    // Guardar los datos actualizados en el archivo JSON
    if (file_put_contents($jsonFile, json_encode($existingData, JSON_PRETTY_PRINT))) {
        echo json_encode(['success' => true, 'message' => 'Cargo agregado exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al guardar los datos.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>
