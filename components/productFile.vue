<template>
  <div class="flex flex-col hover:bg-stone-200/65 hover:rounded-md">
    <img v-if="img" :src="img" class="object-cover mx-auto" />
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
.product-profile-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
}

.product-profile-wrapper:hover {
  background-color: #f0f0f0;
  cursor: pointer;
  transition: 0.3s;
  max-width: 100%;
  /* TODO: make width of width of ing, without compressing it*/
}

.title {
  font-size: 20px;
}

.price {
  font-size: 16px;
}

.add-to-cart-button {
  height: 100%;
  max-height: 30px;
  margin: auto 10px;
}

img {
  height: auto;
  width: contain;
  max-width: 100%;
  max-height: 400px;
}
</style>
