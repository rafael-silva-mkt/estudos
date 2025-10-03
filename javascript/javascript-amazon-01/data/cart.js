/* ==================== !!** Variables **!! ==================== */
const cart = JSON.parse(localStorage.getItem('cart')) || [];

/* ==================== !!** Functions **!! ==================== */

function addToCart(id, quantity) {

  const matchingItem = cart.find(cartItem => id === cartItem.id);

  matchingItem ? matchingItem.quantity += quantity : cart.push({id, quantity});

  saveCartLocal();
}

/* ===== ===== ===== ===== */

function saveCartLocal() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/* ===== ===== ===== ===== */

function updateCartQuantity() {

  let cartQuantity = 0;

  cart.forEach(cartItem => cartQuantity += cartItem.quantity);

  return cartQuantity;

}

/* ==================== !!** Exports **!! ==================== */

export { addToCart, updateCartQuantity, cart, saveCartLocal }