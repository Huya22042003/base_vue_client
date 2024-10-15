<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("11.diagEmployeeAbility.detail.title1") }}
          </p>
          <table class="tbl_row tbl_border tbl_result_detail_custom">
            <caption>
              {{
                t("07.coreCompetencyDiagnosisResult.detail.subTitle")
              }}
            </caption>
            <colgroup>
              <col style="width: 15%" />
              <col style="width: 15%" />
              <col style="width: 15%" />
              <col style="width: 15%" />
              <col style="width: 15%" />
              <col style="width: 15%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  {{ t("11.diagEmployeeAbility.detail.column1") }}
                </th>
                <th scope="row">
                  {{ t("11.diagEmployeeAbility.detail.column2") }}
                </th>
                <th scope="row">
                  {{ t("11.diagEmployeeAbility.detail.column3") }}
                </th>
                <th scope="row">
                  {{ t("11.diagEmployeeAbility.detail.column4") }}
                </th>
                <th scope="row">
                  {{ t("11.diagEmployeeAbility.detail.column5") }}
                </th>
                <th scope="row">
                  {{ t("11.diagEmployeeAbility.detail.column6") }}
                </th>
              </tr>
              <tr>
                <td scope="row">
                  <p>{{ empInfo && empInfo.deptNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ empInfo && empInfo.experienceNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ empInfo && empInfo.staffPstnNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ empInfo && empInfo.stdNo }}</p>
                </td>
                <td scope="row">
                  <p>{{ empInfo && empInfo.genderNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ empInfo && empInfo.stdNm }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box_section mt_8">
          <p class="box_title_sm">
            {{ t("11.diagEmployeeAbility.detail.title2") }}
          </p>
          <div v-html="empInfo.diagGuide"></div>
        </div>
        <div class="box_section mt_8">
          <p class="box_title_sm">
            {{ t("11.diagEmployeeAbility.detail.title3") }}
          </p>
          <div>
            <div class="tab_list mb_5">
              <p
                class="radio_tab"
                v-for="empAbility in listEmpAbility"
                :key="empAbility.empAbilitySeq"
              >
                <input
                  type="radio"
                  :id="'radioKR' + empAbility.empAbilitySeq"
                  :name="'radioKR' + empAbility.empAbilitySeq"
                  :checked="empAbility.empAbilitySeq === empAbilitySeqSelected"
                />
                <label>{{ empAbility.empAbilityNm }}</label>
              </p>
            </div>
            <div>
              <label
                :class="
                  childAbilitySelected === childAbility.empAbilityChldAbilitySeq
                    ? 'mr_5 child-ability-custom selected'
                    : 'mr_5 child-ability-custom'
                "
                v-for="(childAbility, index) in listChildAbility"
                :key="childAbility.empAbilityChldAbilitySeq"
                >{{ index + 1 + ". " + childAbility.chldAbilityNm }}</label
              >
            </div>
          </div>
        </div>
        <div class="box_section mt_8">
          <table
            class="tbl_row tbl_border mb_8"
            v-for="question in listQuestion"
            :key="question.elemSeq"
          >
            <caption>
              {{
                t("07.diagnosingEmployee.diagnosisSheet.crud.infoOfSheet")
              }}
            </caption>
            <colgroup>
              <col style="width: 10%" />
              <col style="width: 8%" />
              <col style="width: auto" />
              <col style="width: 8%" />
            </colgroup>
            <tbody>
              <tr>
                <th colspan="2">
                  <p>
                    {{ question.elemNm }}
                    {{ t("11.diagEmployeeAbility.detail.question") }}
                  </p>
                </th>
                <td colspan="2">
                  <p>
                    {{ question.cont }}
                  </p>
                </td>
              </tr>
              <tr>
                <th scope="row" :rowspan="6">
                  <p>{{ t("11.diagEmployeeAbility.detail.level") }}</p>
                </th>
              </tr>
              <tr
                v-for="(answer, indexAnswer) in question.listAnswer"
                :key="answer.answerSeq"
              >
                <th>
                  {{
                    t("11.diagEmployeeAbility.detail.level") +
                    (question.listAnswer.length - indexAnswer)
                  }}
                </th>
                <td>
                  <p>{{ answer.cont }}</p>
                </td>
                <td>
                  <div class="flex-custom">
                    <RadiobuttonBase
                      :mode="'show'"
                      :id="'radioAnswer' + question.elemSeq + answer.answerSeq"
                      :name="
                        'radioAnswer' + question.elemSeq + answer.answerSeq
                      "
                      :key="'radioAnswer' + question.elemSeq + answer.answerSeq"
                      v-model="answer.answerSeq"
                      :checked="answer.answerSeq === question.answerChoose"
                      :class="'radio-custom'"
                      @click="handleChooseAnswer(question, answer)"
                    >
                    </RadiobuttonBase>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
          <button
            type="button"
            class="btn_round btn_xs btn_white"
            v-if="isHideBtnPrevious"
            @click="previous"
          >
            {{ t("11.diagEmployeeAbility.detail.previous") }}
          </button>
          <button
            type="button"
            class="btn_round btn_xs btn_white"
            v-if="!isShowBtnSend"
            @click="confirmSaveData"
          >
            {{ t("11.diagEmployeeAbility.detail.next") }}
          </button>
          <button
            type="button"
            class="btn_round btn_xs btn_primary"
            v-if="isShowBtnSend"
            @click="confirmSendDiag"
          >
            {{ t("11.diagEmployeeAbility.detail.send") }}
          </button>
          <button
            type="button"
            class="button btn_xs btn_white bo_rd6"
            @click="back()"
          >
            {{ t("common.list") }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { defineComponent } from "vue";
import { commonStore } from "../../stores/common";
import { useI18n } from "vue-i18n";
import ModalPublicInfo from "./ModalPublicInfo.vue";
import {
  getDataStepQuestion,
  getDiagRsltState,
  getEmpInfo,
  getListEmpAbility,
  saveDataStepQuestion,
  sendDiagEmpAbility,
} from "../../stores/diagEmployeeAbilityStaff/diagEmployeeAbility.service";
import {
  ChildEmpAbilityModel,
  DiagEmpAbilityStaffAnswerModel,
  DiagEmpAbilityStaffQuestionModel,
  DiagEmpInfoModel,
  EmpAbilityModel,
} from "../../stores/diagEmployeeAbilityStaff/diagEmployeeAbility.type";
import { SCREEN } from "../../router/screen";
import { SUCCSESS_STATUS } from "../../constants/screen.const";

export default defineComponent({
  components: { Breadcrumb, LinkGridComponent, ModalPublicInfo },
  setup() {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  data() {
    return {
      pageTitle: this.t("11.diagEmployeeAbility.detail.pageTitle"),
      breadcrumbItems: [],
      diagSeq: "",
      empInfo: {} as DiagEmpInfoModel,
      listEmpAbility: [] as Array<EmpAbilityModel>,
      empAbilitySeqSelected: "",
      listChildAbility: [] as Array<ChildEmpAbilityModel>,
      childAbilitySelected: "",
      listQuestion: [] as Array<DiagEmpAbilityStaffQuestionModel>,
      flagPrev: false,
      state: "",
      checkSave: 0,
    };
  },
  watch: {
    empAbilitySeqSelected(newValue) {
      this.listEmpAbility.forEach((item) => {
        if (item.empAbilitySeq === newValue) {
          this.listChildAbility = item.listChildAbility;
          if (this.listChildAbility.length > 0) {
            if (this.flagPrev) {
              this.childAbilitySelected =
                this.listChildAbility[
                  this.listChildAbility.length - 1
                ].empAbilityChldAbilitySeq;
            } else {
              if (this.state === "next") {
                this.childAbilitySelected =
                  this.listChildAbility[0].empAbilityChldAbilitySeq;
              }
            }

            this.flagPrev = false;
          }
        }
      });
    },
    childAbilitySelected(newValue) {
      this.listQuestion = [];
      if (newValue) {
        this.getDataStepQuestion();
      }
    },
  },
  beforeMount() {
    this.diagSeq = window.history.state.id;
    this.getDetailEmpInfo();

    this.getListEmpAbility();
  },
  computed: {
    isShowBtnSend() {
      const indexEmpAbilitySelected = this.listEmpAbility.findIndex(
        (empAbility) => empAbility.empAbilitySeq === this.empAbilitySeqSelected
      );
      const indexChildAbilitySelected = this.listChildAbility.findIndex(
        (childAbility) =>
          childAbility.empAbilityChldAbilitySeq === this.childAbilitySelected
      );
      if (
        indexEmpAbilitySelected === this.listEmpAbility.length - 1 &&
        indexChildAbilitySelected === this.listChildAbility.length - 1
      ) {
        return true;
      }
      return false;
    },
    isHideBtnPrevious() {
      const indexEmpAbilitySelected = this.listEmpAbility.findIndex(
        (empAbility) => empAbility.empAbilitySeq === this.empAbilitySeqSelected
      );
      const indexChildAbilitySelected = this.listChildAbility.findIndex(
        (childAbility) =>
          childAbility.empAbilityChldAbilitySeq === this.childAbilitySelected
      );
      if (indexEmpAbilitySelected === 0 && indexChildAbilitySelected === 0) {
        return false;
      }
      return true;
    },
    isRequiredBtnSave() {
      return !this.listQuestion.every(
        (item) => item.answerChoose !== null && item.answerChoose !== ""
      );
    },
  },
  methods: {
    getDetailEmpInfo() {
      getEmpInfo({ diagSeq: this.diagSeq }).then((res) => {
        this.empInfo = res.data.data;
      });
    },
    async getListEmpAbility() {
      try {
        this.store.setLoading(true);

        const [res, resState] = await Promise.all([
          getListEmpAbility(),
          getDiagRsltState({ diagSeq: this.diagSeq }),
        ]);

        if (res.status === SUCCSESS_STATUS) {
          this.listEmpAbility = res.data.data;
        }

        if (resState.data.data) {
          this.empAbilitySeqSelected = resState.data.data.empAbilitySeq;
          this.childAbilitySelected = resState.data.data.childAbilitySeq;
        } else {
          const firstAbility = this.listEmpAbility[0];
          this.empAbilitySeqSelected = firstAbility.empAbilitySeq;
          this.childAbilitySelected =
            firstAbility.listChildAbility?.[0]?.empAbilityChldAbilitySeq ||
            null;
        }
      } catch (error) {
      } finally {
        this.store.setLoading(false);
      }
    },
    handleChangeEmpAbility(empAbilitySeq: string) {
      this.empAbilitySeqSelected = empAbilitySeq;
    },
    handleChangeChildAbility(childAbilitySeq: string) {
      this.childAbilitySelected = childAbilitySeq;
    },
    back() {
      this.$router.push({
        name: SCREEN.diagEmployeeAbilityStaff.name,
      });
    },
    async getDataStepQuestion() {
      let request = {
        empAbilitySeq: this.empAbilitySeqSelected,
        childAbilitySeq: this.childAbilitySelected,
        diagSeq: this.diagSeq,
      };
      this.store.setLoading(true);
      const res = await getDataStepQuestion(request);
      if (res.status === SUCCSESS_STATUS) {
        this.listQuestion = res.data.data;
        this.store.setLoading(false);
      }
    },
    handleChooseAnswer(
      question: DiagEmpAbilityStaffQuestionModel,
      answer: DiagEmpAbilityStaffAnswerModel
    ) {
      question.answerChoose = answer.answerSeq;
      question.answerLevel = answer.answerLevel;
      this.checkSave++;
    },
    previous() {
      const indexEmpAbilitySelected = this.listEmpAbility.findIndex(
        (empAbility) => empAbility.empAbilitySeq === this.empAbilitySeqSelected
      );
      const indexChildAbilitySelected = this.listChildAbility.findIndex(
        (childAbility) =>
          childAbility.empAbilityChldAbilitySeq === this.childAbilitySelected
      );

      if (indexChildAbilitySelected > 0) {
        this.childAbilitySelected =
          this.listChildAbility[
            indexChildAbilitySelected - 1
          ].empAbilityChldAbilitySeq;
      } else if (indexEmpAbilitySelected > 0) {
        this.empAbilitySeqSelected =
          this.listEmpAbility[indexEmpAbilitySelected - 1].empAbilitySeq;
        this.flagPrev = true;
      }
      this.checkSave = 0;
    },
    next() {
      const indexEmpAbilitySelected = this.listEmpAbility.findIndex(
        (empAbility) => empAbility.empAbilitySeq === this.empAbilitySeqSelected
      );
      const indexChildAbilitySelected = this.listChildAbility.findIndex(
        (childAbility) =>
          childAbility.empAbilityChldAbilitySeq === this.childAbilitySelected
      );

      if (indexChildAbilitySelected < this.listChildAbility.length - 1) {
        this.childAbilitySelected =
          this.listChildAbility[
            indexChildAbilitySelected + 1
          ].empAbilityChldAbilitySeq;
      } else if (indexEmpAbilitySelected < this.listEmpAbility.length - 1) {
        this.empAbilitySeqSelected =
          this.listEmpAbility[indexEmpAbilitySelected + 1].empAbilitySeq;
      }

      this.state = "next";
      this.checkSave = 0;
    },
    confirmSaveData() {
      if (this.isRequiredBtnSave) {
        this.$swal({
          text: this.t("11.diagEmployeeAbility.detail.messageValidateRequired"),
          type: "warning",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.cancel"),
        });
        return;
      }

      if (this.checkSave === 0) {
        this.next();
        return;
      }

      this.$swal({
        text: this.t("11.diagEmployeeAbility.detail.messageConfirmSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.saveDataStepQus();
        }
      });
    },
    saveDataStepQus() {
      this.store.setLoading(true);
      let request = {
        diagSeq: this.diagSeq,
        listQuestion: this.listQuestion,
      };
      saveDataStepQuestion(request).then((res) => {
        this.store.setLoading(false);
        this.$swal({
          text: this.t("11.diagEmployeeAbility.detail.messageSuccessSave"),
          type: "success",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.confirm"),
        }).then(() => {
          this.next();
        });
      });
    },
    confirmSendDiag() {
      if (this.isRequiredBtnSave) {
        this.$swal({
          text: this.t("11.diagEmployeeAbility.detail.messageValidateRequired"),
          type: "warning",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.cancel"),
        });
        return;
      }
      this.$swal({
        text: this.t("11.diagEmployeeAbility.detail.messageConfirmSend"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.sendDiag();
        }
      });
    },
    sendDiag() {
      this.store.setLoading(true);
      let request = {
        diagSeq: this.diagSeq,
        listQuestion: this.listQuestion,
      };
      sendDiagEmpAbility(request).then((res) => {
        this.store.setLoading(false);
        this.$swal({
          text: this.t("11.diagEmployeeAbility.detail.messageSuccessSend"),
          type: "success",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.confirm"),
        }).then(() => {
          this.back();
        });
      });
    },
  },
});
</script>
<style scoped>
.child-ability-custom {
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
}

.child-ability-custom.selected {
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  color: #f15922;
}

.flex-custom {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.radio-custom {
  margin-top: -25px;
}
</style>
