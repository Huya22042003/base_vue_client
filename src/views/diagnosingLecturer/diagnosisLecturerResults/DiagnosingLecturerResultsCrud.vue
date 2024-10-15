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
                  {{
                    t("07.diagnosingLecturer.diagnosisResults.detail.profName")
                  }}
                </p>
                <InputBase
                  :id="'profName'"
                  :name="'profName'"
                  v-model="searchModel.staffNm"
                ></InputBase>
              </li>
              <li>
                <p>
                  {{
                    t("07.diagnosingLecturer.diagnosisResults.detail.profCode")
                  }}
                </p>
                <InputBase
                  :id="'profCode'"
                  :name="'profCode'"
                  v-model="searchModel.staffNo"
                ></InputBase>
              </li>
              <li>
                <p>
                  {{
                    t(
                      "07.diagnosingLecturer.diagnosisResults.detail.department"
                    )
                  }}
                </p>
                <SelectBoxBase
                  :id="'department'"
                  :name="'department'"
                  v-model="searchModel.departmentCd"
                  :data="listDepartment"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{ t("07.diagnosingLecturer.diagnosisResults.detail.role") }}
                </p>
                <SelectBoxBase
                  :id="'role'"
                  :name="'role'"
                  v-model="searchModel.staffPstnCd"
                  :data="listPstnCd"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{
                    t(
                      "07.diagnosingLecturer.diagnosisResults.detail.experience"
                    )
                  }}
                </p>
                <SelectBoxBase
                  :id="'experience'"
                  :name="'experience'"
                  v-model="searchModel.experienceCd"
                  :data="listExperience"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{
                    t("07.diagnosingLecturer.diagnosisResults.detail.gender")
                  }}
                </p>
                <SelectBoxBase
                  :id="'gender'"
                  :name="'gender'"
                  v-model="searchModel.genderCd"
                  :data="listGender"
                >
                </SelectBoxBase>
              </li>
              <li>
                <p>
                  {{
                    t("07.diagnosingLecturer.diagnosisResults.detail.startEnd")
                  }}
                </p>
                <div class="search_flex" style="position: relative">
                  <BaseDatePicker
                    :placeholder="t('common.startDate')"
                    v-model="searchModel.startDate"
                  >
                  </BaseDatePicker>
                  <span>~</span>
                  <BaseDatePicker
                    :placeholder="t('common.endDate')"
                    v-model="searchModel.endDate"
                  >
                  </BaseDatePicker>
                </div>
              </li>
            </ul>
            <div class="dp_flex btn_group btn_end" style="gap: 10px">
              <button
                class="button btn_xl btn_blue btn_responsive"
                @click="search"
              >
                {{ t("common.search") }}
              </button>
              <button
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
            :key="key"
            :rowData="rowData"
            :columnDefs="columnDefs"
            :pagination="true"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            ref="gridKey"
            :paginationClientFlag="false"
            @customPagination="fnPagination"
            :totalRecord="totalRows"
          >
            <template #button>
              <div class="search_btnarea">
                <ExportFileExcel
                  :data="dataOutput"
                  :fileName="fileNameExport"
                  :btnName="nameOfbtn"
                  :arrayColor="arrayColor"
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
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { SCREEN } from "../../../router/screen";
import {
  FORMAT_YYY_MM_DD,
  MODE_DETAIL,
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import { commonStore } from "../../../stores/common";
import {
  detailResultDiagProfAbility,
  getListWisePrideAbility,
  searchStaffInfoDetailDiag,
} from "../../../stores/profAbilityLecturer/profAbilityLecturerResult/profAbilityLecturerResult.service";
import {
  DiagResultProfAbiDetailListModel,
  DiagResultProfAbiDetailSearchModel,
  DiagResultProfAbilityDetailModel,
} from "../../../stores/profAbilityLecturer/profAbilityLecturerResult/profAbilityLecturerResult.type";
import { format } from "date-fns";
import {
  UP_CD_ID_AFFILIATED_BLOCK,
  UP_CD_ID_GENDER,
  UP_CD_ID_PROFESSOR_LEVEL,
  UP_CD_ID_TEACHING_EXPERIENCE,
} from "../../../constants/common.const";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { ExcelData } from "@/stores/common/excel/excelData.type";

export default defineComponent({
  name: "DiagnosingLecturerResultsCrud",
  components: { Breadcrumb, BaseDatePicker, LinkGridComponent },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
    "searchModel.startDate"(newValue) {
      if (!this.searchModel.endDate) {
        this.searchModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.searchModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.searchModel.startDate = this.searchModel.endDate;
            this.$swal({
              text: this.t("common.messageCheckDate"),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
    "searchModel.endDate"(newValue) {
      if (!this.searchModel.startDate) {
        this.searchModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(this.searchModel.startDate);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.searchModel.endDate = this.searchModel.startDate;
            this.$swal({
              text: this.t("common.messageCheckDate"),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
  },
  data() {
    return {
      pageTitle: "",
      breadcrumbItems: [],
      modeDetail: MODE_DETAIL,
      detailDiag: {} as DiagResultProfAbilityDetailModel,
      searchModel: {} as DiagResultProfAbiDetailSearchModel,
      rowData: [] as Array<DiagResultProfAbiDetailListModel>,
      id: "",
      totalRows: 0,
      key: 1,
      listDepartment: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listPstnCd: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listExperience: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listGender: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      columnDefs: [
        {
          headerName: this.t(
            "07.diagnosingLecturer.diagnosisResults.detail.rowNum"
          ),
          field: "rowNumb",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "07.diagnosingLecturer.diagnosisResults.detail.profName"
          ),
          field: "staffNm",
          cellStyle: {
            color: "#2704FF",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            cursor: "pointer",
          },
          cellRenderer: "LinkGridComponent",
          cellRendererParams: {
            onCustomEvent: this.handleCustomClick,
          },
          flex: 1.2,
        },
        {
          headerName: this.t(
            "07.diagnosingLecturer.diagnosisResults.detail.profCode"
          ),
          field: "staffNo",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t(
            "07.diagnosingLecturer.diagnosisResults.detail.department"
          ),
          field: "departmentNm",
          cellStyle: { textAlign: "center" },
          flex: 1,
        },
        {
          headerName: this.t(
            "07.diagnosingLecturer.diagnosisResults.detail.role"
          ),
          field: "staffPstnNm",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
        {
          headerName: this.t(
            "07.diagnosingLecturer.diagnosisResults.detail.experience"
          ),
          field: "experienceNm",
          cellStyle: { textAlign: "center" },
          flex: 0.65,
        },
        {
          headerName: this.t(
            "07.diagnosingLecturer.diagnosisResults.detail.gender"
          ),
          field: "genderNm",
          cellStyle: { textAlign: "center" },
          flex: 0.5,
        },
      ],
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      check: true,
      fileNameExport: this.pageTitle,
      nameOfbtn: this.t("07.coreCompetencyDiagnosisResult.detail.excelDowload"),
      arrayColor: [],
      listWisePride: [],
      dataOutput: [],
    };
  },
  async beforeMount() {
    this.id = window.history.state.id;
    this.getDataDetail();
    this.getListCode();
    this.reset();

    await this.getListWisePride();
  },
  methods: {
    getDataDetail() {
      detailResultDiagProfAbility({ diagSeq: this.id })
        .then((res) => {
          this.detailDiag = res.data.data;
          this.pageTitle =
            "[" +
            this.detailDiag.diagNm +
            "]" +
            this.t("07.diagnosingLecturer.diagnosisResults.detail.pageTitle");
        })
        .finally(() => {});
    },
    async getListWisePride() {
      this.cmn.setLoading(true);
      this.check = false;
      const res = await getListWisePrideAbility();
      if (res && res.status === SUCCSESS_STATUS) {
        this.listWisePride = res.data.data;
        res.data.data.forEach((element: any) => {
          this.columnDefs.push({
            headerName: element.wisePrideNm,
            field: "scores." + element.wisePrideSeq,
            cellStyle: { textAlign: "center" },
            flex: 1,
          });
        });
        this.columnDefs.push({
          headerName: this.t(
            "07.diagnosingLecturer.diagnosisResults.detail.time"
          ),
          field: "dateDiag",
          cellStyle: { textAlign: "center" },
        });
        this.check = true;
      }
    },
    getListCode() {
      getListCodeMng({
        upCdIdList: [
          UP_CD_ID_GENDER,
          UP_CD_ID_AFFILIATED_BLOCK,
          UP_CD_ID_TEACHING_EXPERIENCE,
          UP_CD_ID_PROFESSOR_LEVEL,
        ],
      }).then((res) => {
        if (res.status === SUCCSESS_STATUS) {
          res.data.data.forEach((item) => {
            if (item.upCdId === UP_CD_ID_GENDER) {
              this.listGender.push(item);
            }
            if (item.upCdId === UP_CD_ID_AFFILIATED_BLOCK) {
              this.listDepartment.push(item);
            }
            if (item.upCdId === UP_CD_ID_TEACHING_EXPERIENCE) {
              this.listExperience.push(item);
            }
            if (item.upCdId === UP_CD_ID_PROFESSOR_LEVEL) {
              this.listPstnCd.push(item);
            }
          });
        }
      });
    },
    reset() {
      this.searchModel = {};
      this.searchModel.departmentCd = "";
      this.searchModel.experienceCd = "";
      this.searchModel.genderCd = "";
      this.searchModel.staffPstnCd = "";
    },
    search() {
      this.searchModel.page = 1;
      this.key++;
    },
    getDataPage() {
      this.cmn.setLoading(true);
      this.searchModel.diagSeq = this.id;
      searchStaffInfoDetailDiag(this.searchModel)
        .then(
          (res) => {
            this.rowData = res.data.data.content;
            this.totalRows = res.data.data.totalElements;
            this.rowData.forEach((item) => {
              item.dateDiag = format(new Date(item.dateDiag), FORMAT_YYY_MM_DD);
            });
            let rowExcel = [] as Array<Array<any>>;
            let rowExcelHeader = [] as Array<any>;

            this.columnDefs.forEach((el) => {
              rowExcelHeader.push(el.headerName);
            });

            this.arrayColor = this.columnDefs.map((el) => ({
              color: "d0d0d0",
              name: el.headerName,
            }));
            this.rowData.forEach((el) => {
              let colExcel = [] as Array<any>;
              colExcel.push(el.rowNumb);
              colExcel.push(el.staffNm);
              colExcel.push(el.staffNo);
              colExcel.push(el.departmentNm);
              colExcel.push(el.staffPstnNm);
              colExcel.push(el.experienceNm);
              colExcel.push(el.genderNm);
              this.listWisePride.forEach((element) => {
                colExcel.push(el.scores[element.wisePrideSeq]);
              });
              colExcel.push(el.dateDiag);
              rowExcel.push(colExcel);
            });
            this.dataOutput = [
              { sheetName: "sheet1", data: rowExcel, header: rowExcelHeader },
            ];
            this.cmn.setLoading(false);
          },
          (err) => {}
        )
        .finally(() => {});
    },
    fnPagination(pageNumber: any, pageSize: any) {
      this.searchModel.size = pageSize;
      this.searchModel.page = pageNumber;
      this.searchModel.sort = "";
      this.getDataPage();
    },
    back() {
      this.$router.replace({
        name: SCREEN.diagnosingLecturerResults.name,
      });
    },
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    handleCustomClick(data: any) {
      this.$router.push({
        name: SCREEN.diagnosingLecturerResultsProfCrud.name,
        params: { mode: MODE_DETAIL },
        state: { staffNo: data.staffNo, diagSeq: this.id },
      });
    },
  },
});
</script>
