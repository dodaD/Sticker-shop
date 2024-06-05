<template>
  <span class=""> STICKERS </span>

  <div class="flex w-fit mx-auto xl:w-10/12 md:w-11/12">
    <div class="basis-1/4">
      <span class=""> Filters </span>

      <div class="mx-auto">Type</div>
      <div class="" v-for="filter in getAllFilters('type')">
        <input
          type="checkbox"
          :value="filter"
          v-model="appliedFilters"
          :id="filter"
        />
        <label>Show only {{ filter }} </label>
      </div>

      <div class="">Size</div>
      <div class="" v-for="filter in getAllFilters('size')">
        <input
          type="checkbox"
          :value="filter"
          v-model="appliedFilters"
          :id="filter"
        />
        <label>Show only {{ filter }} </label>
      </div>

      <div class="">Theme</div>
      <div class="" v-for="filter in getAllFilters('theme')">
        <input
          type="checkbox"
          :value="filter"
          v-model="appliedFilters"
          :id="filter"
        />
        <label>Show only {{ filter }} </label>
      </div>
    </div>

    <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-4 basis-2/3">
      <div v-for="product in filtredProducts" class="">
        <productFile
          :title="product.title"
          :price="product.price"
          :img="product.imgURL"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useProductsStore } from "@/stores/products";
import productFile from "@/components/productFile.vue";

const store = useProductsStore();
const appliedFilters = ref([]);

const filtredProducts = computed(() => {
  if (appliedFilters.value.length === 0) {
    return store.response.products;
  }

  let allFitredProducts = new Set();

  for (let filter of appliedFilters.value) {
    const allProductsWithThisFilter = store.response.products.filter(
      (product) => {
        return (
          product.type.includes(filter) ||
          product.size.includes(filter) ||
          product.theme.includes(filter)
        );
      },
    );
    for (let product of allProductsWithThisFilter) {
      allFitredProducts.add(product);
    }
  }
  return allFitredProducts;
});

function getAllFilters(filter) {
  let uniqueTypes = new Set();

  store.response.products.forEach((product) => {
    uniqueTypes.add(product[filter]);
  });
  return Array.from(uniqueTypes);
}
</script>

<style>
.page-title {
  font-size: 30px;
  margin: 20px auto 50px;
  width: 100px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.menu-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

.filter-wrapper {
  display: flex;
  flex-direction: column;
}

.underline-for-sections {
  height: 25px;
  font-size: 20px;
  border-bottom: 1px solid black;
  width: 100%;
}

.products-wrapper {
  display: flex;
  height: fit-content;
}
</style>
