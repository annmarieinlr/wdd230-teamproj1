// Importing the getLocalStorage function from the utils.mjs module
import { getLocalStorage } from "./utils.mjs";

// Function to render cart contents on the page
function renderCartContents() {
  // Get cart items from local storage
  const cartItems = getLocalStorage("so-cart");

  // Check if cartItems is not null
  if (cartItems != null) {

    // Map through cart items and create HTML templates for each item
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));

    // Set the inner HTML of the product-list element with the joined HTML templates
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } else {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
  }
}

/// Function to create a template for a cart item
function cartItemTemplate(item) {
  // HTML template for a cart item
  const newItem = `<li class="cart-card divider">
  <button class="remove-item" data-id="${item.itemId}">X</button>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}
//Get cart total
document.addEventListener("DOMContentLoaded", function () {
  // Check if there are items in the cart

  let cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  console.log(cartItems);
  if (cartItems.length > 0) {
    // If there are items, show the cart-footer element
    document.querySelector(".cart-footer").classList.remove("hide");

    // Log the contents of each item in the cartItems array
    cartItems.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, item);
    });

    // Calculate the total cost of items in the cart
    let total = 0;
    cartItems.forEach((item) => {
      // Ensure that item has properties named 'price' and 'quantity'
      if ("FinalPrice" in item) {
        //  && "quantity" in item
        total += item.FinalPrice; // * item.quantity
      } else {
        console.error("Item is missing 'price' or 'quantity' property:", item);
      }
    });
    console.log(total);

    // Display the total in the HTML element with id "totalAmount"
    document.getElementById("totalAmount").innerText = `$${total.toFixed(2)}`;
  }
});

// Remove item from cart
function removeFromCart(item) {
  let cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];

  // Remove the item with the given id
  // eslint-disable-next-line no-shadow
  cartItems = cartItems.filter(item => item.itemId !== item.itemId);

  // Update localStorage
  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  // Re-render cart contents
  renderCartContents();
}

// Event delegation to handle remove item button clicks
document.querySelector(".product-list").addEventListener("click", function(event) {
  if (event.target.classList.contains("remove-item")) {
    const itemId = event.target.getAttribute("data-id");
    removeFromCart(itemId);
  }
});

// Call the renderCartContents function to initially render cart contents on page load
renderCartContents();
