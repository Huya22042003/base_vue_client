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
                  v-model="baseLearnSurveySearchModel.surveyNm"
                ></InputBase>
              </li>
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
                  v-model="baseLearnSurveySearchModel.regBy"
                ></InputBase>
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
                    v-model="baseLearnSurveySearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="baseLearnSurveySearchModel.endDate"
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
} from "../../../constants/screen.const";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { STATUS_YES, STS_CD_SAVE } from "../../../constants/common.const";
import InputBase from "../../../components/common/input/InputBase.vue";
import {
  BaseLearnSurveyListPopupModel,
  BaseLearnSurveySearchPopupModel,
} from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosisSheet/basicAcademicDiagnosisSheet.type";
import { getPageBaseLearnSurveyPopup } from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosisSheet/basicAcademicDiagnosisSheet.service";
import { format } from "date-fns";
import { commonStore } from "../../../stores/common";
import { basicAcademicDiagnosisStore } from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosis";

export default defineComponent({
  name: "ModalBasicAcademicSheet",
  components: {
    SelectBoxBase,
    LinkGridComponent,
    BaseDatePicker,
    InputBase,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const baseLearnSurveyStore = basicAcademicDiagnosisStore();
    return { t, cmn, baseLearnSurveyStore };
  },
  data() {
    return {
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: [
        {
          headerName: this.t(
            "07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.name"
          ),
          field: "surveyNm",
          flex: 1,
        },
        {
          headerName: this.t(
            "07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.createdBy"
          ),
          field: "regBy",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t(
            "07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.createdDate"
          ),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
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
      ],
      rowData: [] as Array<BaseLearnSurveyListPopupModel>,
      idSub: "",
      listLanguageYn: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      totalRows: 0,
      key: 1,
      baseLearnSurveySearchModel: {} as BaseLearnSurveySearchPopupModel,
      statusSave: STS_CD_SAVE,
      statusYes: STATUS_YES,
    };
  },
  beforeMount() {
    this.reset();
  },
  methods: {
    search() {
      this.baseLearnSurveySearchModel.page = 1;
      this.key++;
    },
    reset() {
      this.baseLearnSurveySearchModel = {};
    },
    getData() {
      this.cmn.setLoading(true);
      getPageBaseLearnSurveyPopup(this.baseLearnSurveySearchModel)
        .then(
          (res) => {
            this.rowData = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
            this.rowData.forEach((item: any) => {
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
    fnPagination(pageNumber: any, pageSize: any) {
      this.baseLearnSurveySearchModel.size = pageSize;
      this.baseLearnSurveySearchModel.page = pageNumber;
      this.baseLearnSurveySearchModel.sort = "";
      this.getData();
    },
    closeModal() {
      this.$emit("close-modal");
    },
    handleCustomClick(data: any) {
      this.baseLearnSurveyStore.setBaseLearnSurveySelected(data);
      this.closeModal();
    },
  },
});
</script>
<style scoped>
.datepicker_li_custom {
  width: 535px;
}
</style>
