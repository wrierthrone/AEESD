function updateTimelineLine() {
    const titulo = document.querySelector('.titulo-semana');
    const centers = document.querySelectorAll('.timeline-center');

    if (!titulo || centers.length === 0) return;

    const firstTitleBottom = titulo.getBoundingClientRect().bottom + window.scrollY;

    const lastCenter = centers[centers.length - 1];
    const lastCenterRect = lastCenter.getBoundingClientRect();
    const lastCenterCenter = lastCenter.getBoundingClientRect().top + window.scrollY + (lastCenterRect.height / 2);

    const lineStart = firstTitleBottom;
    const lineHeight = lastCenterCenter - firstTitleBottom;

    document.body.style.setProperty('--line-start', lineStart + 'px');
    document.body.style.setProperty('--line-height', lineHeight + 'px');
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