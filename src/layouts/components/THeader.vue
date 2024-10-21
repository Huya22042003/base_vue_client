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

      <GridComponentV2
          :rowData="rowData"
          :columnDefs="columnDefs"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
          ref="gridKey"
          :paginationClientFlag="true"
          @customPagination="fnPagination"
          :totalRecord="totalRows"
          :key="key"
      >
      </GridComponentV2>
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
import {onMounted, nextTick, watch, ref} from "vue";
import {useRouter} from "vue-router";
import http from "@/utils/http";
import {f} from "vitest/dist/types-63abf2e0";
import {removeUserInfo} from "@/utils/storage";
import {getListProfs} from "@/stores/userManagement/userManagement.service";
import {UserManagementSearchModel, UserMngModel} from "@/stores/userManagement/userManagement.type";
import { useI18n } from "vue-i18n";
import type {LoginHisResModel} from "@/stores/loginHistory/loginHistory.type";
import {PAGINATION_PAGE_1, PAGINATION_PAGE_SIZE, PAGINATION_PAGE_SIZE_SELECTOR} from "@/constants/screen.const";
import {USER_INFO} from "@/constants/common.const";
import Swal from "sweetalert2";

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
    const {t} = useI18n();
    const store = commonStore()
    const menu = ref([])
    const router = useRouter()
    const route = useRoute()
    const rowData = ref<UserMngModel>([])
    const paginationPageSize = PAGINATION_PAGE_SIZE;
    const paginationPageSizeSelector = PAGINATION_PAGE_SIZE_SELECTOR;
    const totalRows = ref<number>;
    const key =  1;
    const searchModel = ref<UserManagementSearchModel>({
      userId: '',
      name: '',
      page: PAGINATION_PAGE_1,
      size: PAGINATION_PAGE_SIZE,
      sort: ''
    });

    async function onclickSelect(prof) {
      Swal.fire({
        title: '알림',
        text: `${prof.name} 교수님을 선택하시겠어요?`,
        showCancelButton: true,
        confirmButtonText: t("common.confirm"),
        cancelButtonText: t("common.cancel"),
      }).then(async (result) => {
        store.setLoading(true);
        if (result.isConfirmed) {
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

            store.setLoading(false);
            await Swal.fire('로그인 되었습니다.', '교수사이트로 이동합니다.');
            store.setLoading(true);

            window.location.href = `${import.meta.env.VITE_PROF_URL}?token=${token}`;
            // window.open(`${ import.meta.env.VITE_PROF_URL}?token=${token}`, '_blank');
          } catch (e) {
            await Swal.fire('로그인에 실패했습니다.', '다시 시도해주세요.');
            console.error(e);
          } finally {
            store.setLoading(false);
          }
        } else {
          store.setLoading(false);
        }
      });
    }

    const columnDefs = [
      {
        headerName: "교수명",
        field: "name",
        flex: 4,
      },
      {
        headerName: "교번",
        field: "userId",
        cellStyle: { textAlign: "center" },
        flex: 3,
      },
      {
        headerName: "학과",
        field: "deptNm",
        cellStyle: { textAlign: "center" },
        flex: 5,
      },
      {
        headerName: "선택",
        cellRenderer: (params) => {
          const button = document.createElement('button');
          button.innerText = '[선택]';
          button.addEventListener('click', () => {
            onclickSelect(params.data);
          });
          return button;
        },
        cellStyle: {
          color: "#2704FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        },
        flex: 2,
      },
    ]

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
      columnDefs,
      paginationPageSize,
      paginationPageSizeSelector,
      totalRows,
      key,
      rowData,
      searchModel,
      reset,
      handleNextScreen,
      handleLogout,
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

    async getDataProfs() {
      this.store.setLoading(true);
      await getListProfs(this.searchModel)
          .then(async (response) => {
            if (response.status == 200) {
              this.rowData = response.data.data.content;
              this.totalRows = response.data.data.totalElements;
            }
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {
            this.store.setLoading(false);
          });
    },

    popupShow(idx: number) {
      const vm = this;
      vm.isPopups[idx] = true;
    },

    popupHide(idx: number) {
      const vm = this;
      vm.isPopups[idx] = false;
    },

    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getDataProfs();
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