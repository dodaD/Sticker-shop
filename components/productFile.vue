<template>
  <div class="flex flex-col hover:bg-stone-200/65 hover:rounded-md z-0 justify-center items-center">
    <img v-if="img" :src="img" class="w-[260px] h-[370px]" />
    <span class="mx-auto"> {{ title }} </span>
    <span class="mx-auto mb-2"> {{ price }} </span>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  price: String,
  img: String,
});
</script>

<style>
.title {
  font-size: 20px;
}
</style>
