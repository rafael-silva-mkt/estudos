//=======================================//
const cart = JSON.parse(localStorage.getItem('cart')) || [];

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
  saveCartLocal()
}

function saveCartLocal() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartQuantity() {

  let cartQuantity = 0;

  cart.forEach(cartItem => cartQuantity += cartItem.quantity);

  return cartQuantity;
}

//=======================================//

export { addToCart, updateCartQuantity };
