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
                    t("07.diagnosingLecturer.diagnosisResults.titleSearch.name")
                  }}
                </p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  :mode="'show'"
                  v-model="diagResultProfAbilitySearchModel.diagNm"
                ></InputBase>
              </li>
              <li>
                <p>
                  {{
                    t(
                      "07.diagnosingLecturer.diagnosisResults.titleSearch.status"
                    )
                  }}
                </p>
                <SelectBoxBase
                  :id="'status'"
                  :name="'status'"
                  :data="listStatus"
                  v-model="diagResultProfAbilitySearchModel.status"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{
                    t("07.diagnosingLecturer.diagnosisResults.titleSearch.date")
                  }}
                </p>

                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    v-model="diagResultProfAbilitySearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="diagResultProfAbilitySearchModel.endDate"
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
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { UP_CD_ID_STATUS_DIAG } from "@/constants/common.const";
import {
  DiagResultProfAbilityListModel,
  DiagResultProfAbilitySearchModel,
} from "../../../stores/profAbilityLecturer/profAbilityLecturerResult/profAbilityLecturerResult.type";
import { getPageResultDiagProfAbility } from "@/stores/profAbilityLecturer/profAbilityLecturerResult/profAbilityLecturerResult.service";
import { format } from "date-fns";
import { commonStore } from "@/stores/common";

export default defineComponent({
  name: "DiagnosingLecturerResults",
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
    "diagResultProfAbilitySearchModel.startDate"(newValue) {
      if (!this.diagResultProfAbilitySearchModel.endDate) {
        this.diagResultProfAbilitySearchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(
          this.diagResultProfAbilitySearchModel.endDate
        );
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagResultProfAbilitySearchModel.startDate =
              this.diagResultProfAbilitySearchModel.endDate;
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
    "diagResultProfAbilitySearchModel.endDate"(newValue) {
      if (!this.diagResultProfAbilitySearchModel.startDate) {
        this.diagResultProfAbilitySearchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(
          this.diagResultProfAbilitySearchModel.startDate
        );
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagResultProfAbilitySearchModel.endDate =
              this.diagResultProfAbilitySearchModel.startDate;
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
      modeScreen: "",
      listStatus: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      pageTitle: this.t("07.diagnosingLecturer.diagnosisResults.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t(
            "07.diagnosingLecturer.diagnosisResults.table.rowNum"
          ),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "07.diagnosingLecturer.diagnosisResults.table.eduYear"
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
            "07.diagnosingLecturer.diagnosisResults.table.name"
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
            "07.diagnosingLecturer.diagnosisResults.table.diagnosisTime"
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
            "07.diagnosingLecturer.diagnosisResults.table.status"
          ),
          field: "statusNm",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
        {
          headerName: this.t(
            "07.diagnosingLecturer.diagnosisResults.table.target"
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
            "07.diagnosingLecturer.diagnosisResults.table.createdDate"
          ),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      diagResultProfAbilitySearchModel: {} as DiagResultProfAbilitySearchModel,
      rowData: [] as Array<DiagResultProfAbilityListModel>,
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
      this.diagResultProfAbilitySearchModel = {};
      this.diagResultProfAbilitySearchModel.status = "";
    },
    search() {
      this.diagResultProfAbilitySearchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPageResultDiagProfAbility(this.diagResultProfAbilitySearchModel)
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
      this.diagResultProfAbilitySearchModel.size = pageSize;
      this.diagResultProfAbilitySearchModel.page = pageNumber;
      this.diagResultProfAbilitySearchModel.sort = "";
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
        name: SCREEN.diagnosingLecturerResultsCrud.name,
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
