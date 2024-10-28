<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("curriculumManagement.dept") }}</p>
                <InputBase :id="'dept'" v-model="searchData.deptNm" class="form_style"/>
              </li>
              <li>
                <p>{{ t("curriculumManagement.training") }}</p>
                <InputBase :id="'training'" v-model="searchData.currNm" class="form_style"/>
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="searchClick"
              >
                {{ t("common.search") }}
              </button>
              <button
                type="button"
                class="btn_round btn_lg btn_gray mg_l5"
                @click="reset"
              >
                {{ t("common.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box dp_block">
        <h2>{{ t("curriculumManagement.aletr1") }}</h2>
        <h2 class="h2_cus">
          {{ t("curriculumManagement.aletr2") }}
        </h2>
        <div class="box_section">
          <GridComponentV2
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="grid"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
            :key="key"
          >
            <template #button>
              <div class="dp_flex btn_group btn_end">
                <button
                  type="button"
                  class="btn_round btn_md btn_primary"
                  @click="register"
                >
                  {{ t("curriculumManagement.register") }}
                </button>
              </div>
            </template>
          </GridComponentV2>
        </div>
      </div>
    </section>
    <CurriculumManagementModal
      :isOpen="modalOpen"
      @close-modal="closeModal"
      :modeScreen="modeScreen"
      :getDataAll="fnPagination"
      :currSeq="currSeq"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import CurriculumManagementModal from "./CurriculumManagementModal.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import {
  MODE_CREATE,
  MODE_DETAIL,
  FORMAT_YYY_MM_DD,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "../../constants/screen.const";
import { STATUS_YES } from "../../constants/common.const";
import { commonStore } from "../../stores/common";
import { format } from "date-fns";
import GridComponent from "@/components/common/grid/GridComponent.vue";
import { listData } from "@/stores/curriculumMng/curriculumMng.service";
import type {
  SearchCurr,
  CurrInfo,
} from "@/stores/curriculumMng/curriculumMng.type";

export default defineComponent({
  name: "CurrMngList",
  components: {
    Breadcrumb,
    CurriculumManagementModal,
    LinkGridComponent,
    GridComponent,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();

    return {
      t,
      cmn,
    };
  },
  data() {
    return {
      modalOpen: false,
      modeScreen: "",
      pageTitle: this.t("curriculumManagement.pageTitle"),
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<CurrInfo>,
      searchData: {
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SearchCurr,
      currSeq: "",
      totalRows: "",
      columnDefs: [
        {
          headerName: this.t("curriculumManagement.dept"),
          field: "deptNm",
          flex: 2,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("curriculumManagement.program"),
          field: "currDivNm",
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 2,
        },

        {
          headerName: this.t("curriculumManagement.useYn"),
          field: "useYn",
          cellStyle: { textAlign: "center" },
          flex: 1,
          cellRenderer: (params: any) => {
            return params.value === STATUS_YES
              ? this.t("common.use")
              : this.t("common.noUse");
          },
        },
        {
          headerName: this.t("curriculumManagement.regBy"),
          field: "regNm",
          flex: 2,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("curriculumManagement.regDate"),
          field: "regDate",
          flex: 2,
          cellStyle: { textAlign: "center" },
        },
      ],
      key: 1,
    };
  },
  methods: {
    searchClick() {
      this.searchData.page = 1;
      this.key++;
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchData.size = pagesSize;
      this.searchData.page = pageNumber;
      this.searchData.sort = "";
      this.cmn.setLoading(true);
      listData(this.searchData)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
          this.rowData.forEach((item: any) => {
            if (item.regDate) {
              item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
            }
          });
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    reset() {
      this.searchData.deptNm = "";
      this.searchData.currNm = "";
    },
    register() {
      this.modeScreen = MODE_CREATE;
      this.modalOpen = true;
      this.currSeq = "";
    },
    closeModal() {
      this.modalOpen = false;
      this.currSeq = "";
    },
    handleCustomClick(data: any) {
      this.modeScreen = MODE_DETAIL;
      this.modalOpen = true;
      this.currSeq = data.currDivSeq;
    },
  },
});
</script>
<style scoped>
.h2_cus {
  color: #012eff;
  margin-bottom: 10px;
}
</style>
