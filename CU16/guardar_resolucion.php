<?php
header('Content-Type: application/json');

// Ruta al archivo JSON
$file = 'data/resoluciones.json';

// Recibir datos del formulario
$numeroResolucion = isset($_POST['numeroResolucion']) ? trim($_POST['numeroResolucion']) : '';
$numeroExpediente = isset($_POST['numeroExpediente']) ? trim($_POST['numeroExpediente']) : '';
$cargo = isset($_POST['cargo']) ? trim($_POST['cargo']) : '';
$materia = isset($_POST['materia']) ? trim($_POST['materia']) : '';
$carrera = isset($_POST['carrera']) ? trim($_POST['carrera']) : '';
$dedicacion = isset($_POST['dedicacion']) ? trim($_POST['dedicacion']) : '';
$estado = isset($_POST['estado']) ? trim($_POST['estado']) : '';
$tipo = isset($_POST['tipo']) ? trim($_POST['tipo']) : '';
$condicion = isset($_POST['condicion']) ? trim($_POST['condicion']) : '';
$pdfUrl = isset($_POST['pdfUrl']) ? trim($_POST['pdfUrl']) : '';

// Verificar que los campos no estén vacíos
if (empty($numeroResolucion) || empty($numeroExpediente) || empty($cargo) || empty($materia) || empty($carrera) || empty($dedicacion) || empty($estado) || empty($tipo) || empty($condicion) || empty($pdfUrl)) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son requeridos.']);
    exit;
}

// Leer el archivo JSON existente
$data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

// Verificar si el número de resolución ya existe
foreach ($data as $resolucion) {
    if ($resolucion['numeroResolucion'] === $numeroResolucion) {
        echo json_encode(['success' => false, 'message' => 'El número de resolución ya existe.']);
        exit;
    }
}

// Crear nueva resolución
$newResolution = [
    'numeroResolucion' => $numeroResolucion,
    'numeroExpediente' => $numeroExpediente,
    'cargo' => $cargo,
    'materia' => $materia,
    'carrera' => $carrera,
    'dedicacion' => $dedicacion,
    'estado' => $estado,
    'tipo' => $tipo,
    'condicion' => $condicion,
    'pdfUrl' => $pdfUrl
];

// Añadir nueva resolución a los datos existentes
$data[] = $newResolution;

// Guardar los datos actualizados en el archivo JSON
if (file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => true, 'message' => 'Resolución guardada correctamente.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al guardar la resolución.']);
}
?>

<?php
error_log(print_r($_POST, true));

header('Content-Type: application/json');

// Depuración: Imprimir los datos recibidos
echo '<pre>';
print_r($_POST);
echo '</pre>';
?>
