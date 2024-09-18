import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  let response = {};

  async function getProducts() {
    const response = await fetch('http://localhost/api/products');
    const json = await response.json();
    return json;
  }

  async function getSpecificProduct(product_id) {
    const response = await fetch('http://localhost/api/products/get_specific_product/' + product_id);
    const json = await response.json();
    return json;
  }

  async function getYouMightLikeProducts(product_id) {
    const response = await fetch('http://localhost/api/products/get_you_might_like/' + product_id);
    const json = await response.json();
    return json;
  }

  async function getAnotherOptionForProduct(option_id) {
    const response = await fetch('http://localhost/api/options/' + option_id);
    const json = await response.json();
    return json;
  }

  return { response, getProducts, getSpecificProduct, getYouMightLikeProducts, getAnotherOptionForProduct };
});
