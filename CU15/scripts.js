document.addEventListener('DOMContentLoaded', () => {
    const loginView = document.getElementById('loginView');
    const verificationView = document.getElementById('verificationView');
    const recoveryView = document.getElementById('recoveryView');
    const userNameSpan = document.getElementById('userName');
    const userNameHeader = document.getElementById('userNameHeader');

    const loginForm = document.getElementById('loginForm');
    const recoverAccountBtn = document.getElementById('recoverAccountBtn');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const verifyCodeBtn = document.getElementById('verifyCodeBtn');
    const resendCodeBtn = document.getElementById('resendCodeBtn');
    const recoveryForm = document.getElementById('recoveryForm');
    const logoutBtn = document.getElementById('logoutBtn');

    const verificationChannel = document.getElementById('verificationChannel');
    const otpInput = document.getElementById('otp');
    const verificationInput = document.getElementById('verificationInput');
    const loginError = document.getElementById('loginError');
    const verificationError = document.getElementById('verificationError');
    const recoveryMessage = document.getElementById('recoveryMessage');

    // Mostrar nombre de usuario en la página principal
    if (userNameHeader) {
        const userName = localStorage.getItem('userName');
        if (userName) {
            userNameHeader.textContent = userName;
        }
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        // Simular autenticación
        authenticateUser(username).then(authenticated => {
            if (authenticated) {
                localStorage.setItem('userName', username); // Guardar nombre del usuario
                loginView.classList.remove('active');
                verificationView.classList.add('active');
            } else {
                loginError.classList.remove('hidden');
            }
        });
    });

    recoverAccountBtn.addEventListener('click', () => {
        loginView.classList.remove('active');
        recoveryView.classList.add('active');
    });

    recoveryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Simular recuperación de cuenta
        handleAccountRecovery().then(recoverySuccessful => {
            if (recoverySuccessful) {
                recoveryMessage.classList.remove('hidden');
            }
        });
    });

    sendCodeBtn.addEventListener('click', () => {
        const channel = verificationChannel.value;
        // Simular envío de código OTP
        sendOTP(channel).then(codeSent => {
            if (codeSent) {
                verificationInput.classList.remove('hidden');
                resendCodeBtn.classList.remove('hidden');
            }
        });
    });

    verifyCodeBtn.addEventListener('click', () => {
        const otp = otpInput.value;
        // Simular verificación de código OTP
        verifyOTP(otp).then(codeValid => {
            if (codeValid) {
                window.location.href = 'dashboard.html'; // Redirige a la página principal
            } else {
                verificationError.classList.remove('hidden');
            }
        });
    });

    resendCodeBtn.addEventListener('click', () => {
        const channel = verificationChannel.value;
        // Simular reenvío de OTP
        resendOTP(channel);
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('userName'); // Eliminar nombre del usuario
            window.location.href = 'index.html'; // Redirige a la página de inicio de sesión
        });
    }

    // Funciones simuladas
    function authenticateUser(username) {
        return new Promise((resolve) => setTimeout(() => resolve(true), 1000)); // Simula autenticación exitosa
    }

    function handleAccountRecovery() {
        return new Promise((resolve) => setTimeout(() => resolve(true), 1000)); // Simula recuperación exitosa
    }

    function sendOTP(channel) {
        return new Promise((resolve) => setTimeout(() => resolve(true), 1000)); // Simula envío de OTP
    }

    function verifyOTP(otp) {
        return new Promise((resolve) => setTimeout(() => resolve(true), 1000)); // Simula verificación de OTP
    }

    function resendOTP(channel) {
        // Simular reenvío de OTP
        alert('Código OTP reenviado.');
    }
});
