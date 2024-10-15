<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("04.lookUpCQI.searchBox.year") }}</p>
                <SelectBoxBase
                  :id="'selectboxYear'"
                  :name="'selectboxYear'"
                  :data="listYear"
                  v-model="searchModel.yearReg"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("04.lookUpCQI.searchBox.grade") }}</p>
                <SelectBoxBase
                  :id="'selectboxYear'"
                  :name="'selectboxYear'"
                  :data="listGrade"
                  v-model="searchModel.gradeCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("04.lookUpCQI.searchBox.term") }}</p>
                <SelectBoxBase
                  :id="'selectboxYear'"
                  :name="'selectboxYear'"
                  :data="listTerm"
                  v-model="searchModel.termCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("04.lookUpCQI.searchBox.sbjtCd") }}</p>
                <InputBase v-model="searchModel.subjectNm" :id="'subject'" />
              </li>
              <li>
                <p>{{ t("04.lookUpCQI.searchBox.professor") }}</p>
                <InputBase v-model="searchModel.profNm" :id="'professor'" />
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

import type { CodeMngResModel } from "@/stores/common/codeMng/codeMng.type";
import type { CqiSearchModel } from "@/stores/trainingProcess/lookUpCQI/cqi.type";
import {
  getListData,
} from "@/stores/trainingProcess/lookUpCQI/cqi.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import type { OptionObject } from "@/stores/trainingProcess/teachingPlans/teachingPlans.type";
import { cqiStore } from "@/stores/cqi";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { UP_CD_ID_GRADE_LEVEL, UP_CD_ID_SEMESTER } from "@/constants/common.const";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { UP_CD_ID_WRITE } from "@/constants/common.const";

export default defineComponent({
  components: {
    LinkGridComponent,
  },
  setup: () => {
    const store = commonStore();
    const { t } = useI18n();
    const cqiStr = cqiStore();
    return { t, store, cqiStr };
  },
  data() {
    return {
      pageTitle: this.t("04.lookUpCQI.title"),
      rowData: [{}],
      rowDataExcel: [{}],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listCode: {
        upCdIdList: [],
      } as CodeMngResModel,
      key: 1,
      totalRows: 0,
      searchModel: {} as CqiSearchModel,
      columnDefs: ref([
        {
          headerName: this.t("04.lookUpCQI.table.year"),
          field: "eduYear",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("04.lookUpCQI.table.term"),
          field: "termCd",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("04.lookUpCQI.table.dept"),
          field: "deptNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        // TODO: phân loại môn học NCS/KCS
        {
          headerName: this.t("04.teachingPlans.table.categorySbjt"),
          field: "",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("04.lookUpCQI.table.subject"),
          field: "sbjtNm",
          cellRenderer: "LinkGridComponent",
          flex: 2,
          cellRendererParams: { onCustomEvent: this.handleCustomClick },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("04.lookUpCQI.table.sbjtCd"),
          field: "sbjtCd",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("04.lookUpCQI.table.grade"),
          field: "gradeNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("04.lookUpCQI.table.division"),
          field: "divNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("04.lookUpCQI.table.professor"),
          field: "staffNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("04.lookUpCQI.table.status"),
          field: "sustDivNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("04.lookUpCQI.table.statusCre"),
          field: "statusReg",
          cellStyle: { textAlign: "center" },
          flex: 1,
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
          upCdId: UP_CD_ID_WRITE
        },
      ],
      currentYear: new Date().getFullYear(),
      listTerm: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: UP_CD_ID_SEMESTER
        },
      ] as Array<CodeMngModel>,
      listGrade: [
      {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: UP_CD_ID_GRADE_LEVEL
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
          res.data.data.forEach((item: { upCdId: any; cdId: any; }) => {
          
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
    getYearList() {
      let strYear = parseInt(START_YEAR);
      for (let i = 0; i < this.currentYear + 2 - strYear; i++) {
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
