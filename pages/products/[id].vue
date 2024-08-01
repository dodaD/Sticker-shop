<script setup>
import { computed, watch } from "vue";
import { useProductsStore } from "@/stores/products";

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const product = computed(() => {
  if (store.response.products !== undefined) {
    return store.response.products.find((item) => item.id == route.params.id);
  }
});

const route = useRoute();
const store = useProductsStore();
if (store.response.products === undefined) {
  store.response = await store.getProducts();
}

const fetchComments = await store.getCommentsForProduct(route.params.id);
const comments = ref(fetchComments.comments);
const filteredByStarsComments = ref(comments.value.data);
function filterCommentsByStars(i) {
  filteredByStarsComments.value = comments.value.data.filter((comment) => {
    return comment.stars == i;
  })
}
function clearCommentsFilters() {
  filteredByStarsComments.value = comments.value.data;
}

const rating = await store.getStarsForProduct(route.params.id);
const avgStarsProcent = parseFloat(rating.stars) / 5 * 100;

const fetchRatingStatistics = await store.getStarStatisticsForProduct(route.params.id);
function calculateRatingStatistics() {
  const percentageOfStars = [];
  for (let i = 1; i <= 5; i++) {
    percentageOfStars[i] = (fetchRatingStatistics[0][i] / rating.amount_of_comments * 80).toPrecision(2);
  }
  return percentageOfStars;
};
const ratingStatistics = calculateRatingStatistics();

const getMoreCommentsLink = ref(comments.value.next_page_url);
async function getMoreComments() {
  const response = await fetch(getMoreCommentsLink.value);
  const json = await response.json();
  for (let i = 0; i < json.comments.data.length; i++) {
    comments.value.data.push(json.comments.data[i]);
  }
  getMoreCommentsLink.value = json.comments.next_page_url;
}

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
const showStatisticOfRating = ref(false);
const closeStatisticRating = ref(false);

function openStatistics() {
  showStatisticOfRating.value = true;
}

const showDescription = ref(true);
const showDelivery = ref(false);
const showReturn = ref(false);

function showAnotherTab(tabToSwitchTo) {
  if (tabToSwitchTo == "description") {
    showDescription.value = true;
    showDelivery.value = false;
    showReturn.value = false;
    return;
  }

  if (tabToSwitchTo == "delivery") {
    showDescription.value = false;
    showDelivery.value = true;
    showReturn.value = false;
    return;
  }

  if (tabToSwitchTo == "return") {
    showDescription.value = false;
    showDelivery.value = false;
    showReturn.value = true;
    return;
  }
}
</script>

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

      <swiper
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
        <starsComponent :stars="avgStarsProcent" />
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

      <div class="mt-4"> <!-- Additional tabs -->
        <button class="py-1 px-2 border-[1px] rounded-full mr-4"
          :class="{ 'border-black': showDescription, 'border-white': !showDescription }"
          @click="showAnotherTab('description')">Description</button>

        <button class="py-1 px-2 border-[1px] rounded-full mr-4"
          :class="{ 'border-black': showDelivery, 'border-white': !showDelivery }"
          @click="showAnotherTab('delivery')">Delivery</button>

        <button class="py-1 px-2 border-[1px] rounded-full"
          :class="{ 'border-black': showReturn, 'border-white': !showReturn }"
          @click="showAnotherTab('return')">Return</button>

        <div class="mt-2 min-h-[50px] max-w-[100%]">
          <p v-if="showDescription">
            {{ product.description }}
          </p>
          <p v-if="showDelivery">
            Here is delivery options. You pay for it; Is not included in order.
          </p>
          <p v-if="showReturn">
            Returns accepted if stickers in perfect condition and none is missing. You must pay for shipping them back
            and won't get any refund on shipping cost.
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-20 mb-5 flex flex-col w-full" @click="closeStatisticRating = !closeStatisticRating">
    <!-- Comments -->
    <div class="mb-8 flex content-start flex-col flex-wrap">
      <span class="font-semibold">Comments:</span>
      <button class="flex items-center cursor-pointer relative" @click="openStatistics">
        <starsComponent :stars="avgStarsProcent" />
        <span class="ml-2">{{ rating.amount_of_comments }} Reviews</span>

        <div class="absolute bg-white border-[1px] rounded-lg p-2 shadow-lg top-[30px] h-[250px] w-[400px]"
          v-if="showStatisticOfRating && closeStatisticRating">

          <span class="font-semibold">
            <font-awesome-icon :icon="['fas', 'star']" aria-hidden="true" class="text-amber-300" />
            {{ Number(rating.stars).toPrecision(3) }}
          </span>
          <!-- Pop-out menu with statistic of ratings -->
          <div v-for="i in 5" class="star-statistics my-3 relative flex" @click="filterCommentsByStars(i)">
            <div class="w-[65%] bg-slate-200 w-full h-[20px] absolute top-0 right-[0px] rounded" />
            <div class="bg-amber-300 h-[20px] star-procent absolute top-0 left-[35%] rounded" />
            <span class="text-black"> ({{ fetchRatingStatistics[0][i] }}) </span>
            <starsComponent :stars="i / 5 * 100" class="!ml-[0px] !mr-auto" />
          </div>
        </div>
      </button>
    </div>

    <div v-for="comment in filteredByStarsComments" :key="comment.id" class="my-2">
      <commentComponent :text="comment.text" :stars="comment.stars" :date="comment.created_at" :name="comment.name" />
    </div>
    <button v-if="filteredByStarsComments != comments.data" @click="clearCommentsFilters" class="mr-auto">Clear
      Filters</button>
    <button v-if="getMoreCommentsLink != null" @click="getMoreComments" class="mr-auto">Load more</button>
  </div>
</template>

<style scoped>
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
</style>
