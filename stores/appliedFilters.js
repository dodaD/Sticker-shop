import { defineStore } from "pinia";

export const useAppliedFiltersStore = defineStore("appliedFilters", () => {
  const filters = ref({"types":[], "sizes":[], "themes": []});
  const combinedFilters = ref(filters.value.types.concat(filters.value.sizes.concat(filters.value.themes)));

  function $reset() {
    filters.value = [];
  }

  return { filters, $reset, combinedFilters };
});
