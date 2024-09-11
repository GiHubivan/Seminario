$(document).ready(function() {
    // Cargar los datos de resoluciones
    function loadResolucionesData() {
        $.getJSON('data/resoluciones.json', function(data) {
            // Actualizar la tabla de Convocatorias
            updateConvocatoriasTable(data);

            // Actualizar la tabla de Resoluciones
            updateResolucionesTable(data);
        }).fail(function() {
            alert('Error al cargar el archivo resoluciones.json');
        });
    }

    // Función para actualizar la tabla de Convocatorias
    function updateConvocatoriasTable(data) {
        var convocatoriasData = data.filter(function(resolucion) {
            return resolucion.tipo === 'llamado_a_inscripcion';
        }).map(function(resolucion) {
            return {
                numeroResolucion: resolucion.numeroResolucion,
                numeroExpediente: resolucion.numeroExpediente,
                cargo: resolucion.cargo,
                materia: resolucion.materia,
                carrera: resolucion.carrera,
                dedicacion: resolucion.dedicacion,
                estado: resolucion.estado,
                detalle: '<button class="details-btn" data-resolucion=\'' + JSON.stringify(resolucion) + '\'>Ver Detalles</button>'
            };
        });

        $('#convocatoriasTable').DataTable().clear().rows.add(convocatoriasData).draw();
    }

    // Función para actualizar la tabla de Resoluciones
    function updateResolucionesTable(data) {
        var resolucionesData = data.map(function(resolucion) {
            return {
                numeroExpediente: resolucion.numeroExpediente,
                numeroResolucion: resolucion.numeroResolucion,
                tipo: resolucion.tipo,
                cargo: resolucion.cargo,
                materia: resolucion.materia,
                carrera: resolucion.carrera,
                dedicacion: resolucion.dedicacion,
                condicion: resolucion.condicion,
                estado: resolucion.estado,
                pdf: '<a href="' + resolucion.pdfUrl + '" target="_blank">Ver PDF</a>'
            };
        });

        $('#resolucionesTable').DataTable().clear().rows.add(resolucionesData).draw();
    }

    // Manejo del envío del formulario
    $('#resolutionForm').on('submit', function(event) {
        event.preventDefault(); // Previene el envío por defecto del formulario

        // Serializa los datos del formulario
        var formData = $(this).serialize();

        // Realiza una solicitud AJAX al script PHP
        $.ajax({
            url: 'guardar_resolucion.php', // URL del script PHP
            type: 'POST', // Método de la solicitud
            data: formData, // Datos a enviar
            success: function(response) {
                alert(response.message); // Mensaje del servidor
                $('#newResolutionPopup').hide(); // Ocultar el popup
                $('#resolutionForm')[0].reset(); // Limpiar el formulario
                loadResolucionesData(); // Vuelve a cargar los datos de las resoluciones
            },
            error: function(xhr, status, error) {
                alert('Hubo un error al guardar la resolución: ' + error);
            }
        });
    });

    // Mostrar y ocultar secciones
    $('#showInicio').click(function() {
        $('.section').removeClass('active');
        $('#paginaPrincipal').addClass('active');
        $('#newResolutionPopup').hide();
    });

    $('#showConvocatorias').click(function() {
        $('.section').removeClass('active');
        $('#convocatoriasView').addClass('active');
        $('#newResolutionPopup').hide();
    });

    $('#showResoluciones').click(function() {
        $('.section').removeClass('active');
        $('#resolucionesView').addClass('active');
        $('#newResolutionPopup').hide();
    });

    // Mostrar formulario de nueva resolución en un modal
    $('#newResolutionButton').click(function() {
        $('#newResolutionPopup').show();
    });

    // Cerrar el modal
    $('.close').click(function() {
        $('#newResolutionPopup').hide();
    });

    // Cancelar y cerrar el modal
    $('#cancelButton').click(function() {
        $('#newResolutionPopup').hide();
    });

    // Mostrar detalles de la resolución en la tabla de Convocatorias
    $('#convocatoriasTable').on('click', '.details-btn', function() {
        var resolucion = $(this).data('resolucion');
        alert('Detalles de la Resolución:\n' +
            'Número Resolución: ' + resolucion.numeroResolucion + '\n' +
            'Número Expediente: ' + resolucion.numeroExpediente + '\n' +
            'Cargo: ' + resolucion.cargo + '\n' +
            'Materia: ' + resolucion.materia + '\n' +
            'Carrera: ' + resolucion.carrera + '\n' +
            'Dedicación: ' + resolucion.dedicacion + '\n' +
            'Estado: ' + resolucion.estado + '\n' +
            'Fecha de Apertura: ' + resolucion.fechaApertura + '\n' +
            'Fecha de Cierre: ' + resolucion.fechaCierre + '\n' +
            'Requisitos: ' + resolucion.requisitos + '\n' +
            'Fecha Sorteo Temas: ' + resolucion.fechaSorteoTemas + '\n' +
            'Fecha Entrevista: ' + resolucion.fechaEntrevista + '\n' +
            'PDF: ' + resolucion.pdfUrl + '\n' +
            'Comisión Evaluadora: ' + '\n' +
            'Titulares: ' + resolucion.comisionEvaluadora.titulares.join(', ') + '\n' +
            'Suplentes: ' + resolucion.comisionEvaluadora.suplentes.join(', ') + '\n'
        );
    });

    // Verificar número de resolución en tiempo real
    $('#numeroResolucion').on('blur', function() {
        var numeroResolucion = $(this).val().trim();

        if (numeroResolucion) {
            $.getJSON('data/resoluciones.json', function(data) {
                var exists = data.some(function(resolucion) {
                    return resolucion.numeroResolucion === numeroResolucion;
                });

                if (exists) {
                    alert('El número de resolución ya existe. Por favor, elija otro número.');
                    $('#numeroResolucion').val(''); // Limpiar el campo si ya existe
                }
            }).fail(function() {
                alert('Error al verificar el número de resolución');
            });
        }
    });

    // Cargar datos al inicio
    loadResolucionesData();
});
$(document).ready(function() {
    $('#resolucionesTable').DataTable({
        ajax: {
            url: 'resoluciones.json', // Cambia la ruta si es necesario
            dataSrc: ''
        },
        columns: [
            { data: 'numeroExpediente' },
            { data: 'numeroResolucion' },
            { data: 'tipo' },
            { data: 'cargo' },
            { data: 'materia' },
            { data: 'carrera' },
            { data: 'dedicacion' },
            { data: 'condicion' },
            { data: 'estado' },
            { data: 'pdfUrl', render: function(data) {
                return data ? '<a href="' + data + '" target="_blank">Ver PDF</a>' : '';
            }}
        ]
    });

    $('#convocatoriasTable').DataTable({
        ajax: {
            url: 'resoluciones.json', // Cambia la ruta si es necesario
            dataSrc: '',
            filter: function(data) {
                return data.filter(function(item) {
                    return item.tipo === 'llamado_a_inscripcion';
                });
            }
        },
        columns: [
            { data: 'numeroResolucion' },
            { data: 'numeroExpediente' },
            { data: 'cargo' },
            { data: 'materia' },
            { data: 'carrera' },
            { data: 'dedicacion' },
            { data: 'estado' },
            { data: 'pdfUrl', render: function(data) {
                return data ? '<a href="' + data + '" target="_blank">Ver PDF</a>' : '';
            }}
        ]
    });
});
