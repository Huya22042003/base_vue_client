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
                <p class="ta_c">{{ t("jobAbilityManagement.search1") }}</p>
                <SelectBoxBase
                  id="type"
                  name="type"
                  :data="listCategory"
                  v-model="searchModel.typeCd"
                  @change="handleChangeType(searchModel.typeCd)"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p class="ta_c">{{ t("jobAbilityManagement.search2") }}</p>
                <SelectBoxBase
                  :id="'bigClassCd'"
                  name="'bigClassCd'"
                  :data="listClassLarge"
                  v-model="searchModel.hightCd"
                  @change="
                    handleSelectChange('bigClassCd', searchModel.hightCd)
                  "
                >
                </SelectBoxBase>
              </li>
              <li>
                <p class="ta_c">{{ t("jobAbilityManagement.search3") }}</p>
                <SelectBoxBase
                  :id="'medClassCd'"
                  name="'medClassCd'"
                  :data="listClassMedium"
                  v-model="searchModel.mediumCd"
                  @change="
                    handleSelectChange('medClassCd', searchModel.mediumCd)
                  "
                >
                </SelectBoxBase>
              </li>
              <li>
                <p class="ta_c">{{ t("jobAbilityManagement.search4") }}</p>
                <SelectBoxBase
                  :id="'smallClassCd'"
                  name="'smallClassCd'"
                  :data="listClassSmall"
                  v-model="searchModel.lowCd"
                  @change="
                    handleSelectChange('smallClassCd', searchModel.lowCd)
                  "
                >
                </SelectBoxBase>
              </li>
              <li>
                <p class="ta_c">{{ t("jobAbilityManagement.search5") }}</p>
                <SelectBoxBase
                  :id="'detailClassCd'"
                  name="'detailClassCd'"
                  :data="listClassDetail"
                  v-model="searchModel.detailCd"
                  @change="
                    handleSelectChange('detailClassCd', searchModel.detailCd)
                  "
                >
                </SelectBoxBase>
              </li>
              <li>
                <p class="ta_c">{{ t("jobAbilityManagement.search6") }}</p>
                <InputBase v-model="searchModel.jobAbilNm" />
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="search"
              >
                {{ t("common.search") }}
              </button>
              <button
                type="button"
                class="btn_round btn_lg btn_gray mg_l5"
                @click="reset"
              >
                {{ t("common.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
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
            :newGridOptions="gridOptions"
          >
            <template #button>
              <ExportFileExcel
                :data="dataOutput"
                :fileName="fileNameExport"
                :btnName="nameOfbtn"
                :arrayColor="arrayColor"
                @click="exportExcel"
              >
              </ExportFileExcel>
              <button
                class="btn_round btn_primary btn_md"
                @click="gotoRegister"
              >
                {{ t("jobAbilityManagement.btnRegister") }}
              </button>
            </template>
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import GridComponentV2 from "../../components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import { commonStore } from "../../stores/common";

import {
  MODE_CREATE,
  MODE_DETAIL,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "../../constants/screen.const";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";
import {
  listJob,
  parentList,
  itemList,
  downloadExcel,
} from "@/stores/jobAbilityManagement/jobAbilityManagement.service";
import type {
  SearchData,
  JobAbilityData,
} from "@/stores/jobAbilityManagement/jobAbilityManagement.type";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { KCS_CD_ID, UP_CD_NCS_KCS } from "@/constants/common.const";

export default {
  components: {
    Breadcrumb,
    GridComponentV2,
    LinkGridComponent,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const gridOptions = {
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        resizable: true,
        suppressMovable: true,
      },
      rowSelection: "multiple",
      suppressRowClickSelection: true,
      domLayout: "autoHeight",
    };
    return { t, cmn, gridOptions };
  },
  data() {
    return {
      pageTitle: this.t("jobAbilityManagement.pageTitle"),
      breadcrumbItems: [],
      dataDetail: {},
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<JobAbilityData>,
      searchModel: {
        size: 10,
        page: 1,
        sort: "",
        typeCd: KCS_CD_ID,
        hightCd: "",
        mediumCd: "",
        lowCd: "",
        detailCd: "",
      } as SearchData,

      totalRows: 0,
      key: 1,
      columnDefs: [
        {
          headerName: this.t("common.rowNum"),
          field: "rowNumber",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("jobAbilityManagement.column2"),
          field: "typeCd",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("jobAbilityManagement.column3"),
          field: "dataFomat",
          cellStyle: { textAlign: "center" },
          flex: 3,
        },
        {
          headerName: this.t("jobAbilityManagement.column4"),
          field: "jobAbilCd",
          cellStyle: { textAlign: "center" },
          flex: 1.5,
        },
        {
          headerName: this.t("jobAbilityManagement.column5"),
          field: "jobAbilNm",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleTableClick,
          },
          flex: 1.2,
        },
        {
          headerName: this.t("jobAbilityManagement.column6"),
          field: "lvl",
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("jobAbilityManagement.column7"),
          field: "ver",
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("jobAbilityManagement.column8"),
          field: "learnModuleNm",
          cellStyle: { textAlign: "center" },
        },
      ],
      listCategory: [],
      listClassLarge: [
        {
          cdId: "",
          cdNm: this.t("common.select"),
        },
      ],
      listClassMedium: [
        {
          cdId: "",
          cdNm: this.t("common.select"),
        },
      ],
      listClassSmall: [
        {
          cdId: "",
          cdNm: this.t("common.select"),
        },
      ],
      listClassDetail: [
        {
          cdId: "",
          cdNm: this.t("common.select"),
        },
      ],
      fileNameExport: "JobAbility",
      nameOfbtn: this.t("jobAbilityManagement.btnExcelDowload"),
      arrayColor: [],
      dataOutput: [],
      rowDataAll: [] as Array<JobAbilityData>,
    };
  },
  async beforeMount() {
    this.getCodeType();
    await this.getListParent(KCS_CD_ID);
  },
  methods: {
    async handleSelectChange(selectBoxId: any, selectedValue: any) {
      let selectedItem;
      const defaultItemOne = {
        cdId: "",
        cdNm: "",
      };
      switch (selectBoxId) {
        case "bigClassCd":
          defaultItemOne.cdNm = this.t("common.select");
          this.listClassMedium = [defaultItemOne];
          this.searchModel.mediumCd = "";
          this.searchModel.lowCd = "";
          this.searchModel.detailCd = "";
          selectedItem = this.listClassLarge.find(
            (item) => item.cdId === selectedValue
          );

          if (selectedValue) {
            await this.getListItem(selectedValue, "medium");
          }
          break;

        case "medClassCd":
          defaultItemOne.cdNm = this.t("common.select");
          this.listClassSmall = [defaultItemOne];
          this.searchModel.lowCd = "";
          this.searchModel.detailCd = "";
          selectedItem = this.listClassMedium.find(
            (item) => item.cdId === selectedValue
          );

          if (selectedValue) {
            await this.getListItem(selectedValue, "small");
          }
          break;

        case "smallClassCd":
          defaultItemOne.cdNm = this.t("common.select");
          this.listClassDetail = [defaultItemOne];
          this.searchModel.detailCd = "";
          selectedItem = this.listClassSmall.find(
            (item) => item.cdId === selectedValue
          );

          if (selectedValue) {
            await this.getListItem(selectedValue, "detail");
          }
          break;

        case "detailClassCd":
          defaultItemOne.cdNm = this.t("common.select");
          selectedItem = this.listClassDetail.find(
            (item) => item.cdId === selectedValue
          );
          break;
      }
    },
    async handleChangeType(type: any) {
      const defaultItemOne = {
        cdId: "",
        cdNm: this.t("common.select"),
      };
      this.listClassLarge = [defaultItemOne];
      this.searchModel.hightCd = "";
      if (type) {
        await this.getListParent(type);
      }
    },

    async getListParent(type: any) {
      this.cmn.setLoading(true);
      const res = await parentList(type);
      res.data.data.forEach((element: any) => {
        this.listClassLarge.push({
          cdId: element.jobCapaStndSeq,
          cdNm: element.jobCapaStndNm,
        });
      });
      this.cmn.setLoading(false);
    },
    async getListItem(parentId: any, level: any) {
      this.cmn.setLoading(true);
      let response;
      response = await itemList(parentId);

      response.data.data.forEach((element: any) => {
        if (level === "medium") {
          this.listClassMedium.push({
            cdId: element.jobCapaStndSeq,
            cdNm: element.jobCapaStndNm,
          });
        } else if (level === "small") {
          this.listClassSmall.push({
            cdId: element.jobCapaStndSeq,
            cdNm: element.jobCapaStndNm,
          });
        } else if (level === "detail") {
          this.listClassDetail.push({
            cdId: element.jobCapaStndSeq,
            cdNm: element.jobCapaStndNm,
          });
        }
      });
      this.cmn.setLoading(false);
    },

    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.searchModel.size = pageSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.cmn.setLoading(true);
      listJob(this.searchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
          this.rowData.forEach((item, index) => {
            item.rowNumber = this.totalRows - item.rowNumber + 1;
            item.dataFomat =
              item.hightNo +
              "." +
              item.hightNm +
              ">" +
              item.mediumNo +
              "." +
              item.mediumNm +
              ">" +
              item.lowNo +
              "." +
              item.lowNm +
              ">" +
              item.detailNo +
              "." +
              item.detailNm;
            if (!item.lvl) {
              item.lvl = "없음";
            }
            item.ver = "V" + item.ver;
          });
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    reset() {
      this.searchModel.typeCd = KCS_CD_ID;
      this.searchModel.jobAbilNm = "";
      this.searchModel.hightCd = "";
      this.searchModel.mediumCd = "";
      this.searchModel.lowCd = "";
      this.searchModel.detailCd = "";
    },
    gotoRegister() {
      this.$router.push({
        name: SCREEN.jobAbilityManagementCrud.name,
        params: { mode: MODE_CREATE },
      });
    },
    handleTableClick(data: any) {
      this.$router.push({
        name: SCREEN.jobAbilityManagementCrud.name,
        params: { mode: MODE_DETAIL },
        state: {
          jobAbilSeq: data.jobAbilSeq,
        },
      });
    },
    getCodeType() {
      getCodeMngByUpCdId({ upCdId: UP_CD_NCS_KCS }).then((response: any) => {
        this.listCategory = response.data.data;
      });
    },
    exportExcel() {
      if (this.rowDataAll.length === 0) {
        this.cmn.setLoading(true);
        downloadExcel()
          .then((res) => {
            this.rowDataAll = res.data.data.map(
              (item: any, index: number, arr: any[]) => {
                const dataFormatted =
                  item.hightNo +
                  "." +
                  item.hightNm +
                  ">" +
                  item.mediumNo +
                  "." +
                  item.mediumNm +
                  ">" +
                  item.lowNo +
                  "." +
                  item.lowNm +
                  ">" +
                  item.detailNo +
                  "." +
                  item.detailNm;

                if (!item.lvl) {
                  item.lvl = "없음";
                }
                const rowNumber = arr.length - index;
                return {
                  ...item,
                  dataFomat: dataFormatted,
                  ver: "V" + item.ver,
                  rowNumber: rowNumber,
                };
              }
            );

            const rowExcelHeader = this.columnDefs.map((el) => el.headerName);

            this.arrayColor = this.columnDefs.map((el) => ({
              color: "d0d0d0",
              name: el.headerName,
            }));

            const rowExcel = this.rowDataAll.map((el) => {
              const colExcel = [
                el.rowNumber,
                el.typeCd,
                el.dataFomat,
                el.jobAbilCd,
                el.jobAbilNm,
                el.lvl,
                el.ver,
                el.learnModuleNm,
              ];
              return colExcel;
            });

            this.dataOutput = [
              { sheetName: "sheet1", data: rowExcel, header: rowExcelHeader },
            ];
          })
          .finally(() => {
            this.cmn.setLoading(false);
          });
      }
    },
  },
};
</script>
