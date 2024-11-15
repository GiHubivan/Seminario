document.addEventListener('DOMContentLoaded', () => {
    const designacionesTable = document.getElementById('designacionesTable').getElementsByTagName('tbody')[0];
    const agregarBtn = document.getElementById('agregarBtn');
    const nuevaDesignacion = document.getElementById('nuevaDesignacion');
    const designacionForm = document.getElementById('designacionForm');
    const cancelarBtn = document.getElementById('cancelarBtn');
    const convocatoriasList = document.getElementById('convocatoriasList');

    // Cargar convocatorias
    fetch('convocatorias.json')
        .then(response => response.json())
        .then(data => {
            data.convocatorias.forEach(convocatoria => {
                const li = document.createElement('li');
                li.textContent = `${convocatoria.cargo} - Cierre: ${convocatoria.cierre}`;
                li.addEventListener('click', () => {
                    alert(`Aspirantes inscriptos: ${convocatoria.aspirantes.join(', ')}`);
                });
                convocatoriasList.appendChild(li);
            });
        });

    // Mostrar formulario de nueva designación
    agregarBtn.addEventListener('click', () => {
        nuevaDesignacion.style.display = 'block';
    });

    // Cancelar formulario
    cancelarBtn.addEventListener('click', () => {
        nuevaDesignacion.style.display = 'none';
    });

    // Guardar nueva designación
    designacionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newRow = designacionesTable.insertRow();
        newRow.insertCell(0).textContent = document.getElementById('expediente').value;
        newRow.insertCell(1).textContent = document.getElementById('cargo').value;
        newRow.insertCell(2).textContent = document.getElementById('dni').value;
        newRow.insertCell(3).textContent = document.getElementById('nombre').value;
        newRow.insertCell(4).textContent = document.getElementById('resolucion').value;

        designacionForm.reset();
        nuevaDesignacion.style.display = 'none';
    });
});
$(document).ready(function() {
    $.getJSON("designaciones.json", function(data) {
        let designaciones = data.designaciones;
        let tableBody = $("#designacionesTable tbody");

        designaciones.forEach(function(designacion) {
            let row = `<tr>
                <td>${designacion.cargo}</td>
                <td>${designacion.materia}</td>
                <td>${designacion.carrera}</td>
                <td>${designacion.facultad}</td>
                <td>${designacion.fecha}</td>
                <td>${designacion.nombre_docente}</td>
                <td>${designacion.dni}</td>
                <td>${designacion.numero_resolucion}</td>
            </tr>`;
            tableBody.append(row);
        });

        $('#designacionesTable').DataTable();
    });
});
