<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('datos.json'), true);
    
    // Obtener los datos del formulario
    $courseId = $_POST['courseId'];
    $courseName = $_POST['courseName'];
    $courseCondition = $_POST['courseCondition'];
    $courseDate = $_POST['courseDate'];
    $coursePDF = $_POST['coursePDF'];

    // Si el id está vacío, se trata de una nueva entrada
    if (empty($courseId)) {
        $data['courses'][] = [
            'nombre_curso' => $courseName,
            'condicion' => $courseCondition,
            'fecha_realizacion' => $courseDate,
            'pdf' => $coursePDF
        ];
    } else {
        // Si hay id, actualizamos la entrada existente
        foreach ($data['courses'] as &$course) {
            if ($course['id'] == $courseId) {
                $course['nombre_curso'] = $courseName;
                $course['condicion'] = $courseCondition;
                $course['fecha_realizacion'] = $courseDate;
                $course['pdf'] = $coursePDF;
                break;
            }
        }
    }

    // Guardar los datos actualizados en el archivo JSON
    file_put_contents('datos.json', json_encode($data));
    echo json_encode(['success' => true]);
}
?>
