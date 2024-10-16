<template>
  <div class="box_section mt-5">
    <!-- Block 1 -->
    <div class="box_section">
      <p class="box_title_sm">
        <!-- 1.교육과정 개발 -->{{
          t("eduProcessCreation.analysisAchievement.title16")
        }}
      </p>
      <div class="tbl tbl_col tbl_border">
        <table>
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
            <!-- Row1 -->
            <tr>
              <td scope="row" :colspan="1" :rowspan="3">
                대내외 환경 및 요구분석 적절성
              </td>
              <td scope="row" :colspan="1">
                대학 인재상, 교육목표, 대학･학과 발전계획, 학과 현황 등의
                내부환경분석이 적절하게 수행되었는가?
              </td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="3">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="3">입력내용 표시</td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                지역 및 국가산업, 지역사회, 학문 변화 등의 외부환경분석이
                적절하게 수행되었는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                전공 관련 산업체, 졸업생, 재학생 등의 요구분석이 적절하게
                수행되었는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <!-- Row2 -->
            <tr>
              <td scope="row" :colspan="1" :rowspan="6">
                교육과정 편성 타당성
              </td>
              <td scope="row" :colspan="1">
                대내외 환경분석 및 요구분석을 기반으로 학과 교육체계(비전,
                인재상, 교육목표 등), 발전계획 등이 타당하게 수립되었는가?
              </td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="6">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="6">입력내용 표시</td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                전공역량 설정을 위해 인재양성유형에 부합된 역량 분석이
                이루어졌는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                전공역량 체계(역량-하위역량-행동지표)가 교육과정 개편 및 수업에
                적용될 수 있도록 구체적 내용으로 제시되었는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                전공역량 함양을 위해 교과목 편성이 타당하게 이루어졌는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                전공 교육과정 개편에 의해 교과목 신설, 개편, 폐지 등의 개선이
                적절히 이루어졌는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                학과 교육과정개발운영위원회를 통해 개편된 교육과정의 심의 과정이
                적절하게 이루어졌는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <!-- Footer -->
            <tr>
              <th scope="row" :colspan="2">
                <!-- 교육과정 개발 자체평가 평균점수 -->{{
                  t("eduProcessCreation.analysisAchievement.title32")
                }}
              </th>
              <th scope="row" :colspan="4">0.0</th>
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
      <div class="tbl tbl_col tbl_border">
        <table>
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
            <!-- Row1 -->
            <tr>
              <td scope="row" :colspan="1" :rowspan="6">
                교육과정 운영 적절성
              </td>
              <td scope="row" :colspan="1">
                전공 교육과정 편성 및 운영 계획에 따라 교과목이 적절하게 개설,
                운영되었는가?
              </td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="6">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="6">입력내용 표시</td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                산업체 현장감각 및 기술 습득을 위하여 현장실습, 캡스톤디자인,
                주문식교육과정 운영이 적절히 이루어졌는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                수업의 질 제고를 위한 전임교원 담당 학점 비율, 강의규모 등은
                적정한 수준으로 운영되었는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                교과목 수업관리(출결, 휴・보강(수업기간) 등)는 규정 및 지침에
                따라 엄정하게 이루어졌는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                수업에 적합한 다양한 교수·학습방법을 활용하였는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                학생들의 전공역량을 평가하기 위한 타당한 평가방법들이 적절히
                활용되었는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <!-- Footer -->
            <tr>
              <th scope="row" :colspan="2">
                <!-- 교육과정 개발 자체평가 평균점수 -->{{
                  t("eduProcessCreation.analysisAchievement.title32")
                }}
              </th>
              <th scope="row" :colspan="4">0.0</th>
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
      <div class="tbl tbl_col tbl_border">
        <table>
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
            <!-- Row1 -->
            <tr>
              <td scope="row" :colspan="1" :rowspan="1">교육과정 이수현황</td>
              <td scope="row" :colspan="1">
                재학생의 전공 및 부전공, 트랙 신청/이수 현황을 파악하고 관리하고
                있는가?
              </td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="1">입력내용 표시</td>
            </tr>
            <!-- Row2 -->
            <tr>
              <td scope="row" :colspan="1" :rowspan="2">교육환경 및 기자재</td>
              <td scope="row" :colspan="1">
                강의실 및 실험·실습실이 교육과정 운영을 위하여 적절하게
                구축되었는가?
              </td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="2">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="2">입력내용 표시</td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                장비 및 도구는 교육과정 운영을 위하여 적절하게 확보되었는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <!-- Footer -->
            <tr>
              <th scope="row" :colspan="2">
                <!-- 교육과정 개발 자체평가 평균점수 -->{{
                  t("eduProcessCreation.analysisAchievement.title32")
                }}
              </th>
              <th scope="row" :colspan="4">0.0</th>
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
      <div class="tbl tbl_col tbl_border">
        <table>
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
            <!-- Row1 -->
            <tr>
              <td scope="row" :colspan="1" :rowspan="4">
                교육과정 성과 및 분석
              </td>
              <td scope="row" :colspan="1">
                전공 교육과정 운영을 통한 정량적 교육성과(교육만족도, 강의평가
                등)는 양호하게 도출되었는가?
              </td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="4">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="4">입력내용 표시</td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                학생들의 지난해 대비 전공역량별 향상도는 우수한가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                학생들의 학업부진 및 전공능력 미달 학생들의 추수 관리가 적절하게
                수행되었는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                전공 교육과정이 학과의 신입생 등록률, 재학생 충원률, 취업률 등에
                기여하고 있는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <!-- Row2 -->
            <tr>
              <td scope="row" :colspan="1" :rowspan="2">교육과정 개선</td>
              <td scope="row" :colspan="1">
                작년에 계획하였던 전공 교육과정 개선사항을 반영, 수행하였는가?
              </td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="2">입력내용 표시</td>
              <td scope="row" :colspan="1" :rowspan="2">입력내용 표시</td>
            </tr>
            <tr>
              <td scope="row" :colspan="1">
                교육과정 성과분석을 토대로 전공 교육과정 개선방안 및 계획을
                구체적으로 수립하였는가?
              </td>
              <td scope="row" :colspan="1"></td>
              <td scope="row" :colspan="1"></td>
            </tr>
            <!-- Footer -->
            <tr>
              <th scope="row" :colspan="2">
                <!-- 교육과정 개발 자체평가 평균점수 -->{{
                  t("eduProcessCreation.analysisAchievement.title32")
                }}
              </th>
              <th scope="row" :colspan="4">0.0</th>
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
      <div class="tbl tbl_col tbl_border">
        <table>
          <tbody>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 구분 -->{{
                  t("eduProcessCreation.analysisAchievement.title27")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
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
                <td scope="row" :colspan="1">
                  {{ operation.dataNm }}
                </td>
                <td scope="row" :colspan="1">
                  <TextArea
                    :id="'operation' + index"
                    required
                    v-model="operation.cont"
                    rows="5"
                  ></TextArea>
                </td>
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
  OperationDevelopmentPlanListModel,
  OperationDevelopmentPlanReqModel,
  OperationDevelopmentPlanSaveModel,
} from "@/stores/eduProcessCreation/analysisAchievement/analysisAchievement.type";
import { CD_EDU12 } from "@/constants/common.const";
import {
  getOperationDevelopmentPlanList,
  saveOperationDevelopmentPlanList,
} from "@/stores/eduProcessCreation/analysisAchievement/analysisAchievement.service";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;

    return { router, storeCommon, t, id };
  },
  data() {
    return {
      operationDevelopmentPlanListModel:
        [] as Array<OperationDevelopmentPlanListModel>,
      operationDevelopmentPlanReqModel: {} as OperationDevelopmentPlanReqModel,
      operationDevelopmentPlanSaveModel:
        {} as OperationDevelopmentPlanSaveModel,
      isDisabled: true,
    };
  },
  beforeMount() {
    this.operationDevelopmentPlanReqModel.eduCourseSeq = this.id;
    this.operationDevelopmentPlanReqModel.upCdId = CD_EDU12;

    this.operationDevelopmentPlanSaveModel.eduCourseSeq = this.id;

    this.getDataOperation();
  },
  methods: {
    getDataOperation() {
      this.storeCommon.setLoading(true);
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
        this.storeCommon.setLoading(false);
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
            } else {
              if (this.isDisabled) {
                this.$emit("updateStage", 23);
              }
            }
            this.isDisabled = false;
          }
        );
      });
    },
    next() {
      this.$emit("nextTab", 20);
    },
    back() {
      this.router.push({
        name: SCREEN.eduProcessCreation.name,
      });
    },
    save() {},
  },
});
</script>
<style scoped></style>
