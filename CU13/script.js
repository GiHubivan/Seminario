const prorrrogas = [];

function showContent(contentId) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(contentId).classList.remove('hidden');
}

function newProrroga() {
    showContent('formularioProrroga');
    document.getElementById('mensaje').classList.add('hidden');
    clearForm();
}

function clearForm() {
    document.getElementById('numeroExpediente').value = '';
    document.getElementById('cargo').value = '';
    document.getElementById('materia').value = '';
    document.getElementById('carrera').value = '';
    document.getElementById('resolucion').value = '';
    document.getElementById('fechaProrroga').value = '';
    document.getElementById('finProrroga').value = '';
    document.getElementById('estado').value = 'activa';
}

function autocompletar() {
    const expediente = document.getElementById('numeroExpediente').value;
    // Simulación de autocompletado (en un caso real, se haría una consulta a un backend)
    const datos = {
        '12345': { cargo: 'Profesor', materia: 'Matemáticas', carrera: 'Ingeniería' },
        '67890': { cargo: 'Asistente', materia: 'Física', carrera: 'Ciencias' }
    };
    
    if (datos[expediente]) {
        document.getElementById('cargo').value = datos[expediente].cargo;
        document.getElementById('materia').value = datos[expediente].materia;
        document.getElementById('carrera').value = datos[expediente].carrera;
    } else {
        document.getElementById('cargo').value = '';
        document.getElementById('materia').value = '';
        document.getElementById('carrera').value = '';
    }
}

function guardarProrroga() {
    const numeroExpediente = document.getElementById('numeroExpediente').value;
    const resolucion = document.getElementById('resolucion').value;
    const fechaProrroga = document.getElementById('fechaProrroga').value;
    const finProrroga = document.getElementById('finProrroga').value;
    const estado = document.getElementById('estado').value;

    // Simulación de guardar la prórroga
    prorrrogas.push({
        numeroExpediente,
        resolucion,
        fechaProrroga,
        finProrroga,
        estado
    });

    document.getElementById('mensaje').innerText = 'Prórroga guardada con éxito.';
    document.getElementById('mensaje').classList.remove('hidden');
    document.getElementById('mensaje').style.color = 'green';
    refreshListado();
    showContent('prorrogas');
}

function refreshListado() {
    const listado = document.getElementById('listadoProrrogas');
    listado.innerHTML = '';

    prorrrogas.forEach(prorroga => {
        const div = document.createElement('div');
        div.textContent = `Expediente: ${prorroga.numeroExpediente}, Resolución: ${prorroga.resolucion}, Fecha de Prórroga: ${prorroga.fechaProrroga}, Estado: ${prorroga.estado}`;
        listado.appendChild(div);
    });
}

function cancelarProrroga() {
    showContent('prorrogas');
    document.getElementById('mensaje').classList.add('hidden');
}
