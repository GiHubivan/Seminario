$(document).ready(function() {
    // Initialize DataTables
    $('#titlesTable').DataTable({
        ajax: {
            url: 'datos.json',
            dataSrc: 'titles.data'
        },
        columns: [
            { data: 'carrera' },
            { data: 'institucion' },
            { data: 'ano_egreso' },
            { data: 'pdf', render: function(data) { return `<a href="${data}" target="_blank">Ver PDF</a>`; } },
            { data: null, defaultContent: '<button class="btn btn-warning btn-sm edit-btn">Editar</button>' }
        ]
    });

    $('#experienceTable').DataTable({
        ajax: {
            url: 'datos.json',
            dataSrc: 'experience.data'
        },
        columns: [
            { data: 'institucion' },
            { data: 'asignatura' },
            { data: 'funcion' },
            { data: 'fecha_inicio' },
            { data: 'pdf', render: function(data) { return `<a href="${data}" target="_blank">Ver PDF</a>`; } },
            { data: null, defaultContent: '<button class="btn btn-warning btn-sm edit-btn">Editar</button>' }
        ]
    });

    $('#researchTable').DataTable({
        ajax: {
            url: 'datos.json',
            dataSrc: 'research.data'
        },
        columns: [
            { data: 'nombre_proyecto' },
            { data: 'director' },
            { data: 'ano_inicio' },
            { data: 'pdf', render: function(data) { return `<a href="${data}" target="_blank">Ver PDF</a>`; } },
            { data: null, defaultContent: '<button class="btn btn-warning btn-sm edit-btn">Editar</button>' }
        ]
    });

    $('#coursesTable').DataTable({
        ajax: {
            url: 'datos.json',
            dataSrc: 'courses.data'
        },
        columns: [
            { data: 'nombre_curso' },
            { data: 'condicion' },
            { data: 'fecha_realizacion' },
            { data: 'pdf', render: function(data) { return `<a href="${data}" target="_blank">Ver PDF</a>`; } },
            { data: null, defaultContent: '<button class="btn btn-warning btn-sm edit-btn">Editar</button>' }
        ]
    });

    // Handle menu navigation
    $('.nav-link').on('click', function() {
        var target = $(this).data('target');
        $('.tab-content').hide();
        $('#' + target).show();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    // Handle form display and submission
    $('#addTitleBtn, #addExperienceBtn, #addResearchBtn, #addCourseBtn').on('click', function() {
        var type = this.id.replace('add', '').replace('Btn', '');
        $('#modalTitle').text('Agregar ' + capitalizeFirstLetter(type));
        $('#editForm').attr('action', 'add_' + type + '.php');
        $('#editModal').show();
    });

    $('#editForm').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function(response) {
                alert('Datos guardados correctamente');
                $('#editModal').hide();
                $('#titlesTable').DataTable().ajax.reload();
                $('#experienceTable').DataTable().ajax.reload();
                $('#researchTable').DataTable().ajax.reload();
                $('#coursesTable').DataTable().ajax.reload();
            }
        });
    });

    // Handle row editing
    $('#titlesTable, #experienceTable, #researchTable, #coursesTable').on('click', '.edit-btn', function() {
        var table = $(this).closest('table').attr('id');
        var data = $('#' + table).DataTable().row($(this).parents('tr')).data();
        $('#editForm').attr('action', 'edit_' + table.replace('Table', '') + '.php');
        $('#modalTitle').text('Editar ' + capitalizeFirstLetter(table.replace('Table', '')));
        $('#editForm').find('input').each(function() {
            $(this).val(data[$(this).attr('name')]);
        });
        $('#editModal').show();
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function enableEdit() {
        $('#profileForm input').prop('disabled', false);
        $('#saveProfile').show();
    }

    function closeModal() {
        $('#editModal').hide();
    }
});
