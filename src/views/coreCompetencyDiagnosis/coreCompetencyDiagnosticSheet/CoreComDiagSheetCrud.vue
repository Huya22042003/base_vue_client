if
<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.coreCompetencyDiagnosticSheet.detail.infoOfSheet") }}
          </p>
          <table class="tbl_row">
            <caption>
              {{
                t("07.coreCompetencyDiagnosticSheet.detail.infoOfSheet")
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
                    {{ t("07.coreCompetencyDiagnosticSheet.detail.nameSheet") }}
                  </p>
                </th>
                <td colspan="3">
                  <InputBase
                    :mode="'show'"
                    :id="`surveyNm`"
                    :name="'surveyNm' + dataDetail.surveySeq"
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
                        "07.coreCompetencyDiagnosticSheet.detail.setUpMultiLanguage"
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
                    {{ t("07.coreCompetencyDiagnosticSheet.detail.useYn") }}
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
            {{ t("07.coreCompetencyDiagnosticSheet.detail.infoOfSheet") }}
          </p>
          <div>
            <span class="note_custom">
              {{
                t("07.coreCompetencyDiagnosticSheet.detail.instructContent1")
              }} </span
            ><br /><span class="note_custom">
              {{
                t("07.coreCompetencyDiagnosticSheet.detail.instructContent2")
              }} </span
            ><br /><span class="note_custom">
              {{
                t("07.coreCompetencyDiagnosticSheet.detail.instructContent3")
              }}
            </span>
          </div>
        </div>
        <div class="box_section mt_8">
          <div
            v-for="(coreAbility, index) in dataDetail.listCoreAbility"
            :key="coreAbility.coreAbilitySeq"
          >
            <CollapseBase
              :isShow="coreAbility.collapseFlag"
              :title="coreAbility.coreAbilityNm"
              :isCheck="
                dataDetail.multiLanguage === multiLanguageN
                  ? coreAbility.isFullEntryKR
                  : coreAbility.isFullEntryKR &&
                    coreAbility.isFullEntryCN &&
                    coreAbility.isFullEntryEN
              "
              :onClick="
                () => {
                  coreAbility.collapseFlag = !coreAbility.collapseFlag;
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
                      :id="'radioKR' + coreAbility.coreAbilitySeq"
                      :name="'radioKR' + coreAbility.coreAbilitySeq"
                      :checked="coreAbility.isFullEntryKR"
                    />
                    <label
                      @click="handleChangeLanguage(coreAbility, languageKR)"
                      >{{
                        t("07.coreCompetencyDiagnosticSheet.detail.languageKR")
                      }}</label
                    >
                  </p>
                  <p class="radio_tab">
                    <input
                      type="radio"
                      :id="'radioCN' + coreAbility.coreAbilitySeq"
                      :name="'radioCN' + coreAbility.coreAbilitySeq"
                      :checked="coreAbility.isFullEntryCN"
                    />
                    <label
                      @click="handleChangeLanguage(coreAbility, languageCN)"
                      >{{
                        t("07.coreCompetencyDiagnosticSheet.detail.languageCN")
                      }}</label
                    >
                  </p>
                  <p class="radio_tab">
                    <input
                      type="radio"
                      :id="'radioEN' + coreAbility.coreAbilitySeq"
                      :name="'radioEN' + coreAbility.coreAbilitySeq"
                      :checked="coreAbility.isFullEntryEN"
                    />
                    <label
                      @click="handleChangeLanguage(coreAbility, languageEN)"
                      >{{
                        t("07.coreCompetencyDiagnosticSheet.detail.languageEN")
                      }}</label
                    >
                  </p>
                </div>
                <table
                  class="tbl_row tbl_border mb-7"
                  v-for="childAbility in coreAbility.listChildAbility"
                  :key="childAbility.chldAbilitySeq"
                >
                  <caption>
                    {{
                      t("07.coreCompetencyDiagnosticSheet.detail.infoOfSheet")
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
                    <tr>
                      <th scope="row">
                        <p>
                          {{
                            t(
                              "07.coreCompetencyDiagnosticSheet.detail.storySituation"
                            )
                          }}
                        </p>
                      </th>
                      <td colspan="2">
                        <div
                          v-for="storySituation in childAbility.listStorySituation"
                          :key="storySituation.codeLanguage"
                        >
                          <TextArea
                            :id="
                              'storySituation' +
                              coreAbility.coreAbilitySeq +
                              childAbility.chldAbilitySeq +
                              storySituation.codeLanguage
                            "
                            :name="
                              'storySituation' +
                              coreAbility.coreAbilitySeq +
                              childAbility.chldAbilitySeq +
                              storySituation.codeLanguage
                            "
                            :mode="'show'"
                            v-model="storySituation.storyContent"
                            :rows="5"
                            v-if="
                              storySituation.codeLanguage ===
                              coreAbility.defaultLanguage
                            "
                            :placeholder="
                              getPlaceholderStory(
                                childAbility.listStorySituation,
                                storySituation.codeLanguage
                              )
                            "
                            required
                          >
                          </TextArea>
                        </div>
                      </td>
                    </tr>
                    <template
                      v-for="abilityCmpnElem in childAbility.listAbilityCmpnElem"
                      :key="abilityCmpnElem.cmpnElemSeq"
                    >
                      <template
                        v-for="(qa, indexQa) in abilityCmpnElem.listQuesAndAns"
                        :key="qa.codeLanguage"
                      >
                        <tr
                          v-if="qa.codeLanguage === coreAbility.defaultLanguage"
                        >
                          <th scope="row" :rowspan="6">
                            <p>{{ abilityCmpnElem.elemNm }}</p>
                          </th>
                          <th>
                            {{
                              t(
                                "07.coreCompetencyDiagnosticSheet.detail.question"
                              )
                            }}
                          </th>
                          <td>
                            <InputBase
                              :mode="'show'"
                              :id="
                                'question' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              :name="
                                'question' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              v-model="qa.quesContent"
                              :placeholder="
                                getPlaceholderContentQuestion(
                                  abilityCmpnElem.listQuesAndAns,
                                  qa.codeLanguage
                                )
                              "
                              required
                            ></InputBase>
                          </td>
                        </tr>
                        <tr
                          v-if="qa.codeLanguage === coreAbility.defaultLanguage"
                        >
                          <th>
                            {{
                              "5" +
                              t("07.coreCompetencyDiagnosticSheet.detail.level")
                            }}
                          </th>
                          <td>
                            <InputBase
                              :mode="'show'"
                              :id="
                                'level5' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              :name="
                                'level5' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              v-model="qa.contentLevel5"
                              :placeholder="
                                getPlaceholderContentLevel(
                                  abilityCmpnElem.listQuesAndAns,
                                  qa.codeLanguage,
                                  5
                                )
                              "
                              required
                            ></InputBase>
                          </td>
                        </tr>
                        <tr
                          v-if="qa.codeLanguage === coreAbility.defaultLanguage"
                        >
                          <th>
                            {{
                              "4" +
                              t("07.coreCompetencyDiagnosticSheet.detail.level")
                            }}
                          </th>
                          <td>
                            <InputBase
                              :mode="'show'"
                              :id="
                                'level4' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              :name="
                                'level4' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              v-model="qa.contentLevel4"
                              :placeholder="
                                getPlaceholderContentLevel(
                                  abilityCmpnElem.listQuesAndAns,
                                  qa.codeLanguage,
                                  4
                                )
                              "
                              required
                            ></InputBase>
                          </td>
                        </tr>
                        <tr
                          v-if="qa.codeLanguage === coreAbility.defaultLanguage"
                        >
                          <th>
                            {{
                              "3" +
                              t("07.coreCompetencyDiagnosticSheet.detail.level")
                            }}
                          </th>
                          <td>
                            <InputBase
                              :mode="'show'"
                              :id="
                                'level3' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              :name="
                                'level3' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              v-model="qa.contentLevel3"
                              :placeholder="
                                getPlaceholderContentLevel(
                                  abilityCmpnElem.listQuesAndAns,
                                  qa.codeLanguage,
                                  3
                                )
                              "
                              required
                            ></InputBase>
                          </td>
                        </tr>
                        <tr
                          v-if="qa.codeLanguage === coreAbility.defaultLanguage"
                        >
                          <th>
                            {{
                              "2" +
                              t("07.coreCompetencyDiagnosticSheet.detail.level")
                            }}
                          </th>
                          <td>
                            <InputBase
                              :mode="'show'"
                              :id="
                                'level2' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              :name="
                                'level2' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              v-model="qa.contentLevel2"
                              :placeholder="
                                getPlaceholderContentLevel(
                                  abilityCmpnElem.listQuesAndAns,
                                  qa.codeLanguage,
                                  2
                                )
                              "
                              required
                            ></InputBase>
                          </td>
                        </tr>
                        <tr
                          v-if="qa.codeLanguage === coreAbility.defaultLanguage"
                        >
                          <th>
                            {{
                              "1" +
                              t("07.coreCompetencyDiagnosticSheet.detail.level")
                            }}
                          </th>
                          <td>
                            <InputBase
                              :mode="'show'"
                              :id="
                                'level1' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              :name="
                                'level1' +
                                abilityCmpnElem.cmpnElemSeq +
                                qa.codeLanguage
                              "
                              v-model="qa.contentLevel1"
                              :placeholder="
                                getPlaceholderContentLevel(
                                  abilityCmpnElem.listQuesAndAns,
                                  qa.codeLanguage,
                                  1
                                )
                              "
                              required
                            ></InputBase>
                          </td>
                        </tr>
                      </template>
                    </template>
                  </tbody>
                </table>
              </div>
            </CollapseBase>
          </div>
        </div>
        <div class="dp_flex btn_group btn_end floating-btn" style="gap: 10px">
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
            {{ t("common.deleteItem") }}
          </button>
          <button
            type="button"
            class="btn_round btn_xs btn_primary"
            @click="confirmSave()"
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
import {
  MODE_CREATE,
  MODE_DETAIL,
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import { defineComponent } from "vue";
import { SCREEN } from "../../../router/screen";
import {
  LANGUAGE_CHINA_CODE,
  LANGUAGE_ENGLISH_CODE,
  LANGUAGE_KOREA_CODE,
  MESSAGE_ERROR_API,
  MULTI_LANGUAGE_N,
  MULTI_LANGUAGE_Y,
  STATUS_0,
  STATUS_1,
  STATUS_NO,
  STATUS_YES,
  STS_CD_SAVE,
  STS_CD_SAVE_TEMP,
  UP_CD_ID_MULTI_LANG_USE_YN,
  UP_CD_ID_USE_YN,
} from "../../../constants/common.const";
import { useRouter } from "vue-router";
import {
  CoreAbilitySurveyCrudModel,
  CoreAbiSurAbilityCmpnElemModel,
  CoreAbiSurQuesAnsModel,
  StorySituationLanguageModel,
} from "../../../stores/coreCompetencyDiagnosis/coreCompetencyDiagnosticSheet/coreCompetencyDiagnosticSheet.type";
import {
  deleteCoreAbilitySurvey,
  getDataDetail,
  getDataRegister,
  saveCoreAbilitySurvey,
} from "../../../stores/coreCompetencyDiagnosis/coreCompetencyDiagnosticSheet/coreCompetencyDiagnosticSheet.service";
import { commonStore } from "../../../stores/common";
import Swal from "sweetalert2";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";

export default defineComponent({
  name: "CoreCompetencyDiagnosticSheetList",
  components: { Breadcrumb, LinkGridComponent },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  watch: {
    "dataDetail.multiLanguage"(newValue, oldValue) {
      this.dataDetail.listCoreAbility.forEach((item) => {
        item.defaultLanguage = this.languageKR;
      });
    },
    dataDetail: {
      deep: true,
      handler(newVal) {
        this.updateFullEntryStatus(newVal);
      },
    },
  },
  data() {
    return {
      modalOpen: false,
      id: "",
      modeScreen: "",
      multiLanguageY: MULTI_LANGUAGE_Y,
      multiLanguageN: MULTI_LANGUAGE_N,
      statusSaveTemp: STS_CD_SAVE_TEMP,
      statusSave: STS_CD_SAVE,
      languageKR: LANGUAGE_KOREA_CODE,
      languageCN: LANGUAGE_CHINA_CODE,
      languageEN: LANGUAGE_ENGLISH_CODE,
      listUseYn: [],
      listLanguageYn: [],
      pageTitle: this.t(
        "07.coreCompetencyDiagnosticSheet.detail.pageTitleDetail"
      ),
      breadcrumbItems: [],
      dataDetail: {} as CoreAbilitySurveyCrudModel,
    };
  },
  beforeMount() {
    this.id = window.history.state.id;
    this.getCodeMultiLangUseYn();
    this.getCodeUseYn();
    this.modeScreen = this.$route.params.mode;
    if (this.modeScreen === MODE_CREATE) {
      this.getDataRegisterCoreAbilitySurvey();
    }

    if (this.modeScreen === MODE_DETAIL) {
      this.getDataDetailCoreAbilitySurvey();
    }
  },
  methods: {
    reset() {},
    getCodeUseYn() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_USE_YN }).then((response) => {
        response.data.data.forEach((item) => {
          this.listUseYn.push(item);
        });
      });
    },
    getCodeMultiLangUseYn() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_MULTI_LANG_USE_YN }).then(
        (response) => {
          response.data.data.forEach((item) => {
            this.listLanguageYn.push(item);
          });
        }
      );
    },
    getDataRegisterCoreAbilitySurvey() {
      this.cmn.setLoading(true);
      getDataRegister()
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.dataDetail = res.data.data;
            this.cmn.setLoading(false);
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    getDataDetailCoreAbilitySurvey() {
      this.cmn.setLoading(true);
      getDataDetail({ surveySeq: this.id })
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.dataDetail = res.data.data;
            this.cmn.setLoading(false);
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.cmn.setLoading(false);
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
        text: this.t(
          "07.coreCompetencyDiagnosticSheet.detail.messageConfirmSave"
        ),
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
      if (!this.dataDetail.surveyNm) {
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
          "07.coreCompetencyDiagnosticSheet.detail.messageConfirmSaveTemp"
        ),
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
    saveData(type: string) {
      this.dataDetail.stsCd =
        type === "save" ? this.statusSave : this.statusSaveTemp;
      this.cmn.setLoading(true);
      saveCoreAbilitySurvey(this.dataDetail)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.dataDetail.surveySeq = res.data.data;
            this.cmn.setLoading(false);
            if (type === "save") {
              this.$swal({
                text: this.t(
                  "07.coreCompetencyDiagnosticSheet.detail.messageSuccessSave"
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
                  "07.coreCompetencyDiagnosticSheet.detail.messageSuccessSaveTemp"
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
          this.cmn.setLoading(false);
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
          this.delete();
        }
      });
    },
    delete() {
      this.cmn.setLoading(true);
      deleteCoreAbilitySurvey({ surveySeq: this.id })
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.cmn.setLoading(false);
            this.$swal({
              text: this.t(
                "07.coreCompetencyDiagnosticSheet.detail.messageSuccessDelete"
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
      for (var coreCap of this.dataDetail.listCoreAbility) {
        if (coreCap.coreAbilitySeq === item.coreAbilitySeq) {
          item.defaultLanguage = code;
        }
      }
    },
    backList() {
      this.$router.push({
        name: SCREEN.coreCompetencyDiagnosticSheet.name,
      });
    },
    getPlaceholderStory(list: any, codeLanguage: any) {
      if (
        codeLanguage === LANGUAGE_CHINA_CODE ||
        codeLanguage === LANGUAGE_ENGLISH_CODE
      ) {
        const koStory = list.find(
          (s: any) => s.codeLanguage === LANGUAGE_KOREA_CODE
        );
        return koStory ? koStory.storyContent : "";
      }
      return "";
    },
    getPlaceholderContentQuestion(list: any, codeLanguage: any) {
      if (
        codeLanguage === LANGUAGE_CHINA_CODE ||
        codeLanguage === LANGUAGE_ENGLISH_CODE
      ) {
        const koQuestion = list.find(
          (s: any) => s.codeLanguage === LANGUAGE_KOREA_CODE
        );
        return koQuestion ? koQuestion.quesContent : "";
      }
      return "";
    },
    getPlaceholderContentLevel(list: any, codeLanguage: any, level: any) {
      if (
        codeLanguage === LANGUAGE_CHINA_CODE ||
        codeLanguage === LANGUAGE_ENGLISH_CODE
      ) {
        const koItem = list.find(
          (s: any) => s.codeLanguage === LANGUAGE_KOREA_CODE
        );
        if (koItem) {
          switch (level) {
            case 1:
              return koItem.contentLevel1;
            case 2:
              return koItem.contentLevel2;
            case 3:
              return koItem.contentLevel3;
            case 4:
              return koItem.contentLevel4;
            case 5:
              return koItem.contentLevel5;
            default:
              return "";
          }
        }
      }
      return "";
    },
    checkFullEntryForLanguage(
      listStorySituation: Array<StorySituationLanguageModel>,
      listQuesAns: Array<CoreAbiSurQuesAnsModel>,
      languageCode: string
    ) {
      const storyContentFull = listStorySituation
        .filter((story) => story.codeLanguage === languageCode)
        .every(
          (story) => story.storyContent && story.storyContent.trim() !== ""
        );

      const quesAnsFull = listQuesAns
        .filter((quesAns) => quesAns.codeLanguage === languageCode)
        .every(
          (quesAns) =>
            this.isNotBlankAndTrimmed(quesAns.quesContent) &&
            this.isNotBlankAndTrimmed(quesAns.contentLevel1) &&
            this.isNotBlankAndTrimmed(quesAns.contentLevel2) &&
            this.isNotBlankAndTrimmed(quesAns.contentLevel3) &&
            this.isNotBlankAndTrimmed(quesAns.contentLevel4) &&
            this.isNotBlankAndTrimmed(quesAns.contentLevel5)
        );

      return storyContentFull && quesAnsFull;
    },
    isNotBlankAndTrimmed(value) {
      return value && value.trim() !== "";
    },
    updateFullEntryStatus(
      coreAbilitySurveyCrudModel: CoreAbilitySurveyCrudModel
    ) {
      coreAbilitySurveyCrudModel.listCoreAbility?.forEach((coreAbility) => {
        const allStorySituations = [] as Array<StorySituationLanguageModel>;
        const allQuesAndAns = [] as Array<CoreAbiSurQuesAnsModel>;

        coreAbility.listChildAbility?.forEach((childAbility) => {
          childAbility.listStorySituation?.forEach((storySituation) => {
            allStorySituations.push(storySituation);
          });

          childAbility.listAbilityCmpnElem?.forEach((cmpnElem) => {
            cmpnElem.listQuesAndAns?.forEach((quesAns) => {
              allQuesAndAns.push(quesAns);
            });
          });
        });

        if (coreAbilitySurveyCrudModel.multiLanguage === this.multiLanguageN) {
          coreAbility.isFullEntryKR = this.checkFullEntryForLanguage(
            allStorySituations,
            allQuesAndAns,
            this.languageKR
          );
        } else if (
          coreAbilitySurveyCrudModel.multiLanguage === this.multiLanguageY
        ) {
          coreAbility.isFullEntryKR = this.checkFullEntryForLanguage(
            allStorySituations,
            allQuesAndAns,
            this.languageKR
          );
          coreAbility.isFullEntryCN = this.checkFullEntryForLanguage(
            allStorySituations,
            allQuesAndAns,
            this.languageCN
          );
          coreAbility.isFullEntryEN = this.checkFullEntryForLanguage(
            allStorySituations,
            allQuesAndAns,
            this.languageEN
          );
        }
      });
    },
  },
});
</script>
<style scoped>
.instruct-content {
  color: red;
}

.floating-btn {
  position: fixed;
  bottom: 8%;
  right: 5%;
  display: flex;
  align-items: center;
  z-index: 1000;
}
</style>
