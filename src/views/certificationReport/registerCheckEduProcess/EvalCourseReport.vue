<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="box dp_block" id="section1">
      <div class="box_section">
        <div class="search_box col_4">
          <ul>
            <li>
              <p class="">
                {{ t("06.manageAssessmentReports.search.table.college") }}
              </p>
              <SelectBoxBase
                :id="'selectbox'"
                :name="'selectbox'"
                v-if="listSelectBoxCollege.length !== 0"
                v-model="dataSearch.major"
                :data="listSelectBoxCollege"
              />
            </li>
            <li>
              <p class="">
                {{ t("06.manageAssessmentReports.search.table.department") }}
              </p>
              <SelectBoxBase
                :id="'selectbox'"
                :name="'selectbox'"
                v-if="listSelectBoxDepartment.length !== 0"
                v-model="dataSearch.department"
                :data="listSelectBoxDepartment"
              />
            </li>
            <li>
              <p class="">
                {{ t("06.manageAssessmentReports.search.table.schoolYear") }}
              </p>
              <SelectBoxBase
                :id="'selectbox'"
                :name="'selectbox'"
                v-if="listSelectBoxSchoolYear.length !== 0"
                v-model="dataSearch.yearEdu"
                :data="listSelectBoxSchoolYear"
              />
            </li>
            <li>
              <p class="">
                {{ t("06.manageAssessmentReports.search.table.situation") }}
              </p>
              <SelectBoxBase
                :id="'selectbox'"
                :name="'selectbox'"
                v-if="listSelectStatus.length !== 0"
                v-model="dataSearch.status"
                :data="listSelectStatus"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="box_section">
        <div class="btn_group btn_end">
          <div class="dp_flex" style="gap: 10px">
            <button class="button btn_xl btn_blue btn_responsive" @click="searchFormData">
              {{ t("06.manageAssessmentReports.search.button.search") }}
            </button>
            <button class="button btn_xl btn_lightgray btn_responsive" @click="reset">
              {{ t("06.manageAssessmentReports.search.button.reset") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="box dp_block" id="section16">
      <div class="box_section">
        <p class="note_custom">
          <!-- ※ 최고 관리자 외에는 로그인한 사용자가 작성 및 승인완료 된
          교육과정으로 목록이 구성됩니다. -->
          {{ t("06.evalCourse.subTitle") }}
        </p>
        <p class="note_custom">
          <!-- ※ 교육과정 인증제 신청서는 자체평가 보고서와 연동됩니다. 미인증 시
          자체평가보고서 수정 후 재 신청을 진행해주세요. -->
          {{ t("06.evalCourse.subTitle1") }}
        </p>
        <GridComponentV2
          :key="key"
          :rowData="dataTable"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :paginationPageSize="paginationPageSize"
          @customPagination="fnPagination"
          :totalRecord="totalRecord"
          :paginationPageSizeSelector="paginationPageSizeSelector"
        >
          <template #button>
            <div>
              <ExportFileExcel
                :callData="true"
                @click="dowloadExcel"
                :btnName="t('06.manageAssessmentReports.grid.exportExcel')"
              >
              </ExportFileExcel>
              <button
                class="button btn_xs btn_primary bo_rd6 ml_1"
                @click="clickOpenModalAddEduCourse"
              >
                {{ t("06.manageAssessmentReports.search.button.search") }}
              </button>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
  <ModalAddEvalCourse
    v-if="modalOpenEduCourse"
    :onEvent="searchFormData"
    :isOpen="modalOpenEduCourse"
    :onClose="closeModalAddEduCourse"
  >
  </ModalAddEvalCourse>
  <RejectDetailModal
    v-if="isOpenReason"
    :id-detail="objectSelect"
    :isOpen="isOpenReason"
    :onClose="closeModalReject"
  ></RejectDetailModal>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { ref } from "vue";
import { defineComponent } from "vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import InputBase from "@/components/common/input/InputBase.vue";
import type {
  EvalCourseCertFilter,
  RegistEduCourseApproveDTO,
} from "@/stores/evalCourseService/evalCourseCert.type";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
  FORMAT_YYY_MM_DD,
SUCCSESS_STATUS,
} from "@/constants/screen.const";
import {
  getPageEvalCourseData,
  registerRepeatApproveEvalCourse,
} from "@/stores/evalCourseService/evalCourseCert.service";
import ModalAddEvalCourse from "./modal/ModalAddEvalCourse.vue";
import RejectDetailModal from "./modal/RejectDetailModal.vue";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
  STATUS_EVAL_REPORT,
  MESSAGE_ERROR_API,
  EVAL_COURSE_STS,
  EVAL_COURSE_CERTIFIED_BASIC,
  EVAL_COURSE_CERTIFIED_HIGH,
  EVAL_COURSE_NOT_CERTIFIED,
} from "@/constants/common.const";
import { getDepartmentList } from "@/stores/common/department/department.service";
import { format } from "date-fns";
import { SCREEN } from "@/router/screen";
import { commonStore } from "@/stores/common";
import ExcelJS from 'exceljs';

export default defineComponent({
  components: {
    Breadcrumb,
    SelectBoxBase,
    GridComponentV2,
    LinkGridComponent,
    InputBase,
    ModalAddEvalCourse,
    RejectDetailModal,
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();

    return {
      store,
      t,
    };
  },

  data() {
    return {
      pageTitle: this.t('06.evalCourse.title')/* "교육과정 인증제 신청" */,
      breadcrumbItems: [],
      dataSearch: {
        major: "",
        department: "",
        yearEdu: new Date().getFullYear().toString(),
        status: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as EvalCourseCertFilter,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listSelectBoxCollege: [] as Array<any>,
      listSelectBoxSchoolYear: [] as Array<any>,
      listSelectBoxDepartment: [] as Array<any>,
      listSelectStatus: [] as Array<any>,
      columnDefs: ref([
        {
          headerName: this.t("06.manageAssessmentReports.grid.number"),
          field: "rowNumb",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.college"),
          field: "major",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 2,
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.department"),
          field: "department",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 2,
        },
        {
          headerName: this.t(
            "06.manageAssessmentReports.grid.curriculumAcademicYear"
          ),
          field: "yearEdu",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: { onCustomEvent: this.gotoPage },
          flex: 2,
        },

        {
          headerName: this.t("06.manageAssessmentReports.grid.situation"),
          field: "statusNm",
          cellStyle: (data: any) => {
            let color = "";
            if (
              data.data.statusCd === EVAL_COURSE_CERTIFIED_BASIC ||
              data.data.statusCd === EVAL_COURSE_CERTIFIED_HIGH ||
              data.data.statusCd === EVAL_COURSE_NOT_CERTIFIED
            ) {
              color = "#2704FF";
            }
            return {
              color: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            };
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: () => {
            return {
              onCustomEvent: this.clickOpenModalAddOpinion,
            };
          },
          flex: 2,
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.approvalRequest"),
          field: "subscribers",
          cellStyle: (data: any) => {
            let color = "";
            if (data.data.statusCd === EVAL_COURSE_NOT_CERTIFIED) {
              color = "#2704FF";
            } else {
              color = "#6F6F6F";
            }
            return {
              color: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            };
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: (data: any) => {
            return {
              onCustomEvent: this.requestApprove,
              /* "승인요청" */
              value:
                data.data.statusCd === EVAL_COURSE_NOT_CERTIFIED
                  ? "[재신청]"
                  : this.t("06.manageAssessmentReports.grid.btnApprove"),
            };
          },
          flex: 1,
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.writer"),
          field: "approve",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 2,
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.dateCreated"),
          field: "approveDate",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 2,
        },
      ]),
      dataTable: ref([]),
      modalOpenEduCourse: false,
      modalId: "demo",
      key: 1,
      totalRecord: 0,
      objectSelect: "",
      isOpenReason: false,
    };
  },
  beforeMount() {
    const currentYear = new Date().getFullYear();

    for (let index = currentYear; index <= currentYear + 1; index++) {
      this.listSelectBoxSchoolYear.push({
        cdId: index.toString(),
        cdNm: index.toString(),
        upCdId: "yearEdu",
      });
    }

    getDepartmentList({
      deptCd: [],
      deptDivCd: [DIV_CD_DEPT_DEPART, DIV_CD_DEPT_MAJOR],
      upDeptCd: [],
      useYn: "",
    })
      .then((res) => {
        this.listSelectBoxDepartment = res.data.data
          .filter((el: any) => el.deptDivCd == DIV_CD_DEPT_DEPART)
          .map((el: any) => {
            return {
              cdId: el.deptCd,
              cdNm: el.deptNm,
              upCdId: "dept",
            };
          });
        this.listSelectBoxDepartment.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "dept",
        });
        this.listSelectBoxCollege = res.data.data
          .filter((el: any) => el.deptDivCd == DIV_CD_DEPT_MAJOR)
          .map((el: any) => {
            return {
              cdId: el.deptCd,
              cdNm: el.deptNm,
              upCdId: "major",
            };
          });
        this.listSelectBoxCollege.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "major",
        });
      })
      .catch(() => {
        throw new Error(MESSAGE_ERROR_API);
      });

    getListCodeMng({ upCdIdList: [EVAL_COURSE_STS] }).then((res) => {
      this.listSelectStatus = res.data.data.filter(
        (el: CodeMngModel) => el.upCdId == STATUS_EVAL_REPORT
      );

      this.listSelectStatus.unshift({
        cdId: "",
        cdNm: this.t("common.all"),
        upCdId: EVAL_COURSE_STS,
      });
    });
  },
  methods: {
    closeModalReject() {
      this.isOpenReason = false;
      this.objectSelect = "";
    },
    searchFormData() {
      this.dataSearch.page = 1;
      this.key++;
      this.fnPagination(this.dataSearch.page, this.dataSearch.size);
    },
    getAllData() {
      this.store.setLoading(true);
      getPageEvalCourseData(this.dataSearch)
        .then((res: any) => {
          this.dataTable = res.data.data.content.map((el: any) => {
            el.approveDate = el.approveDate
              ? format(el.approveDate, FORMAT_YYY_MM_DD)
              : " - ";
            return el;
          });
          this.totalRecord = res.data.data.totalElements;
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.dataSearch.page = pageNumber;
      this.dataSearch.size = pagesSize;

      this.getAllData();
    },
    reset() {
      this.dataSearch = {
        major: "",
        department: "",
        yearEdu: new Date().getFullYear().toString(),
        status: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as EvalCourseCertFilter;
    },
    closeModalAddEduCourse() {
      this.modalOpenEduCourse = false;
    },
    clickOpenModalAddEduCourse() {
      this.modalOpenEduCourse = true;
    },
    clickOpenModalAddOpinion(data: any) {
      if (
        data.statusCd === EVAL_COURSE_CERTIFIED_BASIC ||
        data.statusCd === EVAL_COURSE_CERTIFIED_HIGH ||
        data.statusCd === EVAL_COURSE_NOT_CERTIFIED
      ) {
        this.objectSelect = data.id;
        this.isOpenReason = true;
      }
    },
    requestApprove(data: any) {
      if (data.statusCd === EVAL_COURSE_NOT_CERTIFIED) {
        this.$swal({
          text: this.t("06.evalCourse.requestApprove")/* "교육과정 인증 신청하시겠어요?" */,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("06.manageAssessmentReports.grid.approve"),
          cancelButtonText: "취소",
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.store.setLoading(true);

            let dataForm = {
              id: data.id,
              reason: null,
            } as RegistEduCourseApproveDTO;

            registerRepeatApproveEvalCourse(dataForm)
              .then((res: any) => {
                this.$swal
                  .fire({
                    /* 신청됐습니다 */
                    text: this.t('06.evalCourse.requestApproveSuccess'),
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: this.t("common.confirm"),
                  })
                  .then(() => {
                    this.searchFormData();
                  });
              })
              .catch((err) => {
                throw new Error(MESSAGE_ERROR_API);
              })
              .finally(() => {
                this.store.setLoading(false);
              });
          }
        });
      }
    },
    gotoPage(data: any) {
      this.$router.push({
        name: SCREEN.evalCourseReportDetail.name,
        state: {
          id: data.id,
        },
      });
    },
    dowloadExcel() {
        this.store.setLoading(true)
        let dataSearch = {
            ...this.dataSearch,
            page: 1,
            size: this.totalRecord,
            sort: ""
        }
        getPageEvalCourseData(dataSearch).then(res => {
            if (res.status === SUCCSESS_STATUS) {
                let dataContent = res.data.data.content;
                
                const header = [
                    this.t("common.rowNum"),
                    this.t("06.manageAssessmentReports.grid.college"),
                    this.t("06.manageAssessmentReports.grid.department"),
                    this.t("06.manageAssessmentReports.grid.curriculumAcademicYear"),
                    this.t("06.manageAssessmentReports.grid.situation"),
                    this.t("06.manageAssessmentReports.grid.writer"),
                    this.t("06.manageAssessmentReports.grid.dateCreated")
                  ]

                let content = [] as Array<any>;

                dataContent.forEach((element:any, index:number) => {
                    let contentItem = [];
                    element.approveDate = element.approveDate ? format(element.approveDate, FORMAT_YYY_MM_DD) : ' - '
                
                    contentItem.push(element.rowNumb);
                    contentItem.push(element.major);
                    contentItem.push(element.department);
                    contentItem.push(element.yearEdu);
                    contentItem.push(element.statusNm);
                    contentItem.push(element.approveNm);
                    contentItem.push(element.approveDate);

                    content.push(contentItem);
                });
                const dataExport = [{ sheetName: 'sheet1', data: content, header: header }]

                const workbook = new ExcelJS.Workbook();
                let sheet;
                dataExport.forEach(element => {
                    sheet = workbook.addWorksheet(element.sheetName);
                    sheet.addRow(element.header);
                    element.data.forEach(el => {
                        sheet.addRow(el);
                    })
                });

                workbook.xlsx.writeBuffer().then((buffer) => {
                    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    let newFileName = `${format(new Date(), 'yyyyMMddHHmmss')}_참가자_목록.xlsx`;
                    link.download = newFileName;
                    link.click();
                    link.remove();
                });
            }
        }).catch((err) => {
            throw new Error(MESSAGE_ERROR_API);
        }).finally(() => {
            this.store.setLoading(false)
        })
    }
  },
});
</script>
