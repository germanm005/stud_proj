export function initTooltips(container = document) {
    const tooltips = container.querySelectorAll('.tooltip');

    tooltips.forEach((tooltip) => {
        const btn = tooltip.querySelector('.tooltip__btn');
        const content = tooltip.querySelector('.tooltip__content');

        if (!btn || !content) return;

        tippy(btn, {
            content: content.innerHTML,
            allowHTML: true,
            theme: 'briaton',         // ← активируем кастомную тему
            placement: 'top',
            interactive: true,
            delay: [100, 50],
            offset: [-90, 10],
            arrow: false,
        });
    });
}