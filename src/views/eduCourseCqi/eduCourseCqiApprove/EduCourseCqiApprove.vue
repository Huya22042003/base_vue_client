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
              <p class="ta_c">학년도</p>
              <SelectBoxBase
                :data="listYear"
                v-model="searhParms.year"
                id="year"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p class="ta_c">학과</p>
              <InputBase v-model="searhParms.deptNm" />
            </li>
          </ul>
          <div class="search_btnarea">
            <button
              type="button"
              class="btn_round btn_lg btn_primary mg_l10"
              @click="search"
            >
              {{ t("common.search") }}
            </button>
            <button
              type="button"
              class="btn_round btn_lg btn_gray mg_l5"
              @click="onReset"
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
          :rowData="data"
          :columnDefs="columnDefs"
          ref="grid"
          :paginationClientFlag="false"
          @customPagination="fnPagination"
          :totalRecord="totalElements"
        >
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { START_YEAR_NUMBER } from "@/constants/screen.const";
import InputBase from "@/components/common/input/InputBase.vue";
import {
  PAGINATION_PAGE_1,
  PAGINATION_PAGE_SIZE,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";

export default {
  components: {
    ButtonGridComponent,
    LinkGridComponent,
  },
  setup() {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = ref<string>();

    return {
      router,
      storeCommon,
      t,
      selectAll: ref(false),
      id,
    };
  },
  data() {
    return {
      pageTitle: this.t("eduProcessCreation.title"),
      breadcrumbItems: [],
      listYear: [] as any,
      searhParms: {
        page: PAGINATION_PAGE_1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
        year: new Date().getFullYear() + 1 + "",
        deptNm: "",
      },
      data: [{}],
      totalElements: 0,
      columnDefs: ref([
        {
          headerName: "번호",
          field: "year",
          flex: 1.8,
          cellStyle: {
            display: "flex",
            justifyContent: "left",
            alignItems: "start",
          },
        },
        {
          headerName: "학년도",
          field: "gradeNm",
          flex: 1.8,
          cellStyle: {
            display: "flex",
            justifyContent: "left",
            alignItems: "start",
          },
        },
        {
          headerName: "학과",
          field: "deptNm",
          cellRenderer: LinkGridComponent,
          cellRendererParams: (data: any) => {
            return {
              onCustomEvent: this.openContinueAlert,
            };
          },
          flex: 1.8,
          cellStyle: (data: any) => {
            const code = data.data.stsCd;
            return {
              color: code != "" && code != "" ? "#2704FF" : "#000000",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            };
          },
        },
        {
          headerName: "교육과정 유형",
          field: "eduCourseTypeNm",
          flex: 1.2,
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: "상태",
          field: "progStepNm",
          flex: 2,
        },
        {
          headerName: "작성자",
          field: "stsNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: "작성일",
          field: "stsCd",
          cellStyle: {
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          },
        },
        {
          headerName: "인쇄",
          field: "version",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          cellRenderer: ButtonGridComponent,
          flex: 0.8,
          cellRendererParams: (data: any) => {
            return {
              onCustomEvent: this.openApproveAlert,
              value: this.t("common.print"),
              className: "btn_round btn_sm btn_white",
            };
          },
        },
      ]),
    };
  },
  beforeMount() {
    const currentYear = new Date().getFullYear();
    for (let index = START_YEAR_NUMBER; index <= currentYear + 1; index++) {
      this.listYear.push({ id: index, cdId: index, cdNm: index });
    }
  },
  methods: {
    search() {},
    onReset() {
      this.searhParms = {
        page: PAGINATION_PAGE_1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
        year: new Date().getFullYear() + 1 + "",
        deptNm: "",
      };
    },
    async fnPagination(pageNumber: any, pagesSize: any) {
      this.searhParms.size = pagesSize;
      this.searhParms.page = pageNumber;

      //   this.getAllData();
    },
  },
};
</script>

<style lang="css" scoped></style>
