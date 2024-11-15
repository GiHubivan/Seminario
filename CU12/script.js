// Cargar datos desde el archivo JSON
fetch('datos.json')
    .then(response => response.json())
    .then(data => {
        // Inicializar DataTables
        const table = $('#cargo-table').DataTable();

        // Vaciar la tabla antes de llenarla
        table.clear();

        // Cargar los datos en la tabla
        data.cargos.forEach(cargo => {
            const rowData = [
                cargo.nombre,
                cargo.descripcion,
                cargo.categoria,
                cargo.condicion,
                cargo.dedicacion,
                cargo.materia,
                cargo.facultad,
                cargo.estado,
                cargo.numeroResolucion,
                cargo.expediente,
                `<button onclick="liberarCargo('${cargo.id}')">Liberar</button>`
            ];
            // Agregar la fila a DataTables
            table.row.add(rowData);
        });

        // Dibujar la tabla con los nuevos datos
        table.draw();
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
        alert('Ocurrió un error al cargar los datos. Intente nuevamente más tarde.');
    });

// Función para liberar un cargo
function liberarCargo(cargoId) {
    const confirmar = confirm(`¿Está seguro de que desea liberar el cargo ${cargoId}?`);
    if (confirmar) {
        const table = $('#cargo-table').DataTable();
        // Encontrar la fila correspondiente y eliminarla
        table.rows(function(idx, data, node) {
            return data[0] === cargoId; // Aquí se puede personalizar según el ID o el nombre
        }).remove().draw(); // Eliminar la fila y redibujar la tabla
        alert(`El cargo ${cargoId} ha sido liberado.`);
    }
}
