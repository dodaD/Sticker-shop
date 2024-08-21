import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(({ $router }) => {
  $router.options.scrollBehavior = (to: { hash }, from, savedPosition) => {
    return { top: 0 }
  }
})
