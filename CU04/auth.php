<?php
header('Content-Type: application/json');

// Recoger datos enviados por POST
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

// Leer el archivo JSON con los usuarios
$usuariosFile = 'usuarios.json';
$usuarios = json_decode(file_get_contents($usuariosFile), true);

// Verificar las credenciales
$response = ['success' => false];
foreach ($usuarios as $usuario) {
    if ($usuario['username'] === $username && $usuario['password'] === $password) {
        $response['success'] = true;
        break;
    }
}

// Enviar respuesta JSON
echo json_encode($response);
?>
