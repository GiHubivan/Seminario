$(document).ready(function() {
    const table = $('#cargosTable').DataTable();
    const modal = $('#cargosModal');
    const carreras = {};
    const materias = {};

    // Cargar facultades, carreras y materias
    function cargarDatos() {
        $.getJSON('facultades.json', function(data) {
            data.facultades.forEach(function(facultad) {
                $('#facultad').append(`<option value="${facultad.codigo}">${facultad.nombre}</option>`);
            });
        });

        $.getJSON('carreras.json', function(data) {
            data.carreras.forEach(function(carrera) {
                if (!carreras[carrera.facultad]) {
                    carreras[carrera.facultad] = [];
                }
                carreras[carrera.facultad].push(carrera.nombre);
            });
        });

        $.getJSON('materias.json', function(data) {
            data.materias.forEach(function(materia) {
                if (!materias[materia.carrera]) {
                    materias[materia.carrera] = [];
                }
                materias[materia.carrera].push({ numero: materia.numero, nombre: materia.nombre });
            });
        });
    }

    // Cargar cargos desde datos.json
    function cargarCargos() {
        $.getJSON('datos.json', function(data) {
            table.clear().draw(); // Limpiar tabla antes de agregar nuevos datos
            data.cargos.forEach(function(cargo) {
                table.row.add([
                    cargo.categoria,
                    cargo.materia,
                    cargo.carrera,
                    cargo.facultad,
                    cargo.dedicacion,
                    cargo.condicion,
                    cargo.numeroExpediente,
                    cargo.estado
                ]).draw(false);
            });
        });
    }

    cargarDatos(); // Cargar datos al inicio
    cargarCargos(); // Cargar cargos al inicio
    $('#cargosContainer').show(); // Mostrar el contenedor de cargos

    // Manejar los botones de navegación
    $('#cargosBtn').click(function() {
        $('#content').hide();
        $('#cargosContainer').show();
    });

    $('#inicioBtn').click(function() {
        $('#cargosContainer').hide();
        $('#content').show();
    });

    // Mostrar modal para agregar un nuevo cargo
    $('#agregarBtn').click(function() {
        modal.show();
    });

    // Cerrar el modal
    $('.close, #cancelarBtn').click(function() {
        modal.hide();
        $('#cargosForm')[0].reset(); // Resetear el formulario
        $('#carrera, #materia').empty().prop('disabled', true); // Reiniciar opciones
    });

    // Manejar selección de facultad
    $('#facultad').change(function() {
        const facultadSeleccionada = $(this).val();
        $('#carrera').empty().append('<option value="">Seleccione una carrera</option>').prop('disabled', true);
        $('#materia').empty().append('<option value="">Seleccione una materia</option>').prop('disabled', true);

        if (facultadSeleccionada) {
            carreras[facultadSeleccionada].forEach(function(carrera) {
                $('#carrera').append(`<option value="${carrera}">${carrera}</option>`);
            });
            $('#carrera').prop('disabled', false);
        }
    });

    // Manejar selección de carrera
    $('#carrera').change(function() {
        const carreraSeleccionada = $(this).val();
        $('#materia').empty().append('<option value="">Seleccione una materia</option>').prop('disabled', true);

        if (carreraSeleccionada) {
            materias[carreraSeleccionada].forEach(function(materia) {
                $('#materia').append(`<option value="${materia.numero}">${materia.nombre}</option>`);
            });
            $('#materia').prop('disabled', false);
        }
    });

    // Manejar el envío del formulario
    $('#cargosForm').on('submit', function(e) {
        e.preventDefault();
        $('#guardarBtn').prop('disabled', true); // Desactivar botón durante la carga

        const newCargo = {
            categoria: $('#categoria').val(),
            materia: $('#materia').val(),
            numeroExpediente: $('#numeroExpediente').val(),
            carrera: $('#carrera').val(),
            facultad: $('#facultad').val(),
            dedicacion: $('#dedicacion').val(),
            condicion: $('#condicion').val(),
            estado: $('#estado').val()
        };

        $.ajax({
            url: 'guardar_cargos.php',
            type: 'POST',
            data: JSON.stringify(newCargo),
            contentType: 'application/json',
            success: function(response) {
                const result = JSON.parse(response);
                alert(result.message);
                if (result.success) {
                    modal.hide();
                    cargarCargos(); // Recargar la tabla
                }
            },
            error: function() {
                alert('Error al agregar el cargo.');
            },
            complete: function() {
                $('#guardarBtn').prop('disabled', false); // Reactivar botón al completar
            }
        });
    });

    // Función para exportar a PDF
 // Función para exportar a PDF usando html2pdf.js
// Función para exportar a PDF usando html2pdf.js
// Función para exportar a PDF usando html2pdf.js
$('#exportPdfBtn').click(function() {
    const element = document.getElementById('cargosTable');

    // Opciones para html2pdf
    const options = {
        margin:       0.5, // Ajusta los márgenes
        filename:     'cargos.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, logging: true }, // Aumenta la escala para mejor calidad
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' } // Cambia a 'landscape' para horizontal
    };

    // Generar PDF
    html2pdf().from(element).set(options).save();
});



    // Función para exportar a XLS
    $('#exportXlsBtn').click(function() {
        let table = document.getElementById("cargosTable");
        let wb = XLSX.utils.table_to_book(table, { sheet: "Cargos" });
        XLSX.writeFile(wb, "cargos.xlsx");
    });

    // Función para exportar a CSV
    $('#exportCsvBtn').click(function() {
        const rows = [];
        $('#cargosTable tbody tr').each(function() {
            const cols = $(this).find('td').map(function() {
                return $(this).text();
            }).get();
            rows.push(cols);
        });

        const csvContent = "data:text/csv;charset=utf-8," 
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "cargos.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
