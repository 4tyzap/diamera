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
if (parallaxBg && window.innerWidth > 768) { // Только для десктопа
    parallaxBg.style.transform = `translate(-50%, ${window.scrollY * 0.5}px)`;
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

let isScrolling = false;
let lastScrollTime = 0;

const SCROLL_ACCELERATION_ZONE = 2.0 * window.innerHeight; // 25% высоты экрана
const MAX_SCROLL_SPEED = 6000; // пикселей/сек (увеличено для быстрой середины)

function smoothScrollTo(targetY) {
    if (isScrolling) return;
    
    const startY = window.pageYOffset;
    const totalDistance = targetY - startY;
    const direction = Math.sign(totalDistance);
    const absoluteDistance = Math.abs(totalDistance);
    
    let currentPosition = startY;
    let currentSpeed = 0;
    let lastFrameTime = performance.now();
    isScrolling = true;

    function animate() {
        const now = performance.now();
        const deltaTime = (now - lastFrameTime) / 1000;
        lastFrameTime = now;

        const remainingDistance = targetY - currentPosition;
        const absoluteRemaining = Math.abs(remainingDistance);

        // Фаза ускорения/замедления
        if (absoluteRemaining <= SCROLL_ACCELERATION_ZONE * 2) {
            const acceleration = (MAX_SCROLL_SPEED ** 2) / (2 * SCROLL_ACCELERATION_ZONE);
            currentSpeed = Math.min(
                Math.sqrt(2 * acceleration * absoluteRemaining),
                MAX_SCROLL_SPEED
            );
        } 
        // Фаза постоянной скорости
        else {
            currentSpeed = MAX_SCROLL_SPEED;
        }

        const frameDelta = currentSpeed * deltaTime * direction;
        
        // Финализация при приближении
        if (Math.abs(frameDelta) >= absoluteRemaining) {
            window.scrollTo(0, targetY);
            isScrolling = false;
            return;
        }

        currentPosition += frameDelta;
        window.scrollTo(0, currentPosition);
        
        if (isScrolling) {
            requestAnimationFrame(animate);
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
// document.querySelector('.menu-icon').addEventListener('click', () => {
//    document.querySelector('.nav-items').classList.toggle('active');
// });

window.addEventListener('DOMContentLoaded', () => {
    const firstMenuItem = document.querySelector('.nav-item[data-section="home"]');
    firstMenuItem.classList.add('active');
    updateMenuIndicator(firstMenuItem);
    updateMenuSizes();
});

function updateMenuSizes() {
    const menuItems = document.querySelectorAll('.nav-item');
    const logoContainer = document.querySelector('.logo-container');
    const indicator = document.querySelector('.nav-indicator');
    const navbar = document.querySelector('.navbar');
    const subHeader = document.querySelector('.sub-header');
    const langItems = document.querySelectorAll('.lang-item');
    
    // Рассчитываем размеры
    const itemWidth = window.innerWidth / 5;
    const menuHeight = Math.min(itemWidth * 0.5, 100); // Ограничение 100px
    let fontSize = Math.floor(menuHeight * 0.2); // 20% от высоты по умолчанию

    // Условие для вертикальной ориентации
    if (window.innerHeight > window.innerWidth) { // Вертикальная ориентация
        fontSize = Math.floor(menuHeight * 0.25); // 25% от высоты
    }

    // Применяем размер шрифта
    menuItems.forEach(item => {
        item.style.fontSize = `${fontSize}px`;
        item.style.width = `${itemWidth}px`;
        item.style.height = `${menuHeight}px`;
    });

    // Обновляем шрифт subheader
    const subHeaderElements = subHeader.querySelectorAll('a, span, .slogan');
    subHeaderElements.forEach(element => {
        const currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
        if (currentFontSize > fontSize) {
            element.style.fontSize = `${fontSize}px`;
        }
    });

    // Обновляем шрифт селектора языка
    langItems.forEach(item => {
        const currentFontSize = parseFloat(window.getComputedStyle(item).fontSize);
        if (currentFontSize > fontSize) {
            item.style.fontSize = `${fontSize}px`;
        }
    });

    // Обновляем остальные элементы
    navbar.style.height = `${menuHeight}px`;
    logoContainer.style.width = `${itemWidth}px`;
    indicator.style.width = `${itemWidth}px`;
    indicator.style.height = `${menuHeight}px`;
}

window.addEventListener('resize', updateMenuSizes);
window.addEventListener('DOMContentLoaded', updateMenuSizes);

// Обработчик переключателя языков
/* function updateLangIndicator(activeItem) {
    const indicator = document.querySelector('.lang-indicator');
    const itemIndex = Array.from(document.querySelectorAll('.lang-item')).indexOf(activeItem);
    indicator.style.top = `${itemIndex * 50}%`;
} */

function updateLangIndicator(activeItem) {
    const indicator = document.querySelector('.lang-indicator');
    const langSwitcher = document.querySelector('.lang-switcher');
    const itemHeight = langSwitcher.offsetHeight / 2;
    
    indicator.style.top = `${activeItem.offsetTop}px`;
    indicator.style.height = `${itemHeight}px`;
}

/* document.querySelectorAll('.lang-item').forEach(item => {
    item.addEventListener('click', () => {
        // Удаляем активность у всех элементов
        document.querySelectorAll('.lang-item').forEach(i => i.classList.remove('active'));
        // Добавляем активность текущему
        item.classList.add('active');
        // Обновляем индикатор
        updateLangIndicator(item);
    });
});

document.querySelectorAll('.lang-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.lang-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        updateLangIndicator(item);
    });
}); */

document.querySelectorAll('.lang-item').forEach(item => {
    item.addEventListener('click', () => {
        // Удаляем активность у всех элементов
        document.querySelectorAll('.lang-item').forEach(i => i.classList.remove('active'));
        // Добавляем активность текущему
        item.classList.add('active');
        // Обновляем индикатор
        updateLangIndicator(item);
    });
});

// Инициализация
window.addEventListener('DOMContentLoaded', () => {
    const firstLangItem = document.querySelector('.lang-item[data-lang="ru"]');
    updateLangIndicator(firstLangItem);
});
