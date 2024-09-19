<template>
  <div
    class="flex flex-col hover:bg-stone-200/65 rounded-md z-0 justify-center items-center p-[10px] translate-y-[-10px] w-fit"
    @click="openProductProfile">
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
  id: Number,
});

async function openProductProfile() {
  await navigateTo({ path: '/products/' + props.id });
}
</script>
