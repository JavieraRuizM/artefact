// js/relaciones.js

document.addEventListener('DOMContentLoaded', function() {
    const relationsContainer = document.getElementById('relationsContainer');
    const hotspots = document.querySelectorAll('.hotspot');
    const modal = document.getElementById('relationsModal');
    const modalCloseBtn = document.getElementById('relationsModalCloseBtn');
    const modalBody = document.querySelector('.relations-modal__body');

    const viewSwitch = document.getElementById('viewSwitch');
    const scrollA = document.getElementById('scrollA');
    const scrollB = document.getElementById('scrollB');

    // --- Lógica del Modal ---
    const openModal = (data) => {
        let contentHTML = `<h3>${data.title}</h3>`;
        if (data.img) {
            contentHTML += `<img src="${data.img}" alt="${data.title}">`;
        } else if (data.video) {
            contentHTML += `<video src="${data.video}" controls autoplay muted loop></video>`;
        }
        contentHTML += `<p>${data.text}</p>`;
        
        modalBody.innerHTML = contentHTML;
        modal.classList.add('open');
    };

    const closeModal = () => {
        modal.classList.remove('open');
        
    };

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            const data = {
                title: this.dataset.title,
                img: this.dataset.img,
                video: this.dataset.video,
                text: this.dataset.text
            };
            openModal(data);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
        
    }
    
    // --- Lógica del Switch de Vistas ---
    if (viewSwitch) {
        viewSwitch.addEventListener('change', function(e) {
            const isChecked = e.target.checked;
            
            if (isChecked) { // Cambiar a Vista B (Actores)
                const currentScroll = scrollA.scrollLeft;
                relationsContainer.classList.remove('view-a-active');
                relationsContainer.classList.add('view-b-active');
                scrollB.scrollLeft = currentScroll;
            } else { // Cambiar a Vista A (Corte)
                const currentScroll = scrollB.scrollLeft;
                relationsContainer.classList.remove('view-b-active');
                relationsContainer.classList.add('view-a-active');
                scrollA.scrollLeft = currentScroll;
            }
        });
    }
});