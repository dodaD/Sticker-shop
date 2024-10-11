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
if (productStore.response.products === undefined) {
  productStore.response = await productStore.getProducts();
}

const commentsStore = useCommentsStore();
const route = useRoute();
const product = computed(() => {
  if (productStore.response.products !== undefined) {
    return productStore.response.products.find((item) => item.id == route.params.id);
  }
});


const youMightLikeProducts = await productStore.getYouMightLikeProducts(route.params.id);
const youMightLikeSwiper = ref(null);
const setYouMightLikeSwiper = (swiper) => {
  youMightLikeSwiper.value = swiper;
};

function youMightLikeSwiperNextSlide() {
  youMightLikeSwiper.value.slideNext();
};
function youMightLikeSwiperPrevSlide() {
  youMightLikeSwiper.value.slidePrev();
};

const isNextSlideOnYouMightLike = computed(() => {
  if (youMightLikeSwiper.value == null) {
    return false;
  }
  return youMightLikeSwiper.value.activeIndex != 5;
});

const isPreviousSlideOnYouMightLike = computed(() => {
  if (youMightLikeSwiper.value == null) {
    return false;
  }
  return youMightLikeSwiper.value.activeIndex != 0;
});


const fetchComments = await commentsStore.getCommentsForProduct(route.params.id);
const fetchRatingStatistics = await commentsStore.getStarStatisticsForProduct(route.params.id);
const ratingStatistics = fetchRatingStatistics[0];
const comments = ref(fetchComments.comments);

const filteredByStarsComments = ref(comments.value);
const currentStarFilter = ref(null);

function getsCommentsWithSpecificStars(starFilter) {
  if (ratingStatistics[starFilter] == 0) {
    return;
  }
  currentStarFilter.value = starFilter;
  filteredByStarsComments.value = comments.value.filter((comment) => {
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

const lastCommentIdToShow = ref(2);
const increaseCommentIdToShowBy = 3;

if (process.client) {
  window.addEventListener('scroll', showMoreCommentsAtBottom);
}

function showMoreCommentsAtBottom() {
  let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

  if (bottomOfWindow) {
    lastCommentIdToShow.value += increaseCommentIdToShowBy;
  }
}

function clearCommentsFilters() {
  filteredByStarsComments.value = comments.value;
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

function calculateRatingStatistics() {
  const percentageOfStars = [];
  for (let i = 1; i <= 5; i++) {
    percentageOfStars[i] = (ratingStatistics[i] / productRating.amount_of_comments * 80).toPrecision(2);
  }
  return percentageOfStars;
};
const percentageOfStars = calculateRatingStatistics();

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


const ratingFilterHover = ref(false);
</script>

<!-- Flagged: See how screen devides, revise it, and adjust it. Picture is WAYYYYYY too big; doesn't make sense at all -->
<template>
  <productSectionComponent :amountOfComments="productRating.amount_of_comments"
    :productRatingInProcents="productRatingInProcents" />

  <div class="text-3xl mt-[100px] mb-4">You might also like:</div> <!-- You might like section -->

  <swiper :slidesPerView="'auto'" :spaceBetween="20" :modules="modules" @swiper="setYouMightLikeSwiper"
    class="relative w-[300px] md:w-full">
    <swiper-slide v-for="product in youMightLikeProducts.products"
      class="second-swiper-slide !flex justify-center items-center">
      <productComponent :title="product.title" :price="product.price" :img="product.imgURL" :id="product.id" />
    </swiper-slide>

    <button @click="youMightLikeSwiperPrevSlide" v-if="isPreviousSlideOnYouMightLike"
      class="absolute top-[50%] translate-y-[-50%] left-0 bg-white rounded-full h-[60px] w-[60px] cursor z-50 border-[1px] border-slate-200 flex items-center justify-center">
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
    </button>
    <button @click="youMightLikeSwiperNextSlide" v-if="isNextSlideOnYouMightLike"
      class="absolute top-[50%] translate-y-[-50%] right-0 bg-white rounded-full h-[60px] w-[60px] cursor z-50 border-[1px] border-slate-200 flex items-center justify-center">
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </button>
  </swiper>


  <div class="mt-20 mb-5 flex flex-col w-full min-h-[300px]">
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
        <div class="absolute bg-white border-[1px] rounded-lg p-2 shadow-lg top-[30px] h-[270px] w-[400px] z-50"
          v-if="showStatisticOfRating">

          <span class="font-semibold">
            <font-awesome-icon :icon="['fas', 'star']" aria-hidden="true" class="text-amber-300" />
            {{ Number(productRating.stars).toPrecision(3) }}
          </span>

          <div v-for="i in 5" class=" my-3 relative flex py-[1%] px-2 rounded-sm"
            @click="getsCommentsWithSpecificStars(i)"
            :class="{ 'bg-red-200/50': currentStarFilter == i, 'cursor-default': ratingStatistics[i] == 0, 'star-statistics': fetchRatingStatistics[i] != 0 }">
            <div class="w-[65%] bg-slate-200 top-[50%] translate-y-[-50%] h-[20px] absolute right-[2%] rounded" />
            <div v-if="showStatisticOfRating"
              class="h-[20px] top-[50%] translate-y-[-50%] star-procent absolute left-[33%] rounded">
              <div class="bg-amber-300 h-full rounded"
                :class="{ 'filling-color-animation': showFillingAnimation, 'w-[0]': !showFillingAnimation }" />
            </div>
            <span class="text-black"> ({{ ratingStatistics[i] }}) </span>
            <starsComponent :stars="i / 5 * 100" class="!ml-[0px] !mr-auto" />
          </div>
        </div>
      </button>
      <button v-if="filteredByStarsComments != comments" @click="clearCommentsFilters"
        @mouseover="clearCommentsFilterHover = true" @mouseleave="clearCommentsFilterHover = false"
        class="mr-auto underline-animation" :class="{ 'underline-animation-line-move': clearCommentsFilterHover }">
        Clear filters (Showing only: {{ currentStarFilter }} star comments)
      </button>
    </div>

    <div v-for="(comment, index) in filteredByStarsComments" :key="comment.id" class="my-2"
      :class="{ 'bounce-in': playCommentsBounceAnimation, 'hidden': index > lastCommentIdToShow }">
      <commentComponent :text="comment.text" :stars="comment.stars" :date="comment.created_at" :name="comment.name" />
    </div>
  </div>
</template>

<style scoped>
.star-statistics:hover {
  background-color: rgb(254, 202, 202, 0.5);
}

.star-statistics:nth-child(2) {
  .star-procent {
    width: v-bind(percentageOfStars[1] + '%');
  }
}

.star-statistics:nth-child(3) {
  .star-procent {
    width: v-bind(percentageOfStars[2] + '%');
  }
}

.star-statistics:nth-child(4) {
  .star-procent {
    width: v-bind(percentageOfStars[3] + '%');
  }
}

.star-statistics:nth-child(5) {
  .star-procent {
    width: v-bind(percentageOfStars[4] + '%');
  }
}

.star-statistics:nth-child(6) {
  .star-procent {
    width: v-bind(percentageOfStars[5] + '%');
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
