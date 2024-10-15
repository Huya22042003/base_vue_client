<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal"
  >
    <template #title>
      <strong>
        {{
          t("07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.title")
        }}</strong
      >
    </template>
    <template #default>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_2">
            <ul>
              <li>
                <p>
                  {{
                    t(
                      "07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.name"
                    )
                  }}
                </p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  :mode="'show'"
                  v-model="majorCapaSurveySearchModel.surveyNm"
                ></InputBase>
              </li>
              <li>
                <p>
                  {{
                    t(
                      "07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.multiLanguageYn"
                    )
                  }}
                </p>
                <SelectBoxBase
                  :id="'multiLanguageYn'"
                  :name="'multiLanguageYn'"
                  :data="listLanguageYn"
                  :disabled="true"
                  v-model="majorCapaSurveySearchModel.multiLangUseYn"
                  v-if="listLanguageYn.length > 0"
                />
              </li>
            </ul>
            <ul>
              <li class="datepicker_li_custom">
                <p>
                  {{
                    t(
                      "07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.timeRegister"
                    )
                  }}
                </p>
                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    v-model="majorCapaSurveySearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="majorCapaSurveySearchModel.endDate"
                    :placeholder="t('common.endDate')"
                  >
                  </BaseDatePicker>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <p>
                  {{
                    t(
                      "07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.createdBy"
                    )
                  }}
                </p>
                <InputBase
                  :id="'createdBy'"
                  :name="'createdBy'"
                  :mode="'show'"
                  v-model="majorCapaSurveySearchModel.regBy"
                ></InputBase>
              </li>
            </ul>
            <div class="dp_flex btn_group btn_end" style="gap: 10px">
              <button
                class="button btn_xl btn_blue btn_responsive"
                @click="handleSearch"
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
        v-if="isOpen"
      >
      </GridComponentV2>
      <div class="dp_flex btn_group btn_end" style="gap: 10px">
        <button
          class="button btn_xs btn_medium_gray"
          @click="closeModal"
        >
          {{
            t("07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.close")
          }}
        </button>
      </div>
    </template>
  </TModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import SelectBoxBase from "../../../components/common/input/SelectBoxBase.vue";
import LinkGridComponent from "../../../components/common/grid/LinkGridComponent.vue";
import {
  FORMAT_YYY_MM_DD,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import {
  STATUS_NO,
  STATUS_YES,
  STS_CD_SAVE,
  UP_CD_ID_MULTI_LANG_USE_YN,
} from "../../../constants/common.const";
import { codeMngStore } from "@/stores/common/codeMng";
import { commonStore } from "@/stores/common";
import { format } from "date-fns";
import {
  MajorCapaSurveyListPopupModel,
  MajorCapaSurveySearchPopupModel,
} from "../../../stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/coreMajorCompDiagnosisSheet.type";
import { getPage } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/coreMajorCompDiagnosisSheet.service";
import { coreMajorDiagnosisStore } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosis";
import { getPagePopup } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/coreMajorCompDiagnosisSheet.service";

export default defineComponent({
  name: "CoreMajorCompDiagnosisModal",
  components: {
    SelectBoxBase,
    LinkGridComponent,
    BaseDatePicker,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    multiLanguageUseYn: {
      type: String,
    },
  },
  setup() {
    const { t } = useI18n();
    const codeMng = codeMngStore();
    const cmn = commonStore();
    const coreMajDiagStore = coreMajorDiagnosisStore();
    return { t, codeMng, cmn, coreMajDiagStore };
  },
  data() {
    return {
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: [
        {
          headerName: this.t("common.select"),
          field: "select",
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
          flex: 1,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosticSheet.name"),
          field: "surveyNm",
          flex: 1,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisSheet.table.university"),
          field: "univNm",
          flex: 1,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisSheet.table.major"),
          field: "deptNm",
          flex: 1,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosticSheet.languageYn"),
          field: "multiLangUseYn",
          flex: 1,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosticSheet.createdBy"),
          field: "regBy",
          flex: 1,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosticSheet.createdDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
      ],
      rowData: [] as Array<MajorCapaSurveyListPopupModel>,
      idSub: "",
      listLanguageYn: [],
      key: 1,
      majorCapaSurveySearchModel: {} as MajorCapaSurveySearchPopupModel,
      totalRows: 0,
      statusSave: STS_CD_SAVE,
    };
  },
  watch: {
    isOpen(oldValue, newValue) {
      this.reset();
      if (!newValue) {
        this.getMultiLangUseYn();
        this.majorCapaSurveySearchModel.multiLangUseYn =
          this.multiLanguageUseYn;
      } else {
        this.listLanguageYn = [];
      }
    },
    "majorCapaSurveySearchModel.startDate"(newValue) {
      if (!this.majorCapaSurveySearchModel.endDate) {
        this.majorCapaSurveySearchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.majorCapaSurveySearchModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.majorCapaSurveySearchModel.startDate =
              this.majorCapaSurveySearchModel.endDate;
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
    "majorCapaSurveySearchModel.endDate"(newValue) {
      if (!this.majorCapaSurveySearchModel.startDate) {
        this.majorCapaSurveySearchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(
          this.majorCapaSurveySearchModel.startDate
        );
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.majorCapaSurveySearchModel.endDate =
              this.majorCapaSurveySearchModel.startDate;
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
  beforeMount() {
    this.reset();
  },
  methods: {
    reset() {
      this.majorCapaSurveySearchModel.surveyNm = "";
      this.majorCapaSurveySearchModel.regBy = "";
      this.majorCapaSurveySearchModel.startDate = null;
      this.majorCapaSurveySearchModel.endDate = null;
    },
    async getMultiLangUseYn() {
      await this.codeMng.getCodeInfo({ upCdId: UP_CD_ID_MULTI_LANG_USE_YN });
      if (this.codeMng && this.codeMng.status == SUCCSESS_STATUS) {
        this.codeMng.codeInfo.data.forEach((item) => {
          this.listLanguageYn.push(item);
        });
      }
    },
    handleSearch() {
      this.majorCapaSurveySearchModel.page = 1;
      this.key++;
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.majorCapaSurveySearchModel.size = pageSize;
      this.majorCapaSurveySearchModel.page = pageNumber;
      this.majorCapaSurveySearchModel.sort = "";
      this.search();
    },
    search() {
      this.cmn.setLoading(true);
      this.cmn.setLoading(true);
      getPagePopup(this.majorCapaSurveySearchModel)
        .then(
          (res) => {
            this.rowData = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
            this.rowData.forEach((item) => {
              item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
              item.select = this.t("common.select");
            });
          },
          (err) => {}
        )
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    closeModal() {
      this.$emit("close-modal");
    },
    handleCustomClick(data: any) {
      this.coreMajDiagStore.setCoreMajorSurveySelected(data);
      this.closeModal();
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
.datepicker_li_custom {
  width: 520px;
}
</style>
