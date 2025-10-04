const cart = JSON.parse(localStorage.getItem('cart')) || [];
let timeoutId;

//=======================================//

function addToCart(id, quantity) {

  const sameItem = cart.find(cartItem => id === cartItem.id);

  if(sameItem) {
    sameItem.quantity += quantity;
  } else {
    cart.push({
      id,
      quantity
    })
  }
  popUpMessage(id);
  saveCartLocal();
}

function saveCartLocal() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

//=======================================//

function popUpMessage(id) {

  const message = document.querySelector(`.js-container-${id}`);
  message.classList.add('show');

  if (message.timeoutId === timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    message.classList.remove('show');
  }, 2000)

  message.timeoutId = timeoutId;

}

//=======================================//

function updateCartQuantity() {

  let cartQuantity = 0;

  cart.forEach(cartItem => cartQuantity += cartItem.quantity);

  return cartQuantity;
}

export { addToCart, saveCartLocal, cart, updateCartQuantity };
