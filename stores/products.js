import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  let response = {};

  async function getProducts() {
    const response = await fetch('http://localhost/api/products');
    const json = await response.json();
    return json;
  }

  return { response, getProducts };
});
