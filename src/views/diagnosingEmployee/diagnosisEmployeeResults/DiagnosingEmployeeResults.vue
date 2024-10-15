<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>
                  {{
                    t("07.diagnosingEmployee.diagnosisResults.titleSearch.name")
                  }}
                </p>
                <InputBase
                  :id="'diagNm'"
                  :name="'diagNm'"
                  v-model="diagResultEmpAbilitySearchModel.diagNm"
                ></InputBase>
              </li>
              <li>
                <p>
                  {{
                    t(
                      "07.diagnosingEmployee.diagnosisResults.titleSearch.status"
                    )
                  }}
                </p>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="listStatus"
                  v-model="diagResultEmpAbilitySearchModel.status"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{
                    t("07.diagnosingEmployee.diagnosisResults.titleSearch.date")
                  }}
                </p>

                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    v-model="diagResultEmpAbilitySearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="diagResultEmpAbilitySearchModel.endDate"
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
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import { SCREEN } from "../../../router/screen";
import { useI18n } from "vue-i18n";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { UP_CD_ID_STATUS_DIAG } from "@/constants/common.const";
import { commonStore } from "@/stores/common";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import {
  DiagResultEmpAbilityListModel,
  DiagResultEmpAbilitySearchModel,
} from "../../../stores/diagnosisEmployee/diagnosisEmployeeResult/diagnosisEmployeeResult.type";
import { getPageResultDiagEmpAbility } from "../../../stores/diagnosisEmployee/diagnosisEmployeeResult/diagnosisEmployeeResult.service";
import { format } from "date-fns";

export default defineComponent({
  name: "DiagnosingEmployeeResults",
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
    "diagResultEmpAbilitySearchModel.startDate"(newValue) {
      if (!this.diagResultEmpAbilitySearchModel.endDate) {
        this.diagResultEmpAbilitySearchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(
          this.diagResultEmpAbilitySearchModel.endDate
        );
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagResultEmpAbilitySearchModel.startDate =
              this.diagResultEmpAbilitySearchModel.endDate;
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
    "diagResultEmpAbilitySearchModel.endDate"(newValue) {
      if (!this.diagResultEmpAbilitySearchModel.startDate) {
        this.diagResultEmpAbilitySearchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(
          this.diagResultEmpAbilitySearchModel.startDate
        );
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagResultEmpAbilitySearchModel.endDate =
              this.diagResultEmpAbilitySearchModel.startDate;
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
      listStatus: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      pageTitle: this.t("07.diagnosingEmployee.diagnosisResults.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t(
            "07.diagnosingEmployee.diagnosisResults.table.rowNum"
          ),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "07.diagnosingEmployee.diagnosisResults.table.eduYear"
          ),
          field: "year",
          cellStyle: { textAlign: "center" },
          flex: 1,
          cellRenderer: (params: any) => {
            return `<span>${params.data.year} - ${params.data.termCd}</span>`;
          },
        },
        {
          headerName: this.t(
            "07.diagnosingEmployee.diagnosisResults.table.name"
          ),
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
          headerName: this.t(
            "07.diagnosingEmployee.diagnosisResults.table.diagnosisTime"
          ),
          field: "diagDurStr",
          cellStyle: { textAlign: "center" },
          flex: 1.5,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} - ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t(
            "07.diagnosingEmployee.diagnosisResults.table.status"
          ),
          field: "statusNm",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
        {
          headerName: this.t(
            "07.diagnosingEmployee.diagnosisResults.table.target"
          ),
          field: "quantityAnswer",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
          cellRenderer: (params: any) => {
            return `<span>${params.data.quantityAnswer}/${params.data.quantityTarget}</span>`;
          },
        },
        {
          headerName: this.t(
            "07.diagnosingEmployee.diagnosisResults.table.createdDate"
          ),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      diagResultEmpAbilitySearchModel: {} as DiagResultEmpAbilitySearchModel,
      rowData: [] as Array<DiagResultEmpAbilityListModel>,
      totalRows: 0,
      key: 1,
    };
  },
  beforeMount() {
    this.getCodeStatusDiag();
    this.reset();
  },
  methods: {
    reset() {
      this.diagResultEmpAbilitySearchModel = {};
      this.diagResultEmpAbilitySearchModel.status = "";
    },
    search() {
      this.diagResultEmpAbilitySearchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPageResultDiagEmpAbility(this.diagResultEmpAbilitySearchModel)
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
      this.diagResultEmpAbilitySearchModel.size = pageSize;
      this.diagResultEmpAbilitySearchModel.page = pageNumber;
      this.diagResultEmpAbilitySearchModel.sort = "";
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
        name: SCREEN.diagnosingEmployeeResultsCrud.name,
        params: { mode: MODE_DETAIL },
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
