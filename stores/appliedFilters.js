import { defineStore } from "pinia";

export const useAppliedFiltersStore = defineStore("appliedFilters", () => {
  const filters = ref({"types":[], "sizes":[], "themes": []});

  function $reset() {
    filters.value = [];
  }

  return { filters, $reset };
});
