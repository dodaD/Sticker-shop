<script setup>
import { computed, watch } from "vue";
import { useProductsStore } from "@/stores/products";
import { useCommentsStore } from "@/stores/comments";

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

const modules = [Navigation, Pagination, Scrollbar, A11y];

const route = useRoute();
const productStore = useProductsStore();
if (productStore.response.products === undefined) {
  productStore.response = await productStore.getProducts();
}

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
  }

  bigPictureSwiper.value.slideTo(index);
  smallPictureSwiper.value.slideTo(index);
}

async function changeOption(optionId) {
  picturesForThisProduct.value = await productStore.getAnotherOptionForProduct(optionId);
  picturesForThisProduct.value = picturesForThisProduct.value.pictures_for_this;

  const currentOption = optionsForThisProduct.findIndex((item) => item.id == optionId);
}

const isNextSlideOnPictures = computed(() => {
  return //TODO use ActiveIndex;
});

const isPreviousSlideOnPictures = computed(() => {
  return //TODO use ActiveIndex;
});

function bigPictureSwiperNextSlide() {
  bigPictureSwiper.value.slideNext();
  smallPictureSwiper.value.slideNext();
};

function bigPictureSwiperPrevSlide() {
  bigPictureSwiper.value.slidePrev();
  smallPictureSwiper.value.slidePrev();
};


function openZoomIn(pictureImgURL, pictureId) {
  scaledUpImg.value = pictureImgURL;
  zoomedInIsOpened.value = true;
  scaledUpId.value = pictureId;
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
  return picturesForThisProduct.value[smallPictureSwiper.value.activeIndex].id;
});
</script>

<template>
  <div class="flex">
    <div class="h-[500px] flex"> <!-- Swiper Pictures -->
      <!-- Small pictures -->
      <swiper :slidesPerView="'auto'" :spaceBetween="20" @swiper="setSmallPicturesSwiper"
        class="!hidden lg:!block !mr-6 max-w-fit]" watch-slides-progress :direction="'vertical'">
        <swiper-slide v-for="picture in picturesForThisProduct" @click="changeActiveSlide(picture.id)"
          class="!h-[100px] !w-fit rounded-lg cursor-pointer rounded-lg border-[1px] border-transparent"
          :class="{ '!border-blue-900': activeSmallPictureId == picture.id }">
          <img :src="'/images/' + picture.imgURL" class="h-full w-[auto] rounded-lg" />
        </swiper-slide>
      </swiper>

      <!-- Big picture -->
      <swiper class="relative w-[360px]" :slidesPerView="1" @swiper="setBigPictureSwiper">
        <swiper-slide v-for="picture in picturesForThisProduct" class="">
          <img :src="'/images/' + picture.imgURL" class="h-full rounded-lg cursor-zoom-in"
            @click="openZoomIn(picture.imgURL, picture.id)" />
        </swiper-slide>
        <nextSlideButton @next-slide="bigPictureSwiperNextSlide" />
        <prevSlideButton @prev-slide="bigPictureSwiperPrevSlide" />
      </swiper>
    </div>

    <div> <!-- Section to the right -->

    </div>

  </div>
</template>
