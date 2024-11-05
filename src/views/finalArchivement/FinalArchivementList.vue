<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p>{{ t("finalArchi.list.col1") }}</p>
              <SelectBoxBase
                :id="'selectboxShow'"
                :name="'selectboxShow'"
                :data="listSelectBoxShow"
                v-model="finalAchiSearchModel.yearEdu"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p>{{ t("finalArchi.list.col10") }}</p>
              <SelectBoxBase
                :id="'selectboxShow'"
                :name="'selectboxShow'"
                :data="listSelectBoxShow1"
                v-model="finalAchiSearchModel.termEdu"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p>{{ t("finalArchi.list.col4") }}</p>
              <InputBase
                :id="'ctgName'"
                :name="'ctgName'"
                class="form_style"
                v-model="finalAchiSearchModel.sbjtNm"
              >
              </InputBase>
            </li>
          </ul>
          <ul>
            <li>
              <p>{{ t("finalArchi.list.col9") }}</p>
              <SelectBoxBase
                :id="'selectboxShow'"
                :name="'selectboxShow'"
                :data="listSelectBoxShow2"
                v-model="finalAchiSearchModel.status"
              >
              </SelectBoxBase>
            </li>
          </ul>
          <div class="btn_group btn_end">
            <button
              type="button"
              class="button btn_lg btn_blue btn_responsive"
              @click="searchClick()"
            >
              {{ t("common.search") }}
            </button>
            <button
              type="button"
              class="button btn_lg btn_gray btn_responsive"
              @click="resetSearch()"
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
          @customPagination="fnPagination"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
          :paginationClientFlag="false"
          v-model="rowselected"
          ref="grid"
          :key="keyId"
          :totalRecord="totalRows"
        >
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
  START_YEAR
} from "../../constants/screen.const";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";
import type { PageableModel } from "@/stores/eduCourseType/eduCourse.type";
import { useRouter } from "vue-router";
import ImageGridComponent from "../../components/common/gridNotice/GridComponentNotice.vue";
import {
  MESSAGE_ERROR_API,
  STATUS_YES,
  STATUS_NO,
  UP_CD_ID_SEMESTER
} from "@/constants/common.const";
import { commonStore } from "@/stores/common";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";

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
    const pageTitle = "최종성적조회";
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
    ]);
    const listSelectBoxShow1 = ref([
      { cdId: "", cdNm: "전체" },     
    ]);
    const listSelectBoxShow2 = ref([
      { cdId: "", cdNm: "전체" },
      { cdId: STATUS_YES, cdNm: "완료" },
      { cdId: STATUS_NO, cdNm: "미완료" },
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
        field: "deptNm",
        flex: 2,
        cellStyle: { textAlign: "center" },
      },

      {
        headerName: t("finalArchi.list.col3"),
        field: "uniNm",
        flex: 2,
        cellStyle: { textAlign: "center" },
      },
      {
        headerName: t("finalArchi.list.col4"),
        field: "sbjtNm",
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
      yearEdu: new Date().getFullYear(),
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
  beforeMount() {this.getListCode();},
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
        yearEdu: new Date().getFullYear(),
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
    getListYear(){
      const currentYear = new Date().getFullYear()+1;
      for(var i=parseInt(START_YEAR); i<=currentYear; i++){
        let year = {} as CodeMngModel;
        year.cdId= i,
        year.cdNm= i

        this.listSelectBoxShow.push(year)
        
      }
    },
    getListCode() {
      this.cmn.setLoading(true);
      this.getListYear();
      getListCodeMng({
        upCdIdList: [UP_CD_ID_SEMESTER],
      })
        .then((res) => {
          this.listSelectBoxShow1 = res.data.data.filter(
            (el: CodeMngModel) => el.upCdId == UP_CD_ID_SEMESTER
          );

          this.listSelectBoxShow1.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
          });
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    }
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
