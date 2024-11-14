<template>
  <div class="content_wrap">
    <div class="grid_content">
      <div class="page_toparea">
        <h2 class="page_title">{{ t("trainingProcess.title") }}</h2>
      </div>
    </div>
    <div class="grid_content">
      <div class="box dp_block">
        <div class="box_section">
          <!-- 검색유형 1 -->
          <div class="search_box col_2">
            <ul>
              <li>
                <p>{{ t("trainingProcess.search1") }}</p>
                <SelectBoxBase
                  :data="listYear"
                  v-if="listYear"
                  v-model="searchParams.year"
                  id="year"
                />
              </li>
              <li>
                <p>{{ t("trainingProcess.search2") }}</p>
                <InputBase v-model="searchParams.deptNm" id="deptNm" />
              </li>
            </ul>
            <div class="search_btnarea">
              <button
                type="button"
                class="btn_round btn_lg btn_primary mg_l10"
                @click="getAllData()"
              >
                {{ t("common.search") }}
              </button>
              <button
                @click="resetFormData()"
                type="button"
                class="btn_round btn_lg btn_gray mg_l5"
              >
                {{ t("common.reset") }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="box_section">
        <div class="box">
          <GridComponentV2
            :rowData="dataRow"
            :columnDefs="columnDefs1"
            :paginationClientFlag="false"
            :totalRecord="paginationFake"
            @customPagination="fnPagination"
            ref="gridKey"
            :id="'trainingProcess'"
          >
          </GridComponentV2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import { ref } from "vue";
import InputBase from "@/components/common/input/InputBase.vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useRouter } from "vue-router";
import { SCREEN } from "@/router/screen";
import { useI18n } from "vue-i18n";
import {
  EduCourseCqiFilterDetail,
  EduCourseCqiListModel,
  EduCourseCqiSearchModel,
} from "@/stores/cqiTrainingProcess/cqiTrainingProcess.type";
import {
  FORMAT_YYY_MM_DD,
  PAGINATION_PAGE_1,
  PAGINATION_PAGE_SIZE,
  START_YEAR_NUMBER,
} from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { getEduCourseCqiList } from "@/stores/cqiTrainingProcess/cqiTrainingProcess.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import {
  CQI_DIV_COMPANY,
  CQI_DIV_SCHOOL,
  CQI_DIV_STUDENT,
  DEPT_TYPE_GENERAL_EDUCATION,
  SEMESTER_1_IN_LEAVE,
  SEMESTER_1_IN_REGIST,
  SEMESTER_1_IN_STUDY,
  SEMESTER_1_OUT_LEAVE,
  SEMESTER_1_OUT_REGIST,
  SEMESTER_1_OUT_STUDY,
  SEMESTER_2_IN_LEAVE,
  SEMESTER_2_IN_REGIST,
  SEMESTER_2_IN_STUDY,
  SEMESTER_2_OUT_LEAVE,
  SEMESTER_2_OUT_REGIST,
  SEMESTER_2_OUT_STUDY,
  STS_EDU_CQI_CREATE,
  STS_EDU_CQI_NOT_CREATE,
  STS_EDU_CQI_SUCCESS,
  TOTAL_ASS_STUDY,
  TOTAL_HOUR_PROF,
  TOTAL_OTHER,
  TOTAL_PROF_CLIENT,
  TOTAL_PROF_STUDY,
  TOTAL_SP_PROF_STUDY,
  TOTAL_STAFF_NO_PROF,
  TOTAL_STUDENT_PROF,
  TOTAL_STUDENT_STUDY,
  UP_CD_ID_121901,
  UP_CD_ID_121902,
} from "@/constants/common.const";
import ButtonGridComponent from "@/components/common/grid/ButtonGridComponent.vue";
import { format } from "date-fns";
import { getMajorOverview } from "@/stores/cqiTrainingProcess/overview/overview.service";
import {
  EduCourseOverviewDTO,
  EduCourseOverviewStateDTO,
} from "@/stores/cqiTrainingProcess/overview/overview.type";
import { getListEduCourseCqiEvalStnrd } from "@/stores/cqiTrainingProcess/selfAssessmentResult/selfAssessmentResult.service";
import { EduCourseCqiEvalStnrdModel } from "@/stores/cqiTrainingProcess/selfAssessmentResult/selfAssessmentResult.type";

const { t } = useI18n();
const router = useRouter();
const storeCommon = commonStore();

const columnDefs1 = ref([
  {
    headerName: t("trainingProcess.column1"),
    field: "rowNum",
    flex: 0.3,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: t("trainingProcess.column2"),
    field: "year",
    flex: 0.3,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: t("trainingProcess.column3"),
    field: "deptNm",
    cellRenderer: LinkGridComponent,
    cellRendererParams: {
      onCustomEvent: handleDetailClick,
    },
  },
  { headerName: t("trainingProcess.column4"), field: "eduCourseTypeNm" },
  {
    headerName: t("trainingProcess.column5"),
    field: "stsNm",
    cellStyle: (data: any) => {
      const code = data.data.stsCd;

      let color = "";

      if (code == STS_EDU_CQI_NOT_CREATE) {
        color = "#FF0000";
      }
      if (code == STS_EDU_CQI_CREATE) {
        color = "#000000";
      }
      if (code == STS_EDU_CQI_SUCCESS) {
        color = "#026700";
      }

      return {
        color: color,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
    },
    flex: 0.6,
  },
  {
    headerName: t("trainingProcess.column6"),
    field: "regBy",
    flex: 0.6,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: t("trainingProcess.column7"),
    field: "regDate",
    flex: 0.6,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    headerName: t("trainingProcess.column8"),
    cellRenderer: ButtonGridComponent,
    flex: 0.4,
    cellStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    cellRendererParams: (data: EduCourseCqiListModel) => {
      return {
        onCustomEvent: printReport,
        value: t("common.print"),
        className: "btn_round btn_sm btn_white",
      };
    },
  },
]);

const dataRow = ref<EduCourseCqiListModel[]>([]);

const listYear = ref<Array<CodeMngModel>>([]);

const currentYear = new Date().getFullYear();
for (let index = START_YEAR_NUMBER; index <= currentYear + 1; index++) {
  listYear.value.push({
    cdId: `${index}`,
    cdNm: `${index}`,
    upCdId: `${index}`,
  });
}

const searchParams = ref<EduCourseCqiSearchModel>({
  deptNm: "",
  year: `${currentYear + 1}`,
  page: PAGINATION_PAGE_1,
  size: PAGINATION_PAGE_SIZE,
  sort: "",
});

const gridKey = ref(null);
const paginationFake = ref(100);

const fnPagination = (pageNumber: any, pagesSize: any) => {
  searchParams.value.size = pagesSize;
  searchParams.value.page = pageNumber;

  getAllData();
};

const resetFormData = () => {
  searchParams.value = {
    deptNm: "",
    year: `${currentYear + 1}`,
    page: PAGINATION_PAGE_1,
    size: PAGINATION_PAGE_SIZE,
    sort: "",
  };
};

const getAllData = () => {
  storeCommon.setLoading(true);
  getEduCourseCqiList(searchParams.value)
    .then((res) => {
      dataRow.value = res.data.data.content.map(
        (item: EduCourseCqiListModel) => {
          item.typeOfRedirect =
            item.deptCd == DEPT_TYPE_GENERAL_EDUCATION ? "general" : "major";
          item.regDate = item.regDate
            ? format(item.regDate, FORMAT_YYY_MM_DD)
            : "";

          return item;
        }
      ) as EduCourseCqiListModel[];
      paginationFake.value = res.data.data.totalElements;
    })
    .finally(() => {
      storeCommon.setLoading(false);
    });
};

function handleDetailClick(item: EduCourseCqiListModel) {
  router.push({
    name: SCREEN.createTrainingProcess.name,
    params: { mode: item.typeOfRedirect },
    state: {
      deptCd: item.deptCd,
      deptNm: item.deptNm,
      typeSeq: item.eduCursTypeSeq,
      year: item.year,
      eduCourseCqiSeq: item.eduCourseCqiSeq,
      status: item.stsCd,
      eduCourseTypeCd: item.eduCourseTypeCd,
    },
  });
}

const printReport = async (data: EduCourseCqiListModel) => {
  var datasetList = {};
  var paramList = {};
  var cqiScore = {};

  if (data.typeOfRedirect == "general") {
    await getDetailGeneralTab1(data);
    await getDetailGeneralTab2(data, UP_CD_ID_121902);

    datasetList.dataInternalRp = JSON.stringify(dataInternal.value);
    datasetList.dataCompanyRp = JSON.stringify(dataCompany.value);
    datasetList.dataStudent = JSON.stringify(dataStudent.value);
  } else {
    await getDataDetail(data);
    await getDetailGeneralTab2(data, UP_CD_ID_121901);

    datasetList.studentMng = JSON.stringify(dataStudentMng.value);
    datasetList.studentMngTotal = JSON.stringify(dataStudentMngTotal.value);
    datasetList.studentAvg = JSON.stringify(dataStudentAvg.value);
    datasetList.profMng = JSON.stringify(dataProfMng.value);
    datasetList.dataInternal = JSON.stringify(dataInternal.value);
    datasetList.dataCompany = JSON.stringify(dataCompany.value);
  }

  cqiScore.usagePlan = usagePlan.value;
  cqiScore.evalScore1 = calculateAverageScore(listData.value.slice(0, 2));
  cqiScore.evalScore2 = calculateAverageScore(listData.value.slice(2, 3));
  cqiScore.evalScore3 = calculateAverageScore(listData.value.slice(3, 5));
  cqiScore.evalScore4 = calculateAverageScore(listData.value.slice(5, 7));
  cqiScore.regDate = format(data.regDate, "yyyy.MM.dd");

  const date = new Date(data.regDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  cqiScore.regDateKr = `${year}년 ${month}월 ${day}일`;

  if (data.typeOfRedirect == "general") {
    datasetList.listEval1 = JSON.stringify(listDataReport.value.slice(0, 4));
    datasetList.listEval2 = JSON.stringify(listDataReport.value.slice(4, 7));
    datasetList.listEval3 = JSON.stringify(listDataReport.value.slice(7, 10));
    datasetList.listEval4 = JSON.stringify(listDataReport.value.slice(10, 16));
  } else {
    datasetList.listEval1 = JSON.stringify(listDataReport.value.slice(0, 9));
    datasetList.listEval2 = JSON.stringify(listDataReport.value.slice(9, 15));
    datasetList.listEval3 = JSON.stringify(listDataReport.value.slice(15, 18));
    datasetList.listEval4 = JSON.stringify(listDataReport.value.slice(18, 24));
  }

  datasetList.cqiScore = JSON.stringify(cqiScore);

  if (data.typeOfRedirect == "general") {
    storeCommon.fn_viewer_open("edu_cqi_general", datasetList, paramList);
  } else {
    storeCommon.fn_viewer_open("edu_cqi", datasetList, paramList);
  }
};

const usagePlan = ref("");
const getDetailGeneralTab1 = async (data: EduCourseCqiListModel) => {
  storeCommon.setLoading(true);
  const dataFilter = {
    deptCd: data.deptCd,
    type: data.eduCursTypeSeq,
    year: data.year,
  } as EduCourseCqiFilterDetail;
  await getMajorOverview(dataFilter)
    .then((res) => {
      const response = res.data.data as EduCourseOverviewDTO;
      convertToObject(response);
    })
    .finally(() => {
      storeCommon.setLoading(false);
    });
};

const listData = ref<Array<EduCourseCqiEvalStnrdModel>>();
const listDataReport = ref<Array<any>>([]);

const getDetailGeneralTab2 = async (
  data: EduCourseCqiListModel,
  typeCd: string
) => {
  storeCommon.setLoading(true);
  await getListEduCourseCqiEvalStnrd({
    eduCourseCqiSeq: data.eduCourseCqiSeq,
    evalItemCd: typeCd,
  }).then((res) => {
    listData.value = res.data.data;
    listData.value?.forEach((item) => {
      item.listEvalStnrdCont.forEach((it) => {
        listDataReport.value?.push({
          evalItemCd: item.evalItemCd,
          evalItemNm: item.evalItemNm,
          impr: item.impr,
          goal: item.goal,
          evalStnrdSeq: it.evalStnrdSeq,
          cont: it.cont,
          eduCursCqiEvalRsltSeq: it.eduCursCqiEvalRsltSeq,
          score: it.score,
          rslt: it.rslt,
        });
      });
    });
    storeCommon.setLoading(false);
  });
};

interface ITable {
  [key: string]: string | number;
}

const dataInternal = ref<ITable[]>([]);
const dataCompany = ref<ITable[]>([]);
const dataStudent = ref<ITable[]>([
  {
    eduCursCqiGroupSeq: "",
    nm: "",
    majField: "",
    aff: "",
    posi: "",
    remark: "",
  },
]);

const convertToObject = (response: any) => {
  usagePlan.value = response.usagePlan;
  if (response.majorOverviewGroup) {
    dataInternal.value = response.majorOverviewGroup.filter(
      (item: any) => item.divCd == CQI_DIV_SCHOOL
    );
    dataCompany.value = response.majorOverviewGroup.filter(
      (item: any) => item.divCd == CQI_DIV_COMPANY
    );
    dataStudent.value = response.majorOverviewGroup.filter(
      (item: any) => item.divCd == CQI_DIV_STUDENT
    );
    if (dataStudent.value.length == 0) {
      dataStudent.value.push({
        eduCursCqiGroupSeq: "",
        nm: "",
        majField: "",
        aff: "",
        posi: "",
        remark: "",
      });
    }
  }
};

const calculateAverageScore = (
  evalItems: Array<EduCourseCqiEvalStnrdModel>
) => {
  let totalScore = 0;
  let totalCount = 0;

  if (!evalItems) {
    return 0;
  }

  evalItems.forEach((evalItem) => {
    evalItem.listEvalStnrdCont.forEach((evalStnrd) => {
      if (evalStnrd.score !== undefined) {
        totalScore += Number(evalStnrd.score);
        totalCount++;
      }
    });
  });

  return totalCount > 0 ? (totalScore / totalCount).toFixed(2) : 0;
};

const dataStudentMng = ref({
  inStudySemester1: 0,
  inStudySemester2: 0,
  outStudySemester1: 0,
  outStudySemester2: 0,
  inLeaveSemester1: 0,
  inLeaveSemester2: 0,
  outLeaveSemester1: 0,
  outLeaveSemester2: 0,
  inRegistSemester1: 0,
  inRegistSemester2: 0,
  outRegistSemester1: 0,
  outRegistSemester2: 0,
});

const dataStudentMngTotal = ref({
  percentStateSemester1: 0,
  percentStateSemester2: 0,
  percentStateTotal: 0,
});

const dataStudentAvg = ref({
  inStudyAvg: 0,
  outStudyAvg: 0,
  sumStudyAvg: 0,
  inLeaveAvg: 0,
  outLeaveAvg: 0,
  sumLeaveAvg: 0,
  inRegistAvg: 0,
  outRegistAvg: 0,
  sumRegistAvg: 0,
});

const dataProfMng = ref({
  totalStudentStudy: 0,
  totalProfStudy: 0,
  totalSpProfStudy: 0,
  totalAssStudy: 0,
  totalStudentProf: 0,
  totalStaffNoProf: 0,
  totalProfClient: 0,
  totalHourProf: 0,
  totalOther: 0,
  totalAll: 0,
});

const totalSumState = (states: any[]) => {
  return states.reduce(
    (sum, current) => sum + (current ? parseInt(current.toString()) : 0),
    0
  );
};
const avgState = (state1: number, state2: number) => {
  const value1 = state1 ? parseInt(state1.toString()) : 0;
  const value2 = state2 ? parseInt(state2.toString()) : 0;
  return parseFloat(((value1 + value2) / 2).toFixed(2));
};
const percentState = (state1: number, state2: number) => {
  const value1 = state1 ? parseInt(state1.toString()) : 0;
  const value2 = state2 ? parseInt(state2.toString()) : 0;
  const result = value2 ? (value1 / value2) * 100 : 0;
  return parseFloat(result.toFixed(2));
};

const getDataDetail = async (data) => {
  storeCommon.setLoading(true);
  const dataFilter = {
    deptCd: data.deptCd,
    type: data.eduCursTypeSeq,
    year: data.year,
  } as EduCourseCqiFilterDetail;

  await getMajorOverview(dataFilter)
    .then((res) => {
      const response = res.data.data as EduCourseOverviewDTO;
      convertToObject1(response);
    })
    .finally(() => {
      storeCommon.setLoading(false);
    });
};

const convertToObject1 = (response: any) => {
  usagePlan.value = response.usagePlan;
  dataStudentMng.value.inStudySemester1 = getStateList(
    response.majorOverviewState,
    SEMESTER_1_IN_STUDY
  );
  dataStudentMng.value.inStudySemester2 = getStateList(
    response.majorOverviewState,
    SEMESTER_2_IN_STUDY
  );
  dataStudentMng.value.outStudySemester1 = getStateList(
    response.majorOverviewState,
    SEMESTER_1_OUT_STUDY
  );
  dataStudentMng.value.outStudySemester2 = getStateList(
    response.majorOverviewState,
    SEMESTER_2_OUT_STUDY
  );
  dataStudentMng.value.inLeaveSemester1 = getStateList(
    response.majorOverviewState,
    SEMESTER_1_IN_LEAVE
  );
  dataStudentMng.value.inLeaveSemester2 = getStateList(
    response.majorOverviewState,
    SEMESTER_2_IN_LEAVE
  );
  dataStudentMng.value.outLeaveSemester1 = getStateList(
    response.majorOverviewState,
    SEMESTER_1_OUT_LEAVE
  );
  dataStudentMng.value.outLeaveSemester2 = getStateList(
    response.majorOverviewState,
    SEMESTER_2_OUT_LEAVE
  );
  dataStudentMng.value.inRegistSemester1 = getStateList(
    response.majorOverviewState,
    SEMESTER_1_IN_REGIST
  );
  dataStudentMng.value.inRegistSemester2 = getStateList(
    response.majorOverviewState,
    SEMESTER_2_IN_REGIST
  );
  dataStudentMng.value.outRegistSemester1 = getStateList(
    response.majorOverviewState,
    SEMESTER_1_OUT_REGIST
  );
  dataStudentMng.value.outRegistSemester2 = getStateList(
    response.majorOverviewState,
    SEMESTER_2_OUT_REGIST
  );

  dataProfMng.value.totalStudentStudy = getStateList(
    response.majorOverviewState,
    TOTAL_STUDENT_STUDY
  );
  dataProfMng.value.totalProfStudy = getStateList(
    response.majorOverviewState,
    TOTAL_PROF_STUDY
  );
  dataProfMng.value.totalSpProfStudy = getStateList(
    response.majorOverviewState,
    TOTAL_SP_PROF_STUDY
  );
  dataProfMng.value.totalAssStudy = getStateList(
    response.majorOverviewState,
    TOTAL_ASS_STUDY
  );
  dataProfMng.value.totalStudentProf = getStateList(
    response.majorOverviewState,
    TOTAL_STUDENT_PROF
  );
  dataProfMng.value.totalStaffNoProf = getStateList(
    response.majorOverviewState,
    TOTAL_STAFF_NO_PROF
  );
  dataProfMng.value.totalProfClient = getStateList(
    response.majorOverviewState,
    TOTAL_PROF_CLIENT
  );
  dataProfMng.value.totalHourProf = getStateList(
    response.majorOverviewState,
    TOTAL_HOUR_PROF
  );
  dataProfMng.value.totalOther = getStateList(
    response.majorOverviewState,
    TOTAL_OTHER
  );

  dataProfMng.value.totalAll = totalSumState([
    dataProfMng.value.totalProfStudy,
    dataProfMng.value.totalSpProfStudy,
    dataProfMng.value.totalAssStudy,
    dataProfMng.value.totalStaffNoProf,
    dataProfMng.value.totalProfClient,
    dataProfMng.value.totalHourProf,
    dataProfMng.value.totalOther,
  ]);

  dataStudentMngTotal.value.percentStateSemester1 = percentState(
    totalSumState([
      dataStudentMng.value.inStudySemester1,
      dataStudentMng.value.outStudySemester1,
    ]),
    totalSumState([
      dataStudentMng.value.inRegistSemester1,
      dataStudentMng.value.outRegistSemester1,
    ])
  );

  dataStudentMngTotal.value.percentStateSemester2 = percentState(
    totalSumState([
      dataStudentMng.value.inStudySemester2,
      dataStudentMng.value.outStudySemester2,
    ]),
    totalSumState([
      dataStudentMng.value.inRegistSemester2,
      dataStudentMng.value.outRegistSemester2,
    ])
  );

  dataStudentAvg.value.inStudyAvg = avgState(
    dataStudentMng.value.inStudySemester1 as number,
    dataStudentMng.value.inStudySemester2 as number
  );

  dataStudentAvg.value.outStudyAvg = avgState(
    dataStudentMng.value.outStudySemester1 as number,
    dataStudentMng.value.outStudySemester2 as number
  );

  dataStudentAvg.value.sumStudyAvg =
    dataStudentAvg.value.inStudyAvg + dataStudentAvg.value.outStudyAvg;

  dataStudentAvg.value.inLeaveAvg = avgState(
    dataStudentMng.value.inLeaveSemester1 as number,
    dataStudentMng.value.inLeaveSemester2 as number
  );

  dataStudentAvg.value.outLeaveAvg = avgState(
    dataStudentMng.value.outLeaveSemester1 as number,
    dataStudentMng.value.outLeaveSemester2 as number
  );

  dataStudentAvg.value.sumLeaveAvg =
    dataStudentAvg.value.inLeaveAvg + dataStudentAvg.value.outLeaveAvg;

  dataStudentAvg.value.inRegistAvg = avgState(
    dataStudentMng.value.inRegistSemester1 as number,
    dataStudentMng.value.inRegistSemester2 as number
  );

  dataStudentAvg.value.outRegistAvg = avgState(
    dataStudentMng.value.outRegistSemester1 as number,
    dataStudentMng.value.outRegistSemester2 as number
  );

  dataStudentAvg.value.sumRegistAvg =
    dataStudentAvg.value.inRegistAvg + dataStudentAvg.value.outRegistAvg;

  dataStudentMngTotal.value.percentStateTotal = percentState(
    avgState(
      totalSumState([
        dataStudentMng.value.inLeaveSemester1,
        dataStudentMng.value.outLeaveSemester1,
      ]),
      totalSumState([
        dataStudentMng.value.inLeaveSemester2,
        dataStudentMng.value.outLeaveSemester2,
      ])
    ),
    avgState(
      totalSumState([
        dataStudentMng.value.inRegistSemester1,
        dataStudentMng.value.inRegistSemester2,
      ]),
      totalSumState([
        dataStudentMng.value.outRegistSemester1,
        dataStudentMng.value.outRegistSemester2,
      ])
    )
  );

  if (response.majorOverviewGroup) {
    dataInternal.value = response.majorOverviewGroup.filter(
      (item: any) => item.divCd == CQI_DIV_SCHOOL
    );
    dataCompany.value = response.majorOverviewGroup.filter(
      (item: any) => item.divCd == CQI_DIV_COMPANY
    );
  }
};
const getStateList = (
  listData: EduCourseOverviewStateDTO[],
  stateDivCd: string
) => {
  if (listData.some((state) => state.stateDivCd == stateDivCd)) {
    return listData.filter((state) => state.stateDivCd == stateDivCd)[0].state;
  }
  return 0;
};
</script>

<style scoped></style>
