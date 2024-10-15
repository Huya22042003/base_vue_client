<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("07.basicAcademicDiagnosis.name") }}</p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  :mode="'show'"
                  v-model="diagBaseLearnSearchModel.diagNm"
                ></InputBase>
              </li>
              <li>
                <p>{{ t("07.basicAcademicDiagnosis.status") }}</p>
                <SelectBoxBase
                  :id="'showYn'"
                  :name="'showYn'"
                  :data="listShowYn"
                  v-model="diagBaseLearnSearchModel.stsCd"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("07.basicAcademicDiagnosis.dateCoreComp") }}</p>
                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    v-model="diagBaseLearnSearchModel.startDate"
                    :placeholder="t('common.startDate')"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    v-model="diagBaseLearnSearchModel.endDate"
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
  STATUS_NO,
  STATUS_YES,
  UP_CD_ID_SHOW_YN,
} from "../../../constants/common.const";
import {
  DiagBaseLearnListModel,
  DiagBaseLearnSearchModel,
} from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosis/basicAcademicDiagnosis.type";
import { getPageDiagBaseLearn } from "@/stores/basicAcademicDiagnosis/basicAcademicDiagnosis/basicAcademicDiagnosis.service";
import { commonStore } from "../../../stores/common";
import { format } from "date-fns";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";

export default defineComponent({
  name: "BasicAcademicDiagList",
  components: { Breadcrumb, LinkGridComponent, BaseDatePicker },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
    "diagBaseLearnSearchModel.startDate"(newValue) {
      if (!this.diagBaseLearnSearchModel.endDate) {
        this.diagBaseLearnSearchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.diagBaseLearnSearchModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagBaseLearnSearchModel.startDate =
              this.diagBaseLearnSearchModel.endDate;
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
    "diagBaseLearnSearchModel.endDate"(newValue) {
      if (!this.diagBaseLearnSearchModel.startDate) {
        this.diagBaseLearnSearchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(this.diagBaseLearnSearchModel.startDate);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagBaseLearnSearchModel.endDate =
              this.diagBaseLearnSearchModel.startDate;
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
      statusYes: STATUS_YES,
      statusNo: STATUS_NO,
      listShowYn: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      pageTitle: this.t("07.basicAcademicDiagnosis.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t("common.rowNum"),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosis.yearSemester"),
          field: "yearSemester",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
          cellRenderer: (params: any) => {
            return `<span>${params.data.year} - ${params.data.termCd}</span>`;
          },
        },
        {
          headerName: this.t("07.basicAcademicDiagnosis.name"),
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
            onCustomEvent: this.handleCustomClick,
          },
          flex: 1.5,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosis.dateCoreComp"),
          field: "dateCoreComp",
          cellStyle: { textAlign: "center" },
          flex: 1.25,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} - ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t("07.basicAcademicDiagnosis.status"),
          field: "stsCd",
          cellStyle: { textAlign: "center" },
          flex: 0.6,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosis.quantityObject"),
          field: "quantityTarget",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
        {
          headerName: this.t("07.basicAcademicDiagnosis.createdDate"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.7,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<DiagBaseLearnListModel>,
      diagBaseLearnSearchModel: {} as DiagBaseLearnSearchModel,
      key: 1,
      totalRows: 0,
    };
  },
  beforeMount() {
    this.diagBaseLearnSearchModel.stsCd = "";
    this.reset();
    this.getCodeShowYn();
  },
  methods: {
    reset() {
      this.diagBaseLearnSearchModel = { stsCd: "" };
    },
    getDataPage() {
      this.cmn.setLoading(true);
      getPageDiagBaseLearn(this.diagBaseLearnSearchModel)
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
      this.diagBaseLearnSearchModel.size = pageSize;
      this.diagBaseLearnSearchModel.page = pageNumber;
      this.diagBaseLearnSearchModel.sort = "";
      this.getDataPage();
    },
    search() {
      this.diagBaseLearnSearchModel.page = 1;
      this.key++;
    },
    getCodeShowYn() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SHOW_YN }).then((response) => {
        response.data.data.forEach((item) => {
          this.listShowYn.push(item);
        });
      });
    },
    gotoRegister() {
      this.$router.push({
        name: SCREEN.basicAcademicDiagnosisCrud.name,
        params: { mode: MODE_CREATE },
        state: {
          id: "",
        },
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.basicAcademicDiagnosisCrud.name,
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
