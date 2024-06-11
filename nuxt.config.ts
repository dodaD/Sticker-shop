export default defineNuxtConfig({
  css: [
    "@/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  modules: [
    // ...
    "@pinia/nuxt",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["@fortawesome/vue-fontawesome"],
  },
});
