// js/equipo.js

document.addEventListener('DOMContentLoaded', function() {
    const teamCards = document.querySelectorAll('.team-card');
    const teamModal = document.getElementById('teamModal');
    const teamModalCloseBtn = document.getElementById('teamModalCloseBtn');
    const teamModalBioContainer = document.querySelector('.team-modal__bio');
    const teamModalOverlay = document.getElementById('teamModalOverlay');
    const body = document.body;

    // Verificar si los elementos del modal existen antes de añadir listeners
    if (!teamModal || !teamModalCloseBtn || !teamModalBioContainer || !teamModalOverlay) {
        console.error("No se encontraron todos los elementos del modal en la página.");
        return; // Salir si el modal no está en esta página
    }

    // Función para abrir el modal
    const openModal = (bioHTML) => {
        teamModalBioContainer.innerHTML = bioHTML;
        teamModal.classList.add('open');
        body.classList.add('modal-open'); // Previene el scroll del fondo
    };

    // Función para cerrar el modal
    const closeModal = () => {
        teamModal.classList.remove('open');
        body.classList.remove('modal-open');
    };

    // Añadir listener a cada tarjeta de miembro
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            // Encontrar el div con la biografía dentro de la tarjeta clickeada
            const bioContentElement = this.querySelector('.team-card__bio-content');
            if (bioContentElement) {
                openModal(bioContentElement.innerHTML);
            } else {
                console.error("No se encontró contenido de biografía para esta tarjeta.");
            }
        });
    });

    // Añadir listeners para cerrar el modal
    teamModalCloseBtn.addEventListener('click', closeModal);
    teamModalOverlay.addEventListener('click', closeModal); // Cierra al hacer clic en el overlay
});