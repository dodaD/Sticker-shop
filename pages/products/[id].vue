<script setup>
import { computed, watch } from "vue";
import { useProductsStore } from "@/stores/products";
import { useCommentsStore } from "@/stores/comments";

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

const modules = [Navigation, Pagination, Scrollbar, A11y];

const productStore = useProductsStore();
const commentsStore = useCommentsStore();
if (productStore.response.products === undefined) {
  productStore.response = await productStore.getProducts();
}

const route = useRoute();
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

const smallPicturesDirection = computed(() => {
  if (window == undefined) {
    console.log('hi');
    return;
  }

  if (window.screen.width >= 1024) {
    return 'vertical';
  } else {
    return 'horizontal';
  }
});

const youMightLikeProducts = await productStore.getYouMightLikeProducts(route.params.id);
const youMightLikeSwiper = ref(null);
const setYouMightLikeSwiper = (swiper) => {
  youMightLikeSwiper.value = swiper;
};

const swiperNextSlide = () => {
  youMightLikeSwiper.value.slideNext();
};
const swiperPrevSlide = () => {
  youMightLikeSwiper.value.slidePrev();
};

const isNextSlide = computed(() => {
  if (youMightLikeSwiper.value == null) {
    return false;
  }
  return youMightLikeSwiper.value.activeIndex != 5;
});

const isPreviousSlide = computed(() => {
  if (youMightLikeSwiper.value == null) {
    return false;
  }
  return youMightLikeSwiper.value.activeIndex != 0;
});

const additionalPictures = await productStore.getAdditionalPicturesForProduct(route.params.id);
const picturesForThisProduct = additionalPictures.additional_pictures;
const optionsForThisProduct = additionalPictures.optional_pictures;

const activePicture = ref(picturesForThisProduct[0]);
const activeOption = ref(optionsForThisProduct[0]);

function changeActiveSlide(pictureId, direction) {
  let index = picturesForThisProduct.findIndex((item) => item.id == pictureId);
  if (direction == 'right') {
    if (index == picturesForThisProduct.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
  } else if (direction == 'left') {
    if (index == 0) {
      index = picturesForThisProduct.length - 1;
    } else {
      index = index - 1;
    }
  }
  bigPictureSwiper.value.slideTo(index);
  activePicture.value = picturesForThisProduct[index];
}

const onSlideChange = () => {
  for (let i = 0; i < picturesForThisProduct.length; i++) {
    if (bigPictureSwiper.value.activeIndex === i) {
      activePicture.value = picturesForThisProduct[i];
    }
  }
};

function changeOption(option) {
  const optionSlide = picturesForThisProduct.findIndex((item) => item.id == option);
  bigPictureSwiper.value.slideTo(optionSlide);
  const currentOption = optionsForThisProduct.findIndex((item) => item.id == option);
  activeOption.value = optionsForThisProduct[currentOption];
}

const isNextSlideOnSmallPictures = computed(() => {
  return activePicture.id != picturesForThisProduct[picturesForThisProduct.length - 1].id;
});

const isPreviousSlideOnSmallPictures = computed(() => {
  return activePicture.id != picturesForThisProduct[0].id;
});

const fetchComments = await commentsStore.getCommentsForProduct(route.params.id);
const comments = ref(fetchComments.comments);

const filteredByStarsComments = ref(comments.value.data);
const currentStarFilter = ref(null);

function getsCommentsWithSpecificStars(starFilter) {
  if (fetchRatingStatistics[starFilter] == 0) {
    return;
  }
  currentStarFilter.value = starFilter;
  filteredByStarsComments.value = comments.value.data.filter((comment) => {
    return (comment.stars == starFilter); 
  });
}


const playCommentsBounceAnimation = ref(false);

watch(currentStarFilter, (stars) => {
  if (stars !== null) {
    playCommentsBounceAnimation.value = true;
    setTimeout(() => {
      playCommentsBounceAnimation.value = false;
    }, 990);
    return;
  }
});

const getMoreCommentsLink = ref(comments.value.next_page_url);
const getMoreFilteredCommentsLink = ref(null);

async function getMoreComments() {
  if (currentStarFilter.value != null) {
    let response = null;
    if (getMoreFilteredCommentsLink.value == null) {
      response = await commentsStore.getCommentsWithSpecificStars(currentStarFilter.value, route.params.id);
    } else {
      response = await fetch(getMoreFilteredCommentsLink.value);
    }

    const json = await response.json();
    for (let i = 0; i < json.comments.data.length; i++) {
      filteredByStarsComments.value.push(json.comments.data[i]);
    }
    getMoreFilteredCommentsLink.value = json.comments.next_page_url;
    return;
  }

  const response = await fetch(getMoreCommentsLink.value);
  const json = await response.json();
  for (let i = 0; i < json.comments.data.length; i++) {
    comments.value.data.push(json.comments.data[i]);
  }
  getMoreCommentsLink.value = json.comments.next_page_url;
}

function clearCommentsFilters() {
  filteredByStarsComments.value = comments.value.data;
  currentStarFilter.value = null;
  getMoreFilteredCommentsLink.value = null;
  playCommentsBounceAnimation.value = true;
  setTimeout(() => {
    playCommentsBounceAnimation.value = false;
  }, 990);
}

const clearCommentsFilterHover = ref(false);

const productRating = await commentsStore.getStarsForProduct(route.params.id);
const productRatingInProcents = parseFloat(productRating.stars) / 5 * 100;

const fetchRatingStatistics = await commentsStore.getStarStatisticsForProduct(route.params.id);
function calculateRatingStatistics() {
  const percentageOfStars = [];
  for (let i = 1; i <= 5; i++) {
    percentageOfStars[i] = (fetchRatingStatistics[i] / productRating.amount_of_comments * 80).toPrecision(2);
  }
  return percentageOfStars;
};
const ratingStatistics = calculateRatingStatistics();

const scaledUpImg = ref('');
const scaledUpId = ref(null);
const zoomInMore = ref(false);
const zoomedInIsOpened = ref(false);
const showStatisticOfRating = ref(false);
const showFillingAnimation = ref(false);

watch(showStatisticOfRating, (status) => {
  if (status) {
    setTimeout(() => {
      showFillingAnimation.value = true;
    }, 100);
    return;
  }
  showFillingAnimation.value = false;
});

function openZoomIn(pictureImgURL, pictureId) {
  scaledUpImg.value = pictureImgURL;
  zoomedInIsOpened.value = true;
  scaledUpId.value = pictureId;
}

const currentSlide = computed(() => {
  const index = picturesForThisProduct.findIndex((item) => item.id == scaledUpId.value);
  return index + 1;
});

function swipePictures(direction) {
  let slideIndex = picturesForThisProduct.findIndex((item) => item.id == scaledUpId.value);

  if (direction == 'forward') {
    if (slideIndex + 1 == picturesForThisProduct.length) {
      slideIndex = -1;
    }
    bigPictureSwiper.value.slideTo(slideIndex + 1);
    scaledUpImg.value = picturesForThisProduct[slideIndex + 1].imgURL;
    scaledUpId.value = picturesForThisProduct[slideIndex + 1].id;
    return;
  }
  if (slideIndex == 0) {
    slideIndex = picturesForThisProduct.length;
  }
  bigPictureSwiper.value.slideTo(slideIndex - 1);
  scaledUpImg.value = picturesForThisProduct[slideIndex - 1].imgURL;
  scaledUpId.value = picturesForThisProduct[slideIndex - 1].id;
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

const currentTab = ref("description");
const ratingFilterHover = ref(false);
const showRightArrow = ref(false);
const showCustomCursor = ref(false);

function moveCursor(direction) {
  if (direction == 'right') {
    showRightArrow.value = true;
  } else {
    showRightArrow.value = false;
  }
  showCustomCursor.value = true;
  const customCursor = document.querySelector('.cursor');
  customCursor.style.top = `${event.clientY}px`;
  customCursor.style.left = `${event.clientX + window.scrollX}px`;
  customCursor.style.opacity = 1;
}
</script>

<template>
  <div class="flex lg:flex-row flex-col"
    v-if="productStore.response.products !== undefined && picturesForThisProduct !== undefined">

    <div class="flex flex-col xl:flex-row relative">

      <div class="relative lg:flex lg:max-h-[740px] h-fit translate-y-[740px] xl:translate-y-[0px]">
        <swiper :slidesPerView="'auto'" :spaceBetween="20" @swiper="setSmallPicturesSwiper"
          class=" lg:max-h-[740px] w-full" watch-slides-progress :direction="smallPicturesDirection">
          <swiper-slide v-for="picture in picturesForThisProduct" @click="changeActiveSlide(picture.id)"
            class="!h-[100px] !w-fit rounded-lg mr-2 cursor-pointer">
            <img :src="'/images/' + picture.imgURL" class="!h-[100px] !w-fit rounded-lg mr-2 cursor-pointer" />
          </swiper-slide>
        </swiper> <!-- Small pictures -->
      </div>

      <swiper class="md:w-[600px] md:h-[740px] w-[260px] h-[370px] lg:translate-y-[-100px] xl:translate-y-[0px]"
        :slides-per-view="1" :scrollbar="{ draggable: true }" @swiper="setBigPictureSwiper"
        @slideChange="onSlideChange">
        <swiper-slide v-for="picture in picturesForThisProduct" class="relative">
          <img :src="'/images/' + picture.imgURL" class="w-fit h-[100%] mx-auto rounded-lg"
            :class="{ hidden: activePicture.id !== picture.id }" />

          <div class="w-[50%] h-full absolute left-[0px] top-0 custom-cursor"
            @click="changeActiveSlide(picture.id, 'left')" @mousemove="moveCursor('left')"
            @mouseleave="showCustomCursor = false" />
          <div class="w-[50%] h-full absolute right-[0px] top-0 custom-cursor"
            @click="changeActiveSlide(picture.id, 'right')" @mousemove="moveCursor('right')"
            @mouseleave="showCustomCursor = false" />
          <!-- ^ -->
          <!--  \-  Dividing of screen for changing picture -->
          <button
            class="absolute bottom-[40px] right-[40px] bg-white rounded-full border-[1px] border-gray-400 h-[50px] w-[50px]"
            @click="openZoomIn(picture.imgURL, picture.id)">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </button>
        </swiper-slide>
      </swiper> <!-- Big Pictures -->
    </div>

    <!--  /-  Custom  cursor done by script -->
    <!-- ▽ -->
    <div
      class="bg-white rounded-full h-[60px] w-[60px] fixed cursor z-50 border-[1px] border-slate-200 opacity-0 flex items-center justify-center"
      :class="{ 'hidden': !showCustomCursor, 'block': showCustomCursor }">
      <font-awesome-icon :icon="['fas', 'chevron-right']" v-if="showRightArrow" />
      <font-awesome-icon :icon="['fas', 'chevron-left']" v-if="!showRightArrow" />
    </div>

    <div class="fixed top-0 right-0 w-full h-full bg-black/50 z-40" v-if="zoomedInIsOpened"
      @click="zoomedInIsOpened = false" />
    <div class="fixed w-[98%] h-[98productRating.stars%] top-[1%] right-[1%] z-50 flex justify-center bg-white rounded-lg overflow-scroll
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
        <font-awesome-icon :icon="['fas', 'chevron-left']" @click="swipePictures('back')" />
        <span class="mx-4">{{ currentSlide }}/{{ picturesForThisProduct.length }}</span>
        <font-awesome-icon :icon="['fas', 'chevron-right']" @click="swipePictures('forward')" />
      </button>
    </div> <!-- Zoomed In Picture -->

    <div class="w-[100%] xl:max-w-[450px] lg:ml-[10px]"> <!-- Product Description; Section Right From Product -->
      <h2 class="my-4 font-semibold">{{ product.title }}</h2>
      <NuxtLink class="pb-8 border-b-2 border-indigo-500 w-[100%]  mb-5 flex"
        :to="{ path: '/products/' + route.params.id, hash: '#comments' }">
        <span>${{ product.price }}0</span>
        <starsComponent :stars="productRatingInProcents" />
        <span>({{ productRating.amount_of_comments }})</span>
      </NuxtLink>

      <span class="">Options:
        <span class="">{{ activeOption.option_name }}</span>
      </span>
      <div class="flex mt-2">
        <img :src="'/images/' + option.imgURL" class="h-[90px] w-fit rounded-lg mr-1"
          v-for="option in optionsForThisProduct"
          :class="{ border: activeOption.id === option.id, 'border-sky-500': activeOption.id === option.id, }"
          @click="changeOption(option.id)" />
      </div>

      <div class="mt-4"> <!-- Additional tabs -->
        <button class="py-1 px-2 border-[1px] rounded-full mr-4"
          :class="{ 'border-black': currentTab == 'description', 'border-white': currentTab != 'description' }"
          @click="currentTab = 'description'">Description</button>

        <button class="py-1 px-2 border-[1px] rounded-full mr-4"
          :class="{ 'border-black': currentTab == 'delivery', 'border-white': currentTab != 'delivery' }"
          @click="currentTab = 'delivery'">Delivery</button>

        <button class="py-1 px-2 border-[1px] rounded-full"
          :class="{ 'border-black': currentTab == 'return', 'border-white': currentTab != 'return' }"
          @click="currentTab = 'return'">Return</button>

        <div class="mt-2 min-h-[50px] max-w-[100%]">
          <p v-if="currentTab == 'description'">
            {{ product.description }}
          </p>
          <p v-if="currentTab == 'delivery'">
            Here is delivery options. You pay for it; Is not included in order.
          </p>
          <p v-if="currentTab == 'return'">
            Returns accepted if stickers in perfect condition and none is missing. You must pay for shipping them back
            and won't get any refund on shipping cost.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="text-3xl mt-[100px] mb-4">You might also like:</div>

  <swiper :slidesPerView="'auto'" :spaceBetween="20" :modules="modules" @swiper="setYouMightLikeSwiper"
    class="h-full w-full relative">
    <swiper-slide v-for="product in youMightLikeProducts.products"
      class="second-swiper-slide !h-[480px] !flex justify-center items-center">
      <productComponent :title="product.title" :price="product.price" :img="product.imgURL" :id="product.id" />
    </swiper-slide>

    <button @click="swiperPrevSlide" v-if="isPreviousSlide"
      class="absolute top-[50%] translate-y-[-50%] left-0 bg-white rounded-full h-[60px] w-[60px] cursor z-50 border-[1px] border-slate-200 flex items-center justify-center">
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
    </button>
    <button @click="swiperNextSlide" v-if="isNextSlide"
      class="absolute top-[50%] translate-y-[-50%] right-0 bg-white rounded-full h-[60px] w-[60px] cursor z-50 border-[1px] border-slate-200 flex items-center justify-center">
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </button>
  </swiper>


  <div class="mt-20 mb-5 flex flex-col w-full">
    <!-- Comments -->
    <div class="mb-8 flex content-start flex-col flex-wrap">
      <span class="font-semibold" id="comments">Comments:</span>
      <button class="flex items-center cursor-pointer relative mr-auto"
        @click="showStatisticOfRating = !showStatisticOfRating">
        <starsComponent :stars="productRatingInProcents" />
        <span class="mx-2">{{ productRating.amount_of_comments }} Reviews</span>
        <arrowToggleComponent :showContext="showStatisticOfRating" />

        <!-- Pop-out menu with statistic of ratings -->
        <div class="fixed top-0 left-0 w-full h-full" v-if="showStatisticOfRating" />
        <!-- ^ -->
        <!-- | -->
        <!--  - Is here that it could cover all screen, that when you click anywhere the pop-out menu would close -->
        <div class=" absolute bg-white border-[1px] rounded-lg p-2 shadow-lg top-[30px] h-[270px] w-[400px] z-50"
          v-if="showStatisticOfRating">

          <span class="font-semibold">
            <font-awesome-icon :icon="['fas', 'star']" aria-hidden="true" class="text-amber-300" />
            {{ Number(productRating.stars).toPrecision(3) }}
          </span>

          <div v-for="i in 5" class=" my-3 relative flex py-[1%] px-2 rounded-sm"
            @click="getsCommentsWithSpecificStars(i)" :class="{ 'bg-red-200/50': currentStarFilter == i, 'cursor-default': fetchRatingStatistics[i] == 0, 'star-statistics': fetchRatingStatistics[i] != 0}">
            <div class="w-[65%] bg-slate-200 top-[50%] translate-y-[-50%] h-[20px] absolute right-[2%] rounded" />
            <div v-if="showStatisticOfRating"
              class="h-[20px] top-[50%] translate-y-[-50%] star-procent absolute left-[33%] rounded">
              <div class="bg-amber-300 h-full rounded"
                :class="{ 'filling-color-animation': showFillingAnimation, 'w-[0]': !showFillingAnimation }" />
            </div>
            <span class="text-black"> ({{ fetchRatingStatistics[i] }}) </span>
            <starsComponent :stars="i / 5 * 100" class="!ml-[0px] !mr-auto" />
          </div>
        </div>
      </button>
      <button v-if="filteredByStarsComments != comments.data" @click="clearCommentsFilters"
        @mouseover="clearCommentsFilterHover = true" @mouseleave="clearCommentsFilterHover = false"
        class="mr-auto underline-animation" :class="{ 'underline-animation-line-move': clearCommentsFilterHover }">
        Clear filters (Showing only: {{ currentStarFilter }} star comments)
      </button>
    </div>

    <div v-for="comment in filteredByStarsComments" :key="comment.id" class="my-2"
      :class="{ 'bounce-in': playCommentsBounceAnimation }">
      <commentComponent :text="comment.text" :stars="comment.stars" :date="comment.created_at" :name="comment.name" />
    </div>

    <button
      v-if="getMoreCommentsLink != null && filteredByStarsComments == comments.data || filteredByStarsComments != comments.data && getMoreFilteredCommentsLink != null"
      @click="getMoreComments" class="mx-auto mt-6 py-1 px-4 border-[1px] rounded-lg">
      Show more comments
    </button>
  </div>
</template>

<style scoped>
.star-statistics:hover {
  background-color: rgb(254, 202, 202, 0.5);
}

.star-statistics:nth-child(2) {
  .star-procent {
    width: v-bind(ratingStatistics[1] + '%');
  }
}

.star-statistics:nth-child(3) {
  .star-procent {
    width: v-bind(ratingStatistics[2] + '%');
  }
}

.star-statistics:nth-child(4) {
  .star-procent {
    width: v-bind(ratingStatistics[3] + '%');
  }
}

.star-statistics:nth-child(5) {
  .star-procent {
    width: v-bind(ratingStatistics[4] + '%');
  }
}

.star-statistics:nth-child(6) {
  .star-procent {
    width: v-bind(ratingStatistics[5] + '%');
  }
}

.filling-color-animation {
  width: 100%;
  transition: width 0.5s ease-in-out;
}

.bounce-in {
  animation: bounce-in 1s ease infinite;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(.3);
  }

  50% {
    opacity: 1;
    transform: scale(1.05);
  }

  70% {
    transform: scale(.9);
  }

  100% {
    transform: scale(1);
  }
}

.custom-cursor {
  cursor: none;
}

.second-swiper-slide {
  width: fit-content;
}

.custom-shading-left {
  box-shadow: 20px0px 20px white;
}

.custom-shading-right {
  box-shadow: -20px 0px 20px white;
}
</style>
