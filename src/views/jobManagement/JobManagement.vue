<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div class="search_box mg_b30">
        <div class="search_section">
          <div class="search_toggle sm">
            <div class="left"></div>
            <div class="right">
              <div class="search_daywrap mg_r10">
                <span class="tag">{{ t("jobManagement.dept") }}</span>
                <InputBase
                  :id="'deptSearch'"
                  :name="'deptSearch'"
                  v-model="searchModel.deptNm"
                />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{ t("jobManagement.talt") }}</span
                ><InputBase
                  :id="'taltNrtgTypeNmSearch'"
                  :name="'taltNrtgTypeNmSearch'"
                  v-model="searchModel.taltNrtgTypeNm"
                />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{ t("jobManagement.jobNm") }}</span
                ><InputBase
                  :id="'jobNmSearch'"
                  :name="'jobNmSearch'"
                  v-model="searchModel.jobNm"
                />
              </div>
              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="search"
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
      <div class="box">
        <div class="mg_b15">
          <span class="note_custom">
            {{ t("jobManagement.plan1") }}
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
            <template #button>
              <div>
                <button
                  class="btn_round btn_primary btn_md"
                  @click="openModalSave(null)"
                >
                  {{ t("jobManagement.btnReg") }}
                </button>
              </div>
            </template>
          </GridComponentV2>
        </div>
      </div>
    </section>
    <ModalSaveJob
      :isOpen="isOpen"
      :onClose="closeModalSave"
      :jobSeq="jobSeq"
      :fetchData="search"
    />
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
  FORMAT_YYY_MM_DD,
} from "../../constants/screen.const";
import GridComponentV2 from "../../components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import { commonStore } from "../../stores/common";
import {
  JobListModel,
  JobSearchModel,
} from "../../stores/jobManagement/jobManagement.type";
import { getPage } from "../../stores/jobManagement/jobManagement.service";
import { format } from "date-fns";
import ModalSaveJob from "./ModalSaveJob.vue";

export default {
  components: {
    Breadcrumb,
    GridComponentV2,
    LinkGridComponent,
    ModalSaveJob,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("jobManagement.pageTitle"),
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
          headerName: this.t("jobManagement.dept"),
          field: "deptNm",
          flex: 1,
        },
        {
          headerName: this.t("jobManagement.talt"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("jobManagement.jobNm"),
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
        {
          headerName: this.t("jobManagement.useYn"),
          field: "useYn",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t("jobManagement.regBy"),
          field: "regBy",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t("jobManagement.regDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
      ]),
      jobSeq: "" as String | null,
    };
  },
  beforeMount() {},
  methods: {
    reset() {
      this.searchModel = {
        deptNm: "",
        taltNrtgTypeNm: "",
        jobNm: "",
      };
    },
    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPage(this.searchModel)
        .then(
          (res) => {
            this.rowData = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
            this.rowData.forEach((item) => {
              item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
            });
          },
          (err) => {}
        )
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.searchModel.size = pageSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getDataPage();
    },
    openModalSave(data: JobListModel | null) {
      this.isOpen = true;
      if (data) {
        this.jobSeq = data.jobSeq;
      } else {
        this.jobSeq = "";
      }
    },
    closeModalSave() {
      this.isOpen = false;
    },
  },
};
</script>
