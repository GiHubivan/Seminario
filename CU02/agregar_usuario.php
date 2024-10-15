<?php
header('Content-Type: application/json');

// Ruta del archivo JSON
$archivoJson = 'datos.json';

// Función para obtener los datos del archivo JSON
function obtenerUsuarios() {
    global $archivoJson;
    if (!file_exists($archivoJson)) {
        return [];
    }
    $contenido = file_get_contents($archivoJson);
    return json_decode($contenido, true);
}

// Función para guardar los datos en el archivo JSON
function guardarUsuarios($usuarios) {
    global $archivoJson;
    $contenido = json_encode($usuarios, JSON_PRETTY_PRINT);
    file_put_contents($archivoJson, $contenido);
}

// Obtener los datos enviados por POST
$nombre = $_POST['nombre'] ?? '';
$apellido = $_POST['apellido'] ?? '';
$dni = $_POST['dni'] ?? '';
$email = $_POST['email'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$direccion = $_POST['direccion'] ?? '';
$usuario = $_POST['usuario'] ?? '';
$contrasena = $_POST['contrasena'] ?? '';

// Validar que todos los campos requeridos estén presentes
if (empty($nombre) || empty($apellido) || empty($dni) || empty($email) || empty($telefono) || empty($direccion) || empty($usuario) || empty($contrasena)) {
    echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios.']);
    exit;
}

// Verificar si el usuario ya existe
$usuarios = obtenerUsuarios();
foreach ($usuarios as $user) {
    if ($user['usuario'] === $usuario) {
        echo json_encode(['success' => false, 'message' => 'El nombre de usuario ya está registrado.']);
        exit;
    }
}

// Agregar el nuevo usuario
$usuarios[] = [
    'nombre' => $nombre,
    'apellido' => $apellido,
    'dni' => $dni,
    'email' => $email,
    'telefono' => $telefono,
    'direccion' => $direccion,
    'usuario' => $usuario,
    'contrasena' => $contrasena
];

// Guardar los datos en el archivo JSON
guardarUsuarios($usuarios);

echo json_encode(['success' => true, 'message' => 'Usuario agregado correctamente.']);
?>
