<template>
    <div class="content_wrapper grid_content">
        <!-- BOX 1 -->
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            <text class="font_primary">fsafsdaf</text><span>fsdafsdaf</span>
          </p>
          <div>
            <swiper v-bind="swiperOptions" :modules="modules" class="cart_list">
              <swiper-slide v-for="item in 50">
                <div class="cart_item">
                  <div class="image">
                    <img
                      src="https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg"
                      alt="default"
                    />
                  </div>
                  <div
                    class="cart_item_content"
                    data-status="1"
                    data-show-button="true"
                  >
                    <p class="box_title mg_0">Text Title {{ item }}</p>
                    <p>Text Description</p>
                    <p class="dp_flex">
                      <Rating @v-model="selectedRating" /><span>(100)</span>
                    </p>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>

      <!-- BOX 2 -->
       <div>
        <img class="wd_p100" src="https://cf.shopee.vn/file/vn-11134258-7r98o-lylx97r9vezl4e" />
       </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Pagination, Navigation } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  import { ref } from "vue";
  
  const modules = [Pagination, Navigation];
  const swiperOptions = {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 20,
    Pagination: true,
    navigation: true,
    loop: true,
    autoplay: {
      delay: 3000,
    },
  };
  
  const selectedRating = ref(0);
  </script>
  
  <style scoped>
  .cart_item {
    padding: 0;
    /* overflow: hidden; */
    border: 0;
  }
  .cart_item image {
    width: 250px;
  }
  .cart_item_content {
    padding: 10px 0px 0;
  }
  
  </style>
  