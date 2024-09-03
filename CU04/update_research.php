<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('datos.json'), true);
    
    // Obtener los datos del formulario
    $researchId = $_POST['researchId'];
    $researchProject = $_POST['researchProject'];
    $researchDirector = $_POST['researchDirector'];
    $researchYear = $_POST['researchYear'];
    $researchPDF = $_POST['researchPDF'];

    // Si el id está vacío, se trata de una nueva entrada
    if (empty($researchId)) {
        $data['research'][] = [
            'nombre_proyecto' => $researchProject,
            'director' => $researchDirector,
            'ano_inicio' => $researchYear,
            'pdf' => $researchPDF
        ];
    } else {
        // Si hay id, actualizamos la entrada existente
        foreach ($data['research'] as &$research) {
            if ($research['id'] == $researchId) {
                $research['nombre_proyecto'] = $researchProject;
                $research['director'] = $researchDirector;
                $research['ano_inicio'] = $researchYear;
                $research['pdf'] = $researchPDF;
                break;
            }
        }
    }

    // Guardar los datos actualizados en el archivo JSON
    file_put_contents('datos.json', json_encode($data));
    echo json_encode(['success' => true]);
}
?>
