<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="box dp_block" id="section1">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p class="">
                {{ t("06.manageApprovedSubjects.search.division") }}
              </p>
              <RadiobuttonBase
                v-for="(item, index) in listRadioType"
                :mode="'show'"
                :value="item.cdId"
                v-model="formSearch.type"
                :id="`${item.cdId}_${index}_type`"
                :name="`${item.cdId}_${index}_type`"
                :key="`${item.cdId}_${index}_type`"
                :checked="item.cdId == formSearch.type"
                :label="item.cdNm"
              >
              </RadiobuttonBase>
            </li>
            <li>
              <p class="">
                {{ t("06.manageApprovedSubjects.search.situation") }}
              </p>
              <RadiobuttonBase
                v-for="(item, index) in listRadioStatusHyflex"
                :value="item.cdId"
                v-model="formSearch.status"
                :id="`${item.cdId}_${index}_hyflex`"
                :name="`${item.cdId}_${index}_hyflex`"
                :key="`${item.cdId}_${index}_hyflex`"
                :checked="item.cdId == formSearch.status"
                :label="item.cdNm"
              >
              </RadiobuttonBase>
            </li>
            <li>
              <p class="">
                {{ t("06.manageApprovedSubjects.search.subjectName") }}
              </p>
              <InputBase v-model="formSearch.subjectName" />
            </li>
            <li>
              <p class="">
                {{ t("06.manageApprovedSubjects.search.applicant") }}
              </p>
              <InputBase v-model="formSearch.register" />
            </li>
            <li>
              <p class="">
                {{ t("06.manageApprovedSubjects.search.approver") }}
              </p>
              <InputBase v-model="formSearch.approveName" />
            </li>
          </ul>
        </div>
      </div>
      <div class="box_section">
        <div class="btn_group btn_end">
          <div class="dp_flex" style="gap: 10px">
            <button
              class="button btn_xl btn_blue btn_responsive"
              @click="searchFormData"
            >
              {{ t("06.manageAssessmentReports.search.button.search") }}
            </button>
            <button
              class="button btn_xl btn_lightgray btn_responsive"
              @click="reset"
            >
              {{ t("06.manageAssessmentReports.search.button.reset") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="box dp_block" id="section16">
      <div class="box_section">
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
              <ExportFileExcel
                :callData="true"
                @click="dowloadExcel"
                :btnName="t('06.manageAssessmentReports.grid.exportExcel')"
              >
              </ExportFileExcel>
            </template>
          </GridComponentV2>
        </div>
      </div>
    </div>
  </section>

  <ReasonRejectModal
    v-if="opentReason"
    :isOpen="opentReason"
    :onClose="onCloseReason"
    :idDetail="idDetail"
  >
  </ReasonRejectModal>
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
import { getPageSbjtCert } from "@/stores/manageApprovedSubjects/manageApprovedSubjects.service";
import type {
  SubjectApproveFilterResDTO,
  SubjectApproveResDTO,
} from "@/stores/manageApprovedSubjects/manageApprovedSubjects.type";
import { SCREEN } from "@/router/screen";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
  FORMAT_YYY_MM_DD,
  SUCCSESS_STATUS,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  STATUS_SUBJECT,
  STATUS_CAPSTONE,
  STATUS_HYFLEX_AL,
  STATUS_SUBJECT_CAPSTONE,
  HYFLEX_AL_STATUS_REJECT,
  CAPSTONE_DESIGN_STATUS_REJECT,
  MESSAGE_ERROR_API,
} from "@/constants/common.const";
import { format } from "date-fns";
import ReasonRejectModal from "./modal/ReasonRejectModal.vue";
import ExcelJS from "exceljs";
import Swal from "sweetalert2";

export default defineComponent({
  components: {
    Breadcrumb,
    SelectBoxBase,
    GridComponentV2,
    LinkGridComponent,
    InputBase,
    ReasonRejectModal,
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();

    return {
      store,
      t,
      STATUS_SUBJECT_CAPSTONE,
    };
  },

  data() {
    return {
      pageTitle: this.t(
        "06.manageApprovedSubjects.title"
      ) /* "교과목 인증제 승인 관리" */,
      breadcrumbItems: [],
      listRadioType: [] as CodeMngModel[],
      listRadioStatusCapstone: [] as CodeMngModel[],
      listRadioStatusHyflex: [] as CodeMngModel[],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      columnDefs: ref([
        {
          headerName: this.t("06.manageApprovedSubjects.grid.division"),
          field: "type",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("06.manageApprovedSubjects.grid.situation"),
          field: "status",
          cellStyle: (data: any) => {
            let color = "";
            if (
              data.data.statusCd == CAPSTONE_DESIGN_STATUS_REJECT ||
              data.data.statusCd === HYFLEX_AL_STATUS_REJECT
            ) {
              color = "blue";
            }
            return {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: color,
            };
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: () => {
            return {
              onCustomEvent: this.clickOpenModalReject,
            };
          },
        },
        {
          headerName: this.t("06.manageApprovedSubjects.grid.applicationField"),
          field: "fieldNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t(
            "06.manageApprovedSubjects.grid.yearOfEstablishmentSemester"
          ),
          field: "yearSemester",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },

        {
          headerName: this.t("06.manageApprovedSubjects.grid.subjectName"),
          field: "name",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "blue",
          },
          cellRenderer: LinkGridComponent,
          cellRendererParams: { onCustomEvent: this.gotoPage },
        },
        {
          headerName: this.t(
            "06.manageApprovedSubjects.grid.courseClassification"
          ),
          field: "sustNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("06.manageApprovedSubjects.grid.grade"),
          field: "year",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("06.manageApprovedSubjects.grid.approver"),
          field: "approveName",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("06.manageApprovedSubjects.grid.paymentDate"),
          field: "approveDate",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("06.manageApprovedSubjects.grid.applicant"),
          field: "register",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("06.manageApprovedSubjects.grid.applicantDate"),
          field: "registerDate",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      ]),
      dataTable: [] as SubjectApproveResDTO[],
      formSearch: {
        type: "",
        status: "",
        subjectName: "",
        approveName: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SubjectApproveFilterResDTO,
      key: 1,
      totalRecord: 0,
      opentReason: false,
      idDetail: "",
    };
  },
  beforeMount() {
    getListCodeMng({
      upCdIdList: [STATUS_SUBJECT, STATUS_CAPSTONE, STATUS_HYFLEX_AL],
    }).then((res) => {
      this.listRadioType = res.data.data.filter(
        (el: CodeMngModel) => el.upCdId == STATUS_SUBJECT
      );
      this.listRadioStatusCapstone = res.data.data.filter(
        (el: CodeMngModel) => el.upCdId == STATUS_CAPSTONE
      );
      this.listRadioStatusHyflex = res.data.data.filter(
        (el: CodeMngModel) => el.upCdId == STATUS_HYFLEX_AL
      );
      this.listRadioType.unshift({
        cdId: "",
        cdNm: this.t("common.all"),
        upCdId: STATUS_SUBJECT,
      });
      this.listRadioStatusCapstone.unshift({
        cdId: "",
        cdNm: this.t("common.all"),
        upCdId: STATUS_SUBJECT,
      });
      this.listRadioStatusHyflex.unshift({
        cdId: "",
        cdNm: this.t("common.all"),
        upCdId: STATUS_SUBJECT,
      });
    });
  },
  methods: {
    onCloseReason() {
      this.opentReason = false;
      this.idDetail = "";
    },
    searchFormData() {
      this.formSearch.page = 1;
      this.key++;
      this.fnPagination(this.formSearch.page, this.formSearch.size);
    },
    reset() {
      this.formSearch = {
        type: "",
        status: "",
        subjectName: "",
        approveName: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SubjectApproveFilterResDTO;
    },
    fnPagination(pageNumber: number, pagesSize: number) {
      this.formSearch.page = pageNumber;
      this.formSearch.size = pagesSize;
      this.getAllData();
    },
    getAllData() {
      this.store.setLoading(true);
      getPageSbjtCert(this.formSearch)
        .then((res) => {
          const data = res.data.data;
          this.dataTable = data.content.map((el: SubjectApproveResDTO) => {
            el.yearSemester = `${el.yearEdu} - ${el.semester}`;
            el.approveDate = el.approveDate
              ? format(el.approveDate, FORMAT_YYY_MM_DD)
              : " - ";
            el.registerDate = el.registerDate
              ? format(el.registerDate, FORMAT_YYY_MM_DD)
              : " - ";
            return el;
          });
          this.totalRecord = data.totalElements;
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    clickOpenModalReject(data: SubjectApproveResDTO) {
      if (
        data.statusCd == CAPSTONE_DESIGN_STATUS_REJECT ||
        data.statusCd === HYFLEX_AL_STATUS_REJECT
      ) {
        this.opentReason = true;
        this.idDetail = data.id;
      }
    },
    goPageHyflexAl(data: SubjectApproveResDTO) {
      this.$router.push({
        name: SCREEN.hyflexAL.name,
        state: {
          id: data.id,
        },
      });
    },
    goPageCapstone(data: SubjectApproveResDTO) {
      this.$router.push({
        name: SCREEN.capstoneDesign.name,
        state: {
          id: data.id,
        },
      });
    },
    gotoPage(data: SubjectApproveResDTO) {
      return data.typeCd == STATUS_SUBJECT_CAPSTONE
        ? this.goPageCapstone(data)
        : this.goPageHyflexAl(data);
    },
    dowloadExcel() {
      Swal.fire({
        text: this.t("common.message.confirmDowloadExcel"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);
      let dataSearch = {
        ...this.formSearch,
        page: 1,
        size: this.totalRecord,
      };
      getPageSbjtCert(dataSearch)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            let dataContent = res.data.data.content;
            const header = [
              this.t("06.manageApprovedSubjects.grid.division"),
              this.t("06.manageApprovedSubjects.grid.situation"),
              this.t("06.manageApprovedSubjects.grid.applicationField"),
              this.t(
                "06.manageApprovedSubjects.grid.yearOfEstablishmentSemester"
              ),
              this.t("06.manageApprovedSubjects.grid.subjectName"),
              this.t("06.manageApprovedSubjects.grid.courseClassification"),
              this.t("06.manageApprovedSubjects.grid.grade"),
              this.t("06.manageApprovedSubjects.grid.approver"),
              this.t("06.manageApprovedSubjects.grid.paymentDate"),
              this.t("06.manageApprovedSubjects.grid.applicant"),
              this.t("06.manageApprovedSubjects.grid.applicantDate"),
            ];
            let content = [] as Array<any>;
            dataContent.forEach((element: any, index: number) => {
              let contentItem = [];
              element.yearSemester = `${element.yearEdu} - ${element.semester}`;
              element.approveDate = element.approveDate
                ? format(element.approveDate, FORMAT_YYY_MM_DD)
                : " - ";
              element.registerDate = element.registerDate
                ? format(element.registerDate, FORMAT_YYY_MM_DD)
                : " - ";

              contentItem.push(element.type);
              contentItem.push(element.status);
              contentItem.push(element.fieldNm);
              contentItem.push(element.yearSemester);
              contentItem.push(element.name);
              contentItem.push(element.sustNm);
              contentItem.push(element.year);
              contentItem.push(element.approveName);
              contentItem.push(element.approveDate);
              contentItem.push(element.register);
              contentItem.push(element.registerDate);

              content.push(contentItem);
            });
            const dataExport = [
              { sheetName: "sheet1", data: content, header: header },
            ];

            const workbook = new ExcelJS.Workbook();
            let sheet;
            dataExport.forEach((element) => {
              sheet = workbook.addWorksheet(element.sheetName);
              sheet.addRow(element.header);
              element.data.forEach((el) => {
                sheet.addRow(el);
              });
            });

            workbook.xlsx.writeBuffer().then((buffer) => {
              const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              });
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              let newFileName = `${format(
                new Date(),
                "yyyyMMddHHmmss"
              )}_참가자_목록.xlsx`;
              link.download = newFileName;
              link.click();
              link.remove();
            });
          }
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
  },
});
</script>
