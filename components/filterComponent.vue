<template>
  <div class="fixed top-0 bottom-0 left-0 w-[100%] h-[100%] bg-black/50 lg:hidden z-10" v-if="showBackgroundTin"
    @click="closeFilters" />
  <button class="lg:hidden fixed bottom-4 right-[45%] bg-black px-6 py-4 rounded-full text-white z-20"
    @click="openFilters" v-if="!showFilters">
    Show filters
  </button>
  <div class="md:transition-[width]
    transition-[height]
    ease-in-out 
    duration-300
    lg:px-0
    lg:py-0
    lg:transition-none
    lg:bg-transparent
    lg:mr-8
    lg:block
    bg-white
    z-20
    lg:h-fit
    lg:w-[250px] 
    md:ml-0
    md:m-0
    md:h-[98%] 
    h-[55%]
    lg:translate-x-0
    lg:visible
    w-[98%]
    left-[1%]
    lg:left-[unset]
    bottom-4
    lg:*:visible" :class="{
      fixed: showBackgroundTin,
      'rounded-lg': showBackgroundTin,
      'px-2': showFilters,
      'py-2': showFilters,
      'md:w-[0px]': !showFilters,
      'md:top-[1%]': showBackgroundTin,
      'md:w-[45%]': showFilters,
      'md:left-[30px]': showFilters,
      'md:translate-x-[-20px]': showFilters,
      'h-0': !showFilters,
      'visible': showFilters,
      'invisible': !showBackgroundTin,
      '*:invisible': !showFilters,
      fixed: isFixed,
      absolute: !isFixed,
      'lg:top-[10px]': isFixed,
      'lg:top-0': !isFixed,
      'lg:left-0': !isFixed,
    }">
    <button @click="closeFilters" class="lg:hidden">
      <font-awesome-icon :icon="['fas', 'xmark']" />
    </button>

    <div class="border-solid border-b border-indigo-500" />
    <div class="py-2">
      <div class="flex items-center justify-between">
        <span class="font-semibold my-2">Type</span>
        <button class="w-[22px] h-[22px] bg-neutral-950 rounded-full text-white" @click="showTypes = !showTypes">
          <arrowToggleComponent :showContext="showTypes" />
        </button>
      </div>

      <TransitionGroup name="type">
        <div class="py-[2px] flex items-center" v-for="filter in types" v-if="showTypes" :key="filter">
          <input type="checkbox" :value="filter" v-model="appliedFilters.filters" :id="filter"
            class="hover:cursor-pointer custom-check" />
          <label class="pl-[5px]">{{ filter }} </label>
        </div>
      </TransitionGroup>
    </div>

    <div class="py-2 border-solid border-t border-indigo-500">
      <div class="flex items-center justify-between">
        <span class="font-semibold my-2">Size</span>
        <button class="w-[22px] h-[22px] bg-neutral-950 rounded-full text-white" @click="showSizes = !showSizes">
          <arrowToggleComponent :showContext="showSizes" />
        </button>
      </div>

      <TransitionGroup name="size">
        <div class="py-[2px] flex items-center" v-for="filter in sizes" v-if="showSizes" :key="filter">
          <input type="checkbox" :value="filter" v-model="appliedFilters.filters" :id="filter"
            class="hover:cursor-pointer custom-check" />
          <label class="pl-[5px]"> {{ filter }} </label>
        </div>
      </TransitionGroup>
    </div>

    <div class="py-2 border-solid border-t border-indigo-500">
      <div class="flex items-center justify-between">
        <span class="font-semibold my-2">Theme</span>
        <button class="w-[22px] h-[22px] bg-neutral-950 rounded-full text-white" @click="showThemes = !showThemes">
          <arrowToggleComponent :showContext="showThemes" />
        </button>
      </div>

      <TransitionGroup name="theme">
        <div class="py-[2px] flex items-center" v-for="filter in themes" :key="filter" v-if="showThemes">
          <input type="checkbox" :value="filter" v-model="appliedFilters.filters" :id="filter"
            class="hover:cursor-pointer custom-check" />
          <label class="pl-[5px]">{{ filter }} </label>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { useAppliedFiltersStore } from "@/stores/appliedFilters";

const props = defineProps(['isFixed']);
const store = useProductsStore();
let appliedFilters = useAppliedFiltersStore();
const showTypes = ref(true);
const showSizes = ref(true);
const showThemes = ref(true);
const showFilters = ref(false);
const showBackgroundTin = ref(false);

const types = computed(() => {
  let uniqueTypes = new Set();

  store.response.products.forEach((product) => {
    uniqueTypes.add(product.type);
  });
  return Array.from(uniqueTypes);
});

const sizes = computed(() => {
  let uniqueTypes = new Set();

  store.response.products.forEach((product) => {
    uniqueTypes.add(product.size);
  });
  return Array.from(uniqueTypes);
});

const themes = computed(() => {
  let uniqueTypes = new Set();

  store.response.products.forEach((product) => {
    uniqueTypes.add(product.theme);
  });
  return Array.from(uniqueTypes);
});

function openFilters() {
  showFilters.value = true;
  showBackgroundTin.value = true;
}

function closeFilters() {
  showFilters.value = false;
  setTimeout(() => showBackgroundTin.value = false, 299);
}
</script>

<style>
.custom-check {
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

.custom-check:checked::before {
  content: "";
  background-color: white;
  width: 7px;
  height: 7px;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.custom-check:checked {
  background-color: black;
  border: 1px solid black;
}

.title {
  font-size: 20px;
}
</style>
