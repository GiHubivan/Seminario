<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $nuevaConvocatoria = json_decode($json, true);

    if ($nuevaConvocatoria) {
        $file = 'convocatorias.json';
        $data = json_decode(file_get_contents($file), true);

        if (!is_array($data)) {
            $data = [];
        }

        $data[] = $nuevaConvocatoria;
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));

        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid Request']);
}
?>
