<template>
  <span class="flex text-4xl mx-auto w-fit mt-6 mb-24"> STICKERS </span>

  <div class="w-fit mx-auto xl:max-w-[1400px] xl:min-w-[1100px] md:max-w-[540px] lg:min-w-[850px]">
    <div class="flex mb-7 min-h-[40px]">

      <div class="lg:w-[250px] hidden lg:block mr-auto" v-element-visibility="onElementVisibility">Filters</div>

      <div class="flex flex-wrap w-full xl:max-w-[600px] lg:max-w-[380px]">
        <div v-for="filter in appliedFilters.filters"
          class="w-fit rounded-3xl shrink-0 bg-zinc-300 px-6 py-2 mr-1 last:mr-0 mb-2">
          {{ filter }}
          <button @click="removeFilter(filter)">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>

        <button class="h-fit mr-4 ml-1 my-auto w-fit underline-animation clear-all-button"
          v-if="appliedFilters.filters.length != 0" @click="clearAll">
          Clear all
        </button>
      </div>

      <div class="w-fit xl:ml-auto hidden lg:block relative">
        <div class="flex" @mouseover="hover = true" @mouseleave="hover = false">
          Sort by:
          <div @click="showDropDownSort = !showDropDownSort"
            class="ml-2 cursor-pointer prevent-select underline-animation"
            :class="{ 'underline-animation-line-move': hover }">
            {{ typeOfSort }}
          </div>

          <button class="w-[22px] h-[22px] rounded-full ml-2"
            :class="{ 'text-white': hover, 'bg-neutral-950': hover, 'bg-neutral-200': !hover }"
            @click="showDropDownSort = !showDropDownSort">
            <font-awesome-icon :icon="['fas', 'chevron-down']" v-if="showDropDownSort" />
            <font-awesome-icon :icon="['fas', 'chevron-up']" v-if="!showDropDownSort" />
          </button>
        </div>

        <div class="bg-white border-[1px] border-zinc-300 rounded-lg absolute top-[40px] right-0 p-4 flex z-40 flex-col"
          v-if="showDropDownSort">
          <div v-for="sort in dropDownSorts" @click="sortProducts(sort.type, sort.reverse, sort)"
            class="cursor-pointer mb-2 prevent-select whitespace-nowrap">
            <div v-if="sort.type == 'Featured'">Featured</div>
            <div v-else>{{ sort.type }}, {{ sort.start }} - {{ sort.end }} </div>
          </div>
        </div>
      </div>

    </div>


    <div class="flex relative">
      <filterComponent :isFixed="!isVisible" />

      <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 w-[100%] lg:w-fit ml-auto">
        <TransitionGroup name="products">
          <div v-for="product in filtredProducts" :key="product.id">
            <productFile :title="product.title" :price="product.price" :img="product.imgURL" />
          </div>
        </TransitionGroup>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useProductsStore } from "@/stores/products";
import { useAppliedFiltersStore } from "@/stores/appliedFilters";
import { vElementVisibility } from "@vueuse/components";
import productFile from "@/components/productFile.vue";
import filterComponent from "~/components/filterComponent.vue";

const isVisible = ref(false);

function onElementVisibility(state) {
  isVisible.value = state;
}

const showDropDownSort = ref(false);
const dropDownSorts = [
  { "type": "Alphabetical", "start": "a", "end": "z", "reverse": false },
  { "type": "Alphabetical", "start": "z", "end": "a", "reverse": true },
  { "type": "Price", "start": "low", "end": "high", "reverse": false },
  { "type": "Price", "start": "high", "end": "low", "reverse": true },
  { "type": "Featured", "reverse": false },
]; // TODO: add date filter

const sortBy = ref("");
const isSortReverse = ref(false);
const typeOfSort = ref("Featured");

function sortProducts(sort, reverse, sortObject) {
  sortBy.value = sort;
  isSortReverse.value = reverse;
  if (sortObject.type == "Featured") {
    typeOfSort.value = "Featured";
    return;
  }
  typeOfSort.value = sortObject.type + ", " + sortObject.start + " - " + sortObject.end;
}

const hover = ref(false);
const store = useProductsStore();
let appliedFilters = useAppliedFiltersStore();

const filtredProducts = computed(() => {
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

  if (appliedFilters.filters.length == 0) {
    allFiltredProducts = store.response.products;
  }

  if (sortBy.value == "Price") {
    allFiltredProducts = Array.from(allFiltredProducts).sort((a, b) => {
      if (isSortReverse.value) {
        return b.price - a.price;
      }
      return a.price - b.price;
    });
  }

  if (sortBy.value == "Alphabetical") {
    allFiltredProducts = Array.from(allFiltredProducts).sort((a, b) => {
      if (a.title < b.title) {
        return isSortReverse.value ? 1 : -1;
      }
      if (a.title > b.title) {
        return isSortReverse.value ? -1 : 1;
      }
    })
  }

  return allFiltredProducts;
});

function removeFilter(filter) {
  appliedFilters.$patch((state) => {
    state.filters = state.filters.filter((item) => item !== filter);
  });
}

function clearAll() {
  appliedFilters.$reset();
  sortBy.value = "";
}
</script>

<style>
.prevent-select {
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
}

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

.underline-animation {
  background:
    linear-gradient(to right, transparent, transparent),
    linear-gradient(to right, rgb(0, 0, 0), rgb(0, 0, 0));
  background-size: 100% 0.1em, 0 0.1em;
  background-position: 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size 400ms;
}

.underline-animation-line-move,
.clear-all-button:hover {
  background-size: 0 0.1em, 100% 0.1em;
}
</style>
