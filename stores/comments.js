import { defineStore } from "pinia";

export const useCommentsStore = defineStore("comments", () => {
  async function getCommentsForProduct(product_id) {
    return {
      "comments":
      [
          {
            "id": 1,
            "name": "User 1",
            "text": "loved it!!! <3",
            "stars": 5,
            "created_at": "2024-07-26 00:30:05"
          },
          {
            "id": 2,
            "name": "User 1",
            "text": "norm",
            "stars": 3,
            "created_at": "2024-07-26 00:30:05"
          },
          {
            "id": 3,
            "name": "User 1",
            "text": "I'd put zero if I could.",
            "stars": 1,
            "created_at": "2024-07-26 00:30:05"
          },
          {
            "id": 4,
            "name": "User 2",
            "text": "amazing!!",
            "stars": 5,
            "created_at": "2024-07-26 00:30:05"
          },
          {
            "id": 5,
            "name": "User 2",
            "text": "norm",
            "stars": 3,
            "created_at": "2024-07-26 00:30:05"
          },
          {
            "id": 6,
            "name": "User 1",
            "text": "slay",
            "stars": 5,
            "created_at": "2024-07-26 00:30:05"
          },
          {
            "id": 7,
            "name": "User 1",
            "text": "through beneditcions~",
            "stars": 5,
            "created_at": "2024-07-26 00:30:05"
          }
        ],
    };
  }

  async function getStarsForProduct(product_id) {
    return {
      "stars": 3.9,
      "amount_of_comments": 7,
    };
  }
  
  async function getStarStatisticsForProduct(product_id) {
    return {
      "1": 1,
      "2": 0,
      "3": 2,
      "4": 0,
      "5": 4
    };
  }
  
  async function getCommentsWithSpecificStars(stars) {
    
  }
  
  return { getCommentsForProduct, getStarsForProduct, getStarStatisticsForProduct, getCommentsWithSpecificStars };
});
