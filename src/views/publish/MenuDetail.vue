<template>
    <div class="content_wrapper grid_content">
      <!-- Start Category -->
      <div class="box dp_block">
        <div class="box_section">
            <div class="dp_flex jc_center flex_column" style="width: 700px; margin: auto;">
                <img src="https://recipe1.ezmember.co.kr/cache/recipe/2018/07/29/52046ea43391de69233f594b0b52bb311.JPG" style="width: 700px;" />
                <div class="dp_flex jc_between">
                    <div>Shopping</div>
                    <div>
                        <div>
                            <IconBase
                                width="64"
                                height="64"
                                color="black"
                                stroke="1.5"
                            />
                        </div>
                    </div>
                    <div>View</div>
                </div>
            </div>
        </div>
      </div>
      <!-- End Category -->
    </div>
  </template>
  
  <script setup lang="ts">
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Pagination, Navigation, Autoplay } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  import { ref } from "vue";
import IconBase from "@/components/icon/IconBase.vue";
  
  const modules = [Pagination, Navigation, Autoplay];
  const swiperOptions = {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 20,
    Pagination: true,
    navigation: true,
    loop: true,
    autoplay: {
      delay: 4000,
    },
  };
  
  const selectedRating = ref(0);
  </script>
  
  <style scoped>
  </style>
  