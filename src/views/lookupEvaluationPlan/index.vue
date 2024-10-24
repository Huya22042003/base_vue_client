<template>
  <div class="content_wrap dashboard">
    <div class="grid_content">
      <div class="page_toparea">
        <h2 class="page_title">{{ t("05.lookupEvaluationPlan.pageTitle") }}</h2>
      </div>

      <div class="box dp_block">
        <div class="box_section">
          <div class="search_toggle sm">
            <div class="left"></div>
            <div class="right">
              <div class="search_daywrap">
                <span class="tag">{{
                  t("05.lookupEvaluationPlan.search.initiationYear")
                }}</span>
                <div class="wd_150">
                  <SelectBoxBase
                    :id="'firstYear'"
                    :name="'firstYear'"
                    :data="listYear"
                    v-model="dataSearch.firstYear"
                  />
                </div>
              </div>
              <div class="search_daywrap">
                <span class="tag">{{
                  t("05.lookupEvaluationPlan.search.year")
                }}</span>
                <div class="wd_150">
                  <SelectBoxBase
                    :id="'term'"
                    :name="'term'"
                    :data="listTerm"
                    v-model="dataSearch.termEdu"
                  />
                </div>
              </div>
              <div class="search_daywrap">
                <span class="tag">{{
                  t("05.lookupEvaluationPlan.search.semester")
                }}</span>
                <div class="wd_150">
                  <SelectBoxBase
                    :id="'yearEdu'"
                    :name="'yearEdu'"
                    :data="listEduYear"
                    v-model="dataSearch.yearEdu"
                  />
                </div>
              </div>
              <div class="search_daywrap">
                <span class="tag">{{
                  t("05.lookupEvaluationPlan.search.subjectName")
                }}</span>
                <div class="wd_150">
                  <InputBase v-model="dataSearch.sbjtNm" />
                </div>
              </div>
              <div class="search_daywrap">
                <span class="tag">{{
                  t("05.lookupEvaluationPlan.search.lecturer")
                }}</span>
                <div class="wd_150">
                  <InputBase v-model="dataSearch.lectChar" />
                </div>
              </div>

              <div class="search_daywrap">
                <span class="tag">{{
                  t("05.lookupEvaluationPlan.search.creationStatus")
                }}</span>
                <div class="wd_150">
                  <SelectBoxBase
                    :id="'sts'"
                    :name="'sts'"
                    :data="listSts"
                    v-model="dataSearch.stsReg"
                  />
                </div>
              </div>

              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="search()"
              >
                {{ t("common.title.search") }}
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

        <div class="mt_8">
          <GridComponentV2
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="grid"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
  START_YEAR,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import ActiveStatusGridComponent from "@/components/common/grid/ActiveStatusGridComponent.vue";
import { useI18n } from "vue-i18n";
import { lookupEvaluationPlanStore } from "@/stores/lookupEvaluationPlan";
import type { LookupEvaluationPlanSearch } from "@/stores/lookupEvaluationPlan/lookupEvaluationPlan.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";

const store = commonStore();
const storeLEP = lookupEvaluationPlanStore();
const { t } = useI18n();

const dataSearch = reactive<LookupEvaluationPlanSearch>({
  firstYear: "",
  yearEdu: "",
  termEdu: "",
  sbjtNm: "",
  lectChar: "",
  stsReg: "",
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const rowData = ref([]);
const listEduYear = ref([{ cdId: "", cdNm: t("common.all") }]);
const listTerm = ref([{ cdId: "", cdNm: t("common.all") }]);
const listYear = ref([{ cdId: "", cdNm: t("common.all") }]);
const listSts = ref([{ cdId: "", cdNm: t("common.all") }]);
const columnDefs = ref([
  {
    headerName: t("05.lookupEvaluationPlan.gird.header1"),
    field: "firstYear",
    cellStyle: { textAlign: "center" },
    flex: 1,
  },
  {
    headerName: t("05.lookupEvaluationPlan.gird.header2"),
    field: "termEdu",
    cellStyle: { textAlign: "center" },
    flex: 1,
  },
  {
    headerName: t("05.lookupEvaluationPlan.gird.header3"),
    field: "deptNm",
    cellStyle: { textAlign: "center" },
    flex: 2,
  },
  {
    headerName: t("05.lookupEvaluationPlan.gird.header4"),
    field: "sustDivNm",
    cellStyle: { textAlign: "center" },
    flex: 1,
  },
  {
    headerName: t("05.lookupEvaluationPlan.gird.header5"),
    field: "sbjtNm",
    flex: 2,
    cellRenderer: LinkGridComponent,
    cellRendererParams: {
      onCustomEvent: handleCustomClick,
    },
    cellStyle: {
      color: "#2704FF",
      display: "flex",
      alignItems: "center",
    },
  },
  {
    headerName: t("05.lookupEvaluationPlan.gird.header6"),
    field: "sbjtCd",
    cellStyle: { textAlign: "center" },
    flex: 1,
  },
  {
    headerName: t("05.lookupEvaluationPlan.gird.header7"),
    field: "year",
    cellStyle: { textAlign: "center" },
    flex: 1,
  },
  {
    headerName: t("05.lookupEvaluationPlan.gird.header8"),
    field: "divNm",
    cellStyle: { textAlign: "center" },
    flex: 0.8,
  },
  {
    headerName: t("05.lookupEvaluationPlan.gird.header9"),
    field: "lectChar",
    cellStyle: { textAlign: "center" },
    flex: 1.5,
  },
  {
    headerName: t("05.lookupEvaluationPlan.gird.header10"),
    field: "currDivNm",
    cellStyle: { textAlign: "center" },
    flex: 1,
  },
  {
    headerName: t("05.lookupEvaluationPlan.gird.header11"),
    field: "stsReg",
    cellRenderer: ActiveStatusGridComponent,
    cellRendererParams: {
      activeValue: "작성완료",
    },
    cellStyle: { textAlign: "center" },
    flex: 1,
  },
]);
const totalRows = ref(0);
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);

const fnPagination = (pageNumber: any, pagesSize: any) => {
  getDataAll();
};

onBeforeMount(async () => {
  let currentYear = new Date().getFullYear();
  for (let year = parseInt(START_YEAR); year <= currentYear + 1; year++) {
    listYear.value.push({
      cdId: year.toString(),
      cdNm: year.toString(),
    });
  }
  getListCodeMng({
    upCdIdList: ["1010", "1020", "1088"],
  }).then((res) => {
    if (res.status == SUCCSESS_STATUS) {
      res.data.data.forEach((item) => {
        if (item.upCdId == "1010") {
          listTerm.value.push(item);
        }

        if (item.upCdId == "1020") {
          listEduYear.value.push(item);
        }

        if (item.upCdId == "1088") {
          listSts.value.push(item);
        }
      });
    }
  });
});
const getDataAll = async () => {
  store.setLoading(true);
  //Call data
  await storeLEP.fetchList(dataSearch);
  if (storeLEP.status && storeLEP.status == SUCCSESS_STATUS) {
    rowData.value = storeLEP.list.content;
    totalRows.value = storeLEP.list.totalElements;
  }
  store.setLoading(false);
};

function search() {
  dataSearch.page = 1;
  getDataAll();
}

function reset() {
  dataSearch.firstYear = "";
  dataSearch.yearEdu = "";
  dataSearch.termEdu = "";
  dataSearch.sbjtNm = "";
  dataSearch.lectChar = "";
  dataSearch.stsReg = "";
}

function handleCustomClick() {
  console.log("handleCustomClick");
}
</script>

<style scoped>
.search_toggle.sm > .right {
  row-gap: 8px;
}
</style>
