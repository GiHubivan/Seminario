document.addEventListener("DOMContentLoaded", function() {

    // Mostrar pantalla principal
    function showPantallaPrincipal() {
        document.getElementById('pantalla-principal').style.display = 'block';
        document.getElementById('pantalla-detalle').style.display = 'none';
        document.getElementById('pantalla-nuevo-registro').style.display = 'none';
        document.getElementById('pantalla-confirmacion').style.display = 'none';
    }

    // Mostrar pantalla de Detalles
    function showPantallaDetalle() {
        document.getElementById('pantalla-principal').style.display = 'none';
        document.getElementById('pantalla-detalle').style.display = 'block';
        document.getElementById('pantalla-nuevo-registro').style.display = 'none';
        document.getElementById('pantalla-confirmacion').style.display = 'none';
    }

    // Mostrar pantalla de Nuevo Registro
    function showPantallaNuevoRegistro() {
        document.getElementById('pantalla-principal').style.display = 'none';
        document.getElementById('pantalla-detalle').style.display = 'none';
        document.getElementById('pantalla-nuevo-registro').style.display = 'block';
        document.getElementById('pantalla-confirmacion').style.display = 'none';
    }

    // Mostrar pantalla de Confirmación (éxito)
    function showPantallaConfirmacion() {
        document.getElementById('pantalla-principal').style.display = 'none';
        document.getElementById('pantalla-detalle').style.display = 'none';
        document.getElementById('pantalla-nuevo-registro').style.display = 'none';
        document.getElementById('pantalla-confirmacion').style.display = 'block';
    }

    // Función para simular la validación y registro de la toma de posesión
    function registrarTomaDePosesion(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        // Validación de campos
        const expediente = document.getElementById('expediente').value;
        const fechaToma = document.getElementById('fechaToma').value;
        const resolucion = document.getElementById('resolucion').value;
        const candidato = document.getElementById('candidato').value;

        if (!expediente || !fechaToma || !resolucion || !candidato) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        // Simular el registro de los datos (en una implementación real, aquí iría la lógica de backend)
        console.log("Toma de posesión registrada:", expediente, fechaToma, resolucion, candidato);

        // Después de registrar, mostrar la pantalla de confirmación
        showPantallaConfirmacion();
    }

    // Función para liberar el cargo y regresar a la pantalla principal
    function liberarCargo() {
        alert("Cargo liberado.");
        showPantallaPrincipal();
    }

    // Función para volver a la pantalla principal desde la confirmación
    function volverALaLista() {
        showPantallaPrincipal();
    }

    // Configurar los manejadores de eventos
    document.getElementById('ver-detalle').addEventListener('click', showPantallaDetalle);
    document.getElementById('registrar-nueva-toma').addEventListener('click', showPantallaNuevoRegistro);
    document.getElementById('registrar-form').addEventListener('submit', registrarTomaDePosesion);
    document.getElementById('liberar-cargo').addEventListener('click', liberarCargo);
    document.getElementById('volver-lista').addEventListener('click', volverALaLista);

    // Mostrar la pantalla principal al cargar
    showPantallaPrincipal();
});
