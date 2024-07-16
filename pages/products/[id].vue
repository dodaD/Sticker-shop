<template>
  <div
    class="flex w-fit mx-auto xl:max-w-[1460px] xl:min-w-[1160px] md:max-w-[580px] lg:min-w-[910px] lg:flex-row flex-col"
    v-if="store.response.products !== undefined">

    <div class="flex flex-col xl:flex-row">
      <div
        class="flex-row xl:flex-col overflow-scroll hidden lg:flex xl:max-h-[740px] h-fit translate-y-[740px] xl:translate-y-[0px]">
        <img :src="'/images/' + picture" v-for="picture in picturesForThisProduct.pictures"
          @click="changeActiveSlide(picture)" class="h-[100px] w-fit rounded-lg mr-2"
          :class="{ border: activePicture == picture, 'border-sky-500': activePicture === picture, }" />
      </div>

      <swiper :modules="modules" class="w-[600px] h-[740px] !px-[40px] lg:translate-y-[-100px] xl:translate-y-[0px]"
        :slides-per-view="1" navigation @swiper="onSwiper" :scrollbar="{ draggable: true }"
        @slideChange="onSlideChange">
        <swiper-slide v-for="picture in picturesForThisProduct.pictures">
          <img :src="'/images/' + picture" class="w-[100%] h-[100%] rounded-lg"
            :class="{ hidden: activePicture !== picture }" />
        </swiper-slide>
      </swiper>
    </div>

    <div>
      <h2 class="my-4">{{ product.title }}</h2>
      <span class="pb-8 border-b-2 border-indigo-500 w-[100%] block">${{ product.price }}0</span>
      <div class="flex mt-6 flex-col">
        <span class="mb-2">Options: Standart</span>
        <img :src="'/images/' + product.imgURL" class="h-[90px] w-fit rounded-lg" />
      </div>
    </div>
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
