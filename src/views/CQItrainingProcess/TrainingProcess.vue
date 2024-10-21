<template>
  <div class="content_wrap">
    <div class="grid_content">
      <div class="page_toparea">
        <h2 class="page_title">{{ t("trainingProcess.title") }}</h2>
      </div>
    </div>
    <div class="grid_content">
      <div class="sub_section">
        <div class="sub_section_xs">
          <!-- 검색유형 1 -->
          <div class="search_box">
            <div class="search_section">
              <div class="search_toggle sm">
                <div class="left"></div>
                <div class="right">
                  <div class="search_daywrap mg_r10">
                    <span class="tag">{{ t("trainingProcess.search1") }}</span>
                    <div class="max_wd100">
                      <SelectBoxBase :data="listYear" v-if="listYear" v-model="searchParams.year" id="year" />
                    </div>
                  </div>
                  <div class="search_daywrap mg_r10">
                    <span class="tag">{{ t("trainingProcess.search2") }}</span>
                    <div class="max_wd100">
                      <InputBase v-model="searchParams.deptNm" id="deptNm" />
                    </div>
                  </div>
                  <button type="button" class="btn_round btn_lg btn_primary mg_l10" @click="getAllData()">
                    {{ t("trainingProcess.btnSearch") }}
                  </button>
                  <button @click="resetFormData()" type="button" class="btn_round btn_lg btn_gray mg_l5">
                    {{ t("common.reset") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sub_section">
        <div class="box">
          <GridComponentV2 :rowData="dataRow" :columnDefs="columnDefs1" :paginationClientFlag="false"
            :totalRecord="paginationFake" @customPagination="fnPagination" ref="gridKey" :id="'trainingProcess'">
          </GridComponentV2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { ref } from "vue";
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useRouter } from "vue-router";
import { SCREEN } from "@/router/screen";
import { useI18n } from "vue-i18n";
import {
  EduCourseCqiListModel,
  EduCourseCqiSearchModel,
} from "@/stores/cqiTrainingProcess/cqiTrainingProcess.type";
import {
  PAGINATION_PAGE_1,
  PAGINATION_PAGE_SIZE,
  START_YEAR_NUMBER,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { getEduCourseCqiList } from "@/stores/cqiTrainingProcess/cqiTrainingProcess.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import {
  DEPT_TYPE_GENERAL_EDUCATION,
  STS_EDU_CQI_CREATE,
  STS_EDU_CQI_NOT_CREATE,
  STS_EDU_CQI_SUCCESS,
} from "@/constants/common.const";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";

const { t } = useI18n();
const router = useRouter();
const storeCommon = commonStore();

const columnDefs1 = ref([
  {
    headerName: t("trainingProcess.column1"),
    field: "rowNum",
    flex: 0.3,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: t("trainingProcess.column2"),
    field: "year",
    flex: 0.3,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: t("trainingProcess.column3"),
    field: "deptNm",
    cellRenderer: LinkGridComponent,
    cellRendererParams: {
      onCustomEvent: handleDetailClick,
    },
  },
  { headerName: t("trainingProcess.column4"), field: "eduCourseTypeNm" },
  {
    headerName: t("trainingProcess.column5"),
    field: "stsNm",
    cellStyle: (data: any) => {
      const code = data.data.stsCd;

      let color = "";

      if (code == STS_EDU_CQI_NOT_CREATE) {
        color = "#FF0000";
      }
      if (code == STS_EDU_CQI_CREATE) {
        color = "#000000";
      }
      if (code == STS_EDU_CQI_SUCCESS) {
        color = "#026700";
      }

      return {
        color: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
    },
    flex: 0.6,
  },
  { headerName: t("trainingProcess.column6"), field: "regBy" },
  { headerName: t("trainingProcess.column7"), field: "regDate" },
  {
    headerName: t("trainingProcess.column8"),
    cellRenderer: ButtonGridComponent,
    flex: 0.4,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    cellRendererParams: (data: EduCourseCqiListModel) => {
      return {
        onCustomEvent: printReport,
        value: t("common.print"),
        className: "btn_round btn_sm btn_white",
      };
    },
  },
]);

const dataRow = ref<EduCourseCqiListModel[]>([]);

const listYear = ref<Array<CodeMngModel>>([]);

const currentYear = new Date().getFullYear();
for (let index = START_YEAR_NUMBER; index <= currentYear + 1; index++) {
  listYear.value.push({
    cdId: `${index}`,
    cdNm: `${index}`,
    upCdId: `${index}`,
  });
}

const searchParams = ref<EduCourseCqiSearchModel>({
  deptNm: "",
  year: `${currentYear + 1}`,
  page: PAGINATION_PAGE_1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const gridKey = ref(null);
const paginationFake = ref(100);

const fnPagination = (pageNumber: any, pagesSize: any) => {
  searchParams.value.size = pagesSize;
  searchParams.value.page = pageNumber;

  getAllData();
};

const resetFormData = () => {
  searchParams.value = {
    deptNm: "",
    year: `${currentYear + 1}`,
    page: PAGINATION_PAGE_1,
    size: PAGINATION_PAGE_SIZE,
    sort: "",
  };
};

const getAllData = () => {
  storeCommon.setLoading(true);
  getEduCourseCqiList(searchParams.value)
    .then((res) => {
      dataRow.value = res.data.data.content.map((item: EduCourseCqiListModel) => {
        item.typeOfRedirect = item.deptCd == DEPT_TYPE_GENERAL_EDUCATION ? 'general' : 'major'

        return item;
      }) as EduCourseCqiListModel[];
      paginationFake.value = res.data.data.totalElements;
    })
    .finally(() => {
      storeCommon.setLoading(false);
    });
};

const printReport = (data: EduCourseCqiListModel) => { };

function handleDetailClick(item: EduCourseCqiListModel) {
  router.push({
    name: SCREEN.createTrainingProcess.name,
    params: { mode: item.typeOfRedirect },
    state: {deptCd: item.deptCd, deptNm: item.deptNm, typeSeq: item.eduCursTypeSeq, year: item.year, eduCourseCqiSeq: item.eduCourseCqiSeq }
  });
}
</script>

<style scoped></style>
