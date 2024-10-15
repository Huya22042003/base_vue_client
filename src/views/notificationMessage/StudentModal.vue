<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal"
  >
    <template #title>
      <strong>{{ t("09.notificationMessage.form.popup.title") }}</strong>
    </template>
    <template #default>
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p>{{ t("09.notificationMessage.form.popup.search.faculty") }}</p>
              <SelectBoxBase
                :id="'department'"
                :name="'department'"
                v-model="searchModel.deptCd"
                :data="listSelectBoxDept"
              ></SelectBoxBase>
            </li>
            <li>
              <p>{{ t("09.notificationMessage.form.popup.search.year") }}</p>
              <SelectBoxBase
                :id="'year'"
                :name="'year'"
                :data="listGrade"
                v-model="searchModel.gradeCd"
              ></SelectBoxBase>
            </li>
            <li>
              <p>{{ t("09.notificationMessage.form.popup.search.gender") }}</p>
              <SelectBoxBase
                :id="'gender'"
                :name="'gender'"
                :data="listGender"
                v-model="searchModel.sexCd"
              ></SelectBoxBase>
            </li>
            <li>
              <p>{{ t("09.notificationMessage.form.popup.search.name") }}</p>
              <InputBase :id="'name'" v-model="searchModel.userNm" />
            </li>
            <li>
              <p>
                {{ t("09.notificationMessage.form.popup.search.studentCode") }}
              </p>
              <InputBase :id="'studentCode'" v-model="searchModel.stdId" />
            </li>
          </ul>
          <div class="search_btnarea">
            <button
              type="button"
              class="button btn_xl btn_blue btn_responsive"
              @click="searchClick()"
            >
              {{ t("common.search") }}
            </button>
            <button
              type="button"
              class="button btn_xl btn_gray btn_responsive"
              @click="reset()"
            >
              {{ t("common.reset") }}
            </button>
          </div>
        </div>
      </div>
      <div class="box_section">
        <GridComponentV2
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
        >
        </GridComponentV2>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_xs btn_blue btn_responsive"
        @click="choiceStudent"
      >
        {{ t("common.confirm") }}
      </button>
      <button
        type="button"
        class="button btn_xs btn_gray btn_responsive"
        @click="closeModal"
      >
        {{ t("common.close") }}
      </button>
    </template>
  </TModal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "../../constants/screen.const";
import { commonStore } from "@/stores/common";
import type {
  SearchStudentModel,
  StudentModel,
} from "@/stores/noticeMessage/noticeMessage.type";
import { listStudent } from "@/stores/noticeMessage/noticeMessage.service";
import {
  UP_CD_ID_GENDER,
  UP_CD_ID_GRADE_LEVEL,
  DIV_CD_DEPT_DEPART,
} from "@/constants/common.const";
import CheckboxGrid from "@/components/common/grid/CheckboxGrid.vue";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import type { CodeMngResModel } from "@/stores/common/codeMng/codeMng.type";
import { getDepartmentList } from "@/stores/common/department/department.service";

export default defineComponent({
  name: "EduCourseTypeModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    rowCheck: {
      type: Array as () => Array<StudentModel>,
      required: true,
    },
  },
  beforeMount() {
    try {
      Promise.all([this.getCode(), this.getListInfo()]);
      this.listCheckBoxGrid = [...this.rowCheck];
    } catch (e) {
      alert(e);
    }
  },
  setup(props) {
    const { t } = useI18n();
    const cmn = commonStore();

    return {
      t,
      cmn,
    };
  },
  data() {
    return {
      pageTitle: this.t("09.documentRoom.title"),
      breadcrumbItems: [
        { label: "HOME", link: "/" },
        { label: "", link: "#" },
        { label: "", link: "/" },
      ],
      key: 1,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      rowData: [] as Array<StudentModel>,
      searchModel: {
        sexCd: "",
        gradeCd: "",
        deptCd: "",
      } as SearchStudentModel,
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
          headerName: this.t("09.notificationMessage.form.table.faculty"),
          field: "deptNm",
          flex: 3,
        },
        {
          headerName: this.t("09.notificationMessage.form.table.year"),
          field: "gradeNm",
          flex: 3,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("09.notificationMessage.form.table.gender"),
          field: "sexNm",
          flex: 3,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("09.notificationMessage.form.table.name"),
          field: "userNm",
          flex: 3,
          cellStyle: { textAlign: "center" },
        },
        {
          headerName: this.t("09.notificationMessage.form.table.studentCode"),
          field: "stdId",
          flex: 3,
          cellStyle: { textAlign: "center" },
        },
      ]),
      totalRows: 0,
      listCheckBoxGrid: [],
      listUpIdCode: {
        upCdIdList: [],
      } as CodeMngResModel,
      listGender: [],
      listGrade: [],
      listSelectBoxDept: [],
    };
  },
  methods: {
    searchClick() {
      this.searchModel.page = 1;
      this.key++;
    },

    closeModal() {
      this.$emit("close-modal");
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.searchModel.size = pageSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.cmn.setLoading(true);
      listStudent(this.searchModel)
        .then((res) => {
          this.rowData = res.data.data.content.map((el) => {
            const isChecked = this.listCheckBoxGrid.some(
              (item) => item.stdId === el.stdId
            );
            el.checkedFlag = isChecked;
            return el;
          });
          this.rowData.forEach((item) => {
            if (item.sexNm === "female") {
              item.sexNm = "남";
            } else {
              item.sexNm = "여";
            }
          });
          this.totalRows = res.data.data.totalElements;
          this.updateSelectAllCheckbox();
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    checkAll(value: any) {
      this.rowData.forEach((item) => {
        item.checkedFlag = value;
        if (value) {
          if (!this.listCheckBoxGrid.some((el) => el.stdId === item.stdId)) {
            this.listCheckBoxGrid.push(item);
          }
        } else {
          this.listCheckBoxGrid = this.listCheckBoxGrid.filter(
            (el) => el.stdId !== item.stdId
          );
        }
      });
    },
    checkChild(value: any, data: any) {
      data.checkedFlag = value;
      if (value) {
        if (!this.listCheckBoxGrid.some((item) => item.stdId === data.stdId)) {
          this.listCheckBoxGrid.push(data);
        }
      } else {
        this.listCheckBoxGrid = this.listCheckBoxGrid.filter(
          (item) => item.stdId !== data.stdId
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
    choiceStudent() {
      this.$emit("select-item", this.listCheckBoxGrid);
      this.listCheckBoxGrid = [];
      this.closeModal();
    },
    async getCode() {
      this.cmn.setLoading(true);
      this.listUpIdCode.upCdIdList.push(UP_CD_ID_GENDER, UP_CD_ID_GRADE_LEVEL);
      getListCodeMng(this.listUpIdCode).then((res) => {
        if (Array.isArray(res.data.data)) {
          this.listGender = res.data.data.filter(
            (item: any) => item.upCdId === UP_CD_ID_GENDER
          );
          this.listGrade = res.data.data.filter(
            (item: any) => item.upCdId === UP_CD_ID_GRADE_LEVEL
          );
          this.listGender.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
          });
          this.listGrade.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
          });
        }
      });
      this.cmn.setLoading(false);
    },
    getListInfo() {
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_DEPART],
        upDeptCd: [],
        useYn: "",
      }).then((res) => {
        this.listSelectBoxDept = res.data.data
          .filter((el: any) => el.deptDivCd == DIV_CD_DEPT_DEPART)
          .map((el: any) => {
            return {
              cdId: el.deptCd,
              cdNm: el.deptNm,
              upCdId: "dept",
            };
          });
        this.listSelectBoxDept.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "dept",
        });
      });
    },

    reset() {
      (this.searchModel.deptCd = ""),
        (this.searchModel.gradeCd = ""),
        (this.searchModel.sexCd = ""),
        (this.searchModel.userNm = ""),
        (this.searchModel.stdId = "");
    },
  },
});
</script>
<style>
.popup_content {
  max-height: 600px;
}
</style>
