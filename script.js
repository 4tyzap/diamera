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
function updateMenuIndicator(activeItem) {
    const indicator = document.querySelector('.nav-indicator');
    const itemRect = activeItem.getBoundingClientRect();
    const containerRect = document.querySelector('.nav-items').getBoundingClientRect();
    
    indicator.style.width = `${itemRect.width}px`;
    indicator.style.left = `${itemRect.left - containerRect.left}px`;
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = item.dataset.section;
        document.getElementById(targetSection).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        updateMenuIndicator(item);
    });
});

// Мобильное меню (добавьте логику открытия/закрытия)
document.querySelector('.menu-icon').addEventListener('click', () => {
    document.querySelector('.nav-items').classList.toggle('active');
});

window.addEventListener('DOMContentLoaded', () => {
    const activeItem = document.querySelector('.nav-item.active');
    updateMenuIndicator(activeItem);
});
