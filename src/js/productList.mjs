import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";
// import { renderWithTemplate } from "./utils.mjs";

function productCardtemplate(product) {
  // Calculate discounted price
  const originalPrice = product.FinalPrice;
  const discountPercentage = .2;
  const discountAmount = originalPrice * discountPercentage;
  const discountPrice = (1 - discountPercentage) * originalPrice;

  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">Original Price: $${product.FinalPrice}</p></a>
    <p class="product-card__price">Current Price: $${discountPrice.toFixed(2)}</p>
    <p class="product-card__discount">Save $${discountAmount.toFixed(2)} (${Math.round(20)}% off)</p>
  </li>`;
}

export default async function productList(selector, category) {

  // get the element we will insert the list into from the selector
  const elem = document.querySelector(selector);

  // get the list of products 
  const products = await getData(category);

  //check this
  console.log(products);

  // render out the product list to the element
  renderListWithTemplate(productCardtemplate, elem, products);
  document.querySelector(".title").innerHTML = category.toUpperCase();

}