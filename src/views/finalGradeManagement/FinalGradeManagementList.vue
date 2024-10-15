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
                    :data="listCheckBox"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("finalGradeManagement.list.term")
                }}</span>
                  <SelectBoxBase
                    :id="'deptSearch'"
                    :name="'deptSearch'"
                    :data="listCheckBox"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("finalGradeManagement.list.subjectname")
                }}</span>
                  <InputBase
                    :id="'deptSearch'"
                    :name="'deptSearch'"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("finalGradeManagement.list.status")
                }}</span>
                  <SelectBoxBase
                    :id="'deptSearch'"
                    :name="'deptSearch'"
                    :data="listCheckBox"
                    v-model="searchModel.deptNm"
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
    <ModalForm
      :isOpen="isOpen"
      :onClose="closeModalSave"
      :jobSeq="jobSeq"
      :fetchData="search"
    ></ModalForm>
  </div>
</template>
<script lang="ts">
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { commonStore } from "@/stores/common";
import { useI18n } from "vue-i18n";
import { PAGINATION_PAGE_SIZE, PAGINATION_PAGE_SIZE_SELECTOR } from "@/constants/screen.const";
import ModalForm from "@/views/finalGradeManagement/modal/ModalFinalGradeManagement.vue"
export default {
  components: {
    Breadcrumb,
    GridComponentV2,
    LinkGridComponent,
    ModalForm
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("finalGradeManagement.title"),
      breadcrumbItems: [],
      dataDetail: {},
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [
        {
          deptNm: "Computer Science",
          taltNrtgTypeNm: "2021",
          jobNm: "Data Structures",
          compClassic: "Core",
          grade: "A",
          class: "CS101",
          professorCharge: "John Doe",
          curriculumYear: "2021",
          status: "Active",
        },
      ],
      searchModel: {} as JobSearchModel,
      totalRows: 0,
      key: 1,
      isOpen: false,
      listCheckBox: [],
      columnDefs: ref([
        {
          headerName: this.t("finalGradeManagement.form.year"),
          field: "deptNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.department"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.major"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.subjectName"),
          field: "jobNm",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            cursor: "pointer",
          },
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.openModalSave,
          },
          flex: 1.2,
        },
        {
          headerName: this.t("finalGradeManagement.form.distinctionDegrees"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.grade"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.classDivision"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.curiAcademicYear"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("finalGradeManagement.form.situation"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
      ]),
      jobSeq: "" as String | null,
    };
  },
  beforeMount() {},
  methods: {
    reset() {
      this.searchModel = {};
    },
    search() {},
    getDataPage() {},
    fnPagination(pageNumber: any, pageSize: any) {},
    openModalSave() {
      this.isOpen = true;
    },
    closeModalSave() {
      this.isOpen = false;
    },
  },
};
</script>
<style>
.title{
    margin-bottom: 10px;
    background-color: lightyellow;
}
</style>
