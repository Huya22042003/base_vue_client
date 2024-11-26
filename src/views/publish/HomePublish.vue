<template>
  <div class="content_wrapper grid_content">
    <!-- Start Banner Content -->
    <div class="mb_8 dp_flex">
      <div class="banner_content_left">
        <img class="" style="width: 800px; padding-right: 5px"
          src="https://cf.shopee.vn/file/sg-11134258-7reo9-m2w3m7pquhh5f4_xxhdpi" />
      </div>
      <div class="banner_content_right">
        <div class="dp_flex flex_column">
          <img style="width: 390px; padding-bottom: 5px"
            src="https://cf.shopee.vn/file/sg-11134258-7rfgd-m30b9ivpfj0bc2_xhdpi" />
          <img style="width: 390px;" src="https://cf.shopee.vn/file/sg-11134258-7rfgd-m30b9ivpfj0bc2_xhdpi" />
        </div>
      </div>
    </div>
    <!-- End Banner Content -->

    <!-- Start Category -->
    <div class="box dp_block">
      <div class="box_section">
        <div class="box_inner">
          <h3 class="box_title_sm">
            <text class="font_primary">Danh mục</text>
          </h3>
        </div>
        <div>
          <div class="category_list">
            <div class="category_item">
              <img src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>
                  Hôm nay ăn gì?
                </p>
              </div>
            </div>
            <div class="category_item">
              <img src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>
                  Hôm nay ăn gì?
                </p>
              </div>
            </div>
            <div class="category_item">
              <img src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>
                  Hôm nay ăn gì?
                </p>
              </div>
            </div>
            <div class="category_item">
              <img src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>
                  Hôm nay ăn gì?
                </p>
              </div>
            </div>
            <div class="category_item">
              <img src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>
                  Hôm nay ăn gì?
                </p>
              </div>
            </div>
            <div class="category_item">
              <img src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>
                  Hôm nay ăn gì?
                </p>
              </div>
            </div>
            <div class="category_item">
              <img src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>
                  Hôm nay ăn gì?
                </p>
              </div>
            </div>
            <div class="category_item">
              <img src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>
                  Hôm nay ăn gì?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Category -->

    <!-- Start Store -->
    <div class="box dp_block">
      <div class="box_section">
        <div class="box_inner">

          <h3 class="box_title_sm">
            <text class="font_primary">Cookies Store</text><span>New</span>
          </h3>

          <div class="box_title_funtion">
            <a href="javascript:void(0);" class="font_primary">Xem tất cả</a>
          </div>
        </div>
        <div>
          <swiper v-bind="swiperOptions" :modules="modules" class="cart_list">
            <swiper-slide v-for="item in 50">
              <div class="cart_item">
                <div class="image">
                  <img src="https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg"
                    alt="default" />
                </div>
                <div class="cart_item_content" data-status="1" data-show-button="true">
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
    <!-- End Store -->

    <!-- Start Banner sales -->
    <div>
      <img class="wd_p100" src="https://cf.shopee.vn/file/vn-11134258-7r98o-lylx97r9vezl4e" />
    </div>
    <!-- End Banner sales -->
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

.category_list {
  display: grid;
  grid-template-columns: repeat(8, 1fr); /* 8 cột, mỗi cột có kích thước bằng nhau */
  gap: 10px; /* Khoảng cách giữa các cột và hàng */
  width: 100%; /* Đảm bảo grid chiếm toàn bộ chiều rộng */
}

.category_item {
  background-color: var(--white);
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px
}
.category_item img {
  height: 85px;
}
</style>