<script setup>
const props = defineProps(['isShowing']);
</script>

<template>
  <button @click="$emit('nextSlide')" v-if="props.isShowing"
    class="absolute top-[50%] right-0 translate-x-[-50%] translate-y-[-50%] bg-white rounded-full h-[60px] w-[60px] cursor z-50 border-[1px] border-slate-200 flex items-center justify-center">
    <font-awesome-icon :icon="['fas', 'chevron-right']" />
  </button>
</template>
