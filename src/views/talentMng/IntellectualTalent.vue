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
                  :id="'grade'"
                  :name="'grade'"
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
                  v-model="wiseTalentSearchModel.majorNm"
                ></InputBase>
              </li>
              <li>
                <p>{{ t("08.topTalent.searchBox.major") }}</p>
                <InputBase
                  :id="'major'"
                  :name="'major'"
                  :mode="'show'"
                  v-model="wiseTalentSearchModel.deptNm"
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
                  v-model="wiseTalentSearchModel.userNm"
                ></InputBase>
              </li>
              <li>
                <p>{{ t("08.topTalent.searchBox.studentCode") }}</p>
                <InputBase
                  :id="'studentCode'"
                  :name="'studentCode'"
                  :mode="'show'"
                  v-model="wiseTalentSearchModel.stdId"
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
            :key="key"
            :rowData="rowData"
            :columnDefs="columnDefs"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            @customPagination="customPagination"
            :totalRecord="totalRecord"
            :paginationClientFlag="false"
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
import type {
  WiseTalentResponseModel,
  WiseTalentSearchModel,
} from "../../stores/talentMng/wiseTalent/wiseTalentmng.type";
import { commonStore } from "../../stores/common";
import { getList } from "../../stores/talentMng/wiseTalent/wiseTalentMng.service";
import ExportFileExcel from "@/components/common/excel/ExportFileExcel.vue";
import { codeMngStore } from "../../stores/common/codeMng";
import type { CodeMngRes } from "@/stores/common/codeMng/codeMng.type";
import { UP_CD_ID_GRADE_LEVEL } from "@/constants/common.const";
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
      pageTitle: this.t("08.intellectualTalent.title"),
      breadcrumbItems: [
        { label: "HOME", link: "/" },
        { label: "사이트관리", link: "#" },
        { label: "배너 관리", link: "/banner" },
      ],
      columnDefs: [
        {
          headerName: this.t("08.intellectualTalent.table.graduationYear"),
          field: "eduYear",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("08.intellectualTalent.table.university"),
          field: "majorNm",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("08.intellectualTalent.table.major"),
          field: "deptNm",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("08.intellectualTalent.table.schoolYear"),
          field: "termNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("08.intellectualTalent.table.studentCode"),
          field: "stdId",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("08.intellectualTalent.table.studentName"),
          field: "userNm",
          cellStyle: { textAlign: "center" },
          flex: 3,
        },
        {
          headerName: this.t("08.intellectualTalent.table.diagnosisDate"),
          field: "finalDiagDate",
          cellStyle: { textAlign: "center" },
          flex: 1.5,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listSelectBoxYear: [],
      listSelectBoxGrade: [],
      rowData: [] as Array<WiseTalentResponseModel>,
      wiseTalentSearchModel: {
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        eduYear: "",
        gradYear: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as WiseTalentSearchModel,

      // data exel
      fileNameExport: "IntellectualTalent",
      nameOfbtn: this.t("08.topTalent.button.downloadExel"),
      codeMngRes: {} as CodeMngRes,
      wiseTalentSearchModelAll: {
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        eduYear: "",
        gradYear: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as WiseTalentSearchModel,
      rowDataAll: [] as Array<WiseTalentResponseModel>,
      maxTotal: 0,
      dataOutput: [],
    };
  },

  beforeMount() {
    try {
      Promise.all([this.getCode()]);
    } catch (e) {
      alert(e);
    }
  },
  methods: {
    customPagination(pageNumber: any, pagesSize: any) {
      this.wiseTalentSearchModel.page = pageNumber;
      this.wiseTalentSearchModel.size = pagesSize;
      this.getDataAll();
    },
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
    getDataAll() {
      this.storeCommon.setLoading(true);

      getList(this.wiseTalentSearchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.addYearsToSelectBox();
          this.rowData.map((item: any) => {
            item.eduYear = item.eduYear + "-" + item.termNm;
            return item;
          });
          this.totalRecord = res.data.data.totalElements;
          if (this.maxTotal === 0) {
            this.maxTotal = this.totalRecord;
          }
        })

        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },

    reset() {
      this.wiseTalentSearchModel = {
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        eduYear: "",
        gradYear: "",
        page: 1,
        size: this.wiseTalentSearchModel.size,
        sort: "",
      } as unknown as WiseTalentSearchModel;

      this.selectBoxYear = "";
      this.selectBoxGrade = "";
    },

    search() {
      this.key++;
      this.wiseTalentSearchModel.page = 1;
      this.wiseTalentSearchModel.eduYear = this.selectBoxYear;
      this.wiseTalentSearchModel.gradYear = this.selectBoxGrade;
    },

    exportExcel() {
      if (this.rowDataAll.length === 0) {
        this.storeCommon.setLoading(true);
        const searchModelAll = {
          ...this.wiseTalentSearchModelAll,
          page: 1,
          size: this.maxTotal || 10,
          sort: "",
        };
        getList(searchModelAll)
          .then((res) => {
            this.rowDataAll = res.data.data.content;
            this.rowData.map((item: any) => {
              item.eduYear = item.eduYear + "-" + item.termNm;
              return item;
            });
            const rowExcelHeader = this.columnDefs.map((el) => el.headerName);
            const rowExcel = this.rowDataAll.map((el) => {
              const colExcel = [
                el.eduYear,
                el.majorNm,
                el.deptNm,
                el.termNm,
                el.stdId,
                el.userNm,
                el.finalDiagDate,
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
