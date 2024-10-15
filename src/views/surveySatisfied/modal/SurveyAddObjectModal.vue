<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'modal_form'"
    id="surveyAddObjectModal"
    @close-modal="onClose"
  >
    <template #title>
      <strong> {{ t("07.surveySatisfile.modalAddObject.title") }}</strong>
    </template>
    <template #default>
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_2">
            <ul>
              <li>
                <p>
                  {{ t("07.surveySatisfile.modalAddObject.field1") }}
                </p>
                <SelectBoxBaseSearch
                  :id="'universityCd'"
                  name="'universityCd'"
                  v-model="searchModel.univCd"
                  :data="listUniversity"
                >
                </SelectBoxBaseSearch>
              </li>
              <li>
                <p>
                  {{ t("07.surveySatisfile.modalAddObject.field2") }}
                </p>
                <SelectBoxBaseSearch
                  :id="'departmentCd'"
                  name="'departmentCd'"
                  v-model="searchModel.deptCd"
                  :data="listDepartment"
                >
                </SelectBoxBaseSearch>
              </li>
              <li>
                <p>
                  {{ t("07.surveySatisfile.modalAddObject.field4") }}
                </p>
                <InputBase
                  :id="'positionNm'"
                  name="'positionNm'"
                  v-model="searchModel.positionNm"
                />
              </li>
              <li>
                <p>
                  {{ t("07.surveySatisfile.modalAddObject.field5") }}
                </p>
                <InputBase
                  :id="'profNm'"
                  name="'profNm'"
                  v-model="searchModel.profNm"
                />
              </li>
              <li>
                <p>
                  {{ t("07.surveySatisfile.modalAddObject.field6") }}
                </p>
                <InputBase
                  :id="'profNo'"
                  name="'profNo'"
                  v-model="searchModel.profNo"
                />
              </li>
            </ul>
          </div>
          <div class="dp_flex btn_group btn_end" style="gap: 10px">
            <button
              type="button"
              class="btn_round btn_lg btn_primary"
              @click="handleSearch"
            >
              {{ t("07.surveySatisfile.modalAddObject.button1") }}
            </button>
            <button
              type="button"
              class="button btn_lg btn_gray"
              @click="reset"
            >
              {{ t("07.surveySatisfile.modalAddObject.button2") }}
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
          <template #button>
            <span
              >{{ listCheckBoxGrid.length }}
              {{ t("07.surveySatisfile.modalAddObject.select") }}</span
            >
          </template>
        </GridComponentV2>
      </div>
      <div class="dp_flex btn_group btn_end" style="gap: 10px">
        <button
          type="button"
          class="btn_round btn_sm btn_primary mg_l10"
          @click="confirmSaveData"
        >
          {{ t("07.surveySatisfile.modalAddObject.button4") }}
        </button>
        <button
          type="button"
          class="btn_round btn_sm btn_gray mg_l5"
          @click="onClose()"
        >
          {{ t("07.surveySatisfile.modalAddObject.button3") }}
        </button>
      </div>
    </template>
  </TModal>
</template>

<script lang="ts">
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "../../../constants/screen.const";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import CheckboxGrid from "@/components/common/grid/CheckboxGrid.vue";
import { commonStore } from "../../../stores/common";
import { getDepartmentList } from "../../../stores/common/department/department.service";
import {
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
  MESSAGE_ERROR_API,
  UP_CD_ID_GENDER,
  UP_CD_ID_GRADE_LEVEL,
  UP_CD_ID_TARGET_PERSON,
} from "../../../constants/common.const";
import {
  SurveyProfessorInfoListModel,
  SurveyProfessorInfoSearchModel,
} from "../../../stores/survey/inSchool/surveyInSchool.type";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
import { getPageProfessorInfo } from "../../../stores/survey/inSchool/surveyInSchool.service";
import SelectBoxBaseSearch from "../../../components/common/input/SelectBoxBaseSearch.vue";

export default {
  name: "SurveyAddObjectModal",
  components: {
    GridComponentV2,
    CheckboxGrid,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    diagSeq: {
      type: String,
      required: true,
    },
    rowCheck: {
      type: Array as () => Array<String>,
      required: true,
    },
  },
  watch: {
    "searchModel.univCd"(newValue, oldValue) {
      this.listDepartment = [];
      if (newValue) {
        this.searchModel.deptCd = "";
        this.getListDepartment();
      } else {
        this.searchModel.deptCd = "";
      }
    },
  },
  beforeUnmount() {
    this.reset();
  },
  setup() {
    const cmn = commonStore();
    const { t } = useI18n();

    return {
      cmn,
      t,
    };
  },
  data() {
    return {
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      selectAll: ref(false),
      columnDefs: [
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
            selectAllGridId: "selectAllGrid",
            type: "disabledChildCheckShow",
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
          headerName: this.t("07.surveySatisfile.modalAddObject.col1"),
          field: "univNm",
        },
        {
          headerName: this.t("07.surveySatisfile.modalAddObject.col2"),
          field: "deptNm",
        },
        {
          headerName: this.t("07.surveySatisfile.modalAddObject.col3"),
          field: "positionNm",
        },
        {
          headerName: this.t("07.surveySatisfile.modalAddObject.col6"),
          field: "profNm",
        },
        {
          headerName: this.t("07.surveySatisfile.modalAddObject.col7"),
          field: "profNo",
        },
      ],
      listUniversity: [],
      listDepartment: [],
      listGender: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listGrade: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listPerson: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      searchModel: {} as SurveyProfessorInfoSearchModel,
      rowData: [] as Array<SurveyProfessorInfoListModel>,
      key: 1,
      totalRows: 0,
      listCheckBoxGrid: [] as Array<String>,
    };
  },
  beforeMount() {
    this.getListUniversity();
    this.getListGenderCd();
    this.getListGradeCd();
    this.getListPersonCd();

    this.reset();

    this.listCheckBoxGrid = [...this.rowCheck];
  },
  methods: {
    handleSearch() {
      this.key++;
      this.searchModel.page = 1;
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.searchModel.size = pageSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.searchModel.diagSeq = this.diagSeq;
      this.getDataProfessorInfo();
    },
    getDataProfessorInfo() {
      this.cmn.setLoading(true);
      getPageProfessorInfo(this.searchModel)
        .then(
          (res) => {
            this.rowData = res.data.data.content.map((el: any) => {
              const isChecked = this.listCheckBoxGrid.includes(el.profNo);
              el.checkedFlag = isChecked;
              return el;
            });
            this.totalRows = res.data.data.totalElements;

            this.updateSelectAllCheckbox();
          },
          (err) => {}
        )
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    checkAll(value: any) {
      this.rowData.forEach((item) => {
        item.checkedFlag = value;
        if (value) {
          if (!this.listCheckBoxGrid.includes(item.profNo)) {
            this.listCheckBoxGrid.push(item.profNo);
          }
        } else {
          this.listCheckBoxGrid = this.listCheckBoxGrid.filter(
            (el) => el !== item.profNo
          );
        }
      });
    },
    checkChild(value: any, data: any) {
      data.checkedFlag = value;
      if (value) {
        if (!this.listCheckBoxGrid.includes(data.profNo)) {
          this.listCheckBoxGrid.push(data.profNo);
        }
      } else {
        this.listCheckBoxGrid = this.listCheckBoxGrid.filter(
          (item) => item !== data.profNo
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
    confirmSaveData() {
      this.$swal({
        text: this.t("07.surveySatisfile.modalAddObject.messageConfirm"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.saveData();
        }
      });
    },
    saveData() {
      this.$emit("select-item", this.listCheckBoxGrid);
      this.onClose();
    },
    getListUniversity() {
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_MAJOR],
        upDeptCd: [],
        useYn: "",
      })
        .then((res) => {
          res.data.data.forEach((item: any) => {
            if (item.deptDivCd === DIV_CD_DEPT_MAJOR) {
              this.listUniversity.push({
                cdId: item.deptCd,
                cdNm: item.deptNm,
              });
            }
          });
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    getListDepartment() {
      this.cmn.setLoading(true);
      getDepartmentList({
        deptCd: [],
        deptDivCd: [],
        upDeptCd: [this.searchModel.univCd],
        useYn: "",
      })
        .then((res) => {
          res.data.data.forEach((item: any) => {
            if (item.deptDivCd === DIV_CD_DEPT_DEPART) {
              this.listDepartment.push({
                cdId: item.deptCd,
                cdNm: item.deptNm,
              });
            }
          });
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    reset() {
      this.searchModel.deptCd = "";
      this.searchModel.univCd = "";
      this.searchModel.positionNm = "";
      this.searchModel.profNm = "";
      this.searchModel.profNo = "";
    },
    getListGradeCd() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_GRADE_LEVEL }).then((response) => {
        response.data.data.forEach((item: any) => {
          this.listGrade.push(item);
        });
      });
    },
    getListGenderCd() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_GENDER }).then((response) => {
        response.data.data.forEach((item: any) => {
          this.listGender.push(item);
        });
      });
    },
    getListPersonCd() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_TARGET_PERSON }).then(
        (response) => {
          response.data.data.forEach((item: any) => {
            this.listPerson.push(item);
          });
        }
      );
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
