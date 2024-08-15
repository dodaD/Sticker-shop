import { defineStore } from "pinia";

export const useCommentsStore = defineStore("comments", () => {
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

  async function getCommentsWithSpecificStars(product_id, stars) {
    const response = await fetch('http://localhost/api/comments/get_comments_with_stars/' + product_id + '/' + stars);
    const json = await response.json();
    return json;
  }

  return { getCommentsForProduct, getStarsForProduct, getStarStatisticsForProduct, getCommentsWithSpecificStars };
});
