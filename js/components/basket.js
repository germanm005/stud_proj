import { getProducts } from './products.js';

let basket = [];

export function initBasket() {
    const basketBtn = document.querySelector('.header__user-item:first-child .header__user-btn');
    const basketEl = document.querySelector('.header__basket.basket');
    const basketList = document.querySelector('.basket__list');
    const basketCount = document.querySelector('.header__user-count');
    const emptyBlock = document.querySelector('.basket__empty-block');
    const checkoutBtn = document.querySelector('.basket__link');

    if (!basketBtn || !basketEl || !basketList || !basketCount || !emptyBlock) return;

    // Открытие/закрытие корзины
    basketBtn.addEventListener('click', () => {
        basketEl.classList.toggle('basket--active');
    });

    // Добавление товара по кнопке "В корзину"
    document.addEventListener('click', (evt) => {
        const btn = evt.target.closest('[data-id]');
        if (!btn) return;

        const id = Number(btn.dataset.id);
        const product = getProducts().find((item) => item.id === id);
        if (!product) return;

        addToBasket(product);
    });

    function addToBasket(product) {
        const existing = basket.find((item) => item.id === product.id);

        if (existing) {
            existing.qty += 1;
        } else {
            basket.push({
                id: product.id,
                name: product.name,
                price: product.price.new,
                image: product.image,
                qty: 1,
            });
        }

        renderBasket();
    }

    function removeFromBasket(id) {
        basket = basket.filter((item) => item.id !== id);
        renderBasket();
    }

    // Один обработчик удаления — навсегда
    basketList.addEventListener('click', (evt) => {
        const btn = evt.target.closest('[data-remove-id]');
        if (!btn) return;

        const id = Number(btn.dataset.removeId);
        removeFromBasket(id);
    });

    function renderBasket() {
        basketList.innerHTML = '';

        if (basket.length === 0) {
            emptyBlock.style.display = 'block';
            if (checkoutBtn) checkoutBtn.style.display = 'none';
        } else {
            emptyBlock.style.display = 'none';
            if (checkoutBtn) checkoutBtn.style.display = 'block';

            basket.forEach((item) => {
                const li = document.createElement('li');
                li.className = 'basket__item';
                li.innerHTML = `
          <div class="basket__img">
            <img src="${item.image}" alt="${item.name}" width="60" height="60">
          </div>
          <span class="basket__name">${item.name}</span>
          <span class="basket__price">${item.price} руб</span>
          <button class="basket__item-close" type="button" data-remove-id="${item.id}">
            <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-close"></use>
            </svg>
          </button>
        `;
                basketList.appendChild(li);
            });
        }

        // Обновляем счётчик
        basketCount.textContent = basket.reduce((sum, item) => sum + item.qty, 0);
    }
}