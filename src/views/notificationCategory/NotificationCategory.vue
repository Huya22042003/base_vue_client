<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="search_box">
      <div class="search_section">
        <div class="search_toggle sm">
          <div class="left"></div>
          <div class="right">
            <div class="search_daywrap mg_r10">
              <span class="tag">{{
                t("09.notificationCategory.search.heading")
              }}</span>
              <div class="select_row">
                <InputBase
                  v-model="notificationCategorySearchModel.ttl"
                  :id="'ctgHeading'"
                  :name="'ctgHeading'"
                >
                </InputBase>
              </div>
            </div>

            <div class="search_daywrap mg_r10">
              <span class="tag">{{
                t("09.notificationCategory.search.showOrNot")
              }}</span>
              <div class="select_row sm">
                <SelectBoxBase
                  :id="'selectboxShow'"
                  :name="'selectboxShow'"
                  :data="listSelectBoxShow"
                  v-model="notificationCategorySearchModel.openYn"
                >
                </SelectBoxBase>
              </div>
            </div>
            <div class="search_daywrap mg_r10">
              <span class="tag">{{
                t("09.notificationCategory.search.subscribers")
              }}</span>
              <div class="select_row">
                <InputBase
                  v-model="notificationCategorySearchModel.regId"
                  :id="'ctgName'"
                  :name="'ctgName'"
                >
                </InputBase>
              </div>
            </div>
            <div>
              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="searchClick"
              >
                조회하기
              </button>
              <button
                type="button"
                class="btn_round btn_lg btn_gray mg_l5"
                @click="resetSearch()"
              >
                초기화
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box dp_block">
      <p class="note_custom mb-4">
        {{ t("09.notificationCategory.search.subTitle") }}
      </p>
      <div class="box_section">
        <GridComponentV2
          :rowData="rowData"
          :columnDefs="columnDefs"
          :pagination="true"
          @customPagination="fnPagination"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
          :paginationClientFlag="false"
          v-model="rowselected"
          ref="grid"
          :key="keyId"
          :totalRecord="totalRows"
        >
          <template #button>
            <div class="search_btnarea">
              <button
                type="button"
                class="btn_round btn_sm btn_primary"
                @click="create()"
              >
                {{ t("09.notificationCategory.search.btnCreate") }}
              </button>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import { defineComponent, ref } from "vue";
import type {
  NotificationCategoryModel,
  NotificationCategorySearchModel,
  CodeSiteModel,
} from "../../stores/notificationCategory/notificationCategory.type";
import { fetchData } from "@/stores/notificationCategory/notificationCategory.service";
import { SHOW_Y, SHOW_N, TOP_N, TOP_Y } from "../../constants/common.const";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  MODE_CREATE,
  FORMAT_YYY_MM_DD,
  MODE_DETAIL,
} from "../../constants/screen.const";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";
import { format } from "date-fns";
import type { PageableModel } from "@/stores/eduCourseType/eduCourse.type";
import { useRouter } from "vue-router";
import ImageGridComponent from "../../components/common/gridNotice/GridComponentNotice.vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { commonStore } from "@/stores/common";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import type { CodeMngResModel } from "@/stores/common/codeMng/codeMng.type";

export default defineComponent({
  components: {
    InputBase,
    SelectBoxBase,
    GridComponentV2,
    Breadcrumb,
    BaseDatePicker,
    LoaddingComponent,
    LinkGridComponent,
    ImageGridComponent,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const pageable = ref<PageableModel>({
      page: 1,
      size: 10,
      sort: "",
    });
    const pageTitle = t("09.notificationCategory.title");
    const breadcrumbItems = [
      { label: t("09.notificationCategory.scum01"), link: "/" },
      { label: t("09.notificationCategory.scum02"), link: "#" },
      {
        label: t("09.notificationCategory.scum03"),
        link: "/notificationCategory",
      },
    ];
    const listSelectBoxShow = ref([
      { cdId: "", cdNm: "전체" },
      { cdId: SHOW_Y, cdNm: "게시" },
      { cdId: SHOW_N, cdNm: "비게시" },
    ]);
    const router = useRouter();
    const paginationPageSize = PAGINATION_PAGE_SIZE;
    const paginationPageSizeSelector = PAGINATION_PAGE_SIZE_SELECTOR;
    const rowselected = ref<any[]>([]);
    const columnDefs = ref([
      {
        headerName: t("09.notificationCategory.table.rowNum"),
        field: "noId",
        flex: 1,
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: t("09.notificationCategory.table.heading"),
        field: "ttl",
        cellRenderer: "LinkGridComponent",
        cellRendererParams: { onCustomEvent: handleCustomClick },
        cellStyle: {
          color: "#2704FF",
          display: "flex",
          alignItems: "center",
        },
        flex: 5,
      },
      {
        headerName: t("09.notificationCategory.table.views"),
        field: "readCnt",
        flex: 2,
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: t("09.notificationCategory.table.showOrNot"),
        field: "openYn",
        flex: 1,
        cellStyle: { textAlign: "center" },
        cellRenderer: (params: any) => {
          return params.value === SHOW_Y ? "게시" : "비게시";
        },
      },
      {
        headerName: t("09.notificationCategory.table.topFixYn"),
        field: "topFixYn",
        flex: 1,
        cellStyle: { textAlign: "center" },
        cellRenderer: (params: any) => {
          return params.value === TOP_Y ? "고정" : "비고정";
        },
      },
      {
        headerName: t("09.notificationCategory.table.regName"),
        field: "regId",
        flex: 2,
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: t("09.notificationCategory.table.regDate"),
        field: "regDate",
        flex: 2,
        cellStyle: { textAlign: "center" },
      },
    ]);
    const listSelectBoxSite = ref([]);
    const notificationCategorySearchModel = ref({
      ttl: "",
      regId: "",
      openYn: "",
      page: 1,
      size: 10,
      sort: "",
    }) as NotificationCategorySearchModel;
    const codeStieModel = {} as CodeSiteModel;
    const rowData = [] as Array<NotificationCategoryModel>;
    const totalRows = ref<number>;
    function handleCustomClick(data: any) {
      router.push({
        name: SCREEN.crudNotificationCategory.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.noticeSeq,
        },
      });
    }

    return {
      t,
      router,
      cmn,
      pageable,
      breadcrumbItems,
      paginationPageSize,
      paginationPageSizeSelector,
      columnDefs,
      rowselected,
      pageTitle,
      listSelectBoxShow,
      listSelectBoxSite,
      notificationCategorySearchModel,
      codeStieModel,
      handleCustomClick,
      totalRows,
    };
  },
  data() {
    return {
      keyId: 1,
      searchModel: {} as NotificationCategorySearchModel,
      rowData: [],
      listCode: {
        upCdIdList: [],
      } as CodeMngResModel,
    };
  },
  beforeUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  },
  beforeMount() {
    this.getCode();
  },
  mounted() {
    document.addEventListener("keypress", this.handleKeyPress);
  },
  methods: {
    create() {
      this.$router.push({
        name: SCREEN.crudNotificationCategory.name,
        params: { mode: MODE_CREATE },
      });
    },
    searchClick() {
      this.notificationCategorySearchModel.page = 1;
      this.keyId++;
    },
    async getDataAll() {
      this.cmn.setLoading(true);
      try {
        await fetchData(this.notificationCategorySearchModel)
          .then((res) => {
            this.rowData = res.data.data.content;
            this.totalRows = res.data.data.totalElements;

            this.rowData.forEach((item, index) => {
              item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
              item.rowNum = this.totalRows - index;
            });
          })
          .catch((error) => {
            throw new Error(MESSAGE_ERROR_API);
          })
          .finally(() => {
            this.cmn.setLoading(false);
          });
      } catch (e) {
      } finally {
      }
    },
    async getCode() {
      this.cmn.setLoading(true);
      this.listCode.upCdIdList.push("1021");
      await getListCodeMng(this.listCode)
        .then((res) => {
          if (Array.isArray(res.data.data)) {
            this.listSelectBoxSite = res.data.data.filter(
              (item) => item.upCdId === "1021"
            );

            this.listSelectBoxSite.unshift({
              cdId: "",
              cdNm: this.t("전체"),
            });
          }
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    handleKeyPress(event: any) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.getDataAll();
      }
    },
    resetSearch() {
      this.notificationCategorySearchModel = {
        ttl: "",
        regId: "",
        openYn: "",
        page: 1,
        size: 10,
        sort: "",
      };
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.notificationCategorySearchModel.size = pagesSize;
      this.notificationCategorySearchModel.page = pageNumber;
      this.notificationCategorySearchModel.sort = "";
      this.getDataAll();
    },
  },
});
</script>
<style scoped>
.box_search {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
}

.box_search ul {
  display: flex;
}

.box_search ul li {
  display: flex;
  flex-direction: column;
}
</style>
