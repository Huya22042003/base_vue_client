<template>

  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("07.surveySatisfile.search.field1") }}</p>
                <InputBase id="diagNm" v-model="searchModel.diagNm" />
              </li>
              <li>
                <p>{{ t("07.surveySatisfile.search.field2") }}</p>
                <InputBase id="regBy" v-model="searchModel.regBy" />
              </li>
              <li>
                <p>{{ t("07.surveySatisfile.search.field3") }}</p>
                <BaseDatePicker
                  v-model="searchModel.startDate"
                  :placeholder="t('common.startDate')"
                />
                <span class="!p-0 mx-2"> ~ </span>
                <BaseDatePicker
                  v-model="searchModel.endDate"
                  :placeholder="t('common.endDate')"
                />
              </li>
            </ul>
          </div>
          <div class="dp_flex btn_group btn_end" style="gap: 10px">
            <button
              class="button btn_xl btn_blue btn_responsive"
              @click="search"
            >
              {{ t("common.search") }}
            </button>
            <button
              class="button btn_xl btn_lightgray btn_responsive"
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
            <template #button>
              <div>
                <button
                  class="button btn_xs btn_blue border_blue"
                  @click="create"
                >
                  {{ t("07.surveySatisfile.table.btnAdd") }}
                </button>
              </div>
            </template>
          </GridComponentV2>
        </div>
      </div>
      <TModalQR
        v-model:modalOpen="modalQROpen"
        :urlValue="surveyUrl"
        v-if="surveyUrl"
        :titleVal="t('07.surveySatisfile.shareSurveyStatisfied.title')"
        :key="keyValue"
      ></TModalQR>
    </section>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import { ref } from "vue";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import {
  MODE_CREATE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "@/constants/screen.const";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "@/router/screen";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import {
  SurveyOutSchoolListModel,
  SurveyOutSchoolSearchModel,
} from "../../stores/survey/outSchool/surveyOutSchool.type";
import { format } from "date-fns";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { MODE_DETAIL } from "@/constants/screen.const";
import TModalQR from "@/components/common/modal/TModalQR.vue";
import { getPage } from "@/stores/survey/outSchool/surveyOutSchool.service";

export default {
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    GridComponentV2,
    LinkGridComponent,
    BaseDatePicker,
    TModalQR,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
    "searchModel.startDate"(newValue) {
      if (!this.searchModel.endDate) {
        this.searchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.searchModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.searchModel.startDate = this.searchModel.endDate;
            this.$swal({
              text: this.t("common.messageCheckDate"),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
    "searchModel.endDate"(newValue) {
      if (!this.searchModel.startDate) {
        this.searchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(this.searchModel.startDate);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.searchModel.endDate = this.searchModel.startDate;
            this.$swal({
              text: this.t("common.messageCheckDate"),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
  },
  data() {
    return {
      keyValue: 0,
      pageTitle: this.t("07.surveySatisfactionOffCampus.list.pageTitle"),
      breadcrumbItems: [],
      dataDetail: {},
      modalQROpen: false,
      surveyUrl: "",
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<SurveyOutSchoolListModel>,
      searchModel: {} as SurveyOutSchoolSearchModel,
      totalRows: 0,
      key: 1,
      columnDefs: ref([
        {
          headerName: this.t("common.rowNum"),
          field: "rowNumb",
          flex: 0.4,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("07.surveySatisfactionOffCampus.list.column1"),
          field: "diagNm",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            cursor: "pointer",
          },
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.goToDetailSurvey,
          },
          flex: 1.2,
        },
        {
          headerName: this.t("07.surveySatisfactionOffCampus.list.column2"),
          field: "diagDurStr",
          cellStyle: { textAlign: "center" },
          flex: 1,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} - ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t("07.surveySatisfactionOffCampus.list.column3"),
          field: "quantityAnswer",
          cellStyle: { textAlign: "center" },
          flex: 0.4,
          cellRenderer: (params: any) => {
            return `<span>${params.data.quantityAnswer}</span>`;
          },
        },
        {
          headerName: this.t("07.surveySatisfactionOffCampus.list.column4"),
          field: "share",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.openModalShareQr,
          },
          flex: 0.6,
        },
        {
          headerName: this.t("07.surveySatisfactionOffCampus.list.column5"),
          field: "result",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.gotoResultSurvey,
          },
          flex: 0.6,
        },
        {
          headerName: this.t("07.surveySatisfactionOffCampus.list.column6"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t("07.surveySatisfactionOffCampus.list.column7"),
          field: "regBy",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ]),
    };
  },
  methods: {
    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPage(this.searchModel)
        .then(
          (res) => {
            this.rowData = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
            this.rowData.forEach((item) => {
              item.diagDurStr = format(
                new Date(item.diagDurStr),
                FORMAT_YYY_MM_DD
              );
              item.diagDurEnd = format(
                new Date(item.diagDurEnd),
                FORMAT_YYY_MM_DD
              );
              item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
              item.share = this.t("07.surveySatisfile.table.share");
              item.result = this.t("07.surveySatisfile.table.result");
            });
          },
          (err) => {}
        )
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.searchModel.size = pageSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getDataPage();
    },
    create() {
      this.$router.push({
        name: SCREEN.surveySatisfactionOffCampusCrud.name,
        params: { mode: MODE_CREATE },
      });
    },
    goToDetailSurvey(data: any) {
      this.$router.push({
        name: SCREEN.surveySatisfactionOffCampusCrud.name,
        params: { mode: MODE_DETAIL },
        state: { id: data.diagSeq },
      });
    },
    gotoResultSurvey(data: any) {
      this.$router.push({
        name: SCREEN.surveySatisfactionOffCampusResult.name,
        params: { mode: MODE_DETAIL },
        state: { id: data.diagSeq },
      });
    },
    openModalShareQr(data: any) {
      this.surveyUrl = data.surveyUrl;
      this.openModal();
    },
    onClose() {
      this.modalQROpen = false;
    },
    openModal() {
      this.keyValue++;
      this.modalQROpen = true;
    },
    reset() {
      this.searchModel = {};
    },
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style scoped lang="scss"></style>
