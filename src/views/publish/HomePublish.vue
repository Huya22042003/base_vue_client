<template>
  <div class="content_wrapper grid_content">
    <!-- Start Banner Content -->
    <div class="mb_8 dp_flex">
      <div class="banner_content_left">
        <img class="" style="width: 800px; padding-right: 5px" src="../../assets/images/banner/Banner 1.png" />
      </div>
      <div class="banner_content_right">
        <div class="dp_flex flex_column">
          <img style="width: 390px; padding-bottom: 5px" src="../../assets/images/banner/Banner 2.png" />
          <img style="width: 390px" src="../../assets/images/banner/Banner 3.png" />
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
            <div class="category_item transition_light">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item transition_light">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item transition_light">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item transition_light">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item transition_light">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item transition_light">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item transition_light">
              <img
                src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" />
              <div>
                <p>Hôm nay ăn gì?</p>
              </div>
            </div>
            <div class="category_item transition_light">
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

    <div class="box dp_block">
      <div class="box_section">
        <div>

          <swiper key="store" v-bind="{
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 0,
            Pagination: true,
            navigation: true,
            loop: true,
            autoplay: {
              delay: 6000,
            },
          }" :modules="modules" class="dp_flex jc_center gap_20">
            <swiper-slide v-for="(item, index) in 10">
              <div class="voucher-card code-discount mg_r20" :key="index">
                <div class="left transition_light">
                  <h3>{{ "50%" }}</h3>
                  <span>{{ "Giảm giá" }}</span>
                </div>
                <div class="right">
                  <div class="details">{{ "Áp dụng cho đơn hàng trên 200K" }}</div>
                  <div class="quantity">Số lượng còn lại: {{ 50 }}</div>
                  <div class="expiry">HSD: {{ "31/12/2024" }}</div>
                  <div class="button_vourcher">
                    <button>{{ "Lưu" }}</button>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <!-- End Code Discount -->
      </div>
    </div>

    <!-- Start Blogs -->
    <div class="dp_flex blogs gap_30">
      <div class="flex_5">
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
              <div class="top_blogs dp_flex">
                <template v-for="item in 3">
                  <div class="card-v1">
                    <div class="card-v1-image" :style="{
                      height: `160px`,
                      backgroundImage: `url(https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg)`,
                    }">
                    </div>
                    <div class="category">Đang diễn ra</div>
                    <div class="heading">
                      A heading that must span over two lines
                      <div class="description">A heading that must span over two lines</div>
                      <div class="author">
                        Người viết <span class="name">Nguyễn Quốc Huy</span>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <!-- End Top Blogs -->

        <!-- Start Top Menu -->

        <div class="box dp_block top_menu" style="padding-bottom: 50px">
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
              <div class="top_menu_content">
                <template v-for="item in 9">
                  <div class="card-v1-hori">
                    <div class="card-image" :style="{
                      backgroundImage: `url(https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg)`,
                    }"></div>
                    <div class="card-content">
                      <div class="category">Illustration</div>
                      <div class="heading">
                        A heading that must span over two lines
                        <div class="author">By <span class="name">Abi</span> 4 days ago</div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <!-- End Top Menu -->
      </div>

      <div class="flex_2">
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
              }" :modules="modules" class="dp_flex jc_center">
                <swiper-slide v-for="item in 5">
                  <div class="card-v1">
                    <div class="card-v1-image" :style="{
                      height: '200px',
                      backgroundImage: `url(https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg)`,
                    }"></div>
                    <div class="category">Đang diễn ra</div>
                    <div class="heading">
                      A heading that must span over two lines
                      <div class="author">
                        <span class="name">Thời gian:</span> 12/12/2024 - 13/12/2024
                        <br />
                        <span class="name">Người tạo:</span> Nguyễn Quốc Huy
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>

        <div class="mg_b30" v-for="item in 3">
          <img class="" style="width: 100%;" src="../../assets/images/banner/Banner 1.png" />
        </div>
      </div>
    </div>
    <!-- End Blogs -->

    <!-- Start Banner Food -->
    <div class="mb_8">
      <img class="wd_p100" src="../../assets/images/banner/Thêm tiêu đề phụ.png" />
    </div>
    <!-- End Banner Food -->

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
            <swiper-slide v-for="item in 30">
              <div class="card-v1">
                <div class="card-v1-image" :style="{
                  backgroundImage: `url(https://via.placeholder.com/320x180.png?text=Event+1)`,
                }"></div>
                <div class="category">Đang diễn ra</div>
                <div class="heading">
                  A heading that must span over two lines
                  <div class="author">
                    <span class="name">Thời gian:</span> 12/12/2024 - 13/12/2024
                    <br />
                    <span class="name">Người tạo:</span> Nguyễn Quốc Huy
                  </div>
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
      <img class="wd_p100" src="../../assets/images/banner/banner 4.png" />
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
    <!-- Start Blog Category -->
    <div class="box dp_block" v-for="category in 3">
      <div class="box_section">
        <div class="box_inner">
          <h3 class="box_title_sm">
            <text>Thể Loại {{ category }}</text>
          </h3>

          <div class="box_title_funtion">
            <a href="javascript:void(0);" class="font_primary">Xem tất cả</a>
          </div>
        </div>
        <div>
          <div class="top_blogs dp_flex">
            <div class="card-v1" v-for="item in 5">
              <div class="card-v1-image" :style="{
                backgroundImage: `url(https://via.placeholder.com/320x180.png?text=Event+1)`,
              }"></div>
              <div class="category">Đang diễn ra</div>
              <div class="heading">
                A heading that must span over two lines
                <div class="author">
                  <span class="name">Thời gian:</span> 12/12/2024 - 13/12/2024
                  <br />
                  <span class="name">Người tạo:</span> Nguyễn Quốc Huy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Blog Category -->
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

<style scoped></style>
