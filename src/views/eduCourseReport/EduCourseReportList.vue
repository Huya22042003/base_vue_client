<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="''"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("eduCourseRp.year") }}</p>
                <SelectBoxBase
                  :id="'selectboxShow'"
                  :name="'selectboxShow'"
                  :data="listData"
                  v-model="searchModel.eduYear"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("eduCourseRp.deptNm") }}
                </p>
                <SelectBoxBaseSearch
                  :id="'selectbox'"
                  :name="'selectbox'"
                  v-model="searchModel.deptNm"
                  :data="listSelectBoxDept"
                >
                </SelectBoxBaseSearch>
              </li>
              <li>
                <p>
                  {{ t("eduCourseRp.regNm") }}
                </p>
                <InputBase
                  v-model="searchModel.regNm"
                  :id="'regNm'"
                  :name="'regNm'"
                  placeholder=""
                >
                </InputBase>
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="searchClick"
              >
                {{ t("common.search") }}
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
      </div>
      <div class="box_section">
        <GridComponentV2
          :rowData="rowData"
          :columnDefs="columnDefs"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
          ref="gridKey"
          :paginationClientFlag="false"
          @customPagination="fnPagination"
          :totalRecord="totalRows"
          :key="key"
        >
        </GridComponentV2>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  START_YEAR,
} from "@/constants/screen.const";
import { defineComponent, ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import InputBase from "@/components/common/input/InputBase.vue";

import type { CodeMngResModel } from "@/stores/common/codeMng/codeMng.type";
import type { EduCourseRpSearch } from "../../stores/eduCourseRp/eduCourseRp.type";
import { fetchData } from "@/stores/eduCourseRp/eduCourseRp.service";
import {
  DIV_CD_DEPT_DEPART,
  MESSAGE_ERROR_API,
} from "@/constants/common.const";
import { getDepartmentList } from "@/stores/common/department/department.service";

export default defineComponent({
  components: {
    LinkGridComponent,
  },
  setup: () => {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  data() {
    return {
      pageTitle: this.t("eduCourseRp.pageTitle"),
      listSelectBoxDept: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "dept",
        },
      ] as Array<any>,
      rowData: [{}],
      rowDataExcel: [{}],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listCode: {
        upCdIdList: [],
      } as CodeMngResModel,
      key: 1,
      totalRows: 0,
      searchModel: {
        eduYear: "",
        deptNm: "",
        regNm: "",
        page: 1,
        size: 10,
        sort: "",
      } as EduCourseRpSearch,
      columnDefs: ref([
        {
          headerName: this.t("eduCourseRp.year"),
          field: "eduYear",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("eduCourseRp.deptNm"),
          field: "deptNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("eduCourseRp.regNm"),
          field: "regNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("eduCourseRp.titleSearch"),
          valueGetter: () => this.t("eduCourseRp.strRp"),
          cellRenderer: "LinkGridComponent",
          cellRendererParams: { onCustomEvent: this.handleCustomClick },
          cellStyle: {
            color: "#2704FF",
            alignItems: "center",
            textAlign: "center",
          },
          flex: 1,
        },
      ]),
      listData: [{ cdId: "", cdNm: this.t("common.all") }],
      currentYear: new Date().getFullYear(),
    };
  },
  beforeMount() {
    this.getDeptByMajor();
    for (let year = parseInt(START_YEAR); year <= this.currentYear; year++) {
      this.listData.push({
        cdId: year,
        cdNm: year.toString(),
      });
    }
  },

  methods: {
    getDeptByMajor() {
      this.store.setLoading(true);
      let dataSearch = [] as any[];
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_DEPART],
        upDeptCd: dataSearch,
        useYn: "",
      })
        .then((res) => {
          this.listSelectBoxDept = res.data.data.map((el) => {
            return {
              cdId: el.deptCd,
              cdNm: el.deptNm,
              upCdId: "dept",
            };
          });
          this.listSelectBoxDept.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "dept",
          });
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    searchClick() {
      this.searchModel.page = 1;
      this.key++;
    },

    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getData();
    },
    reset() {
      this.searchModel.eduYear = "";
      this.searchModel.deptNm = "";
      this.searchModel.regNm = "";
    },
    async getData() {
      this.store.setLoading(true);
      await fetchData(this.searchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    handleCustomClick() {
      alert("reporting");
    },
  },
});
</script>
