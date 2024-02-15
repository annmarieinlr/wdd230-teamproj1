const baseURL = import.meta.env.VITE_SERVER_URL;

// Function to convert the response to JSON or throw an error for non-ok responses
function convertToJson(res) {
  // Check if the response is ok
  if (res.ok) {
    // If ok, parse the response body as JSON and return the result
    return res.json();
  } else {
    // If not ok, throw an error with a message "Bad Response"
    throw new Error("Bad Response");
  }
}

// // Function to fetch data from a JSON file based on the specified category (default: "tents")
// export function getData(category = "tents") {
//   // Use the fetch API to get JSON data from the specified file in the "json" folder
//   return fetch(`../json/${category}.json`)
//     // Convert the response to JSON using the convertToJson function
//     .then(convertToJson)
//     // Return the resulting data
//     .then((data) => data);
// }

export async function getData(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

// // Asynchronous function to find a product by its ID
// export async function findProductById(id) {
//   // Wait for the data to be fetched using the getData function
//   const products = await getData();
//   // Find the product in the array of products with a matching ID
//   return products.find((item) => item.Id === id);
// }



export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

