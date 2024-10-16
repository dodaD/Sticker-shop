<template>
  <span class="flex text-4xl mx-auto w-fit mt-6 mb-24"> STICKERS </span>

  <div class="lg:w-[250px] hidden lg:block mr-auto mt-auto font-semibold mr-[48px]"
    v-element-visibility="onElementVisibility">Filters
  </div>

  <div class="flex min-h-[40px] mb-7 sm:max-w-[580px] md:max-w-[unset] sm:p-0 px-[30px]">
    <div class="flex flex-wrap lg:hidden">
      <div v-for="filter in appliedFilters.notCategorizedFilters" v-if="appliedFilters.notCategorizedFilters.length != 0"
        class="w-fit rounded-3xl shrink-0 bg-zinc-300 px-6 py-2 mr-1 last:mr-0 mb-2">
        {{ filter }}
        <button @click="removeFilter(filter)">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </button>
      </div>

      <button class="h-fit mr-4 ml-1 my-auto w-fit underline-animation clear-all-button"
        v-if="appliedFilters.notCategorizedFilters.length != 0" @click="clearAll">
        Clear all
      </button>
    </div>

    <div class="w-fit xl:ml-auto hidden lg:block relative shrink-0 ml-auto">
      <div class="flex" @mouseover="hover = true" @mouseleave="hover = false">
        <span class="font-semibold">Sort by:</span>
        <div @click="showDropDownSort = !showDropDownSort"
          class="ml-2 cursor-pointer prevent-select underline-animation"
          :class="{ 'underline-animation-line-move': hover }">
          {{ typeOfSort }}
        </div>

        <button class="w-[22px] h-[22px] rounded-full ml-2"
          :class="{ 'text-white': hover, 'bg-neutral-950': hover, 'bg-neutral-200': !hover }"
          @click="showDropDownSort = !showDropDownSort">
          <arrowToggleComponent :showContext="showDropDownSort" />
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

    <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 mx-auto lg:w-fit lg:ml-auto lg:mr-[unset]">
      <TransitionGroup name="products">
        <div v-for="product in filtredProducts" :key="product.id">
          <productComponent :title="product.title" :price="product.price" :img="product.imgURL" :id="product.id" />
        </div>
      </TransitionGroup>
    </div>
  </div>

</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { useAppliedFiltersStore } from "@/stores/appliedFilters";
import { vElementVisibility } from "@vueuse/components";

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
const typeOfSort = ref("Featured"); //TODO Make it computed

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
const store = useProductsStore(); //TODO rename
const appliedFilters = useAppliedFiltersStore();

store.response = await store.getProducts(); //TODO rozibratysia z tym chomu pracuje await

const filtredProducts = computed(() => {
  let allFiltredProducts = new Set();
  let allProductsWithThisFilter = store.response.products;

  allProductsWithThisFilter = store.response.products.filter((product) => {
    if (appliedFilters.filters.types.includes(product.type) || appliedFilters.filters.types.length == 0) {
      if (appliedFilters.filters.sizes.includes(product.size) || appliedFilters.filters.sizes.length == 0) {
        return (appliedFilters.filters.themes.length == 0 || appliedFilters.filters.themes.includes(product.theme));
      };
    };
  });

  for (let product of allProductsWithThisFilter) {
    allFiltredProducts.add(product);
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
}); //zakinchyly tut

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
