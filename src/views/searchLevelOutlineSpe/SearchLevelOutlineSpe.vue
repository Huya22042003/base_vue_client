<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <div class="search_box col_3">
            <ul>
              <li>
                <p>
                  {{ t("07.searchLeveloutlineSpe.titleSearch.university") }}
                </p>
                <SelectBoxBase
                  :id="'university'"
                  :name="'university'"
                  v-model="searchModel.major"
                  :data="listSelectBoxMajor"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("07.searchLeveloutlineSpe.titleSearch.department") }}
                </p>
                <SelectBoxBase
                  :id="'department'"
                  :name="'department'"
                  v-model="searchModel.deptNm"
                  :data="listSelectBoxDept"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("07.searchLeveloutlineSpe.titleSearch.status") }}
                </p>
                <SelectBoxBase
                  :id="'status'"
                  :name="'status'"
                  v-model="searchModel.status"
                  :data="listStatus"
                >
                </SelectBoxBase>
              </li>
            </ul>
            <ul>
              <li>
                <p>
                  {{ t("07.searchLeveloutlineSpe.titleSearch.studyYn") }}
                </p>
                <SelectBoxBase
                  :id="'studyYn'"
                  :name="'studyYn'"
                  v-model="searchModel.studyYn"
                  :data="listStudyYn"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("07.searchLeveloutlineSpe.titleSearch.nameStd") }}
                </p>
                <InputBase
                  :id="'nameStd'"
                  :name="'nameStd'"
                  v-model="searchModel.stdId"
                ></InputBase>
              </li>
              <li>
                <p>
                  {{ t("07.searchLeveloutlineSpe.titleSearch.gender") }}
                </p>
                <SelectBoxBase
                  :id="'gender'"
                  :name="'gender'"
                  v-model="searchModel.sexCd"
                  :data="listGender"
                >
                </SelectBoxBase>
              </li>
            </ul>
            <ul>
              <li>
                <p>
                  {{ t("07.searchLeveloutlineSpe.titleSearch.eduYear") }}
                </p>
                <SelectBoxBase
                  :id="'eduYear'"
                  :name="'eduYear'"
                  v-model="searchModel.grade"
                  :data="listGrade"
                >
                </SelectBoxBase>
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                type="button"
                class="button btn_xl btn_blue btn_responsive"
                @click="searchClick"
              >
                {{ t("common.search") }}
              </button>
              <button
                type="button"
                class="button btn_xl btn_lightgray btn_responsive"
                @click="reset"
              >
                {{ t("common.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section">
          <GridComponentV2
            v-if="check"
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="grid"
            :paginationClientFlag="false"
            :totalRecord="totalRows"
            @customPagination="fnPagination"
            :key="key"
            :newGridOptions="gridOptions"
          >
            <template #button>
              <div class="search_btnarea">
                <ExportFileExcel
                  :data="dataOutput"
                  :fileName="fileNameExport"
                  :btnName="nameOfbtn"
                  :arrayColor="arrayColor"
                  @click="exportExcel"
                >
                </ExportFileExcel>
              </div>
            </template>
          </GridComponentV2>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import {
  MODE_DETAIL,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
} from "../../constants/screen.const";
import { defineComponent } from "vue";
import { SCREEN } from "../../router/screen";
import { useI18n } from "vue-i18n";
import {
  getListData,
  getListLearnAbility,
} from "@/stores/searchLevelOutlineSpe/searchLevelOutlineSpe.service";
import type {
  SearchModel,
  DiagTargetMemberModel,
} from "@/stores/searchLevelOutlineSpe/searchLevelOutlineSpe.type";
import {
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
  UP_CD_ID_ACADEMIC,
  UP_CD_ID_GENDER,
  UP_CD_ID_GRADE_LEVEL,
} from "@/constants/common.const";
import { getDepartmentList } from "@/stores/common/department/department.service";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import type { CodeMngResModel } from "@/stores/common/codeMng/codeMng.type";
import { commonStore } from "../../stores/common";
export default defineComponent({
  components: { Breadcrumb, LinkGridComponent },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const gridOptions = {
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        resizable: true,
        suppressMovable: true,
      },
      rowSelection: "multiple",
      suppressRowClickSelection: true,
      domLayout: "autoHeight",
    };
    return { t, cmn, gridOptions };
  },
  data() {
    return {
      arrayColor: [],
      modeScreen: "",
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      pageTitle: this.t("07.searchLeveloutlineSpe.pageTitle"),
      breadcrumbItems: [
        { label: "HOME", link: "/" },
        { label: this.t("07.searchLeveloutlineSpe.breadcrumb"), link: "" },
        { label: this.t("07.searchLeveloutlineSpe.breadcrumb2"), link: "" },
        { label: this.t("07.searchLeveloutlineSpe.pageTitle"), link: "" },
      ],
      columnDefs: [
        {
          headerName: this.t("07.searchLeveloutlineSpe.table.university"),
          field: "major",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("07.searchLeveloutlineSpe.table.department"),
          field: "deptNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("07.searchLeveloutlineSpe.table.nameStd"),
          field: "link",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
          flex: 1,
        },
        {
          headerName: this.t("07.searchLeveloutlineSpe.table.gender"),
          field: "sexNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("07.searchLeveloutlineSpe.table.eduYear"),
          field: "gradeNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("07.searchLeveloutlineSpe.table.status"),
          field: "sustDivNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("07.searchLeveloutlineSpe.table.studyYn"),
          field: "sustDivNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("07.searchLevelAcademicSpe.titleSearch.studyYn"),
          field: "gradYn",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t("07.searchLeveloutlineSpe.table.subject"),
          field: "sbjtNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
      ],

      searchModel: {
        major: "",
        deptNm: "",
        status: "",
        studyYn: "",
        stdId: "",
        sexCd: "",
        grade: "",
      } as SearchModel,
      key: 1,
      totalRows: 0,
      rowData: [] as Array<DiagTargetMemberModel>,
      check: true,
      listCode: {
        upCdIdList: [],
      } as CodeMngResModel,
      listStatus: [],
      listStudyYn: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
        {
          cdId: "Y",
          cdNm: "Y",
        },
        {
          cdId: "N",
          cdNm: "N",
        },
      ],
      listGender: [],
      listGrade: [],
      listSelectBoxDept: [],
      listSelectBoxMajor: [],
      fileNameExport: "SearchLeveloutlineSpe",
      nameOfbtn: this.t("07.searchLeveloutlineSpe.button.downExcel"),
      lstTest: [],
      dataOutput: [],
      rowDataAll: [] as Array<DiagTargetMemberModel>,
      searchModelAll: {
        major: "",
        deptNm: "",
        status: "",
        studyYn: "",
        stdId: "",
        sexCd: "",
        grade: "",
      } as SearchModel,
      maxTotal: 0,
    };
  },
  beforeMount() {
    try {
      Promise.all([this.getLearnName(), this.getListInfo(), this.getCode()]);
    } catch (e) {
      alert(e);
    }
  },
  methods: {
    reset() {
      this.searchModel.major = "";
      this.searchModel.deptNm = "";
      this.searchModel.status = "";
      this.searchModel.studyYn = "";
      this.searchModel.stdId = "";
      this.searchModel.sexCd = "";
      this.searchModel.grade = "";
    },
    searchClick() {
      this.searchModel.page = 1;
      this.key++;
    },
    getDataAll() {
      this.cmn.setLoading(true);
      getListData(this.searchModel)
        .then((res) => {
          this.rowData = res.data.data.content;
          this.totalRows = res.data.data.totalElements;
          if (this.maxTotal === 0) {
            this.maxTotal = this.totalRows;
          }
          this.rowData.forEach((item) => {
            item.link = `${item.userNm}(${item.stdId})`;
          });
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    exportExcel() {
      if (this.rowDataAll.length === 0) {
        this.cmn.setLoading(true);

        const searchModelAll = {
          ...this.searchModelAll,
          page: 1,
          size: this.maxTotal || 10,
          sort: "",
        };

        getListData(searchModelAll)
          .then((res) => {
            this.rowDataAll = res.data.data.content.map((item) => ({
              ...item,
              link: `${item.userNm}(${item.stdId})`,
            }));

            const rowExcelHeader = this.columnDefs.map((el) => el.headerName);

            this.arrayColor = this.columnDefs.map((el) => ({
              color: "d0d0d0",
              name: el.headerName,
            }));

            const rowExcel = this.rowDataAll.map((el) => {
              const colExcel = [
                el.major,
                el.deptNm,
                el.link,
                el.sexNm,
                el.gradeNm,
                el.shregStsNm,
                el.sustDivNm,
                el.gradYn,
                el.sbjtNm,
                ...this.lstTest.map(
                  (element) => el.scores[element.learnAbilitySeq]
                ),
              ];
              return colExcel;
            });

            this.dataOutput = [
              { sheetName: "sheet1", data: rowExcel, header: rowExcelHeader },
            ];
          })
          .finally(() => {
            this.cmn.setLoading(false);
          });
      }
    },
    async getLearnName() {
      this.cmn.setLoading(true);
      this.check = false;
      await getListLearnAbility().then((res) => {
        this.lstTest = res.data.data;
        res.data.data.forEach((element: any) => {
          this.columnDefs.push({
            headerName: element.learnAbilityNm,
            field: "scores." + element.learnAbilitySeq,
            cellStyle: { textAlign: "center" },
            flex: 1,
          });
        });
      });
      this.cmn.setLoading(false);
      this.check = true;
    },
    getListInfo() {
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_DEPART, DIV_CD_DEPT_MAJOR],
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
        this.listSelectBoxMajor = res.data.data
          .filter((el: any) => el.deptDivCd == DIV_CD_DEPT_MAJOR)
          .map((el: any) => {
            return {
              cdId: el.deptCd,
              cdNm: el.deptNm,
              upCdId: "major",
            };
          });
        this.listSelectBoxMajor.unshift({
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "major",
        });
      });
    },
    getCode() {
      this.cmn.setLoading(true);
      this.listCode.upCdIdList.push(
        UP_CD_ID_ACADEMIC,
        UP_CD_ID_GENDER,
        UP_CD_ID_GRADE_LEVEL
      );
      getListCodeMng(this.listCode).then((res) => {
        if (Array.isArray(res.data.data)) {
          this.listStatus = res.data.data.filter(
            (item: any) => item.upCdId === UP_CD_ID_ACADEMIC
          );
          this.listGender = res.data.data.filter(
            (item: any) => item.upCdId === UP_CD_ID_GENDER
          );
          this.listGrade = res.data.data.filter(
            (item: any) => item.upCdId === UP_CD_ID_GRADE_LEVEL
          );
          this.listStatus.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
          });
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

    fnPagination(pageNumber: any, pagesSize: any) {
      this.searchModel.size = pagesSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getDataAll();
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.searchLevelOutlineSpeDetail.name,
        params: { mode: MODE_DETAIL },
        state: {
          id: data.stdId,
        },
      });
    },
  },
});
</script>
