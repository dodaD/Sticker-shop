export default defineNuxtConfig({
  css: [
    "@/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  modules: [
    "@pinia/nuxt",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  build: {
    transpile: ["@fortawesome/vue-fontawesome"],
  },
});
