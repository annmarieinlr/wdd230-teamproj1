import { getData } from "./productData.mjs";

function productCardtemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">Marmot</h3>
      <h2 class="card__name">Ajax Tent - 3-Person, 3-Season</h2>
      <p class="product-card__price">$199.99</p></a
    >
  </li>`
}

export default async function productList(selector, category) {
    
    // get the element we will insert the list into from the selector
    const elem = document.querySelector(selector);
    
    // get the list of products 
    const products = await getData(category);
        //check this
    console.log(products);

    // render out the product list to the element
    
}