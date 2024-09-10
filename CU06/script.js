// URL del archivo JSON
const convocatoriasUrl = 'convocatorias.json';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inicio').addEventListener('click', () => {
        document.getElementById('main-content').innerHTML = '<h2>Bienvenido</h2><p>Selecciona una opción del menú para continuar.</p>';
    });

    document.getElementById('convocatorias').addEventListener('click', () => {
        fetchConvocatorias();
    });

    document.getElementById('historial').addEventListener('click', () => {
        fetchHistorial();
    });
});

function fetchConvocatorias() {
    fetch(convocatoriasUrl)
        .then(response => response.json())
        .then(data => {
            let html = '<h2>Convocatorias</h2><table id="convocatorias-table" class="display"><thead><tr><th>Título</th><th>Fecha de Inicio</th><th>Fecha de Fin</th><th>Estado</th><th>Acción</th></tr></thead><tbody>';
            
            data.forEach(convocatoria => {
                html += `<tr>
                    <td>${convocatoria.title}</td>
                    <td>${convocatoria.startDate}</td>
                    <td>${convocatoria.endDate}</td>
                    <td>${convocatoria.status}</td>
                    <td><button onclick="showDetails(${convocatoria.id})">Ver Detalles</button></td>
                </tr>`;
            });
            
            html += '</tbody></table>';
            document.getElementById('main-content').innerHTML = html;
            $('#convocatorias-table').DataTable();
        });
}

function fetchHistorial() {
    fetch(convocatoriasUrl)
        .then(response => response.json())
        .then(data => {
            const inscritoConvocatorias = data.filter(c => c.registered);
            
            let html = '<h2>Historial de Convocatorias</h2><table id="historial-table" class="display"><thead><tr><th>Título</th><th>Fecha de Inicio</th><th>Fecha de Fin</th><th>Estado</th><th>Acción</th></tr></thead><tbody>';
            
            inscritoConvocatorias.forEach(convocatoria => {
                html += `<tr>
                    <td>${convocatoria.title}</td>
                    <td>${convocatoria.startDate}</td>
                    <td>${convocatoria.endDate}</td>
                    <td>${convocatoria.status}</td>
                    <td><button onclick="showDetails(${convocatoria.id})">Ver Detalles</button></td>
                </tr>`;
            });
            
            html += '</tbody></table>';
            document.getElementById('main-content').innerHTML = html;
            $('#historial-table').DataTable();
        });
}

function showDetails(id) {
    fetch(convocatoriasUrl)
        .then(response => response.json())
        .then(data => {
            const convocatoria = data.find(c => c.id === id);
            if (!convocatoria) return;

            let html = `<h2>${convocatoria.title}</h2>
                <p><strong>Descripción:</strong> ${convocatoria.description}</p>
                <p><strong>Fecha de Inicio:</strong> ${convocatoria.startDate}</p>
                <p><strong>Fecha de Fin:</strong> ${convocatoria.endDate}</p>
                <p><strong>Estado:</strong> ${convocatoria.status}</p>`;

            if (convocatoria.registered) {
                if (convocatoria.status === "Abierta") {
                    html += `<button onclick="cancelRegistration(${id})">Cancelar Inscripción</button>`;
                } else {
                    html += '<p class="alert">La convocatoria está cerrada. No se puede modificar la inscripción.</p>';
                }
            } else {
                html += '<p>No estás inscrito en esta convocatoria.</p>';
            }

            document.getElementById('main-content').innerHTML = html;
        });
}

function cancelRegistration(id) {
    fetch(convocatoriasUrl)
        .then(response => response.json())
        .then(data => {
            const convocatoria = data.find(c => c.id === id);
            if (convocatoria) {
                convocatoria.registered = false;
                alert('Inscripción cancelada exitosamente.');
                fetchHistorial();
            }
        });
}
