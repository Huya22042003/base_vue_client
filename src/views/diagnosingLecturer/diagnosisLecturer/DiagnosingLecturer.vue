<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>
                  {{ t("07.diagnosingLecturer.diagnosis.titleSearch.name") }}
                </p>
                <InputBase
                  :id="'name'"
                  :name="'name'"
                  :mode="'show'"
                  v-model="searchModel.diagNm"
                ></InputBase>
              </li>
              <li>
                <p>
                  {{ t("07.diagnosingLecturer.diagnosis.titleSearch.status") }}
                </p>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="listStatus"
                  v-model="searchModel.stsCd"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("07.diagnosingLecturer.diagnosis.titleSearch.date") }}
                </p>

                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    :placeholder="t('common.startDate')"
                    v-model="searchModel.diagDurStr"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    :placeholder="t('common.endDate')"
                    v-model="searchModel.diagDurEnd"
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
                  class="button btn_xs btn_blue btn_responsive bo_rd"
                  @click="register()"
                >
                  {{ t("07.diagnosingLecturer.button.register2") }}
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
import { useI18n } from "vue-i18n";
import { commonStore } from "../../../stores/common";
import { SearchModel } from "../../../stores/profAbilityLecturer/profAbilityLecturers/ProfAbilityLecturer.type";
import { getAll } from "../../../stores/profAbilityLecturer/profAbilityLecturers/profAbilityLecurer.service";
import { format } from "date-fns";
import { MESSAGE_ERROR_API, UP_CD_ID_SHOW_YN } from "@/constants/common.const";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";

export default defineComponent({
  components: { Breadcrumb, LinkGridComponent },
  setup() {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  watch: {
    "searchModel.diagDurStr"(newValue) {
      if (!this.searchModel.diagDurEnd) {
        this.searchModel.diagDurStr = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.searchModel.diagDurEnd);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.searchModel.diagDurStr = this.searchModel.diagDurEnd;
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
    "searchModel.diagDurEnd"(newValue) {
      if (!this.searchModel.diagDurStr) {
        this.searchModel.diagDurEnd = newValue;
      } else {
        const dStart = this.formatDate(this.searchModel.diagDurStr);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.searchModel.diagDurEnd = this.searchModel.diagDurStr;
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
      selectStatus: "",
      listStatus: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      pageTitle: this.t("07.diagnosingLecturer.diagnosis.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t("07.diagnosingLecturer.diagnosis.table.rowNum"),
          field: "rowNumber",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("07.diagnosingLecturer.diagnosis.table.eduYear"),
          field: "diagYearTerm",
          cellStyle: { textAlign: "center" },
          flex: 0.7,
        },
        {
          headerName: this.t("07.diagnosingLecturer.diagnosis.table.name"),
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
          headerName: this.t(
            "07.diagnosingLecturer.diagnosis.table.diagnosisTime"
          ),
          cellStyle: { textAlign: "center" },
          flex: 1,
          cellRenderer: (params: any) => {
            return `<span>${params.data.diagDurStr} ~ ${params.data.diagDurEnd}</span>`;
          },
        },
        {
          headerName: this.t("07.diagnosingLecturer.diagnosis.table.status"),
          field: "stsCd",
          cellStyle: { textAlign: "center" },
          flex: 0.6,
        },
        {
          headerName: this.t("07.diagnosingLecturer.diagnosis.table.target"),
          field: "quantityTarget",
          cellStyle: { textAlign: "center" },
          flex: 0.7,
        },
        {
          headerName: this.t(
            "07.diagnosingLecturer.diagnosis.table.createdDate"
          ),
          field: "regDate",
          cellStyle: { textAlign: "center" },
          flex: 0.75,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [],
      key: 1,
    };
  },
  beforeMount() {
    this.searchModel.diagNm = "";
    this.searchModel.stsCd = "";
    this.searchModel.diagDurStr = "";
    this.searchModel.diagDurEnd = "";
    this.getCodeStatus();
  },
  methods: {
    reset() {
      this.searchModel = {};
      this.searchModel.stsCd = "";
    },
    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    getCodeStatus() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SHOW_YN }).then((res: any) => {
        if (res.status === SUCCSESS_STATUS) {
          res.data.data.forEach((item) => {
            this.listStatus.push(item);
          });
        }
      });
    },
    getPage() {
      this.store.setLoading(true);
      getAll(this.searchModel)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRows = res.data.data.totalElements;
            this.rowData = res.data.data.content.map((item) => {
              item.regDate = format(item.regDate, FORMAT_YYY_MM_DD);
              item.diagDurStr = format(item.diagDurStr, FORMAT_YYY_MM_DD);
              item.diagDurEnd = format(item.diagDurEnd, FORMAT_YYY_MM_DD);
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
      this.getPage();
    },
    register() {
      this.$router.push({
        name: SCREEN.diagnosingLecturerCrud.name,
        params: { mode: MODE_CREATE },
      });
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.diagnosingLecturerCrud.name,
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
