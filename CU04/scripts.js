// Función para mostrar la página de títulos
function mostrarTitulos() {
    const titulos = [
        {
            nombre: "Profesor en Matemáticas",
            institucion: "Universidad de La Plata",
            anio: 2019,
            pdf: "path_to_pdf/titulo_matematicas.pdf",
            estado: "Pendiente"
        },
        // Otros títulos...
    ];

    let listHTML = titulos.map(titulo => `
        <div class="list-item" onclick="mostrarPopup('Nombre: ${titulo.nombre}', 'Institución: ${titulo.institucion}', 'Año: ${titulo.anio}', 'PDF: <a href="${titulo.pdf}" target="_blank">Ver PDF</a>', 'Estado: ${titulo.estado}')">
            ${titulo.nombre} - ${titulo.institucion} (${titulo.anio}) - ${titulo.estado}
        </div>
    `).join('');

    document.getElementById('content').innerHTML = `
        <h2>Títulos</h2>
        ${listHTML}
        <button class="add-button" onclick="mostrarFormulario('titulo')">Agregar Título</button>
    `;
}

// Función para mostrar la experiencia docente
function mostrarExperiencia() {
    const experiencias = [
        {
            anio: 2021,
            institucion: "Universidad Nacional de Salta",
            materia: "Programación I",
            descripcion: "Enseñanza de fundamentos de programación.",
            pdf: "path_to_pdf/experiencia_programacion.pdf",
            estado: "Pendiente"
        },
        // Otras experiencias...
    ];

    let listHTML = experiencias.map(exp => `
        <div class="list-item" onclick="mostrarPopup('Año: ${exp.anio}', 'Institución: ${exp.institucion}', 'Materia: ${exp.materia}', 'Descripción: ${exp.descripcion}', 'PDF: <a href="${exp.pdf}" target="_blank">Ver PDF</a>', 'Estado: ${exp.estado}')">
            ${exp.materia} - ${exp.institucion} (${exp.anio}) - ${exp.estado}
        </div>
    `).join('');

    document.getElementById('content').innerHTML = `
        <h2>Experiencia Docente</h2>
        ${listHTML}
        <button class="add-button" onclick="mostrarFormulario('experiencia')">Agregar Experiencia</button>
    `;
}

// Función para mostrar la investigación
function mostrarInvestigacion() {
    const investigaciones = [
        {
            anio: 2023,
            institucion: "Universidad Nacional de Salta",
            titulo: "Investigación en IA",
            descripcion: "Estudio sobre aplicaciones de IA en la educación.",
            pdf: "path_to_pdf/investigacion_ia.pdf",
            estado: "Pendiente"
        },
        // Otras investigaciones...
    ];

    let listHTML = investigaciones.map(inv => `
        <div class="list-item" onclick="mostrarPopup('Año: ${inv.anio}', 'Institución: ${inv.institucion}', 'Título: ${inv.titulo}', 'Descripción: ${inv.descripcion}', 'PDF: <a href="${inv.pdf}" target="_blank">Ver PDF</a>', 'Estado: ${inv.estado}')">
            ${inv.titulo} - ${inv.institucion} (${inv.anio}) - ${inv.estado}
        </div>
    `).join('');

    document.getElementById('content').innerHTML = `
        <h2>Investigación</h2>
        ${listHTML}
        <button class="add-button" onclick="mostrarFormulario('investigacion')">Agregar Investigación</button>
    `;
}

// Función para mostrar los cursos realizados
function mostrarCursosRealizados() {
    const cursos = [
        {
            anio: 2022,
            nombre: "Machine Learning",
            horas: "40 horas",
            pdf: "path_to_pdf/machine_learning.pdf",
            estado: "Pendiente"
        },
        // Otros cursos...
    ];

    let listHTML = cursos.map(curso => `
        <div class="list-item" onclick="mostrarPopup('Año: ${curso.anio}', 'Nombre del Curso: ${curso.nombre}', 'Horas: ${curso.horas}', 'PDF: <a href="${curso.pdf}" target="_blank">Ver PDF</a>', 'Estado: ${curso.estado}')">
            ${curso.nombre} - ${curso.anio} (${curso.horas}) - ${curso.estado}
        </div>
    `).join('');

    document.getElementById('content').innerHTML = `
        <h2>Cursos Realizados</h2>
        ${listHTML}
        <button class="add-button" onclick="mostrarFormulario('curso')">Agregar Curso</button>
    `;
}

// Función para mostrar el popup con la información
function mostrarPopup(...datos) {
    let contenido = datos.join('<br>');
    document.getElementById('popup-body').innerHTML = `<p>${contenido}</p>`;
    document.getElementById('popup').style.display = "block";
}

// Función para cerrar el popup
function cerrarPopup() {
    document.getElementById('popup').style.display = "none";
}

// Función para mostrar el formulario de adición
function mostrarFormulario(tipo) {
    let formularioHTML = '';
    if (tipo === 'titulo') {
        formularioHTML = `
            <h2>Agregar Título</h2>
            <form id="form-titulo" class="form-style">
                <label for="titulo-nombre">Nombre:</label>
                <input type="text" id="titulo-nombre" name="titulo-nombre" required><br>
                <label for="titulo-institucion">Institución:</label>
                <input type="text" id="titulo-institucion" name="titulo-institucion" required><br>
                <label for="titulo-anio">Año:</label>
                <input type="number" id="titulo-anio" name="titulo-anio" required><br>
                <label for="titulo-pdf">PDF:</label>
                <input type="file" id="titulo-pdf" name="titulo-pdf" required><br>
                <button type="button" class="submit-button" onclick="enviarFormulario('titulo')">Guardar</button>
            </form>
        `;
    } else if (tipo === 'experiencia') {
        formularioHTML = `
            <h2>Agregar Experiencia Docente</h2>
            <form id="form-experiencia" class="form-style">
                <label for="experiencia-anio">Año:</label>
                <input type="number" id="experiencia-anio" name="experiencia-anio" required><br>
                <label for="experiencia-institucion">Institución:</label>
                <input type="text" id="experiencia-institucion" name="experiencia-institucion" required><br>
                <label for="experiencia-materia">Materia:</label>
                <input type="text" id="experiencia-materia" name="experiencia-materia" required><br>
                <label for="experiencia-descripcion">Descripción:</label>
                <textarea id="experiencia-descripcion" name="experiencia-descripcion" required></textarea><br>
                <label for="experiencia-pdf">PDF:</label>
                <input type="file" id="experiencia-pdf" name="experiencia-pdf" required><br>
                <button type="button" class="submit-button" onclick="enviarFormulario('experiencia')">Guardar</button>
            </form>
        `;
    } else if (tipo === 'investigacion') {
        formularioHTML = `
            <h2>Agregar Investigación</h2>
            <form id="form-investigacion" class="form-style">
                <label for="investigacion-anio">Año:</label>
                <input type="number" id="investigacion-anio" name="investigacion-anio" required><br>
                <label for="investigacion-institucion">Institución:</label>
                <input type="text" id="investigacion-institucion" name="investigacion-institucion" required><br>
                <label for="investigacion-titulo">Título:</label>
                <input type="text" id="investigacion-titulo" name="investigacion-titulo" required><br>
                <label for="investigacion-descripcion">Descripción:</label>
                <textarea id="investigacion-descripcion" name="investigacion-descripcion" required></textarea><br>
                <label for="investigacion-pdf">PDF:</label>
                <input type="file" id="investigacion-pdf" name="investigacion-pdf" required><br>
                <button type="button" class="submit-button" onclick="enviarFormulario('investigacion')">Guardar</button>
            </form>
        `;
    } else if (tipo === 'curso') {
        formularioHTML = `
            <h2>Agregar Curso</h2>
            <form id="form-curso" class="form-style">
                <label for="curso-anio">Año:</label>
                <input type="number" id="curso-anio" name="curso-anio" required><br>
                <label for="curso-nombre">Nombre:</label>
                <input type="text" id="curso-nombre" name="curso-nombre" required><br>
                <label for="curso-horas">Horas:</label>
                <input type="text" id="curso-horas" name="curso-horas" required><br>
                <label for="curso-pdf">PDF:</label>
                <input type="file" id="curso-pdf" name="curso-pdf" required><br>
                <button type="button" class="submit-button" onclick="enviarFormulario('curso')">Guardar</button>
            </form>
        `;
    }

    document.getElementById('form-content').innerHTML = formularioHTML;
    document.getElementById('form-container').style.display = "flex";
}

// Función para enviar el formulario (simplificado)
function enviarFormulario(tipo) {
    alert(`Formulario de ${tipo} enviado correctamente.`);
    document.getElementById('form-container').style.display = "none";
    // Aquí deberías agregar el código para manejar el envío del formulario y actualizar los datos
}

// Función para cerrar el formulario
function cerrarFormulario() {
    document.getElementById('form-container').style.display = "none";
}
