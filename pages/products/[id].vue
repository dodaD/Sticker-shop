<template>
  <div
    class="flex w-fit mx-auto xl:max-w-[1460px] xl:min-w-[1160px] md:max-w-[580px] lg:min-w-[910px] lg:flex-row flex-col"
    v-if="store.response.products !== undefined && picturesForThisProduct !== undefined">

    <div class="flex flex-col xl:flex-row">
      <div
        class="flex-row xl:flex-col overflow-scroll hidden lg:flex xl:max-h-[740px] h-fit translate-y-[740px] xl:translate-y-[0px]">
        <img :src="'/images/' + picture.imgURL" v-for="picture in picturesForThisProduct"
          @click="changeActiveSlide(picture.id)" class="h-[100px] w-fit rounded-lg mr-2"
          :class="{ border: activePicture.id == picture.id, 'border-sky-500': activePicture.id === picture.id, }" />
      </div>

      <swiper :modules="modules" class="w-[600px] h-[740px] !px-[40px] lg:translate-y-[-100px] xl:translate-y-[0px]"
        :slides-per-view="1" navigation @swiper="onSwiper" :scrollbar="{ draggable: true }"
        @slideChange="onSlideChange">
        <swiper-slide v-for="picture in picturesForThisProduct">
          <img :src="'/images/' + picture.imgURL" class="w-[100%] h-[100%] rounded-lg"
            :class="{ hidden: activePicture.id !== picture.id }" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="w-[100%]">
      <h2 class="my-4">{{ product.title }}</h2>
      <div class="pb-8 border-b-2 border-indigo-500 w-[100%]  mb-5 flex">
        <span>${{ product.price }}0</span>

        <div class="block  overflow-hidden w-fit ml-auto">
          <div class="inline-block relative h-[100%]">
            <span class="block active-star overflow-hidden text-amber-200 whitespace-nowrap relative z-50">
              <font-awesome-icon :icon="['fas', 'star']" v-for="i in 5" aria-hidden="true" />
            </span>

            <span class="absolute text-slate-200 top-0 left-0 stars-inactive">
              <font-awesome-icon :icon="['fas', 'star']" v-for="i in 5" />
            </span>
          </div>
        </div>
        <span>({{ rating.amount_of_comments }})</span>
      </div>

      <span class="">Options:
        <span class="">{{ activeOption.option_name }}</span>
      </span>
      <div class="flex mt-2">
        <img :src="'/images/' + option.imgURL" class="h-[90px] w-fit rounded-lg mr-1"
          v-for="option in optionsForThisProduct"
          :class="{ border: activeOption.id === option.id, 'border-sky-500': activeOption.id === option.id, }"
          @click="changeOption(option.id)" />
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
const comments = await store.getCommentsForProduct(route.params.id);
const rating = await store.getStarsForProduct(route.params.id);
const stars = parseFloat(rating.stars) / 5 * 100;

const nextPageLink = computed(() => {
  if (comments !== undefined) {
    return comments.next_page_url;
  }
});

const previousPageLink = computed(() => {
  if (comments !== undefined) {
    return comments.prev_page_url;
  }
});

const product = computed(() => {
  if (store.response.products !== undefined) {
    return store.response.products.find((item) => item.id == route.params.id);
  }
});

const additionalPictures = await store.getAdditionalPicturesForProduct(route.params.id);
const picturesForThisProduct = additionalPictures.additional_pictures;
const optionsForThisProduct = additionalPictures.optional_pictures;

const slider = ref(null);
const onSwiper = (swiper) => {
  slider.value = swiper;
};

const activePicture = ref(picturesForThisProduct[0]);
const activeOption = ref(optionsForThisProduct[0]);

function changeActiveSlide(picture) {
  const index = picturesForThisProduct.findIndex((item) => item.id == picture);
  slider.value.slideTo(index);
  activePicture.value = picturesForThisProduct[index];
}

const onSlideChange = () => {
  for (let i = 0; i < picturesForThisProduct.length; i++) {
    if (slider.value.activeIndex === i) {
      activePicture.value = picturesForThisProduct[i];
    }
  }
};

function changeOption(option) {
  const optionSlide = picturesForThisProduct.findIndex((item) => item.id == option);
  slider.value.slideTo(optionSlide);
  const currentOption = optionsForThisProduct.findIndex((item) => item.id == option);
  activeOption.value = optionsForThisProduct[currentOption];
}
</script>

<style>
.title {
  font-size: 20px;
}

.stars-inactive {
  -webkit-text-stroke: initial;
}

.active-star {
  width: v-bind(stars + '%');
}
</style>
