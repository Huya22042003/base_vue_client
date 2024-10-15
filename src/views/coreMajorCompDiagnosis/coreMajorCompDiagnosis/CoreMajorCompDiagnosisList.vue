<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("07.coreMajorCompDiagnosis.searchBox.name") }}</p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  :mode="'show'"
                  v-model="diagMajorCapaSearchModel.diagNm"
                ></InputBase>
              </li>
              <li>
                <p>
                  {{ t("07.coreMajorCompDiagnosis.searchBox.major") }}
                </p>
                <SelectBoxBase
                  :id="'deptCd'"
                  :name="'deptCd'"
                  :data="listDept"
                  :disabled="true"
                  v-model="diagMajorCapaSearchModel.deptCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("07.coreMajorCompDiagnosis.searchBox.languageYn") }}
                </p>
                <SelectBoxBase
                  :id="'languageYn'"
                  :name="'languageYn'"
                  :data="listLanguageYn"
                  v-model="diagMajorCapaSearchModel.multiLanguage"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("07.coreMajorCompDiagnosis.searchBox.status") }}</p>
                <SelectBoxBase
                  :id="'status'"
                  :name="'status'"
                  :data="listStatus"
                  v-model="diagMajorCapaSearchModel.stsCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("07.coreMajorCompDiagnosis.searchBox.time") }}
                </p>

                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    v-model="diagMajorCapaSearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="diagMajorCapaSearchModel.endDate"
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
            <template #button>
              <div class="btn_group btn_end">
                <button
                  type="button"
                  class="button btn_xs btn_blue btn_responsive"
                  @click="register"
                >
                  {{ t("07.coreMajorCompDiagnosis.button.register") }}
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
import { DiagMajorCapaSearchModel } from "../../../stores/coreMajorCompDiagnosis/coreMajorCompDiagnosis/coreMajorCompDiagnosis.type";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import {
  UP_CD_ID_MULTI_LANG_USE_YN,
  UP_CD_ID_SHOW_YN,
} from "@/constants/common.const";
import { getPageDiagMajorCapa } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosis/coreMajorCompDiagnosis.service";
import { format } from "date-fns";
import { commonStore } from "@/stores/common";
import { getDepartmentList } from "@/stores/common/department/department.service";
import {
  DIV_CD_DEPT_DEPART,
  MESSAGE_ERROR_API,
} from "@/constants/common.const";
import { getUserInfo } from "../../../utils/storage";

export default defineComponent({
  name: "CoreCompetencyDiagnosticSheetList",
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      modalOpen: false,
      modeScreen: "",
      rowselected: [],
      diagMajorCapaSearchModel: {} as DiagMajorCapaSearchModel,
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
      pageTitle: this.t("07.coreMajorCompDiagnosisSheet.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t("07.coreMajorCompDiagnosis.table.rowNum"),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosis.table.year"),
          field: "year",
          cellStyle: { textAlign: "center" },
          flex: 0.85,
          cellRenderer: (params: any) => {
            return `<span>${params.data.year} - ${params.data.termCd}</span>`;
          },
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosis.table.name"),
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
          flex: 1.5,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosis.table.major"),
          field: "deptNm",
          flex: 1,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosis.table.time"),
          field: "time",
          cellStyle: { textAlign: "center" },
          flex: 1.5,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} - ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosis.table.languageYn"),
          field: "multiLangUseYn",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosis.table.status"),
          field: "stsCd",
          cellStyle: { textAlign: "center" },
          flex: 0.6,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosis.table.object"),
          field: "quantityTarget",
          cellStyle: { textAlign: "center" },
          flex: 0.6,
        },
        {
          headerName: this.t("07.coreMajorCompDiagnosis.table.regDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [],
      listDept: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      key: 1,
      totalRows: 0,
    };
  },
  watch: {
    "diagMajorCapaSearchModel.startDate"(newValue) {
      if (!this.diagMajorCapaSearchModel.endDate) {
        this.diagMajorCapaSearchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.diagMajorCapaSearchModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagMajorCapaSearchModel.startDate =
              this.diagMajorCapaSearchModel.endDate;
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
    "diagMajorCapaSearchModel.endDate"(newValue) {
      if (!this.diagMajorCapaSearchModel.startDate) {
        this.diagMajorCapaSearchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(this.diagMajorCapaSearchModel.startDate);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagMajorCapaSearchModel.endDate =
              this.diagMajorCapaSearchModel.startDate;
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
    this.getListDeptInfo();
    this.getCodeMultiLanguage();
    this.getCodeShowYn();
    this.reset();
  },
  methods: {
    reset() {
      this.diagMajorCapaSearchModel.diagNm = "";
      this.diagMajorCapaSearchModel.multiLanguage = "";
      this.diagMajorCapaSearchModel.stsCd = "";
      this.diagMajorCapaSearchModel.startDate = null;
      this.diagMajorCapaSearchModel.endDate = null;
      this.diagMajorCapaSearchModel.sort = "";
      this.diagMajorCapaSearchModel.size = PAGINATION_PAGE_SIZE;
    },
    search() {
      this.diagMajorCapaSearchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPageDiagMajorCapa(this.diagMajorCapaSearchModel)
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
      this.diagMajorCapaSearchModel.size = pageSize;
      this.diagMajorCapaSearchModel.page = pageNumber;
      this.diagMajorCapaSearchModel.sort = "";
      this.getDataPage();
    },
    getListDeptInfo() {
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_DEPART],
        upDeptCd: [],
        useYn: "",
      })
        .then((res) => {
          res.data.data.forEach((item) => {
            if (item.deptDivCd === DIV_CD_DEPT_DEPART) {
              this.listDept.push({
                cdId: item.deptCd,
                cdNm: item.deptNm,
              });
            }
          });
          const userInfo = JSON.parse(getUserInfo())
          this.diagMajorCapaSearchModel.deptCd = userInfo.deptCd
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
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
    getCodeShowYn() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SHOW_YN }).then((response) => {
        response.data.data.forEach((item) => {
          this.listStatus.push(item);
        });
      });
    },
    register() {
      this.$router.push({
        name: SCREEN.coreMajorCompDiagnosisCrud.name,
        params: { mode: MODE_CREATE },
        state: {
          id: "",
        },
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.coreMajorCompDiagnosisCrud.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.diagSeq,
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
