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
          </GridComponentV2>
        </div>
      </div>
    </section>
    <EduCourseTypeModal
      :isOpen="modalOpen"
      @close-modal="closeModal"
      :modeScreen="modeScreen"
      :eduCourseTypeId="eduCourseTypeId"
      :getDataAll="getDataAll"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import EduCourseTypeModal from "./EduCourseTypeModal.vue";
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
import { eduCourseStore } from "@/stores/eduCourseType";
import { commonStore } from "../../stores/common";
import type {
  EduInitModel,
  PageableModel,
  EduIdModel,
} from "@/stores/eduCourseType/eduCourse.type";
import { format } from "date-fns";
import GridComponent from "@/components/common/grid/GridComponent.vue";
import ButtonGridComponent from "../../components/common/grid/ButtonGridComponent.vue";
import Swal from "sweetalert2";
export default defineComponent({
  name: "EduCourseTypeMngList",
  components: {
    Breadcrumb,
    EduCourseTypeModal,
    LinkGridComponent,
    GridComponent,
    ButtonGridComponent,
  },
  setup() {
    const { t } = useI18n();
    const store = eduCourseStore();
    const cmn = commonStore();
    const paginationPageSize = PAGINATION_PAGE_SIZE;
    const paginationPageSizeSelector = PAGINATION_PAGE_SIZE_SELECTOR;
    const pageable = ref<PageableModel>({
      page: 1,
      size: 10,
      sort: "",
    });
    const breadcrumbItems = [
      { label: "HOME", link: "" },
      { label: "", link: "" },
      {
        label: "",
        link: "#",
      },
    ];
    return {
      t,
      store,
      cmn,
      breadcrumbItems,
      paginationPageSize,
      paginationPageSizeSelector,
      pageable,
    };
  },
  data() {
    return {
      modalOpen: false,
      modeScreen: "",
      eduCourseTypeId: "",
      pageTitle: this.t("02.eduCourseTypeMng.title"),
      rowData: [] as Array<EduInitModel>,
      totalRows: "",
      columnDefs: [
        {
          headerName: this.t("02.eduCourseTypeMng.table.typeNm"),
          field: "typeNm",
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
          flex: 3,
        },
        {
          headerName: this.t("02.eduCourseTypeMng.table.useYn"),
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
          headerName: this.t("02.eduCourseTypeMng.table.regId"),
          field: "regId",
          cellStyle: { textAlign: "center" },
          flex: 2,
        },
        {
          headerName: this.t("02.eduCourseTypeMng.table.regDate"),
          field: "regDate",
          flex: 2,
          cellStyle: { textAlign: "center" },
        },
      ],
      eduId: {} as EduIdModel,
    };
  },
  methods: {
    async getDataAll() {
      this.cmn.setLoading(true);
      await this.store.listEdu(this.pageable);
      if (this.store && this.store.status == SUCCSESS_STATUS) {
        this.rowData = this.store.eduCourseList.data.content;
        this.totalRows = this.store.eduCourseList.data.totalElements;
        this.rowData.forEach((item, index) => {
          item.rowNumber = this.totalRows - item.rowNumber + 1;
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
    register() {
      this.modeScreen = MODE_CREATE;
      this.modalOpen = true;
      this.eduCourseTypeId = "";
    },
    closeModal() {
      this.modalOpen = false;
      this.eduCourseTypeId = "";
    },
    handleCustomClick(data: any) {
      this.modeScreen = MODE_DETAIL;
      this.modalOpen = true;
      this.eduCourseTypeId = data.eduCourseTypeSeq;
    },
    async handleDelete(data: any) {
      this.eduId = data.eduCourseTypeSeq;
      const result = await Swal.fire({
        text: this.t("02.eduCourseTypeMng.message.confirmDelete"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.deleteItem"),
        cancelButtonText: this.t("common.cancel"),
      });

      if (result.isConfirmed) {
        this.cmn.setLoading(true);
        await this.store.deleteItem(this.eduId);
        this.cmn.setLoading(false);
        if (!this.store.status.data) {
          await Swal.fire({
            text: this.t("02.eduCourseTypeMng.message.notDelete"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: this.t("common.confirm"),
          });
        } else {
          await Swal.fire({
            text: this.t("common.message.saveSuccess"),
            type: "warning",
            showCancelButton: false,
            confirmButtonText: this.t("common.confirm"),
          });
          this.getDataAll();
        }
      }
    },
  },
});
</script>
