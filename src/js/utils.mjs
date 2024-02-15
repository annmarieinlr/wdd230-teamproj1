// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
//export function getLocalStorage(key) {
//return JSON.parse(localStorage.getItem(key));
//}

// Function to get data from local storage
export function getLocalStorage(key) {
  const storedData = localStorage.getItem(key);
  return JSON.parse(storedData);
}
// save data to local storage
//export function setLocalStorage(key, data) {
//localStorage.setItem(key, JSON.stringify(data));
//}

// Function to set data in local storage
export function setLocalStorage(key, data) {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem(key, stringifiedData);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Get url for the product
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  // const product = urlParams.get("product");

  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerElem = document.querySelector("#main-header");
  const footerElem = document.querySelector("#main-footer");
  renderWithTemplate(headerTemplateFn, headerElem);
  renderWithTemplate(footerTemplateFn, footerElem);
}