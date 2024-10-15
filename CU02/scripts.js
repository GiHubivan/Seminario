document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const sectionId = link.getAttribute('data-section');

            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Show the selected section
            document.getElementById(sectionId).style.display = 'block';
        });
    });

    // Show the default section
    document.querySelector('.nav-link.active').click();
});
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page');
    const form = document.getElementById('registrationForm');
    const mensaje = document.getElementById('mensaje');
    
    // Show the appropriate section when a menu item is clicked
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const sectionId = link.getAttribute('data-section');

            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Show the selected section
            document.getElementById(sectionId).style.display = 'block';
        });
    });

    // Validate form inputs before submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission to validate inputs
        
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const dni = document.getElementById('dni').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const direccion = document.getElementById('direccion').value;
        const usuario = document.getElementById('usuario').value;
        const contrasena = document.getElementById('contrasena').value;
        const confirmarContrasena = document.getElementById('confirmarContrasena').value;
        const terminos = document.getElementById('terminos').checked;
        
        // Clear previous messages
        mensaje.textContent = '';
        let valid = true;

        // Validate Nombre and Apellido (only letters and accents)
        const namePattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+$/;
        if (!namePattern.test(nombre) || !namePattern.test(apellido)) {
            mensaje.textContent += 'Nombre y apellido solo deben contener letras y caracteres acentuados.\n';
            valid = false;
        }

        // Validate DNI (only numbers)
        if (!/^\d+$/.test(dni)) {
            mensaje.textContent += 'DNI solo debe contener números.\n';
            valid = false;
        }

        // Validate Teléfono (standard phone number pattern)
        const phonePattern = /^\+?\d{10,15}$/; // Adjust pattern as needed
        if (!phonePattern.test(telefono)) {
            mensaje.textContent += 'Teléfono debe ser un número válido (10 a 15 dígitos).\n';
            valid = false;
        }

        // Validate Contraseña and Confirmación
        if (contrasena !== confirmarContrasena) {
            mensaje.textContent += 'La contraseña y su confirmación no coinciden.\n';
            valid = false;
        }

        // Validate checkbox
        if (!terminos) {
            mensaje.textContent += 'Debe aceptar los términos y condiciones.\n';
            valid = false;
        }

        if (valid) {
            mensaje.textContent = 'Registro exitoso!';
            // Proceed with form submission or further actions
        }
    });

    // Show the default section (Inicio) on page load
    document.querySelector('.nav-link[data-section="inicio"]').click();
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const form = document.getElementById('registrationForm');
    const mensaje = document.getElementById('mensaje');
    const cancelarBtn = document.getElementById('cancelar');

    // Función para mostrar una sección y ocultar las demás
    function showSection(sectionId) {
        pages.forEach(page => {
            if (page.id === sectionId) {
                page.style.display = 'block';
            } else {
                page.style.display = 'none';
            }
        });
    }

    // Manejar clic en enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Verificar que las contraseñas coincidan
        const password = document.getElementById('contrasena').value;
        const confirmPassword = document.getElementById('confirmarContrasena').value;

        if (password !== confirmPassword) {
            mensaje.textContent = 'Las contraseñas no coinciden';
            mensaje.style.color = 'red';
            return;
        }

        // Crear un objeto con los datos del formulario
        const formData = new FormData(form);

        // Enviar los datos del formulario al servidor usando Fetch API
        fetch('agregar_usuario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mensaje.textContent = data.message;
                mensaje.style.color = 'green';
                form.reset(); // Limpiar el formulario
            } else {
                mensaje.textContent = data.message;
                mensaje.style.color = 'red';
            }
        })
        .catch(error => {
            mensaje.textContent = 'Error al enviar los datos';
            mensaje.style.color = 'red';
            console.error('Error:', error);
        });
    });

    // Manejar el botón cancelar
    cancelarBtn.addEventListener('click', () => {
        form.reset();
        showSection('inicio'); // Regresar a la página de inicio
    });
});


/*Cambio de Secciones: El script JavaScript maneja el clic en los enlaces de navegación y muestra la sección correspondiente mientras oculta las demás. Utiliza el atributo data-section en los enlaces para identificar qué sección debe mostrarse.

Validación de Contraseña: Antes de enviar el formulario, verifica si las contraseñas coinciden. Si no es así, muestra un mensaje de error. Si coinciden, muestra un mensaje de éxito y resetea el formulario.

Cancelar: El botón "Cancelar" resetea el formulario y regresa a la página de inicio.*/