<template>
  <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" :modal-id="'modal_form'"
    @close-modal="onClose">
    <template #title>
      <strong>
        <!-- 인증 신청 교육과정 선택 -->
         {{ t('06.evalCourse.modal.title') }}
        </strong>
    </template>
    <template #default>
      <div class="box_section">
        <GridComponentV2 id="tableModal" :key="key" :rowData="dataTable" :columnDefs="columnDefs"
          :paginationClientFlag="false" :paginationPageSize="paginationPageSize" @customPagination="fnPagination"
          :totalRecord="totalRecord" :paginationPageSizeSelector="paginationPageSizeSelector">
        </GridComponentV2>
      </div>
    </template>
    <template #footer>
      <button type="button" class="button btn_sm btn_white" @click="onClose()">
        {{ t("common.cancel") }}
      </button>
    </template>
  </TModal>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { commonStore } from '@/stores/common';
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from '@/constants/screen.const';
import type { EducationCourseFilterDTO, EducationCourseResDTO } from '@/stores/evalCourseService/evalCourseCert.type';
import { getAllEducationCourse, registerEvalCourse } from '@/stores/evalCourseService/evalCourseCert.service';

export default {
  components: {
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    onEvent: {
      type: Function,
      required: true
    }
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    return {
      t,
      store
    };
  },
  data() {
    return {
      dataDetail: {
        reason: ""
      },
      key: 1,
      totalRecord: 0,
      dataTable: [],
      columnDefs: [
        {
          headerName: this.t("06.manageAssessmentReports.grid.number"),
          field: "yearEdu",
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.college"),
          field: "department",
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.department"),
          field: "type",
        },
        {
          headerName: this.t(
            "06.manageAssessmentReports.grid.curriculumAcademicYear"
          ),
          field: "created",
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.number"),
          cellStyle: {
            color: '#2704FF',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: () => {
            return {
              onCustomEvent: this.selectedEduCourse,
              value: `[${this.t("common.select")}]`
            };
          },
        }
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      dataSearch: {
        createdId: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: '',
      } as EducationCourseFilterDTO,
    }
  },
  methods: {
    selectedEduCourse(data: EducationCourseResDTO) {
      this.$swal({
        text: this.t('06.detailReport.message.confirmSelectEduCourse', {
          year: data.yearEdu,
          department: data.department
        })/* "교육과정 인증을 신청 하시겠어요?" */,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t('06.manageAssessmentReports.grid.approve')/* "승인" */,
        cancelButtonText: "취소",
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);

          let dataForm = {
            eduYear: data.yearEdu,
            departmentCd: data.deptCd
          }
          registerEvalCourse(dataForm).then((res: any) => {
            this.onEvent();
            this.onClose();
          }).finally(() => {
            this.store.setLoading(false);
          })
        }
      });
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.dataSearch.page = pageNumber;
      this.dataSearch.size = pagesSize;

      this.getAllData();
    },
    getAllData() {
      this.store.setLoading(true);
      getAllEducationCourse(this.dataSearch).then((res: any) => {
        this.dataTable = res.data.data.content;
        this.totalRecord = res.data.data.totalElements;
      }).finally(() => {
        this.store.setLoading(false);
      })
    },
  }
}
</script>

<style scoped>
/* Your styles here */
</style>