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
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import LinkGridComponent from "../../../components/common/grid/LinkGridComponent.vue";
import {
  FORMAT_YYY_MM_DD,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { getPagePopup } from "../../../stores/diagnosisEmployee/diagnosisEmployeeSurvey/diagnosisEmployeeSurvey.service";
import { commonStore } from "../../../stores/common";
import { SearchPopupModel } from "../../../stores/diagnosisEmployee/diagnosisEmployeeSurvey/diagnosisEmployeeSurvey.type";
import { format } from "date-fns";
import { diagEmployee } from "../../../stores/diagnosisEmployee/diagnosisEmployees";

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
  },
  setup() {
    const diagEmpStore = diagEmployee();
    const store = commonStore();
    const { t } = useI18n();
    return { t, store, diagEmpStore };
  },
  watch: {
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
      rowData: [],
      key: 1,
      totalRows: 0,
      searchModel: {} as SearchPopupModel,
      title: "",
    };
  },
  methods: {
    reset() {
      this.searchModel = {};
    },
    closeModal() {
      this.$emit("close-modal");
    },
    handleCustomClick(data: any) {
      this.diagEmpStore.setDiagEmployeeSelected(data);
      this.closeModal();
    },
    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    getAll() {
      this.store.setLoading(true);
      getPagePopup(this.searchModel)
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
