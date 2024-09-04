$(document).ready(function() {
    // Función para mostrar las vistas
    function showView(viewId) {
        $('.view').removeClass('active').addClass('hidden');
        $('#' + viewId).removeClass('hidden').addClass('active');
    }

    // Manejo del formulario de login
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            url: 'auth.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username: username, password: password }),
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

    // Manejo de los botones de cerrar modal
    $('.modal .close').on('click', function() {
        var modalId = $(this).data('target');
        closeModal(modalId);
    });

    // Manejo del botón de inscripción
    $('#inscribirBtn').on('click', function() {
        openModal('uploadCurriculumModal');
    });

    // Manejo del formulario de carga de currículum
    $('#uploadCurriculumForm').on('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(this);
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
                    alert('Error al cargar el currículum.');
                }
            }
        });
    });

    // Cargar convocatorias
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
});
