//=======================================//

  import { cart, updateCartQuantity, saveCartLocal } from '../data/cart.js';
import { products } from '../data/products.js';

//=======================================//

const checkoutQuantity = document.querySelector('.js-checkout-quantity');
const orderSummary = document.querySelector('.js-order-summary');
let pageHtml = '';

//=======================================//

checkoutQuantity.innerHTML = `${updateCartQuantity()} items`

cart.forEach(cartItem => {

  const item = products.find(product => cartItem.id === product.id);

  const id = item.id;
  const name = item.name;
  const image = item.image;
  const quantity = cartItem.quantity;
  const price = `$${(item.priceCents / 100).toFixed(2)}`;

  pageHtml += 
  `
          <div class="cart-item-container js-item-container"
            data-id="${id}">
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
                    Quantity: <span class="quantity-label js-item-quantity">${quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-button" data-type="update">
                    Update
                  </span>
                  <div class="js-input-container">
                    <input type="text" min="1" max="10" class="js-input-quantity"> 
                    <button data-type="save">Save</button>
                  </div>
                  <span class="delete-quantity-link link-primary" data-type="delete">
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
          </div>
`
  orderSummary.innerHTML = pageHtml;
})

//=======================================//

const itemContainer = document.querySelectorAll('.js-item-container');

itemContainer.forEach(container => {

  container.addEventListener('click', (event) => {

    const click = event.target;
    const buttonType = click.dataset.type;

    if(!buttonType) {
      return;
    }

    handleButton(buttonType, container);
  })
})

//=======================================//

function handleButton(buttonType, container) {

  const {id} = container.dataset;
  const upButton = container.querySelector('.js-update-button');
  const inputContainer = container.querySelector('.js-input-container');
  const item = cart.find(cartItem => id === cartItem.id); 

  if(buttonType === 'update') {

    upButton.classList.add('hidden');
    inputContainer.classList.add('show');

  } else if (buttonType === 'save') {

    const inputElement = container.querySelector('.js-input-quantity');
    let quantity = inputElement.value;
    quantity = Number(quantity);

    if(quantity === 0) {return};

    item.quantity = quantity;

    container.querySelector('.js-item-quantity').innerHTML = item.quantity;

    inputElement.value = '';
    upButton.classList.remove('hidden');
    inputContainer.classList.remove('show');

  } else if (buttonType === 'delete') {

    cart.splice(cart.indexOf(item), 1);
    container.remove();

  }

  saveCartLocal();
  checkoutQuantity.innerHTML = `${updateCartQuantity()} items`

}
