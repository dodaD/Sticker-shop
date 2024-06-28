<template>
  <div class="fixed top-0 bottom-0 left-0 w-[100%] h-[100%] bg-black/50 lg:hidden z-10" v-if="showFilters" />
  <button class="lg:hidden fixed bottom-4 right-[45%] bg-black px-6 py-4 rounded-full text-white z-20"
    @click="openFilters" v-if="!showFilters">
    Show filters
  </button>
  <div class="lg:bg-transparent lg:mr-8 lg:block z-20 h-fit lg:w-[20vw] w-full" :class="{
    fixed: showFilters,
    'rounded-lg': showFilters,
    'bg-white': showFilters,
    'px-2': showFilters,
    'py-2': showFilters,
    'bottom-4': showFilters,
    'w-[98%]': showFilters,
    'h-[55%]': showFilters,
    'right-[1%]': showFilters,
    'md:top-[1%]': showFilters,
    'md:w-[45%]': showFilters,
    'md:h-[98%]': showFilters,
    block: showFilters,
    hidden: !showFilters,
    fixed: isFixedPosition,
    absolute: !isFixedPosition,
    'md:top-[10px]': isFixedPosition,
    'md:top-0': !isFixedPosition,
  }">
    <button @click="showFilters = false" class="lg:hidden">
      <font-awesome-icon :icon="['fas', 'xmark']" />
    </button>

    <div class="border-solid border-b border-indigo-500" />
    <div class="py-2">
      <div class="flex items-center justify-between">
        Type
        <button class="w-[22px] h-[22px] bg-neutral-950 rounded-full" @click="showTypes = !showTypes">
          <font-awesome-icon :icon="['fas', 'chevron-down']" v-if="showTypes" class="text-white" />
          <font-awesome-icon :icon="['fas', 'chevron-up']" v-if="!showTypes" class="text-white" />
        </button>
      </div>

      <TransitionGroup name="type">
        <div class="py-[2px] flex items-center" v-for="filter in types" v-if="showTypes" :key="filter">
          <input type="checkbox" :value="filter" v-model="appliedFilters.filters" :id="filter"
            class="hover:cursor-pointer" />
          <label class="pl-[5px]">{{ filter }} </label>
        </div>
      </TransitionGroup>
    </div>

    <div class="py-2 border-solid border-t border-indigo-500">
      <div class="flex items-center justify-between">
        Size
        <button class="w-[22px] h-[22px] bg-neutral-950 rounded-full" @click="showSizes = !showSizes">
          <font-awesome-icon :icon="['fas', 'chevron-down']" v-if="showSizes" class="text-white" />
          <font-awesome-icon :icon="['fas', 'chevron-up']" v-if="!showSizes" class="text-white" />
        </button>
      </div>

      <TransitionGroup name="size">
        <div class="py-[2px] flex items-center" v-for="filter in sizes" v-if="showSizes" :key="filter">
          <input type="checkbox" :value="filter" v-model="appliedFilters.filters" :id="filter"
            class="hover:cursor-pointer" />
          <label class="pl-[5px]"> {{ filter }} </label>
        </div>
      </TransitionGroup>
    </div>

    <div class="py-2 border-solid border-t border-indigo-500">
      <div class="flex items-center justify-between">
        Theme
        <button class="w-[22px] h-[22px] bg-neutral-950 rounded-full" @click="showThemes = !showThemes">
          <font-awesome-icon :icon="['fas', 'chevron-down']" v-if="showThemes" class="text-white" />
          <font-awesome-icon :icon="['fas', 'chevron-up']" v-if="!showThemes" class="text-white" />
        </button>
      </div>

      <TransitionGroup name="theme">
        <div class="py-[2px] flex items-center" v-for="filter in themes" :key="filter" v-if="showThemes">
          <input type="checkbox" :value="filter" v-model="appliedFilters.filters" :id="filter"
            class="hover:cursor-pointer" />
          <label class="pl-[5px]">{{ filter }} </label>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { useAppliedFiltersStore } from "@/stores/appliedFilters";

const props = defineProps(['isFixedPosition'])
const store = useProductsStore();
let appliedFilters = useAppliedFiltersStore();
const showTypes = ref(true);
const showSizes = ref(true);
const showThemes = ref(true);
const showFilters = ref(false);

function getAllFilters(filter) {
  let uniqueTypes = new Set();

  store.response.products.forEach((product) => {
    uniqueTypes.add(product[filter]);
  });
  return Array.from(uniqueTypes);
}

const types = getAllFilters("type");
const sizes = getAllFilters("size");
const themes = getAllFilters("theme");

function openFilters() {
  showFilters.value = true;
}
</script>

<style>
.title {
  font-size: 20px;
}
</style>
