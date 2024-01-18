import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  // Retrieve the existing cart from local storage
  const existingCart = getLocalStorage("so-cart");

  // Check if existingCart is an array; if not, initialize an empty array
  const updatedCart = Array.isArray(existingCart) ? existingCart : [];

  // Add the new product to the existing cart array
  updatedCart.push(product);

  setLocalStorage("so-cart", updatedCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
