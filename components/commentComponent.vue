<script setup>
const props = defineProps({
  text: String,
  date: String,
  stars: Number,
  name: String,
});

const createdAt = ref('');
const date = ref(new Date(props.date));
const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
createdAt.value = date.value.toLocaleString('en-US', options);
</script>


<template>
  <div class="w-[98%] h-fit flex flex-col border-[1px] rounded-lg p-2 shadow-lg mx-auto">
    <span class="font-semibold mt-2">{{ props.name }}</span>
    <div class="flex items-center justify-center mb-4">
      <span>{{ createdAt }}</span>
      <starsComponent :stars="props.stars / 5 * 100" />
    </div>
    <span>{{ props.text }}</span>
  </div>
</template>

<style scoped>
.title {
  font-size: 20px;
}
</style>
