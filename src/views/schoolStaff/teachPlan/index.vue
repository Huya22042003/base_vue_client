<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_2">
          <ul>
            <li>
              <p class="">{{ t("schoolStaff.teachPlan.index.year") }}</p>
              <SelectBoxBase
                :id="'selectYear'"
                :name="'selectYear'"
                v-model="searchDto.yearTerm"
                :data="listSelectYearStart"
              />
            </li>
            <li>
              <p class="">{{ t("schoolStaff.teachPlan.index.subject") }}</p>
              <InputBase :id="'sbjtNm'" v-model="searchDto.sbjtNm" />
            </li>
            <li>
              <p class="">
                {{ t("schoolStaff.teachPlan.index.trainingProcessYear") }}
              </p>
              <SelectBoxBase
                :id="'selectTraniningProcess'"
                :name="'selectTraniningProcess'"
                v-model="searchDto.year"
                :data="listSelectTraniningProcess"
              />
            </li>
            <li>
              <p class="">
                {{ t("schoolStaff.teachPlan.index.creationStatus") }}
              </p>
              <SelectBoxBase
                :id="'selectCreationStatus'"
                :name="'selectCreationStatus'"
                v-model="searchDto.status"
                :data="selectListCreationStatus"
              />
            </li>
          </ul>
        </div>
      </div>

      <div class="box_section">
        <div class="btn_group btn_end">
          <button
            type="button"
            class="button btn_xl btn_blue btn_responsive"
            @click="search"
          >
            {{ t("common.search") }}
          </button>
          <button
            type="button"
            class="button btn_xl btn_gray btn_responsive"
            @click="reset"
          >
            {{ t("common.reset") }}
          </button>
        </div>
      </div>
    </div>
    <div class="box dp_block">
      <div class="box_section">
        <GridComponentV2
          :rowData="rowData"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :totalRecord="totalRecord"
          @customPagination="fnPagination"
          ref="gridKey"
          :key="key"
        >
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { ref } from "vue";
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "@/router/screen";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import ActiveStatusGridComponent from "@/components/common/grid/ActiveStatusGridComponent.vue";
import { teachPlan } from "@/stores/planDoc";
import { commonStore } from "@/stores/common";
import { SubjectPlanSearch } from "@/stores/planDoc/planDoc.type";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { START_YEAR } from "@/constants/screen.const";
import { PAGE_IN_GROUP } from "@/constants/screen.const";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { STATUS_ALL } from "@/constants/common.const";

const router = useRouter();
const { t } = useI18n();
const planStore = teachPlan();
const storeCommon = commonStore();

const pageTitle = ref(t("schoolStaff.teachPlan.pageTitle"));
const breadcrumbItems = ref([
  { label: t("common.home"), link: "/" },
  { label: t("schoolStaff.teachPlan.dept2"), link: SCREEN.teachPlan.path },
]);

//select box
const listSelectTraniningProcess = ref([] as CodeMngModel[]);
const listSelectYearStart = ref([] as CodeMngModel[]);
const selectListCreationStatus = ref([
  { cdId: STATUS_ALL, cdNm: t("common.all"), upCdId: "status" },
  {
    cdId: t("schoolStaff.teachPlan.stsDone"),
    cdNm: t("schoolStaff.teachPlan.stsDone"),
    upCdId: "status",
  },
  {
    cdId: t("schoolStaff.teachPlan.stsNotDone"),
    cdNm: t("schoolStaff.teachPlan.stsNotDone"),
    upCdId: "status",
  },
  {
    cdId: t("schoolStaff.teachPlan.stsDoing"),
    cdNm: t("schoolStaff.teachPlan.stsDoing"),
    upCdId: "status",
  },
]);
const currentYear = ref(0);

const searchDto = ref({
  page: 1,
  size: PAGE_IN_GROUP,
  sort: "",
  yearTerm: "",
  sbjtNm: "",
  profNm: "",
  year: "",
  status: "",
}) as SubjectPlanSearch;

onBeforeMount(async () => {
  await getMaxYear();
});
onMounted(async () => {});

const getMaxYear = async () => {
  storeCommon.setLoading(true);

  await planStore.fetchYear();
  if (planStore.status == SUCCSESS_STATUS) {
    currentYear.value = planStore.maxYear.data;

    for (let i = parseInt(START_YEAR); i <= currentYear.value; i++) {
      listSelectYearStart.value.push({ cdId: i, cdNm: i, upCdId: "yearTerm" });
      listSelectTraniningProcess.value.push({
        cdId: i,
        cdNm: i,
        upCdId: "year",
      });
    }

    searchDto.value.yearTerm = currentYear.value;
    searchDto.value.year = currentYear.value;
    searchDto.value.status = STATUS_ALL;

    storeCommon.setLoading(false);
  }
};

const handleCustomClick = (item) => {
  router.push({
    name: SCREEN.detailSubject.name,
    state: {
      lectPlanDocSeq: item.lectPlanDocSeq,
      lectCd: item.lectCd,
    },
    params: {
      type: item.type,
    },
  });
};

//grid
const paginationPageSize = ref(PAGINATION_PAGE_SIZE);
const paginationPageSizeSelector = ref(PAGINATION_PAGE_SIZE_SELECTOR);
const rowData = ref([]);
const totalRecord = ref();
const columnDefs = ref([
  {
    headerName: t("schoolStaff.teachPlan.index.grid.header1"),
    field: "yearTerm",
  },
  {
    headerName: t("schoolStaff.teachPlan.index.grid.header2"),
    field: "uniDeptNm",
  },
  {
    headerName: t("schoolStaff.teachPlan.index.grid.header3"),
    field: "deptNm",
  },
  {
    headerName: t("schoolStaff.teachPlan.index.grid.header4"),
    field: "sbjtNm",
    cellRenderer: LinkGridComponent,
    cellRendererParams: { onCustomEvent: handleCustomClick },
    cellStyle: {
      color: "#2704FF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  },
  {
    headerName: t("schoolStaff.teachPlan.index.grid.header5"),
    field: "sustDivNm",
  },
  {
    headerName: t("schoolStaff.teachPlan.index.grid.header6"),
    field: "gradeNm",
  },
  { headerName: t("schoolStaff.teachPlan.index.grid.header7"), field: "divNm" },
  {
    headerName: t("schoolStaff.teachPlan.index.grid.header8"),
    field: "staffNm",
  },
  {
    headerName: t("schoolStaff.teachPlan.index.grid.header9"),
    field: "year",
  },
  {
    headerName: t("schoolStaff.teachPlan.index.grid.header10"),
    field: "status",
    cellRenderer: ActiveStatusGridComponent,
    cellRendererParams: {
      activeValue: t("schoolStaff.teachPlan.stsDone"),
    },
  },
]);
const key = ref(1);
const search = () => {
  searchDto.value.page = 1;
  key.value++;
};

const reset = () => {
  searchDto.value.sbjtNm = "";
  searchDto.value.yearTerm = currentYear.value;
  searchDto.value.profNm = "";
  searchDto.value.year = currentYear.value;
  searchDto.value.status = STATUS_ALL;
};

const fnPagination = async (pageNumber: any, pagesSize: any) => {
  storeCommon.setLoading(true);

  searchDto.value.page = pageNumber;
  searchDto.value.size = pagesSize;
  await planStore.fetchList(searchDto.value);

  if (planStore.status == SUCCSESS_STATUS) {
    rowData.value = planStore.profSubjectList.data.content;
    totalRecord.value = planStore.profSubjectList.data.totalElements;

    storeCommon.setLoading(false);
  }
};
</script>

<style scoped lang="scss">
.search_box.col_2 > ul > li > p:first-child {
  width: 120px;
}
</style>
