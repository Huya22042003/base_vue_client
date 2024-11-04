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
              <!-- <button
                type="button"
                :disabled="disableButtonDelete"
                class="btn_round btn_lg btn_black"
                @click="confirmDelete()"
              >
                {{ t("05.eduProcessCreation.listAndApprove.button.delete") }}
              </button> -->
              <ButtonBase
                type="button"
                :disabled="disableButtonDelete"
                @click="handleVersionUp"
                :buttonName="
                  t('05.eduProcessCreation.listAndApprove.button.delete')
                "
                class="btn_round btn_lg btn_black"
              />
              <!-- <button
                type="button"
                :disabled="disableButtonUpversion"
                class="btn_round btn_lg btn_gray"
                @click="handleVersionUp()"
              >
                {{ t("eduProcessCreation.btnVersionUp") }}
              </button> -->
              <ButtonBase
                type="button"
                :disabled="disableButtonUpversion"
                @click="handleVersionUp"
                :buttonName="
                  t('eduProcessCreation.btnVersionUp')
                "
                class="btn_round btn_lg btn_gray"
              />
              <!-- <button
                type="button"
                class="btn_round btn_lg btn_primary pointer-events-none"
                @click="openModalSetting"
              >
                {{ t("05.eduProcessCreation.listAndApprove.button.create") }}
              </button> -->
              <ButtonBase
                type="button"
                @click="openModalSetting"
                :buttonName="
                  t('05.eduProcessCreation.listAndApprove.button.create')
                "
                class="btn_round btn_lg btn_primary pointer-events-none"
              />
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
  <SustYearSetting @close-modal="closeModalModify" v-if="isOpenSetting">
  </SustYearSetting>
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
  CODE_103920,
  CODE_103960,
  CODE_103970,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { EduCourseStore } from "@/stores/eduProcessCreation";
import type {
  EduCourseResModel,
  EduCourseSearchModel,
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
import {
  BAD_REQUEST_NO_REGISTER_WRITE_SCHDL,
  BAD_REQUEST_NO_VERIFY_VERSION,
  STATUS_EDU_COURSE,
  VERSION_V7,
} from "@/constants/common.const";
import RadioButtonGrid from "@/components/common/grid/RadioButtonGrid.vue";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

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
    ButtonGridComponent,
    CheckboxGrid,
    ButtonBase
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
      listCheckBoxGrid: [] as string[],
      keyId: 0,
      pageTitle: this.t("eduProcessCreation.title"),
      breadcrumbItems: [],
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
      columnDefs: ref([
        {
          cellRenderer: RadioButtonGrid,
          cellRendererParams: {
            onCustomEvent: this.checkChild,
            id: "eduCursSeq",
            name: "childName",
          },
          field: "선택",
          flex: 0.8,
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
      showCancel: false,
      pageable: {} as any,
      year: new Date().getFullYear() as number,
      listDept: [] as any[],
      listSch: [] as any[],
      listYear: [] as any,
      listSts: [{ id: 0, cdId: "", cdNm: this.t("common.all") }] as any,
      departmentFilterDTO: {} as DepartmentFilterDTO,
      dataSelectRadio: {} as EduCourseResModel,
      disableButtonDelete: true,
      disableButtonUpversion: true,
    };
  },
  beforeMount() {
    this.getDepartment();
  },
  beforeUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  },
  mounted() {
    document.addEventListener("keypress", this.handleKeyPress);
  },
  methods: {
    async getDepartment() {
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

                if (
                  this.dataSelectRadio &&
                  this.dataSelectRadio.eduCursSeq &&
                  this.dataSelectRadio.eduCursSeq == item.eduCursSeq
                ) {
                  item.checkedFlag = true;
                } else {
                  item.checkedFlag = false;
                }
                return item;
              }
            );
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
          isSave: this.dataSel?.isSave,
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
          isSave: this.dataSel?.isSave,
        },
      });
    },
    openModalSetting() {
      this.isOpenSetting = true;
    },
    closeModalModify() {
      this.isOpenSetting = false;
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
    checkChild(value: EduCourseResModel) {
      this.dataSelectRadio = value;
      if (
        this.dataSelectRadio &&
        this.dataSelectRadio.stsCd != STATUS_EDU_COURSE
      ) {
        this.disableButtonDelete = false;
      } else {
        this.disableButtonDelete = true;
      }

      if (this.dataSelectRadio && this.dataSelectRadio.version != VERSION_V7) {
        this.disableButtonUpversion = false;
      } else {
        this.disableButtonUpversion = true;
      }
    },
    clearCheck() {
      this.dataSelectRadio = {} as EduCourseResModel;
      this.disableButtonDelete = true;
      this.disableButtonUpversion = true;
    },
    handleVersionUp() {
      const versionCd = this.dataSelectRadio?.version;

      this.$swal({
        title: "",
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
          versionUpEduCourse({ eduCourseSeq: this.dataSelectRadio.eduCursSeq })
            .then((res) => {
              this.$swal({
                title: "",
                html: "버전을 올리기가 성공되었습니다.",
                confirmButtonText: this.t("common.confirm"),
              }).then((result) => {
                if (result.isConfirmed) {
                  this.clearCheck();
                  this.fnPagination(1, 10);
                }
              });
            })
            .catch((error) => {
              if (
                error.response.data.code == BAD_REQUEST_NO_REGISTER_WRITE_SCHDL
              ) {
                this.$alert(
                  "교과과정 개발 기간이 아닙니다. 다시 확인해주세요."
                );
              }

              if (error.response.data.code == BAD_REQUEST_NO_VERIFY_VERSION) {
                this.$alert(
                  "중복된 버전으로 올릴 수 없습니다. 다시 확인해주세요."
                );
              }
            })
            .finally(() => {
              this.storeCommon.setLoading(false);
            });
        }
      });
    },
    confirmDelete() {
      this.$swal({
        title: "",
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
      deleteEduCourse([this.dataSelectRadio.eduCursSeq]).then((res) => {
        this.storeCommon.setLoading(false);
        this.$swal({
          title: "",
          html: this.t("common.message.deleteSuccess"),
          confirmButtonText: this.t("common.confirm"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.fnPagination(1, 10);
            this.clearCheck();
          }
        });
      });
    },
  },
});
</script>

<style lang="css" scoped>
.search_box.col_3 > ul > li > p:first-child {
  width: 115px;
}
</style>
