<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p class="ta_c">
                  {{ t("07.basicAcademicDiagnosisSheet.name") }}
                </p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  v-model="baseLearnSurveySearchModel.surveyNm"
                ></InputBase>
              </li>
              <li>
                <p class="ta_c">
                  {{ t("07.basicAcademicDiagnosisSheet.createdBy") }}
                </p>
                <InputBase
                  :id="'createdBy'"
                  :name="'createdBy'"
                  v-model="baseLearnSurveySearchModel.regBy"
                ></InputBase>
              </li>
              <li>
                <p class="ta_c">
                  {{ t("07.basicAcademicDiagnosisSheet.useYn") }}
                </p>
                <SelectBoxBase
                  :id="'useYn'"
                  :name="'useYn'"
                  :data="listUseYn"
                  v-model="baseLearnSurveySearchModel.useYn"
                ></SelectBoxBase>
              </li>
            </ul>
            <ul>
              <li>
                <p class="ta_c">
                  {{ t("07.basicAcademicDiagnosisSheet.status") }}
                </p>
                <SelectBoxBase
                  :id="'status'"
                  :name="'status'"
                  v-model="baseLearnSurveySearchModel.stsCd"
                  :data="listStatus"
                ></SelectBoxBase>
              </li>
              <li>
                <p class="ta_c">
                  {{ t("07.basicAcademicDiagnosisSheet.createdDate") }}
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
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { SCREEN } from "../../../router/screen";
import {
  UP_CD_ID_STS_CD,
  UP_CD_ID_USE_YN,
} from "../../../constants/common.const";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
import { BaseLearnSurveySearchModel } from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosisSheet/basicAcademicDiagnosisSheet.type";
import { BaseLearnSurveyListModel } from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosisSheet/basicAcademicDiagnosisSheet.type";
import { commonStore } from "../../../stores/common";
import { getPageBaseLearnSurvey } from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosisSheet/basicAcademicDiagnosisSheet.service";
import { format } from "date-fns";

export default defineComponent({
  name: "basicAcademicDiagnosisSheetList",
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
    "baseLearnSurveySearchModel.startDate"(newValue) {
      if (!this.baseLearnSurveySearchModel.endDate) {
        this.baseLearnSurveySearchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.baseLearnSurveySearchModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.baseLearnSurveySearchModel.startDate =
              this.baseLearnSurveySearchModel.endDate;
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
    "baseLearnSurveySearchModel.endDate"(newValue) {
      if (!this.baseLearnSurveySearchModel.startDate) {
        this.baseLearnSurveySearchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(
          this.baseLearnSurveySearchModel.startDate
        );
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.baseLearnSurveySearchModel.endDate =
              this.baseLearnSurveySearchModel.startDate;
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
      selectUseYn: "",
      selectLanguageYn: "",
      selectStatus: "",
      listUseYn: [
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
      pageTitle: this.t("07.basicAcademicDiagnosisSheet.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t("common.rowNum"),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosisSheet.name"),
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
          flex: 1.5,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosisSheet.createdBy"),
          field: "regBy",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosisSheet.useYn"),
          field: "useYn",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosisSheet.status"),
          field: "stsCd",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosisSheet.createdDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<BaseLearnSurveyListModel>,
      baseLearnSurveySearchModel: {} as BaseLearnSurveySearchModel,
      totalRows: 0,
      key: 1,
    };
  },
  beforeMount() {
    this.baseLearnSurveySearchModel.stsCd = "";
    this.baseLearnSurveySearchModel.useYn = "";
    this.getCodeStsCd();
    this.getCodeUseYn();
  },
  methods: {
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    reset() {
      this.baseLearnSurveySearchModel = {
        stsCd: "",
        useYn: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      };
    },
    search() {
      this.baseLearnSurveySearchModel.page = 1;
      this.key++;
    },
    getData() {
      this.cmn.setLoading(true);
      getPageBaseLearnSurvey(this.baseLearnSurveySearchModel)
        .then(
          (res) => {
            this.rowData = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
            this.rowData.forEach((item: any) => {
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
      this.baseLearnSurveySearchModel.size = pageSize;
      this.baseLearnSurveySearchModel.page = pageNumber;
      this.baseLearnSurveySearchModel.sort = "";
      this.getData();
    },
    getCodeUseYn() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_USE_YN }).then((response: any) => {
        response.data.data.forEach((item: any) => {
          this.listUseYn.push(item);
        });
      });
    },
    getCodeStsCd() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_STS_CD }).then((response: any) => {
        response.data.data.forEach((item: any) => {
          this.listStatus.push(item);
        });
      });
    },
    gotoRegister() {
      this.$router.push({
        name: SCREEN.basicAcademicDiagnosisSheetCrud.name,
        params: { mode: MODE_CREATE },
        state: {
          id: "",
        },
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.basicAcademicDiagnosisSheetCrud.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.surveySeq,
        },
      });
    },
  },
});
</script>
