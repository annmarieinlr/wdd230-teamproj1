import { getData } from "./productData.mjs";
import { renderList } from "./utils.mjs";
function productCardtemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.FinalPrice}</p></a
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
    renderList(productCardtemplate, elem, products);
    
}