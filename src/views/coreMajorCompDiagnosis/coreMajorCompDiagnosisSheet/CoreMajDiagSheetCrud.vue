<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.coreMajorCompDiagnosisSheet.crud.title") }}
          </p>
          <table class="tbl_row">
            <caption>
              {{
                t("07.coreMajorCompDiagnosisSheet.crud.tableTitle")
              }}
            </caption>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 40%" />
              <col style="width: 20%" />
              <col style="width: 40%" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t("07.coreMajorCompDiagnosisSheet.crud.table.languageYn")
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <RadiobuttonBase
                    v-for="item in listLanguageYn"
                    :value="item.cdId"
                    :id="'languageYn' + item.cdId"
                    :name="'languageYn' + item.cdId"
                    :key="'languageYn' + item.cdId"
                    v-model="majorCapaSurveyCrudModel.multiLanguage"
                    :checked="
                      item.cdId == majorCapaSurveyCrudModel.multiLanguage
                    "
                    :label="item.cdNm"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreMajorCompDiagnosisSheet.crud.table.name") }}
                  </p>
                </th>
                <td colspan="3">
                  <div>
                    <InputBase
                      :id="'surveyNm'"
                      :name="'surveyNm'"
                      v-model="majorCapaSurveyCrudModel.surveyNm"
                      required
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t("07.coreMajorCompDiagnosisSheet.crud.table.university")
                    }}
                  </p>
                </th>
                <td colspan="3">
                  {{ majorCapaSurveyCrudModel.univNm }}
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreMajorCompDiagnosisSheet.crud.table.major") }}
                  </p>
                </th>
                <td colspan="3">
                  {{ majorCapaSurveyCrudModel.deptNm }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.coreMajorCompDiagnosisSheet.crud.tableTitle") }}
          </p>
        </div>
        <div class="box_section">
          <div>
            <div
              v-for="(
                majorCapa, majorCapaIndex
              ) in majorCapaSurveyCrudModel.listMajorCapa"
              :id="majorCapa.majorCapaSeq"
              :key="majorCapa.majorCapaSeq"
              class="mb-5"
            >
              <CollapseBase
                :isShow="majorCapa.collapseFlag"
                :title="majorCapa.majorCapaNm"
                :isCheck="majorCapa.isFullEntry"
                :onClick="
                  () => {
                    majorCapa.collapseFlag = !majorCapa.collapseFlag;
                  }
                "
                :mode="'custom'"
              >
                <div class="mt-8 mb-10">
                  <div
                    v-for="(question, questionIndex) in majorCapa.listQuestion"
                    :key="question.qusNumOrd"
                    class="box_section mt-6"
                  >
                    <div v-if="shouldShowRow(question)">
                      <div class="btn_group btn_end">
                        <button
                          v-if="question.qusNumOrd === 1"
                          type="button"
                          class="button btn_sm btn_gray btn_responsive"
                          @click="addQuestion(majorCapaIndex)"
                        >
                          {{
                            t(
                              "07.coreMajorCompDiagnosisSheet.crud.button.addAction"
                            )
                          }}
                        </button>
                        <button
                          v-if="question.qusNumOrd !== 1"
                          type="button"
                          class="button btn_sm btn_black btn_responsive"
                          @click="removeQuestion(majorCapaIndex, questionIndex)"
                        >
                          {{
                            t(
                              "07.coreMajorCompDiagnosisSheet.crud.button.remove1"
                            )
                          }}{{ question.qusNumOrd }}
                          {{
                            t(
                              "07.coreMajorCompDiagnosisSheet.crud.button.remove2"
                            )
                          }}
                        </button>
                      </div>
                      <div class="table_container mt-6">
                        <table class="tbl_row tbl_border">
                          <colgroup>
                            <col style="width: 20%" />
                            <col style="width: 40%" />
                            <col style="width: 20%" />
                            <col style="width: 40%" />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th scope="row">
                                <p>
                                  {{
                                    t(
                                      "07.coreMajorCompDiagnosisSheet.crud.action"
                                    )
                                  }}
                                </p>
                              </th>
                              <th colspan="3">
                                <p>{{ question.qusNumOrd }}</p>
                              </th>
                            </tr>
                            <template
                              v-for="(
                                qusItem, qusItemIndex
                              ) in question.listQusItem"
                              :key="qusItem.multiLanguageCd"
                            >
                              <tr
                                v-if="
                                  qusItem.multiLanguageCd === languageKR ||
                                  (qusItem.multiLanguageCd !== languageKR &&
                                    majorCapaSurveyCrudModel.multiLanguage ===
                                      multiLanguageY)
                                "
                              >
                                <th scope="row">
                                  <p
                                    v-if="
                                      qusItem.multiLanguageCd === languageKR
                                    "
                                  >
                                    {{
                                      t(
                                        "07.coreMajorCompDiagnosisSheet.crud.kor"
                                      )
                                    }}
                                  </p>
                                  <p
                                    v-if="
                                      qusItem.multiLanguageCd === languageCN
                                    "
                                  >
                                    {{
                                      t(
                                        "07.coreMajorCompDiagnosisSheet.crud.china"
                                      )
                                    }}
                                  </p>
                                  <p
                                    v-if="
                                      qusItem.multiLanguageCd === languageEN
                                    "
                                  >
                                    {{
                                      t(
                                        "07.coreMajorCompDiagnosisSheet.crud.en"
                                      )
                                    }}
                                  </p>
                                </th>
                                <td colspan="3">
                                  <InputBase
                                    :id="
                                      'contentQuestion' +
                                      majorCapa.majorCapaSeq +
                                      question.qusNumOrd +
                                      qusItem.multiLanguageCd
                                    "
                                    :name="
                                      'contentQuestion' +
                                      majorCapa.majorCapaSeq +
                                      question.qusNumOrd +
                                      qusItem.multiLanguageCd
                                    "
                                    v-model="qusItem.content"
                                    required
                                  />
                                </td>
                              </tr>
                            </template>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapseBase>
            </div>
          </div>
          <div class="dp_flex btn_group btn_end mt-10" style="gap: 10px">
            <button
              type="button"
              class="btn_round btn_xs btn_secondary"
              @click="confirmSaveTemp"
              v-if="
                majorCapaSurveyCrudModel.stsCd === statusSaveTemp ||
                !majorCapaSurveyCrudModel.stsCd
              "
            >
              {{ t("common.saveTemp") }}</button
            ><button
              type="button"
              class="btn_round btn_xs btn_secondary"
              v-if="majorCapaSurveyCrudModel.stsCd === statusSave"
              @click="confirmDelete"
            >
              {{ t("common.deleteItem") }}
            </button>
            <button
              type="button"
              class="btn_round btn_xs btn_primary"
              @click="confirmSave()"
            >
              {{ t("common.save") }}
            </button>
            <button class="btn_round btn_xs btn_white" @click="back">
              {{ t("common.list") }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { SCREEN } from "../../..//router/screen";
import {
  MajorCapaDiagQusItemModel,
  MajorCapaDiagQusModel,
  MajorCapaSurveyCrudModel,
} from "../../../stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/coreMajorCompDiagnosisSheet.type";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { STATUS_NO, STATUS_YES } from "@/constants/common.const";
import { detailMajorCapaSurvey } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/coreMajorCompDiagnosisSheet.service";
import { commonStore } from "@/stores/common";
import {
  LANGUAGE_CHINA_CODE,
  LANGUAGE_ENGLISH_CODE,
  LANGUAGE_KOREA_CODE,
} from "@/constants/common.const";
import { saveMajorCapaSurvey } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/coreMajorCompDiagnosisSheet.service";
import {
  MESSAGE_ERROR_API,
} from "@/constants/common.const";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { MajorCapaModel } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/coreMajorCompDiagnosisSheet.type";
import { deleteMajorCapaSurvey } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosisSheet/coreMajorCompDiagnosisSheet.service";
import { UP_CD_ID_MULTI_LANG_USE_YN } from "@/constants/common.const";
import {
  MULTI_LANGUAGE_N,
  MULTI_LANGUAGE_Y,
} from "../../../constants/common.const";
import { STS_CD_SAVE, STS_CD_SAVE_TEMP } from "@/constants/common.const";

export default defineComponent({
  name: "CoreMajDiagSheetCrud",
  components: { Breadcrumb },
  setup() {
    const route = useRoute();
    const { t } = useI18n();
    const cmn = commonStore();
    const modeScreen = route.params.mode;
    return { t, modeScreen, cmn };
  },
  data() {
    return {
      pageTitle: this.t("07.coreMajorCompDiagnosisSheet.crud.pageTitle"),
      breadcrumbItems: [],
      id: "",
      listLanguageYn: [],
      majorCapaSurveyCrudModel: {} as MajorCapaSurveyCrudModel,
      statusYes: STATUS_YES,
      statusNo: STATUS_NO,
      multiLanguageY: MULTI_LANGUAGE_Y,
      multiLanguageN: MULTI_LANGUAGE_N,
      languageKR: LANGUAGE_KOREA_CODE,
      languageCN: LANGUAGE_CHINA_CODE,
      languageEN: LANGUAGE_ENGLISH_CODE,
      statusSave: STS_CD_SAVE,
      statusSaveTemp: STS_CD_SAVE_TEMP,
      isDisabledSaveTemp: true,
    };
  },
  watch: {
    majorCapaSurveyCrudModel: {
      deep: true,
      handler(newVal: MajorCapaSurveyCrudModel) {
        this.checkIsFullEntry();
        if (newVal.surveyNm) {
          this.isDisabledSaveTemp = false;
        } else {
          this.isDisabledSaveTemp = true;
        }
      },
    },
  },
  beforeMount() {
    this.id = window.history.state.id;
    this.modeScreen = this.$route.params.mode;
    this.majorCapaSurveyCrudModel.multiLanguage = this.multiLanguageY;
    this.getCodeMultiLanguage();

    this.getMajorCapaSurveyCrudModel();
  },
  methods: {
    getMajorCapaSurveyCrudModel() {
      this.cmn.setLoading(true);
      detailMajorCapaSurvey({ surveySeq: this.id }).then((res: any) => {
        this.majorCapaSurveyCrudModel = res.data.data;
        this.cmn.setLoading(false);
      });
    },
    getCodeMultiLanguage() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_MULTI_LANG_USE_YN }).then(
        (response: any) => {
          response.data.data.forEach((item: any) => {
            this.listLanguageYn.push(item);
          });
        }
      );
    },
    confirmSaveTemp() {
      if (this.isDisabledSaveTemp) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.cancel"),
        }).then(() => {});
        return;
      }
      this.$swal({
        text: this.t("07.coreMajorCompDiagnosisSheet.messageConfirmSaveTemp"),
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
    confirmSave() {
      if (this.cmn.check) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.cancel"),
        }).then(() => {});
        return;
      }
      this.$swal({
        text: this.t("07.coreMajorCompDiagnosisSheet.messageConfirmSave"),
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
    saveData(type: string) {
      this.majorCapaSurveyCrudModel.stsCd =
        type === "save" ? this.statusSave : this.statusSaveTemp;

      this.cmn.setLoading(true);
      saveMajorCapaSurvey(this.majorCapaSurveyCrudModel)
        .then((res: any) => {
          if (res.status === SUCCSESS_STATUS) {
            this.cmn.setLoading(false);
            this.majorCapaSurveyCrudModel.surveySeq = res.data.data;
            if (type === "save") {
              this.$swal({
                text: this.t(
                  "07.coreMajorCompDiagnosisSheet.messageSuccessSave"
                ),
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: this.t("common.confirm"),
              }).then(() => {
                this.back();
              });
            } else {
              this.$swal({
                text: this.t(
                  "07.coreMajorCompDiagnosisSheet.messageSuccessSaveTemp"
                ),
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: this.t("common.confirm"),
              }).then(() => {
                this.getMajorCapaSurveyCrudModel();
              });
            }
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    confirmDelete() {
      this.$swal({
        text: this.t("07.coreMajorCompDiagnosisSheet.messageConfirmDelete"),
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
      deleteMajorCapaSurvey({ surveySeq: this.id })
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.cmn.setLoading(false);
            this.$swal({
              text: this.t(
                "07.coreMajorCompDiagnosisSheet.messageSuccessDelete"
              ),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            }).then(() => {
              this.back();
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.$swal({
              text: this.t("07.coreMajorCompDiagnosisSheet.messageErrorDelete"),
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
    back() {
      this.$router.replace({ path: SCREEN.coreMajorCompDiagnosisSheet.path });
    },
    handleChangeLanguage(item: any, code: any) {
      for (var majorCapa of this.majorCapaSurveyCrudModel.listMajorCapa) {
        if (majorCapa.majorCapaSeq === item.majorCapaSeq) {
          item.defaultLanguage = code;
        }
      }
    },
    createQuestionItem(languageCd: string): MajorCapaDiagQusItemModel {
      return {
        qusSeq: null,
        multiLanguageCd: languageCd,
        content: "",
        delYn: this.statusNo,
      };
    },
    addQuestion(indexMajorCapa: number) {
      const majorCapa =
        this.majorCapaSurveyCrudModel.listMajorCapa?.[indexMajorCapa];
      if (!majorCapa) return;

      const activeQuestionsCount = majorCapa.listQuestion.filter(
        (qus: MajorCapaDiagQusModel) =>
          qus.listQusItem[0].delYn === this.statusNo
      ).length;

      const questionIndex = majorCapa.listQuestion.findIndex(
        (qus: MajorCapaDiagQusModel) =>
          qus.qusNumOrd === activeQuestionsCount + 1
      );

      if (questionIndex !== -1) {
        const question = majorCapa.listQuestion[questionIndex];
        question.listQusItem.forEach((item) => {
          item.delYn = this.statusNo;
          item.content = "";
        });
      } else {
        const question = {
          qusNumOrd: activeQuestionsCount + 1,
          listQusItem: [
            this.createQuestionItem(this.languageKR),
            this.createQuestionItem(this.languageCN),
            this.createQuestionItem(this.languageEN),
          ],
        };
        majorCapa.listQuestion.push(question);
      }
    },
    removeQuestion(indexMajorCapa: number, indexQuestion: number) {
      const majorCapa =
        this.majorCapaSurveyCrudModel.listMajorCapa?.[indexMajorCapa];
      if (!majorCapa) return;

      const question = majorCapa.listQuestion?.[indexQuestion];
      if (!question || !question.listQusItem?.length) return;

      if (question.listQusItem[0].qusSeq == null) {
        majorCapa.listQuestion.splice(indexQuestion, 1);
      } else {
        question.listQusItem.forEach((item) => {
          item.delYn = this.statusYes;
        });
      }

      let count = 1;
      majorCapa.listQuestion.forEach((qus) => {
        if (qus.listQusItem[0].delYn === this.statusNo) {
          qus.qusNumOrd = count;
          count++;
        }
      });
    },
    shouldShowRow(question: MajorCapaDiagQusModel) {
      return question.listQusItem.some(
        (itemQus: any) => itemQus.delYn !== this.statusYes
      );
    },
    checkIsFullEntry() {
      this.majorCapaSurveyCrudModel.listMajorCapa?.forEach(
        (majorCapa: MajorCapaModel) => {
          const multiLanguage = this.majorCapaSurveyCrudModel.multiLanguage;

          const allContentFilled = majorCapa.listQuestion.every(
            (question: MajorCapaDiagQusModel) =>
              question.listQusItem[
                multiLanguage === this.multiLanguageN ? "some" : "every"
              ]((item: MajorCapaDiagQusItemModel) => {
                if (multiLanguage === this.multiLanguageN) {
                  return (
                    item.multiLanguageCd === this.languageKR &&
                    item.content &&
                    item.content.trim() !== ""
                  );
                }
                return item.content && item.content.trim() !== "";
              })
          );

          majorCapa.isFullEntry = allContentFilled;
        }
      );
    },
  },
});
</script>
