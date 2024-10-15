<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="''"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("04.talentTrainingReport.searchBox.year") }}</p>
                <SelectBoxBase
                  :id="'seleceBoxYear'"
                  :name="'seleceBoxYear'"
                  :data="listYear"
                  v-model="searchModel.yearCreCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("04.talentTrainingReport.searchBox.university") }}</p>
                <SelectBoxBase
                  :id="'seleceBoxUni'"
                  :name="'seleceBoxUni'"
                  :data="listUniversity"
                  v-model="searchModel.uniCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("04.talentTrainingReport.searchBox.dept") }}</p>
                <SelectBoxBase
                  :id="'seleceBoxDept'"
                  :name="'seleceBoxDept'"
                  :data="listDepartment"
                  v-model="searchModel.deptCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("04.talentTrainingReport.searchBox.regId") }}</p>
                <InputBase v-model="searchModel.regNm" :id="'regId'" />
              </li>
            </ul>
            <div class="btn_group btn_end">
              <button
                type="button"
                class="button btn_xl btn_blue btn_responsive"
                @click="searchClick()"
              >
                {{ t("common.search") }}
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
            <template #button>
              <div class="search_btnarea">
                <ExportFileExcel
                  :data="handClickExport()"
                  :fileName="fileNameExport"
                  :btnName="nameOfbtn"
                >
                  {{ t("04.talentTrainingReport.download") }}
                </ExportFileExcel>
              </div>
            </template>
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
  START_YEAR,
} from "@/constants/screen.const";
import { defineComponent, ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import InputBase from "@/components/common/input/InputBase.vue";

import type {
  CodeMngResModel,
  CodeMngModel,
} from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "../../../stores/common/codeMng/codeMng.service";
import Swal from "sweetalert2";

import type { ExcelData } from "../../stores/common/excel/excelData.type";
import type { TalenReportModel } from "@/stores/trainingProcess/talentReport/talentReport.type";
import { getDepartmentList } from "@/stores/common/department/department.service";
import { DIV_CD_DEPT_MAJOR } from "../../../constants/common.const";
import { getEduYear } from "@/stores/trainingProcess/teachingPlans/teachingPlans.service";
import type { OptionObject } from "@/stores/trainingProcess/teachingPlans/teachingPlans.type";
import {
  getListData,
  getListExcel,
} from "@/stores/trainingProcess/talentReport/talentReport.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";

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
      pageTitle: this.t("04.talentTrainingReport.title"),
      rowData: [{}],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listCode: {
        upCdIdList: [],
      } as CodeMngResModel,
      key: 1,
      totalRows: 0,
      columnDefs: ref([
        {
          headerName: this.t("04.talentTrainingReport.searchBox.year"),
          field: "yearProg",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("04.talentTrainingReport.searchBox.university"),
          field: "uniSpec",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },

        {
          headerName: this.t("04.talentTrainingReport.searchBox.dept"),
          field: "deptNm",
          cellRenderer: "LinkGridComponent",
          flex: 2,
          cellRendererParams: {
            onCustomEvent: this.handleDetailClick,
          },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("04.talentTrainingReport.searchBox.regId"),
          field: "regNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
      ]),
      listData: [],
      listUniversity: [],
      listDept: [],
      searchModel: {} as TalenReportModel,
      fileNameExport: "Talent Report",
      nameOfbtn: "교과목 프로파일 조회",
      rowDataExcel: [{}],
      listDepartment: [],
      listYear: [
        {
          cdId: "",
          cdNm: this.t("04.lookUpCQI.searchBox.selectAll"),
        },
      ] as OptionObject[],
      currentYear: new Date().getFullYear(),
    };
  },
  beforeMount() {
    this.getCode();
    this.getListUniversity();
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
      this.searchModel.yearCreCd = "";
      this.searchModel.uniCd = "";
      this.searchModel.deptCd = "";
      this.searchModel.regNm = "";
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
      this.store.setLoading(true);
      await getListExcel()
        .then((res) => {
          this.rowDataExcel = res.data.data;
        })
        .catch((error) => {})
        .finally(() => {});
      this.store.setLoading(false);
    },
    handClickExport() {
      let rowExcel = [] as Array<Array<any>>;
      let rowExcelHeader = [] as Array<any>;

      this.columnDefs.forEach((el) => {
        rowExcelHeader.push(el.headerName);
      });
      this.rowDataExcel.forEach((el) => {
        let colExcel = [] as Array<any>;
        colExcel.push(el.yearProg);
        colExcel.push(el.uniSpec);
        colExcel.push(el.deptNm);
        colExcel.push(el.regNm);
        rowExcel.push(colExcel);
      });
      return [
        { sheetName: "sheet1", data: rowExcel, header: rowExcelHeader },
      ] as Array<ExcelData>;
    },
    async getListUniversity() {
      await getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_MAJOR],
        upDeptCd: [],
        useYn: "",
      })
        .then((res) => {
          res.data.data.forEach((item) => {
            if (item.deptDivCd === DIV_CD_DEPT_MAJOR) {
              this.listUniversity.push({
                cdId: item.deptCd,
                cdNm: item.deptNm,
              });
            }
          });
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    async getListDepartment() {
      // this.cmn.setLoading(true);
      await getDepartmentList({
        deptCd: [],
        deptDivCd: [],
        upDeptCd: [this.searchModel.uniCd],
        useYn: "",
      })
        .then((res) => {
          this.listDepartment = [
            {
              cdId: "",
              cdNm: this.t("common.select"),
            },
          ];
          res.data.data.forEach((item) => {
            this.listDepartment.push({
              cdId: item.deptCd,
              cdNm: item.deptNm,
            });
          });
          // this.cmn.setLoading(false);
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    async getCode() {
      this.store.setLoading(true);
      await getEduYear()
        .then((res) => {
          let strYear = parseInt(START_YEAR);
          for (let i = 0; i < this.currentYear + 1 - strYear; i++) {
            let newOption: OptionObject = {
              cdId: strYear + i,
              cdNm: strYear + i,
            };
            this.listYear.push(newOption);
          }
          if (
            this.listYear.some((item) => item.cdId === parseInt(res.data.data))
          ) {
            this.searchModel.yearCreCd = res.data.data;
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
  watch: {
    "searchModel.uniCd"(newValue, oldValue) {
      if (newValue) {
        this.searchModel.deptCd = "";
        this.getListDepartment();
      } else {
        this.searchModel.deptCd = "";
      }
    },
  },
});
</script>
