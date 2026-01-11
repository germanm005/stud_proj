export function initMenu() {
    const btn = document.querySelector('.header__catalog-btn');
    const menu = document.querySelector('.main-menu');
    const closeBtn = document.querySelector('.main-menu__close');

    if (!btn || !menu) return;

    // открыть меню по бургеру
    btn.addEventListener('click', () => {
        menu.classList.add('main-menu--active');
    });

    // закрыть по крестику
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            menu.classList.remove('main-menu--active');
        });
    }

    // по клику вне меню (если по ТЗ надо)
    document.addEventListener('click', (evt) => {
        const insideMenu = evt.target.closest('.main-menu');
        const onBurger = evt.target.closest('.header__catalog-btn');

        if (!insideMenu && !onBurger) {
            menu.classList.remove('main-menu--active');
        }
    });
}