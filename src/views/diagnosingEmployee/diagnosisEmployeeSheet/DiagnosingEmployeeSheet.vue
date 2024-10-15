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
                  {{
                    t("07.diagnosingEmployee.diagnosisSheet.titleSearch.name")
                  }}
                </p>
                <InputBase
                  :id="'surveyName'"
                  :name="'surveyName'"
                  :mode="'show'"
                  v-model="searchModel.surveyNm"
                ></InputBase>
              </li>
              <li>
                <p class="ta_c">
                  {{
                    t(
                      "07.diagnosingEmployee.diagnosisSheet.titleSearch.idTeacher"
                    )
                  }}
                </p>
                <InputBase
                  :id="'regId'"
                  :name="'regId'"
                  :mode="'show'"
                  v-model="searchModel.regId"
                ></InputBase>
              </li>
              <li>
                <p class="ta_c">
                  {{
                    t("07.diagnosingEmployee.diagnosisSheet.titleSearch.useYn")
                  }}
                </p>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  v-model="searchModel.useYn"
                  :data="listUseYn"
                >
                </SelectBoxBase>
              </li>
            </ul>
            <ul>
              <li>
                <p class="ta_c">
                  {{
                    t("07.diagnosingEmployee.diagnosisSheet.titleSearch.status")
                  }}
                </p>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  v-model="searchModel.statusCode"
                  :data="listStatus"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p class="ta_c">
                  {{
                    t("07.diagnosingEmployee.diagnosisSheet.titleSearch.date")
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
      <div class="box dp_block">
        <div class="box_section">
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
          >
            <template #button>
              <div class="search_btnarea">
                <button
                  type="button"
                  class="button btn_xs btn_blue btn_responsive"
                  @click="register()"
                >
                  {{ t("07.diagnosingEmployee.button.register1") }}
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
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import { SCREEN } from "../../../router/screen";
import {
  MESSAGE_ERROR_API,
  UP_CD_ID_STS_CD,
  UP_CD_ID_USE_YN,
} from "@/constants/common.const";
import { commonStore } from "../../../stores/common";
import { useI18n } from "vue-i18n";
import { SearchModel } from "../../../stores/diagnosisEmployee/diagnosisEmployeeSurvey/diagnosisEmployeeSurvey.type";
import { getAll } from "../../../stores/diagnosisEmployee/diagnosisEmployeeSurvey/diagnosisEmployeeSurvey.service";
import { format } from "date-fns";
import { getListCodeMng } from "../../../stores/common/codeMng/codeMng.service";

export default defineComponent({
  components: { Breadcrumb, LinkGridComponent },
  setup() {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
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
      searchModel: {} as SearchModel,
      totalRows: null,
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
      pageTitle: this.t("07.diagnosingEmployee.diagnosisSheet.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t(
            "07.diagnosingEmployee.diagnosisSheet.table.rowNum"
          ),
          field: "rowNumber",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.diagnosingEmployee.diagnosisSheet.table.name"),
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
          headerName: this.t(
            "07.diagnosingEmployee.diagnosisSheet.table.idTeacher"
          ),
          field: "regId",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
        {
          headerName: this.t(
            "07.diagnosingEmployee.diagnosisSheet.table.useYn"
          ),
          field: "useYn",
          cellStyle: { textAlign: "center" },
          flex: 0.6,
        },
        {
          headerName: this.t(
            "07.diagnosingEmployee.diagnosisSheet.table.status"
          ),
          field: "statusCode",
          cellStyle: { textAlign: "center" },
          flex: 0.7,
        },
        {
          headerName: this.t("07.diagnosingEmployee.diagnosisSheet.table.date"),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.6,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [],
      key: 1,
      id: "",
    };
  },
  beforeMount() {
    this.getListCode();
    this.reset()
  },
  methods: {
    reset() {
      this.searchModel = {};
      this.searchModel.surveyNm = "";
      this.searchModel.regId = "";
      this.searchModel.useYn = "";
      this.searchModel.statusCode = "";
      this.searchModel.startDate = "";
      this.searchModel.endDate = "";
    },
    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    getListCode() {
      getListCodeMng({
        upCdIdList: [UP_CD_ID_USE_YN, UP_CD_ID_STS_CD],
      }).then((res: any) => {
        if (res.status === SUCCSESS_STATUS) {
          res.data.data.forEach((item) => {
            if (item.upCdId === UP_CD_ID_USE_YN) {
              this.listUseYn.push(item);
            }
            if (item.upCdId === UP_CD_ID_STS_CD) {
              this.listStatus.push(item);
            }
          });
        }
      });
    },
    getAll() {
      this.store.setLoading(true);
      getAll(this.searchModel)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRows = res.data.data.totalElements;
            this.rowData = res.data.data.content.map((item) => {
              item.regDate = format(item.regDate, FORMAT_YYY_MM_DD);
              this.id = item.surveySeq;
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
    register() {
      this.$router.push({
        name: SCREEN.diagnosingEmployeeSheetCrud.name,
        params: { mode: MODE_CREATE },
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.diagnosingEmployeeSheetCrud.name,
        params: { mode: MODE_DETAIL },
        state: { id: data.surveySeq },
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
