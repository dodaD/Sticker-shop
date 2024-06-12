import { defineStore } from "pinia";

export const useAppliedFiltersStore = defineStore("appliedFilters", () => {
  const filters = ref([]);

  return { filters };
});
