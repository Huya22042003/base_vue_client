<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="'Role Resource Management'"></Breadcrumb>

    <div class="divide_box">
      <!-- grid table role data -->
      <div class="box dp_block" style="width: 25%">
        <div class="box_section">
          <div class="page_toparea">
            <h2 class="box_title">List Role Data</h2>
          </div>
          <GridComponentV2
            ref="gridRole"
            :rowData="rowRoleData"
            :columnDefs="columnRoleDefs"
            :totalRecord="totalRoleRecord"
            :paginationClientFlag="false"
            @customPagination="customRolePagination"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
          >
          </GridComponentV2>
        </div>
      </div>

      <!-- grid table resource data -->
      <div class="box dp_block" style="width: 75%">
        <div class="box_section" id="keyResourceId">
          <div class="page_toparea">
            <h2 class="box_title">List Resource Data</h2>
          </div>
          <div class="search_box col_3">
            <ul>
              <li>
                <p>URL</p>
                <InputBase :id="'credit'" v-model="resourceSearchModel.url" />
              </li>
              <li>
                <p>NAME</p>
                <InputBase :id="'credit'" v-model="resourceSearchModel.name" />
              </li>
              <li>
                <p>METHOD</p>
                <SelectBoxBase
                  :id="'typeMethod'"
                  :name="'typeMethod'"
                  v-model="selectMethodValue"
                  :data="listSelectMethod"
                  :mode="'show'"
                >
                </SelectBoxBase>
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                type="button"
                class="btn_round btn_lg btn_primary"
                @click="searchClick()"
              >
                Search</button
              ><button
                type="button"
                class="btn_round btn_lg btn_gray"
                @click="reset()"
              >
                Reset
              </button>
            </div>
          </div>

          <GridComponentV2
            ref="gridResource"
            :rowData="rowResourceData"
            :columnDefs="columnResourceDefs"
            :totalRecord="totalResourceRecord"
            :paginationClientFlag="false"
            @customPagination="customResourcePagination"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            :key="key"
          >
          </GridComponentV2>
        </div>
      </div>
    </div>

    <!-- button save -->
    <div class="search_btnarea btn_group btn_center">
      <button
        type="button"
        class="btn_round btn_lg btn_primary"
        @click="handSaveClick()"
        :disabled="roleId == 0"
      >
        Save
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
  TYPE_EVENT,
} from "../../constants/screen.const";
import type {
  ResourceResponseModel,
  ResourceSearchModel,
} from "../../stores/resourceService/resource.type";
import { resourceStore } from "../../stores/resourceService";
import { commonStore } from "../../stores/common";

import CheckboxGrid from "@/components/common/grid/CheckboxGrid.vue";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import Swal from "sweetalert2";
import { roleResourceStore } from "../../stores/roleResource";
import type {
  RoleResponseModel,
  RoleSearchModel,
} from "../../stores/roleResource/roleResource.type";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { resourceRoleStore } from "../../stores/resourceRoleService";
import type { ResourceRoleRequestModel } from "../../stores/resourceRoleService/resourceRole.type";
import CommonService from "../../service/common/CommonService";

export default defineComponent({
  components: {
    GridComponentV2,
  },

  setup() {
    const storeCommon = commonStore();
    const storeResource = resourceStore();
    const storeRole = roleResourceStore();
    const storeResourceRole = resourceRoleStore();

    return {
      storeCommon,
      storeResource,
      storeRole,
      storeResourceRole,
    };
  },

  data() {
    return {
      selectAll: false,
      totalRoleRecord: 0,
      totalResourceRecord: 0,
      keyRoleId: 0 + "keyRoleId",
      keyResourceId: 0 + "keyResourceId",
      roleId: 0,
      rowRoleData: [] as Array<RoleResponseModel>,
      rowResourceData: [] as Array<ResourceResponseModel>,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listCheckBoxResource: [] as Array<string>,
      listInsert: [] as Array<string>,
      listDelete: [] as Array<string>,
      listDataFromDB: [] as Array<string>,
      columnRoleDefs: ref([
        // {
        //   headerName: "Code Role",
        //   field: "rlCd",
        //   flex: 1,
        //   cellStyle: {
        //     textAlign: "center",
        //   },
        // },
        {
          headerName: "Name Role",
          field: "rlNm",
          flex: 3,
          // cellStyle: {
          //   textAlign: "center",
          // },
        },
        {
          headerName: "#",
          cellRenderer: ButtonGridComponent,
          cellRendererParams: {
            className: "btn_icon icon_only document",
            type: TYPE_EVENT,
            onCustomEvent: this.handleActionRoleClick,
          },
          cellStyle: {
            display: "flex",
            justifyContent: "center",
          },
        },
      ]),

      columnResourceDefs: ref([
        {
          headerComponent: CheckboxGrid,
          headerComponentParams: {
            onCustomEvent: this.checkAll,
            valueChecked: this.selectAll,
            type: "selectAll",
            selectAllGridId: "selectAllGrid",
            childName: "childName",
          },
          cellRenderer: CheckboxGrid,
          cellRendererParams: {
            onCustomEvent: this.checkChild,
            selectAllGridId: "selectAllGrid",
            type: "selectChild",
            childName: "childName",
          },
          field: "checkedFlag",
          width: 10,
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 0.5,
        },
        {
          headerName: "STT",
          field: "rowNumber",
          flex: 0.7,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "Name Resource",
          field: "rsNm",
          flex: 3,
        },
        {
          headerName: "Type",
          field: "rsType",
          flex: 0.8,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "Method",
          field: "httpMethod",
          flex: 1,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "URL Resource",
          field: "url",
          flex: 3.5,
        },
      ]),

      resourceSearchModel: {
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as ResourceSearchModel,

      roleSearchModel: {
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as RoleSearchModel,
      listSelectMethod: [
        { cdId: "", cdNm: "ALL" },
        { cdId: "GET", cdNm: "GET" },
        { cdId: "POST", cdNm: "POST" },
        { cdId: "PUT", cdNm: "PUT" },
        { cdId: "DELETE", cdNm: "DELETE" },
      ] as Array<any>,
      selectMethodValue: "",
      key: 1,
    };
  },

  methods: {
    checkAll(value: boolean) {
      let newRow = this.rowResourceData.map((item) => {
        if (value) {
          this.listCheckBoxResource.push(item.rsId);
        } else {
          const index = this.listCheckBoxResource.indexOf(item.rsId);
          if (index !== -1) {
            this.listCheckBoxResource.splice(index, 1);
          }
        }
        return {
          ...item,
          checkedFlag: value,
        };
      });
      this.listCheckBoxResource = [...new Set(this.listCheckBoxResource)];
      this.rowResourceData = newRow;
    },

    checkChild(value: any, data: { rsId: string }) {
      if (value) {
        this.listCheckBoxResource.push(data.rsId);

        const index = this.listDelete.indexOf(data.rsId);
        if (index !== -1) {
          this.listDelete.splice(index, 1);
        }
      } else {
        const index = this.listCheckBoxResource.indexOf(data.rsId);
        if (index !== -1) {
          this.listCheckBoxResource.splice(index, 1);
        }

        if (this.listDataFromDB.includes(data.rsId)) {
          this.listDelete.push(data.rsId);
        }
      }

      this.listCheckBoxResource = [...new Set(this.listCheckBoxResource)];
      this.listDelete = [...new Set(this.listDelete)];
    },

    async handleActionRoleClick(event: { rlId: any }) {
      this.storeCommon.setLoading(true);
      this.roleId = event.rlId;

      await this.storeResourceRole.findByRoleId(event.rlId);
      if (
        this.storeResourceRole.status &&
        this.storeResourceRole.status == SUCCSESS_STATUS
      ) {
        this.listDataFromDB = this.storeResourceRole.resultResourceRole.map(
          (el) => el.rsId
        );

        let newRow = this.rowResourceData.map((item) => {
          return {
            ...item,
            checkedFlag: this.listDataFromDB.includes(item.rsId),
          };
        });
        this.rowResourceData = newRow;
      }
      this.storeCommon.setLoading(false);
    },

    resetRolePagination() {
      this.roleId = 0;
      this.listDataFromDB = [];
      this.rowResourceData = this.rowResourceData.map((item) => {
        return {
          ...item,
          checkedFlag: false,
        };
      });
    },

    resetResourcePagination() {
      this.listDelete = [];
      this.listCheckBoxResource = [];
    },
    searchClick() {
      this.resourceSearchModel.page = 1;
      this.key++;
    },

    customRolePagination(pageNumber: any, pagesSize: any) {
      this.resetRolePagination();
      this.roleSearchModel.page = pageNumber;
      this.roleSearchModel.size = pagesSize;

      this.getListRole();
    },

    customResourcePagination(pageNumber: any, pagesSize: any) {
      this.resetResourcePagination();
      this.resourceSearchModel.page = pageNumber;
      this.resourceSearchModel.size = pagesSize;

      this.getListResource();
    },

    async getListRole() {
      this.storeCommon.setLoading(true);
      //get list role
      await this.storeRole.getListRole(this.roleSearchModel);
      if (this.storeRole.status && this.storeRole.status == SUCCSESS_STATUS) {
        this.rowRoleData = this.storeRole.resultData;
        this.totalRoleRecord = this.storeRole.totalRecord ?? 0;
      }

      this.storeCommon.setLoading(false);
    },

    async getListResource() {
      this.storeCommon.setLoading(true);
      this.resourceSearchModel.method = this.selectMethodValue;
      //get list resource
      await this.storeResource.searchResource(this.resourceSearchModel);
      if (
        this.storeResource.status &&
        this.storeResource.status == SUCCSESS_STATUS
      ) {
        this.rowResourceData = this.storeResource.resultData.map((item) => {
          return {
            ...item,
            checkedFlag: this.listDataFromDB.includes(item.rsId),
          };
        });
        this.totalResourceRecord = this.storeResource.totalRecord ?? 0;
      }

      this.storeCommon.setLoading(false);
    },

    noitificationAlert() {
      Swal.fire({
        title: "Successfully!!!",
        icon: "success",
      }).then(() => {
        this.listInsert.map((item) => this.listDataFromDB.push(item));
        this.listInsert = [];
        this.listDelete = [];
      });
    },

    handSaveClick() {
      Swal.fire({
        title: "Are you sure save (create)?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.saveData();
        }
      });
    },

    reset() {
      this.selectMethodValue = "";
      this.resourceSearchModel.url = "";
      this.resourceSearchModel.name = "";
    },
    async saveData() {
      this.storeCommon.setLoading(true);

      if (this.listInsert.length == 0) {
        this.listInsert = this.listCheckBoxResource.filter(
          (item) => !this.listDataFromDB.includes(item)
        );
      } else {
        this.listInsert = this.listCheckBoxResource.filter(
          (item) => !this.listInsert.includes(item)
        );
      }
      this.listInsert = [...new Set(this.listInsert)];

      const resourceRoleModel = {
        listInsert: this.listInsert,
        listDelete: this.listDelete,
        roleId: this.roleId,
      } as unknown as ResourceRoleRequestModel;

      await this.storeResourceRole.createOrDeleteResourceRole(
        resourceRoleModel
      );
      await CommonService.resetResource();
      this.storeCommon.setLoading(false);
      this.noitificationAlert();
    },
  },
});
</script>

<style>
#keyResourceId .ag-root-wrapper-body.ag-layout-normal {
  min-height: 600px !important;
}
</style>
