<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'modal_form'"
    id="callSurveyModal"
    @close-modal="onClose"
  >
    <template #title>
      <strong> {{ t("07.surveySatisfile.callSurvey.title") }}</strong>
    </template>
    <template #default>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_2">
            <ul>
              <li>
                <p>
                  {{ t("07.surveySatisfile.callSurvey.field1") }}
                </p>
                <InputBase
                  :id="'diagNm'"
                  name="'diagNm'"
                  v-model="searchModel.diagNm"
                />
              </li>
              <li>
                <p>
                  {{ t("07.surveySatisfile.callSurvey.field2") }}
                </p>
                <BaseDatePicker
                  v-model="searchModel.startDate"
                  :placeholder="t('common.startDate')"
                />
                <span class="!p-0 mx-2"> ~ </span>
                <BaseDatePicker
                  v-model="searchModel.endDate"
                  :placeholder="t('common.endDate')"
                />
              </li>
              <li>
                <p>
                  {{ t("07.surveySatisfile.callSurvey.field3") }}
                </p>
                <InputBase
                  :id="'regBy'"
                  name="'regBy'"
                  v-model="searchModel.regBy"
                />
              </li>
            </ul>
          </div>
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

      <div class="box dp_block">
        <div class="box_section">
          <GridComponentV2
            v-if="isOpen"
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
          </GridComponentV2>
        </div>
      </div>
      <div class="dp_flex btn_group btn_end" style="gap: 10px">
        <button
          type="button"
          class="btn_round btn_xs btn_white"
          @click="onClose()"
        >
          {{ t("07.surveySatisfile.callSurvey.button3") }}
        </button>
      </div>
    </template>
  </TModal>
</template>

<script lang="ts">
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
  FORMAT_YYY_MM_DD,
} from "../../../constants/screen.const";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import {
  SurveyInSchoolListPopupModel,
  SurveyInSchoolSearchPopupModel,
} from "../../../stores/survey/inSchool/surveyInSchool.type";
import {
  getPagePopup,
  selectCallSurvey,
} from "../../../stores/survey/inSchool/surveyInSchool.service";
import { commonStore } from "../../../stores/common";
import { format } from "date-fns";

export default {
  name: "ModalForm",
  components: {
    GridComponentV2,
    ButtonGridComponent,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      dataDetail: {},
      isLoad: false,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      data: [],
      columnDefs: [
        { headerName: this.t("common.rowNum"), field: "rowNumb", flex: 0.5 },
        {
          headerName: this.t("07.surveySatisfile.callSurvey.table1"),
          field: "diagNm",
        },
        {
          headerName: this.t("07.surveySatisfile.callSurvey.table2"),
          field: "diagDurStr",
          cellStyle: { textAlign: "center" },
          flex: 1.5,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} - ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t("07.surveySatisfile.callSurvey.table3"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t("07.surveySatisfile.callSurvey.table4"),
          field: "regBy",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t("07.surveySatisfile.callSurvey.table5"),
          field: "code",
          cellRenderer: ButtonGridComponent,
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
            value: this.t("07.surveySatisfile.callSurvey.table6"),
          },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      ],
      searchModel: {} as SurveyInSchoolSearchPopupModel,
      rowData: [] as Array<SurveyInSchoolListPopupModel>,
      totalRows: 0,
      key: 1,
    };
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  beforeMount() {
    this.reset();
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        this.rowData = [];
      }
    },
  },
  methods: {
    reset() {
      this.searchModel = {};
    },
    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPagePopup(this.searchModel)
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
      this.searchModel.size = pageSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getDataPage();
    },
    handleCustomClick(data: SurveyInSchoolListPopupModel) {
      this.$swal({
        text: this.t("07.surveySatisfile.callSurvey.messageConfirm"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.handleChooseSurvey(data);
        }
      });
    },
    handleChooseSurvey(data: SurveyInSchoolListPopupModel) {
      this.cmn.setLoading(true);
      selectCallSurvey({ diagSeq: data.diagSeq }).then((res) => {
        this.$emit("select-item", res.data.data);
        this.cmn.setLoading(false);
        this.onClose();
      });
    },
  },
};
</script>
