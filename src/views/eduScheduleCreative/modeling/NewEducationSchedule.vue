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
                  {{
                    t(
                      "04.eduScheduleCreativeMng.newEducationSchedule.search.schoolYear"
                    )
                  }}
                </p>
                <SelectBoxBase
                  :id="'schoolYear'"
                  :name="'schoolYear'"
                  :data="listSelectBoxSchoolYear"
                  v-model="newEducationScheduleSearchModel.year"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{
                    t(
                      "04.eduScheduleCreativeMng.newEducationSchedule.search.specializedUniversity"
                    )
                  }}
                </p>
                <SelectBoxBaseSearch
                  :id="'specializedUniversity'"
                  :name="'specializedUniversity'"
                  v-model="
                    newEducationScheduleSearchModel.specializedUniversity
                  "
                  :data="listSelectBoxMajor"
                  @update:modelValue="changSch"
                  value-select-all="전체"
                >
                </SelectBoxBaseSearch>
              </li>
              <li>
                <p>
                  {{
                    t(
                      "04.eduScheduleCreativeMng.newEducationSchedule.search.faculty"
                    )
                  }}
                </p>
                <SelectBoxBaseSearch
                  :id="'faculty'"
                  :name="'faculty'"
                  v-model="newEducationScheduleSearchModel.deptNm"
                  :data="listSelectBoxDept"
                  value-select-all="전체"
                >
                </SelectBoxBaseSearch>
              </li>
            </ul>
            <div class="search_btnarea">
              <ButtonBase
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="search()"
                :buttonName="t('common.search')"
              >
              </ButtonBase>
              <ButtonBase
                type="button"
                class="btn_round btn_lg btn_gray mg_l5"
                @click="resetSearch()"
                :buttonName="t('common.reset')"
              >
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="box_section">
          <GridComponentV2
            ref="grid"
            :rowData="rowData"
            :columnDefs="columnDefs"
            :totalRecord="totalRecord"
            :paginationClientFlag="false"
            @customPagination="customPagination"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            :key="key"
          >
            <template #button>
              <div class="flex flex-col items-end">
                <div class="button-container">
                  <ButtonBase
                    class="button btn_sm btn_blue bo_rd4 font_base_2"
                    :buttonName="t('04.eduScheduleCreativeMng.massSchedule')"
                    v-on:click="handleSetup()"
                  >
                  </ButtonBase>
                </div>
              </div>
            </template>
          </GridComponentV2>
        </div>
      </div>
      <NewEducationScheduleModal
        v-if="modalOpen"
        :isOpen="modalOpen"
        @getDataAll="getDataAll"
        @closeModal="closeModal"
        :checkSetup="checkSetup"
        :newEducationScheduleModel="newEducationScheduleModel"
      >
      </NewEducationScheduleModal>
    </section>
  </div>
</template>
<script lang="ts">
import InputTextBase from "@/components/common/input/InputTextBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { commonStore } from "../../../stores/common";
import type {
  NewEducationScheduleSearchModel,
  NewEducationScheduleModel,
  NewEducationScheduleReqModel,
} from "../../../stores/newEducationSchedule/NewEducationSchedule.type.js";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { NewEducationScheduleStore } from "../../../stores/newEducationSchedule";
import NewEducationScheduleModal from "./modal/NewEducationScheduleModal.vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import {
  PAGINATION_PAGE_SIZE,
  SUCCSESS_STATUS,
  PAGINATION_PAGE_SIZE_SELECTOR,
  FORMAT_YYY_MM_DD,
} from "@/constants/screen.const";
import { format } from "date-fns";
import {
  DIV_CD_DEPT_MAJOR,
  DIV_CD_DEPT_DEPART,
} from "@/constants/common.const";
import type { DepartmentFilterDTO } from "@/stores/common/department/department.type";
import { departmentStore } from "@/stores/common/department";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default defineComponent({
  components: {
    SelectBoxBase,
    InputTextBase,
    LinkGridComponent,
    BaseDatePicker,
    NewEducationScheduleModal,
    GridComponentV2,
    ButtonBase,
  },
  setup: () => {
    const { t } = useI18n();
    const cmn = commonStore();
    const store = NewEducationScheduleStore();
    const storeDepartment = departmentStore();
    const currentYear = new Date().getFullYear();

    return { t, cmn, store, storeDepartment, currentYear };
  },
  data() {
    return {
      key: 0,
      pageTitle: this.t("04.eduScheduleCreativeMng.newEducationSchedule.title"),
      breadcrumbItems: [
        { label: "HOME", link: "/" },
        { label: "", link: "#" },
        { label: "", link: "/" },
      ],
      columnDefs: [
        {
          headerName: this.t(
            "04.eduScheduleCreativeMng.newEducationSchedule.table.schoolYear"
          ),
          field: "year",
          flex: 0.5,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t(
            "04.eduScheduleCreativeMng.newEducationSchedule.table.specializedUniversity"
          ),
          field: "deptUniNm",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t(
            "04.eduScheduleCreativeMng.newEducationSchedule.table.faculty"
          ),
          field: "deptNm",
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
          headerName: this.t(
            "04.eduScheduleCreativeMng.newEducationSchedule.table.newCreationTime"
          ),
          field: "newCreationTime",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t(
            "04.eduScheduleCreativeMng.newEducationSchedule.table.regId"
          ),
          field: "regId",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t(
            "04.eduScheduleCreativeMng.newEducationSchedule.table.regDate"
          ),
          field: "regDate",
          flex: 1,
          cellStyle: { textAlign: "center" },
        },
      ],
      rowData: [] as Array<NewEducationScheduleModel>,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listSelectBoxSchoolYear: [
        { cdId: this.currentYear, cdNm: this.currentYear },
        { cdId: this.currentYear + 1, cdNm: this.currentYear + 1 },
      ],
      modalOpen: false,
      checkSetup: false,
      newEducationScheduleSearchModel: {
        year: new Date().getFullYear() + "",
        deptNm: "",
        specializedUniversity: "",
      } as NewEducationScheduleSearchModel,
      newEducationScheduleModel: {} as NewEducationScheduleModel,
      newEducationScheduleReqModel: {} as NewEducationScheduleReqModel,
      totalRecord: 0,
      listSelectBoxDept: [
        { id: 0, cdId: "", cdNm: this.t("common.all") },
      ] as any,
      listSelectBoxMajor: [
        { id: 0, cdId: "", cdNm: this.t("common.all") },
      ] as any,
      departmentFilterDTO: {} as DepartmentFilterDTO /*  */,
    };
  },

  beforeMount() {
    Promise.all([this.getDepartment()]);
  },
  methods: {
    resetSearch() {
      this.newEducationScheduleSearchModel.specializedUniversity = "";
      this.newEducationScheduleSearchModel.deptNm = "";
      this.listSelectBoxDept = "";
      this.newEducationScheduleSearchModel.year = new Date().getFullYear() + "";
      this.listSelectBoxDept = [
        { id: 0, cdId: "", cdNm: this.t("common.all") },
      ];
      this.storeDepartment.deptRes?.forEach((element, index) => {
        if (element.deptDivCd != DIV_CD_DEPT_MAJOR) {
          this.listSelectBoxDept.push({
            id: index + 1,
            cdId: element.deptCd,
            cdNm: element.deptNm,
          });
        }
      });
    },
    async changSch(data: any) {
      this.cmn.setLoading(true);
      this.newEducationScheduleSearchModel.deptNm = "";
      this.listSelectBoxDept = [];
      this.listSelectBoxDept = [
        { id: 0, cdId: "", cdNm: this.t("common.all") },
      ];
      if (data) {
        this.storeDepartment.deptRes?.forEach((element, index) => {
          if (
            element.deptDivCd == DIV_CD_DEPT_DEPART &&
            element.upDeptCd == data
          ) {
            this.listSelectBoxDept.push({
              id: index + 1,
              cdId: element.deptCd,
              cdNm: element.deptNm,
            });
          }
        });
      } else {
        this.storeDepartment.deptRes?.forEach((element, index) => {
          if (element.deptDivCd == DIV_CD_DEPT_DEPART) {
            this.listSelectBoxDept.push({
              id: index + 1,
              cdId: element.deptCd,
              cdNm: element.deptNm,
            });
          }
        });
      }
      this.cmn.setLoading(false);
    },
    closeModal() {
      this.modalOpen = false;
    },
    openModal() {
      this.modalOpen = true;
    },

    handleSetupDetail(data: any) {
      this.checkSetup = true;
      this.newEducationScheduleModel = data;
      this.openModal();
    },
    handleSetup() {
      this.checkSetup = false;
      this.openModal();
    },
    async getDataAll() {
      this.cmn.setLoading(true);
      await this.store.fetchDataModel(this.newEducationScheduleSearchModel);
      if (this.store && this.store.status == SUCCSESS_STATUS) {
        this.rowData = this.store.newEducationScheduleData.content;
        this.rowData.forEach((item, index) => {
          item.newCreationTime =
            item.strDate == null || item.endDate == null
              ? this.t("04.eduScheduleCreativeMng.notSetStatus")
              : `${format(item.strDate, FORMAT_YYY_MM_DD)}` +
                ` ~ ${format(item.endDate, FORMAT_YYY_MM_DD)}`;
          if (item.regDate) {
            item.regDate = format(new Date(item.regDate), FORMAT_YYY_MM_DD);
          }
          if (item.regId) {
            item.regId = item.regNm + `(${item.regId})`;
          }
        });
        this.totalRecord = this.store.newEducationScheduleData.totalElements;
      }
      this.cmn.setLoading(false);
    },
    search() {
      this.key++;
      this.newEducationScheduleSearchModel.page = 1;
    },
    customPagination(pageNumber: any, pagesSize: any) {
      this.newEducationScheduleSearchModel.page = pageNumber;
      this.newEducationScheduleSearchModel.size = pagesSize;
      this.newEducationScheduleSearchModel.sort = "";
      this.getDataAll();
    },
    async getDepartment() {
      this.cmn.setLoading(true);
      this.departmentFilterDTO.deptDivCd = [
        DIV_CD_DEPT_MAJOR,
        DIV_CD_DEPT_DEPART,
      ];
      await this.storeDepartment.getDepartment(this.departmentFilterDTO);
      if (
        this.storeDepartment &&
        this.storeDepartment.status == SUCCSESS_STATUS
      ) {
        this.storeDepartment.deptRes?.forEach((element, index) => {
          if (element.deptDivCd == DIV_CD_DEPT_MAJOR) {
            this.listSelectBoxMajor.push({
              id: index + 1,
              cdId: element.deptCd,
              cdNm: element.deptNm,
            });
          } else {
            this.listSelectBoxDept.push({
              id: index + 1,
              cdId: element.deptCd,
              cdNm: element.deptNm,
            });
          }
        });
      }
      this.cmn.setLoading(false);
    },
  },
});
</script>
<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.button-container button {
  margin-bottom: 4px;
}

.button-container p {
  color: red;
}
</style>
