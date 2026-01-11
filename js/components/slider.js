import { getProducts } from './products.js';

function createDayProductSlide(product) {
  const li = document.createElement('li');
  li.classList.add('day-products__item', 'swiper-slide');

  li.innerHTML = `
    <div class="product-card product-card--small">
      <div class="product-card__visual">
        <img class="product-card__img" src="${product.image}" width="290" height="344" alt="${product.name}">
        <div class="product-card__more">
          <button class="product-card__link btn btn--icon" data-id="${product.id}">
            <span class="btn__text">В корзину</span>
            <svg width="24" height="24" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-basket"></use>
            </svg>
          </button>
          <a href="#" class="product-card__link btn btn--secondary">
            <span class="btn__text">Подробнее</span>
          </a>
        </div>
      </div>

      <div class="product-card__info">
        <h2 class="product-card__title">${product.name}</h2>

        ${product.price.old ? `
          <span class="product-card__old">
            <span class="product-card__old-number">${product.price.old}</span>
            <span class="product-card__old-add">₽</span>
          </span>` : ''}

        <span class="product-card__price">
          <span class="product-card__price-number">${product.price.new}</span>
          <span class="product-card__price-add">₽</span>
        </span>
      </div>
    </div>
  `;

  return li;
}

function renderDayProductsSlides() {
  const list = document.querySelector('.day-products__list');
  list.innerHTML = '';

  const products = getProducts();
  const dayProducts = products.filter(p => p.goodsOfDay === true);

  dayProducts.forEach(product => {
    list.appendChild(createDayProductSlide(product));
  });
}

function initDayProductsSwiper() {
  new Swiper('.day-products__slider', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.day-products__navigation-btn--next',
      prevEl: '.day-products__navigation-btn--prev',
    },
  });
}

export function renderDayProductsSlider() {
  renderDayProductsSlides();
  initDayProductsSwiper();
}