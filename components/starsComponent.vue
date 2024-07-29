<script setup>
const props = defineProps({
  stars: Number,
});

</script>

<template>
  <div class="block  overflow-hidden w-fit ml-auto flex">
    <div class="inline-block relative h-[100%]">
      <span class="block active-star overflow-hidden text-amber-200 whitespace-nowrap relative z-40">
        <font-awesome-icon :icon="['fas', 'star']" v-for="i in 5" aria-hidden="true" />
      </span>

      <span class="absolute text-slate-200 top-0 left-0 stars-inactive">
        <font-awesome-icon :icon="['fas', 'star']" v-for="i in 5" />
      </span>
    </div>
  </div>

</template>

<style scoped>
.stars-inactive {
  -webkit-text-stroke: initial;
}

.active-star {
  width: v-bind(props.stars + '%');
}
</style>
