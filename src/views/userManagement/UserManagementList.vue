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
                  {{ t("userManagement.dept") }}
                </p>
                <InputBase
                  class="form_style"
                  :id="'deptNm'"
                  :name="'deptNm'"
                  v-model="searchModel.deptNm"
                ></InputBase>
              </li>
              <li>
                <p class="ta_c">
                  {{ t("userManagement.staffNo") }}
                </p>
                <InputBase
                  class="form_style"
                  :id="'staffNo'"
                  :name="'staffNo'"
                  v-model="searchModel.userId"
                ></InputBase>
              </li>
              <li>
                <p class="ta_c">
                  {{ t("userManagement.name") }}
                </p>
                <InputBase
                  class="form_style"
                  :id="'name'"
                  :name="'name'"
                  v-model="searchModel.name"
                ></InputBase>
              </li>
            </ul>
            <div class="dp_flex btn_group btn_end" style="gap: 10px">
              <button
                class="button btn_lg btn_blue btn_responsive"
                @click="search"
              >
                {{ t("common.search") }}
              </button>
              <button
                class="button btn_lg btn_gray btn_responsive"
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
            :newGridOptions="gridOptions"
          >
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
  MODE_DETAIL,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
} from "../../constants/screen.const";
import { defineComponent } from "vue";
import { commonStore } from "../../stores/common";
import type {
  UserMngModel,
  UserManagementSearchModel,
} from "../../stores/userManagement/userManagement.type";
import { getListData } from "@/stores/userManagement/userManagement.service";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "UserMngList",
  components: { Breadcrumb, LinkGridComponent },
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
  beforeMount() {},
  data() {
    return {
      pageTitle: this.t("userManagement.pageTitle"),
      breadcrumbItems: [],
      columnDefs: [
        {
          headerName: this.t("common.rowNum"),
          field: "rowNumber",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t("userManagement.dept"),
          field: "deptNm",
          flex: 2,
        },
        {
          headerName: this.t("userManagement.staffNo"),
          field: "userId",
          flex: 2,
        },
        {
          headerName: this.t("userManagement.name"),
          field: "name",
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
          flex: 2,
        },
        {
          headerName: this.t("userManagement.position"),
          field: "positionNm",
          flex: 1,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      totalRows: 0,
      key: 1,
      rowData: [] as Array<UserMngModel>,
      searchModel: {} as UserManagementSearchModel,
    };
  },
  methods: {
    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    getDataAll() {
      this.cmn.setLoading(true);
      getListData(this.searchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getDataAll();
    },
    reset() {
      this.searchModel.deptNm = "";
      this.searchModel.userId = "";
      this.searchModel.name = "";
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.userManagementCrud.name,
        params: { mode: MODE_DETAIL },
        state: {
          userId: data.userId,
        },
      });
    },
  },
});
</script>
