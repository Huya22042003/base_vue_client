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
          <img style="width: 390px" src="https://cf.shopee.vn/file/sg-11134258-7rfgd-m30b9ivpfj0bc2_xhdpi" />
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
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Category -->

    <!-- Start Blogs -->
    <div class="dp_flex blogs">
      <div class="flex_5 mr_7">
        <!-- Start Top Blogs -->
        <div class="box dp_block">
          <div class="box_section">
            <div class="box_inner">
              <h3 class="box_title_sm">
                <text class="font_primary">Top Blog</text><span>Hay</span>
              </h3>

              <div class="box_title_funtion">
                <a href="javascript:void(0);" class="font_primary">Xem tất cả</a>
              </div>
            </div>
            <div>
              <div class="top_blogs cart_list dp_flex">
                <template v-for="item in 4">
                  <div class="cart_item" style="max-width: 180px">
                    <div class="image">
                      <img
                        src="https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg"
                        alt="default" />
                    </div>
                    <div class="cart_item_content" data-status="1" data-show-button="true">
                      <p class="box_title mg_0">Text Title {{ item }}</p>
                      <span>status</span>
                      <p>Text Descriptionfdsfdsafddddddddddddddddddddđ</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <!-- End Top Blogs -->

        <!-- Start Top Menu -->

        <div class="box dp_block top_menu">
          <div class="box_section">
            <div class="box_inner">
              <h3 class="box_title_sm">
                <text class="font_primary">Top Menu</text><span>New</span>
              </h3>

              <div class="box_title_funtion">
                <a href="javascript:void(0);" class="font_primary">Xem tất cả</a>
              </div>
            </div>
            <div>
              <div class="cart_list top_menu_content">
                <template v-for="item in 6">
                  <div class="cart_item">
                    <div class="image">
                      <img
                        src="https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg"
                        alt="default" />
                    </div>
                    <div class="cart_item_content" data-status="1" data-show-button="true">
                      <p class="box_title mg_0">Text Title {{ item }}</p>
                      <span>status</span>
                      <p>Text Descriptionfdsfdsafddddddddddddddddddddđ</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <!-- End Top Menu -->
      </div>

      <div class="flex_3">
        <div class="box dp_block">
          <div class="box_section">
            <div class="box_inner">
              <h3 class="box_title_sm">
                <text class="font_primary">Cửa Hàng</text><span>Nổi bật</span>
              </h3>

              <div class="box_title_funtion">
                <a href="javascript:void(0);" class="font_primary">Xem tất cả</a>
              </div>
            </div>
            <div style="width: 315px">
              <swiper key="store" v-bind="{
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 0,
                Pagination: true,
                navigation: true,
                loop: true,
                autoplay: {
                  delay: 3000,
                },
              }" :modules="modules" class="cart_list dp_flex jc_center">
                <swiper-slide v-for="item in 5" class="cart_item" style="max-width: 315px">
                  <div class="image">
                    <img
                      src="https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg"
                      alt="default" />
                  </div>
                  <div class="cart_item_content" data-status="1" data-show-button="true">
                    <p class="box_title mg_0">Text Title {{ item }}</p>
                    <p>Text Descriptionfdsfdsafddddddddddddddddddddđ</p>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
        <div class="box dp_block flex_3">
          <div class="box_section">
            <div class="box_inner">
              <h3 class="box_title_sm">
                <text class="font_primary">Món Ngon</text><span>Thịnh Hành</span>
              </h3>

              <div class="box_title_funtion">
                <a href="javascript:void(0);" class="font_primary">Xem tất cả</a>
              </div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Blogs -->

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
          <swiper key="cookies_store" v-bind="swiperOptions" :modules="modules" class="cart_list">
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
    <div class="mb_8">
      <img class="wd_p100" src="https://cf.shopee.vn/file/vn-11134258-7r98o-lylx97r9vezl4e" />
    </div>
    <!-- End Banner sales -->

    <!-- Start Hot Search -->
    <div class="box dp_block">
      <div class="box_inner">
        <h3 class="box_title_sm">
          <text class="font_primary">Từ khóa tìm kiếm nổi bật </text>
        </h3>
      </div>

      <div class="radio_tab_wrap black">
        <p class="radio_tab inline">
          <input type="radio" id="radio_round_black1" value="" checked />
          <label for="radio_round_black1">Món Ngon Hà Nội</label>
        </p>
        <p class="radio_tab inline">
          <input type="radio" id="radio_round_black2" value="" />
          <label for="radio_round_black2">Phở Ngon</label>
        </p>
        <p class="radio_tab inline">
          <input type="radio" id="radio_round_black3" value="" />
          <label for="radio_round_black3">Nấu Gì Hôm Nay</label>
        </p>
      </div>
    </div>
    <!-- End Hot Search -->
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
.cart_item {
  padding: 0;
  border: 0;
}

.cart_item image {
  max-width: 250px;
}

.cart_item_content {
  padding: 10px 0px 0;
  cursor: pointer;
}

.cart_item_content p {
  word-wrap: break-word;
}

.category_list {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  /* gap: 10px; */
  width: 100%;
}

.category_item {
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.87);
  display: block;
  position: relative;
  text-align: center;
  transition:
    transform 0.1s cubic-bezier(0.4, 0, 0.6, 1),
    box-shadow 0.1s cubic-bezier(0.4, 0, 0.6, 1);
  padding: 10px;
  cursor: pointer;
}

.category_item:first-child {
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}

.category_item:hover {
  border-color: rgba(0, 0, 0, 0.12);
  border-width: 1px;
  box-shadow: 0 0 0.8125rem 0 rgba(0, 0, 0, 0.05);
  transform: translateZ(0);
  z-index: 1;
}

.category_item img {
  height: 85px;
}

.top_blogs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.top_menu_content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>
