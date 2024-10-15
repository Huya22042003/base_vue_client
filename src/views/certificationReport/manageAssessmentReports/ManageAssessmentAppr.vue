<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb
        :pageTitle="pageTitle"
        :breadcrumbItems="breadcrumbItems"
      ></Breadcrumb>
      <div>
        <div class="box dp_block">
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
                    {{
                      t("06.manageAssessmentReports.search.table.department")
                    }}
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
                    {{
                      t("06.manageAssessmentReports.search.table.schoolYear")
                    }}
                  </p>
                  <SelectBoxBase
                    :id="'selectbox'"
                    :name="'selectbox'"
                    v-model="dataSearch.year"
                    v-if="listSelectBoxSchoolYear.length !== 0"
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
        </div>
        <div class="box dp_block" id="section16">
          <div class="box_section">
            <span class="note_custom">
              {{ t("06.manageAssessmentReports.grid.title1") }}
            </span>
            <div class="search_box col_3">
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
                  <div class="dp_flex" style="gap: 10px">
                    <ExportFileExcel
                      :callData="true"
                      ref="exportExcelRef"
                      @click="dowloadExcel"
                      :data="dataExport"
                      :fileName="fileNameExport"
                      :btnName="
                        t('06.manageAssessmentReports.grid.exportExcel')
                      "
                    >
                    </ExportFileExcel>
                  </div>
                  <button
                    :disabled="!checkApprove"
                    type="button"
                    class="button btn_xs btn_blue"
                    @click="approve()"
                  >
                    {{ t("06.manageAssessmentReports.grid.approve") }}
                  </button>
                  <button
                    :disabled="!checkReject"
                    type="button"
                    class="button btn_xs btn_blue"
                    @click="reject()"
                  >
                    {{ t("06.manageAssessmentReports.grid.reject") }}
                  </button>
                </template>
              </GridComponentV2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <RejectDetailModal
    v-if="isOpenReason"
    :id-detail="objectSelect"
    :isOpen="isOpenReason"
    :onClose="closeModalReject"
  ></RejectDetailModal>
  <ReasonRejeactModal
    v-if="isOpenReject"
    :onEvent="searchFormData"
    :id-detail="objectSelect"
    :isOpen="isOpenReject"
    :onClose="closeModalReason"
  ></ReasonRejeactModal>
</template>
<script lang="ts">
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import { ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import InputBase from "@/components/common/input/InputBase.vue";
import type { EvalReportMngFilterDTO } from "@/stores/manageAssessmentReports/manageAssessmentReports.type";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
  FORMAT_YYY_MM_DD,
  SUCCSESS_STATUS,
  MODE_DETAIL,
} from "@/constants/screen.const";
import {
  getPageApproveReport,
  approveEvalAll,
} from "@/stores/manageAssessmentReports/manageAssessmentReports.service";
import RejectDetailModal from "./modal/RejectDetailModal.vue";
import ReasonRejeactModal from "./modal/ReasonRejeactModal.vue";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { getDepartmentList } from "@/stores/common/department/department.service";
import {
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
  STATUS_EVAL_REPORT,
  MESSAGE_ERROR_API,
  STATUS_EVAL_REPORT_BEFFOR_APPROVE,
  STATUS_EVAL_REPORT_REJECT,
} from "@/constants/common.const";
import CheckboxGrid from "@/components/common/grid/CheckboxGrid.vue";
import { format } from "date-fns";
import { SCREEN } from "@/router/screen";
import { commonStore } from "@/stores/common";

export default {
  components: {
    Breadcrumb,
    SelectBoxBase,
    GridComponentV2,
    LinkGridComponent,
    InputBase,
    RejectDetailModal,
    ReasonRejeactModal,
    CheckboxGrid,
  },
  setup: () => {
    const { t } = useI18n();
    const store = commonStore();
    const exportExcelRef = ref(null)

    return {
      store,
      t,
      exportExcelRef
    };
  },
  data() {
    return {
        /* "교육과정 인증제 신청" */
      pageTitle: this.t('06.manageAssessmentReports.title'),
      breadcrumbItems: [],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listSelectBoxCollege: [] as Array<any>,
      listSelectBoxSchoolYear: [] as Array<any>,
      listSelectBoxDepartment: [] as Array<any>,
      listSelectStatus: [] as Array<any>,
      dataSearch: {
        major: "",
        department: "",
        year: new Date().getFullYear().toString(),
        status: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as EvalReportMngFilterDTO,
      columnDefs: ref([
        {
          headerName: this.t("06.manageAssessmentReports.grid.situation"),
          headerComponent: CheckboxGrid,
          headerComponentParams: {
            onCustomEvent: this.checkAll,
            valueChecked: this.selectAll,
            type: "selectAll",
            selectAllGridId: "selectAllGridId01",
            childName: "childName",
          },
          cellRenderer: CheckboxGrid,
          cellRendererParams: {
            onCustomEvent: this.checkChild,
            type: "selectChildCheckShow",
            selectAllGridId: "selectAllGridId01",
            childName: "childName",
          },
          width: 10,
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.situation"),
          field: "statusNm",
          cellStyle: (data: any) => {
            let color = "";
            if (data.data.statusCd === STATUS_EVAL_REPORT_REJECT) {
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
              onCustomEvent: this.clickOpenTmodal,
            };
          },
          flex: 2,
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
            color: "#2704FF",
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
          flex: 2,
        },
        {
          headerName: this.t(
            "06.manageAssessmentReports.grid.curriculumAcademicYear"
          ),
          field: "yearEdu",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 2,
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.writer"),
          field: "approveId",
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
        {
          headerName: this.t("06.manageAssessmentReports.grid.userApprove"),
          field: "procId",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 2,
        },
        {
          headerName: this.t("06.manageAssessmentReports.grid.approveDate"),
          field: "provDate",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          flex: 2,
        },
      ]),
      rowDataService1: ref([]),
      listCheckBoxGrid: [],
      fileNameExport: "fileDowload",
      dataTable: [],
      dataExport: [],
      key: 1,
      totalRecord: 0,
      checkApprove: false,
      checkReject: false,
      isOpenReject: false,
      isOpenReason: false,
      objectSelect: {},
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

    getListCodeMng({ upCdIdList: [STATUS_EVAL_REPORT] }).then((res) => {
      this.listSelectStatus = res.data.data.filter(
        (el: CodeMngModel) => el.upCdId == STATUS_EVAL_REPORT
      );

      this.listSelectStatus.unshift({
        cdId: "",
        cdNm: this.t("common.all"),
        upCdId: STATUS_EVAL_REPORT,
      });
    });
  },
  methods: {
    checkChild(value, data) {
      if (value) {
        this.listCheckBoxGrid.push(data.id);
      } else {
        const index = this.listCheckBoxGrid.indexOf(data.id);
        if (index !== -1) {
          this.listCheckBoxGrid.splice(index, 1);
        }
      }

      this.listCheckBoxGrid = [...new Set(this.listCheckBoxGrid)];

      if (this.listCheckBoxGrid.length > 0) {
        this.checkApprove = true;
        if (this.listCheckBoxGrid.length == 1) {
          this.checkReject = true;
        } else {
          this.checkReject = false;
        }
      } else {
        this.checkApprove = false;
        this.checkReject = false;
      }
    },
    checkAll(value: boolean) {
      this.rowDataService1.forEach((item) => {
        item.checkedFlag = value;
        if (value) {
          this.listCheckBoxGrid.push(item.id);
        } else {
          const index = this.listCheckBoxGrid.indexOf(item.id);
          if (index !== -1) {
            this.listCheckBoxGrid.splice(index, 1);
          }
        }
      });
    },
    approve() {
      this.$swal({
        text: this.t(
          "06.detailReport.message.confirmApprove"
        ) /* "승인처리하시겠어요?" */,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t(
          "06.manageAssessmentReports.grid.approve"
        ) /* "승인" */,
        cancelButtonText: "취소",
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);
          approveEvalAll(this.listCheckBoxGrid)
            .then((res) => {
              this.$swal
                .fire({
                  /* 반려처리됐습니다 */
                  text: this.t("06.detailReport.message.successApprove"),
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
    },
    reject() {
      this.isOpenReject = true;
      this.objectSelect = this.listCheckBoxGrid[0];
    },
    searchFormData() {
      this.dataSearch.page = 1;
      this.key++;
      this.fnPagination(this.dataSearch.page, this.dataSearch.size);
    },
    reset() {
      this.dataSearch = {
        major: "",
        department: "",
        year: new Date().getFullYear().toString(),
        status: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as EvalReportMngFilterDTO;
    },
    closeModalReject() {
      this.isOpenReason = false;
      this.objectSelect = null;
    },
    closeModalReason() {
      this.isOpenReject = false;
      this.objectSelect = null;
    },
    clickOpenTmodal(data: any) {
      this.objectSelect = data.id;
      this.isOpenReason = true;
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.dataSearch.page = pageNumber;
      this.dataSearch.size = pagesSize;

      this.getAllData();
    },
    getAllData() {
      this.store.setLoading(true);
      getPageApproveReport(this.dataSearch)
        .then((res: any) => {
          this.dataTable = res.data.data.content.map((el: any) => {
            el.approveDate = el.approveDate
              ? format(el.approveDate, FORMAT_YYY_MM_DD)
              : " - ";
            el.provDate = el.provDate
              ? format(el.provDate, FORMAT_YYY_MM_DD)
              : " - ";

            if (this.listCheckBoxGrid.includes(el.id)) {
              el.checkedFlag = true;
            }

            if (el.statusCd === STATUS_EVAL_REPORT_BEFFOR_APPROVE) {
              el.checkedShow = true;
            } else {
              el.checkedShow = false;
            }

            return el;
          });
          this.totalRecord = res.data.data.totalElements;
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    gotoPage(data: any) {
      this.$router.push({
        name: SCREEN.manageAssessmentDetailReport.name,
        state: {
          idDept: data.deptCd,
          year: data.yearEdu,
          deptNm: data.deptNm,
          majorNm: data.majorNm,
          mode: MODE_DETAIL,
        },
      });
    },
    dowloadExcel() {
      this.store.setLoading(true);
      let dataSearch = {
        ...this.dataSearch,
        page: 1,
        size: this.totalRecord,
      };
      getPageApproveReport(dataSearch)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            let dataContent = res.data.data.content;
            const header = [
              this.t("common.rowNum"),
              this.t("06.manageAssessmentReports.grid.situation"),
              this.t("06.manageAssessmentReports.grid.college"),
              this.t("06.manageAssessmentReports.grid.department"),
              this.t("06.manageAssessmentReports.grid.curriculumAcademicYear"),
              this.t("06.manageAssessmentReports.grid.writer"),
              this.t("06.manageAssessmentReports.grid.dateCreated"),
              this.t("06.manageAssessmentReports.grid.userApprove"),
              this.t("06.manageAssessmentReports.grid.approveDate"),
            ];
            let content = [] as Array<any>;
            dataContent.forEach((element: any, index: number) => {
              let contentItem = [];
              element.approveDate = element.approveDate
                ? format(element.approveDate, FORMAT_YYY_MM_DD)
                : " - ";
              element.provDate = element.provDate
                ? format(element.provDate, FORMAT_YYY_MM_DD)
                : " - ";

              contentItem.push(index + 1);
              contentItem.push(element.statusNm);
              contentItem.push(element.majorNm);
              contentItem.push(element.deptNm);
              contentItem.push(element.yearEdu);
              contentItem.push(element.approveId);
              contentItem.push(element.approveDate);
              contentItem.push(element.procId);
              contentItem.push(element.provDate);

              content.push(contentItem);
            });

            this.dataExport = [
              { sheetName: "sheet1", data: content, header: header },
            ];
              
            this.exportExcelRef.downloadExcel();
          }
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
  },
};
</script>
<style>
.styleTd {
  text-align: center;
}
</style>
