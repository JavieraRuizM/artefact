// script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    const menuToggle = document.getElementById('menuToggle');
    const hamburgerIcon = menuToggle ? menuToggle.querySelector('.menu-icon-hamburger') : null;
    const closeIcon = menuToggle ? menuToggle.querySelector('.menu-icon-close') : null;
    const menuPanel = document.getElementById('menuPanel');
    const menuActiveBackground = document.getElementById('menuActiveBackground');
    const body = document.body;

    // --- RUTAS A TUS SVGS (con barra inicial para ruta absoluta desde la raíz) ---
    const hamburgerIconPath = "/assets/hamburguesa.svg"; // CAMBIO AQUÍ
    const closeIconPath = "/assets/cerrar.svg";       // CAMBIO AQUÍ

    // --- FUNCIÓN PARA MANEJAR LA VISIBILIDAD DEL MENÚ ---
    function toggleMenu() {
        const aboutToOpen = !menuToggle.classList.contains('active');

        menuToggle.classList.toggle('active');
        menuPanel.classList.toggle('active');
        menuActiveBackground.classList.toggle('active');
        body.classList.toggle('menu-open');

        if (aboutToOpen) { // Menú se está abriendo
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.setAttribute('aria-label', 'Cerrar menú');
            if (hamburgerIcon) hamburgerIcon.style.display = 'none';
            if (closeIcon) {
                // closeIcon.setAttribute('src', closeIconPath); // No es necesario si el src ya está en el HTML y es correcto
                closeIcon.style.display = 'block';
            }
        } else { // Menú se está cerrando
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú');
            if (hamburgerIcon) {
                // hamburgerIcon.setAttribute('src', hamburgerIconPath); // No es necesario si el src ya está en el HTML y es correcto
                hamburgerIcon.style.display = 'block';
            }
            if (closeIcon) closeIcon.style.display = 'none';
        }
    }

    // --- EVENT LISTENERS PARA EL MENÚ ---
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (menuPanel) {
        const menuLinks = menuPanel.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                if (menuPanel.classList.contains('active')) {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        toggleMenu();
                    }
                }
            });
        });
    }

    // --- FUNCIONALIDAD PARA GIF DE PANTALLA COMPLETA EN HOVER DE TARJETAS ---
    const fullscreenGifBackground = document.getElementById('fullscreenGifBackground');
    const artefactosCard = document.getElementById('artefactos-card');
    const relacionesCard = document.getElementById('relaciones-card');

    function showFullscreenGif(event) {
        const gifSrc = event.currentTarget.dataset.gifSrc;
        if (gifSrc && fullscreenGifBackground) {
            fullscreenGifBackground.style.backgroundImage = `url('${gifSrc}')`;
            fullscreenGifBackground.classList.add('active');
        }
    }

    function hideFullscreenGif() {
        if (fullscreenGifBackground) {
            fullscreenGifBackground.classList.remove('active');
            // fullscreenGifBackground.style.backgroundImage = 'none';
        }
    }

    if (artefactosCard) {
        artefactosCard.addEventListener('mouseenter', showFullscreenGif);
        artefactosCard.addEventListener('mouseleave', hideFullscreenGif);
    }
    if (relacionesCard) {
        relacionesCard.addEventListener('mouseenter', showFullscreenGif);
        relacionesCard.addEventListener('mouseleave', hideFullscreenGif);
    }

    // --- BOTÓN SCROLL TO TOP ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // --- NUEVA LÓGICA PARA FILTRAR ARTEFACTOS ---
    const filtroBotonesContainer = document.querySelector('.filtros-artefactos');
    const artefactoItems = document.querySelectorAll('.artefactos-grid .artefacto-item');

    if (filtroBotonesContainer && artefactoItems.length > 0) {
        const filtroBotones = filtroBotonesContainer.querySelectorAll('.filtro-btn');

        filtroBotones.forEach(boton => {
            boton.addEventListener('click', function() {
                filtroBotones.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filtroSeleccionado = this.dataset.filtro; // ej: "proyecto1", "proyecto2", "todos"

                artefactoItems.forEach(item => {
                    const proyectosDelItem = item.dataset.proyecto; // ej: "proyecto1", "proyecto2", "proyecto1 proyecto2"

                    // Si el filtro es "todos" O si la lista de proyectos del item (separada por espacios)
                    // INCLUYE el filtro seleccionado.
                    if (filtroSeleccionado === 'todos' || (proyectosDelItem && proyectosDelItem.split(' ').includes(filtroSeleccionado))) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    } else {
        if (!filtroBotonesContainer) console.log("Contenedor de filtros no encontrado.");
        if (artefactoItems.length === 0) console.log("Items de artefactos no encontrados.");
    }

    console.log("Página cargada y script.js ejecutándose (rutas SVG absolutas).");

});