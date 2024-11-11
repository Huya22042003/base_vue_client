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
  STATUS_YES,
  UP_CD_EDU_21,
  UP_CD_EDU_22,
  UP_CD_EDU_23,
  UP_CD_EDU_24,
  UP_CD_EDUT_21,
  UP_CD_EDUT_22,
  UP_CD_EDUT_23,
  UP_CD_ID_121901,
  UP_CD_ID_RSN_FST_CD,
  UP_CD_ID_RSN_SEC_CD,
  UP_CD_ID_SAME_REPLACE_DIV_CD,
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
import { getCreateSubject, getSubMngMappingSubject, getSubMngSameReplaceMapping } from "@/stores/eduProcessCreation/subjectMng/subjectMng.service";
import { CreateSubjectResDTO, SubMngSameReplaceMappingModel } from "@/stores/eduProcessCreation/subjectMng/subjectMng.type";
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
        upCdIdList: [UP_RESULT_SEL, UP_CD_ID_SAME_REPLACE_DIV_CD, UP_CD_ID_RSN_FST_CD, UP_CD_ID_RSN_SEC_CD],
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
              deptNm: response.deptNm,
              year: response.year,
              startDate: response.startDate,
              endDate: response.endDate,
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
                term: `${term.gradeNm} - ${term.termNm}`,
                sbjtNm: sbjt.sbjtNm,
                acqGpa: sbjt.acqGpa,
                thryHrs: sbjt.thryHrs,
                pracHrs: sbjt.pracHrs,
                kcsYn: sbjt.kcsYn === STATUS_YES ? "●" : "",
                ncsYn: sbjt.ncsYn === STATUS_YES ? "●" : "",
              });
            });
            this.datasetListRp.analysisAchievementContent.push({
              term: `${term.gradeNm} - ${term.termNm}`,
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
      await getAllEduCourseComm({ eduCourseSeq: this.data.eduCursSeq })
        .then((res: any) => {
          const response = res.data.data as EduCourseCommResDTO[];

          this.datasetListRp.environmentImprove = response.map((item) => {
            item.divCd = item.divCd == CD_INTERNAL ? "내부" : "외부";
            return item;
          });
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
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
              evalPartiCnt: response.evalPartiCnt,
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
          // TODO: core job select
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
      await getCreateSubject({eduCourseSeq:this.data.eduCursSeq}).then((res: any) => {
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
                  jobCapaNm: jobCapa.cdNm
                })
              })
            })
          })
        })
      });
    },
    async getMappingSubject() {
      getSubMngMappingSubject({eduCourseSeq: this.data.eduCursSeq}).then((res) => {
        const {
          listCoreAbility,
          listChildAbility,
          listMappingSubject,
          saveType,
        } = res.data.data;

        // TODO
        console.log(res.data.data);
        

        this.storeCommon.setLoading(false);
      });
    },
    async getAssignSubject() {
      getSubMngSameReplaceMapping({eduCourseSeq: this.data.eduCursSeq}).then((res) => {
        const { listSameReplaceMapping } = res.data.data;

        const listSameReplaceDivCd = this.listCodeResponse.filter(item => item.upCdId == UP_CD_ID_SAME_REPLACE_DIV_CD);
        const listRsnFstCd = this.listCodeResponse.filter(item => item.upCdId == UP_CD_ID_RSN_FST_CD);
        const listRsnSecCd = this.listCodeResponse.filter(item => item.upCdId == UP_CD_ID_RSN_SEC_CD);

        
        this.datasetListRp.assignSubject = listSameReplaceMapping.map((item:SubMngSameReplaceMappingModel) => {
          return {
            rowNum: item.rowNum,
            sbjtBeforeCd: item.sbjtBeforeCd,
            yearBefore: `${item.gradeBeforeNm?.replace("학년","")} - ${item.termBeforeNm?.replace("학기","")}`,
            sustDivBeforeNm: item.sustDivBeforeNm,
            sbjtBeforeNm: item.sbjtBeforeNm,
            sbjtBeforeNmEng: item.sbjtBeforeNmEng,
            acqGpaBefore: item.acqGpaBefore,
            thryHrsBefore: item.thryHrsBefore,
            pracHrsBefore: item.pracHrsBefore,
            sbjtAfterCd: item.sbjtAfterCd,
            yearAfter: `${item.gradeAfterNm?.replace("학년","")} - ${item.termAfterNm?.replace("학기","")}`,
            sustDivAfterNm: item.sustDivAfterNm,
            sbjtAfterNm: item.sbjtAfterNm,
            sbjtAfterNmEng: item.sbjtAfterNmEng,
            acqGpaAfter: item.acqGpaAfter,
            thryHrsAfter: item.thryHrsAfter,
            pracHrsAfter: item.pracHrsAfter,
            sameReplaceDivCd: listSameReplaceDivCd.filter((code) => code.cdId == item.sameReplaceDivCd)[0].cdNm,
            rsnFstCd: listRsnFstCd.filter((code) => code.cdId == item.rsnFstCd)[0].cdNm,
            rsnSecCd: listRsnSecCd.filter((code) => code.cdId == item.rsnSecCd)[0].cdNm
          }
        });
        
      });
    },

    async cloneData() {
      await this.getListCodeEduCourse();
      // await this.getDetailEduCourse();
      // await this.getAnalysisAchievementReport();
      // await this.getAnalysisResultCqi();
      // await this.getEnvironmentInternal();
      // await this.getEvironmentOutside();
      // await this.getEvironmentAttention();
      // await this.getEvironmentImprove();
      // await this.getEduCompositionTalent();
      // await this.getCreatedTypeTalent();
      // await this.getSetGoalTalent();
      // await this.getResultTypeTalent();
      // await this.getTechniqueEdu();
      // await this.getVerifyJob();
      // await this.getVerifyCapaChld();
      // await this.getCreatedSubject();
      // await this.getMappingSubject();
      await this.getAssignSubject();
    },
    async print() {
      this.storeCommon.setLoading(true);

      await this.cloneData();

      console.log(this.datasetListRp);

      // this.datasetListRp.eduCourseDetail = JSON.stringify(
      //   this.datasetListRp.eduCourseDetail
      // );

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
  },
};
</script>
