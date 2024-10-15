<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="''"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("capacityDeMng.portfolio.titleSearch.university") }}</p>
                <SelectBoxBase
                  v-model="searchModel.majorNm"
                  :data="listMajor"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("capacityDeMng.portfolio.titleSearch.department") }}</p>
                <SelectBoxBase
                  v-model="searchModel.deptNm"
                  :data="listDepartment"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("capacityDeMng.portfolio.titleSearch.eduYear") }}</p>
                <SelectBoxBase
                  v-model="searchModel.gradeNm"
                  :data="listGrade"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("capacityDeMng.portfolio.titleSearch.stdId") }}</p>
                <InputBase :id="'stdId'" v-model="searchModel.stdId" />
              </li>
              <li>
                <p>{{ t("capacityDeMng.portfolio.titleSearch.stdName") }}</p>
                <InputBase :id="'stdName'" v-model="searchModel.userNm" />
              </li>
              <li>
                <p>
                  {{ t("capacityDeMng.portfolio.titleSearch.studyStatus") }}
                </p>
                <SelectBoxBase
                  v-model="searchModel.entrDivNm"
                  :data="listStatus"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("capacityDeMng.portfolio.titleSearch.professor") }}</p>
                <InputBase :id="'stdName'" v-model="searchModel.guideProfNm" />
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                type="button"
                class="button btn_xl btn_blue btn_responsive"
                @click="searchClick()"
              >
                {{ t("capacityDeMng.track.button.search") }}
              </button>
              <button
                type="button"
                class="button btn_xl btn_lightgray btn_responsive"
                @click="reset()"
              >
                {{ t("capacityDeMng.track.button.refresh") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section" v-if="showData">
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
        <p class="box_title_sm center" v-if="!showData">
          {{ t("capacityDeMng.portfolio.meesageNotice") }}
        </p>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { defineComponent, ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import InputBase from "@/components/common/input/InputBase.vue";
import type {
  SearchPortModel,
  PortfolioModel,
} from "@/stores/capacityDeMng/portfolio/portfolio.type";
import {
  UP_CD_ID_GRADE_LEVEL,
  UP_CD_ID_COURSE_STATUS,
  DIV_CD_DEPT_MAJOR,
  DIV_CD_DEPT_DEPART,
} from "@/constants/common.const";
import { getListPort } from "@/stores/capacityDeMng/portfolio/portfolio.service";
import type {
  CodeMngResModel,
  CodeMngModel,
} from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "../../../stores/common/codeMng/codeMng.service";
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
      pageTitle: this.t("capacityDeMng.portfolio.breadcrumb.pageTitle"),
      rowData: [] as Array<PortfolioModel>,
      rowselected: [],
      searchModel: {
        deptNm: "",
        gradeNm: "",
        majorNm: "",
        entrDivNm: "",
        guideProfNm: "",
        stdId: "",
        userNm: "",
      } as SearchPortModel,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listCode: {
        upCdIdList: [],
      } as CodeMngResModel,
      listUnivercity: [] as Array<CodeMngModel>,
      listStatus: [] as Array<CodeMngModel>,
      listData: [],
      key: 1,
      totalRows: 0,
      columnDefs: ref([
        {
          headerName: this.t("capacityDeMng.portfolio.table.university"),
          field: "majorNm",
          cellStyle: {
            textAlign: "center",
          },
          flex: 1,
        },
        {
          headerName: this.t("capacityDeMng.portfolio.table.department"),
          field: "deptNm",
          cellStyle: {
            textAlign: "center",
          },
          flex: 1,
        },
        {
          headerName: this.t("capacityDeMng.portfolio.table.eduYear"),
          field: "gradeNm",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.6,
        },
        {
          headerName: this.t("capacityDeMng.portfolio.table.stdId"),
          field: "stdId",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.7,
        },
        {
          headerName: this.t("capacityDeMng.portfolio.table.stdName"),
          field: "userNm",
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleDetailClick,
          },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 1,
        },
        {
          headerName: this.t("capacityDeMng.portfolio.table.studyStatus"),
          field: "entrDivNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("capacityDeMng.portfolio.table.professor"),
          field: "guideProfNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("capacityDeMng.portfolio.table.credit"),
          field: "credit",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.7,
        },
        {
          headerName: this.t("capacityDeMng.portfolio.table.mediumScore"),
          field: "prevTermAvgScore",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.7,
        },
      ]),
      listSelectBox: [],
      listDepartment: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "dept",
        },
      ],
      listGrade: [],
      listMajor: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "major",
        },
      ],
      showData: false,
      baseUrl: "http://ys-curr-client.winwintek.net/portfolio/"
    };
  },
  beforeMount() {
    this.getCode();
    this.getListUniversity();
  },
  watch: {
    "searchModel.majorNm"(newValue, oldValue) {
      if (newValue) {
        this.searchModel.deptNm = "";
        this.getListDepartment();
      } else {
        this.searchModel.deptNm = "";
        this.listDepartment = [
          {
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "dept",
          },
        ];
      }
    },
  },
  methods: {
    searchClick() {
      this.searchModel.page = 1;
      this.key++;
      this.showData = true;
    },
    search() {
      this.store.setLoading(true);
      getListPort(this.searchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    handleDetailClick(data: any) {
      const url = `${this.baseUrl}${data.stdId}`;
      window.open(url, '_blank');
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.search();
    },
    reset() {
      this.searchModel.majorNm = "";
      this.searchModel.deptNm = "";
      this.searchModel.gradeNm = "";
      this.searchModel.stdId = "";
      this.searchModel.userNm = "";
      this.searchModel.entrDivNm = "";
      this.searchModel.guideProfNm = "";
    },
    getCode() {
      this.store.setLoading(true);
      this.listCode.upCdIdList.push(
        UP_CD_ID_GRADE_LEVEL,
        UP_CD_ID_COURSE_STATUS
      );
      getListCodeMng(this.listCode)
        .then((res) => {
          if (Array.isArray(res.data.data)) {
            this.listGrade = res.data.data.filter(
              (item) => item.upCdId === UP_CD_ID_GRADE_LEVEL
            );
            this.listStatus = res.data.data.filter(
              (item) => item.upCdId === UP_CD_ID_COURSE_STATUS
            );
            this.listGrade.unshift({
              cdId: "",
              cdNm: this.t(
                "capacityDeMng.track.titleSearch.dataStatus.dataStatus"
              ),
            });
            this.listStatus.unshift({
              cdId: "",
              cdNm: this.t(
                "capacityDeMng.track.titleSearch.dataStatus.dataStatus"
              ),
            });
          }
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    getListUniversity() {
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_MAJOR],
        upDeptCd: [],
        useYn: "",
      }).then((res) => {
        res.data.data.forEach((item: any) => {
          if (item.deptDivCd === DIV_CD_DEPT_MAJOR) {
            this.listMajor.push({
              cdId: item.deptCd,
              cdNm: item.deptNm,
              upCdId: "major",
            });
          }
        });
      });
    },
    getListDepartment() {
      this.store.setLoading(true);
      getDepartmentList({
        deptCd: [],
        deptDivCd: [],
        upDeptCd: [this.searchModel.majorNm],
        useYn: "",
      }).then((res) => {
        res.data.data.forEach((item: any) => {
          if (item.deptDivCd === DIV_CD_DEPT_DEPART) {
            this.listDepartment.push({
              cdId: item.deptCd,
              cdNm: item.deptNm,
              upCdId: "dept",
            });
          }
        });
        this.store.setLoading(false);
      });
    },
  },
});
</script>
<style scoped>
.center {
  text-align: center;
}
</style>
