<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle"></Breadcrumb>
      <div class="box dp_block mg_b30">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.surveySatisfile.formAdd.title") }}
          </p>
          <table class="tbl_row tbl_border">
            <colgroup>
              <col style="width: 15%" />
              <col style="width: auto" />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.surveySatisfile.formAdd.field1") }}
                  </p>
                </th>
                <td class="td_input">
                  <InputBase
                    :id="'surveyName'"
                    :name="'surveyName'"
                    v-model="dataForm.diagNm"
                    required
                  ></InputBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.surveySatisfile.formAdd.field2") }}
                  </p>
                </th>
                <td>
                  <div
                    class="search_flex"
                    style="position: relative; width: 50%"
                  >
                    <BaseDatePicker
                      :placeholder="t('common.startDate')"
                      required
                      :id="'startDatePicker'"
                      v-model="dataForm.diagDurStr"
                    >
                    </BaseDatePicker>
                    <span> ~ </span>
                    <BaseDatePicker
                      :placeholder="t('common.endDate')"
                      required
                      :id="'endDatePicker'"
                      v-model="dataForm.diagDurEnd"
                    >
                    </BaseDatePicker>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.surveySatisfile.formAdd.field3") }}
                  </p>
                </th>
                <td class="td_input">
                  <p>
                    {{
                      dataForm.listIdProfessor
                        ? dataForm.listIdProfessor.length
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : 0
                    }}
                    {{ t("07.surveySatisfile.formAdd.people") }}
                    <button
                      type="button"
                      class="btn_round btn_sm btn_gray ml_3"
                      @click="openModalObject"
                    >
                      {{ t("07.surveySatisfile.formAdd.openModalObject") }}
                    </button>
                  </p>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  {{ t("07.surveySatisfile.formAdd.field4") }}
                </th>
                <td>
                  <QuillEditor
                    :modules="modules"
                    toolbar="full"
                    class="quill-editor-custom"
                    @editorChange="changeEditorDiagnosticGuide()"
                    ref="diagnosticGuide"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="box dp_block">
        <div class="box_section">
          <div
            class="box__title search_flex mb_7"
            style="justify-content: space-between"
          >
            <p class="box_title_sm mb-0">
              {{ t("07.surveySatisfile.formAdd.title1") }}
            </p>
            <div>
              <button
                class="btn_round btn_primary btn_md"
                @click="addQuestion()"
                :disabled="isDisabled"
              >
                {{ t("07.surveySatisfile.formAdd.button2") }}
              </button>
            </div>
          </div>
          <div class="scrollx_table">
            <table class="tbl_col tbl_border">
              <colgroup>
                <col style="width: 4%" />
                <col style="width: 10%" />
                <col style="width: 20%" />
                <col style="width: 24%" />
                <col style="width: 7%" />
                <col style="width: 6%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">
                    {{ t("common.rowNum") }}
                  </th>
                  <th scope="col">
                    {{ t("07.surveySatisfile.formAdd.table1") }}
                  </th>
                  <th scope="col">
                    {{ t("07.surveySatisfile.formAdd.table2") }}
                  </th>
                  <th scope="col">
                    {{ t("07.surveySatisfile.formAdd.table3") }}
                  </th>
                  <th scope="col">
                    {{ t("07.surveySatisfile.formAdd.table4") }}
                  </th>
                  <th scope="col">
                    {{ t("07.surveySatisfile.formAdd.table5") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(question, indexQus) in dataForm.listQuestion"
                  :key="indexQus"
                >
                  <template v-if="question.delYn !== statusY">
                    <td style="text-align: center">
                      <p>{{ question.ordNo }}</p>
                    </td>
                    <td>
                      <SelectBoxBase
                        :id="'typeQuestion_' + indexQus"
                        name="'selectbox'"
                        v-model="question.qusTypeCd"
                        :data="listTypeQuestion"
                        :isDisable="isDisabled"
                        v-if="listTypeQuestion.length > 0"
                      >
                      </SelectBoxBase>
                    </td>
                    <td>
                      <p>
                        <InputBase
                          :id="'question_' + indexQus"
                          :name="'question_' + indexQus"
                          v-model="question.cont"
                          :placeholder="
                            t('07.surveySatisfile.formAdd.placeholderQus')
                          "
                          :disabled="isDisabled"
                        ></InputBase>
                      </p>
                    </td>
                    <td>
                      <div
                        v-for="(answer, indexAns) in question.listAnswer"
                        :key="indexAns"
                        v-if="question.qusTypeCd === qusType03"
                      >
                        <template v-if="answer.delYn !== statusY">
                          <div
                            :class="['search_flex', { mt_2: indexAns != 0 }]"
                            style="justify-content: space-between"
                          >
                            <div style="width: 84%">
                              <InputBase
                                :id="'answer_' + indexQus + indexAns"
                                :name="'answer_' + indexQus + indexAns"
                                v-model="answer.cont"
                                :placeholder="
                                  t(
                                    '07.surveySatisfile.formAdd.placeholderNoBoss1'
                                  ) +
                                  answer.ordNo +
                                  t(
                                    '07.surveySatisfile.formAdd.placeholderNoBoss2'
                                  )
                                "
                                :disabled="isDisabled"
                                :required="
                                  question.qusTypeCd === qusType03 &&
                                  answer.ordNo === 1
                                "
                              ></InputBase>
                            </div>
                            <div>
                              <button
                                v-if="indexAns == 0"
                                class="btn_round btn_sm btn_primary"
                                @click="addAnswer(indexQus)"
                                :disabled="isDisabled"
                              >
                                {{ t("common.add") }}
                              </button>
                              <button
                                v-if="indexAns != 0"
                                class="btn_round btn_sm btn_gray"
                                @click="confirmRemoveAnswer(indexQus, indexAns)"
                                :disabled="isDisabled"
                              >
                                {{ t("common.deleteItem") }}
                              </button>
                            </div>
                          </div></template
                        >
                      </div>
                      <div
                        v-if="question.qusTypeCd === qusTypeScore5"
                        class="text-gray"
                      >
                        {{ t("07.surveySatisfile.formAdd.placeholderScore5") }}
                      </div>
                      <div
                        v-if="question.qusTypeCd === qusType02"
                        class="text-gray"
                      >
                        {{ t("07.surveySatisfile.formAdd.placeholderBoss") }}
                      </div>
                    </td>
                    <td>
                      <div class="flex-custom">
                        <button
                          v-if="
                            dataForm.listQuestion.length > 1 && indexQus != 0
                          "
                          class="button btn_sm btn_white mx-1"
                          @click="changePositon(indexQus, 'UP')"
                          :title="t('07.surveySatisfile.formAdd.up')"
                          :disabled="isDisabled"
                        >
                          🔼
                        </button>
                        <button
                          v-if="
                            dataForm.listQuestion.length > 1 &&
                            indexQus != dataForm.listQuestion.length - 1
                          "
                          class="button btn_sm btn_white mx-1"
                          @click="changePositon(indexQus, 'DOWN')"
                          :title="t('07.surveySatisfile.formAdd.down')"
                          :disabled="isDisabled"
                        >
                          🔽
                        </button>
                      </div>
                    </td>
                    <td>
                      <div
                        class="cursor-pointer-delete"
                        @click="confirmRemoveQuestion(indexQus)"
                        v-if="!isDisabled"
                      >
                        {{ t("07.surveySatisfile.formAdd.deleteItem") }}
                      </div>
                    </td></template
                  >
                </tr>
              </tbody>
            </table>
          </div>
          <div class="box_section">
            <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
              <button
                type="button"
                class="btn_round btn_md btn_gray"
                v-if="modeScreen === modeDetail"
                @click="confirmDeleteSurvey"
              >
                {{ t("07.surveySatisfile.formAdd.button3") }}
              </button>
              <button
                type="button"
                class="btn_round btn_primary btn_md"
                @click="confirmSaveData"
              >
                {{ t("07.surveySatisfile.formAdd.button4") }}
              </button>
              <button
                type="button"
                class="btn_round btn_white btn_md"
                @click="back()"
              >
                {{ t("07.surveySatisfile.formAdd.button5") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <SurveyAddObjectModal
    @data-selected="changeObjectSelected"
    v-if="isOpenModalObject"
    :isOpen="isOpenModalObject"
    :rowCheck="dataForm.listIdProfessor"
    :onClose="onCloseModalObject"
    :diagSeq="id"
    @select-item="handleSelectItem"
  ></SurveyAddObjectModal>
  <CallSurvey
    :isOpen="isOpenModalCall"
    :onClose="onCloseModalCall"
    @select-item="handleSelectQuestionCallSurvey"
  ></CallSurvey>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import { commonStore } from "@/stores/common";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import {
  PAGINATION_PAGE_SIZE_SELECTOR,
  PAGINATION_PAGE_SIZE,
} from "@/constants/screen.const";
import { SCREEN } from "@/router/screen";
import SurveyAddObjectModal from "../modal/SurveyAddObjectModal.vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import ImageUploader from "quill-image-uploader";
import { QuillEditor } from "@vueup/vue-quill";
import { uploadFileEditor } from "@/stores/common/fileMng/fileMng.service";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
import {
  QUS_TYPE_02,
  QUS_TYPE_03,
  QUS_TYPE_SCORE_5,
  STATUS_NO,
  STATUS_YES,
  UP_CD_ID_QUS_TYPE_CD,
} from "../../../constants/common.const";
import {
  SurveyInSchoolQuestionModel,
  SurveyInSchoolReqModel,
} from "../../../stores/survey/inSchool/surveyInSchool.type";
import {
  MODE_CREATE,
  MODE_DETAIL,
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import {
  deleteSurveyInSchool,
  detailSurveyInSchool,
  saveSurveyInSchool,
} from "../../../stores/survey/inSchool/surveyInSchool.service";
import CallSurvey from "../modal/CallSurvey.vue";

export default {
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    SurveyAddObjectModal,
    CallSurvey,
    BaseDatePicker,
    QuillEditor,
  },
  setup() {
    const cmn = commonStore();
    const { t } = useI18n();

    return {
      cmn,
      t,
    };
  },
  watch: {
    "dataForm.diagDurStr"(newValue) {
      if (!this.dataForm.diagDurEnd) {
        this.dataForm.diagDurStr = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.dataForm.diagDurEnd);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.dataForm.diagDurStr = this.dataForm.diagDurEnd;
            this.$swal({
              text: this.t("common.messageCheckDate"),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
    "dataForm.diagDurEnd"(newValue) {
      if (!this.dataForm.diagDurStr) {
        this.dataForm.diagDurEnd = newValue;
      } else {
        const dStart = this.formatDate(this.dataForm.diagDurStr);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.dataForm.diagDurEnd = this.dataForm.diagDurStr;
            this.$swal({
              text: this.t("common.messageCheckDate"),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
  },
  data() {
    return {
      pageTitle: this.t("07.surveySatisfile.formAdd.pageTitle"),
      statusN: STATUS_NO,
      statusY: STATUS_YES,
      id: "",
      modeScreen: "" as any,
      isOpenModalObject: false,
      isOpenModalCall: false,
      modeDetail: MODE_DETAIL,
      paginationPageSize: PAGINATION_PAGE_SIZE,
      paginationPageSizeSelector: PAGINATION_PAGE_SIZE_SELECTOR,
      listTypeQuestion: [] as Array<any>,
      dataForm: {} as SurveyInSchoolReqModel,
      qusTypeScore5: QUS_TYPE_SCORE_5,
      qusType03: QUS_TYPE_03,
      qusType02: QUS_TYPE_02,
      isDisabled: false,
      domainClient:
        import.meta.env.VITE_CLIENT_ENDPOINT + SCREEN.surveySatisfiedList.path,
      modules: {
        name: "imageUploader",
        module: ImageUploader,
        options: {
          upload: (file: any) => {
            return new Promise((resolve, reject) => {
              if (!file) {
                reject("Upload failed");
              } else {
                this.cmn.setLoading(true);
                const formData = new FormData();
                formData.append("file", file);
                formData.append("category", "SURVEY_IN_SCHOOL_EDITOR");
                formData.append("orgName", "SURVEY_IN_SCHOOL_EDITOR");
                formData.append("sectionName", "SURVEY_IN_SCHOOL_EDITOR");
                uploadFileEditor(formData)
                  .then((res: any) => {
                    resolve(res.data.data.urlFile);
                    this.cmn.setLoading(false);
                  })
                  .catch((err: any) => {
                    reject("Upload failed");
                  });
              }
            });
          },
        },
      },
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.getQusTypeCd();
    this.id = window.history.state.id;
    if (this.modeScreen === MODE_CREATE) {
      this.dataForm = {
        diagSeq: null,
        diagNm: "",
        diagDurStr: "",
        diagDurEnd: "",
        diagnosticGuide: "<p><br /></p>",
        listIdProfessor: [],
        surveyUrl: this.domainClient,
        listQuestion: [],
      };
    }
    if (this.modeScreen === MODE_DETAIL) {
      this.getDataDetail();
    }
    this.dataForm.isCallSurvey = false;
  },
  computed: {
    isRequiredValidate() {
      const { check } = this.cmn;

      const listIdProfessor = this.dataForm.listIdProfessor;
      const diagnosticGuide = this.dataForm.diagnosticGuide;

      return check || listIdProfessor.length === 0 || !diagnosticGuide;
    },
  },
  methods: {
    getDataDetail() {
      this.cmn.setLoading(true);
      detailSurveyInSchool({ diagSeq: this.id }).then((res) => {
        this.dataForm = res.data.data;
        this.isDisabled = this.dataForm.isDisabled;
        if (this.id && this.$refs.diagnosticGuide) {
          this.$refs.diagnosticGuide.setHTML(this.dataForm.diagnosticGuide);
        }

        this.cmn.setLoading(false);
      });
    },
    confirmSaveData() {
      if (this.isRequiredValidate) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.confirm"),
        }).then(() => {});
        return;
      }
      this.$swal({
        text: this.t("07.surveySatisfile.formAdd.messageConfirmSave"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.saveData();
        }
      });
    },
    handleSelectItem(selectedItems: any) {
      this.dataForm.listIdProfessor = selectedItems;
    },
    handleSelectQuestionCallSurvey(
      listQuestion: Array<SurveyInSchoolQuestionModel>
    ) {
      this.dataForm.listQuestion = listQuestion;
      this.dataForm.isCallSurvey = true;
    },
    saveData() {
      this.cmn.setLoading(true);
      saveSurveyInSchool(this.dataForm)
        .then((res) => {
          this.$swal({
            text: this.t("07.surveySatisfile.formAdd.messageSuccessSave"),
            type: "success",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: this.t("common.confirm"),
          }).then(() => {
            this.back();
          });
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    async getQusTypeCd() {
      const response = await getCodeMngByUpCdId({
        upCdId: UP_CD_ID_QUS_TYPE_CD,
      });
      if (response.status === SUCCSESS_STATUS) {
        response.data.data.forEach((item: any) => {
          this.listTypeQuestion.push(item);
        });
      }
    },
    addQuestion() {
      const activeQuestionsCount =
        this.dataForm.listQuestion?.filter(
          (question) => question.delYn === this.statusN
        ).length || 0;

      const newQuestion = {
        qusSeq: null,
        qusTypeCd: QUS_TYPE_SCORE_5,
        cont: "",
        ordNo: activeQuestionsCount + 1,
        delYn: this.statusN,
        listAnswer: [{ ansSeq: null, cont: "", ordNo: 1, delYn: this.statusN }],
      };

      this.dataForm.listQuestion?.push(newQuestion);
    },
    confirmRemoveQuestion(indexQuestion: number) {
      this.$swal({
        text: this.t("07.surveySatisfile.formAdd.messageConfirmDeleteQus"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.deleteQuestion(indexQuestion);
        }
      });
    },
    deleteQuestion(indexQuestion: number) {
      const question = this.dataForm.listQuestion?.[indexQuestion];
      if (!question) return;

      if (question.qusSeq == null) {
        this.dataForm.listQuestion.splice(indexQuestion, 1);
      } else {
        question.delYn = this.statusY;
        question.listAnswer.forEach((answer) => {
          answer.delYn = this.statusY;
        });
      }

      let count = 1;
      this.dataForm.listQuestion.forEach((qus) => {
        if (qus.delYn === this.statusN) {
          qus.ordNo = count;
          count++;
        }
      });
    },
    changePositon(index: number, type: string) {
      let element = this.dataForm.listQuestion.splice(index, 1)[0];

      if (type === "UP" && index > 0) {
        this.dataForm.listQuestion.splice(index - 1, 0, element);
      } else if (type === "DOWN" && index < this.dataForm.listQuestion.length) {
        this.dataForm.listQuestion.splice(index + 1, 0, element);
      }

      let orderNumber = 1;
      this.dataForm.listQuestion.forEach((question) => {
        if (question.delYn !== "Y") {
          question.ordNo = orderNumber++;
        }
      });
    },
    addAnswer(index: number) {
      const question = this.dataForm.listQuestion?.[index];
      if (question) {
        const activeAnswersCount =
          question.listAnswer?.filter((answer) => answer.delYn === this.statusN)
            .length || 0;
        const newAnswer = {
          ansSeq: null,
          cont: "",
          ordNo: activeAnswersCount + 1,
          delYn: this.statusN,
        };
        question.listAnswer?.push(newAnswer);
      }
    },
    confirmRemoveAnswer(indexQuestion: number, indexAnswer: number) {
      this.$swal({
        text: this.t("07.surveySatisfile.formAdd.messageConfirmDeleteAns"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.deleteAnswer(indexQuestion, indexAnswer);
        }
      });
    },
    deleteAnswer(indexQuestion: number, indexAnswer: number) {
      const question = this.dataForm.listQuestion?.[indexQuestion];
      if (!question) return;

      const answer = question.listAnswer?.[indexAnswer];
      if (!answer) return;

      if (answer.ansSeq == null) {
        question.listAnswer.splice(indexAnswer, 1);
      } else {
        answer.delYn = this.statusY;
      }

      let count = 1;
      question.listAnswer.forEach((ans) => {
        if (ans.delYn === this.statusN) {
          ans.ordNo = count;
          count++;
        }
      });
    },
    confirmDeleteSurvey() {
      this.$swal({
        text: this.t("07.surveySatisfile.formAdd.messageConfirmDeleteSurvey"),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.deleteSurvey();
        }
      });
    },
    deleteSurvey() {
      this.cmn.setLoading(true);
      deleteSurveyInSchool({ diagSeq: this.id })
        .then((res) => {
          this.$swal({
            text: this.t("07.surveySatisfile.formAdd.messageSuccessDelete"),
            type: "success",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: this.t("common.confirm"),
          }).then(() => {
            this.back();
          });
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    back() {
      this.$router.push({ path: SCREEN.surveySatisfiedList.path });
    },
    changeEditorDiagnosticGuide() {
      this.dataForm.diagnosticGuide = this.$refs.diagnosticGuide
        .getHTML()
        .toString()
        .replace("<p><br></p>", "");
    },
    onCloseModalObject() {
      this.isOpenModalObject = false;
    },
    openModalObject() {
      this.isOpenModalObject = true;
    },
    changeObjectSelected(data: any) {
      this.dataForm.listIdProfessor = data;
    },
    onCloseModalCall() {
      this.isOpenModalCall = false;
    },
    openModalCall() {
      this.isOpenModalCall = true;
    },
    changeCallSelected(data: any) {
      this.dataForm.listIdProfessor = data;
    },
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style>
.quill-editor-custom .ql-editor {
  min-height: 175px;
}

.cursor-pointer-delete {
  color: #000aff;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
}

.text-gray {
  color: #9a9999;
}

.flex-custom {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
