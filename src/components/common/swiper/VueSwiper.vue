<template>
  <!-- :slides-per-view="2" :space-between="12" :pagination="true" :modules="modules" -->
  <swiper v-bind="swiperOptions" :modules="modules">
    <swiper-slide v-for="item in 50">Slide {{ item }}</swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Navigation],
      swiperOptions: {
        breakpoints: {
          768: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
        },
        Pagination: true,
        navigation: true,
        loop: true,
        autoplay: true
      },
    };
  },
};
</script>
