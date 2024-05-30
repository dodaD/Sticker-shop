import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  const response = {
    products: [
      {
        id: 1,
        title: "sticker frog",
        datetime: "2024-05-14 13:00:00",
        imgURL: "/images/kidd.png",
        price: "1.15",
        type: "sticker",
        size: "large",
        theme: "frog",
      },
      {
        id: 2,
        title: "sticker flower",
        datetime: "2024-05-14 13:00:00",
        imgURL: "/images/kidd.png",
        price: "1.00",
        type: "sticker",
        size: "small",
        theme: "flower",
      },
      {
        id: 3,
        title: "sticker flower",
        datetime: "2024-05-14 13:00:00",
        imgURL: "/images/kidd.png",
        price: "1.00",
        type: "sticker",
        size: "large",
        theme: "flower",
      },
      {
        id: 4,
        title: "postcard sun",
        datetime: "2024-05-14 13:00:00",
        imgURL: "/images/kidd.png",
        price: "1.00",
        type: "postcard",
        size: "large",
        theme: "sun",
      },
    ],
  };

  return { response };
});
