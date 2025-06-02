console.log('under construction');

const sectionConfigs = {
    forms: {
        title: "📋 Formularios",
        pageTitle: "En Construcción - Formularios",
        progress: 75,
        features: [
            "⭐ Validación en tiempo real",
            "⭐ Formularios multi-paso",
            "⭐ Campos personalizables",
            "⭐ Integración con APIs"
        ],
        highlightText: "Los formularios interactivos estarán disponibles pronto con validaciones avanzadas."
    },
    designer: {
        title: "🎨 Designer",
        pageTitle: "En Construcción - Designer",
        progress: 60,
        features: [
            "⭐ Editor visual drag & drop",
            "⭐ Paleta de colores avanzada",
            "⭐ Plantillas prediseñadas",
            "⭐ Exportación de temas"
        ],
        highlightText: "El diseñador visual permitirá crear interfaces personalizadas sin código."
    },
    charts: {
        title: "📊 Gráficos",
        pageTitle: "En Construcción - Gráficos",
        progress: 85,
        features: [
            "⭐ Gráficos interactivos",
            "⭐ Dashboards personalizables",
            "⭐ Exportación de datos",
            "⭐ Animaciones suaves"
        ],
        highlightText: "Los gráficos y dashboards estarán listos para visualizar tus datos de manera impactante."
    },
    auth: {
        title: "🔐 Autenticación",
        pageTitle: "En Construcción - Autenticación",
        progress: 90,
        features: [
            "⭐ Login con redes sociales",
            "⭐ Autenticación 2FA",
            "⭐ Gestión de roles",
            "⭐ Recuperación de contraseña"
        ],
        highlightText: "El sistema de autenticación seguro estará disponible muy pronto."
    },
    tables: {
        title: "📋 Tablas",
        pageTitle: "En Construcción - Tablas",
        progress: 70,
        features: [
            "⭐ Tablas con paginación",
            "⭐ Filtros avanzados",
            "⭐ Ordenamiento dinámico",
            "⭐ Exportación de datos"
        ],
        highlightText: "Las tablas de datos permitirán gestionar información de manera eficiente."
    },
    default: {
        title: "📐 Layouts",
        pageTitle: "En Construcción - Layouts",
        progress: 85,
        features: [
            "⭐ Layouts responsivos avanzados",
            "⭐ Componentes reutilizables",
            "⭐ Grids dinámicos",
            "⭐ Temas personalizables"
        ],
        highlightText: "Los layouts avanzados te ayudarán a crear interfaces profesionales rápidamente."
    }
};

// Función para obtener parámetros de URL
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Función para cargar contenido dinámico
function loadDynamicContent() {
    const section = getURLParameter('section') || 'default';
    const config = sectionConfigs[section] || sectionConfigs.default;
    console.log('Cargando configuración para la sección:',section, config);

    // Actualizar título de la página
    document.getElementById('page-title').textContent = config.pageTitle;

    // Actualizar título principal
    document.getElementById('main-title').textContent = config.title;

    // Animar barra de progreso
    animateProgressBar(config.progress);

    // Actualizar características
    const featuresGrid = document.getElementById('features-grid');
    featuresGrid.innerHTML = config.features.map(feature =>
        `<div>${feature}</div>`
    ).join('');

    // Actualizar texto destacado
    document.getElementById('highlight-text').textContent = config.highlightText;

    const loadingBar = document.querySelector('.loading-bar');
    let animationFrameId;
    let currentWidth = 0;
    let targetWidth;
    const speed = 0.5; // Velocidad de la barra (mayor número = más rápido)
    const minBlinkPoint = 30; // Porcentaje mínimo para el parpadeo
    const maxBlinkPoint = 90; // Porcentaje máximo para el parpadeo
    let isBlinking = false;
    let blinkStartTime;
    const blinkDuration = 500; // Duración del parpadeo en milisegundos

    /**
     * Establece un ancho objetivo aleatorio para el parpadeo.
     * El ancho objetivo estará entre minBlinkPoint y maxBlinkPoint.
     */
    function setRandomTargetWidth() {
        targetWidth = Math.floor(Math.random() * (maxBlinkPoint - minBlinkPoint + 1)) + minBlinkPoint;
    }

    /**
     * Anima la barra de carga, controlando su crecimiento, parpadeo y reinicio.
     */
    function animateLoadingBar() {
        if (!isBlinking) {
            // Si la barra no está parpadeando, sigue creciendo
            currentWidth += speed;

            // Asegura que la barra no exceda el 100% antes de reiniciar si no hay parpadeo
            if (currentWidth > 100) {
                currentWidth = 0;
                loadingBar.style.width = '0%';
                setRandomTargetWidth();
            }

            // Si la barra alcanza o supera el punto de parpadeo objetivo
            if (currentWidth >= targetWidth && targetWidth !== undefined) {
                isBlinking = true;
                loadingBar.classList.add('blinking'); // Agrega la clase para activar el parpadeo CSS
                blinkStartTime = performance.now(); // Guarda el tiempo de inicio del parpadeo
            }

            loadingBar.style.width = currentWidth + '%'; // Actualiza el ancho de la barra
        } else {
            // Si la barra está parpadeando
            const elapsedTime = performance.now() - blinkStartTime; // Calcula el tiempo transcurrido desde el inicio del parpadeo

            // Si el tiempo de parpadeo ha terminado
            if (elapsedTime >= blinkDuration) {
                isBlinking = false;
                loadingBar.classList.remove('blinking'); // Remueve la clase de parpadeo
                currentWidth = 0; // Reinicia el ancho de la barra a 0
                loadingBar.style.width = '0%'; // Actualiza el estilo para reiniciar visualmente
                setRandomTargetWidth(); // Establece un nuevo punto de parpadeo para el siguiente ciclo
            }
        }

        // Solicita el siguiente cuadro de animación
        animationFrameId = requestAnimationFrame(animateLoadingBar);
    }

    // Iniciar la animación cuando el DOM esté completamente cargado
    setRandomTargetWidth(); // Establece el primer punto de parpadeo
    animateLoadingBar(); // Comienza el bucle de animación


}

// Función para animar la barra de progreso
function animateProgressBar() {
    const progressContainer = document.querySelector('.progress-container');
    
    // Crear estructura del progress container
    const progressTextDiv = document.createElement('div');
    progressTextDiv.className = 'progress-text';
    
    
    const newProgressBar = document.createElement('div');
    newProgressBar.className = 'progress-bar loading';
    
    const newProgressFill = document.createElement('div');
    newProgressFill.className = 'progress-fill';
    newProgressFill.id = 'progress-fill';
    newProgressFill.style.width = '0%';
    
    const stepsDiv = document.createElement('div');
    stepsDiv.id = 'progress-steps';
    stepsDiv.style.cssText = 'display: flex; justify-content: space-between; font-size: 0.875rem; color: #64748b;';
    
    // Ensamblar estructura
    newProgressBar.appendChild(newProgressFill);
    progressContainer.appendChild(progressTextDiv);
    progressContainer.appendChild(stepsDiv);
    
}


// Función para ir al inicio
function goHome() {
    window.location.href = '../../index.html';
}

// Manejar la acción del botón de volver
document.getElementById('goHome').addEventListener('click', goHome);

loadDynamicContent()