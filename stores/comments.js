import { defineStore } from "pinia";

export const useCommentsStore = defineStore("comments", () => {
  async function getCommentsForProduct(product_id) {
    return {
      "comments": {
        "current_page": 1,
        "data": [
          {
            "id": 1,
            "name": "User 1",
            "text": "loved it!!! <3",
            "stars": 5,
            "created_at": "2024-07-26 00:30:05"
          },
          {
            "id": 2,
            "name": "User 2",
            "text": "slay",
            "stars": 5,
            "created_at": "2024-07-26 00:30:05"
          }
        ],
        "first_page_url": "http://example.com/api/comments?product_id=1&page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "http://example.com/api/comments?product_id=1&page=1",
        "next_page_url": null,
        "path": "http://example.com/api/comments",
        "per_page": 2,
        "prev_page_url": null,
        "to": 2,
        "total": 2
      }
    };
  }

  async function getStarsForProduct(product_id) {
    return {
      "stars": 4.0,
      "amount_of_comments": 4,
    };
  }

  async function getStarStatisticsForProduct(product_id) {
    return {
      "1": 1,
      "2": 0,
      "3": 2,
      "4": 0,
      "5": 4
    }
  }

  async function getCommentsWithSpecificStars(product_id, stars) {
    return {
      "comments": {
        "current_page": 1,
        "data": [
          {
            "id": 1,
            "name": "User 1",
            "text": "loved it!!! <3",
            "stars": 5,
            "created_at": "2024-07-26 00:30:05"
          },
          {
            "id": 6,
            "name": "User 2",
            "text": "slay",
            "stars": 5,
            "created_at": "2024-07-26 00:30:05"
          }
        ],
        "first_page_url": "http://example.com/api/comments?product_id=1&stars=5&page=1",
        "from": 1,
        "last_page": 2,
        "last_page_url": "http://example.com/api/comments?product_id=1&stars=5&page=2",
        "next_page_url": "http://example.com/api/comments?product_id=1&stars=5&page=2",
        "path": "http://example.com/api/comments",
        "per_page": 2,
        "prev_page_url": null,
        "to": 2,
        "total": 3
      }
    }  }

  return { getCommentsForProduct, getStarsForProduct, getStarStatisticsForProduct, getCommentsWithSpecificStars };
});
