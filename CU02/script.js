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
