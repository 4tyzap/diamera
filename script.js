window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    const parallaxBg = document.querySelector('.parallax-bg');
    const menuHeight = document.querySelector('.navbar').offsetHeight;
    const scrollOffset = 100; // Отступ для активации раздела

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - menuHeight;
        const sectionBottom = sectionTop + section.offsetHeight;
        const currentScroll = window.pageYOffset + scrollOffset;

        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            const targetItem = document.querySelector(`[data-section="${section.id}"]`);
            if (targetItem && !targetItem.classList.contains('active')) {
                // Снимаем активность со всех пунктов
                navItems.forEach(item => item.classList.remove('active'));
                // Добавляем активность текущему
                targetItem.classList.add('active');
                // Обновляем индикатор
                updateMenuIndicator(targetItem);
            }
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
