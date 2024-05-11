<template>
  <div class="wrapper">
    <span class="page-title"> STICKERS </span>
  </div>

  <div class="menu-wrapper container-xxl">
    <div class="filter-wrapper overflow-hidden col-3">
      Filters
    </div>

    <div class="products-wrapper row col-9">
      <productFile class="col-4" title="Product 1" price=0.15 :img=imgUrl />
      <productFile class="col-4" title="Product 2" price=0.15 :img=imgUrl />
      <productFile class="col-4" title="Product 3" price=0.15 :img=imgUrl />
      <productFile class="col-4" title="Product 4" price=0.15 :img=imgUrl />
    </div>
  </div>
</template>

<script setup>
import imgUrl from '@/assets/img/kidd.png';

useHead({
  title: 'My App',
  link: [{
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    crossorigin: 'anonymous',
    integrity: 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH'
  }]
})
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
  flex-direction: row;
}

.filter-wrapper {
  height: 100px;
}

.products-wrapper {
  background-color: #f0f0f0;
  display: flex;
  height: fit-content;

  .product-profile-wrapper :first-child {
    margin-left: 0;
  }
}
</style>
