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
                  v-model="searchModel.surveyNm"
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
                  :id="'status'"
                  :name="'status'"
                  v-model="searchModel.multiLangUseYn"
                  :data="listLanguageYn"
                  :disabled="true"
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
                    :placeholder="t('common.startDate')"
                    v-model="searchModel.startDate"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    :placeholder="t('common.endDate')"
                    v-model="searchModel.endDate"
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
                  v-model="searchModel.regId"
                ></InputBase>
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                type="button"
                class="button btn_xl btn_blue btn_responsive"
                @click="search()"
              >
                {{
                  t(
                    "07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.search"
                  )
                }}
              </button>
              <button
                type="button"
                class="button btn_xl btn_lightgray btn_responsive"
                @click="reset()"
              >
                {{
                  t(
                    "07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.reset"
                  )
                }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <GridComponentV2
        :rowData="rowData"
        :columnDefs="columnDefs"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :paginationPageSizeSelector="paginationPageSizeSelector"
        ref="grid"
        :paginationClientFlag="false"
        @customPagination="fnPagination"
        :totalRecord="totalRows"
        :key="key"
        v-if="isOpen"
      >
      </GridComponentV2>
      <div class="dp_flex btn_group btn_end" style="gap: 10px">
        <button
          class="button btn_xs btn_medium_gray"
          @click="closeModal()"
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
import {
  MESSAGE_ERROR_API,
  UP_CD_ID_MULTI_LANG_USE_YN,
} from "@/constants/common.const";
import LinkGridComponent from "../../../components/common/grid/LinkGridComponent.vue";
import {
  FORMAT_YYY_MM_DD,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { getPagePopUp } from "../../../stores/diagnosislearningAbility/diagLearnAbilitySheet/diagLearnAbilitySheet.service";
import { commonStore } from "../../../stores/common";
import { LearnAbilitySurveyPopUpSearchModel } from "../../../stores/diagnosislearningAbility/diagLearnAbilitySheet/diagLearnAbilitySheet.type";
import { format } from "date-fns";
import { learnAbilityDiagnosisStore } from "../../../stores/diagnosislearningAbility/diagLearnAbility";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";

export default defineComponent({
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
    const diagLearnStore = learnAbilityDiagnosisStore();
    const store = commonStore();
    const { t } = useI18n();
    return { t, store, diagLearnStore };
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
          field: "regId",
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
          headerName: this.t(
            "07.coreCompetencyDiagnosis.detail.modalSelectCompSheet.columnSelect"
          ),
          field: "title",
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          flex: 1,
        },
      ],
      listLanguageYn: [],
      rowData: [],
      key: 1,
      idSub: "",
      totalRows: null,
      searchModel: {} as LearnAbilitySurveyPopUpSearchModel,
      title: "",
    };
  },
  watch: {
    isOpen(oldValue, newValue) {
      this.reset();
      if (!newValue) {
        this.getCode();
        this.searchModel.multiLangUseYn = this.multiLanguageUseYn;
      } else {
        this.listLanguageYn = [];
      }
    },
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
  beforeMount() {
    this.searchModel.surveyNm = "";
    this.searchModel.regId = "";
    this.searchModel.multiLangUseYn = "";
    this.searchModel.startDate = "";
    this.searchModel.endDate = "";
  },
  methods: {
    getCode() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_MULTI_LANG_USE_YN }).then(
        (response) => {
          response.data.data.forEach((item) => {
            this.listLanguageYn.push(item);
          });
        }
      );
    },
    reset() {
      this.searchModel.surveyNm = "";
      this.searchModel.regId = "";
      this.searchModel.startDate = "";
      this.searchModel.endDate = "";
    },
    closeModal() {
      this.$emit("close-modal");
    },
    handleCustomClick(data: any) {
      this.diagLearnStore.setLernAbilitySurveySelected(data);
      this.closeModal();
    },
    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    getAll() {
      this.store.setLoading(true);
      getPagePopUp(this.searchModel)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRows = res.data.data.totalElements;
            this.rowData = res.data.data.content.map((item) => {
              item.regDate = format(item.regDate, FORMAT_YYY_MM_DD);
              item.rowNumber = this.totalRows - item.rowNumber + 1;
              item.title = this.t("common.select");
              return item;
            });
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getAll();
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
  width: 535px;
}
</style>
