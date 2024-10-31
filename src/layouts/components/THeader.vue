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
          <p class="login_info">{{userInfo?.userName}}({{userInfo?.userId}})</p>
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
    <template #title>{{t('modalSwitchAccount.title')}}</template>
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
            {{t('modalSwitchAccount.caption')}}
          </caption>
          <colgroup>
            <col style="width: 50%"/>
            <col style="width: 50%"/>
          </colgroup>
          <thead>
          <tr>
            <th>{{t('modalSwitchAccount.search1')}}</th>
            <th>{{t('modalSwitchAccount.search2')}}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="td_input">
              <InputBase
                  :id="'name'"
                  :name="'name'"
                  v-model="searchModel.name"
                  :placeholder="t('modalSwitchAccount.search1')"
              ></InputBase>
            </td>
            <td class="td_input">
              <InputBase
                  :id="'name'"
                  :name="'name'"
                  v-model="searchModel.userId"
                  :placeholder="t('modalSwitchAccount.search2')"
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
            {{t('modalSwitchAccount.table.title')}}
          </caption>
          <colgroup>
            <col style="width: auto"/>
            <col style="width: auto"/>
            <col style="width: auto"/>
            <col style="width: auto"/>
          </colgroup>
          <thead>
          <tr>
            <th>{{t('modalSwitchAccount.table.name')}}</th>
            <th>{{t('modalSwitchAccount.table.userId')}}</th>
            <th>{{t('modalSwitchAccount.table.deptNm')}}</th>
            <th>{{t('modalSwitchAccount.table.select')}}</th>
          </tr>
          </thead>
          <tbody>
            <tr v-if="display">
              <td colspan="4">{{t('modalSwitchAccount.table.tutorial')}}</td>
            </tr>
            <tr v-if="rowData.length === 0 && !display">
              <td colspan="4">{{t('modalSwitchAccount.dataNotFound')}}</td>
            </tr>
            <tr v-for="(row, index) in rowData" :key="index">
              <td>{{ row.name }}</td>
              <td>{{ row.userId }}</td>
              <td>{{ row.deptNm }}</td>
              <td>
                <button type="button" @click="onclickSelect(row)">[{{t('modalSwitchAccount.table.select')}}]</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="rowData.length > 0">
        <PaginationUi
            :currentPage="searchModel.page"
            :totalRows="totalRows"
            :pageSize="searchModel.size"
            :totalPages="numberPages"
            @changePage="fnPagination"
        />
      </div>
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
import {getUserInfo, removeUserInfo} from "@/utils/storage";
import {getListProfs} from "@/stores/userManagement/userManagement.service";
import {ProfModel, ProfSearchModel, UserMngModel} from "@/stores/userManagement/userManagement.type";
import { useI18n } from "vue-i18n";
import {PAGINATION_PAGE_1, PAGINATION_PAGE_SIZE} from "@/constants/screen.const";
import {USER_INFO} from "@/constants/common.const";
import LoadingComponent from "@/components/common/loading/LoaddingComponent.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import {checkFlagStore} from "@/stores/common/checkRole"
export default {
  computed: {
    SCREEN() {
      return SCREEN
    }
  },
  components: {
    TModal,
    InputBase,
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
    const rowData = ref<Array<ProfModel>>([])
    const totalRows = ref<number>(0)
    const numberPages = ref<number>(0)
    const display = true
    const roleStore = checkFlagStore()
    const searchModel = ref<ProfSearchModel>({
      userId: '',
      name: '',
      page: PAGINATION_PAGE_1,
      size: PAGINATION_PAGE_SIZE,
      sort: ''
    });
    const userInfo = JSON.parse(getUserInfo() || "");

    const isLoad = ref(false)

    const getDataProfs = async () => {
      isLoad.value = true
      await getListProfs(searchModel.value)
          .then(async (response) => {
            if (response.status == 200) {
              rowData.value = response.data.data.content;
              totalRows.value = response.data.data.totalElements;
              numberPages.value = response.data.data.totalPages;
            }
          })
          .finally(() => {
            isLoad.value = false
          });
    };

    const fnPagination = (pageNumber: number) => {
      searchModel.value.page = pageNumber;
      getDataProfs();
    };

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
          .finally(() => {
            isLoad.value = false
            gnbOneDepth();
            siteMap();
          });
    }

   async function handleNextScreen(screenName: string) {
      if (screenName && SCREEN[screenName] && SCREEN[screenName].path) {
        await roleStore.checkRole(screenName)
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
      searchModel.value.userId = "";
      searchModel.value.name = "";
      searchModel.value.page = PAGINATION_PAGE_1;
      searchModel.value.size = PAGINATION_PAGE_SIZE;
      searchModel.value.sort = "";
    }

    return {
      t,
      store,
      menu,
      totalRows,
      rowData,
      numberPages,
      searchModel,
      display,
      reset,
      handleNextScreen,
      handleLogout,
      getDataProfs,
      fnPagination,
      isLoad,
      roleStore,
      userInfo
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
      this.display = false;
      this.getDataProfs();
    },

    popupShow(idx: number) {
      const vm = this;
      vm.isPopups[idx] = true;
    },

    popupHide(idx: number) {
      const vm = this;
      vm.isPopups[idx] = false;
    },

    onclickSelect(prof) {
      const vm = this;
      vm.$confirm(
          `${prof.name} ${this.t('modalSwitchAccount.confirmText')}`,
          this.t('modalSwitchAccount.confirmTitle'),
          async (isConfirm: Boolean) => {
            if (isConfirm) {
              // vm.$toast(this.t('modalSwitchAccount.toastSuccess'));
              try {
                const userInfoString = localStorage.getItem(USER_INFO);
                const userInfo = JSON.parse(userInfoString);
                const userId = userInfo.userId;

                const response = await http.post('/auth/impersonate', {
                  userStaff: prof.userId,
                  currentUser: userId,
                  div: 'profsw'
                });
                const token = response.data;
                vm.$toast(this.t('modalSwitchAccount.toastSuccess'));

                window.location.href = `${import.meta.env.VITE_PROF_URL}?token=${token}`;
                // window.open(`${ import.meta.env.VITE_PROF_URL}?token=${token}`, '_blank');
              } catch (e) {
                vm.$toast(this.t('modalSwitchAccount.toastFailed'));
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