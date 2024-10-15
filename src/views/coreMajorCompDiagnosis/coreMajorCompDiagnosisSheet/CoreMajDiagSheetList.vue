<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("07.coreMajorCompDiagnosisSheet.searchBox.name") }}</p>
                <InputBase
                  :id="'surveyNm'"
                  :name="'surveyNm'"
                  v-model="majorCapaSurveySearchModel.surveyNm"
                ></InputBase>
              </li>
              <!-- <li>
                <p>
                  {{ t("07.coreMajorCompDiagnosisSheet.searchBox.university") }}
                </p>
                <SelectBoxBase
                  :id="'univCd'"
                  :name="'univCd'"
                  :disabled="true"
                  :data="listUniversity"
                  v-model="majorCapaSurveySearchModel.univCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("07.coreMajorCompDiagnosisSheet.searchBox.major") }}</p>
                <SelectBoxBase
                  :id="'deptCd'"
                  :name="'deptCd'"
                  :data="listDepartment"
                  :disabled="true"
                  v-model="majorCapaSurveySearchModel.deptCd"
                ></SelectBoxBase>
              </li> -->
              <li>
                <p>
                  {{ t("07.coreMajorCompDiagnosisSheet.searchBox.languageYn") }}
                </p>
                <SelectBoxBase
                  :id="'multiLangUseYn'"
                  :name="'multiLangUseYn'"
                  :data="listLanguageYn"
                  v-model="majorCapaSurveySearchModel.multiLangUseYn"
                ></SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("07.coreMajorCompDiagnosisSheet.searchBox.createdBy") }}
                </p>
                <InputBase
                  :id="'createdBy'"
                  :name="'createdBy'"
                  :mode="'show'"
                  v-model="majorCapaSurveySearchModel.regBy"
                ></InputBase>
              </li>
              <li>
                <p>
                  {{
                    t("07.coreMajorCompDiagnosisSheet.searchBox.createdDate")
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
            <template #button>
              <div class="btn_group btn_end">
                <button
                  type="button"
                  class="button btn_xs btn_blue btn_responsive"
                  @click="register"
                >
                  {{ t("07.coreCompetencyDiagnosis.btnRegister") }}
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
  TYPE_EVENT,
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { SCREEN } from "../../../router/screen";
import {
  MajorCapaSurveyListModel,
  MajorCapaSurveySearchModel,
} from "../../../stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/coreMajorCompDiagnosisSheet.type";
import { commonStore } from "@/stores/common";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { getPage } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/coreMajorCompDiagnosisSheet.service";
import { format } from "date-fns";
import { UP_CD_ID_MULTI_LANG_USE_YN } from "@/constants/common.const";
import { getDepartmentList } from "@/stores/common/department/department.service";
import {
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
  MESSAGE_ERROR_API,
} from "@/constants/common.const";

export default defineComponent({
  name: "CoreMajDiagSheetList",
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
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
    // "majorCapaSurveySearchModel.univCd"(newValue, oldValue) {
    //   if (newValue) {
    //     this.majorCapaSurveySearchModel.deptCd = "";
    //     this.getListDepartment();
    //   } else {
    //     this.majorCapaSurveySearchModel.deptCd = "";
    //   }
    // },
  },
  data() {
    return {
      modalOpen: false,
      modeScreen: "",
      rowselected: [],
      listLanguageYn: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listStatus: [
        {
          cdId: "total",
          cdNm: this.t("common.all"),
        },
      ],
      // listUniversity: [{ cdId: "", cdNm: this.t("common.all") }],
      // listDepartment: [{ cdId: "", cdNm: this.t("common.all") }],
      pageTitle: this.t("07.coreMajorCompDiagnosisSheet.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t("07.coreMajorCompDiagnosisSheet.table.rowNum"),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisSheet.table.name"),
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
            type: TYPE_EVENT,
            onCustomEvent: this.handleCustomClick,
          },
          flex: 1.75,
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
          headerName: this.t("07.coreMajorCompDiagnosisSheet.table.languageYn"),
          field: "multiLangUseYn",
          cellStyle: { textAlign: "center" },
          flex: 0.6,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisSheet.table.createdBy"),
          field: "regBy",
          cellStyle: { textAlign: "center" },
          flex: 0.85,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosisSheet.table.status"),
          field: "stsCd",
          cellStyle: { textAlign: "center" },
          flex: 0.7,
        },
        {
          headerName: this.t(
            "07.coreMajorCompDiagnosisSheet.table.createdDate"
          ),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<MajorCapaSurveyListModel>,
      majorCapaSurveySearchModel: {} as MajorCapaSurveySearchModel,
      totalRows: 0,
      key: 1,
    };
  },
  beforeMount() {
    this.getCodeMultiLanguage();
    // this.getListUniversity();
    this.reset();
  },
  methods: {
    getCodeMultiLanguage() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_MULTI_LANG_USE_YN }).then(
        (response) => {
          response.data.data.forEach((item) => {
            this.listLanguageYn.push(item);
          });
        }
      );
    },
    // getListUniversity() {
    //   getDepartmentList({
    //     deptCd: [],
    //     deptDivCd: [DIV_CD_DEPT_MAJOR],
    //     upDeptCd: [],
    //     useYn: "",
    //   })
    //     .then((res) => {
    //       res.data.data.forEach((item) => {
    //         if (item.deptDivCd === DIV_CD_DEPT_MAJOR) {
    //           this.listUniversity.push({
    //             cdId: item.deptCd,
    //             cdNm: item.deptNm,
    //           });
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       throw new Error(MESSAGE_ERROR_API);
    //     });
    // },
    // getListDepartment() {
    //   this.cmn.setLoading(true);
    //   getDepartmentList({
    //     deptCd: [],
    //     deptDivCd: [],
    //     upDeptCd: [this.majorCapaSurveySearchModel.univCd],
    //     useYn: "",
    //   })
    //     .then((res) => {
    //       this.listDepartment = [
    //         {
    //           cdId: "",
    //           cdNm: this.t("common.select"),
    //         },
    //       ];
    //       res.data.data.forEach((item) => {
    //         this.listDepartment.push({
    //           cdId: item.deptCd,
    //           cdNm: item.deptNm,
    //         });
    //       });
    //       this.cmn.setLoading(false);
    //     })
    //     .catch(() => {
    //       throw new Error(MESSAGE_ERROR_API);
    //     });
    // },
    reset() {
      this.majorCapaSurveySearchModel.surveyNm = "";
      this.majorCapaSurveySearchModel.multiLangUseYn = "";
      this.majorCapaSurveySearchModel.regBy = "";
      this.majorCapaSurveySearchModel.startDate = null;
      this.majorCapaSurveySearchModel.endDate = null;
    },
    handleSearch() {
      this.key++;
      this.majorCapaSurveySearchModel.page = 1;
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.majorCapaSurveySearchModel.size = pageSize;
      this.majorCapaSurveySearchModel.page = pageNumber;
      this.majorCapaSurveySearchModel.sort = "";
      this.search();
    },
    search() {
      this.cmn.setLoading(true);
      getPage(this.majorCapaSurveySearchModel)
        .then(
          (res) => {
            this.rowData = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
            this.rowData.forEach((item) => {
              item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
            });
          },
          (err) => {}
        )
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    register() {
      this.$router.push({
        name: SCREEN.coreMajorCompDiagnosisSheetCrud.name,
        params: { mode: MODE_CREATE },
        state: {
          id: "",
        },
      });
    },
    handleCustomClick(data: MajorCapaSurveyListModel) {
      this.$router.push({
        name: SCREEN.coreMajorCompDiagnosisSheetCrud.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.surveySeq,
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
