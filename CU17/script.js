document.getElementById('convocatoriaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const numeroConvocatoria = document.getElementById('numeroConvocatoria').value;
    const cargo = document.getElementById('cargo').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaCierre = document.getElementById('fechaCierre').value;
    const documentacion = document.getElementById('documentacion').value;
    const docentes = Array.from(document.getElementById('docentes').selectedOptions).map(option => option.value);

    // Validar que se seleccionen 5 docentes
    if (docentes.length !== 5) {
        alert('Por favor, seleccione exactamente 5 docentes.');
        return;
    }

    // Simulación de guardar en el sistema
    console.log('Convocatoria Guardada:', {
        numeroConvocatoria,
        cargo,
        fechaInicio,
        fechaCierre,
        documentacion,
        docentes
    });

    document.getElementById('message').innerText = 'Convocatoria guardada exitosamente.';
    this.reset(); // Limpiar el formulario
});
