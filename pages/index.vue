<template>
  <span class="flex text-4xl mx-auto w-fit mt-6 mb-24"> STICKERS </span>

  <div class="flex w-fit mx-auto lg:w-10/12 md:w-11/12">
    <filterComponent />

    <div class="basis-full lg:basis-2/3">
      <div class="flex flex-wrap w-full items-center">
        <div
          v-for="filter in appliedFilters.filters"
          class="w-fit rounded-2xl shrink-0 bg-zinc-300 px-4 py-1 mb-2 mr-1 last:mr-0"
        >
          {{ filter }}
          <button @click="removeFilter(filter)">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>

        <button
          class="underline h-fit mb-2 ml-4"
          v-if="appliedFilters.filters.length != 0"
          @click="appliedFilters.$reset"
        >
          Clear all
        </button>
      </div>

      <!-- END; FormulaUnit FORMATER -->
      <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
        <TransitionGroup name="products">
          <div v-for="product in filtredProducts" :key="product.id">
            <productFile
              :title="product.title"
              :price="product.price"
              :img="product.imgURL"
            />
          </div>
        </TransitionGroup>
      </div>
    </div>
    <!-- END; FormulaUnit FORMATER -->
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useProductsStore } from "@/stores/products";
import { useAppliedFiltersStore } from "@/stores/appliedFilters";
import productFile from "@/components/productFile.vue";
import filterComponent from "~/components/filterComponent.vue";

const store = useProductsStore();
let appliedFilters = useAppliedFiltersStore();

const filtredProducts = computed(() => {
  if (appliedFilters.filters.length === 0) {
    return store.response.products;
  }

  let allFiltredProducts = new Set();

  for (let filter of appliedFilters.filters) {
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
      allFiltredProducts.add(product);
    }
  }
  return allFiltredProducts;
});

function removeFilter(filter) {
  appliedFilters.$patch((state) => {
    state.filters = state.filters.filter((item) => item !== filter);
  });
}
</script>

<style>
.products-enter-active,
.products-leave-active {
  transition: all 0.3s ease;
}

.products-enter-from,
.products-leave-to {
  opacity: 0;
}

.theme-enter-active,
.theme-leave-active {
  transition: all 0.1s ease-in-out;
}

.theme-enter-from,
.theme-leave-to {
  opacity: 0;
}

.size-enter-active,
.size-leave-active,
.type-enter-active,
.type-leave-active {
  transition: all 0.2s ease-in-out;
}

.size-enter-active,
.size-leave-active,
.type-enter-active,
.type-leave-active {
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
