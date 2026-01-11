export function initAccordion() {
    const items = document.querySelectorAll('.accordion__element');

    if (!items.length) return;

    items.forEach((item) => {
        const btn = item.querySelector('.accordion__btn');
        const content = item.querySelector('.accordion__content');

        btn.addEventListener('click', () => {
            const isActive = btn.classList.contains('accordion__btn--active');

            // Закрываем все элементы
            items.forEach((el) => {
                el.querySelector('.accordion__btn').classList.remove('accordion__btn--active');
                el.querySelector('.accordion__content').style.display = 'none';
            });

            // Если кликнули по уже открытому — просто закрываем
            if (isActive) return;

            // Открываем текущий
            btn.classList.add('accordion__btn--active');
            content.style.display = 'block';
        });
    });
}