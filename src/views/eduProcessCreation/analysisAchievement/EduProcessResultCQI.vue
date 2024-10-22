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
                  <th>{{ evalStnrd.cont }}</th>
                  <th>{{ evalStnrd.score }}</th>
                  <th>{{ evalStnrd.rslt }}</th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.impr }}
                  </th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.goal }}
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
                  <th>{{ evalStnrd.cont }}</th>
                  <th>{{ evalStnrd.score }}</th>
                  <th>{{ evalStnrd.rslt }}</th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.impr }}
                  </th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.goal }}
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
                  <th>{{ evalStnrd.cont }}</th>
                  <th>{{ evalStnrd.score }}</th>
                  <th>{{ evalStnrd.rslt }}</th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.impr }}
                  </th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.goal }}
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
                  <th>{{ evalStnrd.cont }}</th>
                  <th>{{ evalStnrd.score }}</th>
                  <th>{{ evalStnrd.rslt }}</th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.impr }}
                  </th>
                  <th
                    v-if="indexEvalStnrd === 0"
                    :rowspan="evalItem.listEvalStnrdCont.length"
                  >
                    {{ evalItem.goal }}
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
        <button type="button" class="btn_md btn_round btn_gray">
          <!-- 1.전년도 교육과정 운영 실적 분석 인쇄 -->{{
            t("eduProcessCreation.analysisAchievement.title31")
          }}
        </button>
        <button
          v-if="isSave"
          type="button"
          class="btn_md btn_round btn_primary"
          @click="confirmSaveData()"
        >
          {{ t("common.save") }}
        </button>
        <button
          type="button"
          class="btn_md btn_round btn_primary"
          @click="next()"
          :disabled="isDisabled"
        >
          {{ t("common.next") }}
        </button>
        <button
          type="button"
          class="btn_md btn_round btn_white"
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
  AnalysisEvalStnrdReqModel,
  OperationDevelopmentPlanListModel,
  OperationDevelopmentPlanReqModel,
  OperationDevelopmentPlanSaveModel,
} from "@/stores/eduProcessCreation/analysisAchievement/analysisAchievement.type";
import { CD_EDU12, UP_CD_ID_121901 } from "@/constants/common.const";
import {
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
    save() {},
  },
});
</script>
<style scoped>
@import url("../eduCourseCustom.css");
</style>
