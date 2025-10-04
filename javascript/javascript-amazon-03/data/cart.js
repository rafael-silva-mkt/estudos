// Variables
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Functions

function addToCart(id, quantity) {

  const sameItem = cart.find(cartItem => cartItem.id === id);

  if(sameItem) {
    sameItem.quantity += quantity;
  } else {
    cart.push({
      id,
      quantity
    })
  }
  saveCartLocal();
}

function saveCartLocal(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach(cartItem => cartQuantity += cartItem.quantity);

  return cartQuantity;
}

//Exports

export { addToCart, saveCartLocal, cart, updateCartQuantity };

