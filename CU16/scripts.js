$(document).ready(function () {
  $('#tablaConvocatorias').DataTable({
    language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
        },
    ajax: {
      url: 'convocatorias.json',
      dataSrc: 'data'
    },
    columns: [
      { data: 'Cargo' },
      { data: 'Categoria' },
      { data: 'Denominación' },
      { data: 'Grupo' },
      { data: 'resolución' },
      {
        data: null,
        render: function (data, type, row, meta) {
          return `<a href="detalle.html?index=${meta.row}" class="btn-detalle">Ver detalle</a>`;
        }
      }
    ]
  });
});

// Mostrar el formulario
document.getElementById('btn-nueva-convocatoria').addEventListener('click', () => {
  document.getElementById('formulario-modal').style.display = 'flex';
});

// Ocultar el formulario
document.getElementById('btn-cerrar-form').addEventListener('click', () => {
  document.getElementById('formulario-modal').style.display = 'none';
});

// Manejar envío del formulario
document.getElementById('formConvocatoria').addEventListener('submit', function (e) {
  e.preventDefault();

  const nueva = {
    Alcance: document.getElementById('alcance').value,
    Expediente: document.getElementById('expediente').value,
    "Fecha Inicio": document.getElementById('fechaInicio').value,
    "Fecha Fin": document.getElementById('fechaFin').value,
    categoria: document.getElementById('categoria').value,
    Denominación: document.getElementById('denominacion').value,
    grupo: document.getElementById('grupo').value,
    pdf: document.getElementById('pdf').value,
    resolución: document.getElementById('resolucion').value,
    Dependencia: "Sin definir",
    Estado: "Activa",
    Cargo: document.getElementById('alcance').value
  };

  fetch('guardar.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nueva)
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Convocatoria guardada correctamente');
        document.getElementById('formConvocatoria').reset();
        document.getElementById('formulario-modal').style.display = 'none';
        location.reload(); // Recarga para actualizar DataTable
      } else {
        alert('Error al guardar');
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Error en la petición');
    });
});
