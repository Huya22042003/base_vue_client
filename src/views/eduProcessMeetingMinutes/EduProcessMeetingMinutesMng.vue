<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
    <div class="box dp_block">
      <div class="box_section">
        <p class="box_title_sm">검색</p>
        <div class="search_box col_3">
          <ul>
            <li>
              <p>
                {{
                  t(
                    "04.eduScheduleCreativeMng.newEducationSchedule.search.specializedUniversity"
                  )
                }}
              </p>
              <div class="">
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="listSelectBox"
                  v-model="abc"
                ></SelectBoxBase>
              </div>
            </li>
            <li>
              <p>
                {{
                  t(
                    "04.eduScheduleCreativeMng.newEducationSchedule.search.specializedUniversity"
                  )
                }}
              </p>
              <SelectBoxBase
                :id="'selectbox1'"
                :name="'selectbox1'"
                :data="listSelectBox"
                v-model="abc"
              ></SelectBoxBase>
            </li>
            <li>
              <p>
                {{ t("04.eduScheduleCreativeMng.newEducationSchedule.search.faculty") }}
              </p>
              <input type="text" class="form_style" placeholder="텍스트 input" />
            </li>
          </ul>
          <div class="search_btnarea">
            <button class="btn_round btn_lg btn_primary mg_l10" @click="search()">
              {{ t("common.search") }}
            </button>
            <button class="btn_round btn_lg btn_gray mg_l5" @click="resetSearch()">
              {{ t("common.reset") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="box dp_block">
      <div class="box-section">
        <GridComponentV2
          :key="key"
          :rowData="rowData"
          :columnDefs="columnDefs"
          :pagination="true"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
          ref="grid"
          :paginationClientFlag="false"
          :totalRecord="totalRows"
          @customPagination="fnPagination"
        >
          <template #button>
            <button class="btn_round btn_sm btn_primary" @click="goToPage">
              {{ t("회의록 등록") }}
            </button>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import InputTextBase from "@/components/common/input/InputTextBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { commonStore } from "../../stores/common";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import router from "@/router";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { SCREEN } from "@/router/screen";
import { MODE_DETAIL, MODE_CREATE } from "@/constants/screen.const";
import SelectBoxBase from "../../components/common/input/SelectBoxBase.vue";

export default defineComponent({
  components: {
    SelectBoxBase,
    InputTextBase,
    LinkGridComponent,
    BaseDatePicker,
    GridComponentV2,
    Breadcrumb,
  },
  setup: () => {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("회의록 관리"),
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [{ 
        rowNumber: "1", 
        category: "1",
        academicYear: "1",
        department: "1",
        topic: "1",
        regId: "1",
        regDate:"1"
      }],
      totalRows: 0,
      key: 1,
      abc: "",
      listSelectBox: [],
      columnDefs: ref([
        {
          headerName: this.t("번호"),
          field: "rowNumber",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("사업구분"),
          field: "category",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("학년도"),
          field: "academicYear",
          cellStyle: {
            textAlign: "center",
          },
          flex: 2,
        },
        {
          headerName: this.t("학과/학부"),
          field: "department",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("회의주제"),
          field: "topic",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
          flex: 2,
        },
        {
          headerName: this.t("작성자"),
          field: "regId",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("작성일"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
      ]),
    };
  },
  methods: {
    goToPage() {
      this.$router.push({
        name: SCREEN.eduProcessMeetingMinutesCrud.name,
        params: { mode: MODE_CREATE },
      });
    },
    handleCustomClick(data){
      this.$router.push({
        name: SCREEN.eduProcessMeetingMinutesCrud.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.rectId,
        },
      });
    },
  },
});
</script>
