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

    // Add event listeners to quantity input fields
    const quantityInputs = document.querySelectorAll(".cart-card__quantity-input");
    quantityInputs.forEach(input => {
      input.addEventListener("change", function(event) {
        const itemId = event.target.getAttribute("data-id");
        const newQuantity = parseInt(event.target.value);
        updateCartItemQuantity(itemId, newQuantity);
      });
    });
  } else {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
  }
  const btns = document.querySelectorAll(".remove-item");
  // console.log(btns);
  btns.forEach(item=>{
    // console.log(item)
    item.addEventListener("click", function(event) {
      if (event.target.classList.contains("remove-item")) {
        const itemId = event.target.getAttribute("data-id");
        removeFromCart(itemId);
      }
    }
)
  })
}

/// Function to create a template for a cart item
function cartItemTemplate(item) {
  // HTML template for a cart item
  const newItem = `<li class="cart-card divider">
  <button class="remove-item" data-id="${item.Id}">X</button>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p>Quantity: <input type="number" class="cart-card__quantity-input" data-id="${item.Id}" value="${item.quantity}" min="1"></p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

// Function to update quantity of a cart item
function updateCartItemQuantity(itemId, newQuantity) {
  let cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];

  // Update the quantity of the item with the given id
  cartItems.forEach(item => {
    if (item.Id === itemId) {
      item.quantity = newQuantity;
    }
  });

  // Update localStorage
  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  // Re-render cart contents
  renderCartContents();
}
//Get cart total
document.addEventListener("DOMContentLoaded", function () {
  // Check if there are items in the cart

  let cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  if (cartItems.length > 0) {
    // If there are items, show the cart-footer element
    document.querySelector(".cart-footer").classList.remove("hide");

    // Log the contents of each item in the cartItems array
    cartItems.forEach((item, index) => {
      //console.log(`Item ${index + 1}:`, item);
    });

    // Calculate the total cost of items in the cart
    let total = 0;
    cartItems.forEach((item) => {
      // Ensure that item has properties named 'price' and 'quantity'
      if ("FinalPrice" in item) {
         total += item.FinalPrice * item.quantity;
      } else {
        console.error("Item is missing 'price' or 'quantity' property:", item);
      }
    });
    //console.log(total);

    // Display the total in the HTML element with id "totalAmount"
    document.getElementById("totalAmount").innerText = `$${total.toFixed(2)}`;
  }
});

// Remove item from cart
function removeFromCart(itemIdToRemove) {
  let cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];

  // Remove the item with the given id
  cartItems = cartItems.filter(item => item.Id !== itemIdToRemove);

  // Update localStorage
  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  // Re-render cart contents
  renderCartContents();

  cartItems.forEach((item, index) => {
    //console.log(`Item ${index + 1}:`, item);
  });

  // Calculate the total cost of items in the cart
  let total = 0;
  cartItems.forEach((item) => {
    // Ensure that item has properties named 'price' and 'quantity'
    if ("FinalPrice" in item) {
      //  && "quantity" in item
      total += item.FinalPrice * item.quantity;
    } else {
      console.error("Item is missing 'price' or 'quantity' property:", item);
    }
  });
  // console.log(total);

  // Display the total in the HTML element with id "totalAmount"
  document.getElementById("totalAmount").innerText = `$${total.toFixed(2)}`;

}





// Call the renderCartContents function to initially render cart contents on page load
renderCartContents();
