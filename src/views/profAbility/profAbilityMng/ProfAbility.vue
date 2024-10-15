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
            <template #button>
              <div class="search_btnarea">
                <button type="button" class="btn_xs btn_blue" @click="create()">
                  {{ t("02.profAbilityList.btnAdd") }}
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
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import { commonStore } from "@/stores/common";
import { ref } from "vue";
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
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import {
  FacultyCompeCreDTO,
  WisePrideAbiSearch,
} from "@/stores/profAbility/profAbility.type";

import { listProf } from "@/stores/profAbility/profAbility.service";
import { profStore } from "@/stores/profAbility";

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
      pageTitle: this.t("02.profAbilityList.pageTitle"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        { label: this.t("02.profAbilityChd.menu"), link: "#" },
        {
          label: this.t("02.profAbilityList.pageTitle"),
          link: SCREEN.profChldList.path,
        },
      ],
      picker1: new Date(),
      parentListObject: [],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: ref([
        {
          headerName: this.t("02.profAbilityList.rowNum"),
          field: "rowNum",
          flex: 1,
          cellStyle: {
            textAlign: "center",
          },
        },

        {
          headerName: this.t("02.profAbilityList.wisePriNm"),
          field: "wisePrideNm",
          flex: 4,
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
          headerName: this.t("02.profAbilityList.regNm"),
          field: "regId",
          flex: 2,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: this.t("02.profAbilityList.regDate"),
          field: "createDate",
          flex: 2,
          cellStyle: {
            textAlign: "center",
          },
        },
      ]),
      coreChildList: [] as Array<FacultyCompeCreDTO>,
      abiSearch: {
        page: 1,
        size: 10,
        sort: "",
      } as WisePrideAbiSearch,
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
    const profStr = profStore();
    const codeStore = codeMngStore();
    const { t } = useI18n();
    return {
      store,
      profStr,
      codeStore,
      t,
    };
  },
  beforeMount() {},
  methods: {
    async getList() {
      this.store.setLoading(true);

      await listProf(this.abiSearch)
        .then((res) => {
          this.wisePrideObject = res.data.data;
          this.coreChildList = res.data.data.content;

          this.totalRows = res.data.data.totalElements;

          if (this.coreChildList.length > 0) {
            this.coreChildList.forEach((item, index) => {
              if (item.regDate != null) {
                item.createDate = format(
                  new Date(item.regDate),
                  FORMAT_YYY_MM_DD
                );
              }
            });
          }
        })
        .catch((error) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    search() {
      this.abiSearch.page = 1;
      this.key++;
    },
    handleCustomClick(data: any) {
      this.$router.push({
        path: SCREEN.profAbi.path,
        state: {
          profAbilitySeq: data.wisePrideSeq,
          modeScreen: "detail",
        },
      });
    },
    create() {
      this.$router.push({
        path: SCREEN.profAbi.path,
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
