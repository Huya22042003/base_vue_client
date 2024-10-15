<template>
  <div class="box dp_block">
    <div class="box_section">
      <div class="search_box col_3">
        <ul>
          <li>
            <p>{{ t("08.eliteTalentForType.searchBox.yearWinning") }}</p>
            <SelectBoxBase
              :id="'yearWinning'"
              :name="'yearWinning'"
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
              v-model="abilityTalentSearchModel.majorNm"
            ></InputBase>
          </li>
          <li>
            <p>{{ t("08.topTalent.searchBox.major") }}</p>
            <InputBase
              :id="'major'"
              :name="'major'"
              :mode="'show'"
              v-model="abilityTalentSearchModel.deptNm"
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
              v-model="abilityTalentSearchModel.userNm"
            ></InputBase>
          </li>
          <li>
            <p>{{ t("08.topTalent.searchBox.studentCode") }}</p>
            <InputBase
              :id="'studentCode'"
              :name="'studentCode'"
              :mode="'show'"
              v-model="abilityTalentSearchModel.stdId"
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
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
} from "../../constants/screen.const";
import { abilityGoodTalentStore } from "../../stores/talentMng/abilityGoodTalent";
import type {
  AbilityTalentResponseModel,
  AbilityTalentSearchModel,
} from "../../stores/talentMng/abilityGoodTalent/abilityGoodMng.type";
import { commonStore } from "../../stores/common";
import GridComponentV2 from "../../components/common/grid/GridComponentV2.vue";
import ExportFileExcel from "@/components/common/excel/ExportFileExcel.vue";
import { codeMngStore } from "../../stores/common/codeMng";
import type { CodeMngRes } from "@/stores/common/codeMng/codeMng.type";
import { UP_CD_ID_GRADE_LEVEL } from "@/constants/common.const";
export default defineComponent({
  name: "EliteTalentTab",
  components: {
    GridComponentV2,
    ExportFileExcel,
  },

  props: {
    idCapacity: {
      type: String,
      required: true,
    },
    nameCapacity: {
      type: String,
      required: true,
    },
  },

  setup() {
    const { t } = useI18n();
    const storeCommon = commonStore();
    const storeAbilityGoodTalent = abilityGoodTalentStore();
    const codeStore = codeMngStore();
    return {
      t,
      storeCommon,
      storeAbilityGoodTalent,
      codeStore,
    };
  },

  data() {
    return {
      key: 1,
      totalRecord: 0,
      selectBoxYear: "",
      selectBoxGrade: "",
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listSelectBoxYear: [],
      listSelectBoxGrade: [],
      columnDefs: ref([
        {
          headerName: this.t("08.eliteTalentForType.table.yearWinning"),
          field: "eduYear",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("08.eliteTalentForType.table.university"),
          field: "majorNm",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("08.eliteTalentForType.table.major"),
          field: "deptNm",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("08.eliteTalentForType.table.grade"),
          field: "gradeNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("08.eliteTalentForType.table.studentCode"),
          field: "stdId",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("08.eliteTalentForType.table.studentName"),
          field: "userNm",
          cellStyle: { textAlign: "center" },
          flex: 3,
        },
        {
          headerName: this.$props.nameCapacity,
          field: "abilityScore",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
      ]),

      rowData: [] as Array<AbilityTalentResponseModel>,
      abilityTalentSearchModel: {
        abilitySeq: this.$props.idCapacity,
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        eduYear: "",
        gradYear: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as AbilityTalentSearchModel,

      // data exel
      fileNameExport: "EliteTalentTab",
      nameOfbtn: this.t("08.topTalent.button.downloadExel"),
      codeMngRes: {} as CodeMngRes,
      abilityTalentSearchModelAll: {
        abilitySeq: this.$props.idCapacity,
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        eduYear: "",
        gradYear: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as AbilityTalentSearchModel,
      rowDataAll: [] as Array<AbilityTalentResponseModel>,
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
      this.abilityTalentSearchModel.page = pageNumber;
      this.abilityTalentSearchModel.size = pagesSize;
      this.getDataAll();
    },

    getDataAll() {
      this.abilityTalentSearchModel.abilitySeq = this.$props.idCapacity;
      this.storeCommon.setLoading(true);

      this.storeAbilityGoodTalent
        .searchGoodTalent(this.abilityTalentSearchModel)
        .then(() => {
          if (
            this.storeAbilityGoodTalent.status &&
            this.storeAbilityGoodTalent.status == SUCCSESS_STATUS
          ) {
            this.rowData = this.storeAbilityGoodTalent.resultData;
            this.addYearsToSelectBox();
            this.rowData.map((item) => {
              item.eduYear = item.termNm
                ? item.eduYear + "-" + item.termNm
                : item.eduYear;

              return item;
            });
          }
          this.totalRecord = this.storeAbilityGoodTalent.totalRecord ?? 0;
          if (this.maxTotal === 0) {
            this.maxTotal = this.totalRecord;
          }
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
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
    reset() {
      this.abilityTalentSearchModel = {
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        eduYear: "",
        gradYear: "",
        page: 1,
        size: this.abilityTalentSearchModel.size,
        sort: "",
      };

      this.selectBoxYear = "";
      this.selectBoxGrade = "";
    },

    search() {
      this.key++;
      this.abilityTalentSearchModel.page = 1;
      this.abilityTalentSearchModel.eduYear = this.selectBoxYear;
      this.abilityTalentSearchModel.gradYear = this.selectBoxGrade;
    },

    exportExcel() {
      if (this.rowDataAll.length === 0) {
        this.abilityTalentSearchModelAll.abilitySeq = this.$props.idCapacity;
        const searchModelAll = {
          ...this.abilityTalentSearchModelAll,
          page: 1,
          size: this.maxTotal || 10,
          sort: "",
        };
        this.storeCommon.setLoading(true);
        this.storeAbilityGoodTalent
          .searchGoodTalent(searchModelAll)
          .then(() => {
            if (
              this.storeAbilityGoodTalent.status &&
              this.storeAbilityGoodTalent.status == SUCCSESS_STATUS
            ) {
              this.rowDataAll = this.storeAbilityGoodTalent.resultData;
              this.rowDataAll.map((item) => {
                item.eduYear = item.termNm
                  ? item.eduYear + "-" + item.termNm
                  : item.eduYear;

                return item;
              });
              const rowExcelHeader = this.columnDefs.map((el) => el.headerName);
              const rowExcel = this.rowDataAll.map((el) => {
                const colExcel = [
                  el.eduYear,
                  el.majorNm,
                  el.deptNm,
                  el.gradeNm,
                  el.stdId,
                  el.userNm,
                  el.abilityScore,
                ];
                return colExcel;
              });
              this.dataOutput = [
                { sheetName: "sheet1", data: rowExcel, header: rowExcelHeader },
              ];
            }
          })
          .finally(() => {
            this.storeCommon.setLoading(false);
          });
      }
    },
  },

  watch: {
    nameCapacity(newVal) {
      this.columnDefs = this.columnDefs.map((col) =>
        col.field === "abilityScore" ? { ...col, headerName: newVal } : col
      );
      this.reset();
      this.getDataAll();
      this.rowDataAll = [];
      this.maxTotal = 0;
    },
  },
});
</script>
