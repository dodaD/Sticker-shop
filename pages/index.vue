<template>
  <div class="wrapper">
    <span class="page-title"> STICKERS </span>

    <div class="menu-wrapper container-xxl row gx-0">
      <div class="filter-wrapper overflow-hidden gy-3 col-2">
        <span class="underline-for-sections"> Filters </span>

        <div>Type</div>
        <div class="checkbox-wrapper" v-for="filter in getAllFilters('type')">
          <input
            type="checkbox"
            :value="filter"
            v-model="appliedFilters"
            :id="filter"
          />
          <label>Show only {{ filter }} </label>
        </div>

        <div>Size</div>
        <div class="checkbox-wrapper" v-for="filter in getAllFilters('size')">
          <input
            type="checkbox"
            :value="filter"
            v-model="appliedFilters"
            :id="filter"
          />
          <label>Show only {{ filter }} </label>
        </div>

        <div>Theme</div>
        <div class="checkbox-wrapper" v-for="filter in getAllFilters('theme')">
          <input
            type="checkbox"
            :value="filter"
            v-model="appliedFilters"
            :id="filter"
          />
          <label>Show only {{ filter }} </label>
        </div>
      </div>

      <div class="products-wrapper row gx-2 col-9">
        <div v-for="product in filtredProducts" class="col-4">
          <productFile
            :title="product.title"
            :price="product.price"
            :img="product.imgURL"
          />
        </div>
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
        return product.type.includes(filter);
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

useHead({
  title: "My App",
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      crossorigin: "anonymous",
      integrity:
        "sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH",
    },
  ],
});
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
