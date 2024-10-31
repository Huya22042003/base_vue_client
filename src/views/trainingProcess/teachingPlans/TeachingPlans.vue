<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("04.teachingPlans.searchBox.year") }}</p>
                <SelectBoxBase
                  :id="'selectboxYear'"
                  :name="'selectboxYear'"
                  :data="listYear"
                  v-model="searchModel.yearReg"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("04.teachingPlans.searchBox.grade") }}</p>
                <SelectBoxBase
                  :id="'selectboxYear'"
                  :name="'selectboxYear'"
                  :data="listGrade"
                  v-model="searchModel.gradeCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("04.teachingPlans.searchBox.term") }}</p>
                <SelectBoxBase
                  :id="'selectboxYear'"
                  :name="'selectboxYear'"
                  :data="listTerm"
                  v-model="searchModel.termCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("04.teachingPlans.searchBox.subject") }}</p>
                <InputBase class="form_style" v-model="searchModel.subjectNm" :id="'subject'" />
              </li>
              <li>
                <p>{{ t("04.teachingPlans.searchBox.professor") }}</p>
                <InputBase class="form_style" v-model="searchModel.profNm" :id="'professor'" />
              </li>
              <li>
                <p>{{ t("04.teachingPlans.searchBox.status") }}</p>
                <SelectBoxBase
                  :id="'status'"
                  :name="'status'"
                  :data="listStatus"
                  v-model="searchModel.statusCreate"
                ></SelectBoxBase>
              </li>
            </ul>
            <div class="btn_group btn_end">
              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="searchClick()"
              >
                {{ t("common.search") }}
              </button>
              <button
                type="button"
                class="btn_round btn_lg btn_gray mg_l5"
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
  START_YEAR,
} from "@/constants/screen.const";
import { defineComponent, ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import InputBase from "@/components/common/input/InputBase.vue";

import type { CodeMngResModel } from "@/stores/common/codeMng/codeMng.type";

import type {
  TeachingPlansModel,
  OptionObject,
} from "@/stores/trainingProcess/teachingPlans/teachingPlans.type";
import {
  getListData,
  getListExcel,
  getEduYear,
} from "@/stores/trainingProcess/teachingPlans/teachingPlans.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  UP_CD_ID_GRADE_LEVEL,
  UP_CD_ID_SEMESTER,
} from "@/constants/common.const";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { UP_CD_ID_WRITE } from "@/constants/common.const";

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
      pageTitle: this.t("04.teachingPlans.title"),
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
          headerName: this.t("04.teachingPlans.table.year"),
          field: "eduYear",
          cellStyle: { textAlign: "center" },
          flex: 5,
        },
        {
          headerName: this.t("04.teachingPlans.table.term"),
          field: "termNm",
          cellStyle: { textAlign: "center" },
          flex: 5,
        },
        {
          headerName: this.t("04.teachingPlans.table.dept"),
          field: "deptNm",
          cellStyle: { textAlign: "center" },
          flex: 5,
        },
        {
          headerName: this.t("04.teachingPlans.table.categorySbjt"),
          field: "sbjtType",
          cellStyle: { textAlign: "center" },
          flex: 5,
        },
        {
          headerName: this.t("04.teachingPlans.table.subject"),
          field: "sbjtNm",
          flex: 5,
          cellRenderer: "LinkGridComponent",
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
          headerName: this.t("04.teachingPlans.table.sbjtCd"),
          field: "sbjtCd",
          cellStyle: { textAlign: "center" },
          flex: 4,
        },
        {
          headerName: this.t("04.teachingPlans.table.grade"),
          field: "gradeNm",
          cellStyle: { textAlign: "center" },
          flex: 5,
        },
        {
          headerName: this.t("04.teachingPlans.table.division"),
          field: "divNm",
          cellStyle: { textAlign: "center" },
          flex: 5,
        },
        {
          headerName: this.t("04.teachingPlans.table.professor"),
          field: "staffNm",
          cellStyle: { textAlign: "center" },
          flex: 6,
        },
        {
          headerName: this.t("04.teachingPlans.table.status"),
          field: "sustDivNm",
          cellStyle: { textAlign: "center" },
          flex: 6,
        },
        {
          headerName: this.t("04.teachingPlans.table.statusCre"),
          field: "statusReg",
          cellStyle: { textAlign: "center" },
          flex: 4,
          cellRenderer: (params: any) => {
            const status = params.value;
            let color = "";
            if (status == this.t("schoolStaff.cqi.status.created")) {
              color = "green";
            }
            return `<span style="color: ${color}">${status}</span>`;
          },
        },
      ]),
      listData: [],
      listYear: [
        {
          cdId: "",
          cdNm: this.t("04.lookUpCQI.searchBox.selectAll"),
        },
      ] as OptionObject[],
      listYearLearn: [
        {
          cdId: "",
          cdNm: this.t("04.lookUpCQI.searchBox.selectAll"),
        },
      ] as OptionObject[],
      optionObject: {} as OptionObject,
      listStatus: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: UP_CD_ID_WRITE,
        },
      ],
      searchModel: {
        yearReg: "",
        subjectNm: "",
        gradeCd: "",
        termCd: "",
        profNm: "",
        statusCreate: "",
      } as TeachingPlansModel,
      fileNameExport: "Teaching Plans Report",
      nameOfbtn: "교과목 프로파일 조회",
      rowDataExcel: [{}],
      currentYear: new Date().getFullYear(),
      listTerm: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: UP_CD_ID_SEMESTER,
        },
      ] as Array<CodeMngModel>,
      listGrade: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: UP_CD_ID_GRADE_LEVEL,
        },
      ] as Array<CodeMngModel>,
    };
  },
  beforeMount() {
    this.getCode();
    this.getYearList();
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
      this.searchModel.yearReg = "";
      this.searchModel.gradeCd = "";
      this.searchModel.termCd = "";
      this.searchModel.subjectNm = "";
      this.searchModel.profNm = "";
      this.searchModel.statusCreate = "";
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
    async getCode() {
      this.store.setLoading(true);
      await getListCodeMng({
        upCdIdList: [UP_CD_ID_SEMESTER, UP_CD_ID_GRADE_LEVEL, UP_CD_ID_WRITE],
      }).then((res) => {
        if (res.status == SUCCSESS_STATUS) {
          res.data.data.forEach((item: { upCdId: any; cdId: any }) => {
            if (item.upCdId == UP_CD_ID_SEMESTER) {
              this.listTerm.push(item);
            }

            if (item.upCdId == UP_CD_ID_GRADE_LEVEL) {
              this.listGrade.push(item);
            }

            if (item.upCdId == UP_CD_ID_WRITE) {
              this.listStatus.push(item);
            }
          });
        }
      });
      this.store.setLoading(false);
    },
    async getYearList() {
      let strYear = parseInt(START_YEAR);
      for (let i = 0; i <= this.currentYear + 1 - strYear; i++) {
        let newOption: OptionObject = {
          cdId: strYear + i,
          cdNm: strYear + i,
        };
        this.listYear.push(newOption);
      }
    },
  },
});
</script>
