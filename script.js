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

// Константы для настройки анимации
const SCROLL_SPEED = 1200; // пикселей/секунду
let isScrolling = false;
let lastScrollTime = 0;

function smoothScrollTo(targetY) {
    if (isScrolling) return;
    
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const duration = Math.abs(distance) / SCROLL_SPEED * 1000;
    let startTime = null;

    isScrolling = true;

    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, startY + distance * progress);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animate);
        } else {
            isScrolling = false;
        }
    }

    requestAnimationFrame(animate);
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        if (isScrolling && Date.now() - lastScrollTime < 100) return;
        
        const targetSection = document.getElementById(item.dataset.section);
        const targetY = targetSection.offsetTop - document.querySelector('.navbar').offsetHeight;
        
        smoothScrollTo(targetY);
        lastScrollTime = Date.now();

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

function updateMenuSizes() {
    const menuItems = document.querySelectorAll('.nav-item, .logo-container');
    const indicator = document.querySelector('.nav-indicator');
    const itemWidth = window.innerWidth / 5;
    
    menuItems.forEach(item => {
        item.style.width = `${itemWidth}px`;
        item.style.height = `${itemWidth * 0.666}px`;
    });
    
    indicator.style.width = `${itemWidth}px`;
    indicator.style.height = `${itemWidth * 0.666}px`;
}

window.addEventListener('resize', updateMenuSizes);
window.addEventListener('DOMContentLoaded', updateMenuSizes);
