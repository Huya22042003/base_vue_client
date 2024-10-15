<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("07.coreCompetencyDiagnosis.name") }}</p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  v-model="diagCoreAbilitySearchModel.diagNm"
                ></InputBase>
              </li>
              <li class="li__search__custom">
                <p class="ta_c">
                  {{ t("07.coreCompetencyDiagnosis.multiLanguageYn") }}
                </p>
                <RadiobuttonBase
                  v-for="item in listLanguageYn"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'multiLanguageYn' + item.cdId"
                  :name="'multiLanguageYn' + item.cdId"
                  :key="'multiLanguageYn' + item.cdId"
                  :checked="
                    item.cdId == diagCoreAbilitySearchModel.multiLanguage
                  "
                  :label="item.cdNm"
                  v-model="diagCoreAbilitySearchModel.multiLanguage"
                >
                </RadiobuttonBase>
              </li>
              <li>
                <p class="ta_c">{{ t("07.coreCompetencyDiagnosis.status") }}</p>
                <RadiobuttonBase
                  v-for="item in listStatus"
                  :mode="'show'"
                  :value="item.cdId"
                  :id="'showYn' + item.cdId"
                  :name="'showYn' + item.cdId"
                  :key="'showYn' + item.cdId"
                  v-model="diagCoreAbilitySearchModel.stsCd"
                  :checked="item.cdId == diagCoreAbilitySearchModel.stsCd"
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </li>
            </ul>
            <ul>
              <li>
                <p>{{ t("07.coreCompetencyDiagnosis.dateCoreComp") }}</p>
                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    v-model="diagCoreAbilitySearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="diagCoreAbilitySearchModel.endDate"
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
                  @click="gotoRegister"
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
  MODE_CREATE,
  MODE_DETAIL,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  TYPE_EVENT,
  FORMAT_YYY_MM_DD,
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { SCREEN } from "../../../router/screen";
import {
  STATUS_NO,
  STATUS_YES,
  UP_CD_ID_MULTI_LANG_USE_YN,
  UP_CD_ID_SHOW_YN,
} from "../../../constants/common.const";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service.ts";
import {
  DiagCoreAbilitySearchModel,
  DiagCoreAbilityListModel,
} from "../../../stores/coreCompetencyDiagnosis/coreCompetencyDiagnosis/coreCompetencyDiagnosis.type.ts";
import { getPage } from "../../../stores/coreCompetencyDiagnosis/coreCompetencyDiagnosis/coreCompetencyDiagnosis.service.ts";
import { format } from "date-fns";
import { commonStore } from "../../../stores/common";
import Swal from "sweetalert2";

export default defineComponent({
  name: "CoreComDiagList",
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
    "diagCoreAbilitySearchModel.startDate"(newValue) {
      if (!this.diagCoreAbilitySearchModel.endDate) {
        this.diagCoreAbilitySearchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.diagCoreAbilitySearchModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagCoreAbilitySearchModel.startDate =
              this.diagCoreAbilitySearchModel.endDate;
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
    "diagCoreAbilitySearchModel.endDate"(newValue) {
      if (!this.diagCoreAbilitySearchModel.startDate) {
        this.diagCoreAbilitySearchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(
          this.diagCoreAbilitySearchModel.startDate
        );
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagCoreAbilitySearchModel.endDate =
              this.diagCoreAbilitySearchModel.startDate;
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
      selectShowYn: "",
      selectLanguageYn: "",
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
      pageTitle: this.t("07.coreCompetencyDiagnosis.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t("07.coreCompetencyDiagnosis.rowNum"),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosis.yearSemester"),
          field: "year",
          cellStyle: { textAlign: "center" },
          flex: 0.8,
          cellRenderer: (params: any) => {
            return `<span>${params.data.year} - ${params.data.termCd}</span>`;
          },
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosis.name"),
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
          headerName: this.t("07.coreCompetencyDiagnosis.dateCoreComp"),
          field: "diagDurStr",
          cellStyle: { textAlign: "center" },
          flex: 1.5,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} - ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosis.status"),
          field: "stsCd",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosis.multiLanguageYn"),
          field: "multiLangUseYn",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosis.quantityObject"),
          field: "quantityTarget",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
        {
          headerName: this.t("07.coreCompetencyDiagnosis.createdDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<DiagCoreAbilityListModel>,
      diagCoreAbilitySearchModel: {} as DiagCoreAbilitySearchModel,
      key: 1,
      statusYes: STATUS_YES,
      statusNo: STATUS_NO,
      totalRows: 0,
    };
  },
  beforeMount() {
    this.reset();
    this.getCodeMultiLanguage();
    this.getCodeShowYn();
  },
  methods: {
    reset() {
      this.diagCoreAbilitySearchModel.diagNm = "";
      this.diagCoreAbilitySearchModel.multiLanguage = "";
      this.diagCoreAbilitySearchModel.stsCd = "";
      this.diagCoreAbilitySearchModel.startDate = null;
      this.diagCoreAbilitySearchModel.endDate = null;
      this.diagCoreAbilitySearchModel.sort = "";
      this.diagCoreAbilitySearchModel.size = PAGINATION_PAGE_SIZE;
    },
    search() {
      this.diagCoreAbilitySearchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPage(this.diagCoreAbilitySearchModel)
        .then(
          (res) => {
            this.rowData = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
            console.log(this.rowData);
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
      this.diagCoreAbilitySearchModel.size = pageSize;
      this.diagCoreAbilitySearchModel.page = pageNumber;
      this.diagCoreAbilitySearchModel.sort = "";
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
    getCodeShowYn() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SHOW_YN }).then((response) => {
        response.data.data.forEach((item) => {
          this.listStatus.push(item);
        });
      });
    },
    gotoRegister() {
      this.$router.push({
        name: SCREEN.coreCompetencyDiagnosisCrud.name,
        params: { mode: MODE_CREATE },
        state: { id: "" },
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.coreCompetencyDiagnosisCrud.name,
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
