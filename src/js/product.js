import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
<<<<<<< HEAD
import { loadHeaderFooter } from "./utils.mjs";
=======
>>>>>>> 5eaa90950e4ed8adb3f98bd8d7b2dd7da2ecf8a9

// add to cart button event handler

// Function to render cart contents on the page
// function renderCartContents() {
//   // Get cart items from local storage
//   const cartItems = getLocalStorage("so-cart");

//   // Map through cart items and create HTML templates for each item
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));

//   // Set the inner HTML of the product-list element with the joined HTML templates
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// Test getParam()
const productId = getParam("product");
productDetails(productId);
