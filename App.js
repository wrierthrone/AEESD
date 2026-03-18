function updateTimelineLine() {
    const titulo = document.querySelector('.titulo-semana');
    const centers = document.querySelectorAll('.timeline-center');

    if (!titulo || centers.length === 0) return;

    const firstTitleBottom = titulo.getBoundingClientRect().bottom + window.scrollY;

    const lastCenter = centers[centers.length - 1];
    const lastCenterTop = lastCenter.getBoundingClientRect().top + window.scrollY;

    const lineStart = firstTitleBottom;
    const lineHeight = lastCenterTop - firstTitleBottom;

    document.body.style.setProperty('--line-start', lineStart + 'px');
    document.body.style.setProperty('--line-height', lineHeight + 'px');
}

// roda ao carregar e ao redimensionar
window.addEventListener('load', updateTimelineLine);
window.addEventListener('resize', updateTimelineLine);
