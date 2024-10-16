<template>
  <div
    class="w-fit
    mx-auto 
    xl:min-w-[1160px]
    md:max-w-[800px]
    lg:min-w-[910px]
    max-w-[100%]
    items-center
    flex-col
    flex 
    sm:block
    py-2 
    px-2
    w-full">
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
