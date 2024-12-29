<template>
  <div class="header_wrap">
    <div v-show="checkCouponBanner" class="joinCouponBanner" style="
        background: var(--primary);
        text-align: center;
        letter-spacing: -0.05em;
        height: 38px;
        transition: all 0.4 ease;
      ">
      <div style="max-width: 1200px; margin: 0 auto; position: relative">
        <a href="https://shop.10000recipe.com/mypage/coupon_event.php" style="
            color: #fff;
            display: inline-block;
            padding: 11px 20px;
            font-size: 15px;
            line-height: 1;
            vertical-align: middle;
          ">
          지금 가입하고, <b style="color: #ffe400">최대 2만원</b> 할인혜택을
          받아보세요!</a>
        <!-- <a @click="() => {setPaddingContent(true);checkCouponBanner = false;}" style="
            display: inline-block;
            position: absolute;
            right: 10px;
            top: 6px;
            cursor: pointer;
          "><img src="//recipe1.ezmember.co.kr/img/mobile/btn_close.png" alt="닫기" width="18" /></a> -->
      </div>
    </div>
    <div class="header_top">
      <div class="grid_content">
        <button type="button" class="btn_menu">메뉴보기</button>
        <h1 class="header_logo">
          <router-link to="/">
            <img src="@/assets/images/common/img_logo.png" alt="영산대학교"/>
          </router-link>
        </h1>
        <!-- <div class="header_function">
          <p class="login_info">{{ userInfo?.userName }} {{userInfo?.lastLoginDate && `[${userInfo?.lastLoginDate}]`}}</p>
          <button type="button" class="btn_logout" @click="logout">로그아웃</button>
        </div> -->
      </div>
    </div>
    <div class="header_bottom">
      <div class="grid_content">
        <nav class="nav_wrap">
          <ul id="gnbMenu" class="gnb_1depth">
            <li v-for="(subMenu1, indexMenu1) in subMenus" :key="indexMenu1">
              <a href="javascript:void(0)" @click="handleOpenScreen(subMenu1?.screenName)">{{ subMenu1.name }}</a>
              <ul class="gnb_2depth">
                <li v-for="(subMenu2, indexMenu2) in subMenu1?.subMenus" :key="indexMenu2">
                  <a href="javascript:void(0)" @click="handleOpenScreen(subMenu2?.screenName)">
                    {{ subMenu2?.name }}
                  </a>
                  <ul class="gnb_3depth" :class="{ first: !indexMenu2 }">
                    <li v-for="(subMenu3, indexMenu3) in subMenu2?.subMenus" :key="indexMenu3">
                      <a href="javascript:void(0)" @click="handleOpenScreen(subMenu3?.screenName)">{{ subMenu3?.name
                        }}</a>
                      <ul class="gnb_4depth" :class="{ first: !indexMenu2 && !indexMenu3 }">
                        <li v-for="(subMenu4, indexMenu4) in subMenu3?.subMenus" :key="indexMenu4">
                          <a href="javascript:void(0)" @click="handleOpenScreen(subMenu4?.screenName)">{{ subMenu4.name
                            }}</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <LoadingComponent v-if="isLoading"></LoadingComponent>
</template>

<script lang="ts" setup>
import { gnbOneDepth, setPaddingContent } from "@/assets/js/common";
import { onMounted } from "vue";
import commonService from "@/service/common/CommonService";
import { commonStore } from "@/stores/common";
import { useRoute, useRouter } from "vue-router";
import { getUserInfo, removeUserInfo } from "@/utils/storage";
import LoadingComponent from "@/components/common/loading/LoaddingComponent.vue";

const store = commonStore();
// const roleStore = checkFlagStore()
const init = ref([]);
const route = useRoute();
const router = useRouter();

const menus = ref();
const subMenus = ref([
  {
    screenName: "home",
    name: "Home",
    subMenus: []
  },
  {
    screenName: "portfolio",
    name: "Profile",
    subMenus: []
  },
  {
    screenName: "Menu 2",
    name: "Menu 2",
    subMenus: [
      {
        screenName: "profile-user",
        name: "Cửa Hàng",
        subMenus: []
      },
      {
        screenName: "bill",
        name: "bill",
        subMenus: []
      },
      {
        screenName: "menu-detail",
        name: "Công Thức",
        subMenus: []
      },
      {
        screenName: "article-detail",
        name: "Bài Viết",
        subMenus: []
      },
    ]
  }
]);
const isLoading = ref(false);
const userInfo = ref<Object | null>(null);

const checkCouponBanner = ref(true);

onMounted(async () => {
//   await getMenu()
  // headerStyle();
  // mobileGnb();
  gnbOneDepth();

//   userInfo.value = JSON.parse(getUserInfo())
})

const getMenu = async () => {
  isLoading.value = true;

  await commonService
    .menu()
    .then(async (response) => {
      if (response.status == 200) {
        subMenus.value = response.data.data;
      }
      isLoading.value = false;
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const logout = () => {
  isLoading.value = true;
  commonService
    .logout()
    .then(async (response) => {
      if (response.status == 200) {
        await removeUserInfo();
        // await router.push({name: "Login"})
        window.open(import.meta.env.VITE_CLIENT_INTRO_URL, "_self");
      }
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const handleOpenScreen = async (screenName: string) => {
  // await roleStore.checkRole(screenName)
  if (screenName) router.push({ name: screenName })
}
</script>
