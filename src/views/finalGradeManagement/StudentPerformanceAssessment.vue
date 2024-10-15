<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div class="search_box mg_b30">
        <div class="search_section">
          <div class="title">
            <strong>{{ t("finalGradeManagement.titleNoti") }}</strong>
          </div>
          <div class="search_toggle sm">
            <div class="right">
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("finalGradeManagement.list.year")
                }}</span>
                <SelectBoxBase
                  :id="'year'"
                  :name="'year'"
                  :data="listSelectBox"
                  v-model="searchModel.year"
                />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("finalGradeManagement.list.term")
                }}</span>
                <SelectBoxBase
                  :id="'deptSearch'"
                  :name="'deptSearch'"
                  :data="listTerm"
                  v-model="searchModel.term"
                />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("finalGradeManagement.list.subjectname")
                }}</span>
                <InputBase
                  :id="'deptSearch'"
                  :name="'deptSearch'"
                  v-model="searchModel.sbjtNm"
                />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("finalGradeManagement.list.status")
                }}</span>
                <SelectBoxBase
                  :id="'deptSearch'"
                  :name="'deptSearch'"
                  :data="listStatus"
                  v-model="searchModel.status"
                />
              </div>

              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="search"
              >
                {{ t("finalGradeManagement.list.search") }}
              </button>
              <button
                type="button"
                class="btn_round btn_lg btn_gray mg_l5"
                @click="reset"
              >
                {{ t("finalGradeManagement.list.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="mg_b15">
          <span class="note_cus">
            {{ t("finalGradeManagement.form.title") }}
          </span>
        </div>
        <div class="box_section">
          <GridComponentV2
            :key="key"
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="grid"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
          >
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { commonStore } from "@/stores/common";
import { useI18n } from "vue-i18n";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { SCREEN } from "@/router/screen";
import { AbilityWorkSearchDTO } from "@/stores/abilityWorkStudent/abilityWorkStudent.type";
import { abilityWorkStore } from "@/stores/abilityWorkStudent";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { SubjectInfoDTO } from "@/stores/abilityWorkStudent/abilityWorkStudent.type";
import { codeMngStore } from "@/stores/common/codeMng";
import { STATUS_ALL, UP_CD_ID_SEMESTER } from "@/constants/common.const";
export default {
  components: {
    Breadcrumb,
    GridComponentV2,
    LinkGridComponent,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const abilityWorkStr = abilityWorkStore();
    const codeMng = codeMngStore();
    return {
      t,
      cmn,
      abilityWorkStr,
      codeMng,
    };
  },
  data() {
    return {
      pageTitle: this.t("finalGradeManagement.title1"),
      breadcrumbItems: [],
      dataDetail: {},
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<SubjectInfoDTO>,
      searchModel: {
        page: 1,
        size: 10,
        sort: "",
      } as AbilityWorkSearchDTO,
      totalRows: 0,
      key: 1,
      isOpen: false,
      listCheckBox: [],
      columnDefs: ref([
        {
          headerName: this.t("finalGradeManagement.form.year"),
          field: "yearTerm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.department"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.major"),
          field: "deptNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.subjectName"),
          field: "sbjtNm",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            cursor: "pointer",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: { onCustomEvent: this.handleCustomClick },
          flex: 1.2,
        },
        {
          headerName: this.t("finalGradeManagement.form.distinctionDegrees"),
          field: "sustDivNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.grade"),
          field: "gradeNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.classDivision"),
          field: "divNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.curiAcademicYear"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.situation"),
          field: "status",
          flex: 1,
        },
      ]),
      listSelectBox: [
        { cdId: "", cdNm: this.t("common.all"), upCdId: "" },
      ] as Array<any>,
      listTerm: [
        { cdId: "", cdNm: this.t("common.all"), upCdId: "" },
      ] as Array<any>,
      listStatus: [
        { cdId: STATUS_ALL, cdNm: this.t("common.all"), upCdId: "status" },
        {
          cdId: this.t("schoolStaff.teachPlan.stsDone"),
          cdNm: this.t("schoolStaff.teachPlan.stsDone"),
          upCdId: "status",
        },
        {
          cdId: this.t("schoolStaff.teachPlan.stsNotDone"),
          cdNm: this.t("schoolStaff.teachPlan.stsNotDone"),
          upCdId: "status",
        },
        {
          cdId: this.t("schoolStaff.teachPlan.stsDoing"),
          cdNm: this.t("schoolStaff.teachPlan.stsDoing"),
          upCdId: "status",
        },
      ],
    };
  },
  beforeMount() {
    this.getListSelectEduYear();
    this.getTerm();
  },
  methods: {
    reset() {
      this.searchModel = {};
    },
    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    async getDataPage() {
      this.cmn.setLoading(true);
      await this.abilityWorkStr.fetchList(this.searchModel);

      if (
        this.abilityWorkStr.status &&
        this.abilityWorkStr.status == SUCCSESS_STATUS
      ) {
        this.rowData = this.abilityWorkStr.listAbilityWork.content;
        this.totalRows = this.abilityWorkStr.listAbilityWork.totalElements;
        this.cmn.setLoading(false);
      }
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.searchModel.size = pageSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getDataPage();
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.studentPerformanceAssessmentDetail.name,
        state: { lectCd: data.lectCd },
      });
    },
    getListSelectEduYear() {
      const currentYear = new Date().getFullYear();
      this.listSelectBox = [
        ...this.listSelectBox,
        { cdId: currentYear - 1, cdNm: currentYear - 1, upCdId: "1" },
        { cdId: currentYear, cdNm: currentYear, upCdId: "1" },
        { cdId: currentYear + 1, cdNm: currentYear + 1, upCdId: "1" },
      ];
    },
    async getTerm() {
      await this.codeMng.getCodeInfo({ upCdId: UP_CD_ID_SEMESTER });
      if (this.codeMng && this.codeMng.status == SUCCSESS_STATUS) {
        this.codeMng.codeInfo.data.forEach((item) => {
          this.listTerm.push(item);
        });
      }
    },
  },
};
</script>
<style>
.title {
  margin-bottom: 10px;
  background-color: lightyellow;
}
</style>
