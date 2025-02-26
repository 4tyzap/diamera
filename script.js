window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    const parallaxBg = document.querySelector('.parallax-bg');
    
    // Индикатор активного раздела
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            navItems.forEach(item => item.classList.remove('active'));
            navItems[index].classList.add('active');
            
            // Смена фона
            document.body.style.background = section.dataset.bg === 'dark' 
                ? 'var(--pastel-purple)' 
                : 'var(--light-gray)';
        }
    });

    // Параллакс-эффект
    if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// Плавный скролл
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.textContent.toLowerCase();
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Мобильное меню (добавьте логику открытия/закрытия)
document.querySelector('.menu-icon').addEventListener('click', () => {
    document.querySelector('.nav-items').classList.toggle('active');
});
