<script setup>
const props = defineProps({
  showContext: Boolean,
});
</script>

<template>
  <font-awesome-icon :icon="['fas', 'chevron-down']" v-if="!props.showContext" />
  <font-awesome-icon :icon="['fas', 'chevron-up']" v-if="props.showContext" />
</template>
