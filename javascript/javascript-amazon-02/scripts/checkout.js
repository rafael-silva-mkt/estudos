// Imports
import { cart, saveCartLocal, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';

// Variables

const checkoutQuantity = document.querySelector('.js-checkout-quantity');
const orderContainer = document.querySelector('.js-order-summary');
let pageHtml = '';

// Generating HTML *_* 

checkoutQuantity.innerHTML = `${ updateCartQuantity() } items`

cart.forEach(cartItem => {

  const info = products.find(product => product.id === cartItem.id);

    const id = info.id;
    const image = info.image;
    const name = info.name;
    const price = `$${(info.priceCents / 100).toFixed(2)}`;
    const quantity = cartItem.quantity;

  pageHtml += `

          <div class="cart-item-container js-item-container" data-id="${id}">
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
                  <span class="update-quantity-link js-update-button link-primary" data-type="update">
                    Update
                  </span>
                    <div class="js-show-input">
                        <input type="text" class="js-input-element">
                        <span class="link-primary js-save-quantity" data-type="save">Save</span>
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

orderContainer.innerHTML = pageHtml;
})

// Event Listeners

const itemContainer = document.querySelectorAll('.js-item-container');

itemContainer.forEach(container => {
  container.addEventListener('click', (event) => {

    const button = event.target;
    const buttonType = button.dataset.type; 

    if (!buttonType) {
      return;
    }
    
    handleEvents(buttonType, container)
    checkoutQuantity.innerHTML = `${ updateCartQuantity() } items`
  })
})

function handleEvents(buttonType, container) {
  
  const updateButton = container.querySelector('.js-update-button');
  const inputContainer = container.querySelector('.js-show-input');
  const {id} = container.dataset;
  const item = cart.find(cartItem => id === cartItem.id);

  if(buttonType === 'update') {
    updateButton.classList.add('hidden');
    inputContainer.classList.add('show');

  } else if (buttonType === 'save') {

    const inputElement = container.querySelector('.js-input-element');
    let quantity = inputElement.value;
    quantity = Number(quantity);
    
      if (item) {
        item.quantity = quantity;
        container.querySelector('.js-item-quantity').innerHTML = item.quantity;
      }

    inputElement.value = '';
    updateButton.classList.remove('hidden');
    inputContainer.classList.remove('show');

  } else if (buttonType === 'delete') {
    container.remove();
    cart.splice(cart.indexOf(item), 1);
  }

  saveCartLocal();
}
