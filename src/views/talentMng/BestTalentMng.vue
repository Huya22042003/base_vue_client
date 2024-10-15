<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("08.topTalent.searchBox.university") }}</p>
                <InputBase
                  :id="'university'"
                  :name="'university'"
                  :mode="'show'"
                  v-model="bestTalentSearchModel.majorNm"
                >
                </InputBase>
              </li>
              <li>
                <p>{{ t("08.topTalent.searchBox.major") }}</p>
                <InputBase
                  :id="'major'"
                  :name="'major'"
                  :mode="'show'"
                  v-model="bestTalentSearchModel.deptNm"
                >
                </InputBase>
              </li>
              <li>
                <p>{{ t("08.topTalent.searchBox.studentCode") }}</p>
                <InputBase
                  :id="'studentCode'"
                  :name="'studentCode'"
                  :mode="'show'"
                  v-model="bestTalentSearchModel.stdId"
                ></InputBase>
              </li>
              <li>
                <p>{{ t("08.topTalent.searchBox.studentName") }}</p>
                <InputBase
                  :id="'studentName'"
                  :name="'studentName'"
                  :mode="'show'"
                  v-model="bestTalentSearchModel.userNm"
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
} from "../../constants/screen.const";
import SelectBoxBase from "../../components/common/input/SelectBoxBase.vue";
import type {
  BestTalentResponseModel,
  BestTalentSearchModel,
} from "../../stores/talentMng/bestTalent/bestTalentMng.type";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { commonStore } from "../../stores/common";
import { getList } from "../../stores/talentMng/bestTalent/bestTalentMng.service";
import ExportFileExcel from "@/components/common/excel/ExportFileExcel.vue";

export default defineComponent({
  name: "EvaluationMethod",
  components: {
    Breadcrumb,
    SelectBoxBase,
    GridComponentV2,
    ExportFileExcel,
  },
  setup() {
    const { t } = useI18n();
    const storeCommon = commonStore();

    return { t, storeCommon };
  },
  data() {
    return {
      key: 1,
      totalRecord: 0,
      pageTitle: this.t("08.topTalent.title"),
      isHeader: false,
      isLoading: true,
      breadcrumbItems: [
        { label: "HOME", link: "/" },
        { label: "", link: "#" },
        { label: "", link: "/" },
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
      rowData: [] as Array<BestTalentResponseModel>,
      bestTalentSearchModel: {
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as BestTalentSearchModel,

      // data exel
      fileNameExport: "TopTalentMng",
      nameOfbtn: this.t("08.topTalent.button.downloadExel"),
      bestTalentSearchModelAll: {
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as BestTalentSearchModel,
      rowDataAll: [] as Array<BestTalentResponseModel>,
      maxTotal: 0,
      dataOutput: [],
    };
  },

  beforeMount() {
    this.getDataAll();
    this.isLoading = false;
  },

  methods: {
    customPagination(pageNumber: any, pagesSize: any) {
      this.bestTalentSearchModel.page = pageNumber;
      this.bestTalentSearchModel.size = pagesSize;

      if (!this.isLoading) {
        this.isLoading = true;
      } else {
        this.getDataAll();
      }
    },

    getDataAll() {
      if (this.isLoading) {
        this.storeCommon.setLoading(true);
        getList(this.bestTalentSearchModel)
          .then((res) => {
            this.rowData = res.data.data.content;
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
            if (this.maxTotal === 0) {
              this.maxTotal = this.totalRecord;
            }
          })
          .finally(() => {
            this.storeCommon.setLoading(false);
          });
      }
    },

    reset() {
      this.bestTalentSearchModel = {
        majorNm: "",
        deptNm: "",
        stdId: "",
        userNm: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      };
    },

    search() {
      this.key++;
      this.bestTalentSearchModel.page = 1;
    },

    exportExcel() {
      if (this.rowDataAll.length === 0) {
        this.storeCommon.setLoading(true);

        const searchModelAll = {
          ...this.bestTalentSearchModelAll,
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
  },
});
</script>
