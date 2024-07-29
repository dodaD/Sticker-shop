import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  let response = {};

  async function getProducts() {
    const response = await fetch('http://localhost/api/products');
    const json = await response.json();
    return json;
  }

  async function getAdditionalPicturesForProduct(product_id) {
    const response = await fetch('http://localhost/api/additional_pictures/' + product_id);
    const json = await response.json();
    return json;
  }

  async function getCommentsForProduct(product_id) {
    const response = await fetch('http://localhost/api/comments/' + product_id);
    const json = await response.json();
    return json;
  }

  async function getStarsForProduct(product_id) {
    const response = await fetch('http://localhost/api/comments/get_stars/' + product_id);
    const json = await response.json();
    return json;
  }

  async function getStarStatisticsForProduct(product_id) {
    const response = await fetch('http://localhost/api/comments/get_stars_statistics/' + product_id);
    const json = await response.json();
    return json;
  }

  return { response, getProducts, getAdditionalPicturesForProduct, getCommentsForProduct, getStarsForProduct, getStarStatisticsForProduct };
});
