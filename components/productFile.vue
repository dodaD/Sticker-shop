<template>
  <div class="product-profile-wrapper">
    <img v-if="img" :src="img" />

    <div class="descpription-wrapper">
      <span class="title"> {{ title }} </span>
      <span class="price"> {{ price }} </span>
      <button class="add-to-cart-button"> Add to Cart </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  price: String,
  img: String
})

</script>

<style>
.product-profile-wrapper {
  display: flex;
  flex-direction: column;
}

.descpription-wrapper {
  display: flex;
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
  max-width: 100%;
  max-height: 400px;
  padding: 10px;
}
</style>

