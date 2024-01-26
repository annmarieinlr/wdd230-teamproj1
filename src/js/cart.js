import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
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

document.addEventListener("DOMContentLoaded", function () {
  // Check if there are items in the cart
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  if (cartItems.length > 0) {
      // Show the cart-footer element
      document.querySelector(".cart-footer").classList.remove("hide");

      // Calculate the total cost
      let total = 0;
      cartItems.forEach(item => {
          total += item.price * item.quantity;
      });

      // Display the total in the HTML element
      document.getElementById("totalAmount").innerText = `$${total.toFixed(2)}`;
  }
});

renderCartContents();
