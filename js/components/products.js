let products = [];

export async function loadProducts() {
  const response = await fetch('./data/data.json');
  products = await response.json();
  return products;
}

export function getProducts() {
  return products;
}

import { initTooltips } from './tooltip.js';

export function renderProducts(arr) {
  const catalogList = document.querySelector('.catalog__list');
  catalogList.innerHTML = '';

  arr.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'catalog__item';

    li.innerHTML = `
      <article class="product-card">
        <div class="product-card__visual">
          <img
            class="product-card__img"
            src="${item.image}"
            width="290"
            height="436"
            alt="${item.name}"
          >
          <div class="product-card__more">
            <button class="product-card__link btn btn--icon" data-id="${item.id}">
              <span class="btn__text">В корзину</span>
              <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-basket"></use>
              </svg>
            </button>
            <a class="product-card__link btn btn--secondary" href="#">
              <span class="btn__text">Подробнее</span>
            </a>
          </div>
        </div>

        <div class="product-card__info">
          <h2 class="product-card__title">${item.name}</h2>

          ${item.price.old
        ? `<span class="product-card__old">
                <span class="product-card__old-number">${item.price.old}</span>
                <span class="product-card__old-add">₽</span>
              </span>`
        : ''
      }

          <span class="product-card__price">
            <span class="product-card__price-number">${item.price.new}</span>
            <span class="product-card__price-add">₽</span>
          </span>

          <!-- Tooltip -->
          <div class="product-card__tooltip tooltip">
            <button class="tooltip__btn" aria-label="Показать подсказку">
              <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-i"></use>
              </svg>
            </button>

            <div class="tooltip__content">
              ${generateAvailabilityHTML(item.availability)}
            </div>
          </div>
        </div>
      </article>
    `;

    catalogList.appendChild(li);
  });

  initTooltips(catalogList);
}

function generateAvailabilityHTML(availability) {
  const items = Object.entries(availability)
    .map(([city, count]) => `
      <li class="tooltip__item">
        <span class="tooltip__text">${city}: <span class="tooltip__count">${count}</span></span>
      </li>
    `)
    .join('');

  return `
    <span class="tooltip__text">Наличие товара по городам:</span>
    <ul class="tooltip__list">${items}</ul>
  `;
}