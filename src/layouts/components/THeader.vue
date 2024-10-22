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
              <router-link to="" @click.prevent="handleNextScreen(submenu.screenName)"><span>{{ submenu?.name }}</span></router-link>
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
      <button type="button" class="btn_round btn_white btn_xl_2" @click="popupHide(0)">{{t('common.close')}}</button>
    </template>
    <div class="sub_section_xs">
      <div class="section_tit_wrap">
        <div class="section_tit_xs">{{t('common.title.search')}}</div>
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
              <InputBase
                  :id="'name'"
                  :name="'name'"
                  v-model="searchModel.name"
              ></InputBase>
            </td>
            <td class="td_input">
              <InputBase
                  :id="'name'"
                  :name="'name'"
                  v-model="searchModel.userId"
              ></InputBase>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="btn_area ta_r mg_t10">
          <button type="button"
                  class="btn_lg btn_round btn_primary"
                  @click="searchClick()"
          >{{ t("common.search") }}</button>
          <button type="button"
                  class="btn_lg btn_round btn_white"
                  @click="reset()"
          >{{ t("common.reset") }}</button>
        </div>
      </div>
    </div>
    <div class="sub_section_xs">
      <div class="section_tit_wrap">
        <div class="section_tit_xs">{{t('common.list')}}</div>
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
            <tr v-if="rowData.length === 0">
              <td colspan="4">로그인 할 교수자를 검색해주세요.</td>
            </tr>
            <tr v-for="(row, index) in rowData" :key="index">
              <td>{{ row.name }}</td>
              <td>{{ row.userId }}</td>
              <td>{{ row.deptNm }}</td>
              <td>
                <button type="button" @click="onclickSelect(row)">[선택]</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationUi
          :currentPage="searchModel.page"
          :totalRows="totalRows"
          :pageSize="searchModel.size"
          @changePage="fnPagination"
      />
    </div>
  </TModal>
  <LoadingComponent v-if="isLoad"></LoadingComponent>
</template>

<script lang="ts">
import PopupView from "@/components/common/PopupView.vue";
import PaginationUi from "@/components/common/PaginationUi.vue";
import {gnbOneDepth, siteMap} from "@/assets/js/common";
import {SCREEN} from "@/router/screen";
import TModal from "@/components/common/modal/TModal.vue";
import commonService from "@/service/common/CommonService";
import {commonStore} from "@/stores/common";
import {onMounted, nextTick, watch, ref} from "vue";
import {useRouter} from "vue-router";
import http from "@/utils/http";
import {f} from "vitest/dist/types-63abf2e0";
import {removeUserInfo} from "@/utils/storage";
import {getListProfs} from "@/stores/userManagement/userManagement.service";
import {UserManagementSearchModel, UserMngModel} from "@/stores/userManagement/userManagement.type";
import { useI18n } from "vue-i18n";
import {PAGINATION_PAGE_1, PAGINATION_PAGE_SIZE} from "@/constants/screen.const";
import {USER_INFO} from "@/constants/common.const";
import LoadingComponent from "@/components/common/loading/LoaddingComponent.vue";

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
    LoadingComponent
  },

  setup(props, ctx) {
    const {t} = useI18n();
    const store = commonStore()
    const menu = ref([])
    const router = useRouter()
    const route = useRoute()
    const rowData = ref<UserMngModel>([])
    const totalRows = ref<number>(0);
    const key =  1;
    const searchModel = ref<UserManagementSearchModel>({
      userId: '',
      name: '',
      page: PAGINATION_PAGE_1,
      size: PAGINATION_PAGE_SIZE,
      sort: ''
    });

    const getDataProfs = async () => {
      isLoad.value = true
      await getListProfs(searchModel.value)
          .then(async (response) => {
            if (response.status == 200) {
              rowData.value = response.data.data.content;
              totalRows.value = response.data.data.totalElements;
            }
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            isLoad.value = false
          });
    };

    watch(() => searchModel.value.page, (newPage, oldPage) => {
      getDataProfs();
    });

    const fnPagination = (pageNumber: number) => {
      searchModel.value.page = pageNumber;
    };
    const isLoad = ref(false)

    onMounted(async () => {
      await getDataMenu()
      setTimeout(() => {
        checkToken()
      }, 100)
    })

    async function getDataMenu() {
      isLoad.value = true
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
            isLoad.value = false
            gnbOneDepth();
            siteMap();
          });
    }

    function handleNextScreen(screenName: string) {
      if (screenName && SCREEN[screenName] && SCREEN[screenName].path) {
        router.push({path: SCREEN[screenName].path})
        const bodyTag = document.body
        bodyTag.classList.remove("gnb");
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
      isLoad.value = true
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
            isLoad.value = false
          });
    }

    function reset() {
      this.searchModel.userId = "";
      this.searchModel.name = "";
      this.searchModel.page = PAGINATION_PAGE_1;
      this.searchModel.size = PAGINATION_PAGE_SIZE;
      this.searchModel.sort = "";
    }

    return {
      t,
      store,
      menu,
      totalRows,
      key,
      rowData,
      searchModel,
      reset,
      handleNextScreen,
      handleLogout,
      getDataProfs,
      fnPagination,
      handleLogout,
      isLoad
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
    searchClick() {
      this.searchModel.page = 1;
      this.key++;
      this.getDataProfs();
    },

    popupShow(idx: number) {
      const vm = this;
      vm.isPopups[idx] = true;
      this.getDataProfs()
    },

    popupHide(idx: number) {
      const vm = this;
      vm.isPopups[idx] = false;
    },

    onclickSelect(prof) {
      const vm = this;
      vm.$confirm(`${prof.name} 교수님을 선택하시겠어요?`, "알림", async (isConfirm: Boolean) => {
        if (isConfirm) {
          // vm.$toast("로그인 되었습니다. <br />교수사이트로 이동합니다.");
          try {
            const userInfoString = localStorage.getItem(USER_INFO);
            if (!userInfoString) {
              throw new Error('User info not found');
            }

            const userInfo = JSON.parse(userInfoString);
            const userId = userInfo.userId;

            const response = await http.post('/auth/impersonate', {
              userStaff: prof.userId,
              currentUser: userId,
              div: 'profsw'
            });
            const token = response.data;
            vm.$toast("로그인 되었습니다. <br />교수사이트로 이동합니다.");

            window.location.href = `${import.meta.env.VITE_PROF_URL}?token=${token}`;
            // window.open(`${ import.meta.env.VITE_PROF_URL}?token=${token}`, '_blank');
          } catch (e) {
            vm.$toast("로그인에 실패했습니다. 다시 시도해주세요.");
            console.error(error);
          }
        }
      })
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