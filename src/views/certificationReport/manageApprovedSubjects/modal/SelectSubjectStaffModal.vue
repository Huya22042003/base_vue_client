<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'modal_form'"
    @close-modal="onClose"
  >
    <template #title>
      <strong>{{ t("06.manageApprovedSubjects.popUp.title") }}</strong>
    </template>
    <template #default>
      <div class="box_section">
        <GridComponentV2
          id="subject"
          :rowData="dataTable"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :paginationPageSize="paginationPageSize"
          @customPagination="fnPagination"
          :totalRecord="totalRecord"
          :paginationPageSizeSelector="paginationPageSizeSelector"
        >
        </GridComponentV2>
      </div>
    </template>
    <template #footer>
      <button type="button" class="button btn_md btn_black" @click="onClose()">
        {{ t("06.manageApprovedSubjects.popUp.confirm") }}
      </button>
    </template>
  </TModal>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "@/constants/screen.const";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { getPageSelectSubject, registerSubject } from "@/stores/approvedSubjectsStaff/approvedSubjectsStaff.service";
import type {
  SelectSubjectFilterDTO,
  SelectSubjectResDTO,
} from "@/stores/approvedSubjectsStaff/approvedSubjectsStaff.type";

export default {
  components: {
    LinkGridComponent,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    onEvent: {
      type: Function,
    },
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    return {
      t,
      store,
    };
  },
  data() {
    return {
      dataDetail: {
        id: "",
        createdName: "",
        department: "",
        opinion: "",
      },
      dataTable: [],
      columnDefs: [
        {
          /* "개설년도-학기" */
          headerName: this.t("certificationReport.manageApprovedSubjects.header11"),
          field: "yearEdu",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          /* "학과" */
          headerName: this.t("certificationReport.manageApprovedSubjects.header12"),
          field: "department",
        },
        {
          /* "과목명" */
          headerName: this.t("certificationReport.manageApprovedSubjects.header13"),
          field: "subjectNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          /* "이수구분" */
          headerName: this.t("certificationReport.manageApprovedSubjects.header14"),
          field: "sustDivNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },

        {
          /* "학년" */
          headerName: this.t("certificationReport.manageApprovedSubjects.header15"),
          field: "gradeNm",
        },
        {
          /* "분반" */
          headerName: this.t("certificationReport.manageApprovedSubjects.header16"),
          field: "division",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          /* "담당교수" */
          headerName: this.t("certificationReport.manageApprovedSubjects.header17"),
          field: "staffNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          /* "구분" */
          headerName: this.t("certificationReport.manageApprovedSubjects.header18"),
          field: "divNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          /* "선택" */
          headerName: this.t("certificationReport.manageApprovedSubjects.header19"),
          field: "register",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "blue",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: { onCustomEvent: this.selectSubject, value: `[${this.t('common.select')}]` },
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      formSearch: {
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SelectSubjectFilterDTO,
      totalRecord: 0,
    };
  },
  beforeMount() {
  },
  methods: {
    fnPagination(pageNumber: number, pagesSize: number) {
      this.formSearch.page = pageNumber;
      this.formSearch.size = pagesSize;
      this.getAllData();
    },
    getAllData() {
      this.store.setLoading(true);
      getPageSelectSubject(this.formSearch)
        .then((res) => {
          const data = res.data.data;
          this.dataTable = data.content.map((el: SelectSubjectResDTO) => {
            el.yearEdu = `${el.yearEdu} - ${el.semester}`;

            return el;
          });
          this.totalRecord = data.totalElements;
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    selectSubject(data: SelectSubjectResDTO) {
      this.$swal({
        text: this.t("certificationReport.manageApprovedSubjects.message13", {subjectNm: data.subjectNm}),
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("certificationReport.manageApprovedSubjects.approve"),
        cancelButtonText: this.t('common.cancel'),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);
          registerSubject(data.lectCd).then((res) => {
            this.onEvent();
            this.onClose();
          }).finally(() => {
            this.store.setLoading(false);
          })
        }
      });
    }
  },
};
</script>
