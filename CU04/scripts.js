$(document).ready(function() {
    function openModal(modalId, data) {
        $('#' + modalId).show();
        if (data) {
            for (let key in data) {
                $('#' + modalId + ' [name="' + key + '"]').val(data[key]);
            }
        }
        $('body').addClass('modal-open'); // Opcional: Para bloquear el scroll del fondo
    }

    function closeModal(modalId) {
        $('#' + modalId).hide();
        $('body').removeClass('modal-open'); // Opcional: Para desbloquear el scroll del fondo
    }

    function loadPersonalData() {
        $.getJSON('datos.json', function(data) {
            $('#profileForm [name="name"]').val(data.personalData.name);
            $('#profileForm [name="surname"]').val(data.personalData.surname);
            $('#profileForm [name="dni"]').val(data.personalData.dni);
            $('#profileForm [name="address"]').val(data.personalData.address);
        });
    }

    $('#addTitleBtn').on('click', function() {
        openModal('editTitleModal', {}); // Abre el modal para agregar un nuevo título
    });

    $('#addExperienceBtn').on('click', function() {
        openModal('editExperienceModal', {}); // Abre el modal para agregar nueva experiencia
    });

    $('#addResearchBtn').on('click', function() {
        openModal('editResearchModal', {}); // Abre el modal para agregar nueva investigación
    });

    $('#addCourseBtn').on('click', function() {
        openModal('editCourseModal', {}); // Abre el modal para agregar nuevo curso
    });

    $('.nav-link').on('click', function() {
        var target = $(this).data('target');
        $('.tab-content-section').hide(); // Oculta todas las secciones de contenido
        $('#' + target).show(); // Muestra la sección seleccionada
    });

    $('#profileForm button[type="button"]').on('click', function() {
        $('#profileForm input').prop('disabled', false); // Habilita los campos
        $('#saveProfile').show(); // Muestra el botón de guardar
        $(this).hide(); // Oculta el botón de modificar
    });

    $('.modal .close').on('click', function() {
        var modalId = $(this).data('target');
        closeModal(modalId);
    });

    $('#editTitleForm').on('submit', function(e) {
        e.preventDefault();
        $.post('update_title.php', $(this).serialize(), function(response) {
            if (response.success) {
                $('#titlesTable').DataTable().ajax.reload();
                closeModal('editTitleModal');
            } else {
                alert('Error al guardar el título.');
            }
        }, 'json');
    });

    $('#editExperienceForm').on('submit', function(e) {
        e.preventDefault();
        $.post('update_experience.php', $(this).serialize(), function(response) {
            if (response.success) {
                $('#experienceTable').DataTable().ajax.reload();
                closeModal('editExperienceModal');
            } else {
                alert('Error al guardar la experiencia.');
            }
        }, 'json');
    });

    $('#editResearchForm').on('submit', function(e) {
        e.preventDefault();
        $.post('update_research.php', $(this).serialize(), function(response) {
            if (response.success) {
                $('#researchTable').DataTable().ajax.reload();
                closeModal('editResearchModal');
            } else {
                alert('Error al guardar la investigación.');
            }
        }, 'json');
    });

    $('#editCourseForm').on('submit', function(e) {
        e.preventDefault();
        $.post('update_course.php', $(this).serialize(), function(response) {
            if (response.success) {
                $('#coursesTable').DataTable().ajax.reload();
                closeModal('editCourseModal');
            } else {
                alert('Error al guardar el curso.');
            }
        }, 'json');
    });

    $('#titlesTable').DataTable({
        ajax: {
            url: 'datos.json',
            dataSrc: 'titles' // Datos de títulos
        },
        columns: [
            { data: 'carrera' },
            { data: 'institucion' },
            { data: 'ano_egreso' },
            { data: 'pdf' },
            {
                data: null,
                defaultContent: '<button class="edit">Editar</button>'
            }
        ]
    });

    $('#experienceTable').DataTable({
        ajax: {
            url: 'datos.json',
            dataSrc: 'experience' // Datos de experiencia
        },
        columns: [
            { data: 'institucion' },
            { data: 'asignatura' },
            { data: 'funcion' },
            { data: 'fecha_inicio' },
            { data: 'pdf' },
            {
                data: null,
                defaultContent: '<button class="edit">Editar</button>'
            }
        ]
    });

    $('#researchTable').DataTable({
        ajax: {
            url: 'datos.json',
            dataSrc: 'research' // Datos de investigación
        },
        columns: [
            { data: 'nombre_proyecto' },
            { data: 'director' },
            { data: 'ano_inicio' },
            { data: 'pdf' },
            {
                data: null,
                defaultContent: '<button class="edit">Editar</button>'
            }
        ]
    });

    $('#coursesTable').DataTable({
        ajax: {
            url: 'datos.json',
            dataSrc: 'courses' // Datos de cursos
        },
        columns: [
            { data: 'nombre_curso' },
            { data: 'condicion' },
            { data: 'fecha_realizacion' },
            { data: 'pdf' },
            {
                data: null,
                defaultContent: '<button class="edit">Editar</button>'
            }
        ]
    });

    $('#titlesTable, #experienceTable, #researchTable, #coursesTable').on('click', 'button.edit', function() {
        var table = $(this).closest('table').DataTable();
        var data = table.row($(this).parents('tr')).data();
        var modalId = $(this).closest('table').attr('id').replace('Table', 'Modal');
        openModal(modalId, data);
    });

    // Cargar datos personales al iniciar
    loadPersonalData();
});
