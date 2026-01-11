// components/modal.js

export function openModal(modal) {
    if (!modal) return;
    modal.classList.add('is-active');
}

export function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-active');
}

export function initModalControls() {
    const modals = document.querySelectorAll('.modal');

    modals.forEach((modal) => {
        const overlay = modal.querySelector('.modal__overlay');
        const closeBtn = modal.querySelector('.modal__close');

        if (overlay) {
            overlay.addEventListener('click', () => closeModal(modal));
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
    });
}