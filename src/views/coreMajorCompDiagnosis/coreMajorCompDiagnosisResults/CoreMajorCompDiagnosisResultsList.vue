<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("07.coreMajorCompDiagnosisResult.searchBox.name") }}</p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  :mode="'show'"
                  v-model="resultDiagMajorCapaSearchModel.diagNm"
                ></InputBase>
              </li>
              <li>
                <p>
                  {{ t("07.coreMajorCompDiagnosisResult.searchBox.major") }}
                </p>
                <InputBase
                  :id="'major'"
                  :name="'major'"
                  :mode="'show'"
                  v-model="resultDiagMajorCapaSearchModel.deptNm"
                ></InputBase>
              </li>
              <li>
                <p>
                  {{
                    t("07.coreMajorCompDiagnosisResult.searchBox.languageYn")
                  }}
                </p>
                <RadiobuttonBase
                  v-for="item in listLanguageYn"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'languageYn' + item.cdId"
                  :name="'languageYn' + item.cdId"
                  :key="'languageYn' + item.cdId"
                  v-model="resultDiagMajorCapaSearchModel.multiLanguage"
                  :checked="
                    item.cdId == resultDiagMajorCapaSearchModel.multiLanguage
                  "
                  :label="item.cdNm"
                />
              </li>
              <li>
                <p>
                  {{ t("07.coreMajorCompDiagnosisResult.searchBox.status") }}
                </p>
                <SelectBoxBase
                  :id="'status'"
                  :name="'status'"
                  v-model="resultDiagMajorCapaSearchModel.status"
                  :data="listStatus"
                ></SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("07.coreMajorCompDiagnosisResult.searchBox.time") }}
                </p>

                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    v-model="resultDiagMajorCapaSearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="resultDiagMajorCapaSearchModel.endDate"
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
  TYPE_EVENT,
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { SCREEN } from "../../../router/screen";
import {
  ResultDiagMajorCapaListModel,
  ResultDiagMajorCapaSearchModel,
} from "../../../stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisResults/coreMajorCompDiagnosisResults.type";
import { commonStore } from "@/stores/common";
import { getPageResultDiagMajorCapa } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisResults/coreMajorCompDiagnosisResults.service";
import { format } from "date-fns";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import {
  UP_CD_ID_MULTI_LANG_USE_YN,
  UP_CD_ID_STATUS_DIAG,
} from "@/constants/common.const";

export default defineComponent({
  name: "CoreMajorCompDiagnosisResultsList",
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
    "resultDiagMajorCapaSearchModel.startDate"(newValue) {
      if (!this.resultDiagMajorCapaSearchModel.endDate) {
        this.resultDiagMajorCapaSearchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(
          this.resultDiagMajorCapaSearchModel.endDate
        );
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.resultDiagMajorCapaSearchModel.startDate =
              this.resultDiagMajorCapaSearchModel.endDate;
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
    "resultDiagMajorCapaSearchModel.endDate"(newValue) {
      if (!this.resultDiagMajorCapaSearchModel.startDate) {
        this.resultDiagMajorCapaSearchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(
          this.resultDiagMajorCapaSearchModel.startDate
        );
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.resultDiagMajorCapaSearchModel.endDate =
              this.resultDiagMajorCapaSearchModel.startDate;
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
      rowselected: [],
      selectLanguageYn: "total",
      breadcrumbItems: [],
      pageTitle: this.t("07.coreMajorCompDiagnosisResult.pageTitle"),
      columnDefs: [
        {
          headerName: this.t("07.coreMajorCompDiagnosisResult.table.rowNum"),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisResult.table.year"),
          field: "year",
          cellStyle: { textAlign: "center" },
          flex: 1,
          cellRenderer: (params: any) => {
            return `<span>${params.data.year} - ${params.data.termCd}</span>`;
          },
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisResult.table.name"),
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
            type: TYPE_EVENT,
            onCustomEvent: this.handleCustomClick,
          },
          flex: 2,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisResult.table.major"),
          field: "deptNm",
          flex: 1.3,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisResult.table.time"),
          field: "diagDurStr",
          cellStyle: { textAlign: "center" },
          flex: 1.5,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} - ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisResult.table.status"),
          field: "statusNm",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
        {
          headerName: this.t(
            "07.coreMajorCompDiagnosisResult.table.languageYn"
          ),
          field: "multiLangUseYn",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisResult.table.ansBy"),
          field: "quantityObject",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
          cellRenderer: (params: any) => {
            return `<span>${params.data.quantityAnswer}/${params.data.quantityTarget}</span>`;
          },
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisResult.table.regDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<ResultDiagMajorCapaListModel>,
      resultDiagMajorCapaSearchModel: {} as ResultDiagMajorCapaSearchModel,
      listStatus: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listLanguageYn: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      totalRows: 0,
      key: 1,
    };
  },
  beforeMount() {
    this.getCodeMultiLanguage();
    this.getCodeStatusDiag();
    this.reset();
  },
  methods: {
    reset() {
      this.resultDiagMajorCapaSearchModel = {};
      this.resultDiagMajorCapaSearchModel.multiLanguage = "";
      this.resultDiagMajorCapaSearchModel.status = "";
      this.resultDiagMajorCapaSearchModel.diagNm = "";
    },
    search() {
      this.resultDiagMajorCapaSearchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPageResultDiagMajorCapa(this.resultDiagMajorCapaSearchModel)
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
      this.resultDiagMajorCapaSearchModel.size = pageSize;
      this.resultDiagMajorCapaSearchModel.page = pageNumber;
      this.resultDiagMajorCapaSearchModel.sort = "";
      this.getDataPage();
    },
    getCodeMultiLanguage() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_MULTI_LANG_USE_YN }).then(
        (response) => {
          response.data.data.forEach((item) => {
            this.listLanguageYn.push(item);
          });
        }
      );
    },
    getCodeStatusDiag() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_STATUS_DIAG }).then((response) => {
        response.data.data.forEach((item) => {
          this.listStatus.push(item);
        });
      });
    },
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.coreMajorCompDiagnosisResult.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.diagSeq,
        },
      });
    },
  },
});
</script>
