// components/form.js

import { openModal } from './modal.js';

export function initQuestionsForm() {
    const form = document.querySelector('#questions-form');
    if (!form) return;

    const successModal = document.querySelector('.modal--success');
    const errorModal = document.querySelector('.modal--error');

    const validation = new window.JustValidate('#questions-form', {
        errorFieldCssClass: 'is-invalid',
        errorLabelCssClass: 'is-label-invalid',
    });

    validation
        .addField('#name', [
            { rule: 'required', errorMessage: 'Введите имя' },
            { rule: 'minLength', value: 2, errorMessage: 'Минимум 2 символа' },
        ])
        .addField('#email', [
            { rule: 'required', errorMessage: 'Введите email' },
            { rule: 'email', errorMessage: 'Некорректный email' },
        ])
        .addField('#agree', [
            { rule: 'required', errorMessage: 'Необходимо согласие' },
        ])
        .onSuccess(async (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            try {
                // Тестовый режим — всегда успех
                // Подключишь реальный backend — просто замени fetch
                await new Promise((res) => setTimeout(res, 300));

                openModal(successModal);
                form.reset();
            } catch (err) {
                openModal(errorModal);
            }
        });
}