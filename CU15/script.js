$(document).ready(function() {
    const table = $('#pedidosTable').DataTable();
    const modal = $('#pedidoModal');

    function cargarPedidos() {
        $.getJSON('datos.json', function(data) {
            table.clear().draw(); // Limpiar tabla antes de agregar nuevos datos
            data.pedidos.forEach(function(pedido) {
                // Crear enlace al archivo PDF
                const archivoEnlace = `<a href="archivos/${pedido.archivoPDF}" target="_blank">${pedido.archivoPDF}</a>`;
                table.row.add([
                    pedido.numeroNota,
                    pedido.numeroExpediente,
                    pedido.causante,
                    pedido.personaAutoriza,
                    archivoEnlace, // Mostrar enlace en la columna de Archivo PDF
                    pedido.fecha
                ]).draw(false);
            });
        });
    }

    cargarPedidos(); // Cargar pedidos al inicio
    $('#pedidosContainer').show(); // Mostrar el contenedor de pedidos

    // Manejar los botones de navegación
    $('#pedidosBtn').click(function() {
        $('#content').hide();
        $('#pedidosContainer').show();
    });

    $('#inicioBtn').click(function() {
        $('#pedidosContainer').hide();
        $('#content').show();
    });

    // Mostrar modal para agregar un nuevo pedido
    $('#agregarBtn').click(function() {
        modal.show();
    });

    // Cerrar el modal
    $('.close, #cancelarBtn').click(function() {
        modal.hide();
        $('#pedidoForm')[0].reset(); // Resetear el formulario
    });

    // Manejar el envío del formulario
    $('#pedidoForm').on('submit', function(e) {
        e.preventDefault();
        $('#guardarBtn').prop('disabled', true); // Desactivar botón durante la carga

        const formData = new FormData(this);

        $.ajax({
            url: 'guardar_pedidos.php', // Asegúrate de que este archivo sea correcto
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                const result = JSON.parse(response);
                alert(result.message);
                if (result.success) {
                    modal.hide();
                    cargarPedidos(); // Recargar la tabla
                }
            },
            error: function() {
                alert('Error al agregar el pedido.');
            },
            complete: function() {
                $('#guardarBtn').prop('disabled', false); // Reactivar botón al completar
            }
        });
    });
});
