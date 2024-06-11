<template>
  <span class="flex text-4xl mx-auto w-fit mt-6 mb-24"> STICKERS </span>

  <div class="flex w-fit mx-auto lg:w-10/12 md:w-11/12">
    <div class="basis-1/4 mr-8 hidden lg:block">
      <div class="border-solid border-b pb-4 border-indigo-500">Filters</div>

      <div class="py-2">
        <div class="flex items-center justify-between">
          Type
          <button
            class="w-[22px] h-[22px] bg-neutral-950 rounded-full"
            @click="showTypes = !showTypes"
          >
            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              v-if="showTypes"
              class="text-white"
            />
            <font-awesome-icon
              :icon="['fas', 'chevron-up']"
              v-if="!showTypes"
              class="text-white"
            />
          </button>
        </div>

        <TransitionGroup name="type">
          <div
            class="py-[2px] flex items-center"
            v-for="filter in getAllFilters('type')"
            v-if="showTypes"
            :key="filter"
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
        </TransitionGroup>
      </div>

      <div class="py-2 border-solid border-t border-indigo-500">
        <div class="flex items-center justify-between">
          Size
          <button
            class="w-[22px] h-[22px] bg-neutral-950 rounded-full"
            @click="showSizes = !showSizes"
          >
            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              v-if="showSizes"
              class="text-white"
            />
            <font-awesome-icon
              :icon="['fas', 'chevron-up']"
              v-if="!showSizes"
              class="text-white"
            />
          </button>
        </div>

        <TransitionGroup name="size">
          <div
            class="py-[2px] flex items-center"
            v-for="filter in getAllFilters('size')"
            v-if="showSizes"
            :key="filter"
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
        </TransitionGroup>
      </div>

      <div class="py-2 border-solid border-t border-indigo-500">
        <div class="flex items-center justify-between">
          Theme
          <button
            class="w-[22px] h-[22px] bg-neutral-950 rounded-full"
            @click="showThemes = !showThemes"
          >
            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              v-if="showThemes"
              class="text-white"
            />
            <font-awesome-icon
              :icon="['fas', 'chevron-up']"
              v-if="!showThemes"
              class="text-white"
            />
          </button>
        </div>

        <TransitionGroup name="theme">
          <div
            class="py-[2px] flex items-center"
            v-for="filter in getAllFilters('theme')"
            v-if="showThemes"
            :key="filter"
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
        </TransitionGroup>
      </div>
    </div>

    <div class="basis-full lg:basis-2/3">
      <div class="flex w-full">
        <div
          v-for="filter in appliedFilters"
          class="w-fit rounded-2xl bg-zinc-300 px-4 py-1 mb-2 mr-1 last:mr-0"
        >
          {{ filter }}
          <button @click="removeFilter(filter)">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>
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
import productFile from "@/components/productFile.vue";

const store = useProductsStore();
const appliedFilters = ref([]);
const showTypes = ref(true);
const showSizes = ref(true);
const showThemes = ref(true);

const filtredProducts = computed(() => {
  if (appliedFilters.value.length === 0) {
    return store.response.products;
  }

  let allFiltredProducts = new Set();

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
      allFiltredProducts.add(product);
    }
  }
  return allFiltredProducts;
});

function getAllFilters(filter) {
  let uniqueTypes = new Set();

  store.response.products.forEach((product) => {
    uniqueTypes.add(product[filter]);
  });
  return Array.from(uniqueTypes);
}

function removeFilter(filter) {
  appliedFilters.value = appliedFilters.value.filter((item) => item !== filter);
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
