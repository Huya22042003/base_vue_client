<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("11.diagProfessorAbility.detail.title1") }}
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
                  {{ t("11.diagProfessorAbility.detail.column1") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.detail.column2") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.detail.column3") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.detail.column4") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.detail.column5") }}
                </th>
                <th scope="row">
                  {{ t("11.diagProfessorAbility.detail.column6") }}
                </th>
              </tr>
              <tr>
                <td scope="row">
                  <p>{{ profInfo && profInfo.deptNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ profInfo && profInfo.experienceNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ profInfo && profInfo.staffPstnNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ profInfo && profInfo.stdNo }}</p>
                </td>
                <td scope="row">
                  <p>{{ profInfo && profInfo.genderNm }}</p>
                </td>
                <td scope="row">
                  <p>{{ profInfo && profInfo.stdNm }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box_section mt_8">
          <p class="box_title_sm">
            {{ t("11.diagProfessorAbility.detail.title2") }}
          </p>
          <div v-html="profInfo.diagGuide"></div>
        </div>
        <div class="box_section mt_8">
          <p class="box_title_sm">
            {{ t("11.diagProfessorAbility.detail.title3") }}
          </p>
          <div>
            <div class="tab_list mb_5">
              <p
                class="radio_tab"
                v-for="profAbility in listProfAbility"
                :key="profAbility.profAbilitySeq"
              >
                <input
                  type="radio"
                  :id="'radioKR' + profAbility.profAbilitySeq"
                  :name="'radioKR' + profAbility.profAbilitySeq"
                  :checked="
                    profAbility.profAbilitySeq === profAbilitySeqSelected
                  "
                />
                <label>{{ profAbility.profAbilityNm }}</label>
              </p>
            </div>
            <div>
              <label
                :class="
                  childAbilitySelected ===
                  childAbility.profAbilityChldAbilitySeq
                    ? 'mr_5 child-ability-custom selected'
                    : 'mr_5 child-ability-custom'
                "
                v-for="(childAbility, index) in listChildAbility"
                :key="childAbility.profAbilityChldAbilitySeq"
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
                    {{ t("11.diagProfessorAbility.detail.question") }}
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
                  <p>{{ t("11.diagProfessorAbility.detail.level") }}</p>
                </th>
              </tr>
              <tr
                v-for="(answer, indexAnswer) in question.listAnswer"
                :key="answer.answerSeq"
              >
                <th>
                  {{
                    t("11.diagProfessorAbility.detail.level") +
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
            {{ t("11.diagProfessorAbility.detail.previous") }}
          </button>
          <button
            type="button"
            class="btn_round btn_xs btn_white"
            v-if="!isShowBtnSend"
            @click="confirmSaveData"
          >
            {{ t("11.diagProfessorAbility.detail.next") }}
          </button>
          <button
            type="button"
            class="btn_round btn_xs btn_primary"
            v-if="isShowBtnSend"
            @click="confirmSendDiag"
          >
            {{ t("11.diagProfessorAbility.detail.send") }}
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
import { SCREEN } from "../../router/screen";
import { SUCCSESS_STATUS } from "../../constants/screen.const";
import {
  ChildProfAbilityModel,
  DiagProfAbilityStaffAnswerModel,
  DiagProfAbilityStaffQuestionModel,
  DiagProfInfoModel,
  ProfAbilityModel,
} from "../../stores/diagProfessorAbilityStaff/diagProfessorAbility.type";
import {
  getDataStepQuestion,
  getDiagRsltState,
  getListProfAbility,
  getProfInfo,
  saveDataStepQuestion,
  sendDiagProfAbility,
} from "../../stores/diagProfessorAbilityStaff/diagProfessorAbility.service";

export default defineComponent({
  components: { Breadcrumb, LinkGridComponent, ModalPublicInfo },
  setup() {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store };
  },
  data() {
    return {
      pageTitle: this.t("11.diagProfessorAbility.detail.pageTitle"),
      breadcrumbItems: [],
      diagSeq: "",
      profInfo: {} as DiagProfInfoModel,
      listProfAbility: [] as Array<ProfAbilityModel>,
      profAbilitySeqSelected: "",
      listChildAbility: [] as Array<ChildProfAbilityModel>,
      childAbilitySelected: "",
      listQuestion: [] as Array<DiagProfAbilityStaffQuestionModel>,
      flagPrev: false,
      state: "",
      checkSave: 0,
    };
  },
  watch: {
    profAbilitySeqSelected(newValue) {
      this.listProfAbility.forEach((item) => {
        if (item.profAbilitySeq === newValue) {
          this.listChildAbility = item.listChildAbility;
          if (this.listChildAbility.length > 0) {
            if (this.flagPrev) {
              this.childAbilitySelected =
                this.listChildAbility[
                  this.listChildAbility.length - 1
                ].profAbilityChldAbilitySeq;
            } else {
              if (this.state === "next") {
                this.childAbilitySelected =
                  this.listChildAbility[0].profAbilityChldAbilitySeq;
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
    this.getDetailProfInfo();

    this.getListProfAbility();
  },
  computed: {
    isShowBtnSend() {
      const indexProfAbilitySelected = this.listProfAbility.findIndex(
        (profAbility) =>
          profAbility.profAbilitySeq === this.profAbilitySeqSelected
      );
      const indexChildAbilitySelected = this.listChildAbility.findIndex(
        (childAbility) =>
          childAbility.profAbilityChldAbilitySeq === this.childAbilitySelected
      );
      if (
        indexProfAbilitySelected === this.listProfAbility.length - 1 &&
        indexChildAbilitySelected === this.listChildAbility.length - 1
      ) {
        return true;
      }
      return false;
    },
    isHideBtnPrevious() {
      const indexProfAbilitySelected = this.listProfAbility.findIndex(
        (profAbility) =>
          profAbility.profAbilitySeq === this.profAbilitySeqSelected
      );
      const indexChildAbilitySelected = this.listChildAbility.findIndex(
        (childAbility) =>
          childAbility.profAbilityChldAbilitySeq === this.childAbilitySelected
      );
      if (indexProfAbilitySelected === 0 && indexChildAbilitySelected === 0) {
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
    getDetailProfInfo() {
      getProfInfo({ diagSeq: this.diagSeq }).then((res) => {
        this.profInfo = res.data.data;
      });
    },
    async getListProfAbility() {
      try {
        this.store.setLoading(true);

        const [res, resState] = await Promise.all([
          getListProfAbility(),
          getDiagRsltState({ diagSeq: this.diagSeq }),
        ]);

        if (res.status === SUCCSESS_STATUS) {
          this.listProfAbility = res.data.data || [];
        }

        const stateData = resState.data.data;
        if (stateData) {
          this.profAbilitySeqSelected = stateData.profAbilitySeq;
          this.childAbilitySelected = stateData.childAbilitySeq;
        } else if (this.listProfAbility.length) {
          const firstAbility = this.listProfAbility[0];
          this.profAbilitySeqSelected = firstAbility.profAbilitySeq;
          this.childAbilitySelected =
            firstAbility.listChildAbility?.[0]?.profAbilityChldAbilitySeq ||
            null;
        }
      } catch (error) {
      } finally {
        this.store.setLoading(false);
      }
    },
    handleChangeProfAbility(profAbilitySeq: string) {
      this.profAbilitySeqSelected = profAbilitySeq;
    },
    handleChangeChildAbility(childAbilitySeq: string) {
      this.childAbilitySelected = childAbilitySeq;
    },
    back() {
      this.$router.push({
        name: SCREEN.diagProfessorAbilityStaff.name,
      });
    },
    async getDataStepQuestion() {
      let request = {
        profAbilitySeq: this.profAbilitySeqSelected,
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
      question: DiagProfAbilityStaffQuestionModel,
      answer: DiagProfAbilityStaffAnswerModel
    ) {
      question.answerChoose = answer.answerSeq;
      question.answerLevel = answer.answerLevel;
      this.checkSave++;
    },
    previous() {
      const indexProfAbilitySelected = this.listProfAbility.findIndex(
        (profAbility) =>
          profAbility.profAbilitySeq === this.profAbilitySeqSelected
      );
      const indexChildAbilitySelected = this.listChildAbility.findIndex(
        (childAbility) =>
          childAbility.profAbilityChldAbilitySeq === this.childAbilitySelected
      );

      if (indexChildAbilitySelected > 0) {
        this.childAbilitySelected =
          this.listChildAbility[
            indexChildAbilitySelected - 1
          ].profAbilityChldAbilitySeq;
      } else if (indexProfAbilitySelected > 0) {
        this.profAbilitySeqSelected =
          this.listProfAbility[indexProfAbilitySelected - 1].profAbilitySeq;
        this.flagPrev = true;
      }
      this.checkSave = 0;
    },
    next() {
      const indexProfAbilitySelected = this.listProfAbility.findIndex(
        (profAbility) =>
          profAbility.profAbilitySeq === this.profAbilitySeqSelected
      );
      const indexChildAbilitySelected = this.listChildAbility.findIndex(
        (childAbility) =>
          childAbility.profAbilityChldAbilitySeq === this.childAbilitySelected
      );

      if (indexChildAbilitySelected < this.listChildAbility.length - 1) {
        this.childAbilitySelected =
          this.listChildAbility[
            indexChildAbilitySelected + 1
          ].profAbilityChldAbilitySeq;
      } else if (indexProfAbilitySelected < this.listProfAbility.length - 1) {
        this.profAbilitySeqSelected =
          this.listProfAbility[indexProfAbilitySelected + 1].profAbilitySeq;
      }

      this.state = "next";
      this.checkSave = 0;
    },
    confirmSaveData() {
      if (this.isRequiredBtnSave) {
        this.$swal({
          text: this.t(
            "11.diagProfessorAbility.detail.messageValidateRequired"
          ),
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
        text: this.t("11.diagProfessorAbility.detail.messageConfirmSave"),
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
          text: this.t("11.diagProfessorAbility.detail.messageSuccessSave"),
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
          text: this.t(
            "11.diagProfessorAbility.detail.messageValidateRequired"
          ),
          type: "warning",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.cancel"),
        });
        return;
      }
      this.$swal({
        text: this.t("11.diagProfessorAbility.detail.messageConfirmSend"),
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
      sendDiagProfAbility(request).then((res) => {
        this.store.setLoading(false);
        this.$swal({
          text: this.t("11.diagProfessorAbility.detail.messageSuccessSend"),
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
