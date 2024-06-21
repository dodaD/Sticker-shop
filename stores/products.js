import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  const response = {
    products: [
      {
        id: 1,
        title: "a sticker frog",
        datetime: "2024-05-14 13:00:00",
        imgURL: "/images/kidd.png",
        price: "1.15",
        type: "sticker",
        size: "large",
        theme: "frog",
      },
      {
        id: 2,
        title: "d sticker flower",
        datetime: "2024-05-14 13:00:00",
        imgURL: "/images/kidd.png",
        price: "0.50",
        type: "sticker",
        size: "small",
        theme: "15-inch laptop",
      },
      {
        id: 3,
        title: "k sticker flower",
        datetime: "2024-05-14 13:00:00",
        imgURL: "/images/kidd.png",
        price: "1.50",
        type: "sticker",
        size: "large",
        theme: "flower",
      },
      {
        id: 4,
        title: "c postcard sun",
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
