import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  let response = {};

  async function getProducts() {
    return {
      "products": [
        {
          "id": 1,
          "created_at": null,
          "updated_at": null,
          "title": "Abedo Portrait Sticker, Genshin",
          "imgURL": "albedo.jpg",
          "theme": "Genshin Impact",
          "size": "small",
          "type": "sticker",
          "price": 0.5,
          "description": "Wonderfull sticker of glorified alchemic Albedo"
        },
        {
          "id": 2,
          "created_at": null,
          "updated_at": null,
          "title": "Beidou 3/4 Sticker, Genshin",
          "imgURL": "beidou.jpg",
          "theme": "Genshin Impact",
          "size": "large",
          "type": "sticker",
          "price": 1.5,
          "description": ""
        },
        {
          "id": 3,
          "created_at": null,
          "updated_at": null,
          "title": "Gan Yun Portrait Sticker, Genshin",
          "imgURL": "gan_yun.jpg",
          "theme": "Genshin Impact",
          "size": "small",
          "type": "sticker",
          "price": 0.5,
          "description": ""
        },
        {
          "id": 4,
          "created_at": null,
          "updated_at": null,
          "title": "Kazuha Sticker, Genshin",
          "imgURL": "kazuha.jpg",
          "theme": "Genshin Impact",
          "size": "medium",
          "type": "sticker",
          "price": 1,
          "description": ""
        },
        {
          "id": 5,
          "created_at": null,
          "updated_at": null,
          "title": "Tighnari Half Body Sticker, Genshin",
          "imgURL": "tignari.jpg",
          "theme": "Genshin Impact",
          "size": "medium",
          "type": "sticker",
          "price": 1,
          "description": ""
        },
        {
          "id": 6,
          "created_at": null,
          "updated_at": null,
          "title": "Venti with Flowers Sticker, Genshin",
          "imgURL": "venti.jpg",
          "theme": "Genshin Impact",
          "size": "large",
          "type": "sticker",
          "price": 1.5,
          "description": ""
        },
        {
          "id": 7,
          "created_at": null,
          "updated_at": null,
          "title": "Xiao Sticker, Genshin",
          "imgURL": "xiao.jpg",
          "theme": "Genshin Impact",
          "size": "small",
          "type": "sticker",
          "price": 0.5,
          "description": ""
        },
        {
          "id": 8,
          "created_at": null,
          "updated_at": null,
          "title": "Kidd Iconic Postcard, Soul Eater",
          "imgURL": "kidd.png",
          "theme": "Soul Eater",
          "size": "large",
          "type": "postcard",
          "price": 2,
          "description": "Oh come on, you DO need it. And now just order it"
        }
      ]
    }; 
  }

  async function getAnotherOptionForProduct(option_id) {
    return {
      "pictures_for_this": [
      {
        "id": 15,
        "created_at": null,
        "updated_at": null,
        "imgURL": "kazuha.jpg",
        "product_id": 1,
        "optinal": 1
      },
      {
        "id": 16,
        "created_at": null,
        "updated_at": null,
        "imgURL": "kazuha.jpg",
        "product_id": 1,
        "optinal": 1
      },
      {
        "id": 17,
        "created_at": null,
        "updated_at": null,
        "imgURL": "kazuha.jpg",
        "product_id": 1,
        "optinal": 0
      },
    ]}
  }

  async function getSpecificProduct(product_id) {
    return {
      "options_for_product": [
        {
          "id": 15,
          "created_at": null,
          "updated_at": null,
          "imgURL": "albedo.jpg",
          "product_id": 1,
          "optinal": 1,
          "name": "whatever"
        },
        {
          "id": 16,
          "created_at": null,
          "updated_at": null,
          "imgURL": "kazuha.jpg",
          "product_id": 1,
          "optinal": 1,
          "name": "something cool"
        }
      ],
      "pictures_for_product": [
        {
          "id": 15,
          "created_at": null,
          "updated_at": null,
          "imgURL": "albedo.jpg",
          "product_id": 1,
          "optinal": 1
        },
        {
          "id": 16,
          "created_at": null,
          "updated_at": null,
          "imgURL": "kazuha.jpg",
          "product_id": 1,
          "optinal": 1
        },
        {
          "id": 17,
          "created_at": null,
          "updated_at": null,
          "imgURL": "xiao.jpg",
          "product_id": 1,
          "optinal": 0
        },
        {
          "id": 18,
          "created_at": null,
          "updated_at": null,
          "imgURL": "albedo.jpg",
          "product_id": 1,
          "optinal": 1
        },
        {
          "id": 19,
          "created_at": null,
          "updated_at": null,
          "imgURL": "kazuha.jpg",
          "product_id": 1,
          "optinal": 1
        },
        {
          "id": 20,
          "created_at": null,
          "updated_at": null,
          "imgURL": "xiao.jpg",
          "product_id": 1,
          "optinal": 0
        },{
          "id": 21,
          "created_at": null,
          "updated_at": null,
          "imgURL": "xiao.jpg",
          "product_id": 1,
          "optinal": 0
        },{
          "id": 22,
          "created_at": null,
          "updated_at": null,
          "imgURL": "xiao.jpg",
          "product_id": 1,
          "optinal": 0
        },{
          "id": 23,
          "created_at": null,
          "updated_at": null,
          "imgURL": "xiao.jpg",
          "product_id": 1,
          "optinal": 0
        },

      ]
    };
  }

  async function getYouMightLikeProducts(product_id) {
    return {
      "products": [
        {
          "id": 1,
          "created_at": null,
          "updated_at": null,
          "title": "Abedo Portrait Sticker, Genshin",
          "imgURL": "albedo.jpg",
          "theme": "Genshin Impact",
          "size": "small",
          "type": "sticker",
          "price": 0.5,
          "description": "Wonderfull sticker of glorified alchemic Albedo"
        },
        {
          "id": 2,
          "created_at": null,
          "updated_at": null,
          "title": "Beidou 3/4 Sticker, Genshin",
          "imgURL": "beidou.jpg",
          "theme": "Genshin Impact",
          "size": "large",
          "type": "sticker",
          "price": 1.5,
          "description": ""
        },
        {
          "id": 3,
          "created_at": null,
          "updated_at": null,
          "title": "Gan Yun Portrait Sticker, Genshin",
          "imgURL": "gan_yun.jpg",
          "theme": "Genshin Impact",
          "size": "small",
          "type": "sticker",
          "price": 0.5,
          "description": ""
        },
        {
          "id": 4,
          "created_at": null,
          "updated_at": null,
          "title": "Kazuha Sticker, Genshin",
          "imgURL": "kazuha.jpg",
          "theme": "Genshin Impact",
          "size": "medium",
          "type": "sticker",
          "price": 1,
          "description": ""
        },
        {
          "id": 5,
          "created_at": null,
          "updated_at": null,
          "title": "Tighnari Half Body Sticker, Genshin",
          "imgURL": "tignari.jpg",
          "theme": "Genshin Impact",
          "size": "medium",
          "type": "sticker",
          "price": 1,
          "description": ""
        },
        {
          "id": 6,
          "created_at": null,
          "updated_at": null,
          "title": "Venti with Flowers Sticker, Genshin",
          "imgURL": "venti.jpg",
          "theme": "Genshin Impact",
          "size": "large",
          "type": "sticker",
          "price": 1.5,
          "description": ""
        },
        {
          "id": 7,
          "created_at": null,
          "updated_at": null,
          "title": "Xiao Sticker, Genshin",
          "imgURL": "xiao.jpg",
          "theme": "Genshin Impact",
          "size": "small",
          "type": "sticker",
          "price": 0.5,
          "description": ""
        },
        {
          "id": 8,
          "created_at": null,
          "updated_at": null,
          "title": "Kidd Iconic Postcard, Soul Eater",
          "imgURL": "kidd.png",
          "theme": "Soul Eater",
          "size": "large",
          "type": "postcard",
          "price": 2,
          "description": "Oh come on, you DO need it. And now just order it"
        }
      ]
    };
  }

  return { response, getProducts, getSpecificProduct, getYouMightLikeProducts, getAnotherOptionForProduct };
});
