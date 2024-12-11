<template>
  <div class="content_wrapper grid_content">
    <!-- Start Header Blog -->
    <div class="box dp_block">
      <div class="box_section position_r">
        <div class="view2_qr ribbon">
          <img
            id="img_qrcode"
            src="https://recipe1.ezmember.co.kr/cache/recipe/2024/05/08/qr_6893285.png"
            class="wd_p100"
          />
        </div>
        <div
          class="dp_flex jc_center flex_column position_r container_menu_detail pd_b50"
        >
          <img
            src="https://recipe1.ezmember.co.kr/cache/recipe/2018/07/29/52046ea43391de69233f594b0b52bb311.JPG"
            style="width: 700px"
          />
          <div class="dp_flex jc_between position_a wd_p100" style="bottom: -5px">
            <div class="wd_p30 dp_flex jc_start">
              <button
                class="btn_table bg_black font_white"
                v-tooltip="'Cửa Hàng'"
              >
                <img :src="shoppingCard" style="width: 15px" />
              </button>
            </div>
            <div class="dp_flex flex_column al_center">
              <AvatarCommon
                :width="100"
                imageUrl="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/076956f7-2972-485e-b6ce-2dff9d0e0410/8727b7ec-a53c-4f23-9832-ef445981e0b4.png"
              />
              <div class="mg_t5">
                <span class="font_gray" style="font-size: 1.8rem;">Nguyễn Quốc Huy</span>
              </div>
            </div>
            <div class="wd_p30 dp_flex jc_end">
              <button
                class="btn_table bg_black font_white"
                v-tooltip="'Lượt xem'"
              >
                12.000.000
                <img :src="eyeIcon" style="width: 20px; margin-left: 10px" />
              </button>
            </div>
          </div>
        </div>
        <div
          class="dp_flex jc_center flex_column container_menu_detail mg_t35 pd_b30"
        >
          <p class="box_title_custom mg_b10">
            무생채 만드는 법, 절이지 않고 10분 만에 휘리릭 ~
          </p>
          <p class="font_gray">
            소금에 절이지 않고 10분 만에 휘리릭 만들어 먹는 간단 반찬 무생채를
            만들어 보았어요.
          </p>
        </div>
        <div class="dp_flex jc_center flex_column container_menu_detail">
          <hr class="mg_b30" />
          <div class="dp_flex jc_around">
            <div class="share_link_url link_url" v-tooltip="'Copy Link URL'">
              <img
                class="wd_p100"
                src="https://recipe1.ezmember.co.kr/img/mobile/icon_url_copy.gif"
              />
            </div>
            <div
              class="share_link_url link_facebook"
              v-tooltip="'Share with Facebook'"
            >
              <img
                class="wd_p100"
                src="https://recipe1.ezmember.co.kr/img/mobile/icon_sns_f.png"
              />
            </div>
            <div class="share_link_url link_zalo" v-tooltip="'Share with Zalo'">
              <img
                class="wd_p100"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Header Blog -->

    <!-- Start Ingredient -->
    <div class="box dp_block">
      <div class="box_section">
        <div class="box_inner">
          <h3 class="box_title_sm">
            <text class="font_primary">Nguyên Liệu</text
            ><span>Ingredients</span>
          </h3>

          <div class="box_title_funtion">
            <button type="button" class="btn_round btn_sm btn_white">
              Phương Pháp Đo
            </button>
          </div>
        </div>
        <div>
          <span class="box_title mg_l15" style="font-size: 1.55rem !important"
            >[Nguyên Liệu]</span
          >
          <div class="ingredient">
            <ul class="col_2_ingredients">
              <li v-for="item in 6">
                <div class="ingre_list_name">
                  <a href="javascript:void(0)">
                    Lúa
                    <span>Hoặc lúa</span>
                  </a>
                </div>

                <span class="ingre_list_ea">600g </span>
                <button class="btn_table">Mua</button>
              </li>
              <!-- ... -->
            </ul>
          </div>
        </div>
        <div class="mg_t20">
          <span class="box_title mg_l15" style="font-size: 1.55rem !important"
            >[Gia vị]</span
          >
          <div class="ingredient">
            <ul class="col_2_ingredients">
              <li v-for="item in 6">
                <div class="ingre_list_name">
                  <a href="javascript:void(0)">
                    Lúa
                    <span>Hoặc lúa</span>
                  </a>
                </div>

                <span class="ingre_list_ea">600g </span>
                <button class="btn_table">Mua</button>
              </li>
              <!-- ... -->
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- End Ingredient -->

    <!-- Start Cooking utensils -->
    <div class="box dp_block">
      <div class="box_section">
        <div class="box_inner">
          <h3 class="box_title_sm">
            <text class="font_primary">Dụng cụ nấu ăn</text>
          </h3>
        </div>

        <div class="ingredient">
          <ul class="col_2_ingredients">
            <li v-for="item in 6">
              <div class="ingre_list_name">
                <a href="javascript:void(0)">
                  Lúa
                  <span>Hoặc lúa</span>
                </a>
              </div>
              <button class="btn_table">Mua</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- End Cooking utensils -->

    <!-- Start Content Blog -->
    <div class="box dp_block">
      <div class="box_section">
        <div class="box_inner">
          <h3 class="box_title_sm">
            <text class="font_primary">Các Bước Thực Hiện</text
            ><span>STEPS</span>
          </h3>
        </div>
        <div class="menu_content_blog mg_t40">
          <div class="menu_step" v-for="(item, index) in 3">
            <div class="menu_step_number">
              {{ index + 1 }}
            </div>
            <div class="menu_step_content mg_l20">
              <p class="menu_step_content_title">
                양파 1/4개는 송송 썰어줍니다
              </p>
              <ul class="menu_step_content_note">
                <li>
                  <img
                    src="https://recipe1.ezmember.co.kr/img/mobile/app_icon_step_tip.png"
                  />기름을 안닦고 요리하면 엄청..느끼해져요!
                </li>
                <li>
                  <img
                    src="https://recipe1.ezmember.co.kr/img/mobile/app_icon_step_tip.png"
                  />기름을 안닦고 요리하면 엄청..느끼해져요!
                </li>
              </ul>
              <img
                class="menu_step_content_img"
                src="https://recipe1.ezmember.co.kr/cache/recipe/2021/09/23/0862afecfffa084c6371a7f48157deb81.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Content Bolg -->

    <!-- Start Product -->
    <div class="box dp_block">
      <div class="box_inner">
        <h3 class="box_title_sm">
          <text class="font_primary">Các sản phẩm liên quan</text>
        </h3>
      </div>
      <div class="cart_list product_grid">
        <template v-for="item in 19">
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
                <span>10.000.000VNĐ</span>
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- End Product -->

    <!-- Start Writer -->
    <div class="box dp_block">
      <div class="box_inner">
        <h3 class="box_title_sm">
          <text class="font_primary">Tác Giả Công Thức</text>
          <span>About the writer</span>
        </h3>
      </div>
      <div>
        <div class="dp_flex al_center">
          <AvatarCommon
            :width="80"
            imageUrl="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/076956f7-2972-485e-b6ce-2dff9d0e0410/8727b7ec-a53c-4f23-9832-ef445981e0b4.png"
          />
          <div class="mg_l30">
            <span class="box_title_xs">Nguyễn Quốc Huy</span>
            <p class="box_title font_primary">Theo dõi: 30</p>
            <p class="box_title font_gray">fsadklfsldak</p>
          </div>
        </div>
      </div>
    </div>
    <!-- End Writer -->

    <!-- Start Comment -->
    <CommentCommon />
    <!-- End Comment -->

    <!-- Start Other -->
    <div class="box dp_block">
      <div class="box_section">
        <div class="box_inner">
          <span class="box_title_sm font_primary mg_r10"> # </span>
          <button
            class="btn_hashtag btn_sm btn_secondary mg_r10"
            v-for="item in 5"
          >
            #Hashtag{{ item }}
          </button>
        </div>
      </div>
      <div class="box_section mg_t35" v-for="cat in 6">
        <div class="box_inner">
          <h3 class="box_title_sm">
            <text
              >Công Thức <span class="font_red box_title_sm">Nấu mì</span></text
            >
          </h3>
          <div class="box_title_funtion">
            <a href="javascript:void(0);" class="font_primary">Xem tất cả</a>
          </div>
        </div>
        <div>
          <div>
            <div class="top_blogs cart_list dp_flex">
              <template v-for="item in 6">
                <div class="cart_item" style="max-width: 180px">
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
                    <span>status</span>
                    <p>Text Descriptionfdsfdsafddddddddddddddddddddđ</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Other -->
  </div>
</template>

<script setup lang="ts">
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ref } from "vue";
import eyeIcon from "@/assets/images/eye-svgrepo-com.svg";
import shoppingCard from "@/assets/images/shopping-card.svg";
import AvatarCommon from "@/components/common/avatar/AvatarCommon.vue";
import CommentCommon from "@/components/common/comments/CommentCommon.vue";

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
.comment_btn {
  text-decoration: underline;
  font-size: 1.2rem;
}
.product_grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
  width: 100%;
}
.container_menu_detail {
  width: 700px;
  margin: auto;
}
.view2_qr {
  position: absolute;
  right: 24px;
  top: -5.81px;
  text-align: center;
  width: 150px;
}
.view2_qr img {
  transform: rotate(-90deg);
}
.share_link_url {
  width: 80px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(221, 221, 221, 0.8);
}
.col_2_ingredients {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.col_2_ingredients li {
  min-width: 530px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ececec;
  padding: 10px 6px;
  list-style: none;
  margin: 0 18px;
  font-size: 16px;
  height: 60px;
}
.col_2_ingredients li .ingre_list_name {
  padding: 3px 8px 3px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 30%;
  line-height: 1;
}
.col_2_ingredients li .ingre_list_name span {
  font-size: 13px;
  background: #f1f1f5;
  border-radius: 2px;
  color: #767676;
  padding: 4px 3px;
  line-height: 1;
  display: table;
  margin-top: 8px;
}
.menu_content_blog {
  display: flex;
  width: 1000px;
  flex-direction: column;
  margin: auto;
}
.menu_step {
  display: flex;
  margin-bottom: 35px;
}
.menu_step_number {
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  border-radius: 50%;
  font-size: 2rem;
  font-weight: 500;
  color: var(--white);
}
.menu_step_content {
  max-width: 900px;
}
.menu_step_content_title {
  font-size: 2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  min-height: 32px;
}
.menu_step_content_note {
  margin-top: 15px;
}
.menu_step_content_note li {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.menu_step_content_note img {
  width: 35px;
}
.menu_step_content_img {
  margin-top: 10px;
  width: 900px;
  border-radius: 16px;
}
</style>
