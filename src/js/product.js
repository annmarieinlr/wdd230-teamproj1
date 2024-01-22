import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getParam } from './utils.mjs';



//function addProductToCart(product) {
//setLocalStorage("so-cart", product);
//}

function addProductToCart(product) {
  // Get the existing cart items from local storage
  const existingCart = getLocalStorage("so-cart") || [];

  // Add the new product to the cart
  existingCart.push(product);

  // Save the updated cart back to local storage
  setLocalStorage("so-cart", existingCart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Test getParam()
const productId = getParam('product');
console.log(findProductById(productId));

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

