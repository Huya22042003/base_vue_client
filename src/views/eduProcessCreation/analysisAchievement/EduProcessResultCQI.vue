<template>
  <div class="box_section mt-5">
    <!-- Block 1 -->
    <div class="box_section">
      <p class="box_title_sm">
        <!-- 1.교육과정 개발 -->{{
          t("eduProcessCreation.analysisAchievement.title16")
        }}
      </p>
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 12%" />
            <col style="width: 20%" />
            <col style="width: 7%" />
            <col style="width: 16%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가항목 -->{{
                  t("eduProcessCreation.analysisAchievement.title17")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가내용 -->{{
                  t("eduProcessCreation.analysisAchievement.title18")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 점수 -->{{
                  t("eduProcessCreation.analysisAchievement.title19")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가결과 -->{{
                  t("eduProcessCreation.analysisAchievement.title20")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 개선방안 -->{{
                  t("eduProcessCreation.analysisAchievement.title21")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 달성시기 -->{{
                  t("eduProcessCreation.analysisAchievement.title22")
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="evalItem in listEvalStnrd?.slice(0, 2)"
              :key="evalItem.evalItemCd"
            >
              <template
                v-for="(
                  evalStnrd, indexEvalStnrd
                ) in evalItem.listEvalStnrdCont"
                :key="evalStnrd.evalStnrdSeq"
              >
                <tr>
                  <th
                    :rowspan="evalItem.listEvalStnrdCont.length"
                    v-if="indexEvalStnrd === 0"
                  >
                    {{ evalItem.evalItemNm }}
                  </th>
                  <th>{{ evalStnrd.cont ? evalStnrd.cont : dataIsEmpty }}</th>
                  <th>{{ evalStnrd.score ? evalStnrd.score : dataIsEmpty }}</th>
                  <th>{{ evalStnrd.rslt ? evalStnrd.rslt : dataIsEmpty }}</th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.impr ? evalItem.impr : dataIsEmpty }}
                  </th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.goal ? evalItem.goal : dataIsEmpty }}
                  </th>
                </tr>
              </template>
            </template>
            <tr>
              <th scope="row" colspan="2" class="td_custom_color">
                {{ t("majorTab2.table1.average") }}
              </th>
              <th scope="row" colspan="4" class="td_custom_color">
                {{ calculateAverageScore(listEvalStnrd.slice(0, 2)) }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Block 2 -->
    <div class="box_section mt-10">
      <p class="box_title_sm">
        <!-- 2.교육과정 운영 -->{{
          t("eduProcessCreation.analysisAchievement.title23")
        }}
      </p>
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 12%" />
            <col style="width: 20%" />
            <col style="width: 7%" />
            <col style="width: 16%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가항목 -->{{
                  t("eduProcessCreation.analysisAchievement.title17")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가내용 -->{{
                  t("eduProcessCreation.analysisAchievement.title18")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 점수 -->{{
                  t("eduProcessCreation.analysisAchievement.title19")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가결과 -->{{
                  t("eduProcessCreation.analysisAchievement.title20")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 개선방안 -->{{
                  t("eduProcessCreation.analysisAchievement.title21")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 달성시기 -->{{
                  t("eduProcessCreation.analysisAchievement.title22")
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="evalItem in listEvalStnrd?.slice(2, 3)"
              :key="evalItem.evalItemCd"
            >
              <template
                v-for="(
                  evalStnrd, indexEvalStnrd
                ) in evalItem.listEvalStnrdCont"
                :key="evalStnrd.evalStnrdSeq"
              >
                <tr>
                  <th
                    :rowspan="evalItem.listEvalStnrdCont.length"
                    v-if="indexEvalStnrd === 0"
                  >
                    {{ evalItem.evalItemNm }}
                  </th>
                  <th>{{ evalStnrd.cont ? evalStnrd.cont : dataIsEmpty }}</th>
                  <th>{{ evalStnrd.score ? evalStnrd.score : dataIsEmpty }}</th>
                  <th>{{ evalStnrd.rslt ? evalStnrd.rslt : dataIsEmpty }}</th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.impr ? evalItem.impr : dataIsEmpty }}
                  </th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.goal ? evalItem.goal : dataIsEmpty }}
                  </th>
                </tr>
              </template>
            </template>
            <tr>
              <th scope="row" colspan="2" class="td_custom_color">
                {{ t("majorTab2.table1.average") }}
              </th>
              <th scope="row" colspan="4" class="td_custom_color">
                {{ calculateAverageScore(listEvalStnrd.slice(2, 3)) }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Block 3 -->
    <div class="box_section mt-10">
      <p class="box_title_sm">
        <!-- 3.교육과정 지원 -->{{
          t("eduProcessCreation.analysisAchievement.title24")
        }}
      </p>
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 12%" />
            <col style="width: 20%" />
            <col style="width: 7%" />
            <col style="width: 16%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가항목 -->{{
                  t("eduProcessCreation.analysisAchievement.title17")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가내용 -->{{
                  t("eduProcessCreation.analysisAchievement.title18")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 점수 -->{{
                  t("eduProcessCreation.analysisAchievement.title19")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가결과 -->{{
                  t("eduProcessCreation.analysisAchievement.title20")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 개선방안 -->{{
                  t("eduProcessCreation.analysisAchievement.title21")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 달성시기 -->{{
                  t("eduProcessCreation.analysisAchievement.title22")
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="evalItem in listEvalStnrd?.slice(3, 5)"
              :key="evalItem.evalItemCd"
            >
              <template
                v-for="(
                  evalStnrd, indexEvalStnrd
                ) in evalItem.listEvalStnrdCont"
                :key="evalStnrd.evalStnrdSeq"
              >
                <tr>
                  <th
                    :rowspan="evalItem.listEvalStnrdCont.length"
                    v-if="indexEvalStnrd === 0"
                  >
                    {{ evalItem.evalItemNm }}
                  </th>
                  <th>{{ evalStnrd.cont ? evalStnrd.cont : dataIsEmpty }}</th>
                  <th>{{ evalStnrd.score ? evalStnrd.score : dataIsEmpty }}</th>
                  <th>{{ evalStnrd.rslt ? evalStnrd.rslt : dataIsEmpty }}</th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.impr ? evalItem.impr : dataIsEmpty }}
                  </th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.goal ? evalItem.goal : dataIsEmpty }}
                  </th>
                </tr>
              </template>
            </template>
            <tr>
              <th scope="row" colspan="2" class="td_custom_color">
                {{ t("majorTab2.table1.average") }}
              </th>
              <th scope="row" colspan="4" class="td_custom_color">
                {{ calculateAverageScore(listEvalStnrd.slice(3, 5)) }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Block 4 -->
    <div class="box_section mt-10">
      <p class="box_title_sm">
        <!-- 4.교육과정 성과 및 개선 -->{{
          t("eduProcessCreation.analysisAchievement.title25")
        }}
      </p>
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 12%" />
            <col style="width: 20%" />
            <col style="width: 7%" />
            <col style="width: 16%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가항목 -->{{
                  t("eduProcessCreation.analysisAchievement.title17")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가내용 -->{{
                  t("eduProcessCreation.analysisAchievement.title18")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 점수 -->{{
                  t("eduProcessCreation.analysisAchievement.title19")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평가결과 -->{{
                  t("eduProcessCreation.analysisAchievement.title20")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 개선방안 -->{{
                  t("eduProcessCreation.analysisAchievement.title21")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 달성시기 -->{{
                  t("eduProcessCreation.analysisAchievement.title22")
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="evalItem in listEvalStnrd?.slice(5, 7)"
              :key="evalItem.evalItemCd"
            >
              <template
                v-for="(
                  evalStnrd, indexEvalStnrd
                ) in evalItem.listEvalStnrdCont"
                :key="evalStnrd.evalStnrdSeq"
              >
                <tr>
                  <th
                    :rowspan="evalItem.listEvalStnrdCont.length"
                    v-if="indexEvalStnrd === 0"
                  >
                    {{ evalItem.evalItemNm }}
                  </th>
                  <th>{{ evalStnrd.cont ? evalStnrd.cont : dataIsEmpty }}</th>
                  <th>{{ evalStnrd.score ? evalStnrd.score : dataIsEmpty }}</th>
                  <th>{{ evalStnrd.rslt ? evalStnrd.rslt : dataIsEmpty }}</th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.impr ? evalItem.impr : dataIsEmpty }}
                  </th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.goal ? evalItem.goal : dataIsEmpty }}
                  </th>
                </tr>
              </template>
            </template>
            <tr>
              <th scope="row" colspan="2" class="td_custom_color">
                {{ t("majorTab2.table1.average") }}
              </th>
              <th scope="row" colspan="4" class="td_custom_color">
                {{ calculateAverageScore(listEvalStnrd.slice(5, 7)) }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Block 5 -->
    <div class="box_section mt-10">
      <p class="box_title_sm">
        <!-- 5.차년도 교육과정 개발 및 운영 중점계획 도출 -->{{
          t("eduProcessCreation.analysisAchievement.title26")
        }}
      </p>
      <div class="tbl tbl_col">
        <table>
          <tbody>
            <tr>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                <!-- 구분 -->{{
                  t("eduProcessCreation.analysisAchievement.title27")
                }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                <!-- 중점계획 -->{{
                  t("eduProcessCreation.analysisAchievement.title28")
                }}
              </th>
            </tr>
            <!-- Row1 -->
            <template
              v-for="(operation, index) in operationDevelopmentPlanListModel"
              :key="index"
            >
              <tr>
                <td scope="row" :colspan="1" class="td_custom_color">
                  {{ operation.dataNm }}
                </td>
                <th scope="row" :colspan="1">
                  <TextArea
                    :id="'operation' + index"
                    required
                    v-model="operation.cont"
                    rows="5"
                  ></TextArea>
                </th>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div class="btn_group btn_end mg_t30">
      <div class="btn_group btn_end">
        <button type="button" class="btn_lg btn_round btn_gray" @click="print()">
          <!-- 1.전년도 교육과정 운영 실적 분석 인쇄 -->{{
            t("eduProcessCreation.analysisAchievement.title31")
          }}
        </button>
        <!-- <button
          v-if="isSave"
          type="button"
          class="btn_lg btn_round btn_primary"
          @click="confirmSaveData()"
        >
          {{ t("common.save") }}
        </button> -->
        <ButtonBase
          v-if="isSave"
          type="button"
          class="btn_lg btn_round btn_primary"
          :buttonName="t('common.save')"
          @click="confirmSaveData()"
        ></ButtonBase>
        <button
          type="button"
          class="btn_lg btn_round btn_primary"
          @click="next()"
          :disabled="isDisabled"
        >
          {{ t("common.next") }}
        </button>
        <button
          type="button"
          class="btn_lg btn_round btn_white"
          @click="back()"
        >
          {{ t("common.list") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { commonStore } from "@/stores/common";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { SCREEN } from "@/router/screen";
import {
  AnalysisAchievementModel,
  AnalysisEvalStnrdReqModel,
  OperationDevelopmentPlanListModel,
  OperationDevelopmentPlanReqModel,
  OperationDevelopmentPlanSaveModel,
} from "@/stores/eduProcessCreation/analysisAchievement/analysisAchievement.type";
import { CD_EDU12, STATUS_YES, UP_CD_ID_121901 } from "@/constants/common.const";
import {
  getAnalysisAchievement,
  getListEduCourseCqiEvalStnrd,
  getOperationDevelopmentPlanList,
  saveOperationDevelopmentPlanList,
} from "@/stores/eduProcessCreation/analysisAchievement/analysisAchievement.service";
import { EduCourseCqiEvalStnrdModel } from "@/stores/cqiTrainingProcess/selfAssessmentResult/selfAssessmentResult.type";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const isSave = window.history.state.isSave;

    return { router, storeCommon, t, id, isSave };
  },
  data() {
    return {
      operationDevelopmentPlanListModel:
        [] as Array<OperationDevelopmentPlanListModel>,
      operationDevelopmentPlanReqModel: {} as OperationDevelopmentPlanReqModel,
      operationDevelopmentPlanSaveModel:
        {} as OperationDevelopmentPlanSaveModel,
      isDisabled: true,
      analysisEvalStnrdReqModel: {} as AnalysisEvalStnrdReqModel,
      listEvalStnrd: [] as Array<EduCourseCqiEvalStnrdModel>,
      dataIsEmpty: '데이터가 없습니다.',
      nameFormRp: "07_01_analysis_achievement",
      datasetListRp: {} as any,
      paramListRp: {} as any,
    };
  },
  beforeMount() {
    this.operationDevelopmentPlanReqModel.eduCourseSeq = this.id;
    this.operationDevelopmentPlanReqModel.upCdId = CD_EDU12;

    this.operationDevelopmentPlanSaveModel.eduCourseSeq = this.id;
    this.analysisEvalStnrdReqModel.eduCourseSeq = this.id;
    this.analysisEvalStnrdReqModel.evalItemCd = UP_CD_ID_121901;

    this.getDataOperation();
    this.getDataAnalysisEvalStrnd();
  },
  methods: {
    calculateAverageScore(evalItems: Array<EduCourseCqiEvalStnrdModel>) {
      let totalScore = 0;
      let totalCount = 0;

      evalItems.forEach((evalItem) => {
        evalItem.listEvalStnrdCont.forEach((evalStnrd) => {
          if (evalStnrd.score !== undefined) {
            totalScore += evalStnrd.score;
            totalCount++;
          }
        });
      });

      return totalCount > 0 ? (totalScore / totalCount).toFixed(2) : 0;
    },
    getDataOperation() {
      getOperationDevelopmentPlanList(
        this.operationDevelopmentPlanReqModel
      ).then((res) => {
        this.operationDevelopmentPlanListModel = res.data.data;
        if (
          this.operationDevelopmentPlanListModel.length > 0 &&
          this.operationDevelopmentPlanListModel[0].dataSeq
        ) {
          this.isDisabled = false;
        }
      });
    },
    confirmSaveData() {
      if (this.storeCommon.check) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }
      this.$confirm(this.t("common.message.save"), "", (isConfirm: Boolean) => {
        if (isConfirm) {
          this.saveOperationDevelopment();
        }
      });
    },
    saveOperationDevelopment() {
      this.storeCommon.setLoading(true);
      this.operationDevelopmentPlanSaveModel.listOperationDevelopmentPlan =
        this.operationDevelopmentPlanListModel;
      saveOperationDevelopmentPlanList(
        this.operationDevelopmentPlanSaveModel
      ).then((res) => {
        this.storeCommon.setLoading(false);
        this.$confirm(
          this.t("common.messageSuccessNextTab"),
          "",
          (isConfirm: Boolean) => {
            if (isConfirm) {
              this.next();
            }
            if (this.isDisabled) {
              this.$emit("updateStage", 21);
            }
            this.isDisabled = false;
          }
        );
      });
    },
    getDataAnalysisEvalStrnd() {
      this.storeCommon.setLoading(true);
      getListEduCourseCqiEvalStnrd(this.analysisEvalStnrdReqModel).then(
        (res) => {
          this.listEvalStnrd = res.data.data;
          this.storeCommon.setLoading(false);
        }
      );
    },
    next() {
      this.$emit("nextTab", 20);
    },
    back() {
      this.router.push({
        path: SCREEN.eduProcessCreation.path,
      });
    },
    async cloneData() {
      await this.getAnalysisAchievementReport();
      await this.getAnalysisResultCqi();
    },
    async getAnalysisAchievementReport() {
      await getAnalysisAchievement({ eduCourseSeq: this.id }).then(
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
                term: `${term.gradeNm.replace("학년", "")} - ${term.termNm.replace("학기", "")}`,
                sbjtNm: sbjt.sbjtNm,
                acqGpa: sbjt.acqGpa,
                thryHrs: sbjt.thryHrs,
                pracHrs: sbjt.pracHrs,
                kcsYn: sbjt.kcsYn === STATUS_YES ? "●" : "",
                ncsYn: sbjt.ncsYn === STATUS_YES ? "●" : "",
              });
            });
            this.datasetListRp.analysisAchievementContent.push({
              term: `${term.gradeNm.replace("학년", "")} - ${term.termNm.replace("학기", "")}`,
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
        eduCourseSeq: this.id,
        upCdId: CD_EDU12,
      };
      const analysisEvalStnrdReqModel = {
        eduCourseSeq: this.id,
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
      this.datasetListRp.operationDevelopmentPlan = JSON.stringify(
        this.datasetListRp.operationDevelopmentPlan
      );
      this.datasetListRp.analysisEvalStnrd = JSON.stringify(
        this.datasetListRp.analysisEvalStnrd
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
    totalScoreAnalysis(listSbjt: number[]) {
      return listSbjt.reduce((sum, sbjt) => sum + sbjt, 0);
    },
  },
});
</script>
<style scoped>
@import url("../eduCourseCustom.css");
</style>
