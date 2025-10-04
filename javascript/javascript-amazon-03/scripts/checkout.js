// Imports
import { cart, saveCartLocal, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';

// Variables
const htmlContainer = document.querySelector('.js-order-summary');
const checkoutQuantity = document.querySelector('.js-checkout-quantity');
let pageHtml = '';

// Generating HTML

checkoutQuantity.innerHTML = `${updateCartQuantity()} items`;

cart.forEach(cartItem => {

  const getInfo = products.find(product => cartItem.id === product.id);

  const id = getInfo.id;
  const name = getInfo.name;
  const image = getInfo.image; 
  const price = `$${(getInfo.priceCents / 100).toFixed(2)}`
  const quantity = cartItem.quantity;

  pageHtml += 

      `<div class="cart-item-container js-item-container" data-id="${id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${name}
            </div>
            <div class="product-price">
              ${price}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label">${quantity}</span>
              </span>
              <span class="js-update-quantity update-quantity-link link-primary" 
              data-type="update">
                Update
              </span>

              <div class="js-container-input container-input">
                  <input type="number" min="1" max="10" class="js-input-quantity input-quantity">
                  <button type="submit" class="link-primary" data-type="save">
                    Save
                  </button>
              </div>

              <span class="delete-quantity-link link-primary" 
              data-type="delete">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${id}">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${id}">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${id}">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> `

    htmlContainer.innerHTML = pageHtml;

})

// Event Listener

const itemContainer = document.querySelectorAll('.js-item-container');

itemContainer.forEach(container => {

  container.addEventListener('click', (event) => {

    const {id} = container.dataset;
    const target = event.target;
    const button = target.dataset.type; 

    if (!button) {
      return;
    }

    handleButton(container, button);

  })

})

function handleButton(container, button) {

  const upButton = container.querySelector('.js-update-quantity');
  const inputContainer = container.querySelector('.js-container-input');
  const {id} = container.dataset;
  const item = cart.find(cartItem => id === cartItem.id); 

  if(button === 'update') {

    upButton.classList.add('hidden');
    inputContainer.classList.add('show');

  } else if(button === 'save') {

    const inputElement = inputContainer.querySelector('.js-input-quantity');
    let quantity = inputElement.value;
    quantity = Number(quantity);

    if(quantity === 0) {
      return;
    }

    item.quantity = quantity;
    document.querySelector('.js-quantity-label').innerHTML = item.quantity;

    inputElement.value = '';
    upButton.classList.remove('hidden');
    inputContainer.classList.remove('show');

  } else if (button === 'delete') {

    cart.splice(cart.indexOf(item), 1);

    container.remove();

  }
  checkoutQuantity.innerHTML = `${updateCartQuantity()} items`;
  saveCartLocal();
}

