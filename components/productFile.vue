<template>
  <div
    class="flex flex-col hover:bg-stone-200/65 hover:rounded-md z-0 justify-center items-center p-[10px] translate-y-[-10px] w-fit">
    <img v-if="img" :src="'/images/' + img" class="w-[260px] h-[370px]" />
    <span class="mx-auto"> {{ title }} </span>
    <span class="mx-auto mb-2"> {{ price }} </span>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  price: Number,
  img: String,
});
</script>

<style>
.title {
  font-size: 20px;
}
</style>
