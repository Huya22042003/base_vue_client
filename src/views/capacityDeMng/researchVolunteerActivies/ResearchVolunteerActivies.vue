<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="''"></Breadcrumb>
    <div class="box dp_block">
      <div class="box_section">
        <div class="search_box col_3">
          <ul>
            <li>
              <p>
                {{
                  t("capacityDeMng.researchVolunteerActivities.search.major")
                }}
              </p>
              <!-- 단과대학 -->
              <SelectBoxBase
                :id="'major'"
                :name="'major'"
                v-model="formSearch.major"
                :data="listSelectBoxMajor"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p>
                {{
                  t(
                    "capacityDeMng.researchVolunteerActivities.search.department"
                  )
                }}
              </p>
              <!-- 학과 -->
              <SelectBoxBase
                :id="'department'"
                :name="'department'"
                v-model="formSearch.department"
                :data="listSelectBoxDept"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p>
                {{ t("capacityDeMng.researchVolunteerActivities.search.year") }}
              </p>
              <!-- 학년 -->
              <SelectBoxBase
                :id="'year'"
                :name="'year'"
                v-model="formSearch.year"
                :data="listSelectYear"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p>
                {{ t("capacityDeMng.researchVolunteerActivities.search.name") }}
              </p>
              <!-- 이름(학번) -->
              <InputBase :id="'name'" v-model="formSearch.name"></InputBase>
            </li>
            <li>
              <p>
                {{
                  t(
                    "capacityDeMng.researchVolunteerActivities.search.typeVolunteer"
                  )
                }}
              </p>
              <!-- 봉사 구분 -->
              <SelectBoxBase
                :id="'typeVolunteer'"
                :name="'typeVolunteer'"
                v-model="formSearch.divActive"
                :data="listSelectDivSocial"
              >
              </SelectBoxBase>
            </li>
            <li>
              <p>
                {{
                  t(
                    "capacityDeMng.researchVolunteerActivities.search.nameVolunteer"
                  )
                }}
              </p>
              <!-- 사회봉사명 -->
              <InputBase
                :id="'nameVolunteer'"
                v-model="formSearch.socialTitle"
              ></InputBase>
            </li>
            <li>
              <p>
                {{
                  t(
                    "capacityDeMng.researchVolunteerActivities.search.typeOfVolunteer"
                  )
                }}
              </p>
              <!-- 봉사 유형 -->
              <SelectBoxBase
                :id="'typeOfVolunteer'"
                :name="'typeOfVolunteer'"
                v-model="formSearch.typeDiv"
                :data="listSelectType"
              >
              </SelectBoxBase>
            </li>
          </ul>
          <div class="dp_flex btn_group btn_end" style="gap: 10px">
            <button
              class="button btn_xl btn_blue btn_responsive"
              @click="searchFormData()"
            >
              <!-- 조회 -->
              {{ t("common.search") }}
            </button>
            <button
              class="button btn_xl btn_lightgray btn_responsive"
              @click="cleardataSearch()"
            >
              <!-- 초기화 -->
              {{ t("common.reset") }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="box dp_block">
      <div class="box_section">
        <GridComponentV2
          :key="key"
          :rowData="rowData"
          :columnDefs="columnDefs"
          :paginationClientFlag="false"
          :paginationPageSize="paginationPageSize"
          @customPagination="fnPagination"
          :totalRecord="totalRecord"
          :paginationPageSizeSelector="paginationPageSizeSelector"
        >
          <template #button>
            <div>
              <!-- 엑셀 다운로드 -->
              <ExportFileExcel
                :data="dataOutput"
                :fileName="'fileDowload'"
                :btnName="
                  t(
                    'capacityDeMng.researchVolunteerActivities.table.exportExcel'
                  )
                "
                @click="exportExcel"
              ></ExportFileExcel>
            </div>
          </template>
        </GridComponentV2>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { getPageResearch } from "@/stores/capacityDeMng/socialServe/volunteerActivities/volunteerActivities.service";
import type { SocialResearchFilterDTO } from "@/stores/capacityDeMng/socialServe/volunteerActivities/volunteerActivities.type";
import {
  PAGINATION_PAGE_SIZE,
  PAGINATION_PAGE_SIZE_SELECTOR,
  SUCCSESS_STATUS,
  FORMAT_YYY_MM_DD,
} from "@/constants/screen.const";
import { format } from "date-fns";
import {
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
  MESSAGE_ERROR_API,
} from "@/constants/common.const";
import { getDepartmentList } from "@/stores/common/department/department.service";
import {
  SOCIAL_TYPE_UP_CD_ID,
  UP_CD_ID_GRADE_LEVEL,
  SOCIAL_DIV_UP_CD_ID,
} from "@/constants/common.const";

export default defineComponent({
  components: {
    LinkGridComponent,
  },
  setup: () => {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  data() {
    return {
      pageTitle: this.t(
        "capacityDeMng.researchVolunteerActivities.title"
      ) /* 사회봉사 현황 조회 */,
      rowData: [] as Array<any>,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      formSearch: {
        major: "",
        department: "",
        year: "",
        name: "",
        divActive: "",
        socialTitle: "",
        typeDiv: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SocialResearchFilterDTO,
      columnDefs: ref([
        {
          headerName: this.t("common.rowNum"),
          field: "rowNumb",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "capacityDeMng.researchVolunteerActivities.table.typeRole"
          ) /* 구분 */,
          field: "typeAplcn",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.5,
        },
        {
          headerName: this.t(
            "capacityDeMng.researchVolunteerActivities.table.department"
          ) /* 학과/소속 */,
          field: "department",
          cellStyle: {
            textAlign: "center",
          },
          flex: 1,
        },
        {
          headerName: this.t(
            "capacityDeMng.researchVolunteerActivities.table.code"
          ) /* 학번 /직번 */,
          field: "codeUser",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.7,
        },
        {
          headerName: this.t(
            "capacityDeMng.researchVolunteerActivities.table.name"
          ) /* 이름 */,
          field: "nameUser",
          cellStyle: {
            textAlign: "center",
          },
          flex: 1,
        },
        {
          headerName: this.t(
            "capacityDeMng.researchVolunteerActivities.table.typeVolunteer"
          ) /* 봉사 구분 */,
          field: "serveDiv",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.7,
        },
        {
          headerName: this.t(
            "capacityDeMng.researchVolunteerActivities.table.nameVolunteer"
          ) /* 사회봉사명 */,
          field: "title",
          cellStyle: {
            textAlign: "center",
          },
          flex: 1,
        },
        {
          headerName: this.t(
            "capacityDeMng.researchVolunteerActivities.table.typeActiveVolunteer"
          ) /* 봉사 유형 */,
          field: "typeServe",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.7,
        },
        {
          headerName: this.t(
            "capacityDeMng.researchVolunteerActivities.table.volunteerDate"
          ) /* 진행 기간 */,
          field: "timeSocial",
          cellStyle: {
            textAlign: "center",
          },
          flex: 1,
        },
        {
          headerName: this.t(
            "capacityDeMng.researchVolunteerActivities.table.volunteerTime"
          ) /* 봉사 시간 */,
          field: "recoTime",
          cellStyle: {
            textAlign: "center",
          },
          flex: 0.5,
        },
      ]),
      key: 1,
      totalRecord: 0,
      listSelectBoxDept: [
        { cdId: "", cdNm: this.t("common.all"), upCdId: "dept" },
      ] as CodeMngModel[],
      listSelectBoxMajor: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
          upCdId: "major",
        },
      ] as CodeMngModel[],
      listSelectYear: [] as CodeMngModel[],
      listSelectDivSocial: [] as CodeMngModel[],
      listSelectType: [] as CodeMngModel[],
      dataOutput: [],
      formSearchAll: {
        major: "",
        department: "",
        year: "",
        name: "",
        divActive: "",
        socialTitle: "",
        typeDiv: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      } as SocialResearchFilterDTO,
      rowDataAll: [] as Array<any>,
    };
  },
  beforeMount() {
    this.getListCode();
    this.getListUniversity();
  },
  watch: {
    "formSearch.major"(newValue, oldValue) {
      if (newValue) {
        this.formSearch.department = "";
        this.getListDepartment();
      } else {
        this.formSearch.department = "";
        this.listSelectBoxDept = [
          {
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "dept",
          },
        ];
      }
    },
  },
  methods: {
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
              this.listSelectBoxMajor.push({
                cdId: item.deptCd,
                cdNm: item.deptNm,
                upCdId: "major",
              });
            }
          });
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    getListDepartment() {
      this.store.setLoading(true);
      getDepartmentList({
        deptCd: [],
        deptDivCd: [],
        upDeptCd: [this.formSearch.major],
        useYn: "",
      })
        .then((res) => {
          res.data.data.forEach((item: any) => {
            if (item.deptDivCd === DIV_CD_DEPT_DEPART) {
              this.listSelectBoxDept.push({
                cdId: item.deptCd,
                cdNm: item.deptNm,
                upCdId: "dept",
              });
            }
          });
          this.store.setLoading(false);
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    getListCode() {
      getListCodeMng({
        upCdIdList: [
          SOCIAL_TYPE_UP_CD_ID,
          SOCIAL_DIV_UP_CD_ID,
          UP_CD_ID_GRADE_LEVEL,
        ],
      })
        .then((res) => {
          this.listSelectType = res.data.data.filter(
            (el: CodeMngModel) => el.upCdId == SOCIAL_TYPE_UP_CD_ID
          );
          this.listSelectDivSocial = res.data.data.filter(
            (el: CodeMngModel) => el.upCdId == SOCIAL_DIV_UP_CD_ID
          );
          this.listSelectYear = res.data.data.filter(
            (el: CodeMngModel) => el.upCdId == UP_CD_ID_GRADE_LEVEL
          );
          this.listSelectType.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "dept",
          });
          this.listSelectDivSocial.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "dept",
          });
          this.listSelectYear.unshift({
            cdId: "",
            cdNm: this.t("common.all"),
            upCdId: "dept",
          });
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    searchFormData() {
      this.formSearch.page = 1;
      this.key++;
    },
    cleardataSearch() {
      this.formSearch = {
        major: "",
        department: "",
        year: "",
        name: "",
        divActive: "",
        socialTitle: "",
        typeDiv: "",
        page: 1,
        size: PAGINATION_PAGE_SIZE,
        sort: "",
      };
    },
    fnPagination(pageNumber: any, pagesSize: any) {
      this.formSearch.page = pageNumber;
      this.formSearch.size = pagesSize;
      this.getAllData();
    },
    getAllData() {
      this.store.setLoading(true);
      getPageResearch(this.formSearch)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.totalRecord = res.data.data.totalElements;

            this.rowData = res.data.data.content.map((el: any) => {
              el.timeSocial = `${
                el.startDate ? format(el.startDate, FORMAT_YYY_MM_DD) : " - "
              } ~ ${el.endDate ? format(el.endDate, FORMAT_YYY_MM_DD) : " - "}`;
              return el;
            });
          }
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    exportExcel() {
      if (this.rowDataAll.length == 0) {
        this.formSearchAll.size = this.totalRecord;
        this.store.setLoading(true);
        getPageResearch(this.formSearchAll)
          .then((res) => {
            if (res.status === SUCCSESS_STATUS) {
              this.rowDataAll = res.data.data.content.map((el: any) => {
                el.timeSocial = `${
                  el.startDate ? format(el.startDate, FORMAT_YYY_MM_DD) : " - "
                } ~ ${
                  el.endDate ? format(el.endDate, FORMAT_YYY_MM_DD) : " - "
                }`;
                return el;
              });
            }
          })
          .finally(() => {
            this.store.setLoading(false);
          });
      }
      const header = [
        this.t("common.rowNum"),
        this.t("capacityDeMng.researchVolunteerActivities.table.typeRole"),
        this.t("capacityDeMng.researchVolunteerActivities.table.department"),
        this.t("capacityDeMng.researchVolunteerActivities.table.code"),
        this.t("capacityDeMng.researchVolunteerActivities.table.name"),
        this.t("capacityDeMng.researchVolunteerActivities.table.typeVolunteer"),
        this.t("capacityDeMng.researchVolunteerActivities.table.nameVolunteer"),
        this.t(
          "capacityDeMng.researchVolunteerActivities.table.typeActiveVolunteer"
        ),
        this.t("capacityDeMng.researchVolunteerActivities.table.volunteerDate"),
        this.t("capacityDeMng.researchVolunteerActivities.table.volunteerTime"),
      ];
      let content = [];
      this.rowDataAll.forEach((element) => {
        let contentItem = [];

        contentItem.push(element.rowNumb);
        contentItem.push(element.typeAplcn);
        contentItem.push(element.department);
        contentItem.push(element.codeUser);
        contentItem.push(element.nameUser);
        contentItem.push(element.serveDiv);
        contentItem.push(element.title);
        contentItem.push(element.typeServe);
        contentItem.push(element.timeSocial);
        contentItem.push(element.recoTime);

        content.push(contentItem);
        this.dataOutput = [
          { sheetName: "sheet1", data: content, header: header },
        ];
      });
    },
  },
});
</script>
