// Variables
const cart = JSON.parse(localStorage.getItem('cart')) || [];
let timeoutId;

// Functions

function addToCart(id, quantity) {

    const sameItem = cart.find(cartItem => cartItem.id === id);

    if (sameItem) {
        sameItem.quantity += quantity;
    } else {
        cart.push({
            id,
            quantity
        })
    }
    document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
    saveCartLocal();
    popUpMessage(id);
}

function popUpMessage(id) {
  const container = document.querySelector(`.js-pop-up-${id}`);

  container.classList.add('visible');

  timeoutId = setTimeout(() => {
    
    container.classList.remove('visible');
  }, 2000)
}

function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach(cartItem => cartQuantity += cartItem.quantity);

    return cartQuantity;
}

function saveCartLocal() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Exports

export { cart, saveCartLocal, addToCart, updateCartQuantity };
