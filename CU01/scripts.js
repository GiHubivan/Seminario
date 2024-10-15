document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.getElementById('homeBtn');
    const consultarConvocatoriasBtn = document.getElementById('consultarConvocatoriasBtn');
    const homeSection = document.getElementById('homeSection');
    const convocatoriasSection = document.getElementById('convocatoriasSection');
    const detailsSection = document.getElementById('detailsSection');
    const callsTable = document.getElementById('callsTable');
    const callsList = document.getElementById('callsList');
    const noCallsContainer = document.getElementById('noCallsContainer');
    const detailsContainer = document.getElementById('detailsContainer');
    const filters = {
        date: document.getElementById('dateFilter'),
        subject: document.getElementById('subjectFilter'),
        type: document.getElementById('typeFilter')
    };
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');

    // Simulación de convocatorias
    const convocatorias = [
        { id: 1, date: '2024-08-30', subject: 'Matemáticas', type: 'tipo1', requirements: 'Requisito 1', startDate: '2024-08-30', endDate: '2024-09-30', dedication: 'Exclusiva', drawDate: '2024-08-15', interviewDate: '2024-08-25' },
        { id: 2, date: '2024-09-05', subject: 'Historia', type: 'tipo2', requirements: 'Requisito 2', startDate: '2024-09-05', endDate: '2024-10-05', dedication: 'Simple', drawDate: '2024-09-10', interviewDate: '2024-09-20' }
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
                    <td><a href="#" data-id="${convocatoria.id}" class="view-details">Ver Detalles</a></td>
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

    function showDetails(id) {
        const convocatoria = convocatorias.find(conv => conv.id === id);
        if (convocatoria) {
            detailsContainer.innerHTML = `
                <p><strong>Requisitos:</strong> ${convocatoria.requirements}</p>
                <p><strong>Fecha de Inicio:</strong> ${convocatoria.startDate}</p>
                <p><strong>Fecha de Cierre:</strong> ${convocatoria.endDate}</p>
                <p><strong>Tipo de Cargo:</strong> ${convocatoria.type}</p>
                <p><strong>Dedicación:</strong> ${convocatoria.dedication}</p>
                <p><strong>Fecha de Sorteos de Temas:</strong> ${convocatoria.drawDate}</p>
                <p><strong>Fecha de Entrevista:</strong> ${convocatoria.interviewDate}</p>
            `;
            detailsSection.classList.remove('hidden');
            convocatoriasSection.classList.add('hidden');
        }
    }

    homeBtn.addEventListener('click', () => {
        homeSection.classList.remove('hidden');
        convocatoriasSection.classList.add('hidden');
        detailsSection.classList.add('hidden');
    });

    consultarConvocatoriasBtn.addEventListener('click', () => {
        homeSection.classList.add('hidden');
        convocatoriasSection.classList.remove('hidden');
        detailsSection.classList.add('hidden');
        filterConvocatorias();  // Muestra las convocatorias iniciales
    });

    applyFiltersBtn.addEventListener('click', () => {
        filterConvocatorias();
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details')) {
            event.preventDefault();
            const id = parseInt(event.target.getAttribute('data-id'));
            showDetails(id);
        }
    });

    closeDetailsBtn.addEventListener('click', () => {
        detailsSection.classList.add('hidden');
        convocatoriasSection.classList.remove('hidden');
    });
});
