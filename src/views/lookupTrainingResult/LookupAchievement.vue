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
                  t("lookupAchievement.list.year")
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
                  t("lookupAchievement.list.semester")
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
                  t("lookupAchievement.list.subjectName")
                }}</span>
                  <InputBase
                    :id="'deptSearch'"
                    :name="'deptSearch'"
                    v-model="searchModel.deptNm"
                  />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("lookupAchievement.list.status")
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
                {{ t("lookupAchievement.list.search") }}
              </button>
              <button
                type="button"
                class="btn_round btn_lg btn_gray mg_l5"
                @click="reset"
              >
                {{ t("lookupAchievement.list.reset") }}
              </button>
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
    <ModalForm
      :isOpen="isOpen"
      :onClose="closeModalSave"
      :jobSeq="jobSeq"
      :fetchData="search"
    ></ModalForm>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "@/constants/screen.const";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { commonStore } from "@/stores/common";

import { useI18n } from "vue-i18n";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import ModalForm from "@/views/lookupTrainingResult/modal/ModalAchievement.vue";
export default {
  components: {
    Breadcrumb,
    GridComponentV2,
    LinkGridComponent,
    ModalForm,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("lookupAchievement.title"),
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
          headerName: this.t("lookupAchievement.form.year"),
          field: "deptNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupAchievement.form.department"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupAchievement.form.faculty"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupAchievement.form.subjectName"),
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
          headerName: this.t("lookupAchievement.form.compClassic"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupAchievement.form.grade"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupAchievement.form.class"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupAchievement.form.professorCharge"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupAchievement.form.curriculumYear"),
          field: "taltNrtgTypeNm",
          flex: 1,
        },
        {
          headerName: this.t("lookupAchievement.form.status"),
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
    openModalSave() {
      this.isOpen = true;
    },
    closeModalSave() {
      this.isOpen = false;
    },
  },
};
</script>
