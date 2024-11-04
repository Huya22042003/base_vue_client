<template>
  <div class="box_section">
    <div class="box_section mt-13">
      <div class="tbl tbl_col">
        <GridComponentV2
          :rowData="data"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :key="key"
          :totalRecord="totalRows"
          :paginationPageSize="paginationPageSize"
          :paginationPageSizeSelector="paginationPageSizeSelector"
          @customPagination="fnPagination"
          ref="gridKey"
        >
          <template #button>
            <!-- <button
              type="button"
              v-if="isSave"
              @click="gotoCreate"
              class="btn_round btn_lg btn_primary"
            >
              {{ t("eduProcessCreation.attachFile.title1") }}
            </button> -->
            <ButtonBase
              type="button"
              class="btn_round btn_lg btn_primary"
              :buttonName="t('eduProcessCreation.attachFile.title1')"
              @click="gotoCreate"
            ></ButtonBase>
          </template>
        </GridComponentV2>
      </div>
    </div>
    <div class="btn_group btn_end">
      <button
        type="button"
        class="btn_round btn_lg btn_white"
        @click="back()"
      >
        {{ t("common.list") }}
      </button>
    </div>
  </div>
  <ModalAddFile
    v-if="modalOpen"
    :isOpen="modalOpen"
    :onClose="closeModal"
    :apdxSeq="apdxSeqSelected"
    :apdxSelected="apdxSelected"
    :fnPagination="fnPagination"
  />
</template>

<script lang="ts">
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import { useI18n } from "vue-i18n";
import ModalAddFile from "./ModalAddFile.vue";
import { commonStore } from "@/stores/common";
import {
  EduCourseApdxModel,
  EduCourseApdxSearchModel,
} from "@/stores/eduProcessCreation/attachFile/attachFile.type";
import {
  deleteEduCourseApdx,
  getEduCourseApdx,
} from "@/stores/eduProcessCreation/attachFile/attachFile.service";
import { SCREEN } from "@/router/screen";
export default {
  components: {
    ButtonGridComponent,
    LinkGridComponent,
    ModalAddFile,
  },
  props: {
    stage: {
      type: Number,
      default: true,
    },
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const isSave = window.history.state.isSave;

    return { router, storeCommon, t, id, isSave };
  },
  data() {
    return {
      dataSearch: {
        eduCourseSeq: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as EduCourseApdxSearchModel,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      totalRecord: 0,
      data: [] as Array<EduCourseApdxModel>,
      key: 0,
      modalOpen: false,
      columnDefs: [
        {
          headerName: this.t("common.rowNum") /* "번호" */,
          field: "rowNum",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "eduProcessCreation.attachFile.title2"
          ) /* "제목" */,
          field: "ttl",
          cellStyle: {
            textAlign: "left",
          },
          flex: 2.5,
        },
        {
          headerName: this.t(
            "eduProcessCreation.attachFile.title3"
          ) /* "첨부파일" */,
          field: "fimFileOrgName",
          cellStyle: {
            textAlign: "left",
            color: "#0029FF",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: (data: any) => {
            return {
              onCustomEvent: this.goToDetail,
            };
          },
          flex: 1.5,
        },
        {
          headerName: this.t(
            "eduProcessCreation.attachFile.title4"
          ) /* "관리" */,
          field: "action",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.5,
          cellRenderer: ButtonGridComponent,
          cellRendererParams: (data: any) => {
            return {
              onCustomEvent: this.confirmDelete,
              className: "btn_round btn_sm btn_white",
              value: this.t("common.delete") /* "삭제" */,
            };
          },
        },
      ],
      totalRows: 0,
      apdxSeqSelected: "",
      apdxSelected: {},
    };
  },
  beforeMount() {
    this.dataSearch.eduCourseSeq = this.id;
  },
  methods: {
    getDataPage() {
      this.storeCommon.setLoading(true);
      getEduCourseApdx(this.dataSearch)
        .then(
          (res) => {
            this.data = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
          },
          (err) => {}
        )
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.dataSearch.size = pageSize;
      this.dataSearch.page = pageNumber;
      this.dataSearch.sort = "";
      this.getDataPage();
    },
    closeModal() {
      this.modalOpen = false;
    },
    confirmAction() {
      this.closeModal();
    },
    cancelAction() {
      this.closeModal();
    },
    goToDetail(data: EduCourseApdxModel) {
      this.modalOpen = true;
      this.apdxSeqSelected = data.apdxSeq;
      this.apdxSelected = data;
    },
    gotoCreate() {
      this.modalOpen = true;
      this.apdxSeqSelected = "";
      this.apdxSelected = {};
    },
    confirmDelete(data: EduCourseApdxModel) {
      this.$confirm(
        this.t("common.message.confirmDelete"),
        "",
        (isConfirm: Boolean) => {
          if (isConfirm) {
            this.handleDeleteApdx(data.apdxSeq);
          }
        }
      );
    },
    handleDeleteApdx(apdxSeq: any) {
      this.storeCommon.setLoading(true);
      deleteEduCourseApdx({ apdxSeq: apdxSeq }).then((res) => {
        this.storeCommon.setLoading(false);
        this.$swal({
          title: "알림",
          html: this.t("common.message.deleteSuccess"),
          confirmButtonText: this.t("common.confirm"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.fnPagination(1, 10);
          }
        });
      });
    },
    back() {
      this.router.push({
        path: SCREEN.eduProcessCreation.path,
      });
    },
  },
};
</script>
