<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p class="ta_c">교육과정 학년도</p>
              <SelectBoxBase
                :data="listYear"
                v-model="searhParms.year"
                id="year"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p class="ta_c">계열/학부</p>
              <SelectBoxBase
                :data="listSch"
                @update:modelValue="changSch"
                v-model="searhParms.gradeCd"
                id="gradeCd"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p class="ta_c">학과/전공</p>
              <SelectBoxBase
                :data="listDept"
                v-model="searhParms.deptCd"
                id="deptCd"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p class="ta_c">버전</p>
              <SelectBoxBase
                :data="listSts"
                v-model="searhParms.verCd"
                id="verCd"
              >
              </SelectBoxBase>
            </li>
          </ul>
          <div class="search_btnarea">
            <button
              type="button"
              class="btn_round btn_lg btn_primary mg_l10"
              @click="search"
            >
              {{ t("common.search") }}
            </button>
            <button
              type="button"
              class="btn_round btn_lg btn_gray mg_l5"
              @click="onReset"
            >
              {{ t("common.reset") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="box dp_block">
      <p class="note_custom">
        ※ 삭제할 교육과정 선택 체크 후 교육과정 삭제 버튼을 선택해주세요.
      </p>
      <p class="note_custom">※ 작성완료 교육과정은 삭제할 수 없습니다.</p>
      <div class="box_section">
        <GridComponentV2
          :rowData="eduProcessCreationList"
          :columnDefs="columnDefs"
          :key="keyId"
          ref="grid"
          :paginationClientFlag="false"
          @customPagination="fnPagination"
          :totalRecord="pageable.totalElements"
        >
          <template #button>
            <div class="search_btnarea">
              <!-- <ExportFileExcel
                :callData="true"
                ref="exportExcelRef"
                @click="exportExcel"
                :data="dataExport"
                :fileName="fileNameExport"
                :btnName="
                  t('05.eduProcessCreation.listAndApprove.button.downloadExcel')
                "
              >
              </ExportFileExcel> -->
              <button
                type="button"
                :disabled="!listCheckBoxGrid.length"
                class="btn_round btn_lg btn_black"
                @click="confirmDelete()"
              >
                {{ t("05.eduProcessCreation.listAndApprove.button.delete") }}
              </button>
              <button
                type="button"
                :disabled="!(listCheckBoxGrid.length === 1)"
                class="btn_round btn_lg btn_gray"
                @click="handleVersionUp()"
              >
                {{ t("eduProcessCreation.btnVersionUp") }}
              </button>
              <button
                type="button"
                class="btn_round btn_lg btn_primary pointer-events-none"
                @click="openModalSetting"
              >
                {{ t("05.eduProcessCreation.listAndApprove.button.create") }}
              </button>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
  <SustYearSetting @close-modal="closeModalModify" v-if="isOpenSetting">
  </SustYearSetting>
  <RejectReasonDetail
    :title="t('05.eduProcessCreation.listAndApprove.title3')"
    @close-modal="closeModalModify"
    v-if="isOpenReason"
    :data="data"
  >
  </RejectReasonDetail>
</template>

<script lang="ts">
import InputTextBase from "@/components/common/input/InputTextBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import DatePickerComponent from "@/components/common/input/DatePickerComponent.vue";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import InputGridComponent from "@/components/common/grid/InputGridCoponent.vue";
import CheckboxGrid from "@/components/common/grid/CheckboxGrid.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import SustYearSetting from "./popup/SustYearSetting.vue";
import RejectReasonDetail from "./popup/RejectReasonDetail.vue";
import { defineComponent, ref } from "vue";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
  MODE_EDIT,
  PAGINATION_PAGE_1,
  CODE_SCH,
  START_YEAR_NUMBER,
  FORMAT_YYY_MM_DD,
  CODE_103950,
  CODE_103980,
  CODE_103920,
  CODE_103960,
  CODE_103970,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { EduCourseStore } from "@/stores/eduProcessCreation";
import type {
  EduCourseSeqModel,
  EduCourseResModel,
  EduCourseSearchModel,
  EduCourseAppReqReqModel,
} from "../../stores/eduProcessCreation/eduCourse/eduProcess.type";
import { useI18n } from "vue-i18n";
import { SCREEN } from "../../router/screen";
import { useRouter } from "vue-router";
import type { DepartmentFilterDTO } from "@/stores/common/department/department.type";
import { departmentStore } from "@/stores/common/department";
import { codeMngStore } from "@/stores/common/codeMng";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { format } from "date-fns";
import { CODE_VERSION } from "@/constants/screen.const";
import { CODE_MAJOR } from "@/constants/screen.const";
import {
  deleteEduCourse,
  versionUpEduCourse,
} from "@/stores/eduProcessCreation/eduCourse/eduProcess.service";

export default defineComponent({
  components: {
    InputTextBase,
    GridComponentV2,
    DatePickerComponent,
    Breadcrumb,
    LinkGridComponent,
    InputGridComponent,
    SelectBoxBase,
    SustYearSetting,
    RejectReasonDetail,
    ButtonGridComponent,
    CheckboxGrid,
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const eduCourseStore = EduCourseStore();
    const storeDepartment = departmentStore();
    const codeStore = codeMngStore();
    const { t } = useI18n();
    const dataSel = ref<EduCourseResModel>();
    const codeList = ref<CodeMngModel[]>();
    const exportExcelRef = ref(null);

    return {
      router,
      eduCourseStore,
      storeCommon,
      t,
      storeDepartment,
      codeStore,
      codeList,
      selectAll: ref(false),
      dataSel,
      exportExcelRef,
    };
  },
  data() {
    return {
      isOpenSetting: false,
      isOpenReason: false,
      listCheckBoxGrid: [] as string[],
      keyId: 0,
      pageTitle: this.t("eduProcessCreation.title"),
      breadcrumbItems: [],
      displayTypes: [
        { cdId: "", cdNm: this.t("common.all") },
        { cdId: "Y", cdNm: "" },
        { cdId: "N", cdNm: "" },
      ],
      searhParms: {
        page: PAGINATION_PAGE_1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
        year: new Date().getFullYear() + 1 + "",
        gradeCd: "",
        deptCd: "",
        verCd: "",
      } as EduCourseSearchModel,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      eduProcessCreationList: [] as Array<EduCourseResModel>,
      dataList: [] as Array<EduCourseResModel>,
      columnDefs: ref([
        {
          headerComponent: CheckboxGrid,
          headerComponentParams: {
            onCustomEvent: this.checkAll,
            valueChecked: this.selectAll,
            selectAllGridId: "selectAll",
            childName: "childName",
            type: "selectAll",
          },
          cellRenderer: CheckboxGrid,
          cellRendererParams: {
            onCustomEvent: this.checkChild,
            type: "selectChildCheckShow",
            selectAllGridId: "selectAll",
            childName: "childName",
          },
          field: "checkedFlag",
          flex: 0.6,
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("eduProcessCreation.table.year"),
          field: "year",
          flex: 1.8,
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
          },
        },
        {
          headerName: this.t("eduProcessCreation.table.gradeNm"),
          field: "gradeNm",
          flex: 1.8,
          cellStyle: {
            display: "flex",
            justifyContent: "left",
            alignItems: "start",
          },
        },
        {
          headerName: this.t("eduProcessCreation.table.deptNm"),
          field: "deptNm",
          cellRenderer: "LinkGridComponent",
          cellRendererParams: (data: any) => {
            return {
              onCustomEvent: this.openContinueAlert,
            };
          },
          flex: 1.8,
          cellStyle: (data: any) => {
            const code = data.data.stsCd;
            return {
              color:
                code != CODE_103960 && code != CODE_103970
                  ? "#2704FF"
                  : "#000000",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            };
          },
        },
        {
          headerName: this.t("eduProcessCreation.table.eduCourseTypeNm"),
          field: "eduCourseTypeNm",
          flex: 1.2,
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("eduProcessCreation.table.progStepNm"),
          field: "progStepNm",
          flex: 2,
        },
        {
          headerName: this.t("eduProcessCreation.table.status"),
          field: "stsNm",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t(
            "05.eduProcessCreation.listAndApprove.label.print"
          ),
          field: "stsCd",
          cellStyle: {
            color: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          },
          cellRenderer: "ButtonGridComponent",
          flex: 0.8,
          cellRendererParams: (data: any) => {
            return {
              onCustomEvent: this.openApproveAlert,
              value: this.t(
                "05.eduProcessCreation.listAndApprove.button.print"
              ),
              className: "btn_xs button btn_blue",
              disabled: data.value == CODE_103920,
            };
          },
        },
        {
          headerName: this.t("eduProcessCreation.table.version"),
          field: "version",
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("eduProcessCreation.table.register"),
          field: "regBy",
          flex: 1.3,
          cellStyle: {
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          },
        },
        {
          headerName: this.t("eduProcessCreation.table.regDate"),
          flex: 1.2,
          field: "regDate",
        },
      ]),
      confirmMessage: "",
      confirmButton: "",
      cancelButton: "",
      apprReqModel: {} as EduCourseAppReqReqModel,
      showCancel: false,
      delModel: [] as Array<EduCourseSeqModel>,
      pageable: {} as any,
      year: new Date().getFullYear() as number,
      listDept: [] as any[],
      listSch: [] as any[],
      listYear: [] as any,
      listSts: [{ id: 0, cdId: "", cdNm: this.t("common.all") }] as any,
      departmentFilterDTO: {} as DepartmentFilterDTO,
      listAllCheck: [] as any,
      data: {} as any,
      yearTemp: "",
      fileNameExport: "교육과정개발개편",
      dataExport: [] as any,
    };
  },
  beforeMount() {
    Promise.all([this.getDepartment()]).catch((e) => {
      this.confirmMessage = e.message;
      this.confirmButton = this.t("common.confirm");
      this.showCancel = false;
      this.showAlert(
        () => {},
        () => {}
      );
    });
  },
  beforeUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  },
  mounted() {
    document.addEventListener("keypress", this.handleKeyPress);
  },
  methods: {
    async getDepartment() {
      this.storeCommon.setLoading(true);
      this.departmentFilterDTO.deptDivCd = [CODE_SCH, CODE_MAJOR];
      const currentYear = new Date().getFullYear();
      for (let index = START_YEAR_NUMBER; index <= currentYear + 1; index++) {
        this.listYear.push({ id: index, cdId: index, cdNm: index });
      }
      await this.storeDepartment.getDepartment(this.departmentFilterDTO);
      if (
        this.storeDepartment &&
        this.storeDepartment.status == SUCCSESS_STATUS
      ) {
        this.listSch = this.storeDepartment.deptRes
          ?.filter((element: any) => element.deptDivCd == CODE_SCH)
          .map((element: any, index: number) => {
            return {
              id: index + 1,
              cdId: element.deptCd,
              cdNm: element.deptNm,
            };
          });
        this.listSch.unshift({ id: 0, cdId: "", cdNm: this.t("common.all") });
        this.listDept = this.storeDepartment.deptRes
          ?.filter((element: any) => element.deptDivCd == CODE_MAJOR)
          .map((element: any, index: number) => {
            return {
              id: index + 1,
              cdId: element.deptCd,
              cdNm: element.deptNm,
            };
          });
        this.listDept.unshift({ id: 0, cdId: "", cdNm: this.t("common.all") });
      }
      await this.codeStore.getCodeInfo({ upCdId: CODE_VERSION });
      if (this.codeStore && this.codeStore.status == SUCCSESS_STATUS) {
        this.codeList = this.codeStore.codeInfo?.data;
        this.codeList?.forEach((element, index) => {
          this.listSts.push({
            id: index + 1,
            cdId: element.cdId,
            cdNm: element.cdNm,
          } as any);
        });
      }
      this.storeCommon.setLoading(false);
    },
    search() {
      this.keyId++;
    },
    async getAllData() {
      try {
        this.storeCommon.setLoading(true);
        await this.eduCourseStore.getAll(this.searhParms);
        if (
          this.eduCourseStore &&
          this.eduCourseStore.status == SUCCSESS_STATUS
        ) {
          this.pageable = this.eduCourseStore.EduCourseResListModel;
          this.eduProcessCreationList =
            this.eduCourseStore.EduCourseResListModel.content.map(
              (item: EduCourseResModel) => {
                item.regDate = item.regDate
                  ? format(item.regDate, FORMAT_YYY_MM_DD)
                  : "";
                item.checkedShow = item.stsCd == CODE_103920;
                item.checkedFlag = this.listCheckBoxGrid.includes(
                  item.eduCursSeq
                );
                return item;
              }
            );

          let check = true;
          this.eduProcessCreationList.forEach((row) => {
            if (!row.checkedFlag) {
              check = false;
            }
          });
          if (check) {
            const resetSelect = document.getElementById("selectAll");
            resetSelect.checked = true;
          }
        }
      } catch (error: any) {
        this.confirmMessage = error.message;
        this.confirmButton = this.t("common.confirm");
        this.showCancel = false;
        this.showAlert(
          () => {},
          () => {}
        );
      } finally {
        this.storeCommon.setLoading(false);
      }
    },
    async changSch(data: any) {
      this.storeCommon.setLoading(true);
      this.departmentFilterDTO.deptDivCd = [];
      this.departmentFilterDTO.upDeptCd = [data];
      this.searhParms.deptCd = "";
      this.listDept = [];
      this.listDept = [{ id: 0, cdId: "", cdNm: this.t("common.all") }];
      await this.storeDepartment.getDepartment(this.departmentFilterDTO);
      if (
        this.storeDepartment &&
        this.storeDepartment.status == SUCCSESS_STATUS
      ) {
        this.storeDepartment.deptRes?.forEach((element: any, index: number) => {
          this.listDept.push({
            id: index + 1,
            cdId: element.deptCd,
            cdNm: element.deptNm,
          });
        });
      }
      this.storeCommon.setLoading(false);
    },
    onReset() {
      this.searhParms = {
        page: PAGINATION_PAGE_1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
        year: new Date().getFullYear() + 1 + "",
        gradeCd: "",
        deptCd: "",
        verCd: "",
      };
    },
    handleKeyPress(event: any) {
      if (
        event.key === "Enter" &&
        (this.searhParms.deptCd != "" ||
          this.searhParms.gradeCd != "" ||
          this.searhParms.year != "" ||
          this.searhParms.verCd != "")
      ) {
        event.preventDefault();
        this.getAllData();
      }
    },
    async fnPagination(pageNumber: any, pagesSize: any) {
      this.searhParms.size = pagesSize;
      this.searhParms.page = pageNumber;

      this.getAllData();
    },
    async requestApprove() {
      try {
        this.storeCommon.setLoading(true);
        this.apprReqModel.stsCd = CODE_103960;
        // await this.eduCourseStore.requestEduCourseApprove([this.apprReqModel]);
        // if (this.eduCourseStore) {
        //     if (this.eduCourseStore.status == CREATED_STATUS) {
        //         this.confirmMessage = this.t('05.eduProcessCreation.listAndApprove.message.approveRequestSuccess')
        //         this.confirmButton = this.t('common.confirm')
        //         this.showCancel = false
        //         this.showAlert(this.getAllData,()=>{})
        //     }
        // }
      } catch (error: any) {
        this.confirmMessage = error.message;
        this.showCancel = false;
        this.confirmButton = this.t("common.confirm");
        this.showAlert(
          () => {},
          () => {}
        );
      } finally {
        this.storeCommon.setLoading(false);
      }
    },
    async deleteRow() {
      try {
        this.storeCommon.setLoading(true);
        this.delModel = this.listCheckBoxGrid.map((e: any) => {
          return { data: e };
        });
        // await this.eduCourseStore.deleteEduCourse(this.delModel);
        // if (this.eduCourseStore && this.eduCourseStore.status == SUCCSESS_STATUS) {
        //     this.confirmMessage = this.t('05.eduProcessCreation.listAndApprove.message.deleteSuccess')
        //     this.showCancel = false
        //     this.showAlert(this.getAllData,()=>{})
        // }
      } catch (error: any) {
        this.confirmMessage = error.message;
        this.confirmButton = this.t("common.confirm");
        this.showCancel = false;
        this.showAlert(
          () => {},
          () => {}
        );
      } finally {
        this.storeCommon.setLoading(false);
      }
    },
    goUpdateForm() {
      this.router.push({
        name: SCREEN.eduProcessCreationMng.name,
        params: {
          mode: MODE_EDIT,
        },
        state: {
          id: this.dataSel?.eduCursSeq,
          version: this.dataSel?.version,
          first: false,
        },
      });
    },
    goUpdateFormFirst() {
      this.router.push({
        name: SCREEN.eduProcessCreationMng.name,
        params: {
          mode: MODE_EDIT,
        },
        state: {
          id: this.dataSel?.eduCursSeq,
          version: this.dataSel?.version,
          first: true,
        },
      });
    },
    openModalSetting() {
      this.isOpenSetting = true;
    },
    openModalReason(data: any) {
      this.data = data.eduCourseSeq;
      this.isOpenReason = true;
    },
    closeModalModify() {
      this.isOpenSetting = false;
      this.isOpenReason = false;
    },
    openDeleteAlert() {
      this.showCancel = true;
      this.confirmMessage =
        this.yearTemp +
        this.t("05.eduProcessCreation.listAndApprove.message.isDelete");
      this.confirmButton = this.t("common.deleteItem");
      this.cancelButton = this.t("common.cancel");
      this.showAlert(this.deleteRow, () => {});
    },
    openContinueAlert(data: EduCourseResModel) {
      this.dataSel = data;

      this.showCancel = true;
      this.confirmMessage = this.t(
        "05.eduProcessCreation.listAndApprove.message.goContinue"
      );
      this.confirmButton = this.t(
        "05.eduProcessCreation.listAndApprove.button.goContinue"
      );
      this.cancelButton = this.t(
        "05.eduProcessCreation.listAndApprove.button.goFirstStage"
      );
      this.showAlert(this.goUpdateForm, this.goUpdateFormFirst);
    },
    openApproveAlert(data: any) {
      this.apprReqModel.eduCourseSeq = data.eduCourseSeq;
      this.showCancel = true;
      this.confirmMessage =
        data.year +
        this.t("05.eduProcessCreation.listAndApprove.message.approveRequest");
      this.confirmButton = this.t(
        "05.eduProcessCreation.listAndApprove.button.confirmApprove"
      );
      this.cancelButton = this.t("common.cancel");
      this.showAlert(this.requestApprove, () => {});
    },
    showAlert(callBackConfirm: Function, callBackCancel: Function) {
      this.$swal({
        text: this.confirmMessage,
        type: "warning",
        showCancelButton: this.showCancel,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.confirmButton,
        cancelButtonText: this.cancelButton,
      }).then((result: any) => {
        if (result.isConfirmed) {
          callBackConfirm();
        }
        if (result.isDismissed && result.dismiss == "cancel") {
          callBackCancel();
        }
      });
    },
    checkChild(value: any, data: EduCourseResModel) {
      if (value) {
        this.listCheckBoxGrid.push(data.eduCursSeq);
        this.yearTemp = data.year;
      } else {
        const index = this.listCheckBoxGrid.indexOf(data.eduCursSeq);
        if (index !== -1) {
          this.listCheckBoxGrid.splice(index, 1);
        }
      }
      this.listCheckBoxGrid = [...new Set(this.listCheckBoxGrid)];
    },
    checkAll(value: boolean) {
      let newRow = this.eduProcessCreationList.map((item) => {
        this.yearTemp = item.year;
        if (item.stsCd == CODE_103920 || item.stsCd == CODE_103950) {
          if (value) {
            this.listCheckBoxGrid.push(item.eduCursSeq);
          } else {
            const index = this.listCheckBoxGrid.indexOf(item.eduCursSeq);
            if (index !== -1) {
              this.listCheckBoxGrid.splice(index, 1);
            }
          }
        }
        return {
          ...item,
          checkedFlag: value,
        };
      });

      this.listCheckBoxGrid = [...new Set(this.listCheckBoxGrid)];
      this.eduProcessCreationList = newRow;
    },
    async exportExcel() {
      this.storeCommon.setLoading(true);
      let paramExport = this.searhParms;
      paramExport.size = this.pageable.totalElements;

      // await this.eduCourseStore.getAll(paramExport)
      if (
        this.eduCourseStore &&
        this.eduCourseStore.status == SUCCSESS_STATUS
      ) {
        let dataContent = this.eduCourseStore.EduCourseResListModel.content;
        const header = [
          this.t("common.rowNum"),
          this.t("05.eduProcessCreation.listAndApprove.label.majorUni"),
          this.t("05.eduProcessCreation.listAndApprove.label.sust"),
          this.t("05.eduProcessCreation.listAndApprove.label.createdYear"),
          this.t("05.eduProcessCreation.listAndApprove.label.processStage"),
          this.t("05.eduProcessCreation.listAndApprove.label.status"),
          this.t("05.eduProcessCreation.listAndApprove.label.register"),
          this.t("05.eduProcessCreation.listAndApprove.label.regDate"),
        ];
        let content = [] as Array<any>;
        dataContent.forEach((element: any, index: number) => {
          let contentItem = [];

          contentItem.push(index + 1);
          contentItem.push(element.schNm);
          contentItem.push(element.deptNm);
          contentItem.push(element.year);
          contentItem.push(element.progStepCd);
          contentItem.push(element.stsNm);
          contentItem.push(element.regId);
          contentItem.push(format(element.regDate, FORMAT_YYY_MM_DD));

          content.push(contentItem);
        });
        this.dataExport = [
          { sheetName: "sheet1", data: content, header: header },
        ];

        this.exportExcelRef.downloadExcel();
      }

      this.storeCommon.setLoading(false);
    },
    handleVersionUp() {
      const eduCourseSeq = this.listCheckBoxGrid[0];
      const foundEduProcess = this.eduProcessCreationList.find(
        (item) => item.eduCursSeq === eduCourseSeq
      );
      const versionCd = foundEduProcess?.version;

      this.$swal({
        title: "알림",
        html: `${
          "V" + (Number(versionCd?.charAt(1)) + 1)
        } 버전을 올리시겠어요?`,
        confirmButtonColor: "#5D87FF",
        showCancelButton: true,
        cancelButtonColor: "#fff",
        reverseButtons: true,
        confirmButtonText: "올리기",
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.storeCommon.setLoading(true);
          versionUpEduCourse({ eduCourseSeq: this.listCheckBoxGrid[0] }).then(
            (res) => {
              this.storeCommon.setLoading(false);
            }
          );
        }
      });
    },
    confirmDelete() {
      this.$swal({
        title: "알림",
        html: this.t("common.message.confirmDelete"),
        confirmButtonColor: "#5D87FF",
        showCancelButton: true,
        cancelButtonColor: "#fff",
        reverseButtons: true,
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.delete();
        }
      });
    },
    delete() {
      this.storeCommon.setLoading(true);
      deleteEduCourse(this.listCheckBoxGrid).then((res) => {
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
  },
});
</script>

<style lang="css" scoped></style>
