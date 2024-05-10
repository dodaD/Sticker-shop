<template>
  <div class="wrapper">
    <span class="page-title"> STICKERS </span>
  </div>

  <div class="menu-wrapper">
    <div class="filter-wrapper"> </div>

    <div class="products-wrapper">
      <productFile title="Product 1" price=0.15 :img=imgUrl />
      <productFile title="Product 2" price=0.15 :img=imgUrl />
      <productFile title="Product 3" price=0.15 :img=imgUrl />
      <productFile title="Product 4" price=0.15 :img=imgUrl />
    </div>
  </div>
</template>

<script setup>
import imgUrl from '@/assets/img/kidd.png';
</script>

<style>
.page-title {
  font-size: 30px;
  margin: 0 auto;
  width: 100px
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.menu-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.filter-wrapper {
  width: 20%;
  height: 100px;
}

.products-wrapper {
  width: 90%;
  background-color: #f0f0f0;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  height: fit-content;

  .product-profile-wrapper :first-child {
    margin-left: 0;
  }
}
</style>
