function updateTimelineLine() {
    const semanas = document.querySelectorAll('.semana');

    semanas.forEach(semana => {
        const titulo = semana.querySelector('.titulo-semana');
        const centers = semana.querySelectorAll('.timeline-center');

        if (!titulo || centers.length === 0) return;

        const semanaRect = semana.getBoundingClientRect();
        const firstTitleBottom = titulo.getBoundingClientRect().bottom;
        const lastCenter = centers[centers.length - 1];
        const lastCenterRect = lastCenter.getBoundingClientRect();
        const lastCenterCenter = lastCenterRect.top + (lastCenterRect.height / 2);

        const lineStart = Math.max(0, firstTitleBottom - semanaRect.top);
        const lineHeight = Math.max(0, lastCenterCenter - firstTitleBottom);

        semana.style.setProperty('--line-start', `${lineStart}px`);
        semana.style.setProperty('--line-height', `${lineHeight}px`);
    });
}

// Aguardar todas as imagens carregarem antes de calcular
function initTimeline() {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;

    if (images.length === 0) {
        updateTimelineLine();
        return;
    }

    images.forEach(img => {
        if (img.complete) {
            loadedCount++;
        } else {
            img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === images.length) {
                    updateTimelineLine();
                }
            });
        }
    });

    if (loadedCount === images.length) {
        updateTimelineLine();
    }
}

// Popover
window.addEventListener('load', initTimeline);
window.addEventListener('resize', updateTimelineLine);
window.addEventListener('scroll', updateTimelineLine);

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')

const popoverList = [...popoverTriggerList].map(popoverTriggerEl =>
  new bootstrap.Popover(popoverTriggerEl)
)