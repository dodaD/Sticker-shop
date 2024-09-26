<script setup>

</script>

<template>
  <button
      @click="bigPictureSwiperNextSlide"
      v-if="isNextSlideOnPictures"
      class="absolute top-[50%] right-0 translate-y-[-50%] bg-white rounded-full h-[60px] w-[60px] cursor z-50 border-[1px] border-slate-200 flex items-center justify-center"
  >
    <font-awesome-icon :icon="['fas', 'chevron-right']" />
  </button>
</template>
