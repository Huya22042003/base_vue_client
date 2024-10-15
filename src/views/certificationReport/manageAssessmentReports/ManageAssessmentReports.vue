<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>
    <div class="box dp_block" id="section1">
      <div class="box_section">
        <div class="search_box col_4">
          <ul>
            <li>
              <p class="">
                {{ t("06.manageAssessmentReports.search.table.college") }}
              </p>
              <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-if="listSelectBoxCollege.length !== 0"
                v-model="dataSearch.major" :data="listSelectBoxCollege" />
            </li>
            <li>
              <p class="">
                {{ t("06.manageAssessmentReports.search.table.department") }}
              </p>
              <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-if="listSelectBoxDepartment.length !== 0"
                v-model="dataSearch.department" :data="listSelectBoxDepartment" />
            </li>
            <li>
              <p class="">
                {{ t("06.manageAssessmentReports.search.table.schoolYear") }}
              </p>
              <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-if="listSelectBoxSchoolYear.length !== 0"
                v-model="dataSearch.year" :data="listSelectBoxSchoolYear" />
            </li>
            <li>
              <p class="">
                {{ t("06.manageAssessmentReports.search.table.situation") }}
              </p>
              <SelectBoxBase :id="'selectbox'" :name="'selectbox'" v-if="listSelectStatus.length !== 0"
                v-model="dataSearch.status" :data="listSelectStatus" />
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
        <span class="note_custom">※ {{ t("06.manageAssessmentReports.grid.title") }}</span>
        <GridComponentV2 :key="key" :rowData="dataTable" :columnDefs="columnDefs" :paginationClientFlag="false"
          :paginationPageSize="paginationPageSize" @customPagination="fnPagination" :totalRecord="totalRecord"
          :paginationPageSizeSelector="paginationPageSizeSelector">
        </GridComponentV2>
      </div>
    </div>
  </section>
  <RejectDetailModal v-if="modalOpen" :idDetail="objectSelect" :isOpen='modalOpen' :onClose="closeModal">
  </RejectDetailModal>

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
import type { EvalReportMngFilterDTO } from '@/stores/manageAssessmentReports/manageAssessmentReports.type';
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
  FORMAT_YYY_MM_DD,
  MODE_CREATE
} from '@/constants/screen.const';
import { getAllPage, underInvestigation } from '@/stores/manageAssessmentReports/manageAssessmentReports.service';
import RejectDetailModal from './modal/RejectDetailModal.vue'
import type {
  CodeMngModel
} from "@/stores/common/codeMng/codeMng.type";
import {
  getListCodeMng
} from "@/stores/common/codeMng/codeMng.service";
import {
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
  STATUS_EVAL_REPORT,
  MESSAGE_ERROR_API,
  STATUS_EVAL_REPORT_NO_SETUP,
  STATUS_EVAL_REPORT_TEMPORARY_SAVE,
  STATUS_EVAL_REPORT_SAVE_SUCCESS,
  STATUS_EVAL_REPORT_REJECT,
  STATUS_EVAL_TEMPORARY_SAVE
} from '@/constants/common.const';
import { getDepartmentList } from "@/stores/common/department/department.service";
import { format } from 'date-fns';
import { SCREEN } from '@/router/screen';
import { commonStore } from '@/stores/common';

export default defineComponent({
  components: {
    Breadcrumb,
    SelectBoxBase,
    GridComponentV2,
    LinkGridComponent,
    InputBase,
    RejectDetailModal
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
      pageTitle: this.t('06.manageAssessmentReports.title1')/* "자체평가보고서 관리" */,
      breadcrumbItems: [],
      dataSearch: {
        major: "",
        department: "",
        year: new Date().getFullYear().toString(),
        status: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: '',
      } as EvalReportMngFilterDTO,
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
          field: "majorNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 2,
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.department"),
          field: "deptNm",
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
            color: '#2704FF',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: () => {
            return {
              onCustomEvent: this.gotoPage,
            };
          },
        },

        {
          headerName: this.t("06.manageAssessmentReports.grid.situation"),
          field: "statusNm",
          cellStyle: (data: any) => {
            let color = "";
            if (data.data.statusCd === STATUS_EVAL_REPORT_REJECT) {
              color = "#2704FF"
            }
            return {
              color: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: () => {
            return {
              onCustomEvent: this.clickOpenTmodal,
            };
          },
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.approvalRequest"),
          field: "subscribers",
          cellStyle: (data: any) => {
            let color = "";
            if (data.data.statusCd === STATUS_EVAL_REPORT_SAVE_SUCCESS) {
              color = "#2704FF"
            }
            return {
              color: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: () => {
            return {
              onCustomEvent: this.requestApprove,
              value: this.t("06.manageAssessmentReports.grid.btnApprove")/* "승인요청" */
            };
          },
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.print"),
          field: "print",
          cellStyle: (data: any) => {
            let color = "";
            if (data.data.statusCd !== STATUS_EVAL_REPORT_NO_SETUP && data.data.statusCd !== STATUS_EVAL_REPORT_TEMPORARY_SAVE) {
              color = "#2704FF"
            }
            return {
              color: color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: () => {
            return {
              onCustomEvent: this.btnPrint,
              value: this.t("common.print")/* 인쇄 */
            };
          },
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.writer"),
          field: "regId",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.dateCreated"),
          field: "regDate",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      ]),
      dataTable: ref([]),
      modalOpen: false,
      key: 1,
      totalRecord: 0,
      objectSelect: {}
    };
  },
  beforeMount() {
    const currentYear = new Date().getFullYear();

    for (let index = currentYear; index <= currentYear + 1; index++) {
      this.listSelectBoxSchoolYear.push(
        { cdId: index.toString(), cdNm: index.toString(), upCdId: "yearEdu" }
      )
    }

    getDepartmentList({
      deptCd: [],
      deptDivCd: [DIV_CD_DEPT_DEPART, DIV_CD_DEPT_MAJOR],
      upDeptCd: [],
      useYn: ""
    }).then(res => {
      this.listSelectBoxDepartment = res.data.data.filter((el: any) => el.deptDivCd == DIV_CD_DEPT_DEPART).map((el: any) => {
        return {
          cdId: el.deptCd,
          cdNm: el.deptNm,
          upCdId: "dept"
        }
      })
      this.listSelectBoxDepartment.unshift({
        cdId: "",
        cdNm: this.t('common.all'),
        upCdId: "dept"
      });
      this.listSelectBoxCollege = res.data.data.filter((el: any) => el.deptDivCd == DIV_CD_DEPT_MAJOR).map((el: any) => {
        return {
          cdId: el.deptCd,
          cdNm: el.deptNm,
          upCdId: "major"
        }
      })
      this.listSelectBoxCollege.unshift({
        cdId: "",
        cdNm: this.t('common.all'),
        upCdId: "major"
      });
    }).catch(() => {
      throw new Error(MESSAGE_ERROR_API);
    });

    getListCodeMng({ upCdIdList: [STATUS_EVAL_REPORT] }).then(res => {
      this.listSelectStatus = res.data.data.filter((el: CodeMngModel) => el.upCdId == STATUS_EVAL_REPORT);

      this.listSelectStatus.unshift({
        cdId: "",
        cdNm: this.t('common.all'),
        upCdId: STATUS_EVAL_REPORT
      });
    })
  },
  methods: {
    searchFormData() {
      this.dataSearch.page = 1;
      this.key++;
      this.fnPagination(this.dataSearch.page, this.dataSearch.size);
    },
    getAllData() {
      this.store.setLoading(true);
      getAllPage(this.dataSearch).then((res: any) => {
        this.dataTable = res.data.data.content.map((el: any) => {
          el.regDate = el.regDate ? format(el.regDate, FORMAT_YYY_MM_DD) : ' - '
          return el;
        });
        this.totalRecord = res.data.data.totalElements;
      }).finally(() => {
        this.store.setLoading(false);
      })
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
        year: new Date().getFullYear().toString(),
        status: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: '',
      } as EvalReportMngFilterDTO;
    },
    requestApprove(data: any) {
      if (data.statusCd === STATUS_EVAL_REPORT_SAVE_SUCCESS) {
        this.$swal({
          /* "...학년도 교육과정을 승인요청하시겠어요?" */
          text: this.t('06.detailReport.message.confirmRequestApprove', { year: data.year }),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t('06.detailReport.message.btnUnderInvest')/* "승인 신청" */,
          cancelButtonText: "취소",
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.store.setLoading(true);
            underInvestigation({ idDept: data.deptCd, year: data.yearEdu })
              .then((res) => {
                this.$swal.fire({
                  /* 반려처리됐습니다 */
                  text: this.t('capacityDeMng.tutoring.detail.message.successApprove'),
                  confirmButtonColor: '#DD6B55',
                  confirmButtonText: this.t('common.confirm')
                }).then(() => {
                  this.searchFormData();
                });
              }).catch((err) => {
                throw new Error(MESSAGE_ERROR_API);
              }).finally(() => {
                this.store.setLoading(false);
              })
          }
        });
      }
    },
    btnPrint(data: any) {
      // TODO: REPORT
    },
    closeModal() {
      this.modalOpen = false;
    },
    clickOpenTmodal(data: any) {
      if (data.statusCd == STATUS_EVAL_REPORT_REJECT) {
        this.modalOpen = true;

        this.objectSelect = data.reportSeq;
      }
    },
    gotoPage(data: any) {
      if (data.statusCd == STATUS_EVAL_TEMPORARY_SAVE
        || data.statusCd == STATUS_EVAL_REPORT_NO_SETUP
        || data.statusCd == STATUS_EVAL_REPORT_REJECT) {
        this.$swal({
          text: "작성중인 단계로 이동하시겠어요?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t(
            "06.manageAssessmentReports.popUp.popUpYear.confirm"
          ),
          cancelButtonText: this.t(
            "06.manageAssessmentReports.popUp.popUpYear.cancel"
          ),
        }).then((result: any) => {
            this.$router.push({ 
              name: SCREEN.manageAssessmentDetailReport.name, 
              state: { 
                idDept: data.deptCd, 
                year: data.yearEdu, 
                deptNm: data.deptNm, 
                majorNm: data.majorNm,
                mode: MODE_CREATE
              }
            })
        });
      } else {
        this.$router.push({ 
          name: SCREEN.manageAssessmentDetailReport.name, 
          state: { 
            idDept: data.deptCd, 
            year: data.yearEdu, 
            deptNm: data.deptNm, 
            majorNm: data.majorNm ,
            mode: MODE_CREATE
          } 
        })
      }
    },
  },
});
</script>
