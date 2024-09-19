<template>
  <div
    class="w-fit max-w-[100%] mx-auto xl:min-w-[1160px] md:max-w-[580px] lg:min-w-[910px] items-center flex-col flex sm:block py-2 px-2">
    <slot />
  </div>
</template>

<style>
.underline-animation {
  background:
    linear-gradient(to right, transparent, transparent),
    linear-gradient(to right, rgb(0, 0, 0), rgb(0, 0, 0));
  background-size: 100% 0.1em, 0 0.1em;
  background-position: 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 400ms;
}

.underline-animation-line-move,
.clear-all-button:hover {
  background-size: 0 0.1em, 100% 0.1em;
}
</style>
