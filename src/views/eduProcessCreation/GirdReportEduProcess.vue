<template>
  <button type="button" :disabled="disabled" :class="className" @click="print">
    {{ value }}
  </button>
</template>
<script lang="ts">
import {
  CD_EDU12,
  CD_INTERNAL,
  CD_SELCT_TALT_YES,
  KCS_CD_ID,
  STATUS_YES,
  UP_CD_EDU_21,
  UP_CD_EDU_22,
  UP_CD_EDU_23,
  UP_CD_EDU_24,
  UP_CD_EDUT_21,
  UP_CD_EDUT_22,
  UP_CD_EDUT_23,
  UP_CD_ID_121901,
  UP_CD_ID_GRADE_LEVEL,
  UP_CD_ID_RSN_FST_CD,
  UP_CD_ID_RSN_SEC_CD,
  UP_CD_ID_SAME_REPLACE_DIV_CD,
  UP_CD_ID_SEMESTER,
  UP_CD_TRACK,
  UP_RESULT_SEL,
} from "@/constants/common.const";
import { FORMAT_YYY_MM_DD } from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import {
  getAnalysisAchievement,
  getListEduCourseCqiEvalStnrd,
  getOperationDevelopmentPlanList,
} from "@/stores/eduProcessCreation/analysisAchievement/analysisAchievement.service";
import {
  AnalysisAchievementModel,
  OperationDevelopmentPlanListModel,
} from "@/stores/eduProcessCreation/analysisAchievement/analysisAchievement.type";
import { detailEduCourse } from "@/stores/eduProcessCreation/eduCourse/eduProcess.service";
import {
  EduCourseDetailDTO,
  EduCourseResModel,
  EduCourseSelResDTO,
} from "@/stores/eduProcessCreation/eduCourse/eduProcess.type";
import {
  detailAnalysisEnvDemand,
  detailShowEnvDemand,
} from "@/stores/eduProcessCreation/environmentDemand/environmentDemand.service";
import {
  EnvironDemTitleModel,
  EnvironmentDemandListModel,
} from "@/stores/eduProcessCreation/environmentDemand/environmentDemand.type";
import {
  getJobEduCoreJobSelcList,
  getListVerifyChildCoreJob,
  getListVerifyJobAbility,
} from "@/stores/eduProcessCreation/jobEduMng/jobEduMng.service";
import {
  JobEduCoreJobSelcListModel,
  JobEduVerifyChildCoreJobListModel,
  JobEduVerifyCoreJobListModel,
} from "@/stores/eduProcessCreation/jobEduMng/jobEduMng.type";
import {
  getLinkRoadMap,
  getOverviewRoadMap,
  getRoadMapEduProcess,
  getSyntheticRoadMap,
} from "@/stores/eduProcessCreation/roadmapMng/roadmapMng.service";
import {
  GraduationRoadmapResDTO,
  LinkRoadMapResDTO,
  OverviewSubjectDTO,
  RelatedCertificateResDTO,
  RoadMapAbilityListModel,
  RoadMapEduProcessDTO,
  RoadmapTaltNrtgSelcModel,
} from "@/stores/eduProcessCreation/roadmapMng/roadmapMng.type";
import {
  getCreateSubject,
  getSubMngMappingSubject,
  getSubMngSameReplaceMapping,
} from "@/stores/eduProcessCreation/subjectMng/subjectMng.service";
import {
  CreateSubjectResDTO,
  SubMngCoreAndMappingModel,
  SubMngSameReplaceMappingModel,
} from "@/stores/eduProcessCreation/subjectMng/subjectMng.type";
import { getPageSubjectProfile } from "@/stores/eduProcessCreation/subjectProfile/subjectProfile.service";
import { SubjectProfileResDTO } from "@/stores/eduProcessCreation/subjectProfile/subjectProfile.type";
import {
  getAllEduCourseComm,
  getCoreJobSel,
  getEduGoal,
  getResultEduCourse,
  getTaltNrtgSel,
} from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.service";
import {
  CoreJobSelDTO,
  EduCourseCommResDTO,
  TaltNrtgResDTO,
} from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";
import { format } from "date-fns";

export type ParamGrid = {
  value: string;
  className: string;
  disabled: boolean;
  data: EduCourseResModel;
};

export default {
  props: {
    params: {
      type: Object as PropType<ParamGrid>,
      required: true,
    },
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();

    return {
      router,
      storeCommon,
    };
  },
  mounted() {
    if (this.params) {
      this.value = this.params.value;
      if (this.params.className) {
        this.className = this.params.className;
      }
      this.disabled = this.params.disabled;
      this.data = this.params.data;
    }
  },
  data() {
    return {
      value: "",
      disabled: false,
      className: "",
      data: {} as EduCourseResModel,
      nameFormRp: "07_edu_course",
      datasetListRp: {} as any,
      paramListRp: {} as any,
      dataIsEmpty: "데이터가 없습니다.",
      listCodeResponse: [] as CodeMngModel[],
    };
  },
  methods: {
    async getListCodeEduCourse() {
      await getListCodeMng({
        upCdIdList: [
          UP_RESULT_SEL,
          UP_CD_ID_SAME_REPLACE_DIV_CD,
          UP_CD_ID_RSN_FST_CD,
          UP_CD_ID_RSN_SEC_CD,
          UP_CD_ID_SEMESTER,
          UP_CD_ID_GRADE_LEVEL,
          UP_CD_TRACK,
        ],
      }).then((res: any) => {
        this.listCodeResponse = res.data.data;
      });
    },
    async getDetailEduCourse() {
      await detailEduCourse({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res: any) => {
          const response = res.data.data as EduCourseDetailDTO;
          this.datasetListRp.eduCourseDetail = {
            deptNm: response.deptNm,
            year: response.year,
            createBy: this.data.regBy,
            createDate: this.data.regDate,
          };
        }
      );
    },
    async getAnalysisAchievementReport() {
      await getAnalysisAchievement({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res) => {
          const response = res.data.data as AnalysisAchievementModel;
          this.datasetListRp.analysisAchievementHeader = [
            {
              deptNm: `${response.deptNm}과`,
              year: `${response.year}학년도 교육과정표`,
              date: `운영기간 : ${response.startDate} ~ ${response.endDate}`,
            },
          ];
          this.datasetListRp.analysisAchievementContent = [];
          let dataFooter = {
            title: "총 계",
            acqGpa: 0,
            thryHrs: 0,
            pracHrs: 0,
            kcsYn: 0,
            ncsYn: 0,
          };
          response.listTerm.forEach((term) => {
            term.listSbjt.forEach((sbjt) => {
              dataFooter.acqGpa = dataFooter.acqGpa + sbjt.acqGpa;
              dataFooter.thryHrs = dataFooter.thryHrs + sbjt.thryHrs;
              dataFooter.pracHrs = dataFooter.pracHrs + sbjt.pracHrs;
              dataFooter.kcsYn =
                dataFooter.kcsYn + (sbjt.kcsYn === STATUS_YES ? 1 : 0);
              dataFooter.ncsYn =
                dataFooter.ncsYn + (sbjt.ncsYn === STATUS_YES ? 1 : 0);

              this.datasetListRp.analysisAchievementContent.push({
                term: `${term.gradeNm.replace(
                  "학년",
                  ""
                )} - ${term.termNm.replace("학기", "")}`,
                sbjtNm: sbjt.sbjtNm,
                acqGpa: sbjt.acqGpa,
                thryHrs: sbjt.thryHrs,
                pracHrs: sbjt.pracHrs,
                kcsYn: sbjt.kcsYn === STATUS_YES ? "●" : "",
                ncsYn: sbjt.ncsYn === STATUS_YES ? "●" : "",
              });
            });
            this.datasetListRp.analysisAchievementContent.push({
              term: `${term.gradeNm.replace(
                "학년",
                ""
              )} - ${term.termNm.replace("학기", "")}`,
              sbjtNm: "학점 소계",
              acqGpa: this.totalScoreAnalysis(
                term.listSbjt.map((sbjt) => sbjt.acqGpa)
              ),
              thryHrs: this.totalScoreAnalysis(
                term.listSbjt.map((sbjt) => sbjt.thryHrs)
              ),
              pracHrs: this.totalScoreAnalysis(
                term.listSbjt.map((sbjt) => sbjt.pracHrs)
              ),
              kcsYn: this.totalScoreAnalysis(
                term.listSbjt.map((sbjt) => (sbjt.kcsYn === STATUS_YES ? 1 : 0))
              ),
              ncsYn: this.totalScoreAnalysis(
                term.listSbjt.map((sbjt) => (sbjt.ncsYn === STATUS_YES ? 1 : 0))
              ),
            });
          });
          this.datasetListRp.analysisAchievementFooter = [dataFooter];
        }
      );
    },
    async getAnalysisResultCqi() {
      const operationDevelopmentPlanReqModel = {
        eduCourseSeq: this.data.eduCursSeq,
        upCdId: CD_EDU12,
      };
      const analysisEvalStnrdReqModel = {
        eduCourseSeq: this.data.eduCursSeq,
        evalItemCd: UP_CD_ID_121901,
      };
      await getOperationDevelopmentPlanList(
        operationDevelopmentPlanReqModel
      ).then((res) => {
        const response = res.data.data;
        this.datasetListRp.operationDevelopmentPlan = [];
        response.forEach((el: any) => {
          this.datasetListRp.operationDevelopmentPlan.push({
            title: el.dataNm,
            cont: el.cont,
          });
        });
      });
      await getListEduCourseCqiEvalStnrd(analysisEvalStnrdReqModel).then(
        (res) => {
          const response = res.data.data;
          this.datasetListRp.analysisEvalStnrd = [];
          response.forEach((el: any, index: number) => {
            let title = "";
            if (index == 0 || index == 1) {
              title = "1. 교육과정 개발";
            }
            if (index == 2) {
              title = "2.교육과정 운영";
            }
            if (index == 3 || index == 4) {
              title = "3.교육과정 지원";
            }
            if (index == 5 || index == 6) {
              title = "4.교육과정 성과 및 개선";
            }
            el.listEvalStnrdCont.forEach((item: any) => {
              this.datasetListRp.analysisEvalStnrd.push({
                title: title,
                evalItemNm: el.evalItemNm,
                cont: item.cont,
                score: item.score ? item.score : this.dataIsEmpty,
                rslt: item.rslt ? item.rslt : this.dataIsEmpty,
                impr: el.impr ? el.impr : this.dataIsEmpty,
                goal: el.goal ? el.goal : this.dataIsEmpty,
              });
            });
          });
        }
      );
    },
    async getEnvironmentInternal() {
      const environDemReqModel = {
        eduCourseSeq: this.data.eduCursSeq,
        upCdId: UP_CD_EDU_21,
        upRefrId: UP_CD_EDUT_21,
      };

      this.datasetListRp.environmentInternal = [];
      await detailAnalysisEnvDemand(environDemReqModel).then((res) => {
        const response = res.data.data as EnvironDemTitleModel[];

        this.datasetListRp.environmentInternal = response.map((item) => {
          return {
            title: item.title,
            result: item.listEnvironDemand[0].cont,
            cont: item.listEnvironDemand[1].cont,
          };
        });
      });
    },
    async getEvironmentOutside() {
      const environDemReqModel = {
        eduCourseSeq: this.data.eduCursSeq,
        upCdId: UP_CD_EDU_22,
        upRefrId: UP_CD_EDUT_22,
      };

      this.datasetListRp.environmentOutside = [];
      await detailAnalysisEnvDemand(environDemReqModel).then((res) => {
        const response = res.data.data as EnvironDemTitleModel[];

        this.datasetListRp.environmentOutside = response.map((item) => {
          return {
            title: item.title,
            result: item.listEnvironDemand[0].cont,
            cont: item.listEnvironDemand[1].cont,
          };
        });
      });
    },
    async getEvironmentAttention() {
      const environDemReqModel = {
        eduCourseSeq: this.data.eduCursSeq,
        upCdId: UP_CD_EDU_23,
        upRefrId: UP_CD_EDUT_23,
      };

      this.datasetListRp.environmentAttention = [];
      await detailAnalysisEnvDemand(environDemReqModel).then((res) => {
        const response = res.data.data as EnvironDemTitleModel[];

        this.datasetListRp.environmentAttention = response.map((item) => {
          return {
            title: item.title,
            result: item.listEnvironDemand[0].cont,
            cont: item.listEnvironDemand[1].cont,
          };
        });
      });
    },
    async getEvironmentImprove() {
      const environDemReqModel = {
        eduCourseSeq: this.data.eduCursSeq,
        upCdId: UP_CD_EDU_24,
      };

      this.datasetListRp.environmentImprove = [];
      await detailShowEnvDemand(environDemReqModel).then((res) => {
        const response = res.data.data as EnvironmentDemandListModel[];

        this.datasetListRp.environmentImprove = [
          {
            s: response.filter((item) => item.dataCd == "EDU241")[0].cont,
            w: response.filter((item) => item.dataCd == "EDU242")[0].cont,
            o: response.filter((item) => item.dataCd == "EDU243")[0].cont,
            s_o: response.filter((item) => item.dataCd == "EDU244")[0].cont,
            w_o: response.filter((item) => item.dataCd == "EDU245")[0].cont,
            t: response.filter((item) => item.dataCd == "EDU246")[0].cont,
            s_t: response.filter((item) => item.dataCd == "EDU247")[0].cont,
            w_t: response.filter((item) => item.dataCd == "EDU248")[0].cont,
          },
        ];
      });
    },
    async getEduCompositionTalent() {
      await getAllEduCourseComm({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res: any) => {
          const response = res.data.data as EduCourseCommResDTO[];

          this.datasetListRp.compositionTalent = response.map((item) => {
            item.divCd = item.divCd == CD_INTERNAL ? "내부" : "외부";
            return item;
          });
        }
      );
    },
    async getCreatedTypeTalent() {
      await getEduGoal({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res: any) => {
          const response = res.data.data;

          this.datasetListRp.createdTypeTalent = [
            {
              schVision: response.schEduGoal
                .filter((item: any) => item.divCd == "103720")
                .map((item: any) => item.cont)
                .join("\n"),
              schTalent: response.schEduGoal
                .filter((item: any) => item.divCd == "103730")
                .map((item: any) => item.cont)
                .join("\n"),
              schTarget: response.schEduGoal
                .filter((item: any) => item.divCd == "103740")
                .map((item: any) => item.cont)
                .join("\n"),
              deptVision: response.deptEduGoal
                .filter((item: any) => item.divCd == "103810")
                .map((item: any) => item.cont)
                .join("\n"),
              deptTalent: response.eduSel
                .filter((item: any) => item.dataCd == "103820")
                .map((item: any) => item.refrNm)
                .join("\n"),
              deptTarget: response.eduSel
                .filter((item: any) => item.dataCd == "103830")
                .map((item: any) => item.refrNm)
                .join("\n"),
              deptDesc: response.eduDesc
                .filter((item: any) => item.dataCd == "EDU_032_03")
                .map((item: any) => item.cont)
                .join("\n"),
            },
          ];
        }
      );
    },
    async getSetGoalTalent() {
      await getTaltNrtgSel({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res: any) => {
          const response = res.data.data as TaltNrtgResDTO;

          response.taltNrtgSel = response.taltNrtgSel.filter(
            (item) => item.taltNrtgSelcSeq
          );

          this.datasetListRp.setGoalTalentTable1 = [
            {
              eduCourseType: response.eduCourseType,
              evalDate: response.evalDate
                ? format(response.evalDate, FORMAT_YYY_MM_DD)
                : "",
              evalPartiCnt: response.evalPartiCnt + "명",
              jobField: response.jobField,
            },
          ];
          this.datasetListRp.setGoalTalentTable2 = response.taltNrtgSel
            .filter((item) => item.taltNrtgSelcSeq)
            .map((item: any) => {
              item.avgScore = this.getAvgScore([
                item.jobImpt,
                item.jobOl,
                item.employFruitage,
                item.deptVisn,
                item.eduEfft,
              ]);
              return item;
            });
        }
      );
      await getCoreJobSel({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res) => {
          const response = res.data.data.map((item: any) => {
            if (item.coreJobSelcSeq) {
              item.check = true;
            } else {
              item.check = false;
            }
            return item;
          }) as CoreJobSelDTO[];

          this.datasetListRp.setGoalTalentTable3 =
            this.datasetListRp.setGoalTalentTable2
              .filter((item: any) => item.selCd == CD_SELCT_TALT_YES)
              .map((item: any) => {
                return {
                  typeNm: item.typeNm,
                  defn: response.filter(
                    (res) => res.taltNrtgTypeSeq == item.taltNrtgTypeSeq
                  )[0].defn,
                  job: response
                    .filter(
                      (res) => res.taltNrtgTypeSeq == item.taltNrtgTypeSeq
                    )
                    .map((res) => res.jobNm)
                    .join(", "),
                };
              });
        }
      );
    },
    async getSelectionTalent() {
      type SelectionTalentType = {
        col1: string;
        col2: string;
        colLeft1: string;
        colLeft2: string;
        row: number;
        value: string;
        taltTypeSeq: string;
      };
      let dataConvert = [] as SelectionTalentType[];

      await getCoreJobSel({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res: any) => {
          const response = res.data.data.filter(
            (item: any) => item.coreJobSelcSeq
          ) as any[];
          response.forEach((item) => {
            /* row 1 */
            dataConvert.push({
              col1: item.typeNm + " 디자이너",
              col2: item.jobNm + " 디자인",
              colLeft1: "(1) 산업체, 지역사회 인력수요도",
              colLeft2: "40점",
              row: 1,
              value: "",
              taltTypeSeq: item.taltNrtgTypeSeq,
            });
            /* row 2 */
            dataConvert.push({
              col1: item.typeNm + " 디자이너",
              col2: item.jobNm + " 디자인",
              colLeft1: "\t• 해당산업의 인력수요의 미래전망과 비전",
              colLeft2: "20",
              row: 2,
              value: `${item.visn}`,
              taltTypeSeq: item.taltNrtgTypeSeq,
            });
            /* row 3 */
            dataConvert.push({
              col1: item.typeNm + " 디자이너",
              col2: item.jobNm + " 디자인",
              colLeft1: "\t• 신입사원 채용 시 전공 일치도에 대한 중요도",
              colLeft2: "10",
              row: 3,
              value: `${item.impt}`,
              taltTypeSeq: item.taltNrtgTypeSeq,
            });
            /* row 4 */
            dataConvert.push({
              col1: item.typeNm + " 디자이너",
              col2: item.jobNm + " 디자인",
              colLeft1: "\t• 향후 해당직무에 대한 채용 가능성",
              colLeft2: "10",
              row: 4,
              value: `${item.psbl}`,
              taltTypeSeq: item.taltNrtgTypeSeq,
            });
            /* row 5 */
            dataConvert.push({
              col1: item.typeNm + " 디자이너",
              col2: item.jobNm + " 디자인",
              colLeft1: "(2) 본교 교육여건과의 연계성 ",
              colLeft2: "30점",
              row: 5,
              value: "",
              taltTypeSeq: item.taltNrtgTypeSeq,
            });
            /* row 6 */
            dataConvert.push({
              col1: item.typeNm + " 디자이너",
              col2: item.jobNm + " 디자인",
              colLeft1:
                "\t• 강의 실습실의 공간 면적 및 시설은 해당 직무능력 성취를 위한 수업에 적합한가?",
              colLeft2: "15",
              row: 6,
              value: `${item.factSutb}`,
              taltTypeSeq: item.taltNrtgTypeSeq,
            });
            /* row 7 */
            dataConvert.push({
              col1: item.typeNm + " 디자이너",
              col2: item.jobNm + " 디자인",
              colLeft1:
                "\t• 강의 실습실의 기자재 구비 및 활용은 해당 직무능력 성취를 위한 수업에 적합한가?",
              colLeft2: "15",
              row: 7,
              value: `${item.matlSutb}`,
              taltTypeSeq: item.taltNrtgTypeSeq,
            });
            /* row 8 */
            dataConvert.push({
              col1: item.typeNm + " 디자이너",
              col2: item.jobNm + " 디자인",
              colLeft1: "(3) 학생 선호도",
              colLeft2: "15",
              row: 8,
              value: ``,
              taltTypeSeq: item.taltNrtgTypeSeq,
            });
            /* row 9 */
            dataConvert.push({
              col1: item.typeNm + " 디자이너",
              col2: item.jobNm + " 디자인",
              colLeft1: "\t• 재학생의 해당직무 선호도 (재학생 설문조사)",
              colLeft2: "30",
              row: 9,
              value: `${item.prfr}`,
              taltTypeSeq: item.taltNrtgTypeSeq,
            });
            /* row 10 */
            dataConvert.push({
              col1: item.typeNm + " 디자이너",
              col2: item.jobNm + " 디자인",
              colLeft1: "\t\t\t합계",
              colLeft2: "100",
              row: 10,
              value: `${this.totalScoreAnalysis([
                item.visn,
                item.impt,
                item.psbl,
                item.factSutb,
                item.matlSutb,
                item.prfr,
              ])}`,
              taltTypeSeq: item.taltNrtgTypeSeq,
            });
            /* row 11 */
            dataConvert.push({
              col1: item.typeNm + " 디자이너",
              col2: item.jobNm + " 디자인",
              colLeft1: "\t\t\t판정",
              colLeft2: "",
              row: 11,
              value: `${item.selcNm}`,
              taltTypeSeq: item.taltNrtgTypeSeq,
            });
          });
          this.datasetListRp.getSelectionTalent = dataConvert;
        }
      );
    },
    async getResultTypeTalent() {
      await getResultEduCourse({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res: any) => {
          const response = res.data.data;
          const responseCode = this.listCodeResponse.filter(
            (item) => item.upCdId == UP_RESULT_SEL
          );
          this.datasetListRp.resultTypeTalent = [
            {
              asisIndex: response.asisEduCourse.indexEduCourse
                .map(
                  (item: any) =>
                    response.listCurriculum.filter(
                      (curri: any) => curri.cdId == item.selCd
                    )[0].cdNm
                )
                .join(", "),
              asisJob: response.asisEduCourse.eduCourseJob,
              asisType: response.asisEduCourse.eduCourseType,
              asisLimit: response.tobeEduCourse.asisLimits,
              tobeIndex: response.tobeEduCourse.indexEduCourse
                .map(
                  (item: any) =>
                    response.listCurriculum.filter(
                      (curri: any) => curri.cdId == item.selCd
                    )[0].cdNm
                )
                .join(", "),
              tobeJob: response.tobeEduCourse.eduCourseJob,
              tobeType: response.tobeEduCourse.eduCourseType,
              tobeRsn: response.tobeEduCourse.tobeRsn,
              tobeCoreJobDivCd: responseCode.filter(
                (item: CodeMngModel) =>
                  item.cdId == response.tobeEduCourse.tobeCoreJobDivCd
              )[0].cdNm,
              tobeTaltNrtgTypeDivCd: responseCode.filter(
                (item: CodeMngModel) =>
                  item.cdId == response.tobeEduCourse.tobeTaltNrtgTypeDivCd
              )[0].cdNm,
              tobeCursListDivCd: responseCode.filter(
                (item: CodeMngModel) =>
                  item.cdId == response.tobeEduCourse.tobeCursListDivCd
              )[0].cdNm,
            },
          ];
        }
      );
    },
    async getTechniqueEdu() {
      await getJobEduCoreJobSelcList({
        eduCourseSeq: this.data.eduCursSeq,
      }).then((res) => {
        const response = res.data.data as JobEduCoreJobSelcListModel[];
        this.datasetListRp.techniqueEdu = response.map((item) => {
          return {
            typeNm: item.typeNm,
            jobNm: item.jobNm,
            defn: item.defn,
          };
        });
      });
    },
    async getVerifyJob() {
      await getListVerifyJobAbility({
        eduCourseSeq: this.data.eduCursSeq,
      }).then((res) => {
        const response = res.data.data as JobEduVerifyCoreJobListModel[];
        this.datasetListRp.verifyJob = [];
        response.forEach((job) => {
          job.listNcsKcs.forEach((item) => {
            item.listVerifyJobAbility.forEach((jobAbili) => {
              if (jobAbili.isCheck) {
                this.datasetListRp.verifyJob.push({
                  jobNm: job.jobNm,
                  jobAbilCd: jobAbili.jobAbilCd,
                  jobAbilNm: jobAbili.jobAbilNm,
                  eduNeed: jobAbili.eduNeed,
                  jobImpt: jobAbili.jobImpt,
                  average: this.getAvgScore([
                    jobAbili.eduNeed.toString(),
                    jobAbili.jobImpt.toString(),
                  ]),
                  useYn: jobAbili.useYn,
                });
              }
            });
          });
        });
      });
    },
    async getVerifyCapaChld() {
      getListVerifyChildCoreJob({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res) => {
          const response = res.data.data as JobEduVerifyChildCoreJobListModel[];

          this.datasetListRp.verifyJob2 = [];
          this.datasetListRp.verifyCapaChld = [];

          response.forEach((job) => {
            job.listNcsKcs.forEach((ncs) => {
              ncs.listJobAbility.forEach((jobAbi) => {
                jobAbi.listJobCapaUnit.forEach((jobCapa) => {
                  if (jobCapa.isCheck) {
                    jobCapa.listJobCapaUnitPerform.forEach((perform) => {
                      this.datasetListRp.verifyJob2.push({
                        jobNm: job.jobNm,
                        jobAbiNm: jobAbi.jobAbilNm,
                        jobCapaNm: jobCapa.capaUnitNm,
                        performNm: perform.cont,
                        isUse: perform.isCheck ? "Y" : "N",
                        notUseCont: perform.unuseRsn ? perform.unuseRsn : "",
                      });

                      if (perform.isCheck) {
                        this.datasetListRp.verifyCapaChld.push({
                          jobNm: job.jobNm,
                          jobAbiNm: jobAbi.jobAbilNm,
                          jobCapaNm: jobCapa.capaUnitNm,
                          performNm: perform.cont,
                        });
                      }
                    });
                  }
                });
              });
            });
          });
        }
      );
    },
    async getCreatedSubject() {
      await getCreateSubject({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res: any) => {
          const response = res.data.data as CreateSubjectResDTO[];
          this.datasetListRp.createSubject = [];
          response.forEach((job) => {
            job.subjectNm.forEach((sbjt) => {
              sbjt.jobAbility.forEach((jobAbi) => {
                jobAbi.jobCapa.forEach((jobCapa) => {
                  this.datasetListRp.createSubject.push({
                    jobNm: job.jobNm,
                    sbjtNm: sbjt.sbjtNm,
                    acqGpa: sbjt.acqGpa,
                    jobAbiNm: jobAbi.cdNm,
                    jobCapaNm: jobCapa.cdNm,
                  });
                });
              });
            });
          });
        }
      );
    },
    async getMappingSubject() {
      type AbilityType = {
        type: "JOB" | "CORE";
        abilitySeq: string;
        abilityNm: string;
        childSeq: string;
        childNm: string;
      };

      type MappingSubjectType = {
        colLeft1: string;
        colLeft2: string;
        colLeft3: string;
        col1: string;
        col2: string;
        col3: string;
        row: string;
        value: string;
      };

      let listAbilityType = [] as AbilityType[];

      await getSubMngMappingSubject({
        eduCourseSeq: this.data.eduCursSeq,
      }).then((res) => {
        const {
          listCoreAbility,
          listChildAbility,
          listMappingSubject,
          saveType,
        } = res.data.data as SubMngCoreAndMappingModel;

        listChildAbility.forEach((item) => {
          const coreAbil = listCoreAbility.filter(
            (core) => core.coreAbilitySeq == item.coreAbilitySeq
          )[0];
          listAbilityType.push({
            type: "CORE",
            abilitySeq: coreAbil.coreAbilitySeq,
            abilityNm: coreAbil.coreAbilityNm,
            childSeq: item.childAbilitySeq,
            childNm: item.childAbilityNm,
          });
        });

        listMappingSubject.forEach((mapping) => {
          mapping.listSbjt.forEach((sbjt) => {
            sbjt.listJobAbility.forEach((job) => {
              job.listChild.forEach((child) => {
                listAbilityType.push({
                  type: "JOB",
                  abilitySeq: job.jobAbilSeq,
                  abilityNm: job.jobAbilNm,
                  childSeq: child.childSeq,
                  childNm: child.childNm,
                });
              });
            });
          });
        });
        let listResponse = [] as MappingSubjectType[];
        listMappingSubject.forEach((mapping, indexMapping) => {
          mapping.listSbjt.forEach((sbjt, index) => {
            listAbilityType.forEach((ability) => {
              let col1 = "";
              let value = "";

              if (ability.type == "JOB") {
                col1 = "직무역량";

                sbjt.listJobAbility.forEach((sbjtJob) => {
                  sbjtJob.listChild.forEach((child) => {
                    if (
                      sbjtJob.jobAbilSeq == ability.abilitySeq &&
                      child.childSeq == ability.childSeq
                    ) {
                      value = child.rate;
                    }
                  });
                });
              } else {
                col1 = "핵심역량";
                sbjt.listRateCoreAbility.forEach((core) => {
                  if (
                    core.coreAbilitySeq == ability.abilitySeq &&
                    core.coreChildAbilitySeq == ability.childSeq
                  ) {
                    value = core.rate;
                  }
                });
              }

              listResponse.push({
                colLeft1: `${mapping.gradeNm?.replace(
                  "학년",
                  ""
                )} - ${mapping.termNm?.replace("학기", "")}`,
                colLeft2: sbjt.sbjtNm,
                colLeft3: sbjt.cateComplete,
                col1: col1,
                col2: ability.abilityNm,
                col3: ability.childNm,
                row: `${indexMapping}_${index}`,
                value: value,
              });
            });
          });
        });

        this.datasetListRp.getMappingSubject = listResponse;
      });
    },
    async getAssignSubject() {
      await getSubMngSameReplaceMapping({
        eduCourseSeq: this.data.eduCursSeq,
      }).then((res) => {
        const { listSameReplaceMapping } = res.data.data;

        const listSameReplaceDivCd = this.listCodeResponse.filter(
          (item) => item.upCdId == UP_CD_ID_SAME_REPLACE_DIV_CD
        );
        const listRsnFstCd = this.listCodeResponse.filter(
          (item) => item.upCdId == UP_CD_ID_RSN_FST_CD
        );
        const listRsnSecCd = this.listCodeResponse.filter(
          (item) => item.upCdId == UP_CD_ID_RSN_SEC_CD
        );

        this.datasetListRp.assignSubject = listSameReplaceMapping.map(
          (item: SubMngSameReplaceMappingModel) => {
            return {
              rowNum: item.rowNum,
              sbjtBeforeCd: item.sbjtBeforeCd,
              yearBefore: `${item.gradeBeforeNm?.replace(
                "학년",
                ""
              )} - ${item.termBeforeNm?.replace("학기", "")}`,
              sustDivBeforeNm: item.sustDivBeforeNm,
              sbjtBeforeNm: item.sbjtBeforeNm,
              sbjtBeforeNmEng: item.sbjtBeforeNmEng,
              acqGpaBefore: item.acqGpaBefore,
              thryHrsBefore: item.thryHrsBefore,
              pracHrsBefore: item.pracHrsBefore,
              sbjtAfterCd: item.sbjtAfterCd,
              yearAfter: `${item.gradeAfterNm?.replace(
                "학년",
                ""
              )} - ${item.termAfterNm?.replace("학기", "")}`,
              sustDivAfterNm: item.sustDivAfterNm,
              sbjtAfterNm: item.sbjtAfterNm,
              sbjtAfterNmEng: item.sbjtAfterNmEng,
              acqGpaAfter: item.acqGpaAfter,
              thryHrsAfter: item.thryHrsAfter,
              pracHrsAfter: item.pracHrsAfter,
              sameReplaceDivCd: listSameReplaceDivCd.filter(
                (code) => code.cdId == item.sameReplaceDivCd
              )[0].cdNm,
              rsnFstCd: listRsnFstCd.filter(
                (code) => code.cdId == item.rsnFstCd
              )[0].cdNm,
              rsnSecCd: listRsnSecCd.filter(
                (code) => code.cdId == item.rsnSecCd
              )[0].cdNm,
            };
          }
        );
      });
    },
    async getSubjectProfille() {
      const dataSearch = {
        eduCourseSeq: this.data.eduCursSeq,
        sbjtCd: "",
        page: 1,
        size: 10000000,
        sort: "",
      };
      await getPageSubjectProfile(dataSearch).then((res: any) => {
        this.datasetListRp.subjectProfile = res.data.data.content.map(
          (item: SubjectProfileResDTO) => {
            item.totalHrs = `${item.totalHrs ? item.totalHrs : 0}(${
              item.thryHrs ? item.thryHrs : 0
            }/${item.pracHrs ? item.pracHrs : 0})`;

            item.statusNm = this.datasetListRp.assignSubject.some(
              (assSbjt: any) =>
                assSbjt.sbjtBeforeCd == item.sbjtCd ||
                assSbjt.sbjtAfterCd == item.sbjtCd
            )
              ? "신설"
              : "유지";

            return item;
          }
        ) as SubjectProfileResDTO[];
      });
    },
    async getLinkRoadMap() {
      await getLinkRoadMap({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res) => {
          this.datasetListRp.linkRoadMap = res.data.data.map((item: any) => {
            item.isNcs = item.typeCd == KCS_CD_ID ? "" : "🔴";
            item.isKcs = item.typeCd == KCS_CD_ID ? "🔴" : "";
            item.year = `${item.gradeNm?.replace(
              "학년",
              ""
            )} - ${item.termNm?.replace("학기", "")}`;

            return item;
          });
        }
      );
    },
    async getOverviewRoadMap() {
      type OverviewRoadMapType = {
        colLeft: string;
        col1: string;
        col2: string;
        row: string;
        value: string;
      };

      const listSemester = this.listCodeResponse.filter(
        (item: CodeMngModel) => item.upCdId == UP_CD_ID_SEMESTER
      );
      const listGrade = this.listCodeResponse.filter(
        (item: CodeMngModel) => item.upCdId == UP_CD_ID_GRADE_LEVEL
      );
      let dataYear = [] as CodeMngModel[];
      listSemester.forEach((semester: CodeMngModel) => {
        listGrade.forEach((grade: CodeMngModel) => {
          dataYear.push({
            cdId: `${semester.cdId} - ${grade.cdId}`,
            cdNm: `${semester.cdNm} - ${grade.cdNm}`,
            upCdId: `semester - grade`,
          });
        });
      });
      dataYear.sort((a, b) => {
        return `${a.cdId}`.localeCompare(`${b.cdId}`);
      });

      await getOverviewRoadMap({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res) => {
          const dataCurriculum = res.data.data.listCurriculum as CodeMngModel[];
          const dataOverview = res.data.data
            .listOverview as OverviewSubjectDTO[];

          let dataResponse = [] as OverviewRoadMapType[];
          dataOverview.forEach((overview, index) => {
            dataYear.forEach((year) => {
              dataResponse.push({
                colLeft: overview.sbjtNm,
                col1: "  학년-학기  ",
                col2: `${year.cdNm}`,
                row: `${index}`,
                value:
                  `${overview.termCd} - ${overview.gradeCd}` == year.cdId
                    ? "●"
                    : "",
              });
            });
            dataCurriculum.forEach((item) => {
              dataResponse.push({
                colLeft: overview.sbjtNm,
                col1: `${item.cdNm}`,
                col2: `${item.cdNm}`,
                row: `${index}`,
                value: overview.select.some((sel) => sel.selCd == item.cdId)
                  ? "●"
                  : "",
              });
            });
          });

          this.datasetListRp.overviewRoadMap1 = dataResponse;
        }
      );
    },
    async getRoadmapEduProcess() {
      type RoadmapEduProcessHeader = {
        col: string;
        row: string;
        value: string;
      };
      type RoadmapEduProcess = {
        col: string;
        row: string;
        row1: string;
        value: string;
      };
      await getRoadMapEduProcess({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res) => {
          const response = res.data.data as RoadMapEduProcessDTO;
          let dataHeader = [] as RoadmapEduProcessHeader[];
          let dataContent = [] as RoadmapEduProcess[];
          response.taltNrtgType.forEach((talt, indexTalt) => {
            talt.job.forEach((job, indexJob) => {
              dataHeader.push({
                col: `${indexTalt}_${indexJob}`,
                row: "교육과정",
                value: response.eduCourseNm,
              });
              dataHeader.push({
                col: `${indexTalt}_${indexJob}`,
                row: "인재양성유형",
                value: talt.name,
              });
              dataHeader.push({
                col: `${indexTalt}_${indexJob}`,
                row: "핵심직무",
                value: job.name,
              });
            });
          });
          const listTypeSbjt = this.listCodeResponse.filter(
            (item) => item.upCdId == UP_CD_TRACK
          );
          const listGrade = this.listCodeResponse.filter(
            (item) => item.upCdId == UP_CD_ID_GRADE_LEVEL
          );
          const listTerm = this.listCodeResponse.filter(
            (item) => item.upCdId == UP_CD_ID_SEMESTER
          );
          listTypeSbjt.forEach((typeSbjt) => {
            listGrade.forEach((grade) => {
              listTerm.forEach((term) => {
                response.taltNrtgType.forEach((talt, indexTalt) => {
                  talt.job.forEach((job, indexJob) => {
                    dataContent.push({
                      col: `${indexTalt}_${indexJob}`,
                      row: `${(grade.cdNm as string).replace("학년", "")} - ${(
                        term.cdNm as string
                      ).replace("학기", "")}`,
                      row1: `${typeSbjt.cdNm}`,
                      value: this.filterSubject(
                        job,
                        typeSbjt.cdId,
                        term.cdId,
                        grade.cdId
                      ),
                    });
                  });
                });
              });
            });
          });
          this.datasetListRp.roadmapEduProcessHeader = dataHeader;
          this.datasetListRp.roadmapEduProcess = dataContent;
        }
      );
    },
    async getSyntheticRoadMapExport() {
      await getSyntheticRoadMap({ eduCourseSeq: this.data.eduCursSeq }).then(
        (res) => {
          let response = res.data.data;

          response.targetNm = this.convertDataNmToString(response.targetDept);
          response.typeDeptNm = this.convertDataNmToString(response.typeDept);
          // TABLE 1
          this.datasetListRp.syntheticRoadMap1 = [
            {
              deptNm: response.deptNm,
              typeDeptNm: response.typeDeptNm,
              targetNm: response.targetNm,
            },
          ];

          // TABLE 2
          this.datasetListRp.syntheticRoadMap2 = [
            {
              taltNrtgTypeNm: "인재양성유형",
              jobCont: "주요직무내용",
              vision: "관련 분야 비전",
              type: "HEADER",
            },
          ];
          response.listTaltNrtgSelc.forEach(
            (taltNrtg: RoadmapTaltNrtgSelcModel) => {
              this.datasetListRp.syntheticRoadMap2.push({
                taltNrtgTypeNm: taltNrtg.taltNrtgTypeNm,
                jobCont: taltNrtg.jobCont,
                vision: taltNrtg.vision,
                type: "ITEM",
              });
            }
          );

          // TABLE 3
          this.datasetListRp.syntheticRoadMap3 = [
            {
              coreAbility: "핵심역량",
              childAbility: "하위역량",
              type: "HEADER",
            },
          ];
          response.listCoreAbility.forEach(
            (coreAbility: RoadMapAbilityListModel) => {
              coreAbility.listChild.forEach(
                (childAbility: RoadMapAbilityListModel) => {
                  this.datasetListRp.syntheticRoadMap3.push({
                    coreAbility: coreAbility.abilityNm,
                    childAbility: childAbility.abilityNm,
                    type: "ITEM",
                  });
                }
              );
            }
          );
          this.datasetListRp.syntheticRoadMap3.push({
            coreAbility: "직무역량",
            childAbility: "하위역량",
            type: "HEADER",
          });
          response.listJobAbility.forEach(
            (jobAbility: RoadMapAbilityListModel) => {
              jobAbility.listChild.forEach(
                (childAbility: RoadMapAbilityListModel) => {
                  this.datasetListRp.syntheticRoadMap3.push({
                    coreAbility: jobAbility.abilityNm,
                    childAbility: childAbility.abilityNm,
                    type: "ITEM",
                  });
                }
              );
            }
          );

          // TABLE 4
          this.datasetListRp.syntheticRoadMap4 = [
            {
              jobNm: "직무",
              cert: "관련 자격증",
              type: "HEADER",
            },
          ];
          response.relatedCertificate.forEach(
            (item: RelatedCertificateResDTO) => {
              this.datasetListRp.syntheticRoadMap4.push({
                jobNm: item.jobNm,
                cert: item.cert,
                type: "ITEM",
              });
            }
          );

          // TABLE 5
          this.datasetListRp.syntheticRoadMap5 = [
            {
              typeNm: "인재양성유형",
              career: "졸업 후 진로",
              type: "HEADER",
            },
          ];
          response.graduationRoadmap.forEach(
            (item: GraduationRoadmapResDTO) => {
              this.datasetListRp.syntheticRoadMap5.push({
                typeNm: item.typeNm,
                career: item.career,
                type: "ITEM",
              });
            }
          );
        }
      );
    },

    async cloneData() {
      await this.getListCodeEduCourse();
      await this.getDetailEduCourse();
      await this.getAnalysisAchievementReport();
      await this.getAnalysisResultCqi();
      await this.getEnvironmentInternal();
      await this.getEvironmentOutside();
      await this.getEvironmentAttention();
      await this.getEvironmentImprove();
      await this.getEduCompositionTalent();
      await this.getCreatedTypeTalent();
      await this.getSetGoalTalent();
      await this.getSelectionTalent();
      await this.getResultTypeTalent();
      await this.getTechniqueEdu();
      await this.getVerifyJob();
      await this.getVerifyCapaChld();
      await this.getCreatedSubject();
      await this.getMappingSubject();
      await this.getAssignSubject();
      await this.getSubjectProfille();
      await this.getLinkRoadMap();
      await this.getOverviewRoadMap();
      await this.getRoadmapEduProcess();
      await this.getSyntheticRoadMapExport();
    },
    convertData() {
      this.datasetListRp.eduCourseDetail = JSON.stringify(
        this.datasetListRp.eduCourseDetail
      );
      this.datasetListRp.analysisAchievementHeader = JSON.stringify(
        this.datasetListRp.analysisAchievementHeader
      );
      this.datasetListRp.analysisAchievementContent = JSON.stringify(
        this.datasetListRp.analysisAchievementContent
      );
      this.datasetListRp.analysisAchievementFooter = JSON.stringify(
        this.datasetListRp.analysisAchievementFooter
      );
      this.datasetListRp.analysisEvalStnrd = JSON.stringify(
        this.datasetListRp.analysisEvalStnrd
      );
      this.datasetListRp.operationDevelopmentPlan = JSON.stringify(
        this.datasetListRp.operationDevelopmentPlan
      );
      this.datasetListRp.environmentInternal = JSON.stringify(
        this.datasetListRp.environmentInternal
      );
      this.datasetListRp.environmentOutside = JSON.stringify(
        this.datasetListRp.environmentOutside
      );
      this.datasetListRp.environmentAttention = JSON.stringify(
        this.datasetListRp.environmentAttention
      );
      this.datasetListRp.environmentImprove = JSON.stringify(
        this.datasetListRp.environmentImprove
      );
      this.datasetListRp.compositionTalent = JSON.stringify(
        this.datasetListRp.compositionTalent
      );
      this.datasetListRp.createdTypeTalent = JSON.stringify(
        this.datasetListRp.createdTypeTalent
      );
      this.datasetListRp.setGoalTalentTable1 = JSON.stringify(
        this.datasetListRp.setGoalTalentTable1
      );
      this.datasetListRp.setGoalTalentTable2 = JSON.stringify(
        this.datasetListRp.setGoalTalentTable2
      );
      this.datasetListRp.setGoalTalentTable3 = JSON.stringify(
        this.datasetListRp.setGoalTalentTable3
      );
      this.datasetListRp.resultTypeTalent = JSON.stringify(
        this.datasetListRp.resultTypeTalent
      );
      this.datasetListRp.techniqueEdu = JSON.stringify(
        this.datasetListRp.techniqueEdu
      );
      this.datasetListRp.verifyJob = JSON.stringify(
        this.datasetListRp.verifyJob
      );
      this.datasetListRp.verifyJob2 = JSON.stringify(
        this.datasetListRp.verifyJob2
      );
      this.datasetListRp.verifyCapaChld = JSON.stringify(
        this.datasetListRp.verifyCapaChld
      );
      this.datasetListRp.createSubject = JSON.stringify(
        this.datasetListRp.createSubject
      );
      this.datasetListRp.assignSubject = JSON.stringify(
        this.datasetListRp.assignSubject
      );
      this.datasetListRp.subjectProfile = JSON.stringify(
        this.datasetListRp.subjectProfile
      );
      this.datasetListRp.linkRoadMap = JSON.stringify(
        this.datasetListRp.linkRoadMap
      );
      this.datasetListRp.getSelectionTalent = JSON.stringify(
        this.datasetListRp.getSelectionTalent
      );
      this.datasetListRp.getMappingSubject = JSON.stringify(
        this.datasetListRp.getMappingSubject
      );
      this.datasetListRp.overviewRoadMap1 = JSON.stringify(
        this.datasetListRp.overviewRoadMap1
      );
      this.datasetListRp.roadmapEduProcessHeader = JSON.stringify(
        this.datasetListRp.roadmapEduProcessHeader
      );
      this.datasetListRp.roadmapEduProcess = JSON.stringify(
        this.datasetListRp.roadmapEduProcess
      );
      this.datasetListRp.syntheticRoadMap1 = JSON.stringify(
        this.datasetListRp.syntheticRoadMap1
      );
      this.datasetListRp.syntheticRoadMap2 = JSON.stringify(
        this.datasetListRp.syntheticRoadMap2
      );
      this.datasetListRp.syntheticRoadMap3 = JSON.stringify(
        this.datasetListRp.syntheticRoadMap3
      );
      this.datasetListRp.syntheticRoadMap4 = JSON.stringify(
        this.datasetListRp.syntheticRoadMap4
      );
      this.datasetListRp.syntheticRoadMap5 = JSON.stringify(
        this.datasetListRp.syntheticRoadMap5
      );
    },
    async print() {
      this.storeCommon.setLoading(true);

      await this.cloneData();

      await this.convertData();

      await this.storeCommon.fn_viewer_open(
        this.nameFormRp,
        this.datasetListRp,
        this.paramListRp
      );
      this.storeCommon.setLoading(false);
    },
    convertRowNum(number: number) {
      const koreanLetters = ["가", "나", "다", "라"];
      if (number >= 1 && number <= 4) {
        return koreanLetters[number - 1];
      }
      return "";
    },
    totalScoreAnalysis(listSbjt: number[]) {
      return listSbjt.reduce((sum, sbjt) => sum + sbjt, 0);
    },
    getAvgScore(scores: string[]) {
      const sum = scores.reduce((acc, score) => acc + parseFloat(score), 0);
      const avgScore = sum / scores.length;
      return parseFloat(avgScore ? avgScore.toFixed(3) : "0");
    },
    filterSubject(
      jobData: any,
      trackType: string | number,
      termCd: string | number,
      gradeCd: string | number
    ) {
      return jobData.subject
        .filter(
          (item: any) =>
            item.trackType.includes(trackType) &&
            item.termCd == termCd &&
            item.gradeCd == gradeCd
        )
        .map((item: any) => item.subjectNm)
        .join(", ");
    },
    convertDataNmToString(data: EduCourseSelResDTO[]): string {
      return data.map((item) => item.refrNm).join("\n");
    },
  },
};
</script>
