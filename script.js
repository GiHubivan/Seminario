document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.getElementById('homeBtn');
    const consultarConvocatoriasBtn = document.getElementById('consultarConvocatoriasBtn');
    const homeSection = document.getElementById('homeSection');
    const convocatoriasSection = document.getElementById('convocatoriasSection');
    const callsTable = document.getElementById('callsTable');
    const callsList = document.getElementById('callsList');
    const noCallsContainer = document.getElementById('noCallsContainer');
    const filters = {
        date: document.getElementById('dateFilter'),
        subject: document.getElementById('subjectFilter'),
        type: document.getElementById('typeFilter')
    };
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');

    // Simulación de convocatorias
    const convocatorias = [
        { date: '2024-08-30', subject: 'Matemáticas', type: 'Adjunto' },
        { date: '2024-09-05', subject: 'Programación', type: 'JTP' }
    ];

    function renderConvocatorias(data) {
        callsList.innerHTML = '';
        if (data.length === 0) {
            noCallsContainer.classList.remove('hidden');
            callsTable.classList.add('hidden');
        } else {
            noCallsContainer.classList.add('hidden');
            callsTable.classList.remove('hidden');
            data.forEach(convocatoria => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${convocatoria.date}</td>
                    <td>${convocatoria.subject}</td>
                    <td>${convocatoria.type}</td>
                `;
                callsList.appendChild(tr);
            });
        }
    }

    function filterConvocatorias() {
        const filtered = convocatorias.filter(conv => {
            return (!filters.date.value || conv.date === filters.date.value) &&
                   (!filters.subject.value || conv.subject.toLowerCase().includes(filters.subject.value.toLowerCase())) &&
                   (!filters.type.value || conv.type === filters.type.value);
        });
        renderConvocatorias(filtered);
    }

    homeBtn.addEventListener('click', () => {
        homeSection.classList.remove('hidden');
        convocatoriasSection.classList.add('hidden');
    });

    consultarConvocatoriasBtn.addEventListener('click', () => {
        homeSection.classList.add('hidden');
        convocatoriasSection.classList.remove('hidden');
        filterConvocatorias();  // Muestra las convocatorias iniciales
    });

    applyFiltersBtn.addEventListener('click', () => {
        filterConvocatorias();
    });
});
