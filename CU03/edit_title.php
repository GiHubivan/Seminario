<?php
$dataFile = 'datos.json';
$data = json_decode(file_get_contents($dataFile), true);

$index = $_POST['index'];
$data['titles']['data'][$index] = [
    'carrera' => $_POST['carrera'],
    'institucion' => $_POST['institucion'],
    'ano_egreso' => $_POST['ano_egreso'],
    'pdf' => $_POST['pdf']
];

file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));

echo 'Título editado exitosamente';
?>
