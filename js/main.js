import { initMenu } from './components/menu.js';
import { initLocation } from './components/location.js';
import { initBasket } from './components/basket.js';
import { loadProducts, getProducts, renderProducts } from './components/products.js';
import { initFilters } from './components/filters.js';
import { renderDayProductsSlider } from './components/slider.js';
import { initAccordion } from './components/accordion.js';
import { initQuestionsForm } from './components/form.js';
import { initModalControls } from './components/modal.js';
import { resetPagination } from './components/pagination.js';

async function init() {
    // UI
    initMenu();
    initLocation();
    initBasket();
    initAccordion();
    initModalControls();
    initQuestionsForm();

    // Загружаем товары
    await loadProducts();

    // Рендер каталога
    renderProducts(getProducts());

    // Пагинация — после рендера
    requestAnimationFrame(() => {
        resetPagination();
    });

    // Фильтры
    initFilters();

    // Слайдер «Товары дня» — строго после загрузки товаров
    renderDayProductsSlider();
}

document.addEventListener('DOMContentLoaded', init);