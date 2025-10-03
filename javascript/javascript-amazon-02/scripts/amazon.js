import { products } from '../data/products.js';
import { addToCart, updateCartQuantity } from '../data/cart.js';

// Variables

let pageHtml = '';
const pageContainer = document.querySelector('.js-page-container');

// Generating the HTML

document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

products.forEach(product => {

	const id = product.id;
	const image = product.image;
	const name = product.name;
	const price = `$${(product.priceCents / 100).toFixed(2)}`;
	const stars = (product.rating.stars * 10);
	const count = product.rating.count;


	pageHtml += `


        <div class="product-container js-product-container" 
	data-id="${id}">
          <div class="product-image-container">
            <img class="product-image"
              src="${image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
		${name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${stars}.png">
            <div class="product-rating-count link-primary">
              87
            </div>
          </div>

          <div class="product-price">
		${price}
          </div>

          <div class="product-quantity-container">
            <select class="js-select-quantity">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-pop-up-${id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
		data-type="add-button">
            Add to Cart
          </button>
        </div>
`
pageContainer.innerHTML = pageHtml;
})

// Event Listeners

const productContainer = document.querySelectorAll('.js-product-container');

productContainer.forEach(container => {

	container.addEventListener('click', (event) => {

		const {id} = container.dataset;
		const button = event.target;	
		const buttonType = button.dataset.type;	

		if (!buttonType) {
			return;
    	};
    
        if (buttonType === 'add-button') {
            const selectElement = container.querySelector('.js-select-quantity');
            let quantity = selectElement.value;
            quantity = Number(quantity);

            addToCart(id, quantity);

        }
	})	
})
