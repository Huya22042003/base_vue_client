<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle"></Breadcrumb>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>
                  {{ t("lectureDesignSchedule.list.year") }}
                </p>
                <SelectBoxBase
                  :id="'year'"
                  :name="'year'"
                  :data="listSelectBoxSchoolYear"
                  v-model="searchData.year"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("lectureDesignSchedule.list.term") }}
                </p>
                <SelectBoxBase
                  :id="'term'"
                  :name="'term'"
                  :data="listSelectBoxSemester"
                  v-model="searchData.termCd"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("lectureDesignSchedule.list.subjectName") }}
                </p>
                <InputBase
                  :id="'subjectName'"
                  :name="'subjectName'"
                  v-model="searchData.sbjtNm"
                  class="form_style"
                />
              </li>
              <li>
                <p>
                  {{ t("lectureDesignSchedule.list.syllabusStatus") }}
                </p>
                <SelectBoxBase
                  :id="'planStatus'"
                  :name="'planStatus'"
                  :data="listStsLect"
                  v-model="searchData.lectSts"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("lectureDesignSchedule.list.planStatus") }}
                </p>
                <SelectBoxBase
                  :id="'evaluationStatus'"
                  :name="'evaluationStatus'"
                  :data="listStsEval"
                  v-model="searchData.evalSts"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("lectureDesignSchedule.list.evaluationStatus") }}
                </p>
                <SelectBoxBase
                  :id="'syllabusStatus'"
                  :name="'syllabusStatus'"
                  :data="listStsJob"
                  v-model="searchData.jobSts"
                />
              </li>
              <li>
                <p>
                  {{ t("lectureDesignSchedule.list.subjectCqiStatus") }}
                </p>
                <SelectBoxBase
                  :id="'subjectCqiStatus'"
                  :name="'subjectCqiStatus'"
                  :data="listStsCqi"
                  v-model="searchData.cqiSts"
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
                @click="reset"
              >
                {{ t("common.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="box">
        <div class="box_section">
          <div v-if="!checkData" class="no_cnt">
            <p>{{ t("lectureDesignSchedule.alertPage") }}</p>
          </div>
          <GridComponentV2
            v-if="checkData"
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="grid"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
            :key="key"
            :newGridOptions="gridOptions"
          >
            <template #button>
              <ButtonBase
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                :buttonName="t('lectureDesignSchedule.form.setOption')"
                v-on:click="handleSetupOption()"
              >
              </ButtonBase>
              <ButtonBase
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                :buttonName="t('lectureDesignSchedule.form.setAll')"
                v-on:click="handleSetupAll()"
              >
              </ButtonBase>
            </template>
          </GridComponentV2>
        </div>
      </div>
      <LectureDesignScheduleModal
        v-if="modalOpen"
        :isOpen="modalOpen"
        @closeModal="closeModal"
        :modalType="modalType"
        :writeSchdlSeq="writeSchdlSeq"
        :listSubjectItem="listSubjectItem"
        :yearAdd="yearAdd"
        :termAdd="termAdd"
        :getDataAll="fnPagination"
        :termDivision="termDivision"
        :sbjtDivision="sbjtDivision"
        :division="division"
        :yearDivision="yearDivision"
        :cdDivision="cdDivision"
      >
      </LectureDesignScheduleModal>
    </section>
  </div>
</template>

<script lang="ts">
import InputTextBase from "@/components/common/input/InputTextBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { commonStore } from "../../../stores/common";
import { codeMngStore } from "../../../stores/common/codeMng";

import CheckboxGrid from "@/components/common/grid/CheckboxGrid.vue";
import LectureDesignScheduleModal from "./modal/LectureDesignScheduleModal.vue";
import {
  FORMAT_YYY_MM_DD,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "@/constants/screen.const";
import type {
  LectureDesignSchudeModel,
  SearchData,
  LectRegItem,
} from "@/stores/LectureDesignSchedule/LectureDesignSchedule.type";
import { getListData } from "@/stores/LectureDesignSchedule/LectureDesignSchedule.service";
import { format } from "date-fns";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  UP_CD_ID_SEMESTER,
  UP_CD_ID_WRITE,
  CD_ID_NOT_DO,
} from "@/constants/common.const";
import Swal from "sweetalert2";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default defineComponent({
  components: {
    SelectBoxBase,
    InputTextBase,
    LinkGridComponent,
    BaseDatePicker,
    GridComponentV2,
    LectureDesignScheduleModal,
    ButtonBase,
  },
  setup: () => {
    const { t } = useI18n();
    const cmn = commonStore();
    const storeCodeMng = codeMngStore();
    const modalType = ref<"type1" | "type2" | "type3">("type1");
    const gridOptions = {
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        resizable: true,
        suppressMovable: true,
      },
      rowSelection: "multiple",
      suppressRowClickSelection: true,
      domLayout: "autoHeight",
    };
    const currentYear = new Date().getFullYear();
    return { t, cmn, storeCodeMng, modalType, gridOptions, currentYear };
  },
  data() {
    return {
      listSelectBox: [],
      pageTitle: this.t("lectureDesignSchedule.title"),
      key: 1,
      columnDefs: ref([
        {
          headerComponent: CheckboxGrid,
          headerComponentParams: {
            onCustomEvent: this.checkAll,
            valueChecked: this.selectAll,
            type: "selectAll",
            selectAllGridId: "selectAllGrid",
            childName: "childName",
          },
          cellRenderer: CheckboxGrid,
          cellRendererParams: {
            onCustomEvent: this.checkChild,
            type: "selectChild",
            selectAllGridId: "selectAllGrid",
            childName: "childName",
          },
          field: "checkedFlag",
          width: 10,
          cellStyle: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.year"),
          field: "year",
          flex: 0.5,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.term"),
          field: "termNm",
          flex: 0.3,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.department"),
          field: "deptNm",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.subjectName"),
          field: "sbjtNm",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.grade"),
          field: "gradeNm",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.classDivision"),
          field: "divNm",
          flex: 1,
          cellRenderer: LinkGridComponent,
          cellRendererParams: { onCustomEvent: this.handleSetupDetail },
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.lecturePlanWriting"),
          flex: 1,
          cellStyle: { textAlign: "center" },
          valueGetter: (params: any) => {
            if (!params.data.lectPlanStrDate) {
              return "-";
            } else {
              return (
                params.data.lectPlanStrDate +
                " ~ " +
                params.data.lectPlanEndDate
              );
            }
          },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.syllabusStatus"),
          field: "stsLectNm",
          flex: 1,
          cellStyle: (params: any) => {
            return {
              textAlign: "center",
              color: params.value === "작성완료" ? "green" : "inherit",
            };
          },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.evalPlanPeriod"),
          flex: 1,
          cellStyle: { textAlign: "center" },
          valueGetter: (params: any) => {
            if (!params.data.evalPlanStrDate) {
              return "-";
            } else {
              return (
                params.data.evalPlanStrDate +
                " ~ " +
                params.data.evalPlanEndDate
              );
            }
          },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.evalPlanStatus"),
          field: "stsEvalNm",
          flex: 1,
          cellStyle: (params: any) => {
            return {
              textAlign: "center",
              color: params.value === "작성완료" ? "green" : "inherit",
            };
          },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.evalPeriod"),
          flex: 1,
          cellStyle: { textAlign: "center" },
          valueGetter: (params: any) => {
            if (!params.data.jobCapaStrDate) {
              return "-";
            } else {
              return (
                params.data.jobCapaStrDate + " ~ " + params.data.jobCapaEndDate
              );
            }
          },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.evalStatus"),
          field: "stsJobCapaNm",
          flex: 1,
          cellStyle: (params: any) => {
            return {
              textAlign: "center",
              color: params.value === "작성완료" ? "green" : "inherit",
            };
          },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.subjectCQI"),
          flex: 1,
          cellStyle: { textAlign: "center" },
          valueGetter: (params: any) => {
            if (!params.data.cqiStrDate) {
              return "-";
            } else {
              return params.data.cqiStrDate + " ~ " + params.data.cqiEndDate;
            }
          },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.cqiStatus"),
          field: "stsCqiNm",
          flex: 1,
          cellStyle: (params: any) => {
            return {
              textAlign: "center",
              color: params.value === "작성완료" ? "green" : "inherit",
            };
          },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.regId"),
          field: "regNm",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("lectureDesignSchedule.form.date"),
          field: "regDate",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
      ]),
      rowData: [] as Array<LectureDesignSchudeModel>,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      modalOpen: false,
      totalRows: 0,
      listCheckBoxGrid: [],
      searchData: {
        page: 1,
        size: 10,
        sort: "",
        year: "",
        lectSts: "",
        evalSts: "",
        jobSts: "",
        cqiSts: "",
      } as SearchData,
      writeSchdlSeq: "",
      yearAdd: "",
      termAdd: "",
      listSelectBoxSchoolYear: [
        {
          cdId: "",
          cdNm: this.t("common.select"),
        },
        {
          cdId: this.currentYear.toString(),
          cdNm: this.currentYear.toString(),
        },
        {
          cdId: (this.currentYear + 1).toString(),
          cdNm: (this.currentYear + 1).toString(),
        },
      ],
      listSelectBoxSemester: [
        {
          cdId: "",
          cdNm: this.t("common.select"),
        },
      ],
      checkData: false,
      upCdIdList: [],
      listStsLect: [
        {
          cdId: "",
          upCdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listStsEval: [
        {
          cdId: "",
          upCdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listStsJob: [
        {
          cdId: "",
          upCdId: "",
          cdNm: this.t("common.all"),
        },
        {
          cdId: CD_ID_NOT_DO,
          upCdId: "",
          cdNm: this.t("lectureDesignSchedule.sts1"),
        },
        {
          cdId: "N",
          upCdId: "",
          cdNm: this.t("lectureDesignSchedule.sts2"),
        },
        {
          cdId: "Y",
          upCdId: "",
          cdNm: this.t("lectureDesignSchedule.sts3"),
        },
      ],
      listStsCqi: [
        {
          cdId: "",
          upCdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      subjectItem: {} as LectRegItem,
      listSubjectItem: [] as Array<LectRegItem>,
      termDivision: "",
      sbjtDivision: "",
      division: "",
      yearDivision: "",
      cdDivision: "",
    };
  },
  beforeMount() {
    Promise.all([this.getCodeType()]);
  },
  methods: {
    fnPagination(pageNumber: any, pageSize: any) {
      this.listCheckBoxGrid = [];
      this.searchData.size = pageSize;
      this.searchData.page = pageNumber;
      this.searchData.sort = "";
      this.cmn.setLoading(true);
      getListData(this.searchData)
        .then((res) => {
          this.rowData = res.data.data.content.map((el) => {
            const isChecked = this.listCheckBoxGrid.some(
              (item) =>
                item.sbjtCd === el.sbjtCd &&
                item.year === el.year &&
                item.termCd === el.termCd &&
                item.deptCd === el.deptCd &&
                item.gradeCd === el.gradeCd &&
                item.divCd === el.divCd
            );
            el.checkedFlag = isChecked;
            return el;
          });
          this.rowData.forEach((item) => {
            const dateFields = [
              "lectPlanStrDate",
              "lectPlanEndDate",
              "evalPlanStrDate",
              "evalPlanEndDate",
              "jobCapaStrDate",
              "jobCapaEndDate",
              "cqiStrDate",
              "cqiEndDate",
            ];
            dateFields.forEach((field) => {
              this.formatDateIfNotNull(item, field);
            });
          });
          this.rowData.forEach((item) => {
            if (item.regDate) {
              item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
            }
          });
          this.totalRows = res.data.data.totalElements;
          this.updateSelectAllCheckbox();
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    formatDateIfNotNull(item: any, fieldName: any) {
      if (item[fieldName] != null) {
        item[fieldName] = format(new Date(item[fieldName]), FORMAT_YYY_MM_DD);
      }
    },
    closeModal() {
      this.searchData.page = 1;
      this.modalOpen = false;
      this.writeSchdlSeq = "";
      this.listSubjectItem = [];
    },
    openModal(type: "type1" | "type2" | "type3") {
      this.modalType = type;
      this.modalOpen = true;
    },
    handleSetupDetail(data: any) {
      this.writeSchdlSeq = data.writeSchdlSeq;
      this.termDivision = data.termNm;
      this.sbjtDivision = data.sbjtNm;
      this.division = data.divNm;
      this.yearDivision = data.year;
      this.cdDivision = data.divCd;
      this.openModal("type2");
    },
    handleSetupOption() {
      if (this.listCheckBoxGrid.length == 0) {
        Swal.fire({
          text: this.t("lectureDesignSchedule.alertCheck"),
          type: "warning",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: this.t("common.cancel"),
        });
      } else {
        this.listCheckBoxGrid.forEach((item) => {
          this.listSubjectItem.push({
            writeSchdlSeq: item.writeSchdlSeq,
            year: item.year,
            termCd: item.termCd,
            sbjtCd: item.sbjtCd,
            deptCd: item.deptCd,
            gradeCd: item.gradeCd,
            divCd: item.divCd,
          });
        });
        this.yearAdd = this.listCheckBoxGrid[0].year;
        this.termAdd = this.listCheckBoxGrid[0].termNm;
        this.openModal("type1");
      }
    },
    handleSetupAll() {
      this.openModal("type3");
    },
    search() {
      if (this.searchData.year == "" || this.searchData.termCd == "") {
        this.checkData = false;
        return;
      } else {
        this.checkData = true;
        this.searchData.page = 1;
        this.key++;
      }
    },
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    checkAll(value: any) {
      this.rowData.forEach((item) => {
        item.checkedFlag = value;
        if (value) {
          if (
            !this.listCheckBoxGrid.some(
              (el) =>
                item.sbjtCd === el.sbjtCd &&
                item.year === el.year &&
                item.termCd === el.termCd &&
                item.deptCd === el.deptCd &&
                item.gradeCd === el.gradeCd &&
                item.divCd === el.divCd
            )
          ) {
            this.listCheckBoxGrid.push(item);
          }
        } else {
          this.listCheckBoxGrid = this.listCheckBoxGrid.filter(
            (el) =>
              item.sbjtCd !== el.sbjtCd &&
              item.year !== el.year &&
              item.termCd !== el.termCd &&
              item.deptCd !== el.deptCd &&
              item.gradeCd !== el.gradeCd &&
              item.divCd !== el.divCd
          );
        }
      });
    },
    checkChild(value: any, data: any) {
      data.checkedFlag = value;
      if (value) {
        if (
          !this.listCheckBoxGrid.some(
            (item) =>
              item.sbjtCd === data.sbjtCd &&
              item.year === data.year &&
              item.termCd === data.termCd &&
              item.deptCd === data.deptCd &&
              item.gradeCd === data.gradeCd &&
              item.divCd === data.divCd
          )
        ) {
          this.listCheckBoxGrid.push(data);
        }
      } else {
        this.listCheckBoxGrid = this.listCheckBoxGrid.filter(
          (item) =>
            item.sbjtCd !== data.sbjtCd &&
            item.year !== data.year &&
            item.termCd !== data.termCd &&
            item.deptCd !== data.deptCd &&
            item.gradeCd !== data.gradeCd &&
            item.divCd !== data.divCd
        );
      }
      this.updateSelectAllCheckbox();
    },
    updateSelectAllCheckbox() {
      const allChecked = this.rowData.every((item) => item.checkedFlag);
      const selectAllCheckbox = document.getElementById("selectAllGrid");
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = allChecked;
      }
    },
    getCodeType() {
      this.cmn.setLoading(true);
      getListCodeMng({ upCdIdList: [UP_CD_ID_SEMESTER, UP_CD_ID_WRITE] })
        .then((response: any) => {
          response.data.data.forEach((item: any) => {
            if (item.upCdId == UP_CD_ID_SEMESTER) {
              this.listSelectBoxSemester.push(item);
            } else if (item.upCdId == UP_CD_ID_WRITE) {
              this.listStsLect.push(item);
              this.listStsEval.push(item);
              this.listStsCqi.push(item);
            }
          });
          if (this.listSelectBoxSemester.length > 0) {
            this.searchData.termCd = this.listSelectBoxSemester[0].cdId;
          }
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    reset() {
      this.searchData.year = "";
      this.searchData.termCd = this.searchData.termCd =
        this.listSelectBoxSemester[0].cdId;
      this.searchData.sbjtNm = "";
      this.searchData.lectSts = "";
      this.searchData.evalSts = "";
      this.searchData.jobSts = "";
      this.searchData.cqiSts = "";
    },
  },
});
</script>
<style scoped>
.search_data {
  display: flex;
}
.search_box.col_3 > ul > li > p:first-child {
  width: 150px;
}
</style>
