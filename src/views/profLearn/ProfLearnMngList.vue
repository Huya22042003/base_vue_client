<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
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
          >
            <template #button>
              <div class="dp_flex btn_group btn_end">
                <button
                  type="button"
                  class="btn_round btn_sm btn_primary"
                  @click="register"
                >
                  {{ t("02.profLearn.button.register") }}
                </button>
              </div>
            </template>
          </GridComponentV2>
        </div>
      </div>
    </section>
    <ProfLearnModal
      :isOpen="modalOpen"
      @close-modal="closeModal"
      :modeScreen="modeScreen"
      :profId="profId"
      :getDataAll="getDataAll"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ProfLearnModal from "./ProfLearnModal.vue";
import LinkGridComponent from "../../components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import {
  MODE_CREATE,
  MODE_DETAIL,
  SUCCSESS_STATUS,
  FORMAT_YYY_MM_DD,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "../../constants/screen.const";
import { STATUS_YES } from "../../constants/common.const";
import { profLearnStore } from "@/stores/profLearnMethod";
import { commonStore } from "../../stores/common";
import type {
  ProfInitModel,
  PageableModel,
  ProfIdModel,
} from "@/stores/profLearnMethod/profLearn.type";
import { format } from "date-fns";
import GridComponent from "@/components/common/grid/GridComponent.vue";
import ButtonGridComponent from "../../components/common/grid/ButtonGridComponent.vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "ProfLearn",
  components: {
    Breadcrumb,
    ProfLearnModal,
    LinkGridComponent,
    GridComponent,
    ButtonGridComponent,
  },
  setup() {
    const { t } = useI18n();
    const store = profLearnStore();
    const cmn = commonStore();
    const pageTitle = t("02.profLearn.title");
    const paginationPageSize = PAGINATION_PAGE_SIZE;
    const paginationPageSizeSelector = PAGINATION_PAGE_SIZE_SELECTOR;
    const pageable = ref<PageableModel>({});
    const breadcrumbItems = [
      { label: "HOME", link: "/" },
      { label: "", link: "#" },
      {
        label: "",
        link: "#",
      },
    ];
    return {
      t,
      store,
      cmn,
      pageTitle,
      breadcrumbItems,
      paginationPageSize,
      paginationPageSizeSelector,
      pageable,
    };
  },
  data() {
    return {
      columnDefs: [
        {
          headerName: this.t("02.profLearn.table.learnName"),
          field: "methNm",
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 5,
        },
        {
          headerName: this.t("02.profLearn.table.useYn"),
          field: "useYn",
          flex: 2,
          cellStyle: { textAlign: "center" },
          cellRenderer: (params: any) => {
            return params.value === STATUS_YES
              ? this.t("common.use")
              : this.t("common.noUse");
          },
        },
        {
          headerName: this.t("02.profLearn.table.regBy"),
          field: "regId",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("02.profLearn.table.regDate"),
          field: "regDate",
          flex: 2,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("02.profLearn.table.deleteAction"),
          cellRenderer: "ButtonGridComponent",
          cellRendererParams: () => {
            return {
              onCustomEvent: this.handleDelete,
              value: "❌",
            };
          },
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      ],
      modeScreen: "",
      modalOpen: false,
      profId: "",
      rowSelected: [],
      rowData: [] as Array<ProfInitModel>,
      totalRows: "",
      profIdModel: {} as ProfIdModel,
    };
  },
  methods: {
    async getDataAll() {
      this.cmn.setLoading(true);
      await this.store.listProf(this.pageable);
      if (this.store && this.store.status == SUCCSESS_STATUS) {
        this.data = this.store.profLearnList.data.content;
        this.rowData = this.data;
        this.totalRows = this.store.profLearnList.data.totalElements;
        this.rowData.forEach((item) => {
          item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
        });
      }
      this.cmn.setLoading(false);
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.pageable.size = pagesSize;
      this.pageable.page = pageNumber;
      this.pageable.sort = "";
      this.getDataAll();
    },
    handleCustomClick(data: any) {
      this.modeScreen = MODE_DETAIL;
      this.modalOpen = true;
      this.profId = data.profLearnSeq;
    },

    register() {
      this.modeScreen = MODE_CREATE;
      this.modalOpen = true;
      this.profId = "";
    },
    closeModal() {
      this.modalOpen = false;
      this.profId = "";
    },
    async handleDelete(data: any) {
      this.profIdModel = data.profLearnSeq;
      const result = await Swal.fire({
        text: this.t("02.evaluationMethodMng.message.confirmDelete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.deleteItem"),
        cancelButtonText: this.t("02.profLearn.button.cancel"),
      });

      if (result.isConfirmed) {
        this.cmn.setLoading(true);
        try {
          await this.store.deleteProf(this.profIdModel);
          this.cmn.setLoading(false);
          await Swal.fire({
            text: this.t("02.profLearn.message.success"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: this.t("02.profLearn.button.oke"),
          });
          this.getDataAll();
        } catch (error) {
          this.cmn.setLoading(false);
          await Swal.fire({
            text: this.t("02.evaluationMethodMng.message.notDelete"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: this.t("02.profLearn.button.oke"),
          });
        }
      }
    },
  },
});
</script>
