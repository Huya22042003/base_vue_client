<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="'Menu Management'"></Breadcrumb>

    <!-- fomr search -->
    <div class="box dp_block">
      <div class="search_box col_3">
        <ul>
          <li>
            <p>Name Menu</p>
            <InputBase
              :id="'name'"
              :name="'name'"
              :mode="'show'"
              v-model="menuSearchModel.name"
            >
            </InputBase>
          </li>

          <li>
            <p>Route Menu</p>
            <InputBase
              :id="'route'"
              :name="'route'"
              :mode="'show'"
              v-model="menuSearchModel.route"
            >
            </InputBase>
          </li>

          <li>
            <p>VN Name</p>
            <InputBase
              :id="'vnName'"
              :name="'vnName'"
              :mode="'show'"
              v-model="menuSearchModel.vnName"
            >
            </InputBase>
          </li>
        </ul>

        <!-- button search -->
        <div class="search_btnarea">
          <button
            type="button"
            class="btn_round btn_lg btn_primary"
            @click="search()"
          >
            Search
          </button>
          <button
            type="button"
            class="btn_round btn_lg btn_icon btn_white reload"
            @click="reset()"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- grid table data -->
    <div class="box dp_block">
      <div class="box_section">
        <GridComponentV2
          ref="grid"
          :key="keyId"
          :rowData="rowData"
          :columnDefs="columnDefs"
          :pagination="true"
          :totalRecord="totalRecord"
          :paginationClientFlag="false"
          @customPagination="customPagination"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
        >
          <template #button>
            <div class="search_btnarea">
              <button
                type="button"
                class="btn_round btn_md btn_primary"
                @click="create()"
              >
                Create
              </button>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
    <LoaddingComponent v-if="isLoad"></LoaddingComponent>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputBase from "@/components/common/input/InputBase.vue";
import LoaddingComponent from "../../components/common/loading/LoaddingComponent.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import {
  MODE_CREATE,
  MODE_DETAIL,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
} from "../../constants/screen.const";
import type {
  MenuResponseModel,
  MenuSearchModel,
} from "../../stores/menuService/menu.type";
import { commonStore } from "../../stores/common";
import { menuStore } from "../../stores/menuService";
import { SCREEN } from "../../router/screen";
import { STATUS_NO, STATUS_YES } from "../../constants/common.const";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";

export default defineComponent({
  components: {
    InputBase,
    GridComponentV2,
    LoaddingComponent,
    LinkGridComponent,
  },

  setup() {
    const storeCommon = commonStore();
    const storeMenu = menuStore();

    return {
      storeCommon,
      storeMenu,
    };
  },

  data() {
    return {
      // form UI
      keyId: 0,
      totalRecord: 0,
      isLoad: false,
      rowData: [] as Array<MenuResponseModel>,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      menuSearchModel: {
        name: "",
        route: "",
        vnName: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as MenuSearchModel,
      columnDefs: ref([
        {
          headerName: "STT",
          field: "rowNumber",
          flex: 0.3,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "Name Menu",
          field: "name",
          cellRenderer: LinkGridComponent,
          cellRendererParams: { onCustomEvent: this.handleCustomClick },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          },
          flex: 1,
        },
        {
          headerName: "Site Type",
          field: "siteType",
          cellRenderer(params: any) {
            if (params.data.siteType == "SITE_01") {
              return "Admin";
            } else if (params.data.siteType == "SITE_02") {
              return "Professor";
            } else {
              return "Student";
            }
          },
          flex: 0.4,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "Route Menu",
          field: "route",
          flex: 0.7,
        },
        {
          headerName: "Parent",
          field: "parentId",
          flex: 0.3,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "VN Name",
          field: "vnName",
          flex: 1.5,
        },
      ]),
    };
  },

  mounted() {
    document.addEventListener("keypress", this.handleKeyPress);
  },

  beforeUnmount() {
    document.addEventListener("keypress", this.handleKeyPress);
  },

  methods: {
    handleKeyPress(event: any) {
      if (event.key === "Enter") {
        this.search();
      }
    },

    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.crudPathMenu.name,
        params: { mode: MODE_DETAIL },
        state: { id: data.id },
      });
    },

    customPagination(pageNumber: any, pagesSize: any) {
      this.menuSearchModel.page = pageNumber;
      this.menuSearchModel.size = pagesSize;

      this.getDataAll();
    },

    reset() {
      this.menuSearchModel = {
        name: "",
        route: "",
        vnName: "",
        page: 1,
        size: this.menuSearchModel.size,
        sort: "",
      } as unknown as MenuSearchModel;
    },

    search() {
      this.keyId++;
      this.menuSearchModel.page = 1;

      this.getDataAll();
    },

    create() {
      this.$router.push({
        name: SCREEN.crudPathMenu.name,
        params: { mode: MODE_CREATE },
      });
    },

    async getDataAll() {
      this.isLoad = true;
      await this.storeMenu.searchMenu(this.menuSearchModel);
      if (this.storeMenu.status && this.storeMenu.status == SUCCSESS_STATUS) {
        this.rowData = this.storeMenu.resultData.map((item) => {
          item.parentId = item.parentId !== null ? STATUS_NO : STATUS_YES;
          return item;
        });

        this.totalRecord = this.storeMenu.totalRecord ?? 0;
      }
      this.isLoad = false;
    },
  },
});
</script>
