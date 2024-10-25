<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div class="box dp_block">
        <div class="search_box">
          <div class="search_section">
            <div class="search_toggle lg center">
              <div class="left"></div>
              <div class="right">
                <div class="search_daywrap mg_r10">
                  <span class="tag">{{ t("curriculumManagement.dept") }}</span>
                  <div class="">
                    <InputBase
                      :id="'deptSearch'"
                      :name="'deptSearch'"
                      v-model="searchModel.deptNm"
                    />
                  </div>
                </div>
                <div class="search_daywrap mg_r10">
                  <span class="tag">{{ t("lookupReport.list.lesson") }}</span>
                  <div class="">
                    <InputBase
                      :id="'taltNrtgTypeNmSearch'"
                      :name="'taltNrtgTypeNmSearch'"
                      v-model="searchModel.taltNrtgTypeNm"
                    />
                  </div>
                </div>
                <div class="search_daywrap mg_r10">
                  <span class="tag">{{ t("lookupReport.list.regBy") }}</span>
                  <div class="">
                    <InputBase
                      :id="'taltNrtgTypeNmSearch'"
                      :name="'taltNrtgTypeNmSearch'"
                      v-model="searchModel.taltNrtgTypeNm"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  class="btn_round btn_lg btn_primary mg_l10"
                  @click="search"
                >
                  {{ t("lookupReport.list.search") }}
                </button>
                <button
                  type="button"
                  class="btn_round btn_lg btn_gray mg_l5"
                  @click="reset"
                >
                  {{ t("lookupReport.list.reset") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="mg_b15">
          <span class="note_cus">
            {{ t("lookupReport.form.title") }}
          </span>
        </div>
        <div class="mg_b15">
          <span class="note_custom">
            {{ t("lookupReport.form.subTitle") }}
          </span>
        </div>
        <div class="box_section">
          <GridComponentV2
            :key="key"
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="grid"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
          >
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "../../constants/screen.const";
import GridComponentV2 from "../../components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import { commonStore } from "../../stores/common";

import { useI18n } from "vue-i18n";

export default {
  components: {
    Breadcrumb,
    GridComponentV2,
    LinkGridComponent,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("lookupReport.title"),
      breadcrumbItems: [],
      dataDetail: {},
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<JobListModel>,
      searchModel: {} as JobSearchModel,
      totalRows: 0,
      key: 1,
      isOpen: false,
      columnDefs: ref([
        {
          headerName: this.t("lookupReport.form.year"),
          field: "deptNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupReport.form.lesson"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupReport.form.regBy"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupReport.form.lookup"),
          field: "jobNm",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            cursor: "pointer",
          },
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.openModalSave,
          },
          flex: 1.2,
        },
      ]),
      jobSeq: "" as String | null,
    };
  },
  beforeMount() {},
  methods: {
    reset() {
      this.searchModel = {};
    },
    search() {},
    getDataPage() {},
    fnPagination(pageNumber: any, pageSize: any) {},
    openModalSave(data: JobListModel | null) {},
    closeModalSave() {
      this.isOpen = false;
    },
  },
};
</script>
