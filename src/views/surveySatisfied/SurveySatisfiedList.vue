<template>
  <THeader />
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div class="search_box mg_b30">
        <div class="search_section">
          <div class="search_toggle sm">
            <div class="left"></div>
            <div class="right">
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("07.surveySatisfile.search.field1")
                }}</span>
                <InputBase id="diagNm" v-model="searchModel.diagNm" />
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("07.surveySatisfile.search.field2")
                }}</span>
                <SelectBoxBase
                  :id="'status'"
                  name="'status'"
                  v-model="searchModel.status"
                  :data="listStatus"
                >
                </SelectBoxBase>
              </div>
              <div class="search_daywrap mg_r10">
                <span class="tag">{{
                  t("07.surveySatisfile.search.field3")
                }}</span>
                <InputBase id="diagNm" v-model="searchModel.regBy" />
              </div>
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
                @click="reset"
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
                <button class="btn_round btn_primary btn_md" @click="create">
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
  SurveyInSchoolListModel,
  SurveyInSchoolSearchModel,
} from "../../stores/survey/inSchool/surveyInSchool.type";
import {
  downloadExcelResultSurveyInSchool,
  getPage,
} from "../../stores/survey/inSchool/surveyInSchool.service";
import { format } from "date-fns";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { MODE_DETAIL } from "@/constants/screen.const";
import TModalQR from "@/components/common/modal/TModalQR.vue";

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
  data() {
    return {
      keyValue: 0,
      pageTitle: this.t("07.surveySatisfile.title"),
      breadcrumbItems: [],
      dataDetail: {},
      modalQROpen: false,
      surveyUrl: "",
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<SurveyInSchoolListModel>,
      searchModel: {} as SurveyInSchoolSearchModel,
      totalRows: 0,
      key: 1,
      listStatus: [
        { cdId: "", cdNm: this.t("common.all") },
        { cdId: "조사중", cdNm: "조사중" },
        { cdId: "종료", cdNm: "종료" },
        { cdId: "예정", cdNm: "예정" },
      ],
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
          headerName: this.t("07.surveySatisfile.table.field1"),
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
          headerName: this.t("07.surveySatisfile.table.field2"),
          field: "diagDurStr",
          cellStyle: { textAlign: "center" },
          flex: 1,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} - ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t("07.surveySatisfile.table.title2"),
          field: "status",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.surveySatisfile.table.field3"),
          field: "quantityAnswer",
          cellStyle: { textAlign: "center" },
          flex: 0.6,
          cellRenderer: (params: any) => {
            return `<span>${params.data.quantityAnswer}/${params.data.quantityTarget}</span>`;
          },
        },
        {
          headerName: this.t("07.surveySatisfile.table.field4"),
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
          flex: 0.55,
        },
        {
          headerName: this.t("07.surveySatisfile.table.field5"),
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
            onCustomEvent: this.downloadExel,
          },
          flex: 0.55,
        },
        {
          headerName: this.t("07.surveySatisfile.table.field7"),
          field: "regBy",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t("07.surveySatisfile.table.field6"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
      ]),
    };
  },
  beforeMount() {
    this.reset();
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
        name: SCREEN.surveySatisfiedFom.name,
        params: { mode: MODE_CREATE },
      });
    },
    goToDetailSurvey(data: any) {
      this.$router.push({
        name: SCREEN.surveySatisfiedFom.name,
        params: { mode: MODE_DETAIL },
        state: { id: data.diagSeq },
      });
    },
    gotoResultSurvey(data: any) {
      this.$router.push({
        name: SCREEN.surveySatisfiedResult.name,
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
      this.searchModel = {
        diagNm: "",
        status: "",
        regBy: "",
      };
    },
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    downloadExel(data: any) {
      this.cmn.setLoading(true);
      downloadExcelResultSurveyInSchool({
        diagSeq: data.diagSeq,
      }).then((response: any) => {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const fileNameFromServer = "교내_만족도_조사_결과.xlsx";
        link.setAttribute("download", fileNameFromServer);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
        this.cmn.setLoading(false);
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
