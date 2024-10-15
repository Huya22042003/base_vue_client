<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("07.coreCompetencyDiagnosisResult.name") }}</p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  :mode="'show'"
                  v-model="resultDiagCoreAbilitySearchModel.diagNm"
                ></InputBase>
              </li>
              <li class="li__search__custom">
                <p class="ta_c">
                  {{ t("07.coreCompetencyDiagnosisResult.multiLanguageYn") }}
                </p>
                <RadiobuttonBase
                  v-for="item in listLanguageYn"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'multiLanguageYn' + item.cdId"
                  :name="'multiLanguageYn' + item.cdId"
                  :key="'multiLanguageYn' + item.cdId"
                  v-model="resultDiagCoreAbilitySearchModel.multiLanguage"
                  :checked="
                    item.cdId == resultDiagCoreAbilitySearchModel.multiLanguage
                  "
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </li>
              <li>
                <p>{{ t("07.coreCompetencyDiagnosisResult.status") }}</p>
                <SelectBoxBase
                  :id="'status'"
                  :name="'status'"
                  :data="listStatus"
                  v-model="resultDiagCoreAbilitySearchModel.status"
                ></SelectBoxBase>
              </li>
            </ul>
            <ul>
              <li>
                <p>{{ t("07.coreCompetencyDiagnosisResult.dateCoreComp") }}</p>
                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    v-model="resultDiagCoreAbilitySearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="resultDiagCoreAbilitySearchModel.endDate"
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
  MODE_CREATE,
  MODE_DETAIL,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  TYPE_EVENT,
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { SCREEN } from "../../../router/screen";
import {
  MULTI_LANGUAGE_N,
  MULTI_LANGUAGE_Y,
  STATUS_NO,
  STATUS_YES,
  UP_CD_ID_MULTI_LANG_USE_YN,
  UP_CD_ID_STATUS_DIAG,
} from "../../../constants/common.const";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { ResultDiagCoreAbilitySearchModel } from "../../../stores/coreCompetencyDiagnosis/coreCompetencyDiagnosisResults/coreCompetencyDiagnosisResults.type";
import { getPageResultDiagCoreAbility } from "@/stores/coreCompetencyDiagnosis/coreCompetencyDiagnosisResults/coreCompetencyDiagnosisResults.service";
import { commonStore } from "@/stores/common";
import { format } from "date-fns";

export default defineComponent({
  name: "coreCompetencyDiagnosisResultList",
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
    "resultDiagCoreAbilitySearchModel.startDate"(newValue) {
      if (!this.resultDiagCoreAbilitySearchModel.endDate) {
        this.resultDiagCoreAbilitySearchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(
          this.resultDiagCoreAbilitySearchModel.endDate
        );
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.resultDiagCoreAbilitySearchModel.startDate =
              this.resultDiagCoreAbilitySearchModel.endDate;
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
    "resultDiagCoreAbilitySearchModel.endDate"(newValue) {
      if (!this.resultDiagCoreAbilitySearchModel.startDate) {
        this.resultDiagCoreAbilitySearchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(
          this.resultDiagCoreAbilitySearchModel.startDate
        );
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.resultDiagCoreAbilitySearchModel.endDate =
              this.resultDiagCoreAbilitySearchModel.startDate;
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
      listLanguageYn: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listStatus: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      pageTitle: this.t("07.coreCompetencyDiagnosisResult.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t("common.rowNum"),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosisResult.yearSemester"),
          field: "year",
          cellStyle: { textAlign: "center" },
          flex: 1,
          cellRenderer: (params: any) => {
            return `<span>${params.data.year} - ${params.data.termCd}</span>`;
          },
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosisResult.name"),
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
          headerName: this.t("07.coreCompetencyDiagnosisResult.dateCoreComp"),
          field: "diagDurStr",
          cellStyle: { textAlign: "center" },
          flex: 1.5,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} - ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosisResult.status"),
          field: "statusNm",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t(
            "07.coreCompetencyDiagnosisResult.multiLanguageYn"
          ),
          field: "multiLangUseYn",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosisResult.quantityReal"),
          field: "quantityObject",
          cellStyle: { textAlign: "center" },
          flex: 0.9,
          cellRenderer: (params: any) => {
            return `<span>${params.data.quantityAnswer}/${params.data.quantityTarget}</span>`;
          },
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosisResult.createdDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [],
      resultDiagCoreAbilitySearchModel: {} as ResultDiagCoreAbilitySearchModel,
      multiLanguageY: MULTI_LANGUAGE_Y,
      multiLanguageN: MULTI_LANGUAGE_N,
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
    search() {
      this.resultDiagCoreAbilitySearchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPageResultDiagCoreAbility(this.resultDiagCoreAbilitySearchModel)
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
      this.resultDiagCoreAbilitySearchModel.size = pageSize;
      this.resultDiagCoreAbilitySearchModel.page = pageNumber;
      this.resultDiagCoreAbilitySearchModel.sort = "";
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
    reset() {
      this.resultDiagCoreAbilitySearchModel = {};
      this.resultDiagCoreAbilitySearchModel.multiLanguage = "";
      this.resultDiagCoreAbilitySearchModel.status = "";
      this.resultDiagCoreAbilitySearchModel.diagNm = "";
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.coreCompetencyDiagnosisResult.name,
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
<style scoped>
.li__search__custom {
  display: flex;
  justify-content: center;
}
</style>
