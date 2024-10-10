import { defineStore } from "pinia";

export const useAppliedFiltersStore = defineStore("appliedFilters", () => {
  const filters = ref({"types":[], "sizes":[], "themes": []});
  const notCategorizedFilters = computed(() => {
    return filters.value.types.concat(filters.value.sizes.concat(filters.value.themes));
  });

  function $reset() {
    filters.value = {"types":[], "sizes":[], "themes": []};
  }

  return { filters, $reset, notCategorizedFilters };
});
