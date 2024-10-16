<template>
  <div class="header_wrapper">
    <div class="grid_content">
      <div class="header_wrap">
        <h1 class="header_logo">
          <router-link :to="{name:SCREEN.home.name}">
            <img src="@/assets/images/logo.png" alt="계원예술대학교"/>
          </router-link>
        </h1>
        <div class="header_function">
          <p class="login_info">박세균(12345678)님 환영합니다</p>
          <button type="button" class="btn_logout" @click.prevent="handleLogout">로그아웃</button>
          <!-- <button type="button" class="btn_login">로그인</button> -->
          <button type="button" class="btn_prof_site" @click="popupShow(0)">교수사이트 보기</button>
          <button type="button" class="btn_menu">전체메뉴</button>
        </div>
        <div class="header_gnb">
          <nav class="nav_wrap">
            <ul id="gnbMenu" class="gnb_1depth">
              <li v-for="submenu in menu" :key="submenu?.id">
                <router-link to="" @click.prevent="handleNextScreen(submenu.screenName)"><span>{{ submenu?.name }}</span></router-link>
                <ul class="gnb_2depth">
                  <li v-for="submenus in submenu?.subMenus" :key="submenus?.id">
                    <router-link to="" @click.prevent="handleNextScreen(submenus.screenName)">{{ submenus?.name }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="header_gnb_sitemap">
      <nav class="nav_wrap">
        <div class="grid_content">
          <ul id="gnbMenu" class="sub_1depth">
            <li v-for="submenu in menu" :key="submenu?.id">
              <router-link to=""><span>{{ submenu?.name }}</span></router-link>
              <ul class="sub_2depth">
                <li v-for="submenus in submenu?.subMenus" :key="submenus?.id">
                  <router-link to="" @click.prevent="handleNextScreen(submenus.screenName)">{{ submenus?.name }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
          <button type="button" class="menu_close">전체메뉴 닫기</button>
        </div>
      </nav>
    </div>
  </div>

  <TModal :is-open="isPopups[0]" :is-show-header="true" :is-show-footer="true" :modal-id="'Template'"
      class-size="medium" @close-modal="closeModal">
    <template #title>로그인 교수 선택</template>
    <template #footer>
      <button type="button" class="btn_round btn_white btn_xl_2" @click="popupHide(0)">닫기</button>
    </template>
    <div class="sub_section_xs">
      <div class="section_tit_wrap">
        <div class="section_tit_xs">검색</div>
      </div>
      <div class="tbl tbl_col">
        <table>
          <caption>
            교과목 검색 목록
          </caption>
          <colgroup>
            <col style="width: 50%"/>
            <col style="width: 50%"/>
          </colgroup>
          <thead>
          <tr>
            <th>교수명</th>
            <th>교번</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="td_input">
              <input type="text" class="form_style" placeholder="교수명"/>
            </td>
            <td class="td_input">
              <input type="text" class="form_style" placeholder="교번"/>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="btn_area ta_r mg_t10">
          <button type="button" class="btn_lg btn_round btn_white">초기화</button>
          <button type="button" class="btn_lg btn_round btn_primary">검색</button>
        </div>
      </div>
    </div>
    <div class="sub_section_xs">
      <div class="section_tit_wrap">
        <div class="section_tit_xs">목록</div>
      </div>
      <div class="tbl tbl_col">
        <table>
          <caption>
            교과목 검색 목록
          </caption>
          <colgroup>
            <col style="width: auto"/>
            <col style="width: auto"/>
            <col style="width: auto"/>
            <col style="width: auto"/>
          </colgroup>
          <thead>
          <tr>
            <th>교수명</th>
            <th>교번</th>
            <th>학과</th>
            <th>선택</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td colspan="4">로그인 할 교수자를 검색해주세요.</td>
          </tr>
          <tr>
            <td>홍길동</td>
            <td>12345678</td>
            <td>A학과</td>
            <td>
              <button type="button" @click="onclickSelect()">[선택]</button>
            </td>
          </tr>
          <tr>
            <td>심청이</td>
            <td>12345678</td>
            <td>A학과</td>
            <td>
              <button type="button" @click="onclickSelect()">[선택]</button>
            </td>
          </tr>
          <tr>
            <td>홍길동</td>
            <td>12345678</td>
            <td>A학과</td>
            <td>
              <button type="button" @click="onclickSelect()">[선택]</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <PaginationUi></PaginationUi>
    </div>
  </TModal>
</template>

<script lang="ts">
import PopupView from "@/components/common/PopupView.vue";
import PaginationUi from "@/components/common/PaginationUi.vue";
import {gnbOneDepth, siteMap} from "@/assets/js/common";
import {SCREEN} from "@/router/screen";
import TModal from "@/components/common/modal/TModal.vue";
import commonService from "@/service/common/CommonService";
import {commonStore} from "@/stores/common";
import {onMounted, nextTick, watch} from "vue";
import {useRouter} from "vue-router";
import http from "@/utils/http";
import {f} from "vitest/dist/types-63abf2e0";
import {removeUserInfo} from "@/utils/storage";

export default {
  computed: {
    SCREEN() {
      return SCREEN
    }
  },
  components: {
    TModal,
    PopupView,
    PaginationUi,
  },
  setup(props, ctx) {
    const store = commonStore()
    const menu = ref([])
    const router = useRouter()
    const route = useRoute()

    onMounted(async () => {
      await getDataMenu()
      setTimeout(() => {
        checkToken()
      }, 100)
    })

    async function getDataMenu() {
      store.setLoading(true);
      await commonService
          .menu()
          .then(async (response) => {
            if (response.status == 200) {
              menu.value = response.data.data;
            }
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            store.setLoading(false);
            gnbOneDepth();
            siteMap();
          });
    }

    function handleNextScreen(screenName: string) {
      if (screenName && SCREEN[screenName] && SCREEN[screenName].path) {
        router.push({path: SCREEN[screenName].path})
      }
    }

    async function checkToken(){
      if(route.query.token){
        //handle token, set localStorage
        setTimeout(() => {
          router.replace('/')
        }, 100)
      }
    }

    async function handleLogout() {
      store.setLoading(true);
      await commonService
          .logout()
          .then(async (response) => {
            removeUserInfo()
            await router.push({name: SCREEN.login.name})
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            store.setLoading(false);
          });
    }

    return {
      store,
      menu,
      handleNextScreen,
      handleLogout
    }
  },
  data: () => ({
    isPopups: [false],
  }),
  mounted: function () {
    gnbOneDepth();
    siteMap();
  },
  methods: {
    popupShow(idx: number) {
      const vm = this;
      vm.isPopups[idx] = true;
    },
    popupHide(idx: number) {
      const vm = this;
      vm.isPopups[idx] = false;
    },
    onclickSelect() {
      const vm = this;
      vm.$confirm("홍길동 교수님을 선택하시겠어요?", "알림", async (isConfirm: Boolean) => {
        if (isConfirm) {
          vm.$toast("로그인 되었습니다. <br />교수사이트로 이동합니다.");
          try {
            const response = await http.post('/auth/impersonate', {
              userStaff: '33330001',
              currentUser: 'dainls',
              div: 'prof'
            });
            const token = response.data;
            const isCheck = false;
            const url = isCheck ? import.meta.env.VITE_ADMIN_URL : import.meta.env.VITE_PROF_URL;

            vm.$toast("로그인 되었습니다. <br />교수사이트로 이동합니다.");

            window.location.href = `${url}?token=${token}`;
          } catch (e) {
            vm.$toast("로그인에 실패했습니다. 다시 시도해주세요.");
            console.error(error);
          }
        }
      });
    },
    // Modal
    closeModal() {
      this.isPopups[0] = false
    },
    confirmAction() {
      // Handle confirm action
      this.closeModal()
    },
    cancelAction() {
      // Handle cancel action
      this.closeModal()
    },
  },
};
</script>