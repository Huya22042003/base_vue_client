<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="search_box">
      <div class="search_section">
        <div class="search_toggle lg center">
          <div class="left">
            <p class="total_count"></p>
          </div>
          <div class="search_daywrap mg_r10">
            <span class="tag">{{ t("finalArchi.list.col1") }}</span>
            <div class="wd_150">
              <SelectBoxBase
                :id="'selectboxShow'"
                :name="'selectboxShow'"
                :data="listSelectBoxShow"
                v-model="finalAchiSearchModel.yearEdu"
              >
              </SelectBoxBase>
            </div>
          </div>
          <div class="search_daywrap mg_r10">
            <span class="tag">{{ t("finalArchi.list.col10") }}</span>
            <div class="wd_150">
              <SelectBoxBase
                :id="'selectboxShow'"
                :name="'selectboxShow'"
                :data="listSelectBoxShow1"
                v-model="finalAchiSearchModel.termEdu"
              >
              </SelectBoxBase>
            </div>
          </div>

          <div class="search_daywrap mg_r10">
            <span class="tag">{{ t("finalArchi.list.col4") }}</span>
            <div class="select_row">
              <InputBase
                :id="'ctgName'"
                :name="'ctgName'"
                placeholder="보고 싶은 비교과 프로그램을 찾아보세요"
                v-model="finalAchiSearchModel.sbjtNm"
              >
              </InputBase>
            </div>
          </div>
        </div>
      </div>
      <div class="search_section">
        <div class="search_toggle sm">
          <div class="left"></div>
          <div class="right">
            <div class="search_daywrap mg_r10">
              <span class="tag">{{ t("finalArchi.list.col9") }}</span>
              <div class="wd_150">
                <SelectBoxBase
                  :id="'selectboxShow'"
                  :name="'selectboxShow'"
                  :data="listSelectBoxShow2"
                  v-model="finalAchiSearchModel.status"
                >
                </SelectBoxBase>
              </div>
            </div>
            <button
              type="button"
              class="btn_round btn_lg btn_primary mg_l10"
              @click="searchClick"
            >
              조회하기
            </button>
            <button
              type="button"
              class="btn_round btn_lg btn_gray mg_l5"
              @click="resetSearch"
            >
              초기화
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
          @customPagination="fnPagination"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
          :paginationClientFlag="false"
          v-model="rowselected"
          ref="grid"
          :key="keyId"
          :totalRecord="totalRows"
        >
          <template #button>
            <div class="search_btnarea">
              <ExportFileExcel :data="handClickRp()" :btnName="nameOfbtnRp">
                {{ t("finalArchi.list.downloadRp") }}
              </ExportFileExcel>
            </div>
            <div class="search_btnarea">
              <ExportFileExcel
                :data="handClickExport()"
                :fileName="fileNameExport"
                :btnName="nameOfbtn"
              >
                {{ t("finalArchi.list.downloadExcel") }}
              </ExportFileExcel>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import { defineComponent, ref } from "vue";
import type { FinalAchiSearchModel } from "../../stores/finalArchivement/finalArchivement.type";
import { fetchData } from "@/stores/finalArchivement/finalArchivement.service";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  MODE_DETAIL,
} from "../../constants/screen.const";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";
import type { PageableModel } from "@/stores/eduCourseType/eduCourse.type";
import { useRouter } from "vue-router";
import ImageGridComponent from "../../components/common/gridNotice/GridComponentNotice.vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { commonStore } from "@/stores/common";
import type { ExcelData } from "../../stores/common/excel/excelData.type";

export default defineComponent({
  components: {
    InputBase,
    SelectBoxBase,
    GridComponentV2,
    Breadcrumb,
    BaseDatePicker,
    LoaddingComponent,
    LinkGridComponent,
    ImageGridComponent,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const pageable = ref<PageableModel>({
      page: 1,
      size: 10,
      sort: "",
    });
    const pageTitle = t("09.notificationCategory.title");
    const breadcrumbItems = [
      { label: t("09.notificationCategory.scum01"), link: "/" },
      { label: t("09.notificationCategory.scum02"), link: "#" },
      {
        label: t("09.notificationCategory.scum03"),
        link: "/notificationCategory",
      },
    ];
    const listSelectBoxShow = ref([
      { cdId: "", cdNm: "전체" },
      { cdId: "2024", cdNm: "2024" },
      { cdId: "2025", cdNm: "2025" },
    ]);
    const listSelectBoxShow1 = ref([
      { cdId: "", cdNm: "전체" },
      { cdId: "1", cdNm: "1" },
      { cdId: "2", cdNm: "2" },
    ]);
    const listSelectBoxShow2 = ref([
      { cdId: "", cdNm: "전체" },
      { cdId: "Y", cdNm: "완료" },
      { cdId: "N", cdNm: "미완료" },
    ]);
    const router = useRouter();
    const paginationPageSize = PAGINATION_PAGE_SIZE;
    const paginationPageSizeSelector = PAGINATION_PAGE_SIZE_SELECTOR;
    const rowselected = ref<any[]>([]);
    const columnDefs = ref([
      {
        headerName: t("finalArchi.list.col0"),
        field: "creYear",
        flex: 3,
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: t("finalArchi.list.col2"),
        field: "sbjtNm",
        flex: 2,
        cellStyle: { textAlign: "center" },
      },

      {
        headerName: t("finalArchi.list.col3"),
        field: "deptNm",
        flex: 2,
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: t("finalArchi.list.col4"),
        field: "uniNm",
        cellRenderer: "LinkGridComponent",
        cellRendererParams: { onCustomEvent: handleCustomClick },
        cellStyle: {
          color: "#2704FF",
          display: "flex",
          alignItems: "center",
        },
        flex: 4,
      },
      {
        headerName: t("finalArchi.list.col5"),
        field: "sustDivNm",
        flex: 2,
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: t("finalArchi.list.col6"),
        field: "gradeNm",
        flex: 2,
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: t("finalArchi.list.col7"),
        field: "divNm",
        flex: 2,
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: t("finalArchi.list.col8"),
        field: "yearEdu",
        flex: 3,
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: t("finalArchi.list.col9"),
        field: "status",
        flex: 2,
        cellStyle: (params) => {
          if (params.value === "완료") {
            return { textAlign: "center", color: "green" };
          } else {
            return { textAlign: "center", color: "red" };
          }
        },
      },
    ]);
    const listSelectBoxSite = ref([]);
    const finalAchiSearchModel = ref({
      yearEdu: "",
      termEdu: "",
      sbjtNm: "",
      status: "",
      page: 1,
      size: 10,
      sort: "",
    }) as FinalAchiSearchModel;
    const totalRows = ref<number>;
    function handleCustomClick(data: any) {
      router.push({
        name: SCREEN.finalArchivementAction.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.lectCd,
          userJobPerformEvalSeq: data.userJobPerformEvalSeq,
          finalGradeConfrmYn: data.finalGradeConfrmYn,
          staffNm: data.staffNm,
          divNm: data.divNm,
          yearEdu: data.yearEdu,
          sbjtNm: data.sbjtNm,
          sbjtCd: data.sbjtCd,
          termNm: data.termNm,
          gradeNm: data.gradeNm,
        },
      });
    }

    return {
      t,
      router,
      cmn,
      pageable,
      breadcrumbItems,
      paginationPageSize,
      paginationPageSizeSelector,
      columnDefs,
      rowselected,
      pageTitle,
      listSelectBoxShow,
      listSelectBoxShow1,
      listSelectBoxShow2,
      listSelectBoxSite,
      finalAchiSearchModel,
      handleCustomClick,
      totalRows,
    };
  },
  data() {
    return {
      keyId: 1,
      searchModel: {} as FinalAchiSearchModel,
      rowData: [],
      nameOfbtn: this.t("finalArchi.list.downloadExcel"),
      fileNameExport: "공지사항",
      nameOfbtnRp: this.t("finalArchi.list.downloadRp"),
      rowDataExcel: [{}],
    };
  },
  beforeUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  },
  beforeMount() {},
  mounted() {
    document.addEventListener("keypress", this.handleKeyPress);
  },
  methods: {
    searchClick() {
      this.finalAchiSearchModel.page = 1;
      this.keyId++;
    },
    async getDataAll() {
      this.cmn.setLoading(true);
      try {
        await fetchData(this.finalAchiSearchModel)
          .then((res) => {
            this.rowData = res.data.data.content;
            this.rowDataExcel = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
          })
          .catch((error) => {
            throw new Error(MESSAGE_ERROR_API);
          })
          .finally(() => {
            this.cmn.setLoading(false);
          });
      } catch (e) {
      } finally {
      }
    },

    handleKeyPress(event: any) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.getDataAll();
      }
    },
    resetSearch() {
      this.finalAchiSearchModel = {
        yearEdu: "",
        termEdu: "",
        sbjtNm: "",
        status: "",
        page: 1,
        size: 10,
        sort: "",
      };
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.finalAchiSearchModel.size = pagesSize;
      this.finalAchiSearchModel.page = pageNumber;
      this.finalAchiSearchModel.sort = "";
      this.getDataAll();
    },
    handClickExport() {
      let rowExcel = [] as Array<Array<any>>;
      let rowExcelHeader = [] as Array<any>;

      this.columnDefs.forEach((el) => {
        rowExcelHeader.push(el.headerName);
      });

      this.rowDataExcel.forEach((el) => {
        let colExcel = [] as Array<any>;
        colExcel.push(el.creYear);
        colExcel.push(el.sbjtNm);
        colExcel.push(el.deptNm);
        colExcel.push(el.uniNm);
        colExcel.push(el.yearEdu);
        colExcel.push(el.gradeNm);
        colExcel.push(el.divNm);
        colExcel.push(el.status);
        rowExcel.push(colExcel);
      });
      return [
        { sheetName: "sheet1", data: rowExcel, header: rowExcelHeader },
      ] as Array<ExcelData>;
    },
    handClickRp() {},
  },
});
</script>
<style scoped>
.box_search {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
}

.box_search ul {
  display: flex;
}

.box_search ul li {
  display: flex;
  flex-direction: column;
}
</style>
