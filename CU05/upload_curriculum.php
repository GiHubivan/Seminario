<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Ruta del archivo JSON donde se guardan las convocatorias
    $convocatoriasFile = 'convocatorias.json';

    // Verifica si el archivo JSON existe y es accesible
    if (!is_writable($convocatoriasFile)) {
        echo json_encode(['success' => false, 'message' => 'El archivo de convocatorias no es escribible.']);
        exit;
    }

    // Obtener los datos enviados
    $username = $_POST['username'] ?? '';
    $convocatoriaId = $_POST['convocatoriaId'] ?? '';

    // Verificar si el archivo de currículum está presente
    if (!isset($_FILES['curriculumFile']) || $_FILES['curriculumFile']['error'] != UPLOAD_ERR_OK) {
        $errorMessages = [
            UPLOAD_ERR_INI_SIZE => 'El archivo excede el tamaño máximo permitido en la configuración de PHP.',
            UPLOAD_ERR_FORM_SIZE => 'El archivo excede el tamaño máximo permitido en el formulario HTML.',
            UPLOAD_ERR_PARTIAL => 'El archivo fue subido parcialmente.',
            UPLOAD_ERR_NO_FILE => 'No se subió ningún archivo.',
            UPLOAD_ERR_NO_TMP_DIR => 'Falta el directorio temporal.',
            UPLOAD_ERR_CANT_WRITE => 'No se puede escribir el archivo en el disco.',
            UPLOAD_ERR_EXTENSION => 'Una extensión de PHP detuvo la subida del archivo.'
        ];
        $errorCode = $_FILES['curriculumFile']['error'];
        $errorMessage = $errorMessages[$errorCode] ?? 'Error desconocido al cargar el archivo.';
        echo json_encode(['success' => false, 'message' => $errorMessage]);
        exit;
    }

    // Validar y mover el archivo a la ubicación deseada
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0777, true)) {
            echo json_encode(['success' => false, 'message' => 'No se pudo crear el directorio de subidas.']);
            exit;
        }
    }

    $uploadFile = $uploadDir . basename($_FILES['curriculumFile']['name']);
    if (!move_uploaded_file($_FILES['curriculumFile']['tmp_name'], $uploadFile)) {
        echo json_encode(['success' => false, 'message' => 'Error al mover el archivo a la ubicación final.']);
        exit;
    }

    // Leer el archivo JSON
    if (!file_exists($convocatoriasFile)) {
        echo json_encode(['success' => false, 'message' => 'El archivo de convocatorias no existe.']);
        exit;
    }

    $convocatorias = json_decode(file_get_contents($convocatoriasFile), true);
    if ($convocatorias === null) {
        echo json_encode(['success' => false, 'message' => 'Error al leer el archivo de convocatorias.']);
        exit;
    }

    // Buscar la convocatoria por ID y agregar el currículum
    $convocatoriaIndex = -1;
    foreach ($convocatorias as $index => $convocatoria) {
        if ($convocatoria['id'] == $convocatoriaId) {
            $convocatoriaIndex = $index;
            break;
        }
    }

    if ($convocatoriaIndex === -1) {
        echo json_encode(['success' => false, 'message' => 'Convocatoria no encontrada.']);
        exit;
    }

    // Agregar el currículum a la convocatoria seleccionada
    $convocatorias[$convocatoriaIndex]['curriculums'][] = [
        'username' => $username,
        'curriculumFile' => $uploadFile
    ];

    // Guardar los datos actualizados en el archivo JSON
    if (file_put_contents($convocatoriasFile, json_encode($convocatorias, JSON_PRETTY_PRINT)) === false) {
        echo json_encode(['success' => false, 'message' => 'Error al guardar los datos en el archivo JSON.']);
        exit;
    }

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}
?>
