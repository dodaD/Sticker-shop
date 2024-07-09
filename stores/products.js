import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  let response = {
    "products": [
      {
        "id": 0,
        "created_at": null,
        "updated_at": null,
        "title": "",
        "imgURL": "",
        "theme": "",
        "size": "",
        "type": "",
        "price": ""
      }]
  };

  return { response };
});
