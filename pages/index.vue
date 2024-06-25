<template>
  <span class="flex text-4xl mx-auto w-fit mt-6 mb-24"> STICKERS </span>

  <div class="w-fit mx-auto lg:w-10/12 md:w-11/12">
    <div class="flex mb-7 min-h-[40px]">

      <div class="lg:w-[25%] lg:mr-8 hidden lg:block" v-element-visibility="onElementVisibility">Filters</div>

      <div class="flex flex-wrap w-full lg:w-[55%]">
        <div v-for="filter in appliedFilters.filters"
          class="w-fit rounded-3xl shrink-0 bg-zinc-300 px-6 py-2 mr-1 last:mr-0 mb-2">
          {{ filter }}
          <button @click="removeFilter(filter)">
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>

        <button class="h-fit ml-4 my-auto w-fit underline-animation clear-all-button"
          v-if="appliedFilters.filters.length != 0" @click="appliedFilters.$reset">
          Clear all
        </button>
      </div>

      <div class="w-fit ml-auto shrink-0 hidden lg:block relative">
        <div class="flex" @mouseover="hover = true" @mouseleave="hover = false">
          Sort by:
          <div @click="showDropDownSort = !showDropDownSort"
            class="ml-2 cursor-pointer prevent-select underline-animation"
            :class="{ 'underline-animation-line-move': hover }">
            Featured
          </div>

          <button class="w-[22px] h-[22px] rounded-full ml-2"
            :class="{ 'text-white': hover, 'bg-neutral-950': hover, 'bg-neutral-200': !hover }"
            @click="showDropDownSort = !showDropDownSort">
            <font-awesome-icon :icon="['fas', 'chevron-down']" v-if="showDropDownSort" />
            <font-awesome-icon :icon="['fas', 'chevron-up']" v-if="!showDropDownSort" />
          </button>
        </div>

        <div class="bg-white
          border-[1px]
          border-zinc-300
          rounded-lg
          absolute
          top-[40px]
          right-0
          p-4
          flex
          flex-col" v-if="showDropDownSort">
          <div v-for="sort in dropDownSorts" @click="sortProducts(sort.type, sort.reverse)"
            class="cursor-pointer mb-2 prevent-select whitespace-nowrap">
            {{ sort.type }}, {{ sort.start }} - {{ sort.end }}
          </div>
        </div>
      </div>

    </div>


    <div class="flex relative">
      <filterComponent :isFixedPosition="!isVisible" />

      <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 w-[100%] lg:w-[75%] ml-auto">
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
  console.log("Hello");
  isVisible.value = state;
}

const showDropDownSort = ref(false);
const dropDownSorts = [
  { "type": "Alphabetical", "start": "a", "end": "z", "reverse": false },
  { "type": "Alphabetical", "start": "z", "end": "a", "reverse": true },
  { "type": "Price", "start": "low", "end": "high", "reverse": false },
  { "type": "Price", "start": "high", "end": "low", "reverse": true },
]; // TODO: add date filter


function sortProducts(sortType, reverse) {
  sortBy.value = sortType;
  isSortReverse.value = reverse;
  console.log(sortType, reverse)
}

const hover = ref(false);
const store = useProductsStore();
let appliedFilters = useAppliedFiltersStore();
const sortBy = ref("");
const isSortReverse = ref(false);

const filtredProducts = computed(() => {
  let allFiltredProducts = store.response.products;

  if (sortBy.value == "Price") {
    allFiltredProducts.sort((a, b) => {
      if (isSortReverse.value) {
        return b.price - a.price;
      }
      return a.price - b.price;
    });
  }

  if (sortBy.value == "Alphabetical") {
    allFiltredProducts.sort((a, b) => {
      if (a.title < b.title) {
        return isSortReverse.value ? 1 : -1;
      }
      if (a.title > b.title) {
        return isSortReverse.value ? -1 : 1;
      }

    })
  }

  if (appliedFilters.filters.length === 0) {
    return allFiltredProducts;
  }

  allFiltredProducts = new Set();

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
