<template>
    <div class="content_wrapper grid_content">
      <!-- Start Search -->
      <div class="mb_8">
        <img
          class="wd_p100"
          src="https://cf.shopee.vn/file/sg-11134252-7rfgh-m31m3bt2qd660e"
        />
      </div>
      <!-- End Search -->

      <!-- Start Blogs -->
      <div class="dp_flex blogs">
        <div class="flex_5 mr_7">
          <!-- Start Search Blogs -->
           <div class="card_list_horizontal">
                  <template v-for="item in 3">
                    <div class="card_item">
                      <!-- Số thứ tự -->
                      <!-- <div class="item_number">
                        {{ item }}
                      </div> -->
  
                      <!-- Nội dung card -->
                      <div class="card_item_content">
                        <div class="image">
                          <img
                            src="https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg"
                            alt="default"
                          />
                        </div>
                        <div class="content_details">
                          <h3 class="box_title">Text Title {{ item }}</h3>
                          <p>
                            Text Description fdsfds afdddddd dddddd dddd ddddđ
                          </p>
                        </div>
                      </div>
                    </div>
                  </template></div>
          <!-- End Search Blogs -->
        </div>
  
        <div>
          <div class="box dp_block">
            <div class="box_section">
              <div class="box_inner">
                <h3 class="box_title_sm">
                  <text class="font_primary">Cửa Hàng</text><span>Nổi bật</span>
                </h3>
  
                <div class="box_title_funtion">
                  <a href="javascript:void(0);" class="font_primary"
                    >Xem tất cả</a
                  >
                </div>
              </div>
              <div style="width: 315px">
                <swiper
                  key="store"
                  v-bind="{
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 0,
                    Pagination: true,
                    navigation: true,
                    loop: true,
                    autoplay: {
                      delay: 3000,
                    },
                  }"
                  :modules="modules"
                  class="cart_list dp_flex jc_center"
                >
                  <swiper-slide
                    v-for="item in 5"
                    class="cart_item"
                    style="max-width: 315px"
                  >
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
                      <p>Text Descriptionfdsfdsafddddddddddddddddddddđ</p>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Blogs -->
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Pagination, Navigation, Autoplay } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  import { ref } from "vue";
  
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
  .card_list_horizontal .card_item {
    border-radius: 0;
    padding: 2.3rem;
    border-left: none;
    border-right: none;
  }
  .card_list_horizontal .image img {
    border-radius: 0;
  }
  .card_list_horizontal .content_details {
    display: block;
  }
  .card_list_horizontal .image img {
    width: 200px;
    height: 180px;
  }
  .card_list_horizontal .box_title {
    font-size: 2rem !important;
  }
  .card_list_horizontal .content_details p {
    font-size: 1.3rem
  }
  </style>
  