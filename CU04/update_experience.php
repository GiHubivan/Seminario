<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('datos.json'), true);
    
    // Obtener los datos del formulario
    $experienceId = $_POST['experienceId'];
    $expInstitution = $_POST['expInstitution'];
    $expSubject = $_POST['expSubject'];
    $expFunction = $_POST['expFunction'];
    $expStartDate = $_POST['expStartDate'];
    $expPDF = $_POST['expPDF'];

    // Si el id está vacío, se trata de una nueva entrada
    if (empty($experienceId)) {
        $data['experience'][] = [
            'institucion' => $expInstitution,
            'asignatura' => $expSubject,
            'funcion' => $expFunction,
            'fecha_inicio' => $expStartDate,
            'pdf' => $expPDF
        ];
    } else {
        // Si hay id, actualizamos la entrada existente
        foreach ($data['experience'] as &$experience) {
            if ($experience['id'] == $experienceId) {
                $experience['institucion'] = $expInstitution;
                $experience['asignatura'] = $expSubject;
                $experience['funcion'] = $expFunction;
                $experience['fecha_inicio'] = $expStartDate;
                $experience['pdf'] = $expPDF;
                break;
            }
        }
    }

    // Guardar los datos actualizados en el archivo JSON
    file_put_contents('datos.json', json_encode($data));
    echo json_encode(['success' => true]);
}
?>
