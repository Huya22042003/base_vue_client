<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("08.topTalent.searchBox.year") }}</p>
                <SelectBoxBase
                  :id="'year'"
                  :name="'year'"
                  :data="listSelectBoxYear"
                  v-model="selectBoxYear"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>{{ t("08.topTalent.searchBox.university") }}</p>
                <InputBase
                  :id="'university'"
                  :name="'university'"
                  :mode="'show'"
                  v-model="goodTalentSearchModel.majorNm"
                ></InputBase>
              </li>
              <li>
                <p>{{ t("08.topTalent.searchBox.major") }}</p>
                <InputBase
                  :id="'major'"
                  :name="'major'"
                  :mode="'show'"
                  v-model="goodTalentSearchModel.deptNm"
                >
                </InputBase>
              </li>
              <li>
                <p>{{ t("08.topTalent.searchBox.grade") }}</p>
                <SelectBoxBase
                  :id="'grade'"
                  :name="'grade'"
                  :data="listSelectBoxGrade"
                  v-model="selectBoxGrade"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>{{ t("08.topTalent.searchBox.studentName") }}</p>
                <InputBase
                  :id="'studentName'"
                  :name="'studentName'"
                  :mode="'show'"
                  v-model="goodTalentSearchModel.userNm"
                ></InputBase>
              </li>
              <li>
                <p>{{ t("08.topTalent.searchBox.studentCode") }}</p>
                <InputBase
                  :id="'studentCode'"
                  :name="'studentCode'"
                  :mode="'show'"
                  v-model="goodTalentSearchModel.stdId"
                ></InputBase>
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                type="button"
                class="button btn_xl btn_blue btn_responsive"
                @click="search()"
              >
                {{ t("08.topTalent.button.search") }}
              </button>
              <button
                type="button"
                class="button btn_xl btn_lightgray btn_responsive"
                @click="reset()"
              >
                {{ t("08.topTalent.button.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section">
          <GridComponentV2
            v-if="isHeader"
            :key="key"
            :rowData="rowData"
            :columnDefs="columnDefs"
            :totalRecord="totalRecord"
            :paginationClientFlag="false"
            @customPagination="customPagination"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
          >
            <template #button>
              <div class="search_btnarea">
                <ExportFileExcel
                  :data="dataOutput"
                  :fileName="fileNameExport"
                  :btnName="nameOfbtn"
                  @click="exportExcel"
                >
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
import { defineComponent } from "vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { useI18n } from "vue-i18n";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
} from "../../constants/screen.const";
import SelectBoxBase from "../../components/common/input/SelectBoxBase.vue";

import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { commonStore } from "../../stores/common";
import type {
  GoodTalentResponseModel,
  GoodTalentSearchModel,
} from "../../stores/talentMng/goodTalent/goodTalentMng.type";
import { UP_CD_ID_GRADE_LEVEL } from "@/constants/common.const";
import { getList } from "../../stores/talentMng/goodTalent/goodTalentMng.service";
import ExportFileExcel from "@/components/common/excel/ExportFileExcel.vue";
import type { CodeMngRes } from "@/stores/common/codeMng/codeMng.type";
import { codeMngStore } from "../../stores/common/codeMng";
export default defineComponent({
  name: "EvaluationMethod",
  components: { Breadcrumb, SelectBoxBase, GridComponentV2, ExportFileExcel },
  setup() {
    const { t } = useI18n();
    const storeCommon = commonStore();
    const codeStore = codeMngStore();
    return { t, storeCommon, codeStore };
  },
  data() {
    return {
      key: 1,
      totalRecord: 0,
      selectBoxYear: "",
      selectBoxGrade: "",
      pageTitle: this.t("08.topTalentOfYear.title"),
      breadcrumbItems: [
        { label: "HOME", link: "/" },
        { label: "", link: "#" },
        { label: "", link: "/banner" },
      ],
      columnDefs: [
        {
          headerName: this.t("08.topTalent.table.graduationYear"),
          field: "eduYear",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("08.topTalent.table.university"),
          field: "majorNm",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("08.topTalent.table.major"),
          field: "deptNm",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("08.topTalent.table.schoolYear"),
          field: "gradeNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("08.topTalent.table.studentCode"),
          field: "stdId",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("08.topTalent.table.studentName"),
          field: "userNm",
          cellStyle: { textAlign: "center" },
          flex: 3,
        },
        {
          headerName: this.t("08.topTalent.table.medium"),
          field: "avg",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listSelectBoxYear: [],
      listSelectBoxGrade: [],
      rowData: [] as Array<GoodTalentResponseModel>,
      goodTalentSearchModel: {
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        eduYear: "",
        gradYear: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as GoodTalentSearchModel,

      // data exel
      fileNameExport: "GoodTalentOfYearMng",
      nameOfbtn: this.t("08.topTalent.button.downloadExel"),
      isHeader: false,
      isLoading: true,
      codeMngRes: {} as CodeMngRes,
      goodTalentSearchModelAll: {
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        eduYear: "",
        gradYear: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as GoodTalentSearchModel,
      rowDataAll: [] as Array<GoodTalentResponseModel>,
      maxTotal: 0,
      dataOutput: [],
    };
  },
  beforeMount() {
    try {
      Promise.all([
        this.getCode(),
        this.getDataAll(),
        this.addYearsToSelectBox(),
      ]);
    } catch (e) {
      alert(e);
    }
    this.isLoading = false;
  },
  methods: {
    async getCode() {
      this.storeCommon.setLoading(true);
      this.codeMngRes.upCdId = UP_CD_ID_GRADE_LEVEL;
      await this.codeStore.getCodeInfo(this.codeMngRes);
      if (this.codeStore && this.codeStore.status == SUCCSESS_STATUS) {
        this.listSelectBoxGrade = this.codeStore.codeInfo.data;
        this.listSelectBoxGrade.unshift({
          cdId: "",
          upCdId: UP_CD_ID_GRADE_LEVEL,
          cdNm: this.t("common.all"),
        });
      }
      this.storeCommon.setLoading(false);
    },

    customPagination(pageNumber: any, pagesSize: any) {
      this.goodTalentSearchModel.page = pageNumber;
      this.goodTalentSearchModel.size = pagesSize;
      if (!this.isLoading) {
        this.isLoading = true;
      } else {
        this.getDataAll();
      }
    },
    getDataAll() {
      if (this.isLoading) {
        this.storeCommon.setLoading(true);
        this.goodTalentSearchModel.eduYear = this.selectBoxYear;
        this.goodTalentSearchModel.gradYear = this.selectBoxGrade;
        getList(this.goodTalentSearchModel)
          .then((res) => {
            this.rowData = res.data.data.content;
            this.addYearsToSelectBox();
            if (!this.isHeader) {
              const lstHeader = [] as Array<string>;
              lstHeader.push(this.rowData[0].abil1Nm);
              lstHeader.push(this.rowData[0].abil2Nm);
              lstHeader.push(this.rowData[0].abil3Nm);
              lstHeader.push(this.rowData[0].abil4Nm);
              if (lstHeader.length > 0) {
                this.isHeader = true;
                lstHeader.forEach((item, index) => {
                  this.columnDefs.push({
                    headerName: item,
                    field: "score" + (index + 1),
                    cellStyle: { textAlign: "center" },
                    flex: 1,
                  });
                });
              }
            }
            this.totalRecord = res.data.data.totalElements;
          })
          .finally(() => {
            this.storeCommon.setLoading(false);
          });
      }
    },

    reset() {
      this.goodTalentSearchModel = {
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        eduYear: "",
        gradYear: "",
        page: 1,
        size: this.goodTalentSearchModel.size,
        sort: "",
      } as unknown as GoodTalentSearchModel;
      this.selectBoxYear = "";
      this.selectBoxGrade = "";
    },

    search() {
      this.key++;
      this.goodTalentSearchModel.page = 1;
    },

    exportExcel() {
      if (this.rowDataAll.length === 0) {
        this.storeCommon.setLoading(true);
        const searchModelAll = {
          ...this.goodTalentSearchModelAll,
          page: 1,
          size: this.maxTotal || 10,
          sort: "",
        };
        getList(searchModelAll)
          .then((res) => {
            this.rowDataAll = res.data.data.content;
            const rowExcelHeader = this.columnDefs.map((el) => el.headerName);

            const rowExcel = this.rowDataAll.map((el) => {
              const colExcel = [
                el.eduYear,
                el.majorNm,
                el.deptNm,
                el.gradeNm,
                el.stdId,
                el.userNm,
                el.avg,
                el.score1,
                el.score2,
                el.score3,
                el.score4,
              ];
              return colExcel;
            });

            this.dataOutput = [
              { sheetName: "sheet1", data: rowExcel, header: rowExcelHeader },
            ];
          })
          .finally(() => {
            this.storeCommon.setLoading(false);
          });
      }
    },
    addYearsToSelectBox() {
      this.listSelectBoxYear = [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ];
      const uniqueYears = new Set();

      for (let i = 0; i < this.rowData.length; i++) {
        const year = this.rowData[i].eduYear;
        if (!uniqueYears.has(year)) {
          uniqueYears.add(year);
          this.listSelectBoxYear.push({
            cdId: year,
            cdNm: year,
          });
        }
      }
    },
  },
});
</script>
