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
              <p class="">{{ t("schoolStaff.cqi.index.openYear") }}</p>
              <SelectBoxBase
                :id="'selectYearStart'"
                :name="'selectYearStart'"
                v-model="searchDto.yearTerm"
                :data="listSelectYearStart"
              />
            </li>
            <li>
              <p class="">{{ t("schoolStaff.cqi.index.subjectName") }}</p>
              <InputBase v-model="searchDto.sbjtNm" />
            </li>
            <li>
              <p class="">{{ t("schoolStaff.cqi.index.trainingYear") }}</p>
              <SelectBoxBase
                :id="'selectYearTrain'"
                :name="'selectYearTrain'"
                v-model="searchDto.year"
                :data="listSelectYearTrain"
              />
            </li>
            <li>
              <p class="">{{ t("schoolStaff.cqi.index.writingStatus") }}</p>
              <SelectBoxBase
                :id="'selectStatus'"
                :name="'selectStatus'"
                v-model="searchDto.status"
                :data="listSelectStatus"
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
            class="button btn_xl btn_gray btn_responsive btn_icon"
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
import { CqiSearch } from "@/stores/cqi/cqi.type";
import { commonStore } from "@/stores/common";
import { cqiStore } from "@/stores/cqi";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { START_YEAR } from "@/constants/screen.const";
import { PAGE_IN_GROUP } from "@/constants/screen.const";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { STATUS_ALL } from "@/constants/common.const";

const router = useRouter();
const { t } = useI18n();
const storeCommon = commonStore();
const cqiStr = cqiStore();

const pageTitle = ref(t("schoolStaff.cqi.index.pageTitle"));
const breadcrumbItems = ref([
  { label: t("common.home"), link: "/" },
  { label: t("schoolStaff.cqi.index.dept2"), link: SCREEN.cqi.path },
]);

const listSelectStatus = ref([
  { cdId: STATUS_ALL, cdNm: t("common.all"), upCdId: "status" },
  { cdId: "미작성", cdNm: "미작성", upCdId: "status" },
  { cdId: "작성중", cdNm: "작성중", upCdId: "status" },
]);
const listSelectYearStart = ref([] as CodeMngModel[]);
const listSelectYearTrain = ref([] as CodeMngModel[]);

const currentYear = ref(0);

onBeforeMount(async () => {
  await getMaxYear();
});
onMounted(async () => {});

const getMaxYear = async () => {
  storeCommon.setLoading(true);

  await cqiStr.fetchYear();
  if (cqiStr.status == SUCCSESS_STATUS) {
    currentYear.value = cqiStr.maxYear.data;

    for (let i = parseInt(START_YEAR); i <= currentYear.value; i++) {
      listSelectYearStart.value.push({ cdId: i, cdNm: i, upCdId: "yearTerm" });
      listSelectYearTrain.value.push({
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
    name: SCREEN.detailCqi.name,
    params: {
      // type: item.type,
      // TODO
      type: "major",
    },
    state: {
      lectCd: item.lectCd,
      lectPlanDocSeq: item.lectPlanDocSeq,
      cqiSeq: item.cqiSeq,
    },
  });
};

//grid
const totalRecord = ref(0);
const rowData = ref([
  {
    rowNum: 1,
    test: "major",
    type: "major",
  },
  {
    rowNum: 2,
    test: "general",
    type: "general",
  },
]);
const columnDefs = ref([
  { headerName: t("schoolStaff.cqi.index.grid.header1"), field: "yearTerm" },
  { headerName: t("schoolStaff.cqi.index.grid.header2"), field: "uniDeptNm" },
  { headerName: t("schoolStaff.cqi.index.grid.header3"), field: "deptNm" },
  {
    headerName: t("schoolStaff.cqi.index.grid.header4"),
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
  { headerName: t("schoolStaff.cqi.index.grid.header5"), field: "sustDivNm" },
  { headerName: t("schoolStaff.cqi.index.grid.header6"), field: "gradeNm" },
  { headerName: t("schoolStaff.cqi.index.grid.header7"), field: "divNm" },
  { headerName: t("schoolStaff.cqi.index.grid.header8"), field: "staffNm" },
  { headerName: t("schoolStaff.cqi.index.grid.header9"), field: "year" },
  { headerName: t("schoolStaff.cqi.index.grid.header10"), field: "status" },
]);

const fnPagination = async (pageNumber: number, pagesSize: number) => {
  storeCommon.setLoading(true);

  searchDto.value.page = pageNumber;
  searchDto.value.size = pagesSize;
  await cqiStr.fetchList(searchDto.value);

  if (cqiStr.status == SUCCSESS_STATUS) {
    rowData.value = cqiStr.cqiList.data.content;
    totalRecord.value = cqiStr.cqiList.data.totalElements;

    storeCommon.setLoading(false);
  }
};

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

const searchDto = ref({
  page: 1,
  size: PAGE_IN_GROUP,
  sort: "",
  yearTerm: "",
  sbjtNm: "",
  profNm: "",
  year: "",
  status: "",
}) as CqiSearch;
</script>

<style scoped lang="scss">
.search_box.col_2 > ul > li > p:first-child {
  width: 120px;
}
</style>
