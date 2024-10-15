<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("07.basicAcademicDiagnosisResult.name") }}</p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  v-model="resultDiagBaseLearnSearchModel.diagNm"
                ></InputBase>
              </li>
              <li>
                <p>{{ t("07.basicAcademicDiagnosisResult.status") }}</p>
                <SelectBoxBase
                  :id="'status'"
                  :name="'status'"
                  :data="listStatus"
                  v-model="resultDiagBaseLearnSearchModel.status"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("07.basicAcademicDiagnosisResult.dateCoreComp") }}</p>
                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    v-model="resultDiagBaseLearnSearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="resultDiagBaseLearnSearchModel.endDate"
                    :placeholder="t('common.endDate')"
                  >
                  </BaseDatePicker>
                </div>
              </li>
            </ul>
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
            ref="gridKey"
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
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import {
  FORMAT_YYY_MM_DD,
  MODE_DETAIL,
  MODE_SHOW,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  TYPE_EVENT,
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { SCREEN } from "../../../router/screen";
import { commonStore } from "../../../stores/common";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { UP_CD_ID_STATUS_DIAG } from "../../../constants/common.const";
import { ResultDiagBaseLearnSearchModel } from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosisResult/basicAcademicDiagnosisResult.type";
import { getPageResultDiagBaseLearn } from "@/stores/basicAcademicDiagnosis/basicAcademicDiagnosisResult/basicAcademicDiagnosisResult.service";
import { format } from "date-fns";

export default defineComponent({
  name: "basicAcademicDiagnosisResultList",
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
    "resultDiagBaseLearnSearchModel.startDate"(newValue) {
      if (!this.resultDiagBaseLearnSearchModel.endDate) {
        this.resultDiagBaseLearnSearchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(
          this.resultDiagBaseLearnSearchModel.endDate
        );
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.resultDiagBaseLearnSearchModel.startDate =
              this.resultDiagBaseLearnSearchModel.endDate;
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
    "resultDiagBaseLearnSearchModel.endDate"(newValue) {
      if (!this.resultDiagBaseLearnSearchModel.startDate) {
        this.resultDiagBaseLearnSearchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(
          this.resultDiagBaseLearnSearchModel.startDate
        );
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.resultDiagBaseLearnSearchModel.endDate =
              this.resultDiagBaseLearnSearchModel.startDate;
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
      modalOpen: false,
      modeShow: MODE_SHOW,
      listStatus: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      pageTitle: this.t("07.basicAcademicDiagnosisResult.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t("common.rowNum"),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosisResult.yearSemester"),
          field: "year",
          cellStyle: { textAlign: "center" },
          flex: 1,
          cellRenderer: (params: any) => {
            return `<span>${params.data.year} - ${params.data.termCd}</span>`;
          },
        },
        {
          headerName: this.t("07.basicAcademicDiagnosisResult.name"),
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
            onCustomEvent: this.handleCustomClick,
          },
          flex: 2,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosisResult.dateCoreComp"),
          field: "diagDurStr",
          cellStyle: { textAlign: "center" },
          flex: 1.5,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} - ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t("07.basicAcademicDiagnosisResult.status"),
          field: "statusNm",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosisResult.quantityReal"),
          field: "quantityAnswer",
          cellStyle: { textAlign: "center" },
          flex: 0.8,
          cellRenderer: (params: any) => {
            return `<span>${params.data.quantityAnswer}/${params.data.quantityTarget}</span>`;
          },
        },
        {
          headerName: this.t("07.basicAcademicDiagnosisResult.createdDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [],
      totalRows: 0,
      key: 1,
      resultDiagBaseLearnSearchModel: {} as ResultDiagBaseLearnSearchModel,
    };
  },
  beforeMount() {
    this.getCodeStatusDiag();
    this.reset();
  },
  methods: {
    reset() {
      this.resultDiagBaseLearnSearchModel = {};
      this.resultDiagBaseLearnSearchModel.status = "";
      this.resultDiagBaseLearnSearchModel.diagNm = "";
    },
    search() {
      this.resultDiagBaseLearnSearchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPageResultDiagBaseLearn(this.resultDiagBaseLearnSearchModel)
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
            });
          },
          (err) => {}
        )
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.resultDiagBaseLearnSearchModel.size = pageSize;
      this.resultDiagBaseLearnSearchModel.page = pageNumber;
      this.resultDiagBaseLearnSearchModel.sort = "";
      this.getDataPage();
    },
    getCodeStatusDiag() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_STATUS_DIAG }).then((response) => {
        response.data.data.forEach((item) => {
          this.listStatus.push(item);
        });
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.basicAcademicDiagnosisResultCrud.name,
        params: { mode: MODE_DETAIL, id: data.id },
        state: { id: data.diagSeq },
      });
    },
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
});
</script>
