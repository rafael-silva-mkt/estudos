// Imports
import { products } from '../data/products.js';

// Variables
const htmlContainer = document.querySelector('.js-html-container');
let pageHtml = '';

// Generating HTML

products.forEach(product => {

  const id = product.id;
  const img = product.image;
  const name = product.name;
  const price = ${( product.priceCents / 100 ).toFixed(2)};

})

// Event Listeners
