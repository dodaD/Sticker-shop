<script setup>
const props = defineProps({
  text: String,
  date: String,
  stars: Number,
});

const createdAt = ref('');
const date = ref(new Date(props.date));
const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
createdAt.value = date.value.toLocaleString('en-US', options);
</script>


<template>
  <div class="w-[98%] h-fit flex flex-col border-[1px] rounded-lg p-2 shadow-lg">
    <div class="flex items-center justify-center mb-4 mt-2">
      <span>{{ createdAt }}</span>

      <div class="block  overflow-hidden w-fit ml-auto">
        <div class="inline-block relative h-[100%]">
          <span class="block active-star overflow-hidden text-amber-200 whitespace-nowrap relative z-40">
            <font-awesome-icon :icon="['fas', 'star']" v-for="i in 5" aria-hidden="true" />
          </span>

          <span class="absolute text-slate-200 top-0 left-0 stars-inactive">
            <font-awesome-icon :icon="['fas', 'star']" v-for="i in 5" />
          </span>
        </div>
      </div>
    </div>
    <span>{{ props.text }}</span>
  </div>
</template>

<style scoped>
.stars-inactive {
  -webkit-text-stroke: initial;
}

.active-star {
  width: v-bind((props.stars / 5 * 100) + '%');
}
</style>
