<template>
  <div class="product-wrapper">
    <img v-if="img" :src="img" />
    <img v-if="img" src="/assets/img/kidd.png" />

    <div class="descpription-wrapper">
      <div class="price-wrapper">
        <span class="title"> {{ title }} </span>
        <span class="price"> {{ price }} </span>
      </div>
      <button class="add-to-cart">Add to cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  img?: string
  title: string
  price: string // WARNING:  This should be a number
}>()
</script>

<style>
.product-wrapper {
  width: 25%;
  margin-left: 10px;
  display: flex;
}

.descpription-wrapper {
  display: flex;
}

.price-wrapper {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 20px;
}

.price {
  font-size: 16px;
}

.add-to-cart {
  height: 100%;
}
</style>

