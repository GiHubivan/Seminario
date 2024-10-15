$(document).ready(function() {
    var selectedConvocatoriaId; // Variable global para almacenar la convocatoria seleccionada
    var currentUsername; // Variable para almacenar el nombre de usuario actual

    // Función para mostrar las vistas
    function showView(viewId) {
        $('.view').removeClass('active').addClass('hidden');
        $('#' + viewId).removeClass('hidden').addClass('active');
    }

    // Función para abrir el modal
    function openModal(modalId) {
        $('#' + modalId).removeClass('hidden').addClass('active');
        $('body').addClass('modal-open');
    }

    // Función para cerrar el modal
    function closeModal(modalId) {
        $('#' + modalId).removeClass('active').addClass('hidden');
        $('body').removeClass('modal-open');
    }

    // Manejo del formulario de login
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        currentUsername = $('#username').val(); // Guardar el nombre de usuario actual
        var password = $('#password').val();

        $.ajax({
            url: 'auth.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: currentUsername, password: password }),
            success: function(response) {
                if (response.success) {
                    showView('convocatoriasView');
                    loadConvocatorias();
                } else {
                    alert('Usuario o contraseña incorrectos.');
                }
            }
        });
    });

    // Manejo del botón de inscripción
    $('#inscribirBtn').on('click', function() {
        checkIfUserIsAlreadyRegistered();
    });

    // Verificar si el usuario ya está inscrito en la convocatoria
    function checkIfUserIsAlreadyRegistered() {
        $.ajax({
            url: 'convocatorias.json',
            dataType: 'json',
            success: function(data) {
                var isRegistered = false;
                $.each(data, function(index, convocatoria) {
                    if (convocatoria.id === selectedConvocatoriaId) {
                        var curriculums = convocatoria.curriculums || [];
                        $.each(curriculums, function(_, curriculum) {
                            if (curriculum.username === currentUsername) {
                                isRegistered = true;
                                return false; // Rompe el bucle interno
                            }
                        });
                        return false; // Rompe el bucle externo
                    }
                });
                if (isRegistered) {
                    alert('Ya estás inscrito en esta convocatoria.');
                } else {
                    openModal('uploadCurriculumModal');
                }
            }
        });
    }

    // Manejo del formulario de carga de currículum
    $('#uploadCurriculumForm').on('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        formData.append('convocatoriaId', selectedConvocatoriaId);
        formData.append('username', currentUsername);

        uploadCurriculum(formData);
    });

    // Función para subir el currículum
    function uploadCurriculum(formData) {
        $.ajax({
            url: 'upload_curriculum.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                if (response.success) {
                    closeModal('uploadCurriculumModal');
                    alert('Currículum cargado exitosamente.');
                } else {
                    handleServerError(response.message);
                }
            },
            error: function() {
                alert('Error al enviar el formulario. Por favor, inténtelo de nuevo más tarde.');
            }
        });
    }

    // Función para cargar convocatorias
    function loadConvocatorias() {
        $('#convocatoriasTable').DataTable({
            ajax: {
                url: 'convocatorias.json',
                dataSrc: ''
            },
            columns: [
                { data: 'cargo' },
                { data: 'materia' },
                { data: 'fecha_inicio' },
                {
                    data: null,
                    defaultContent: '<button class="view-details">Ver Detalles</button>'
                }
            ]
        });
    }

    // Manejo del botón de ver detalles
    $('#convocatoriasTable').on('click', 'button.view-details', function() {
        var table = $('#convocatoriasTable').DataTable();
        var data = table.row($(this).parents('tr')).data();
        selectedConvocatoriaId = data.id; // Guardar ID de la convocatoria seleccionada
        $('#convocatoriaDetails').html(`
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Nombre:</strong> ${data.nombre}</p>
            <p><strong>Institución:</strong> ${data.institucion}</p>
            <p><strong>Fecha de Inicio:</strong> ${data.fecha_inicio}</p>
            <p><strong>Fecha de Fin:</strong> ${data.fecha_fin}</p>
            <p><strong>Estado:</strong> ${data.estado}</p>
            <p><strong>Cargo:</strong> ${data.cargo}</p>
            <p><strong>Materia:</strong> ${data.materia}</p>
            <p><strong>Dedicación:</strong> ${data.dedicacion}</p>
            <p><strong>Fecha de Inscripción:</strong> ${data.fecha_inscripcion}</p>
            <p><strong>Condición:</strong> ${data.condicion}</p>
        `);
        showView('convocatoriaDetailView');
    });

    // Manejo del botón de cerrar detalles
    $('#convocatoriaDetailView').on('click', 'button.close-details', function() {
        showView('convocatoriasView'); // Regresar a la vista de convocatorias
    });

    // Manejo de errores del servidor
    function handleServerError(errorMessage) {
        const errorMessages = {
            'El archivo de convocatorias no es escribible.': 'No se puede escribir en el archivo de convocatorias. Verifique los permisos.',
            'Error al mover el archivo a la ubicación final.': 'No se pudo mover el archivo a la ubicación final. Intente nuevamente.',
            'El archivo de convocatorias no existe.': 'El archivo de convocatorias no se encuentra. Verifique su existencia.',
            'Error al leer el archivo de convocatorias.': 'Hubo un problema al leer el archivo de convocatorias.',
            'Convocatoria no encontrada.': 'La convocatoria seleccionada no se encuentra.',
            'Error al guardar los datos en el archivo JSON.': 'No se pudo guardar la información en el archivo JSON.',
            'Método no permitido.': 'Método de solicitud no permitido. Intente de nuevo.'
        };

        let userFriendlyMessage = errorMessages[errorMessage] || 'Error desconocido. Por favor, inténtelo de nuevo.';
        alert(userFriendlyMessage);
    }
});
