import { getProducts, renderProducts } from './products.js';
import { resetPagination } from './pagination.js'; // ← ДОБАВИЛ

export function initFilters() {
    const form = document.querySelector('.catalog-form');
    const sortSelect = document.querySelector('.catalog__sort-select');

    form.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    updateTypeCounts();
    applyFilters();
}

function applyFilters() {
    let filtered = [...getProducts()];
    const form = document.querySelector('.catalog-form');

    // Фильтр по типу
    const types = [...form.querySelectorAll('input[name="type"]:checked')]
        .map(i => i.value);

    if (types.length > 0) {
        filtered = filtered.filter(p =>
            types.some(type => p.type.includes(type))
        );
    }

    // Фильтр по наличию
    const status = form.querySelector('input[name="status"]:checked')?.value;
    if (status === 'instock') {
        filtered = filtered.filter(p =>
            Object.values(p.availability).some(count => count > 0)
        );
    }

    applySort(filtered);
}

function applySort(arr) {
    const sort = document.querySelector('.catalog__sort-select').value;

    if (sort === 'price-min') arr.sort((a, b) => a.price.new - b.price.new);
    if (sort === 'price-max') arr.sort((a, b) => b.price.new - a.price.new);
    if (sort === 'rating-max') arr.sort((a, b) => b.rating - a.rating);

    renderProducts(arr);

    resetPagination();
}

function updateTypeCounts() {
    const products = getProducts();
    const typeInputs = document.querySelectorAll('input[name="type"]');

    typeInputs.forEach((input) => {
        const value = input.value;
        const count = products.filter(p => p.type.includes(value)).length;

        const countSpan = input
            .closest('.custom-checkbox')
            ?.querySelector('.custom-checkbox__count');

        if (countSpan) {
            countSpan.textContent = count;
        }
    });
}