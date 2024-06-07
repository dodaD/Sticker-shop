<template>
  <span class="flex text-4xl mx-auto w-fit mt-6 mb-24"> STICKERS </span>

  <div class="flex w-fit mx-auto xl:w-10/12 md:w-11/12">
    <div class="basis-1/4 xl:mr-8 mr-2 hidden lg:block">
      <div class="border-solid border-b pb-4 border-indigo-500">Filters</div>

      <div class="py-2">
        Type
        <div
          class="py-[2px] flex items-center"
          v-for="filter in getAllFilters('type')"
        >
          <input
            type="checkbox"
            :value="filter"
            v-model="appliedFilters"
            :id="filter"
            class="hover:cursor-pointer"
          />
          <label class="pl-[5px]">Show only {{ filter }} </label>
        </div>
      </div>

      <div class="py-2 border-solid border-t pb-4 border-indigo-500">
        Size
        <div
          class="py-[2px] flex items-center"
          v-for="filter in getAllFilters('size')"
        >
          <input
            type="checkbox"
            :value="filter"
            v-model="appliedFilters"
            :id="filter"
            class="hover:cursor-pointer"
          />
          <label class="pl-[5px]">Show only {{ filter }} </label>
        </div>
      </div>

      <div class="py-2 border-solid border-t pb-4 border-indigo-500">
        Theme
        <div
          class="py-[2px] flex items-center"
          v-for="filter in getAllFilters('theme')"
        >
          <input
            type="checkbox"
            :value="filter"
            v-model="appliedFilters"
            :id="filter"
            class="hover:cursor-pointer"
          />
          <label class="pl-[5px]">Show only {{ filter }} </label>
        </div>
      </div>
    </div>

    <div
      class="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 basis-full lg:basis-2/3"
    >
      <TransitionGroup name="list">
        <div v-for="product in filtredProducts" class="">
          <productFile
            :title="product.title"
            :price="product.price"
            :img="product.imgURL"
          />
        </div>
      </TransitionGroup>
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
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  margin: 0;

  border: 1px solid #cacece;
  border-radius: 2px;
  width: 15px;
  height: 15px;
  background-color: #f1f1f1;
  display: grid;
  place-content: center;
}

input[type="checkbox"]:checked::before {
  content: "";
  background-color: white;
  width: 7px;
  height: 7px;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

input[type="checkbox"]:checked {
  background-color: black;
  border: 1px solid black;
}
</style>
