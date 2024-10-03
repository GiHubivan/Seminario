<?php
$jsonFile = 'datos.json';
$uploadsDir = 'archivos/'; // Cambiar a 'archivos/'

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $numeroNota = trim($_POST['numeroNota'] ?? '');
    $numeroExpediente = trim($_POST['numeroExpediente'] ?? '');
    $causante = trim($_POST['causante'] ?? '');
    $personaAutoriza = trim($_POST['personaAutoriza'] ?? '');
    $archivoPDF = $_FILES['archivoPDF']['name'] ?? '';

    if (empty($numeroNota) || empty($numeroExpediente) || empty($causante) || empty($personaAutoriza)) {
        echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
        exit;
    }

    if ($_FILES['archivoPDF']['error'] === UPLOAD_ERR_OK) {
        $fileType = mime_content_type($_FILES['archivoPDF']['tmp_name']);
        if ($fileType !== 'application/pdf') {
            echo json_encode(['success' => false, 'message' => 'Solo se permiten archivos PDF.']);
            exit;
        }

        if (!is_dir($uploadsDir)) {
            mkdir($uploadsDir, 0755, true);
        }
        move_uploaded_file($_FILES['archivoPDF']['tmp_name'], $uploadsDir . basename($archivoPDF));
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al cargar el archivo.']);
        exit;
    }

    $data = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : ['pedidos' => []];

    foreach ($data['pedidos'] as $pedido) {
        if ($pedido['numeroNota'] === $numeroNota && $pedido['numeroExpediente'] === $numeroExpediente) {
            echo json_encode(['success' => false, 'message' => 'Ya existe un pedido con el mismo número de nota y expediente.']);
            exit;
        }
    }

    $nuevoPedido = [
        'numeroNota' => $numeroNota,
        'numeroExpediente' => $numeroExpediente,
        'causante' => $causante,
        'personaAutoriza' => $personaAutoriza,
        'archivoPDF' => $archivoPDF,
        'fecha' => date('d/m/Y')
    ];

    $data['pedidos'][] = $nuevoPedido;

    file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true, 'message' => 'Pedido agregado exitosamente.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>
