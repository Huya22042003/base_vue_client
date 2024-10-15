<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{
              t("07.diagnosisLearningAbility.diagnosisTable.create.infoOfSheet")
            }}
          </p>
          <table class="tbl_row">
            <caption>
              {{
                t(
                  "07.diagnosisLearningAbility.diagnosisTable.create.infoOfSheet"
                )
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
                      t(
                        "07.diagnosisLearningAbility.diagnosisTable.create.name"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <InputBase
                    :mode="'show'"
                    :id="'surveyNm'"
                    :name="'surveyNm'"
                    v-model="dataDetail.surveyNm"
                    required
                  ></InputBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosisTable.create.languageYn"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <RadiobuttonBase
                    v-for="item in listLanguageYn"
                    :mode="'show'"
                    :value="item.cdId"
                    :id="'languageYn' + item.cdId"
                    :name="'languageYn' + item.cdId"
                    :key="'languageYn' + item.cdId"
                    v-model="dataDetail.multiLanguage"
                    :checked="item.cdId == dataDetail.multiLanguage"
                    :label="item.cdNm"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosisTable.create.useYn"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <RadiobuttonBase
                    v-for="item in listUseYn"
                    :mode="'show'"
                    :value="item.cdId"
                    :id="'useYn' + item.cdId"
                    :name="'useYn' + item.cdId"
                    :key="'useYn' + item.cdId"
                    v-model="dataDetail.useYn"
                    :checked="item.cdId == dataDetail.useYn"
                    :label="item.cdNm"
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
          <p class="box_title_sm">
            {{
              t("07.diagnosisLearningAbility.diagnosisTable.create.infoOfSheet")
            }}
          </p>
          <div>
            <span class="note_custom">
              {{
                t(
                  "07.diagnosisLearningAbility.diagnosisTable.create.instructContent1"
                )
              }} </span
            ><br /><span class="note_custom">
              {{
                t(
                  "07.diagnosisLearningAbility.diagnosisTable.create.instructContent2"
                )
              }} </span
            ><br /><span class="note_custom">
              {{
                t(
                  "07.diagnosisLearningAbility.diagnosisTable.create.instructContent3"
                )
              }}
            </span>
          </div>
        </div>
        <div class="box_section mt_8">
          <div
            v-for="(ability, indexAbility) in dataDetail.listLearnAbility"
            :key="ability.learnAbilitySeq"
            class="mb-5"
          >
            <CollapseBase
              :isShow="ability.collapseFlag"
              :title="ability.learnAbilityNm"
              :isCheck="
                dataDetail.multiLanguage === multiLanguageN
                  ? ability.isFullEntryKR
                  : ability.isFullEntryKR &&
                    ability.isFullEntryCN &&
                    ability.isFullEntryEN
              "
              :onClick="
                () => {
                  ability.collapseFlag = !ability.collapseFlag;
                }
              "
              :mode="'custom'"
            >
              <div class="box_section mt-5">
                <div
                  class="tab_list mb_5"
                  v-if="dataDetail.multiLanguage === multiLanguageY"
                >
                  <p class="radio_tab">
                    <input
                      type="radio"
                      :id="'radioKR' + ability.learnAbilitySeq"
                      :name="'radioKR' + ability.learnAbilitySeq"
                      :checked="ability.isFullEntryKR"
                    />
                    <label @click="handleChangeLanguage(ability, languageKR)">{{
                      t(
                        "07.diagnosisLearningAbility.diagnosisTable.create.languageKR"
                      )
                    }}</label>
                  </p>
                  <p class="radio_tab">
                    <input
                      type="radio"
                      :id="'radioCN' + ability.learnAbilitySeq"
                      :name="'radioCN' + ability.learnAbilitySeq"
                      :checked="ability.isFullEntryCN"
                    />
                    <label @click="handleChangeLanguage(ability, languageCN)">{{
                      t(
                        "07.diagnosisLearningAbility.diagnosisTable.create.languageCN"
                      )
                    }}</label>
                  </p>
                  <p class="radio_tab">
                    <input
                      type="radio"
                      :id="'radioEN' + ability.learnAbilitySeq"
                      :name="'radioEN' + ability.learnAbilitySeq"
                      :checked="ability.isFullEntryEN"
                    />
                    <label @click="handleChangeLanguage(ability, languageEN)">{{
                      t(
                        "07.diagnosisLearningAbility.diagnosisTable.create.languageEN"
                      )
                    }}</label>
                  </p>
                </div>
                <table
                  class="tbl_row tbl_border mb-7"
                  v-for="(childAbility, indexChld) in ability.listChildAbility"
                  :key="childAbility.learnAbilityChldAbilitySeq"
                >
                  <caption>
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosisTable.create.infoOfSheet"
                      )
                    }}
                  </caption>
                  <colgroup>
                    <col style="width: 20%" />
                    <col style="width: 10%" />
                    <col style="width: auto" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colspan="3">
                        <p>
                          {{ childAbility.chldAbilityNm }}
                        </p>
                      </th>
                    </tr>
                    <template
                      v-for="(
                        abilityCmpn, indexCmpn
                      ) in childAbility.listAbilityCmpnElem"
                      :key="abilityCmpn.learnComponentSeq"
                    >
                      <template
                        v-for="quesAnsLang in abilityCmpn.listQueAnsLanguage"
                        :key="quesAnsLang.codeLanguage"
                      >
                        <tr
                          v-if="
                            quesAnsLang.codeLanguage === ability.defaultLanguage
                          "
                        >
                          <th
                            scope="row"
                            :rowspan="quesAnsLang.listquesContent?.length + 1"
                          >
                            <p>{{ abilityCmpn.learnComponentNm }}</p>
                          </th>
                        </tr>
                        <template
                          v-for="(
                            quesAns, index
                          ) in quesAnsLang.listquesContent.filter(
                            (item) => item.delYn !== statusYes
                          )"
                          :key="index"
                        >
                          <tr
                            v-if="
                              quesAnsLang.codeLanguage ===
                              ability.defaultLanguage
                            "
                          >
                            <th>
                              {{
                                t(
                                  "07.diagnosisLearningAbility.diagnosisTable.create.behavior"
                                )
                              }}{{ index + 1 }}
                            </th>
                            <td>
                              <div
                                class="search_flex"
                                style="
                                  position: relative;
                                  justify-content: space-between;
                                "
                              >
                                <div style="width: 92%">
                                  <InputBase
                                    :id="
                                      'quesContent' +
                                      index +
                                      abilityCmpn.learnComponentSeq +
                                      childAbility.learnAbilityChldAbilitySeq +
                                      ability.learnAbilitySeq
                                    "
                                    :name="
                                      'quesContent' +
                                      index +
                                      abilityCmpn.learnComponentSeq +
                                      childAbility.learnAbilityChldAbilitySeq +
                                      ability.learnAbilitySeq
                                    "
                                    v-model="quesAns.quesContent"
                                    :placeholder="
                                      getPlaceholderContentQuestion(
                                        abilityCmpn.listQueAnsLanguage,
                                        quesAnsLang.codeLanguage,
                                        index
                                      )
                                    "
                                    required
                                  ></InputBase>
                                </div>
                                <div>
                                  <button
                                    v-if="index === 0"
                                    type="button"
                                    class="button btn_xs btn_blue btn_responsive whitespace-nowrap"
                                    @click="
                                      addRow(indexAbility, indexChld, indexCmpn)
                                    "
                                  >
                                    {{ t("common.add") }}
                                  </button>
                                  <button
                                    v-else
                                    type="button"
                                    class="button btn_xs btn_gray btn_responsive whitespace-nowrap"
                                    @click="
                                      deleteRow(
                                        indexAbility,
                                        indexChld,
                                        indexCmpn,
                                        index
                                      )
                                    "
                                  >
                                    {{ t("common.delete") }}
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </template>
                      </template>
                    </template>
                  </tbody>
                </table>
              </div>
            </CollapseBase>
          </div>
        </div>
        <div class="dp_flex btn_group btn_end" style="gap: 10px">
          <button
            class="btn_round btn_xs btn_lightgray"
            @click="confirmDelete()"
            v-if="showDeleteButton"
          >
            {{ t("common.deleteItem") }}
          </button>
          <button
            type="button"
            class="btn_round btn_xs btn_secondary"
            v-if="showSaveTempButton"
            @click="confirmSaveTemp(saveTemp)"
          >
            {{ t("common.saveTemp") }}
          </button>
          <button
            @click="confirmSaveTemp(save)"
            type="button"
            class="btn_round btn_xs btn_primary"
          >
            {{ t("common.save") }}
          </button>
          <button class="btn_round btn_xs btn_white" @click="back()">
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
import { MODE_DETAIL, SUCCSESS_STATUS } from "../../../constants/screen.const";
import { defineComponent } from "vue";
import { SCREEN } from "../../../router/screen";
import {
  getDataRegister,
  saveLearnAbilitySurvey,
  deleteLearnAbilitySurvey,
} from "../../../stores/diagnosislearningAbility/diagLearnAbilitySheet/diagLearnAbilitySheet.service";
import {
  LearnAbilityModel,
  LearnAbilitySurveyCrudModel,
} from "../../../stores/diagnosislearningAbility/diagLearnAbilitySheet/diagLearnAbilitySheet.type";
import {
  LANGUAGE_CHINA_CODE,
  LANGUAGE_ENGLISH_CODE,
  LANGUAGE_KOREA_CODE,
  MESSAGE_ERROR_API,
  UP_CD_ID_MULTI_LANG_USE_YN,
  UP_CD_ID_USE_YN,
  MULTI_LANGUAGE_N,
  MULTI_LANGUAGE_Y,
  STS_CD_SAVE_TEMP,
  STS_CD_SAVE,
  STATUS_YES,
  STATUS_NO,
} from "../../../constants/common.const";
import { commonStore } from "../../../stores/common";
import { useI18n } from "vue-i18n";
import { getListCodeMng } from "../../../stores/common/codeMng/codeMng.service";
export default defineComponent({
  components: { Breadcrumb, LinkGridComponent },
  setup() {
    const cmStore = commonStore();
    const { t } = useI18n();
    return { t, cmStore };
  },
  data() {
    return {
      modalOpen: false,
      modeScreen: "",
      multiLanguageY: MULTI_LANGUAGE_Y,
      multiLanguageN: MULTI_LANGUAGE_N,
      languageKR: LANGUAGE_KOREA_CODE,
      languageCN: LANGUAGE_CHINA_CODE,
      languageEN: LANGUAGE_ENGLISH_CODE,
      listUseYn: [],
      listLanguageYn: [],
      pageTitle: this.t(
        "07.diagnosisLearningAbility.diagnosisTable.create.pageTitle"
      ),
      breadcrumbItems: [],
      dataDetail: {} as LearnAbilitySurveyCrudModel,
      saveTemp: STS_CD_SAVE_TEMP,
      save: STS_CD_SAVE,
      id: "",
      showDeleteButton: false,
      showSaveTempButton: false,
      statusYes: STATUS_YES,
      statusNo: STATUS_NO,
    };
  },
  watch: {
    dataDetail: {
      handler() {
        this.checkFullEntry();
      },
      deep: true,
    },
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.id = window.history.state.id;
    this.getListCode();
    this.getDataRegister(this.id);
  },
  methods: {
    checkFullEntry() {
      const allContentEnteredForLanguage = (
        ability: LearnAbilityModel,
        langCode: string
      ) => {
        return (
          ability.listChildAbility?.every(
            (childAbility) =>
              childAbility.listAbilityCmpnElem?.every(
                (cmpn) =>
                  cmpn.listQueAnsLanguage?.some(
                    (lang) =>
                      lang.codeLanguage === langCode &&
                      lang.listquesContent?.every(
                        (ques) =>
                          ques.delYn === this.statusYes ||
                          (ques.quesContent && ques.delYn === this.statusNo)
                      )
                  )
              )
          ) ?? false
        );
      };

      if (this.dataDetail.multiLanguage === this.multiLanguageN) {
        this.dataDetail.listLearnAbility?.forEach((ability) => {
          const allContentEntered = allContentEnteredForLanguage(
            ability,
            this.languageKR
          );
          ability.isFullEntryKR = allContentEntered;
        });
      } else if (this.dataDetail.multiLanguage === this.multiLanguageY) {
        this.dataDetail.listLearnAbility?.forEach((ability) => {
          const allContentEnteredKR = allContentEnteredForLanguage(
            ability,
            this.languageKR
          );
          const allContentEnteredCN = allContentEnteredForLanguage(
            ability,
            this.languageCN
          );
          const allContentEnteredEN = allContentEnteredForLanguage(
            ability,
            this.languageEN
          );
          ability.isFullEntryKR = allContentEnteredKR;
          ability.isFullEntryCN = allContentEnteredCN;
          ability.isFullEntryEN = allContentEnteredEN;
        });
      }
    },
    getListCode() {
      getListCodeMng({
        upCdIdList: [UP_CD_ID_USE_YN, UP_CD_ID_MULTI_LANG_USE_YN],
      }).then((res: any) => {
        if (res.status === SUCCSESS_STATUS) {
          res.data.data.forEach((item) => {
            if (item.upCdId === UP_CD_ID_USE_YN) {
              this.listUseYn.push(item);
            }
            if (item.upCdId === UP_CD_ID_MULTI_LANG_USE_YN) {
              this.listLanguageYn.push(item);
            }
          });
        }
      });
    },

    getPlaceholderContentQuestion(list: any, codeLanguage: any, index: any) {
      if (
        codeLanguage === LANGUAGE_CHINA_CODE ||
        codeLanguage === LANGUAGE_ENGLISH_CODE
      ) {
        const koQuestion = list.find(
          (s: any) => s.codeLanguage === LANGUAGE_KOREA_CODE
        );
        if (
          koQuestion &&
          koQuestion.listquesContent &&
          koQuestion.listquesContent.length > 0
        ) {
          return koQuestion.listquesContent[index].quesContent;
        }
      }
      return "";
    },
    handleChangeLanguage(item: any, code: any) {
      if (
        (code === this.languageCN || code === this.languageEN) &&
        !item.isFullEntryKR
      ) {
        this.$swal({
          text: this.t(
            "07.coreCompetencyDiagnosticSheet.detail.messageValidate"
          ),
          type: "success",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.confirm"),
        });
        return;
      }
      for (var learn of this.dataDetail.listLearnAbility) {
        if (learn.learnAbilitySeq === item.learnAbilitySeq) {
          item.defaultLanguage = code;
        }
      }
    },
    getDataRegister(id: any) {
      this.cmStore.setLoading(true);
      getDataRegister({ surveySeq: id })
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.dataDetail = res.data.data;
            this.cmStore.setLoading(false);
            if (
              !this.dataDetail.stsCd ||
              this.dataDetail.stsCd == this.saveTemp
            ) {
              this.showSaveTempButton = true;
            }
            if (this.dataDetail.stsCd === this.save) {
              this.showDeleteButton = true;
            }
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmStore.setLoading(false);
        });
    },
    confirmSaveTemp(stt: string) {
      if (stt === this.save) {
        if (this.cmStore.check) {
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
          text: this.t(
            "07.diagnosisLearningAbility.modalConfirm.titleConfirmSave"
          ),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.saveData(stt);
          }
        });
      }
      if (stt === this.saveTemp) {
        if (!this.dataDetail.surveyNm?.trim()) {
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
          text: this.t(
            "07.diagnosisLearningAbility.modalConfirm.titleConfirmTemp"
          ),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.saveTemp"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.saveData(stt);
          }
        });
      }
    },
    saveData(type: string) {
      if (this.modeScreen === MODE_DETAIL) {
        this.dataDetail.surveySeq = this.id;
      }
      this.dataDetail.stsCd = type;
      this.cmStore.setLoading(true);

      saveLearnAbilitySurvey(this.dataDetail)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.dataDetail.surveySeq = res.data.data;
            this.cmStore.setLoading(false);
            if (type === this.save) {
              this.$swal({
                text: this.t(
                  "07.diagnosisLearningAbility.modalConfirm.titleModifySave"
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
                  "07.diagnosisLearningAbility.modalConfirm.titleModifyTemp"
                ),
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: this.t("common.confirm"),
              });
            }
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmStore.setLoading(false);
        });
    },
    confirmDelete() {
      this.$swal({
        text: this.t(
          "07.coreCompetencyDiagnosticSheet.detail.messageConfirmDelete"
        ),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.deleteData();
        }
      });
    },
    deleteData() {
      this.cmStore.setLoading(true);
      deleteLearnAbilitySurvey({ surveySeq: this.id })
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.cmStore.setLoading(false);
            if (res.data.data === true) {
              this.$swal({
                text: this.t(
                  "07.diagnosisLearningAbility.modalConfirm.titleModifyDelete1"
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
                  "07.diagnosisLearningAbility.modalConfirm.noDelete"
                ),
                type: "success",
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonText: this.t("common.confirm"),
              });
            }
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmStore.setLoading(false);
        });
    },

    back() {
      this.$router.push({
        name: SCREEN.diagnosisLearningAbilitySheet.name,
      });
    },
    addRow(index1: number, index2: number, index3: number) {
      this.dataDetail.listLearnAbility[index1].listChildAbility[
        index2
      ].listAbilityCmpnElem[index3].listQueAnsLanguage.forEach((itemQus) => {
        const validQuestions = itemQus.listquesContent.filter(
          (quesAns: LearnAbilityQuesAnsModel) =>
            quesAns.delYn !== this.statusYes
        );
        const newOrder = validQuestions.length + 1;

        itemQus.listquesContent.push({
          quesContent: "",
          qusNumOrd: newOrder,
          delYn: STATUS_NO,
        });
      });
    },
    deleteRow(index1: number, index2: number, index3: number, index: number) {
      this.dataDetail.listLearnAbility[index1].listChildAbility[
        index2
      ].listAbilityCmpnElem[index3].listQueAnsLanguage.forEach((itemQus) => {
        const question = itemQus.listquesContent[index];

        if (question.quesSeq == null) {
          itemQus.listquesContent.splice(index, 1);
        } else {
          question.delYn = STATUS_YES;
        }

        let order = 1;
        itemQus.listquesContent.forEach((quesAns: LearnAbilityQuesAnsModel) => {
          if (quesAns.delYn !== STATUS_YES) {
            quesAns.qusNumOrd = order++;
          }
        });
      });
    },
  },
});
</script>
<style>
.instruct-content {
  color: red;
}
</style>
