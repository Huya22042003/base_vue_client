<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="''"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("04.subjectProfiles.searchBox.dept") }}</p>
                <InputBase v-model="searchModel.subjectNm" :id="'subjectNm'" />
              </li>
              <li>
                <p>{{ t("04.subjectProfiles.searchBox.deptCode") }}</p>
                <InputBase v-model="searchModel.subjectCd" :id="'subjectCd'" />
              </li>
              <li>
                <p>{{ t("04.subjectProfiles.searchBox.status") }}</p>
                <SelectBoxBase
                  :id="'sustCd'"
                  :name="'sustCd'"
                  :data="listSust"
                  v-model="searchModel.sustCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("04.subjectProfiles.searchBox.grade") }}</p>
                <SelectBoxBase
                  :id="'gradeCd'"
                  :name="'gradeCd'"
                  :data="listGrade"
                  v-model="searchModel.gradeCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("04.subjectProfiles.searchBox.semester") }}</p>
                <SelectBoxBase
                  :id="'termCd'"
                  :name="'termCd'"
                  :data="listTerm"
                  v-model="searchModel.termCd"
                ></SelectBoxBase>
              </li>
            </ul>
            <div class="btn_group btn_end">
              <button
                type="button"
                class="button btn_xl btn_blue btn_responsive"
                @click="searchClick()"
              >
                {{ t("common.title.search") }}
              </button>
              <button
                type="button"
                class="button btn_xl btn_lightgray btn_responsive"
                @click="reset()"
              >
                {{ t("common.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section">
          <GridComponentV2
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="gridKey"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
            :key="key"
          >
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { defineComponent, ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import {
  getListData,
  getListExcel,
} from "@/stores/trainingProcess/subjectProfiles/subjectProfiles.service";
import type { CodeMngResModel } from "@/stores/common/codeMng/codeMng.type";
import type { SubProfileSearchModel } from "@/stores/trainingProcess/subjectProfiles/subjectProfiles.type";
import { getListCodeMng } from "../../../stores/common/codeMng/codeMng.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import Swal from "sweetalert2";
export default defineComponent({
  components: {
    LinkGridComponent,
  },
  setup: () => {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  data() {
    return {
      pageTitle: this.t("04.subjectProfiles.title"),
      rowData: [{}],
      rowDataExcel: [{}],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listCode: {
        upCdIdList: [],
      } as CodeMngResModel,
      key: 1,
      totalRows: 0,
      columnDefs: ref([
        {
          headerName: this.t("common.rowNum"),
          field: "rowNum",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("04.subjectProfiles.table.year"),
          field: "year",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("04.subjectProfiles.table.dept"),
          field: "deptNm",
          cellStyle: { textAlign: "center" },
          flex: 3,
        },
        {
          headerName: this.t("04.subjectProfiles.table.subject"),
          field: "sbjtNm",
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleDetailClick,
          },
          flex: 4,
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("04.subjectProfiles.table.subjectCode"),
          field: "sbjtCd",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("04.subjectProfiles.table.status"),
          field: "sustDivNm",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("04.subjectProfiles.table.grade"),
          field: "gradeNm",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("04.subjectProfiles.table.semester"),
          field: "termNm",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("04.subjectProfiles.table.regId"),
          field: "regNm",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
      ]),
      listData: [],
      listGrade: [],
      listSemester: [],
      searchModel: {
        sustCd: "",
        gradeCd: "",
        termCd: "",
      } as SubProfileSearchModel,
      listTerm: [],
      listSust: [],
    };
  },
  beforeMount() {
    this.getCode();
    this.getAllData();
  },

  methods: {
    searchClick() {
      this.searchModel.page = 1;
      this.key++;
    },

    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getData();
    },
    reset() {
      this.searchModel.termCd = "";
      this.searchModel.gradeCd = "";
      this.searchModel.sustCd = "";
      this.searchModel.subjectCd = "";
      this.searchModel.subjectNm = "";
    },
    showAlert() {
      Swal.fire({
        text: this.t("04.messageDownload"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("04.confirmDown"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          //   this.saveOrEdit();
        }
      });
    },

    async getData() {
      this.store.setLoading(true);
      await getListData(this.searchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    async getAllData() {
      await getListExcel()
        .then((res) => {
          this.rowDataExcel = res.data.data;
        })
        .catch((error) => {
        });
    },
    async getCode() {
      this.store.setLoading(true);
      this.listCode.upCdIdList.push("1064", "1010", "1011");
      await getListCodeMng(this.listCode)
        .then((res) => {
          if (Array.isArray(res.data.data)) {
            this.listSust = res.data.data.filter(
              (item) => item.upCdId === "1064"
            );
            this.listTerm = res.data.data.filter(
              (item) => item.upCdId === "1010"
            );
            this.listGrade = res.data.data.filter(
              (item) => item.upCdId === "1011"
            );
            this.listGrade.unshift({
              cdId: "",
              cdNm: this.t("04.teachingPlans.searchBox.selectAll"),
            });
            this.listSust.unshift({
              cdId: "",
              cdNm: this.t("04.teachingPlans.searchBox.selectAll"),
            });
            this.listTerm.unshift({
              cdId: "",
              cdNm: this.t("04.teachingPlans.searchBox.selectAll"),
            });
          }
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
  },
});
</script>
