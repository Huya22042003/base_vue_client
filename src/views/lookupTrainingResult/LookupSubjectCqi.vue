<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div class="search_box mg_b30">
        <div class="search_section">
          <div class="search_toggle sm">
            <div class="right">
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("lookupTechPlan.list.year")
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
                  t("lookupTechPlan.list.grade")
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
                  t("lookupTechPlan.list.semester")
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
                  t("lookupTechPlan.list.subName")
                }}</span>
                  <InputBase
                    :id="'deptSearch'"
                    :name="'deptSearch'"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("lookupTechPlan.list.professCharge")
                }}</span>
                  <InputBase
                    :id="'deptSearch'"
                    :name="'deptSearch'"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("lookupTechPlan.list.status")
                }}</span>
                  <SelectBoxBase
                    :id="'deptSearch'"
                    :name="'deptSearch'"
                    :data="listCheckBox"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="left mg_t10">
                <button
                  type="button"
                  class="btn_round btn_lg btn_primary mg_l10"
                  @click="search"
                >
                  {{ t("lookupTechPlan.list.search") }}
                </button>
                <button
                  type="button"
                  class="btn_round btn_lg btn_gray mg_l5"
                  @click="reset"
                >
                  {{ t("lookupTechPlan.list.reset") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="mg_b15">
          <span class="note_cus">
            {{ t("lookupTechPlan.form.title") }}
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
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "../../constants/screen.const";
import GridComponentV2 from "../../components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import { commonStore } from "../../stores/common";

import { useI18n } from "vue-i18n";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";

export default {
  components: {
    Breadcrumb,
    GridComponentV2,
    LinkGridComponent,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("lookupTechPlan.title"),
      breadcrumbItems: [],
      dataDetail: {},
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<JobListModel>,
      searchModel: {} as JobSearchModel,
      totalRows: 0,
      key: 1,
      isOpen: false,
      listCheckBox: [],
      columnDefs: ref([
        {
          headerName: this.t("lookupTechPlan.form.year"),
          field: "deptNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupTechPlan.form.seemester"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupTechPlan.form.department"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupTechPlan.form.courseCategory*"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupTechPlan.form.courseName"),
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
          headerName: this.t("lookupTechPlan.form.courseCode"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupTechPlan.form.grade"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupTechPlan.form.classGroup"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupTechPlan.form.professorCharge"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupTechPlan.form.CoursCategory"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupTechPlan.form.status"),
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
    openModalSave(data: JobListModel | null) {},
    closeModalSave() {
      this.isOpen = false;
    },
  },
};
</script>
