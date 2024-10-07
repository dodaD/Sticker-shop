<script setup>
import { computed, watch } from "vue";
import { useProductsStore } from "@/stores/products";
import { useCommentsStore } from "@/stores/comments";

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

const props = defineProps(['amountOfComments', 'productRatingInProcents']);
const modules = [Navigation, Pagination, Scrollbar, A11y];

const route = useRoute();
const productStore = useProductsStore();
if (productStore.response.products === undefined) {
  productStore.response = await productStore.getProducts();
}

const product = computed(() => {
  if (productStore.response.products !== undefined) {
    return productStore.response.products.find((item) => item.id == route.params.id);
  }
});

const smallPictureSwiper = ref(null);
const setSmallPicturesSwiper = (swiper) => {
  smallPictureSwiper.value = swiper;
};

const bigPictureSwiper = ref(null);
const setBigPictureSwiper = (swiper) => {
  bigPictureSwiper.value = swiper;
};


//FLAGGED 
const allInfoForThisProduct = await productStore.getSpecificProduct(route.params.id);
const picturesForThisProduct = ref(allInfoForThisProduct.pictures_for_product);
const optionsForThisProduct = allInfoForThisProduct.options_for_product;
const currentOptionId = ref(optionsForThisProduct[0].id);

const nameOfCurrentOption = computed(() => {
  const indexOfCurrentOption = optionsForThisProduct.findIndex((option) => {
    return option.id == currentOptionId.value;
  });
  console.log(optionsForThisProduct[indexOfCurrentOption]);
  return optionsForThisProduct[indexOfCurrentOption].name;
});

function changeActiveSlide(pictureId, direction) {
  let index = picturesForThisProduct.value.findIndex((item) => item.id == pictureId);
  if (direction == 'right') {
    if (index == picturesForThisProduct.value.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
  } else if (direction == 'left') {
    if (index == 0) {
      index = picturesForThisProduct.value.length - 1;
    } else {
      index = index - 1;
    }
  } //Might be better way to check it

  bigPictureSwiper.value.slideTo(index);
  smallPictureSwiper.value.slideTo(index);
}

async function changeOption(optionId) {
  picturesForThisProduct.value = await productStore.getAnotherOptionForProduct(optionId);
  picturesForThisProduct.value = picturesForThisProduct.value.pictures_for_this;
  currentOptionId.value = optionId;
}

const isNextSlideOnPictures = computed(() => {
  if (bigPictureSwiper.value == null) {
    return false;
  }
  return bigPictureSwiper.value.activeIndex != picturesForThisProduct.value.length - 1;
});

const isPreviousSlideOnPictures = computed(() => {
  if (bigPictureSwiper.value == null) {
    return false;
  }
  return bigPictureSwiper.value.activeIndex != 0;
});

function bigPictureSwiperNextSlide() {
  bigPictureSwiper.value.slideNext();
  smallPictureSwiper.value.slideNext();
};

function bigPictureSwiperPrevSlide() {
  bigPictureSwiper.value.slidePrev();
  smallPictureSwiper.value.slidePrev();
};

const zoomedInIsOpened = ref(false);
const scaledUpImg = ref('');
const scaledUpId = ref('');
const zoomInMore = ref(false);

function openZoomIn(pictureImgURL, pictureId) {
  scaledUpImg.value = pictureImgURL;
  zoomedInIsOpened.value = true;
  scaledUpId.value = pictureId;
}

const hover = ref(false);
const closeButtonAnimation = ref(false);

function closeZoomInHoverAnimation() {
  if (hover.value == true) {
    return;
  }
  closeButtonAnimation.value = true;
  hover.value = true;
  setTimeout(() => {
    closeButtonAnimation.value = false;
  }, 300);
}

const reverseCloseButtonAnimation = ref(false);
function closeZoomInHoverReverseAnimation() {
  reverseCloseButtonAnimation.value = true;
  hover.value = false;
  setTimeout(() => {
    reverseCloseButtonAnimation.value = false;
  }, 300);
}

const currentSlide = computed(() => {
  const index = picturesForThisProduct.value.findIndex((item) => item.id == scaledUpId.value);
  return index + 1;
}); //Dop I really need it?

function swipeZoomedInPictures(direction) {
  let slideIndex = picturesForThisProduct.value.findIndex((item) => item.id == scaledUpId.value);

  if (direction == 'forward') {
    if (slideIndex + 1 == picturesForThisProduct.value.length) {
      slideIndex = -1;
    }
    bigPictureSwiper.value.slideTo(slideIndex + 1);
    scaledUpImg.value = picturesForThisProduct.value[slideIndex + 1].imgURL;
    scaledUpId.value = picturesForThisProduct.value[slideIndex + 1].id;
    return;
  }
  if (slideIndex == 0) {
    slideIndex = picturesForThisProduct.value.length;
  }
  bigPictureSwiper.value.slideTo(slideIndex - 1);
  scaledUpImg.value = picturesForThisProduct.value[slideIndex - 1].imgURL;
  scaledUpId.value = picturesForThisProduct.value[slideIndex - 1].id;
}

const activeSmallPictureId = computed(() => {
  if (smallPictureSwiper.value == null) {
    return;
  }
  return picturesForThisProduct.value[bigPictureSwiper.value.activeIndex].id;
});

</script>

<template>
  <div class="flex">
    <div class="h-[500px] flex w-[10%] !hidden lg:!block">
      <!-- Small pictures -->
      <swiper :slidesPerView="'auto'" :spaceBetween="20" @swiper="setSmallPicturesSwiper"
        watch-slides-progress :direction="'vertical'" class="max-h-full">
        <swiper-slide v-for="picture in picturesForThisProduct" @click="changeActiveSlide(picture.id)"
          class="!h-fit rounded-lg cursor-pointer rounded-lg border-[1px] border-transparent"
          :class="{ '!border-blue-900': activeSmallPictureId == picture.id }">
          <img :src="'/images/' + picture.imgURL" class="h-[auto] w-full rounded-lg" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="h-[380px] lg:h-[500px] flex w-[50%] lg:w-[45%]">
      <!-- Big picture -->
      <swiper class="relative w-full justify-center" :slidesPerView="1" @swiper="setBigPictureSwiper">
        <swiper-slide v-for="picture in picturesForThisProduct" class="!flex justify-center">
          <img :src="'/images/' + picture.imgURL" class="h-full rounded-lg cursor-zoom-in"
            @click="openZoomIn(picture.imgURL, picture.id)" />
        </swiper-slide>
        <nextSlideButton @next-slide="bigPictureSwiperNextSlide" :isShowing="isNextSlideOnPictures" />
        <prevSlideButton @prev-slide="bigPictureSwiperPrevSlide" :isShowing="isPreviousSlideOnPictures" />
      </swiper>

      <div class="fixed top-0 right-0 w-full h-full bg-black/50 z-40" v-if="zoomedInIsOpened"
        @click="zoomedInIsOpened = false" /> <!-- The background tint -->

      <div class="fixed w-[98%] h-[500px] md:h-[98%] top-[50%] translate-y-[-50%] right-[1%] z-50 flex justify-center bg-white rounded-lg overflow-scroll
        cursor-pointer" v-if="zoomedInIsOpened">
        <button @click="zoomedInIsOpened = false"
          class="absolute top-[2%] right-[2%] text-2xl border-[1px] border-slate-300 rounded-full h-[50px] w-[50px]">
          <font-awesome-icon :icon="['fas', 'xmark']" @mouseover="closeZoomInHoverAnimation"
            @mouseleave="closeZoomInHoverReverseAnimation"
            :class="{ 'fa-spin': closeButtonAnimation || reverseCloseButtonAnimation, 'fa-spin-reverse': reverseCloseButtonAnimation }" />
        </button>

        <img :src="'/images/' + scaledUpImg" @click="zoomInMore = !zoomInMore" class="h-[100%]"
          :class="{ 'w-[90%]': zoomInMore, 'h-fit': zoomInMore, 'cursor-zoom-in': !zoomInMore, 'cursor-zoom-out': zoomInMore }" />

        <button
          class="rounded-full px-12 py-2 text-md my-4 bg-white h-fit fixed bottom-[20px] border-[1px] border-slate-300">
          <font-awesome-icon :icon="['fas', 'chevron-left']" @click="swipeZoomedInPictures('back')" />
          <span class="mx-4">{{ currentSlide }}/{{ picturesForThisProduct.length }}</span>
          <font-awesome-icon :icon="['fas', 'chevron-right']" @click="swipeZoomedInPictures('forward')" />
        </button>
      </div> <!-- Zoomed In Picture -->
    </div>

    <div class="h-[380px] lg:h-[500px] flex flex-col w-[50%] lg:w-[45%] pr-2"> <!-- Section to the right -->
      <h2 class="my-4 font-semibold">{{ product.title }}</h2>

      <NuxtLink class="pb-8 border-b-2 border-indigo-500 w-[100%]  mb-5 flex"
        :to="{ path: '/products/' + route.params.id, hash: '#comments' }">
        <span>${{ product.price }}0</span>
        <starsComponent :stars="props.productRatingInProcents" />
        <span>({{ props.amountOfComments }})</span>
      </NuxtLink> <!-- Stars -->

      <span class="">Options:
        <span class="">{{ nameOfCurrentOption }}</span>
      </span>
      <div class="flex mt-2 w-full">
        <img :src="'/images/' + option.imgURL" class="w-[100px] mr-2 rounded-lg border-[1px] border-transparent"
          v-for="option in optionsForThisProduct" :class="{ '!border-sky-500': currentOptionId === option.id }"
          @click="changeOption(option.id)" />
      </div>
    </div>

  </div>
</template>
