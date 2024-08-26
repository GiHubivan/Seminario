document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const homeSection = document.getElementById('homeSection');
    const registrationSection = document.getElementById('registrationSection');
    const messageDiv = document.getElementById('message');

    // Manejo del clic en los enlaces del menú
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const page = event.target.getAttribute('data-page');
            showPage(page);
        });
    });

    // Función para mostrar una página específica
    function showPage(page) {
        if (page === 'home') {
            homeSection.style.display = 'block';
            registrationSection.style.display = 'none';
        } else if (page === 'register') {
            homeSection.style.display = 'none';
            registrationSection.style.display = 'block';
        }
    }

    // Mostrar la página de inicio por defecto
    showPage('home');

    // Validación y manejo del formulario de registro
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Validar el formulario
        if (!validateForm()) {
            return; // Detener si hay errores
        }

        // Verificar la unicidad del nombre de usuario
        if (isUsernameUnique(document.getElementById('username').value)) {
            // Aquí se debe agregar la lógica para guardar los datos en el servidor
            // Simulación de un registro exitoso
            showMessage('Registro exitoso. ¡Bienvenido!', 'success');
            form.reset();
            setTimeout(() => {
                showPage('home'); // Regresar a la página de inicio después de 3 segundos
            }, 3000);
        } else {
            showMessage('El nombre de usuario ya está en uso. Por favor, elija otro.', 'error');
        }
    });

    // Función para validar los datos del formulario
    function validateForm() {
        let valid = true;
        const email = document.getElementById('email').value;
        const dni = document.getElementById('dni').value;

        if (!validateEmail(email)) {
            showMessage('El formato del correo electrónico es incorrecto.', 'error');
            valid = false;
        }

        if (!validateDNI(dni)) {
            showMessage('El formato del DNI es incorrecto. Debe tener entre 8 y 12 dígitos.', 'error');
            valid = false;
        }

        return valid;
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validateDNI(dni) {
        const dniPattern = /^\d{8,12}$/;
        return dniPattern.test(dni);
    }

    function isUsernameUnique(username) {
        // Simulación: siempre devuelve true para demostración
        // En una implementación real, esto debe verificar la unicidad del nombre de usuario en el backend
        return true;
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        if (type === 'success') {
            messageDiv.style.color = 'green';
        } else if (type === 'error') {
            messageDiv.style.color = 'red';
        }
    }
});
