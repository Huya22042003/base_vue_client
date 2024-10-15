<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p class="ta_c">{{ t("07.coreCompetencyDiagnosticSheet.name") }}</p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  :mode="'show'"
                  v-model="coreAbilitySearchModel.surveyNm"
                ></InputBase>
              </li>
              <li>
                <p class="ta_c">{{ t("07.coreCompetencyDiagnosticSheet.createdBy") }}</p>
                <InputBase
                  :id="'createdBy'"
                  :name="'createdBy'"
                  :mode="'show'"
                  v-model="coreAbilitySearchModel.regBy"
                ></InputBase>
              </li>
              <li>
                <p class="ta_c">{{ t("07.coreCompetencyDiagnosticSheet.useYn") }}</p>
                <RadiobuttonBase
                  v-for="item in listUseYn"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'useYn' + item.cdId"
                  :name="'useYn' + item.cdId"
                  :key="'useYn' + item.cdId"
                  v-model="coreAbilitySearchModel.useYn"
                  :checked="item.cdId == coreAbilitySearchModel.useYn"
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </li>
            </ul>
            <ul>
              <li>
                <p class="ta_c">{{ t("07.coreCompetencyDiagnosticSheet.languageYn") }}</p>
                <RadiobuttonBase
                  v-for="item in listLanguageYn"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'languageYn' + item.cdId"
                  :name="'languageYn' + item.cdId"
                  :key="'languageYn' + item.cdId"
                  v-model="coreAbilitySearchModel.multiLanguageUseYn"
                  :checked="
                    item.cdId == coreAbilitySearchModel.multiLanguageUseYn
                  "
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </li>
              <li>
                <p class="ta_c">{{ t("07.coreCompetencyDiagnosticSheet.status") }}</p>
                <RadiobuttonBase
                  v-for="item in listStatus"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'status' + item.cdId"
                  :name="'status' + item.cdId"
                  :key="'status' + item.cdId"
                  v-model="coreAbilitySearchModel.stsCd"
                  :checked="item.cdId == coreAbilitySearchModel.stsCd"
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </li>
              <li>
                <p class="ta_c">{{ t("07.coreCompetencyDiagnosticSheet.createdDate") }}</p>
                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    v-model="coreAbilitySearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="coreAbilitySearchModel.endDate"
                    :placeholder="t('common.endDate')"
                  >
                  </BaseDatePicker>
                </div>
              </li>
            </ul>
            <div class="dp_flex btn_group btn_end" style="gap: 10px">
              <button
                class="button btn_xl btn_blue btn_responsive"
                @click="searchData"
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
            ref="grid"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
          >
            <template #button>
              <div class="btn_group btn_end">
                <button
                  type="button"
                  class="button btn_xs btn_blue btn_responsive"
                  @click="gotoRegister"
                >
                  {{ t("07.coreCompetencyDiagnosticSheet.register") }}
                </button>
              </div>
            </template>
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
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { SCREEN } from "../../../router/screen";
import { commonStore } from "../../../stores/common";
import { codeMngStore } from "../../../stores/common/codeMng";
import {
  CoreAbilityListModel,
  CoreAbilitySearchModel,
} from "../../../stores/coreCompetencyDiagnosis/coreCompetencyDiagnosticSheet/coreCompetencyDiagnosticSheet.type";
import { coreAbilitySurveyStore } from "../../../stores/coreCompetencyDiagnosis/coreCompetencyDiagnosticSheet";
import { format } from "date-fns";
import {
  UP_CD_ID_MULTI_LANG_USE_YN,
  UP_CD_ID_STS_CD,
  UP_CD_ID_USE_YN,
} from "@/constants/common.const";

export default defineComponent({
  name: "CoreCompetencyDiagnosticSheetList",
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const codeMng = codeMngStore();
    const coreAbiSurStore = coreAbilitySurveyStore();
    return { t, cmn, codeMng, coreAbiSurStore };
  },
  watch: {
    "coreAbilitySearchModel.startDate"(newValue) {
      if (!this.coreAbilitySearchModel.endDate) {
        this.coreAbilitySearchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.coreAbilitySearchModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.coreAbilitySearchModel.startDate =
              this.coreAbilitySearchModel.endDate;
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
    "coreAbilitySearchModel.endDate"(newValue) {
      if (!this.coreAbilitySearchModel.startDate) {
        this.coreAbilitySearchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(this.coreAbilitySearchModel.startDate);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.coreAbilitySearchModel.endDate =
              this.coreAbilitySearchModel.startDate;
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
      rowselected: [],
      selectUseYn: "",
      selectLanguageYn: "",
      selectStatus: "",
      listUseYn: [
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
      listStatus: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      pageTitle: this.t("07.coreCompetencyDiagnosticSheet.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t("07.coreCompetencyDiagnosticSheet.rowNum"),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosticSheet.name"),
          field: "surveyNm",
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
          headerName: this.t("07.coreCompetencyDiagnosticSheet.createdBy"),
          field: "regBy",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosticSheet.useYn"),
          field: "useYn",
          cellStyle: { textAlign: "center" },
          flex: 0.6,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosticSheet.languageYn"),
          field: "multiLangUseYn",
          cellStyle: { textAlign: "center" },
          flex: 0.6,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosticSheet.status"),
          field: "stsCd",
          cellStyle: { textAlign: "center" },
          flex: 0.6,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosticSheet.createdDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      coreAbilitySearchModel: {} as CoreAbilitySearchModel,
      rowData: [] as Array<CoreAbilityListModel>,
      totalRows: 0,
      key: 1,
    };
  },
  beforeMount() {
    this.initDataSearch();
    try {
      Promise.all([
        this.getCodeUseYn(),
        this.getMultiLangUseYn(),
        this.getStsCd(),
      ]);
    } catch (e) {
      alert(e);
    }
  },
  methods: {
    initDataSearch() {
      this.coreAbilitySearchModel.useYn = "";
      this.coreAbilitySearchModel.multiLanguageUseYn = "";
      this.coreAbilitySearchModel.stsCd = "";
    },
    reset() {
      this.coreAbilitySearchModel.useYn = "";
      this.coreAbilitySearchModel.multiLanguageUseYn = "";
      this.coreAbilitySearchModel.stsCd = "";
      this.coreAbilitySearchModel.surveyNm = "";
      this.coreAbilitySearchModel.regBy = "";
      this.coreAbilitySearchModel.startDate = "";
      this.coreAbilitySearchModel.endDate = "";
    },
    searchData() {
      this.coreAbilitySearchModel.page = 1;
      this.key++;
    },
    async search() {
      this.cmn.setLoading(true);
      try {
        this.coreAbilitySearchModel.sort = "";
        await this.coreAbiSurStore.getPageCoreAbilitySurvey(
          this.coreAbilitySearchModel
        );
        if (
          this.coreAbiSurStore &&
          this.coreAbiSurStore.status == SUCCSESS_STATUS
        ) {
          this.rowData =
            this.coreAbiSurStore.coreAbilitySurveyList.data.content;
          this.totalRows =
            this.coreAbiSurStore.coreAbilitySurveyList.data.totalElements;
          this.rowData.forEach((item, index) => {
            item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
          });
          this.cmn.setLoading(false);
        }
      } catch (e) {
        alert(e);
      }
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.coreAbilitySearchModel.size = pageSize;
      this.coreAbilitySearchModel.page = pageNumber;
      this.coreAbilitySearchModel.sort = "";
      this.search();
    },
    async getCodeUseYn() {
      await this.codeMng.getCodeInfo({ upCdId: UP_CD_ID_USE_YN });
      if (this.codeMng && this.codeMng.status == SUCCSESS_STATUS) {
        this.codeMng.codeInfo.data.forEach((item) => {
          this.listUseYn.push(item);
        });
      }
    },
    async getMultiLangUseYn() {
      await this.codeMng.getCodeInfo({ upCdId: UP_CD_ID_MULTI_LANG_USE_YN });
      if (this.codeMng && this.codeMng.status == SUCCSESS_STATUS) {
        this.codeMng.codeInfo.data.forEach((item) => {
          this.listLanguageYn.push(item);
        });
      }
    },
    async getStsCd() {
      await this.codeMng.getCodeInfo({ upCdId: UP_CD_ID_STS_CD });
      if (this.codeMng && this.codeMng.status == SUCCSESS_STATUS) {
        this.codeMng.codeInfo.data.forEach((item) => {
          this.listStatus.push(item);
        });
      }
    },
    gotoRegister() {
      this.$router.push({
        name: SCREEN.coreCompetencyDiagnosticSheetCrud.name,
        params: { mode: MODE_CREATE },
        state: {
          id: "",
        },
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.coreCompetencyDiagnosticSheetCrud.name,
        params: { mode: MODE_DETAIL, id: data.id },
        state: {
          id: data.id,
        },
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
