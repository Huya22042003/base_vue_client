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
                <p>{{ t("10.historyLogin.searchBox.time") }}</p>
                <div class="search_flex" style="position: relative">
                  <BaseDatePicker :placeholder="'시작일'" v-model="startDate" />
                  <span>~</span>
                  <BaseDatePicker :placeholder="'종료일'" v-model="endDate" />
                </div>
              </li>
              <li>
                <p>{{ t("10.historyLogin.searchBox.role") }}</p>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  :data="listRole"
                  v-model="searchModel.authority"
                ></SelectBoxBase>
              </li>
              <li>
                <p>{{ t("10.historyLogin.searchBox.id") }}</p>
                <InputBase :id="'id'" v-model="searchModel.id" />
              </li>
              <li>
                <p>{{ t("10.historyLogin.searchBox.name") }}</p>
                <InputBase :id="'name'" v-model="searchModel.name" />
              </li>
              <li>
                <p>{{ t("10.historyLogin.searchBox.ipLogin") }}</p>
                <InputBase :id="'ipLogin'" v-model="searchModel.ipAccess" />
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                class="button btn_xl btn_blue btn_responsive"
                @click="searchClick()"
              >
                {{ t("common.search") }}
              </button>
              <button
                class="button btn_xl btn_gray btn_responsive"
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
import { defineComponent, ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import InputBase from "@/components/common/input/InputBase.vue";

import type {
  CodeMngResModel,
  CodeMngModel,
} from "@/stores/common/codeMng/codeMng.type";

import type {
  LoginHisSearchModel,
  LoginHisResModel,
  ListRole,
} from "@/stores/loginHistory/loginHistory.type";
import {
  getListData,
  getListRole,
} from "@/stores/loginHistory/loginHistory.service";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import Swal from "sweetalert2";
import {
  FORMAT_YYY_MM_DD,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import type { ExcelData } from "../../stores/common/excel/excelData.type";

export default defineComponent({
  components: {
    LinkGridComponent,
  },
  setup: () => {
    const cmn = commonStore();
    const { t } = useI18n();
    const searchModel = ref<LoginHisSearchModel>({
      authority: "",
    });
    return {
      t,
      cmn,
      searchModel,
    };
  },
  data() {
    return {
      pageTitle: this.t("10.historyLogin.title"),
      rowData: [] as Array<LoginHisResModel>,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listCode: {
        upCdIdList: [],
      } as CodeMngResModel,
      key: 1,
      totalRows: 0,
      startDate: "",
      endDate: "",
      columnDefs: ref([
        {
          headerName: this.t("common.rowNum"),
          field: "rowNum",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("10.historyLogin.table.dateLogin"),
          field: "loginDate",
          flex: 5,
        },
        {
          headerName: this.t("10.historyLogin.table.role"),
          field: "roleInfo",
          cellStyle: { textAlign: "center" },
          flex: 4,
        },
        {
          headerName: this.t("10.historyLogin.table.id"),
          field: "slId",
          cellStyle: { textAlign: "center" },
          flex: 5,
        },
        {
          headerName: this.t("10.historyLogin.table.name"),
          field: "userNm",
          cellStyle: { textAlign: "center" },
          flex: 3,
        },
        {
          headerName: this.t("10.historyLogin.table.ipLogin"),
          field: "loginIp",
          cellStyle: { textAlign: "center" },
          flex: 4,
        },
        {
          headerName: this.t("10.historyLogin.table.succsessYn"),
          field: "loginYn",
          cellStyle: { textAlign: "center" },
          flex: 3,
        },
        {
          headerName: this.t("10.historyLogin.table.browserInfo"),
          field: "browserInfo",
          cellStyle: { textAlign: "center" },
          flex: 4,
        },
        {
          headerName: this.t("10.historyLogin.table.osInfo"),
          field: "connOs",
          cellStyle: { textAlign: "center" },
          flex: 3,
        },
      ]),
      listData: [],
      listYear: [],
      listYearLearn: [],
      listStatus: [],
      searchModel: {
        authority: "",
      } as LoginHisSearchModel,
      roleOb: {} as ListRole,
      firstItemRole: { cdId: "", cdNm: "전체" } as ListRole,
      listRole: [],
      nameOfbtn: "엑셀 다운로드",
      fileNameExport: "HistoryLogin",
    };
  },
  beforeMount() {
    this.getRole();
  },
  methods: {
    searchClick() {
      this.searchModel.page = 1;
      this.key++;
    },
    async getData() {
      this.searchModel.strDate = this.startDate;
      this.searchModel.endDate = this.endDate;
      this.cmn.setLoading(true);
      await getListData(this.searchModel)
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
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getData();
    },

    reset() {
      this.startDate = "";
      this.endDate = "";
      this.searchModel.id = "";
      this.searchModel.name = "";
      this.searchModel.ipAccess = "";
      this.searchModel.authority = "";
    },
    async getRole() {
      this.cmn.setLoading(true);
      await getListRole()
        .then((res) => {
          for (let index = 0; index < res.data.data.length; index++) {
            let newRole: ListRole = {
              cdId: res.data.data[index].rlNm,
              cdNm: res.data.data[index].rlNm,
            };
            this.listRole.push(newRole);
          }
          this.listRole.unshift(this.firstItemRole);
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    handClickExport() {
      let rowExcel = [] as Array<Array<any>>;
      let rowExcelHeader = [] as Array<any>;
      this.columnDefs.forEach((el) => {
        rowExcelHeader.push(el.headerName);
      });
      this.rowData.forEach((el) => {
        let colExcel = [] as Array<any>;
        colExcel.push(el.rowNum);
        colExcel.push(el.loginDate);
        colExcel.push(el.roleInfo);
        colExcel.push(el.slId);
        colExcel.push(el.userNm);
        colExcel.push(el.loginIp);
        colExcel.push(el.loginYn);
        colExcel.push(el.browserInfo);
        colExcel.push(el.connOs);
        rowExcel.push(colExcel);
      });
      return [
        { sheetName: "sheet1", data: rowExcel, header: rowExcelHeader },
      ] as Array<ExcelData>;
    },
  },
});
</script>
