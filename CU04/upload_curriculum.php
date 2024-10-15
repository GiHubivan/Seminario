<?php
header('Content-Type: application/json');

// Verifica que se ha recibido el archivo
if (!isset($_FILES['curriculumFile']) || !isset($_POST['username']) || !isset($_POST['convocatoriaId'])) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit();
}

$convocatoriaId = $_POST['convocatoriaId'];
$username = $_POST['username'];
$file = $_FILES['curriculumFile'];

// Ruta del archivo JSON
$convocatoriasFile = 'convocatorias.json';

// Verifica si el archivo JSON existe y es escribible
if (!file_exists($convocatoriasFile) || !is_writable($convocatoriasFile)) {
    echo json_encode(['success' => false, 'message' => 'El archivo de convocatorias no es escribible.']);
    exit();
}

// Intenta mover el archivo subido a la carpeta de uploads
$uploadDir = 'Upload/';
if (!file_exists($uploadDir) && !mkdir($uploadDir, 0777, true)) {
    echo json_encode(['success' => false, 'message' => 'Error al crear la carpeta de uploads.']);
    exit();
}

$uploadFile = $uploadDir . basename($file['name']);
if (!move_uploaded_file($file['tmp_name'], $uploadFile)) {
    echo json_encode(['success' => false, 'message' => 'Error al mover el archivo a la ubicación final.']);
    exit();
}

// Lee el archivo JSON y decodifica el contenido
$convocatoriasData = json_decode(file_get_contents($convocatoriasFile), true);
if ($convocatoriasData === null) {
    echo json_encode(['success' => false, 'message' => 'Error al leer el archivo de convocatorias.']);
    exit();
}

// Busca la convocatoria seleccionada
$convocatoriaFound = false;
foreach ($convocatoriasData as &$convocatoria) {
    if ($convocatoria['id'] == $convocatoriaId) {
        // Añade el usuario y el archivo al objeto de la convocatoria
        if (!isset($convocatoria['curriculums'])) {
            $convocatoria['curriculums'] = [];
        }
        $convocatoria['curriculums'][] = [
            'username' => $username,
            'curriculum' => $uploadFile
        ];
        $convocatoriaFound = true;
        break;
    }
}

// Si la convocatoria no fue encontrada, responde con un error
if (!$convocatoriaFound) {
    echo json_encode(['success' => false, 'message' => 'Convocatoria no encontrada.']);
    exit();
}

// Guarda los cambios en el archivo JSON
if (file_put_contents($convocatoriasFile, json_encode($convocatoriasData, JSON_PRETTY_PRINT)) === false) {
    echo json_encode(['success' => false, 'message' => 'Error al guardar los datos en el archivo JSON.']);
    exit();
}

// Responde con éxito
echo json_encode(['success' => true]);
?>
