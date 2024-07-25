<template>
  <div class="flex lg:flex-row flex-col"
    v-if="store.response.products !== undefined && picturesForThisProduct !== undefined">

    <div class="flex flex-col xl:flex-row">
      <div class="flex-row xl:flex-col overflow-scroll hidden lg:flex xl:max-h-[740px] h-fit translate-y-[740px]
        xl:translate-y-[0px]">
        <img :src="'/images/' + picture.imgURL" v-for="picture in picturesForThisProduct"
          @click="changeActiveSlide(picture.id)" class="h-[100px] w-fit rounded-lg mr-2 cursor-pointer"
          :class="{ border: activePicture.id == picture.id, 'border-sky-500': activePicture.id === picture.id, }" />
      </div> <!-- Big Picture -->

      <swiper :modules="modules"
        class="md:w-[600px] md:h-[740px] w-[260px] h-[370px] md:!px-[40px] lg:translate-y-[-100px] xl:translate-y-[0px]"
        :slides-per-view="1" @swiper="onSwiper" :scrollbar="{ draggable: true }" @slideChange="onSlideChange">
        <swiper-slide v-for="picture in picturesForThisProduct">
          <img :src="'/images/' + picture.imgURL" class="w-[100%] h-[100%] rounded-lg cursor-zoom-in"
            :class="{ hidden: activePicture.id !== picture.id }" @click="scaledUpImg = picture.imgURL" />
        </swiper-slide>
      </swiper> <!-- Small Pictures -->
    </div>

    <div class="fixed top-0 right-0 w-full h-full bg-black/50 z-40" v-if="scaledUpImg != ''"
      @click="scaledUpImg = ''" />
    <div class=" fixed w-[98%] h-[98%] top-[1%] right-[1%] z-50 flex justify-center bg-white rounded-lg overflow-scroll
      cursor-pointer" v-if="scaledUpImg != ''" @click="zoomInMore = !zoomInMore">
      <button @click="scaledUpImg = ''" class="absolute top-[2%] right-[2%] text-3xl">
        <font-awesome-icon :icon="['fas', 'xmark']" />
      </button>

      <img :src="'/images/' + scaledUpImg" class="h-[100%]" :class="{ 'w-[90%]': zoomInMore, 'h-fit': zoomInMore }" />
    </div> <!-- Zoomed In Picture -->

    <div class="w-[100%] xl:max-w-[450px]"> <!-- Product Description; Section Right From Product -->
      <h2 class="my-4 font-semibold">{{ product.title }}</h2>
      <div class="pb-8 border-b-2 border-indigo-500 w-[100%]  mb-5 flex">
        <span>${{ product.price }}0</span>

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

  <div class="mt-20 mb-5"> <!-- Comments -->
    <div class="font-semibold mb-8">Comments:</div>

    <div v-for="comment in comments.data" :key="comment.id" class="">
      <commentComponent :text="comment.text" :stars="comment.stars" :date="comment.created_at" />
    </div>
    <button v-if="nextPageLink != null" @click="getMoreComments">Load more</button>
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
const getObjectWithComments = await store.getCommentsForProduct(route.params.id); // Fix this.
const comments = ref(getObjectWithComments.comments);
const rating = await store.getStarsForProduct(route.params.id);
const stars = parseFloat(rating.stars) / 5 * 100;

const nextPageLink = ref(comments.value.next_page_url);

async function getMoreComments() {
  const response = await fetch(nextPageLink.value);
  const json = await response.json();
  for (let i = 0; i < json.comments.data.length; i++) {
    comments.value.data.push(json.comments.data[i]);
  }
  nextPageLink.value = json.comments.next_page_url;
}

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

const scaledUpImg = ref('');
const zoomInMore = ref(false);
</script>

<style scoped>
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
