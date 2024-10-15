<template>
  <THeader />
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>

      <div class="box dp_block">
        <div class="box_inner">
          <GridComponentV2
            :rowData="coreChildList"
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
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import { commonStore } from "@/stores/common";
import { defineComponent, ref } from "vue";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "@/constants/screen.const";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { format } from "date-fns";
import { codeMngStore } from "@/stores/common/codeMng";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { SCREEN } from "@/router/screen";
import { STATUS_YES } from "@/constants/common.const";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import { useI18n } from "vue-i18n";
import type {
  EmpSubAbility,
  EmpSubSearch,
} from "@/stores/subEmpAbi/subEmpAbi.type";
import { empAbiStore } from "@/stores/subEmpAbi";

export default defineComponent({
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    GridComponentV2,
  },
  data() {
    return {
      pageTitle: this.t("02.subEmpAbility.list.pageTitle"),
      breadcrumbItems: [],
      picker1: new Date(),
      parentListObject: [],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: ref([
        {
          headerName: this.t("02.subEmpAbility.list.rowNum"),
          field: "rowNum",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.subEmpAbility.list.abilityName"),
          field: "ability1levelNm",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            alignItems: "center",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
        },
        {
          headerName: this.t("02.subEmpAbility.list.createYn"),
          field: "stsUse",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.subEmpAbility.list.regName"),
          field: "regNm",
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.subEmpAbility.list.regDate"),
          field: "createDate",
          cellStyle: {
            textAlign: "center",
          },
        },
      ]),
      coreChildList: [] as Array<EmpSubAbility>,
      abiSearch: {
        page: 1,
        size: 10,
        sort: "",
      } as EmpSubSearch,
      rowData: [],
      totalRows: 0,
      wrote: "",
      notWrote: "",
      key: 1,
      written: "",
    };
  },
  setup() {
    const store = commonStore();
    const chldStore = empAbiStore();
    const codeStore = codeMngStore();
    const { t } = useI18n();
    return {
      store,
      chldStore,
      codeStore,
      t,
    };
  },
  beforeMount() {},
  methods: {
    async getList() {
      this.store.setLoading(true);

      await this.chldStore.fetchList(this.abiSearch);
      if (this.chldStore.status && this.chldStore.status == SUCCSESS_STATUS) {
        this.coreChildList = this.chldStore.coreList.data.content;
        this.totalRows = this.chldStore.coreList.data.totalElements;

        if (this.coreChildList.length > 0) {
          this.coreChildList.forEach((item, index) => {
            item.write_Yn = item.writeYn == STATUS_YES ? "작성" : "미작성";

            if (item.regDate != null) {
              item.createDate = format(
                new Date(item.regDate),
                FORMAT_YYY_MM_DD
              );
            }
          });
        }
      }
      this.store.setLoading(false);
    },
    search() {
      this.abiSearch.page = 1;
      this.key++;
    },
    handleCustomClick(data: any) {
      this.$router.push({
        path: SCREEN.subEmpAbility.path,
        state: {
          ability1levelSeq: data.ability1levelSeq,
        },
      });
    },

    fnPagination(pageNumber: any, pagesSize: any) {
      this.abiSearch.size = pagesSize;
      this.abiSearch.page = pageNumber;
      this.abiSearch.sort = "";
      this.getList();
    },
  },
});
</script>

<style scoped lang="scss"></style>
