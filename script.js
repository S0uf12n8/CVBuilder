const sections = document.querySelectorAll('.zoom-section');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
        const offset = section.offsetTop;
        const distance = scrollY - offset + windowHeight / 2;
        const scale = 1 + Math.min(Math.max(distance / windowHeight, -0.2), 0.2);
        section.style.transform = `scale(${scale})`;
    });
});