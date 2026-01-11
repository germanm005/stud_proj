// components/pagination.js

const ITEMS_PER_PAGE = 6;
let currentPage = 1;

function getCards() {
    return Array.from(document.querySelectorAll('.catalog__item'));
}

function showPage(page) {
    const cards = getCards();
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    cards.forEach((card, index) => {
        card.style.display = (index >= start && index < end) ? '' : 'none';
    });
}

function renderPagination() {
    const cards = getCards();
    const pagination = document.querySelector('.catalog__pagination');
    if (!pagination) return;

    pagination.innerHTML = '';

    const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);

    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }

    pagination.style.display = 'flex';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'catalog__pagination-item';

        const btn = document.createElement('button');
        btn.className = 'catalog__pagination-link';
        btn.textContent = i;

        if (i === currentPage) {
            btn.classList.add('is-active');
        }

        btn.addEventListener('click', () => {
            currentPage = i;
            updatePagination();
        });

        li.appendChild(btn);
        pagination.appendChild(li);
    }
}

export function updatePagination() {
    showPage(currentPage);
    renderPagination();
}

export function resetPagination() {
    currentPage = 1;
    updatePagination();
}