<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('datos.json'), true);
    
    // Obtener los datos del formulario
    $titleId = $_POST['titleId'];
    $titleCareer = $_POST['titleCareer'];
    $titleInstitution = $_POST['titleInstitution'];
    $titleYear = $_POST['titleYear'];
    $titlePDF = $_POST['titlePDF'];

    // Si el id está vacío, se trata de una nueva entrada
    if (empty($titleId)) {
        $data['titles'][] = [
            'carrera' => $titleCareer,
            'institucion' => $titleInstitution,
            'ano_egreso' => $titleYear,
            'pdf' => $titlePDF
        ];
    } else {
        // Si hay id, actualizamos la entrada existente
        foreach ($data['titles'] as &$title) {
            if ($title['id'] == $titleId) {
                $title['carrera'] = $titleCareer;
                $title['institucion'] = $titleInstitution;
                $title['ano_egreso'] = $titleYear;
                $title['pdf'] = $titlePDF;
                break;
            }
        }
    }

    // Guardar los datos actualizados en el archivo JSON
    file_put_contents('datos.json', json_encode($data));
    echo json_encode(['success' => true]);
}
?>
