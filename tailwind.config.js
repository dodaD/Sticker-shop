/** @type {import('tailwindcss').Config} */
export default {
  content: ["pages/*.vue", "components/*.vue"],
  theme: {
    extend: {
      aspectRatio: {
        "5/7": "1 / 1",
      },
    },
  },
  plugins: [],
};
