// script.js

// Datos simulados para las convocatorias
const convocatoriasData = [
    {
        id: 1,
        fechaInicio: '2025-06-01',
        fechaCierre: '2025-06-15',
        categoria: 'Tecnología',
        denominacion: 'Convocatoria de Innovación',
        agrupamiento: 'Grupo A',
        dependencia: 'Ministerio de Ciencia',
        apertura: '2025-05-01',
        alcance: 'Nacional',
        resolucion: '123/2025',
        estado: 'Abierta',
    },
    {
        id: 2,
        fechaInicio: '2025-07-01',
        fechaCierre: '2025-07-15',
        categoria: 'Educación',
        denominacion: 'Convocatoria de Becas',
        agrupamiento: 'Grupo B',
        dependencia: 'Ministerio de Educación',
        apertura: '2025-06-01',
        alcance: 'Internacional',
        resolucion: '456/2025',
        estado: 'Abierta',
    }
];

// Elementos del DOM
const consultarBtn = document.getElementById('consultarBtn');
const convocatoriasDiv = document.getElementById('convocatorias');
const messageDiv = document.getElementById('message');

// Función para mostrar convocatorias
function mostrarConvocatorias(convocatorias) {
    convocatoriasDiv.innerHTML = '';  // Limpiar el área de convocatorias

    if (convocatorias.length === 0) {
        messageDiv.style.display = 'block';
        messageDiv.innerText = 'No hay convocatorias disponibles';
        convocatoriasDiv.style.display = 'none';
    } else {
        messageDiv.style.display = 'none';
        convocatoriasDiv.style.display = 'block';

        convocatorias.forEach(convocatoria => {
            const convocatoriaDiv = document.createElement('div');
            convocatoriaDiv.classList.add('convocatoria');

            convocatoriaDiv.innerHTML = `
                <h3>${convocatoria.denominacion}</h3>
                <p><strong>Fecha Inicio:</strong> ${convocatoria.fechaInicio}</p>
                <p><strong>Fecha Cierre:</strong> ${convocatoria.fechaCierre}</p>
                <p><strong>Categoría:</strong> ${convocatoria.categoria}</p>
                <p><strong>Estado:</strong> ${convocatoria.estado}</p>
            `;

            convocatoriasDiv.appendChild(convocatoriaDiv);
        });
    }
}

// Función que simula el proceso de consulta
function consultarConvocatorias() {
    // Simulamos una pequeña demora para hacer más realista la consulta
    setTimeout(() => {
        // Aquí podríamos integrar una llamada a una API, pero por ahora usamos datos simulados
        mostrarConvocatorias(convocatoriasData);
    }, 1000);
}

// Agregar el evento al botón de consulta
consultarBtn.addEventListener('click', consultarConvocatorias);
