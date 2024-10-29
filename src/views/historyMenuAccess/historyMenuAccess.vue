<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
          :pageTitle="pageTitle"
          :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>{{ t("10.historyMenuAccess.searchBox.time") }}</p>
                <div class="search_flex" style="position: relative">
                  <BaseDatePicker :placeholder="this.t('10.historyMenuAccess.searchBox.startDate')" v-model="strDate" />
                  <span>~</span>
                  <BaseDatePicker :placeholder="this.t('10.historyMenuAccess.searchBox.endDate')" v-model="endDate" />
                </div>
              </li>
              <li>
                <p>{{ t("10.historyMenuAccess.searchBox.user") }}</p>
                <InputBase class="form_style" :id="'userId'" v-model="hisMenuAccessRequest.user" />
              </li>
              <li>
                <p>{{ t("10.historyMenuAccess.searchBox.name") }}</p>
                <InputBase class="form_style" :id="'name'" v-model="hisMenuAccessRequest.name" />
              </li>
              <li>
                <p>{{ t("10.historyMenuAccess.searchBox.menuNm") }}</p>
                <InputBase class="form_style" :id="'menuNm'" v-model="hisMenuAccessRequest.menuNm" />
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                  class="button btn_lg btn_blue btn_responsive"
                  @click="searchClick()"
              >
                {{ t("common.search") }}
              </button>
              <button
                  class="button btn_lg btn_gray btn_responsive"
                  @click="reset()"
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
              ref="gridKey"
              :paginationClientFlag="false"
              @customPagination="fnPagination"
              :totalRecord="totalRows"
              :key="key"
          >
            <template #button>
              <div class="search_btnarea">
                <ExportFileExcel
                    :data="handClickExport()"
                    :fileName="fileNameExport"
                    :btnName="nameOfbtn"
                    @click="handClickExport"
                >
                </ExportFileExcel>
              </div>
            </template>
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import InputBase from "@/components/common/input/InputBase.vue";
import type { HisMenuAccessRequest, HisMenuAccessResponse } from "@/stores/historyMenuAccess/historyMenuAccess.type";
import { getListHisMenuAccess, getDataForDownloadExcel } from "@/stores/historyMenuAccess/historyMenuAccess.service";
import { PAGINATION_PAGE_SIZE, PAGINATION_PAGE_SIZE_SELECTOR } from "@/constants/screen.const";
import type { ExcelData } from "@/stores/common/excel/excelData.type";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import Swal from "sweetalert2";

export default defineComponent({
  components: {
    InputBase,
  },
  data() {
    const cmn = commonStore();
    const { t } = useI18n();

    return {
      t,
      cmn,
      hisMenuAccessRequest: {
        page: 1,
        size: 10,
        sort: ""
      } as HisMenuAccessRequest,

      pageTitle: t("10.historyMenuAccess.title"),

      breadcrumbItems: [
        { label: t("common.home"), link: "/" },
        { label: t("04.eduScheduleCreativeMng.menu"), link: "#" },
      ],

      rowData: [] as Array<HisMenuAccessResponse>,

      rowDataForExcel: [] as Array<HisMenuAccessResponse>,

      paginationPageSize: PAGINATION_PAGE_SIZE,

      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,

      strDate: null,
      endDate: null,

      columnDefs: [
        {
          headerName: t("common.rowNum"),
          field: "rowNumber",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: t("10.historyMenuAccess.table.connDate"),
          field: "connDate",
          flex: 4,
        },
        {
          headerName: t("10.historyMenuAccess.table.userId"),
          field: "userId",
          flex: 3,
        },
        {
          headerName: t("10.historyMenuAccess.table.name"),
          field: "name",
          flex: 4,
        },
        {
          headerName: t("10.historyMenuAccess.table.menuNm"),
          field: "menuNm",
          flex: 5,
        },
        {
          headerName: t("10.historyMenuAccess.table.url"),
          field: "url",
          flex: 5,
        },
      ],

      key: 1,

      totalRows: 0,

      nameOfbtn: t("10.historyMenuAccess.searchBox.excelDownLoad"),

      fileNameExport: "MenuAccessHistory",
    };
  },

  methods: {
    searchClick() {
      this.hisMenuAccessRequest.page = 1;
      this.key++;
    },

    async getData() {
      this.hisMenuAccessRequest.strDate = this.strDate;
      this.hisMenuAccessRequest.endDate = this.endDate;

      this.cmn.setLoading(true);
      await getListHisMenuAccess({ ...this.hisMenuAccessRequest })
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });

      await getDataForDownloadExcel({ ...this.hisMenuAccessRequest })
          .then((res) => {
            this.rowDataForExcel = res.data.data;
          })
          .catch((error) => {
            throw new Error(MESSAGE_ERROR_API);
          })
          .finally(() => {
            this.cmn.setLoading(false);
          });
    },

    fnPagination(pageNumber: any, pagesSize: any) {
      this.hisMenuAccessRequest.size = pagesSize;
      this.hisMenuAccessRequest.page = pageNumber;
      this.hisMenuAccessRequest.sort = "";
      this.getData();
    },

    reset() {
      this.strDate = null;
      this.endDate = null;
      this.hisMenuAccessRequest.strDate = null;
      this.hisMenuAccessRequest.endDate = null;
      this.hisMenuAccessRequest.user = null;
      this.hisMenuAccessRequest.name = null;
      this.hisMenuAccessRequest.menuNm = null;
      this.hisMenuAccessRequest.page = 1;
      this.hisMenuAccessRequest.size = 10;
      this.hisMenuAccessRequest.sort = "";
    },

    handClickExport() {
      let rowExcel = [] as Array<Array<any>>;
      let rowExcelHeader = [] as Array<any>;
      this.columnDefs.forEach((el) => {
        rowExcelHeader.push(el.headerName);
      });
      this.rowDataForExcel.forEach((el) => {
        let colExcel = [] as Array<any>;
        colExcel.push(el.rowNum);
        colExcel.push(el.connDate);
        colExcel.push(el.userId);
        colExcel.push(el.name);
        colExcel.push(el.menuNm);
        colExcel.push(el.url);
        rowExcel.push(colExcel);
      });
      return [
        { sheetName: "sheet1", data: rowExcel, header: rowExcelHeader },
      ] as Array<ExcelData>;
    },

    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },

  watch: {
    strDate(newValue) {
      if (!this.endDate) {
        this.strDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.strDate = this.endDate;
            Swal.fire({
              text: this.t("common.messageCheckDate"),
              type: "warning",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
    endDate(newValue) {
      if (!this.strDate) {
        this.endDate = newValue;
      } else {
        const dStart = this.formatDate(this.strDate);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.endDate = this.strDate;
            Swal.fire({
              text: this.t("common.messageCheckDate"),
              type: "warning",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
  },
});
</script>
