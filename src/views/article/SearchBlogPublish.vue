<template>
  <div class="content_wrapper grid_content">
    <!-- Start Search -->
    <div class="mb_8 form_search">
      <div>
        <SelectBoxBase :data="listSelectBox" />
      </div>
      <div>
        <div class="dp_flex">
          <InputBase
            style="background-color: #fff; border-radius: 0px !important"
          />
          <button
            class="button btn_blue ellipsis btn_icon btn_search"
            style="border-radius: 0 !important; color: #fff"
          />
        </div>
      </div>
      <div class="dp_flex">
        <button class="button btn_blue ellipsis wd_p100">
          Tìm kiếm năng cao
        </button>
      </div>
    </div>
    <!-- End Search -->

    <!-- Start Blogs -->
    <div class="dp_flex blogs">
      <div class="flex_5 mr_7">
        <div>
          <div class="box" id="section14">
            <p><b>Kết quả tìm kiếm: </b>100 bài tương tự</p>
          </div>
        </div>

        <img
          class="wd_p100 mg_b30"
          src="https://cf.shopee.vn/file/sg-11134258-7reo9-m2w3m7pquhh5f4_xxhdpi"
        />
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
                  <p>Text Description fdsfds afdddddd dddddd dddd ddddđ</p>
                </div>
              </div>
            </div>
          </template>
        </div>
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
        <div class="dp_flex flex_column">
          <img
            style="max-width: 364px; height: 200px; margin-bottom: 20px"
            src="https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg"
            alt="default"
          />
          <img
            style="max-width: 364px; height: 200px"
            src="https://recipe1.ezmember.co.kr/cache/data/goods/24/10/41/1000047271/1000047271_list_036.jpg"
            alt="default"
          />
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
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import InputBase from "@/components/common/input/InputBase.vue";

const modules = [Pagination, Navigation, Autoplay];

const listSelectBox = ref<Array<any>>([
  { cdId: "", cdNm: "전체", upCdId: "1" },
  { cdId: "12", cdNm: "비게시", upCdId: "1" },
  { cdId: "13", cdNm: "비게시1", upCdId: "1" },
  { cdId: "14", cdNm: "비게시2", upCdId: "1" },
  { cdId: "15", cdNm: "비게시비게시비게시2", upCdId: "1" },
]);

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
  height: 140px;
}
.card_list_horizontal .box_title {
  font-size: 2rem !important;
}
.card_list_horizontal .content_details p {
  font-size: 1.3rem;
}
.group_checkbox {
  background-color: var(--white);
}
.form_search {
  display: grid;
  grid-template-columns: 2fr 5fr 1fr;
  gap: 10px;
}
</style>
