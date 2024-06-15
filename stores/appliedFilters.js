import { defineStore } from "pinia";

export const useAppliedFiltersStore = defineStore("appliedFilters", () => {
  const filters = ref([]);

  function $reset() {
    filters.value = [];
  }

  return { filters, $reset };
});
