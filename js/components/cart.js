import { products } from './products.js';

let cart = [];

export function initCart() {
    document.addEventListener('click', (e) => {
        const addBtn = e.target.closest('[data-id]');
        if (addBtn) addToCart(addBtn.dataset.id);

        const removeBtn = e.target.closest('[data-remove]');
        if (removeBtn) removeFromCart(removeBtn.dataset.remove);
    });
}

function addToCart(id) {
    const item = products.find(p => p.id == id);
    cart.push(item);
    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(p => p.id != id);
    updateCart();
}

function updateCart() {
    const cartCount = document.querySelector('.header__user-count');
    const cartList = document.querySelector('.basket__list');
    const cartEmpty = document.querySelector('.basket__empty-block');

    cartCount.textContent = cart.length;
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        return;
    }

    cartEmpty.style.display = 'none';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'basket__item';
        li.innerHTML = `
      <div class="basket__img"><img src="${item.image}" width="60" height="60"></div>
      <span class="basket__name">${item.title}</span>
      <span class="basket__price">${item.price} руб</span>
      <button class="basket__item-close" data-remove="${item.id}">
        <svg width="24" height="24"><use xlink:href="images/sprite.svg#icon-close"></use></svg>
      </button>
    `;
        cartList.appendChild(li);
    });
}