<template>
  <div class="content_wrap dashboard">
    <div class="grid_content">
      <div class="page_toparea">
        <h2 class="page_title">{{ t('05.lookupEvaluationPlan.pageTitle') }}</h2>
      </div>

      <div class="box dp_block">
        <div class="box_section">
          <div class="search_toggle sm">
            <div class="left"></div>
            <div class="right">
              <div class="search_daywrap">
                <span class="tag">{{ t('05.lookupEvaluationPlan.search.initiationYear') }}</span>
                <div class="wd_150">
                  <SelectBoxBase/>
                </div>
              </div>
              <div class="search_daywrap">
                <span class="tag">{{ t('05.lookupEvaluationPlan.search.year') }}</span>
                <div class="wd_150">
                  <SelectBoxBase/>
                </div>
              </div>
              <div class="search_daywrap">
                <span class="tag">{{ t('05.lookupEvaluationPlan.search.semester') }}</span>
                <div class="wd_150">
                  <SelectBoxBase/>
                </div>
              </div>

              <div class="search_daywrap">
                <span class="tag">{{ t('05.lookupEvaluationPlan.search.subjectName') }}</span>
                <div class="wd_150">
                  <InputBase v-model="dataSearch.sbjtNm"/>
                </div>
              </div>
              <div class="search_daywrap">
                <span class="tag">{{ t('05.lookupEvaluationPlan.search.lecturer') }}</span>
                <div class="wd_150">
                  <InputBase v-model="dataSearch.lectChar"/>
                </div>
              </div>

              <div class="search_daywrap">
                <span class="tag">{{ t('05.lookupEvaluationPlan.search.creationStatus') }}</span>
                <div class="wd_150">
                  <SelectBoxBase/>
                </div>
              </div>

              <button type="button" class="btn_round btn_lg btn_primary mg_l10">{{ t('common.reset') }}</button>
              <button type="button" class="btn_round btn_lg btn_gray mg_l5">{{ t('common.title.search') }}</button>
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
import {reactive, ref} from "vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import InputBase from "@/components/common/input/InputBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import {commonStore} from "@/stores/common";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import ActiveStatusGridComponent from "@/components/common/grid/ActiveStatusGridComponent.vue";
import {useI18n} from "vue-i18n";
import {lookupEvaluationPlanStore} from "@/stores/lookupEvaluationPlan";
import type {LookupEvaluationPlanSearch} from "@/stores/lookupEvaluationPlan/lookupEvaluationPlan.type";

const store = commonStore()
const storeLEP = lookupEvaluationPlanStore()
const {t} = useI18n()

const dataSearch = reactive<LookupEvaluationPlanSearch>({
  firstYear: "",
  yearEdu: "",
  termEdu: "",
  sbjtNm: "",
  lectChar: "",
  stsReg: "",
  page: 1,
  size: PAGINATION_PAGE_SIZE,
  sort: ""
})

const rowData = ref([
  {
    sbjtNm: '교과목명',
    stsReg: "미작성"
  },
  {
    sbjtNm: '교과목명',
    stsReg: "작성중"
  },
  {
    sbjtNm: '교과목명',
    stsReg: "작성완료"
  }
])
const columnDefs = ref([
  {
    headerName: t('05.lookupEvaluationPlan.gird.header1'),
    field: "firstYear",
  },
  {
    headerName: t('05.lookupEvaluationPlan.gird.header2'),
    field: "termEdu",
  },
  {
    headerName: t('05.lookupEvaluationPlan.gird.header3'),
    field: "deptNm",
  },
  {
    headerName: t('05.lookupEvaluationPlan.gird.header4'),
    field: "sustDivNm",
  },
  {
    headerName: t('05.lookupEvaluationPlan.gird.header5'),
    field: "sbjtNm",
    cellRenderer: LinkGridComponent,
    cellRendererParams: {
      onCustomEvent: handleCustomClick,
    },
    cellStyle: {
      color: "#2704FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: t('05.lookupEvaluationPlan.gird.header6'),
    field: "sbjtCd",
  },
  {
    headerName: t('05.lookupEvaluationPlan.gird.header7'),
    field: "year",
  },
  {
    headerName: t('05.lookupEvaluationPlan.gird.header8'),
    field: "divNm",
  },
  {
    headerName: t('05.lookupEvaluationPlan.gird.header9'),
    field: "lectChar",
  },
  {
    headerName: t('05.lookupEvaluationPlan.gird.header10'),
    field: "currDivNm",
  },
  {
    headerName: t('05.lookupEvaluationPlan.gird.header11'),
    field: "stsReg",
    cellRenderer: ActiveStatusGridComponent,
    cellRendererParams: {
      activeValue: "작성완료"
    },
  },
])
const totalRows = ref(0)
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);

const fnPagination = (pageNumber: any, pagesSize: any) => {
  getDataAll();
}

const getDataAll = async () => {
  store.setLoading(true);
  //Call data
  await storeLEP.fetchList(dataSearch)
  store.setLoading(false);
}

function handleCustomClick() {
  console.log('handleCustomClick')
}
</script>

<style scoped>
.search_toggle.sm > .right {
  row-gap: 8px;
}
</style>