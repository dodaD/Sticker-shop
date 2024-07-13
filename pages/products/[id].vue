<template>
  <!--<div class="flex xl:max-w-[1460px] xl:min-w-[1160px] md:max-w-[580px] lg:min-w-[910px]" v-if="product !== undefined">
    <div v-for="picture in picturesForThisProduct.pictures">
      <img :src="'/images/' + picture" class="w-[260px] h-[370px]" />
    </div>

    <img :src="'/images/' + product.imgURL" class="w-[260px] h-[370px]" </div> /> -->
  <swiper :modules="modules" :slides-per-view="1" :space-between="50" navigation @swiper="onSwiper"
    :scrollbar="{ draggable: true }" class="max-w-[540px] h-[740px]" @slideChange="onSlideChange">
    <swiper-slide v-for="picture in picturesForThisProduct.pictures">
      <img :src="'/images/' + picture" class="scale-[2] translate-x-[50%] translate-y-[50%]" />
    </swiper-slide>
  </swiper>
  <div class="flex column">
    <img :src="'/images/' + picture" v-for="picture in picturesForThisProduct.pictures"
      @click="changeActiveSlide(picture)"
      :class="{ border: activePicture == picture, 'border-sky-500': activePicture == picture, }" />
  </div>


</template>

<script setup>
import { computed, watch } from "vue";
import { useProductsStore } from "@/stores/products";

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const modules = [Navigation, Pagination, Scrollbar];

const route = useRoute();
const store = useProductsStore();
if (store.response.products === undefined) {
  store.response = await store.getProducts();
}

const product = computed(() => {
  if (store.response.products !== undefined) {
    return store.response.products.find((item) => item.id == route.params.id);
  }
});

const additionalPictures = [{ id: 1, pictures: ['albedo.jpg', 'xiao.jpg', 'venti.jpg'] }]; //зробити це якось в БД або поговорити з Сергійком чи те що декілька картинок для одного товару має сенс
const picturesForThisProduct = additionalPictures.find((item) => item.id == route.params.id);
const slider = ref(null);
const onSwiper = (swiper) => {
  slider.value = swiper;
};

const activePicture = ref(picturesForThisProduct.pictures[0]);
function changeActiveSlide(picture) {
  const index = picturesForThisProduct.pictures.findIndex((item) => item == picture);
  slider.value.slideTo(index);
  findActiveSlide();
}

function findActiveSlide() {
  for (let i = 0; i < picturesForThisProduct.pictures.length; i++) {
    if (slider.value.activeIndex === i) {
      activePicture.value = picturesForThisProduct.pictures[i];
    }
  }
}

const onSlideChange = () => {
  for (let i = 0; i < picturesForThisProduct.pictures.length; i++) {
    if (slider.value.activeIndex === i) {
      activePicture.value = picturesForThisProduct.pictures[i];
    }
  }
};
</script>

<style>
.title {
  font-size: 20px;
}
</style>
