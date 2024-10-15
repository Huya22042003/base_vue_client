<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.basicAcademicDiagnosisSheet.detail.subTitle1") }}
          </p>
          <table class="tbl_row tbl_border">
            <caption>
              {{
                t("07.basicAcademicDiagnosisSheet.detail.subTitle1")
              }}
            </caption>
            <colgroup>
              <col style="width: 21%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.basicAcademicDiagnosisSheet.detail.name") }}
                  </p>
                </th>
                <td colspan="3">
                  <div>
                    <InputBase
                      :mode="modeShow"
                      :id="'nameSheet'"
                      :name="'nameSheet'"
                      v-model="dataDetail.surveyNm"
                      required
                    ></InputBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.basicAcademicDiagnosisSheet.detail.useYn") }}
                  </p>
                </th>
                <td colspan="3">
                  <RadiobuttonBase
                    v-for="item in listUseYn"
                    :mode="modeShow"
                    :value="item.cdId"
                    :id="'useYn' + item.cdId"
                    :name="'useYn' + item.cdId"
                    :key="'useYn' + item.cdId"
                    :label="item.cdNm"
                    v-model="dataDetail.useYn"
                    :checked="dataDetail.useYn === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section">
          <div>
            <span class="note_custom">
              {{ t("07.basicAcademicDiagnosisSheet.detail.instructContent") }}
            </span>
          </div>
        </div>
        <div class="box_section mt_5">
          <div
            class="mb-15"
            v-for="(
              baseLearnItem, indexBaseLearnItem
            ) in dataDetail.listBaseLearnItem"
          >
            <table class="tbl_row tbl_border">
              <colgroup>
                <col style="width: 7%" />
                <col style="width: 7%" />
                <col style="width: 7%" />
                <col style="width: 73%" />
                <col style="width: 6%" />
              </colgroup>
              <tbody>
                <tr>
                  <th :colspan="3">
                    <p>
                      {{
                        t("07.basicAcademicDiagnosisSheet.detail.category") +
                        baseLearnItem.baseLearnItemNumOrd
                      }}
                    </p>
                  </th>
                  <td colspan="3">
                    <div style="width: 25%">
                      <SelectBoxBase
                        :id="'baseLearnItem' + indexBaseLearnItem"
                        :name="'baseLearnItem' + indexBaseLearnItem"
                        :data="listBaseLearnItem"
                        v-model="baseLearnItem.baseLearnItemSeq"
                        v-if="listBaseLearnItem.length > 1"
                      ></SelectBoxBase>
                    </div>
                  </td>
                </tr>
                <template
                  v-for="(
                    question, indexQuestion
                  ) in baseLearnItem.listQuestion"
                  :key="indexQuestion"
                >
                  <tr v-if="question.delYn !== statusYes">
                    <th :colspan="3">
                      <p class="text-center">
                        {{
                          t("07.basicAcademicDiagnosisSheet.detail.question")
                        }}
                      </p>
                    </th>
                    <td>
                      <div>
                        <InputBase
                          :id="'question' + indexBaseLearnItem + indexQuestion"
                          :name="
                            'question' + indexBaseLearnItem + indexQuestion
                          "
                          :mode="modeShow"
                          v-model="question.cont"
                          required
                        ></InputBase>
                      </div>
                    </td>
                    <td
                      :rowspan="
                        question.listAnswer.filter(
                          (answer) => answer.delYn !== statusYes
                        ).length + 1
                      "
                      style="position: relative"
                    >
                      <div
                        class="button btn_xs btn_blue btn_responsive"
                        v-if="indexQuestion === 0"
                        style="
                          position: absolute;
                          top: 4%;
                          height: 92%;
                          width: 65%;
                          left: 18%;
                        "
                        @click="addQuestion(indexBaseLearnItem)"
                      >
                        {{ t("common.add") }}
                      </div>
                      <div
                        class="button btn_xs btn_gray btn_responsive"
                        v-if="indexQuestion > 0"
                        style="
                          position: absolute;
                          top: 4%;
                          height: 92%;
                          width: 65%;
                          left: 18%;
                        "
                        @click="
                          confirmRemoveQuestion(
                            indexBaseLearnItem,
                            indexQuestion
                          )
                        "
                      >
                        {{ t("common.deleteItem") }}
                      </div>
                    </td>
                  </tr>
                  <template
                    v-if="question.delYn !== statusYes"
                    v-for="(answer, indexAnswer) in question.listAnswer"
                    :key="indexAnswer"
                  >
                    <tr v-if="answer.delYn !== statusYes">
                      <th
                        :rowspan="
                          question.listAnswer.filter(
                            (answer) => answer.delYn !== statusYes
                          ).length
                        "
                        v-if="indexAnswer === 0"
                      >
                        <p class="text-center">
                          {{
                            t("07.basicAcademicDiagnosisSheet.detail.answer")
                          }}
                        </p>
                      </th>
                      <th>
                        <div class="flex-custom">
                          <RadiobuttonBase
                            :mode="modeShow"
                            :id="
                              'radioAnswer' +
                              indexBaseLearnItem +
                              indexQuestion +
                              indexAnswer
                            "
                            :name="
                              'radioAnswer' + indexBaseLearnItem + indexQuestion
                            "
                            :key="
                              'radioAnswer' +
                              indexBaseLearnItem +
                              indexQuestion +
                              indexAnswer
                            "
                            v-model="answer.ansYn"
                            :checked="answer.ansYn === statusYes"
                            @click="
                              chooseAnswerTrue(
                                indexBaseLearnItem,
                                indexQuestion,
                                indexAnswer
                              )
                            "
                            :class="'radio-custom'"
                          >
                          </RadiobuttonBase>
                        </div>
                      </th>
                      <th>
                        <p class="text-center">
                          {{
                            answer.viewNumOrd +
                            t("07.basicAcademicDiagnosisSheet.detail.number")
                          }}
                        </p>
                      </th>
                      <td>
                        <div
                          class="search_flex"
                          style="
                            position: relative;
                            justify-content: space-between;
                          "
                        >
                          <div style="width: 93%">
                            <InputBase
                              :id="
                                'answer' +
                                indexBaseLearnItem +
                                indexQuestion +
                                indexAnswer
                              "
                              :name="
                                'answer' +
                                indexBaseLearnItem +
                                indexQuestion +
                                indexAnswer
                              "
                              :mode="modeShow"
                              v-model="answer.cont"
                              required
                            ></InputBase>
                          </div>
                          <div v-if="indexAnswer === 0">
                            <button
                              type="button"
                              class="button btn_xs btn_blue btn_responsive"
                              @click="
                                addAnswer(indexBaseLearnItem, indexQuestion)
                              "
                            >
                              {{ t("common.add") }}
                            </button>
                          </div>
                          <div v-if="indexAnswer > 0">
                            <button
                              :disabled="
                                question.listAnswer.filter(
                                  (answer) => answer.delYn !== statusYes
                                ).length === 2
                              "
                              type="button"
                              class="button btn_xs btn_gray btn_responsive"
                              @click="
                                removeAnswer(
                                  indexBaseLearnItem,
                                  indexQuestion,
                                  indexAnswer
                                )
                              "
                            >
                              {{ t("common.deleteItem") }}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="dp_flex btn_group btn_end" style="gap: 10px">
          <button
            type="button"
            class="btn_round btn_xs btn_secondary"
            @click="confirmSaveTemp"
            v-if="dataDetail.stsCd === statusSaveTemp || !dataDetail.stsCd"
          >
            {{ t("common.saveTemp") }}</button
          ><button
            type="button"
            class="btn_round btn_xs btn_lightgray"
            v-if="dataDetail.stsCd === statusSave"
            @click="confirmDelete"
          >
            {{ t("common.delete") }}
          </button>
          <button
            type="button"
            class="btn_round btn_xs btn_primary"
            @click="confirmSave"
          >
            {{ t("common.save") }}
          </button>
          <button class="btn_round btn_xs btn_white" @click="backList">
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
import { MODE_SHOW, SUCCSESS_STATUS } from "../../../constants/screen.const";
import { defineComponent } from "vue";
import { SCREEN } from "../../../router/screen";
import {
  LANGUAGE_CHINA_CODE,
  LANGUAGE_ENGLISH_CODE,
  LANGUAGE_KOREA_CODE,
  MESSAGE_ERROR_API,
  STATUS_NO,
  STATUS_YES,
  STS_CD_SAVE,
  STS_CD_SAVE_TEMP,
  UP_CD_ID_USE_YN,
} from "../../../constants/common.const";
import {
  BaseLearnDiagQusModel,
  BaseLearnDiagQusViewModel,
  BaseLearnItemModel,
  BaseLearnSurveyCrudModel,
} from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosisSheet/basicAcademicDiagnosisSheet.type";
import { commonStore } from "../../../stores/common";
import {
  deleteBaseLearnSurvey,
  detailBaseLearnSurvey,
  getListBaseLearnItem,
  saveBaseLearnSurvey,
} from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosisSheet/basicAcademicDiagnosisSheet.service";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
import { CodeMngModel } from "../../../stores/common/codeMng/codeMng.type";

export default defineComponent({
  name: "basicAcademicDiagnosisSheetList",
  components: { Breadcrumb, LinkGridComponent },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      pageTitle: this.t("07.basicAcademicDiagnosisSheet.detail.pageTitle"),
      modalOpen: false,
      id: "",
      modeScreen: "",
      modeShow: MODE_SHOW,
      statusYes: STATUS_YES,
      statusNo: STATUS_NO,
      languageKR: LANGUAGE_KOREA_CODE,
      languageCN: LANGUAGE_CHINA_CODE,
      languageEN: LANGUAGE_ENGLISH_CODE,
      listUseYn: [] as Array<CodeMngModel>,
      listBaseLearnItem: [
        {
          cdId: "",
          cdNm: this.t("common.select"),
        },
      ],
      dataDetail: {} as BaseLearnSurveyCrudModel,
      breadcrumbItems: [],
      statusSaveTemp: STS_CD_SAVE_TEMP,
      statusSave: STS_CD_SAVE,
      isDisabledSaveTemp: true,
      isDisabledSave: true,
    };
  },
  computed: {
    hasInvalidEntries(): boolean {
      return (
        this.dataDetail.listBaseLearnItem?.some(
          (baseLearnItem: BaseLearnItemModel) => {
            if (!baseLearnItem.baseLearnItemSeq) {
              return baseLearnItem.listQuestion?.some(
                (question: BaseLearnDiagQusModel) => {
                  return (
                    question.cont?.trim() ||
                    question.listAnswer?.some(
                      (answer: BaseLearnDiagQusViewModel) => answer.cont?.trim()
                    )
                  );
                }
              );
            }
            return false;
          }
        ) ?? false
      );
    },
  },
  watch: {
    dataDetail: {
      handler(newValue) {
        this.isDisabledSaveTemp = !newValue.surveyNm;

        const hasInvalidAnswers = newValue.listBaseLearnItem?.some(
          (item: BaseLearnItemModel) =>
            item.listQuestion?.some(
              (question: BaseLearnDiagQusModel) =>
                !question.listAnswer?.some(
                  (answer) => answer.ansYn === this.statusYes
                )
            )
        );

        const isDisabledSave =
          newValue.listBaseLearnItem &&
          newValue.listBaseLearnItem.some(
            (item: BaseLearnItemModel) => !item.baseLearnItemSeq
          );

        this.isDisabledSave = hasInvalidAnswers || isDisabledSave;
      },
      deep: true,
    },
  },
  beforeMount() {
    this.id = window.history.state.id;
    this.getCodeUseYn();
    this.getListBaseLearnItem();
    this.getMajorCapaSurveyCrudModel();
  },
  methods: {
    getMajorCapaSurveyCrudModel() {
      this.cmn.setLoading(true);
      detailBaseLearnSurvey({ surveySeq: this.id }).then((res: any) => {
        this.dataDetail = res.data.data;
        this.cmn.setLoading(false);
      });
    },
    async getListBaseLearnItem() {
      const res = await getListBaseLearnItem();
      if (res.status === SUCCSESS_STATUS) {
        res.data.data.forEach((item: any) => {
          this.listBaseLearnItem.push(item);
        });
      }
    },
    getCodeUseYn() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_USE_YN }).then((response: any) => {
        response.data.data.forEach((item: any) => {
          this.listUseYn.push(item);
        });
      });
    },
    backList() {
      this.$router.push({
        name: SCREEN.basicAcademicDiagnosisSheet.name,
      });
    },
    addQuestion(indexBaseLearnItem: number): void {
      const item = this.dataDetail.listBaseLearnItem?.[indexBaseLearnItem];
      if (item) {
        const activeQuestionsCount =
          item.listQuestion?.filter(
            (question) => question.delYn === this.statusNo
          ).length || 0;
        const newQuestion: BaseLearnDiagQusModel = {
          qusSeq: null,
          qusNumOrd: activeQuestionsCount + 1,
          cont: "",
          delYn: this.statusNo,
          listAnswer: [
            {
              viewSeq: null,
              viewNumOrd: 1,
              cont: "",
              ansYn: this.statusNo,
              delYn: this.statusNo,
            },
            {
              viewSeq: null,
              viewNumOrd: 2,
              cont: "",
              ansYn: this.statusNo,
              delYn: this.statusNo,
            },
          ],
        };
        item.listQuestion?.push(newQuestion);
      }
    },
    confirmRemoveQuestion(indexBaseLearnItem: number, indexQuestion: number) {
      this.$swal({
        text: this.t(
          "07.basicAcademicDiagnosisSheet.detail.confirmDeleteQuestion"
        ),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.removeQuestion(indexBaseLearnItem, indexQuestion);
        }
      });
    },
    removeQuestion(indexBaseLearnItem: number, indexQuestion: number): void {
      const item = this.dataDetail.listBaseLearnItem?.[indexBaseLearnItem];
      if (!item) return;

      const question = item.listQuestion?.[indexQuestion];
      if (!question || !question.listAnswer?.length) return;

      if (question.qusSeq == null) {
        item.listQuestion.splice(indexQuestion, 1);
      } else {
        question.delYn = this.statusYes;
        question.listAnswer.forEach((answer) => {
          answer.delYn = this.statusYes;
        });
      }

      let count = 1;
      item.listQuestion.forEach((qus) => {
        if (qus.delYn === this.statusNo) {
          qus.qusNumOrd = count;
          count++;
        }
      });
    },
    addAnswer(indexBaseLearnItem: number, indexQuestion: number): void {
      const item = this.dataDetail.listBaseLearnItem?.[indexBaseLearnItem];
      const question = item?.listQuestion?.[indexQuestion];
      if (question) {
        const activeAnswersCount =
          question.listAnswer?.filter(
            (answer) => answer.delYn === this.statusNo
          ).length || 0;
        const newAnswer: BaseLearnDiagQusViewModel = {
          viewSeq: null,
          viewNumOrd: activeAnswersCount + 1,
          cont: "",
          ansYn: this.statusNo,
          delYn: this.statusNo,
        };
        question.listAnswer?.push(newAnswer);
      }
    },
    removeAnswer(
      indexBaseLearnItem: number,
      indexQuestion: number,
      indexAnswer: number
    ): void {
      const item = this.dataDetail.listBaseLearnItem?.[indexBaseLearnItem];
      const question = item?.listQuestion?.[indexQuestion];
      if (!question) return;

      const answer = question.listAnswer?.[indexAnswer];
      if (!answer) return;

      if (answer.viewSeq == null) {
        question.listAnswer.splice(indexAnswer, 1);
      } else {
        answer.delYn = this.statusYes;
      }

      let count = 1;
      question.listAnswer.forEach((ans) => {
        if (ans.delYn === this.statusNo) {
          ans.viewNumOrd = count;
          count++;
        }
      });
    },
    chooseAnswerTrue(
      indexBaseLearnItem: number,
      indexQuestion: number,
      indexAnswer: number
    ): void {
      const item = this.dataDetail.listBaseLearnItem?.[indexBaseLearnItem];
      const question = item?.listQuestion?.[indexQuestion];
      if (question) {
        question.listAnswer?.forEach((answer, i) => {
          answer.ansYn = i === indexAnswer ? this.statusYes : this.statusNo;
        });
      }
    },
    confirmSave() {
      if (this.cmn.check || this.isDisabledSave) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.cancel"),
        }).then(() => {});
        return;
      }
      if (this.checkForDuplicateSeqs()) {
        this.$swal({
          text: this.t(
            "07.basicAcademicDiagnosisSheet.detail.checkBaseLearnItem"
          ),
          type: "error",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.confirm"),
        });
        return;
      }
      this.$swal({
        text: this.t("07.basicAcademicDiagnosisSheet.detail.confirmSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.saveData("save");
        }
      });
    },
    confirmSaveTemp() {
      if (this.isDisabledSaveTemp) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.cancel"),
        });
        return;
      }
      if (this.hasInvalidEntries) {
        this.$swal({
          text: this.t(
            "07.basicAcademicDiagnosisResult.detail.validateBaseLearnItem"
          ),
          type: "warning",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.cancel"),
        });
        return;
      }
      if (this.checkForDuplicateSeqs()) {
        this.$swal({
          text: this.t(
            "07.basicAcademicDiagnosisSheet.detail.checkBaseLearnItem"
          ),
          type: "error",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.confirm"),
        });
        return;
      }
      this.$swal({
        text: this.t("07.basicAcademicDiagnosisSheet.detail.confirmSaveTemp"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.saveTemp"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.saveData("saveTemp");
        }
      });
    },
    checkForDuplicateSeqs(): boolean {
      const setSeqs = new Set<string>();
      let hasDuplicate = false;

      this.dataDetail.listBaseLearnItem?.forEach(
        (baseLearnItem: BaseLearnItemModel, index) => {
          if (!baseLearnItem.baseLearnItemSeq) {
            return;
          }

          if (setSeqs.has(baseLearnItem.baseLearnItemSeq)) {
            hasDuplicate = true;
          } else {
            setSeqs.add(baseLearnItem.baseLearnItemSeq);
          }

          baseLearnItem.baseLearnItemNumOrd = index + 1;
        }
      );

      return hasDuplicate;
    },
    saveData(type: string) {
      this.dataDetail.stsCd =
        type === "save" ? this.statusSave : this.statusSaveTemp;

      this.cmn.setLoading(true);
      saveBaseLearnSurvey(this.dataDetail)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.dataDetail.surveySeq = res.data.data;
            this.cmn.setLoading(false);
            if (type === "save") {
              this.$swal({
                text: this.t(
                  "07.basicAcademicDiagnosisSheet.detail.successSave"
                ),
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: this.t("common.confirm"),
              }).then(() => {
                this.backList();
              });
            } else {
              this.$swal({
                text: this.t(
                  "07.basicAcademicDiagnosisSheet.detail.successSaveTemp"
                ),
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: this.t("common.confirm"),
              });
            }
          }
        })
        .catch(() => {})
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    confirmDelete() {
      this.$swal({
        text: this.t(
          "07.basicAcademicDiagnosisSheet.detail.confirmClearContent"
        ),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.delete();
        }
      });
    },
    delete() {
      this.cmn.setLoading(true);
      deleteBaseLearnSurvey({ surveySeq: this.id })
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.cmn.setLoading(false);
            this.$swal({
              text: this.t(
                "07.basicAcademicDiagnosisSheet.detail.successClearContent"
              ),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            }).then(() => {
              this.backList();
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.$swal({
              text: this.t(
                "07.coreCompetencyDiagnosticSheet.detail.messageCheckValidateDelete"
              ),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          }
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
  },
});
</script>
<style scoped>
.instruct-content {
  color: red;
}

.flex-custom {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.radio-custom {
  margin-left: 7px;
  margin-top: -21px;
}
</style>
