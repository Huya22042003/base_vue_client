<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="'Resource Management'"></Breadcrumb>

    <!-- fomr search -->
    <div class="box dp_block">
      <div class="search_box col_3">
        <ul>
          <li>
            <p>Name Resource</p>
            <InputBase
              :id="'name'"
              :name="'name'"
              :mode="'show'"
              v-model="resourceSearchModel.name"
            >
            </InputBase>
          </li>

          <li>
            <p>Type</p>
            <SelectBoxBase
              :id="'typeResource'"
              :name="'typeResource'"
              v-model="selectTypeValue"
              :data="listSelectType"
              :mode="mode"
            >
            </SelectBoxBase>
          </li>

          <li>
            <p>Method</p>
            <SelectBoxBase
              :id="'typeMethod'"
              :name="'typeMethod'"
              v-model="selectMethodValue"
              :data="listSelectMethod"
              :mode="mode"
            >
            </SelectBoxBase>
          </li>

          <li>
            <p>URL Resource</p>
            <InputBase
              :id="'url'"
              :name="'url'"
              :mode="'show'"
              v-model="resourceSearchModel.url"
            >
            </InputBase>
          </li>

          <li>
            <p>Reg Date</p>
            <div class="search_flex w-full" style="position: relative">
              <DatePickerComponent
                v-model="resourceSearchModel.startDate"
                :placeholder="'Start Date'"
              >
              </DatePickerComponent>
              <span> ~ </span>
              <DatePickerComponent
                v-model="resourceSearchModel.endDate"
                :placeholder="'End Date'"
              >
              </DatePickerComponent>
            </div>
          </li>
        </ul>

        <!-- button search -->
        <div class="search_btnarea">
          <button
            type="button"
            class="btn_round btn_lg btn_primary"
            @click="search()"
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
    </div>

    <!-- grid table data -->
    <div class="box dp_block">
      <div class="box_section">
        <div class="page_toparea">
          <h2 class="title-search">Resource Data</h2>
        </div>

        <GridComponentV2
          ref="grid"
          :rowData="rowData"
          :columnDefs="columnDefs"
          :totalRecord="totalRecord"
          :paginationClientFlag="false"
          @customPagination="customPagination"
          :key="keyId"
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
  </section>

  <!-- Modal create or edit resource -->
  <TModal
    :is-open="modalSaveDataOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="modalId"
    @close-modal="closeModal"
  >
    <!-- Modal content goes here -->
    <template #title>
      <strong>
        {{ resourceResModel.rsId ? "Update Resource" : "Create Resource" }}
      </strong>
    </template>
    <template #default>
      <table class="tbl_row">
        <colgroup>
          <col style="width: 15%" />
          <col style="width: 35%" />
          <col style="width: 15%" />
          <col style="width: 35%" />
        </colgroup>

        <!-- form data -->
        <tbody>
          <tr>
            <th scope="row">
              <p class="required">Name</p>
            </th>
            <td colspan="3">
              <InputBase
                :id="'name'"
                :name="'name'"
                :mode="'show'"
                v-model="resourceResModel.rsNm"
              >
              </InputBase>
            </td>
          </tr>

          <tr>
            <th scope="row">
              <p>Method</p>
            </th>
            <td colspan="1">
              <SelectBoxBase
                :id="'typeMethod'"
                :name="'typeMethod'"
                v-model="selectMethodValueCreate"
                :data="listSelectMethodCreate"
                :mode="mode"
              >
              </SelectBoxBase>
            </td>
            <th scope="row">
              <p>Type</p>
            </th>
            <td colspan="3">
              <SelectBoxBase
                :id="'typeResourceSelect'"
                :name="'typeResourceSelect'"
                v-model="selectTypeValueCreate"
                :data="listSelectTypeCreate"
                :mode="mode"
              >
              </SelectBoxBase>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p class="required">URL</p>
            </th>
            <td colspan="3">
              <InputBase
                :id="'url'"
                :name="'url'"
                :mode="'show'"
                v-model="resourceResModel.url"
              >
              </InputBase>
            </td>
          </tr>
          <tr>
            <th scope="row">
              <p>Site Menu</p>
            </th>
            <td colspan="1">
              <SelectBoxBase
                :id="'onOff'"
                :name="'onOff'"
                :data="selectOnOff"
                :mode="mode"
                v-model="status"
              >
              </SelectBoxBase>
            </td>
            <th scope="row">
              <p>Category</p>
            </th>
            <td colspan="3">
              <SelectBoxBase
                :id="'typeMenu'"
                :name="'typeMenu'"
                :data="selectCategory"
                :mode="mode"
                v-model="category"
              >
              </SelectBoxBase>
            </td>
          </tr>
          <tr v-if="category == 'MENU' || category == 'COMMON_SITE'">
            <th scope="row">Site type</th>
            <td colspan="3">
              <SelectBoxBase
                :id="'typeSite'"
                :name="'typeSite'"
                :data="selectSiteType"
                v-model="siteAdmin"
                @change="getAllMenu()"
              >
              </SelectBoxBase>
            </td>
          </tr>
          <tr v-if="category == 'MENU'">
            <th scope="row">Menu</th>
            <td colspan="3" v-if="resourceResModel.rsId">
              <SelectBoxBaseSearch
                :id="'parentId'"
                :name="'parentId'"
                v-model="selectMenu"
                :data="listMenu"
                v-if="listMenu.length > 0"
              >
              </SelectBoxBaseSearch>
            </td>
            <td colspan="3" v-else>
              <SelectBoxBaseSearch
                :id="'parentId'"
                :name="'parentId'"
                v-model="selectMenu"
                :data="listMenu"
                v-if="listMenu.length > 0"
              >
              </SelectBoxBaseSearch>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #footer>
      <!-- Footer content goes here -->
      <button
        :disabled="!isCheck"
        type="button"
        class="btn_round btn_md btn_primary"
        @click="confirmAction"
      >
        Save
      </button>
      <button
        type="button"
        class="btn_round btn_md btn_white popup_close"
        @click="cancelAction"
      >
        Back
      </button>
    </template>
  </TModal>
</template>

<script lang="ts">
import {
  FORMAT_YYY_MM_DD,
  MODE_CREATE,
  MODE_EDIT,
  MODE_HIDDEN,
  MODE_SHOW,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
  TYPE_EVENT,
} from "../../constants/screen.const";
import { defineComponent } from "vue";
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import DatePickerComponent from "@/components/common/input/DatePickerComponent.vue";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import {
  ResourceRequestModel,
  ResourceResponseModel,
  ResourceSearchModel,
} from "../../stores/resourceService/resource.type";
import { commonStore } from "../../stores/common";
import { resourceStore } from "../../stores/resourceService";
import { format } from "date-fns";
import Swal from "sweetalert2";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { MESSAGE_ERROR_API, SITE_01 } from "../../constants/common.const";
import { menuStore } from "@/stores/menuService";

export default defineComponent({
  components: {
    InputBase,
    SelectBoxBase,
    GridComponentV2,
    DatePickerComponent,
    ButtonGridComponent,
  },

  setup() {
    let modeScreen = ref("");
    const storeCommon = commonStore();
    const storeResource = resourceStore();
    const storeMenu = menuStore();

    return {
      modeScreen,
      storeCommon,
      storeResource,
      storeMenu,
    };
  },

  beforeMount() {
    this.selectTypeValue = this.listSelectType[0].cdId;
    this.selectMethodValue = this.listSelectMethod[0].cdId;
    this.getAllMenu();
  },

  mounted() {
    document.addEventListener("keypress", this.handleKeyPress);
  },

  beforeUnmount() {
    document.addEventListener("keypress", this.handleKeyPress);
  },

  data() {
    return {
      //form UI
      keyId: 0,
      totalRecord: 0,
      isCheck: false,
      mode: MODE_SHOW,
      rowData: [] as Array<ResourceResponseModel>,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      selectTypeValue: "",
      selectMethodValue: "",

      listSelectType: [
        { cdId: "ALL", cdNm: "ALL" },
        { cdId: "API", cdNm: "API" },
        { cdId: "MENU", cdNm: "MENU" },
      ] as Array<any>,
      listSelectMethod: [
        { cdId: "ALL", cdNm: "ALL" },
        { cdId: "GET", cdNm: "GET" },
        { cdId: "POST", cdNm: "POST" },
        { cdId: "PUT", cdNm: "PUT" },
        { cdId: "DELETE", cdNm: "DELETE" },
      ] as Array<any>,

      resourceSearchModel: {
        url: "",
        method: "",
        name: "",
        startDate: "",
        endDate: "",
        type: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as unknown as ResourceSearchModel,

      resourceResModel: {} as ResourceResponseModel,
      resourceReqModel: {} as ResourceRequestModel,

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
          headerName: "Name Resource",
          field: "rsNm",
          flex: 0.85,
        },
        {
          headerName: "URL Resource",
          field: "url",
          flex: 1.15,
        },
        {
          headerName: "Method",
          field: "httpMethod",
          flex: 0.4,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "Type",
          field: "rsType",
          flex: 0.3,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "Reg Date",
          field: "regDate",
          flex: 0.4,
          cellStyle: {
            textAlign: "center",
          },
        },
        {
          headerName: "Edit",
          cellRenderer: "ButtonGridComponent",
          cellRendererParams: {
            className: "btn_icon icon_only document",
            type: TYPE_EVENT,
            onCustomEvent: this.handleEditClick,
          },
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 0.3,
        },
        {
          headerName: "Delete",
          cellRenderer: "ButtonGridComponent",
          cellRendererParams: {
            className: "btn_icon icon_only home",
            type: TYPE_EVENT,
            onCustomEvent: this.handleDeleteClick,
          },
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.3,
        },
      ]),

      selectTypeValueCreate: "",
      selectMethodValueCreate: "",
      listSelectTypeCreate: [
        { cdId: "API", cdNm: "API" },
        { cdId: "MENU", cdNm: "MENU" },
      ] as Array<any>,
      listSelectMethodCreate: [
        { cdId: "GET", cdNm: "GET" },
        { cdId: "POST", cdNm: "POST" },
        { cdId: "PUT", cdNm: "PUT" },
        { cdId: "DELETE", cdNm: "DELETE" },
      ] as Array<any>,

      //Modal
      modalSaveDataOpen: false,
      modalId: "demo",
      deleteId: "",
      selectOnOff: [
        { cdId: "W", cdNm: "WRITE" },
        { cdId: "R", cdNm: "READ" },
      ],
      selectSiteType: [
        { cdId: "SITE_01", cdNm: "ADMIN" },
        { cdId: "SITE_02", cdNm: "PROFESSOR" },
        { cdId: "SITE_03", cdNm: "STUDENT" },
      ],
      selectCategory: [
        { cdId: "MENU", cdNm: "MENU" },
        { cdId: "COMMON", cdNm: "COMMON" },
        { cdId: "COMMON_SITE", cdNm: "COMMON_SITE" },
      ],
      listMenu: [] as Array<any>,
      siteAdmin: SITE_01,
      selectMenu: 0,
      category: "MENU",
      status: "W",
    };
  },

  methods: {
    checkValid() {
      this.isCheck =
        !!this.resourceResModel.rsNm && !!this.resourceResModel.url;
    },

    handleKeyPress(event: any) {
      if (event.key === "Enter") {
        this.search();
      }
    },

    openModal() {
      this.modalSaveDataOpen = true;
    },

    closeModal() {
      this.modalSaveDataOpen = false;
      this.resetModel();
    },

    cancelAction() {
      this.modeScreen = "";
      this.closeModal();
    },

    resetModel() {
      this.resourceResModel.rsNm = "";
      this.resourceResModel.url = "";
      this.selectTypeValueCreate = this.listSelectTypeCreate[0].cdId;
      this.selectMethodValueCreate = this.listSelectMethodCreate[0].cdId;
      this.resourceResModel.rsId = null;
      this.resourceReqModel.status = "";
      this.resourceReqModel.menuId = "";
      this.selectMenu = 0;
    },

    reset() {
      this.resourceSearchModel = {
        url: "",
        method: "",
        name: "",
        startDate: "",
        endDate: "",
        type: "",
        page: 1,
        size: this.resourceSearchModel.size,
        sort: "",
      } as unknown as ResourceSearchModel;

      this.selectMethodValue = this.listSelectMethod[0].cdId;
      this.selectTypeValue = this.listSelectType[0].cdId;
    },

    customPagination(pageNumber: any, pagesSize: any) {
      this.resourceSearchModel.page = pageNumber;
      this.resourceSearchModel.size = pagesSize;
      this.getDataAll();
    },

    search() {
      this.keyId++;
      this.resourceSearchModel.type =
        this.selectTypeValue == "ALL" ? "" : this.selectTypeValue;
      this.resourceSearchModel.method =
        this.selectMethodValue == "ALL" ? "" : this.selectMethodValue;
      this.resourceSearchModel.page = 1;

      this.getDataAll();
    },

    async getDataAll() {
      if (this.resourceSearchModel.startDate) {
        this.resourceSearchModel.startDate = format(
          this.resourceSearchModel.startDate,
          FORMAT_YYY_MM_DD
        );
      }
      if (this.resourceSearchModel.endDate) {
        this.resourceSearchModel.endDate = format(
          this.resourceSearchModel.endDate,
          FORMAT_YYY_MM_DD
        );
      }

      this.storeCommon.setLoading(true);
      await this.storeResource.searchResource(this.resourceSearchModel);
      if (
        this.storeResource.status &&
        this.storeResource.status == SUCCSESS_STATUS
      ) {
        this.rowData = this.storeResource.resultData.map((item) => {
          item.regDate = format(item.regDate, FORMAT_YYY_MM_DD);
          return item;
        });

        this.totalRecord = this.storeResource.totalRecord ?? 0;
      }
      this.storeCommon.setLoading(false);
    },

    noitificationAlert() {
      Swal.fire({
        title: "Successfully!!!",
        icon: "success",
      }).then(() => {
        this.storeCommon.setLoading(false);
        this.closeModal();

        this.reset();
        this.getDataAll();
      });
    },

    noitificationErrorAlert() {
      Swal.fire({
        title: MESSAGE_ERROR_API,
        icon: "error",
      }).then(() => {
        this.storeCommon.setLoading(false);
        this.closeModal();
      });
    },

    create() {
      this.selectTypeValueCreate = this.listSelectTypeCreate[0].cdId;
      this.selectMethodValueCreate = this.listSelectMethodCreate[0].cdId;
      this.modeScreen = MODE_CREATE;
      this.openModal();
    },

    confirmAction() {
      let title = "";
      if (this.modeScreen === MODE_CREATE) {
        title = "Are you sure save (create)?";
      } else if (this.modeScreen === MODE_EDIT) {
        title = "Are you sure save (edit)?";
      }

      Swal.fire({
        title: title,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.modeScreen === MODE_CREATE) {
            this.saveData();
          } else if (this.modeScreen === MODE_EDIT) {
            this.editData();
          }
        }
      });
    },

    getFormData() {
      this.resourceReqModel.rsId = this.resourceResModel.rsId;
      this.resourceReqModel.url = this.resourceResModel.url;
      this.resourceReqModel.rsNm = this.resourceResModel.rsNm;
      this.resourceReqModel.rsType = this.selectTypeValueCreate;
      this.resourceReqModel.httpMethod = this.selectMethodValueCreate;
      this.resourceReqModel.status = this.status;
      this.resourceReqModel.category = this.category;
      this.resourceReqModel.site = this.siteAdmin;
      if (this.category == "MENU") {
        this.resourceReqModel.menuId = this.selectMenu;
      }

      if (this.category == "COMMON_SITE") {
        this.resourceReqModel.site = this.siteAdmin;
      }
    },

    async saveData() {
      this.getFormData();

      this.storeCommon.setLoading(true);
      await this.storeResource
        .createResource(this.resourceReqModel)
        .then(() => {
          if (this.storeResource.detailData == false) {
            Swal.fire({
              title: "Api is duplicated!!!",
              icon: "error",
            });
          } else {
            this.noitificationAlert();
          }
        })
        .catch(() => {
          this.noitificationErrorAlert();
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },

    async editData() {
      this.getFormData();

      this.storeCommon.setLoading(true);
      await this.storeResource
        .updateResource(this.resourceReqModel)
        .then(() => {
          if (this.storeResource.detailData == false) {
            Swal.fire({
              title: "Api is duplicated!!!",
              icon: "error",
            });
          } else {
            this.noitificationAlert();
          }
        })
        .catch(() => {
          this.noitificationErrorAlert();
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },

    handleDeleteClick(event: { rsId: any }) {
      this.deleteId = event.rsId;
      this.modeScreen = MODE_HIDDEN;

      Swal.fire({
        title: "Are you sure delete?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteResource();
        }
      });
    },

    async deleteResource() {
      this.storeCommon.setLoading(true);
      await this.storeResource
        .deleteResoure(this.deleteId)
        .then(() => {
          this.noitificationAlert();
        })
        .catch(() => {
          this.noitificationErrorAlert();
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },

    async handleEditClick(event: { rsId: any }) {
      this.modeScreen = MODE_EDIT;
      this.storeCommon.setLoading(true);
      await this.storeResource
        .getDetailById(event.rsId)
        .then(() => {
          if (
            this.storeResource.status &&
            this.storeResource.status == SUCCSESS_STATUS &&
            this.storeResource.detailData
          ) {
            this.resourceResModel = this.storeResource.detailData;
            this.selectTypeValueCreate = this.resourceResModel.rsType;
            this.selectMethodValueCreate = this.resourceResModel.httpMethod;
            this.status = this.resourceResModel.status;
            this.category = this.resourceResModel.category;
            this.selectMenu = this.resourceResModel.menuId;
            this.siteAdmin = this.resourceResModel.site;
          }
        })
        .catch(() => {
          this.noitificationErrorAlert();
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
          this.openModal();
        });
    },
    async getAllMenu() {
      this.storeCommon.setLoading(true);
      await this.storeMenu.getSelectBoxParent(this.siteAdmin ?? SITE_01);
      
      if (this.storeMenu.status && this.storeMenu.status == SUCCSESS_STATUS) {
        this.listMenu = this.storeMenu.resultData.map((item) => ({
          cdId: item.id,
          cdNm: item.name + "(" + item.vnName + ")",
        }));
      }

      this.storeCommon.setLoading(false);
    },
  },

  watch: {
    siteAdmin: {
      handler: function () {
        this.getAllMenu();
      },
    },
    resourceResModel: {
      handler: "checkValid",
      deep: true,
    },

    "resourceSearchModel.startDate": function (newValue) {
      if (!this.resourceSearchModel.endDate) {
        this.resourceSearchModel.startDate = newValue;
      } else {
        const dStart = format(newValue, FORMAT_YYY_MM_DD);
        const dEnd = format(this.resourceSearchModel.endDate, FORMAT_YYY_MM_DD);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.resourceSearchModel.startDate =
              this.resourceSearchModel.endDate;
            alert("The end date cannot be earlier than the start date.");
          });
        }
      }
    },

    "resourceSearchModel.endDate": function (newValue) {
      if (!this.resourceSearchModel.startDate) {
        this.resourceSearchModel.endDate = newValue;
      } else {
        const dStart = format(
          this.resourceSearchModel.startDate,
          FORMAT_YYY_MM_DD
        );
        const dEnd = format(newValue, FORMAT_YYY_MM_DD);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.resourceSearchModel.endDate =
              this.resourceSearchModel.startDate;
            alert("The end date cannot be earlier than the start date.");
          });
        }
      }
    },
  },
});
</script>
<style lang="css" scoped>
.list_select_custom {
  max-height: 200px !important;
}
</style>
