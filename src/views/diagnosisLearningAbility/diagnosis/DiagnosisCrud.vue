<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{
              t(
                "07.diagnosisLearningAbility.diagnosis.crud.breadcrumb.titleTable"
              )
            }}
          </p>
          <table class="tbl_row">
            <caption>
              {{
                t(
                  "07.diagnosisLearningAbility.diagnosis.subTitlePagediagnosis.titleTable"
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
                        "07.diagnosisLearningAbility.diagnosis.crud.table.languageYn"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <RadiobuttonBase
                    v-for="item in listLanguageYn"
                    :mode="modeShow"
                    :value="item.cdId"
                    :id="'languageYn' + item.cdId"
                    :name="'languageYn' + item.cdId"
                    :key="'languageYn' + item.cdId"
                    :label="item.cdNm"
                    v-model="learnDiagnosisModel.languageYn"
                    :checked="item.cdId === learnDiagnosisModel.languageYn"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t("07.diagnosisLearningAbility.diagnosis.crud.table.name")
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <div>
                    <InputBase
                      :mode="modeShow"
                      :id="'nameSheet'"
                      :name="'nameSheet'"
                      :placeholder="
                        t('07.diagnosisLearningAbility.diagnosis.placeholderKR')
                      "
                      v-model="learnDiagnosisModel.name"
                      required
                    ></InputBase>
                  </div>
                  <div
                    class="mt-2"
                    v-if="learnDiagnosisModel.languageYn === multiLanguageY"
                  >
                    <InputBase
                      :mode="modeShow"
                      :id="'nameSheetCN'"
                      :name="'nameSheetCN'"
                      :placeholder="
                        t('07.diagnosisLearningAbility.diagnosis.placeholderCN')
                      "
                      v-model="learnDiagnosisModel.nameCn"
                      required
                    ></InputBase>
                  </div>
                  <div
                    class="mt-2"
                    v-if="learnDiagnosisModel.languageYn === multiLanguageY"
                  >
                    <InputBase
                      :mode="modeShow"
                      :id="'nameSheetEN'"
                      :name="'nameSheetEN'"
                      :placeholder="
                        t('07.diagnosisLearningAbility.diagnosis.placeholderEN')
                      "
                      v-model="learnDiagnosisModel.nameEn"
                      required
                    ></InputBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosis.crud.table.eduYear"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <div style="width: 15%">
                    <SelectBoxBase
                      :id="'selectYear'"
                      :name="'selectYear'"
                      :data="listYear"
                      v-model="learnDiagnosisModel.year"
                    >
                    </SelectBoxBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosis.crud.table.semester"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <RadiobuttonBase
                    v-for="item in listSemester"
                    :mode="modeShow"
                    :value="item.cdId"
                    :id="'semester' + item.cdId"
                    :name="'semester' + item.cdId"
                    :key="'semester' + item.cdId"
                    :label="item.cdNm"
                    v-model="learnDiagnosisModel.semester"
                    :checked="item.cdId === learnDiagnosisModel.semester"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosis.crud.table.diagnosisTime"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <div class="search_box col_4">
                    <div
                      class="search_flex"
                      style="position: relative; width: 50%"
                    >
                      <BaseDatePicker
                        :placeholder="t('common.startDate')"
                        v-model="learnDiagnosisModel.startDate"
                        required
                      >
                      </BaseDatePicker>
                      ~
                      <BaseDatePicker
                        :placeholder="t('common.endDate')"
                        v-model="learnDiagnosisModel.endDate"
                        required
                      >
                      </BaseDatePicker>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosis.crud.table.status"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <RadiobuttonBase
                    v-for="item in listShowYn"
                    :mode="modeShow"
                    :value="item.cdId"
                    :id="'useYn' + item.cdId"
                    :name="'useYn' + item.cdId"
                    :key="'useYn' + item.cdId"
                    :label="item.cdNm"
                    v-model="learnDiagnosisModel.status"
                    :checked="learnDiagnosisModel.status === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosis.crud.table.publicInfo"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <RadiobuttonBase
                    v-for="item in listPublicInfo"
                    :mode="modeShow"
                    :value="item.cdId"
                    :id="'publicInfo' + item.cdId"
                    :name="'publicInfo' + item.cdId"
                    :key="'publicInfo' + item.cdId"
                    :label="item.cdNm"
                    v-model="learnDiagnosisModel.publicInfoYn"
                    :checked="learnDiagnosisModel.publicInfoYn === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosis.crud.table.infomation"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <div>
                    <QuillEditor
                      :modules="modules"
                      toolbar="full"
                      class="quill-editor-custom"
                      @editorChange="changeEditorDiagnosticGuide()"
                      ref="diagnosticGuide"
                    />
                  </div>
                  <div
                    class="mt-2"
                    v-show="learnDiagnosisModel.languageYn === multiLanguageY"
                  >
                    <QuillEditor
                      class="quill-editor-custom"
                      :modules="modules"
                      toolbar="full"
                      @editorChange="changeEditorDiagnosticGuideCn()"
                      ref="diagnosticGuideCn"
                    />
                  </div>
                  <div
                    class="mt-2"
                    v-show="learnDiagnosisModel.languageYn === multiLanguageY"
                  >
                    <QuillEditor
                      :modules="modules"
                      class="quill-editor-custom"
                      toolbar="full"
                      @editorChange="changeEditorDiagnosticGuideEn()"
                      ref="diagnosticGuideEn"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosis.crud.table.object1"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      learnDiagnosisModel.listUniversity ||
                      modeScreen === modeCreate
                    "
                    :id="'listUniversity'"
                    :name="'listUniversity'"
                    :hasCheckAll="true"
                    :listData="listUniversity"
                    v-model="learnDiagnosisModel.listUniversity"
                    :useArray="true"
                    :requireId="'listRequiredUniversity'"
                    :isRequire="true"
                  ></ListCheckBoxBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosis.crud.table.object2"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <div
                    v-if="
                      learnDiagnosisModel.listUniversity &&
                      learnDiagnosisModel.listUniversity.length <
                        listUniversity.length &&
                      learnDiagnosisModel.listUniversity.length > 0
                    "
                  >
                    <ListCheckBoxBase
                      v-if="
                        (learnDiagnosisModel.listDepartment &&
                          listDepartment.length > 0) ||
                        modeScreen === modeCreate
                      "
                      :id="'listDepartment'"
                      :name="'listDepartment'"
                      :useArray="true"
                      :hasCheckAll="true"
                      :listData="listDepartment"
                      v-model="learnDiagnosisModel.listDepartment"
                      :requireId="'listRequiredDepartment'"
                      :isRequire="true"
                    ></ListCheckBoxBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosis.crud.table.object3"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <RadiobuttonBase
                    v-for="item in listGender"
                    :mode="modeShow"
                    :value="item.cdId"
                    :id="'object3' + item.cdId"
                    :name="'object3' + item.cdId"
                    :key="'object3' + item.cdId"
                    :label="item.cdNm"
                    v-model="learnDiagnosisModel.genderObject"
                    :checked="item.cdId === learnDiagnosisModel.genderObject"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosis.crud.table.object4"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      learnDiagnosisModel.listGrade || modeScreen === modeCreate
                    "
                    :id="'listYear'"
                    :name="'listYear'"
                    :hasCheckAll="true"
                    :useArray="true"
                    :listData="listYearLevel"
                    v-model="learnDiagnosisModel.listGrade"
                    :requireId="'listRequiredListYear'"
                    :isRequire="true"
                  ></ListCheckBoxBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t(
                        "07.diagnosisLearningAbility.diagnosis.crud.table.object5"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      learnDiagnosisModel.listPeopleInvolved ||
                      modeScreen === modeCreate
                    "
                    :id="'listPeopleInvolved'"
                    :name="'listPeopleInvolved'"
                    :hasCheckAll="true"
                    :useArray="true"
                    :listData="listTargetPerson"
                    v-model="learnDiagnosisModel.listPeopleInvolved"
                    :requireId="'listRequiredPeopleInvolved'"
                    :isRequire="true"
                  ></ListCheckBoxBase>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="tbl_row mt-8">
            <caption>
              {{
                t(
                  "07.diagnosisLearningAbility.diagnosis.crud.table.selectSheet"
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
                        "07.diagnosisLearningAbility.diagnosis.crud.table.selectSheet"
                      )
                    }}
                  </p>
                </th>
                <td colspan="3">
                  <div
                    class="search_flex"
                    style="position: relative; justify-content: space-between"
                  >
                    <div style="width: 94%">
                      <InputBase
                        :mode="modeShow"
                        :id="'selectCompSheet'"
                        :name="'selectCompSheet'"
                        v-model="learnDiagnosisModel.learnAbilitySurveyNm"
                        readonly
                        required
                      ></InputBase>
                    </div>
                    <div>
                      <button
                        type="button"
                        class="button btn_xs btn_blue btn_responsive"
                        @click="openModalCoreCompDiag"
                      >
                        {{ t("07.diagnosisLearningAbility.button.select") }}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="tbl_row mt-8">
            <caption>
              {{
                t("07.diagnosisLearningAbility.diagnosis.crud.table.question")
              }}
            </caption>
            <colgroup>
              <col style="width: 20%" />
              <col style="width: 40%" />
              <col style="width: 20%" />
              <col style="width: 40%" />
            </colgroup>
            <tbody>
              <template
                v-for="(
                  subjectiveType, index
                ) in learnDiagnosisModel.listSubjectiveType"
                :key="index"
              >
                <tr v-if="shouldShowRow(subjectiveType)">
                  <th scope="row">
                    <p>
                      <span v-if="subjectiveType.sbvtNumOrd > 1">{{
                        subjectiveType.sbvtNumOrd
                      }}</span>
                      {{
                        t(
                          "07.diagnosisLearningAbility.diagnosis.crud.table.question"
                        )
                      }}
                    </p>
                  </th>
                  <td colspan="3">
                    <div
                      class="search_flex"
                      style="position: relative; justify-content: space-between"
                    >
                      <div style="width: 94%">
                        <div
                          v-for="(itemSub, index) in subjectiveType.listItem"
                          :key="index"
                        >
                          <div
                            :class="index > 0 && 'mt-2'"
                            v-if="
                              itemSub.multiLanguageCd === languageKR ||
                              (itemSub.multiLanguageCd !== languageKR &&
                                learnDiagnosisModel.languageYn ===
                                  multiLanguageY)
                            "
                          >
                            <InputBase
                              :mode="modeShow"
                              :id="'subjectiveType' + index"
                              :name="'subjectiveType' + index"
                              v-model="itemSub.content"
                            ></InputBase>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          @click="createObjectSubjectiveType"
                          v-if="index === 0"
                          type="button"
                          :class="
                            learnDiagnosisModel.languageYn === multiLanguageY
                              ? 'button btn_xs btn_blue btn_responsive btn-select-subjective-type'
                              : 'button btn_xs btn_blue btn_responsive'
                          "
                        >
                          {{ t("common.add") }}</button
                        ><button
                          v-if="index > 0"
                          @click="deleteObjectSubjectType(index)"
                          type="button"
                          :class="
                            learnDiagnosisModel.languageYn === multiLanguageY
                              ? 'button btn_xs btn_gray btn_responsive btn-select-subjective-type'
                              : 'button btn_xs btn_gray btn_responsive'
                          "
                        >
                          {{ t("common.deleteItem") }}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr></template
              >
            </tbody>
          </table>
        </div>
        <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
          <button
            type="button"
            class="btn_round btn_xs btn_primary"
            @click="confirmSaveData"
          >
            {{ t("common.save") }}
          </button>
          <button class="btn_round btn_xs btn_white" @click="gotoList">
            {{ t("common.list") }}
          </button>
        </div>
      </div>
    </section>
  </div>
  <ModalDiagnosis
    :isOpen="modalOpenCoreCompDiag"
    @close-modal="closeModalCoreCompDiag"
    :multiLanguageUseYn="learnDiagnosisModel.languageYn"
  />
</template>
<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import CheckboxBase from "@/components/common/input/CheckboxBase.vue";
import {
  MODE_CREATE,
  MODE_DETAIL,
  MODE_SHOW,
} from "../../../constants/screen.const";
import {
  LearnAbilityDiagnosisModel,
  SubjectiveType,
} from "../../../stores/diagnosislearningAbility/diagLearnAbility/diagLearnAbility.type";
import ListCheckBoxBase from "@/components/common/input/ListCheckBoxBase.vue";
import ModalDiagnosis from "./ModalDiagnosis.vue";
import {
  LANGUAGE_CHINA_CODE,
  LANGUAGE_ENGLISH_CODE,
  LANGUAGE_KOREA_CODE,
  MESSAGE_ERROR_API,
  MULTI_LANGUAGE_N,
  MULTI_LANGUAGE_Y,
  PUBLIC_INFO_Y,
  SEMESTER_1,
  SHOW_Y,
  STATUS_NO,
  STATUS_YES,
  UP_CD_ID_GENDER,
  UP_CD_ID_GRADE_LEVEL,
  UP_CD_ID_MULTI_LANG_USE_YN,
  UP_CD_ID_PUBLIC_INFO,
  UP_CD_ID_SEMESTER,
  UP_CD_ID_SHOW_YN,
  UP_CD_ID_TARGET_PERSON,
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
} from "../../../constants/common.const";
import { SCREEN } from "../../../router/screen";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { commonStore } from "@/stores/common";
import {
  saveDiagLearnAbility,
  detailDiagLearnAbility,
} from "../../../stores/diagnosislearningAbility/diagLearnAbility/diagLearnAbility.service";
import { useI18n } from "vue-i18n";
import { defineComponent, ref } from "vue";
import { learnAbilityDiagnosisStore } from "../../../stores/diagnosislearningAbility/diagLearnAbility";
import { getDepartmentList } from "@/stores/common/department/department.service";
import ImageUploader from "quill-image-uploader";
import { QuillEditor } from "@vueup/vue-quill";
import { uploadFileEditor } from "@/stores/common/fileMng/fileMng.service";

export default defineComponent({
  name: "diagnosisLearningAbilityCrud",
  components: {
    Breadcrumb,
    LinkGridComponent,
    BaseDatePicker,
    CheckboxBase,
    ListCheckBoxBase,
    ModalDiagnosis,
    QuillEditor,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const learnAbiDiagStore = learnAbilityDiagnosisStore();
    return { t, cmn, learnAbiDiagStore };
  },
  data() {
    const currentYear = new Date().getFullYear();
    return {
      modalOpenCoreCompDiag: false,
      id: "",
      modedetail: MODE_DETAIL,
      modeCreate: MODE_CREATE,
      modeScreen: "" as String,
      modeShow: MODE_SHOW,
      languageKR: LANGUAGE_KOREA_CODE,
      languageCN: LANGUAGE_CHINA_CODE,
      languageEN: LANGUAGE_ENGLISH_CODE,
      yearCurrent: currentYear,
      statusYes: STATUS_YES,
      multiLanguageY: MULTI_LANGUAGE_Y,
      multiLanguageN: MULTI_LANGUAGE_N,
      statusNo: STATUS_NO,
      listYear: [
        { cdId: currentYear - 1, cdNm: currentYear - 1 },
        { cdId: currentYear, cdNm: currentYear },
        { cdId: currentYear + 1, cdNm: currentYear + 1 },
      ],
      listSemester: [],
      listPublicInfo: [],
      listShowYn: [],
      listLanguageYn: [],
      listUniversity: [],
      listDepartment: [],
      listDeparmentCopy: [],
      listGender: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listYearLevel: [],
      listTargetPerson: [],
      pageTitle: this.t(
        "07.diagnosisLearningAbility.diagnosis.breadcrumb.pageTitle"
      ),
      breadcrumbItems: [],
      learnDiagnosisModel: {} as LearnAbilityDiagnosisModel,
      learnAbilitySurSelected: null,
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
                formData.append("category", "DIAG_LEARN_ABILITY_EDITOR");
                formData.append("orgName", "DIAG_LEARN_ABILITY_EDITOR");
                formData.append("sectionName", "DIAG_LEARN_ABILITY_EDITOR");
                uploadFileEditor(formData)
                  .then((res) => {
                    resolve(res.data.data.urlFile);
                    this.cmn.setLoading(false);
                  })
                  .catch((err) => {
                    reject("Upload failed");
                  });
              }
            });
          },
        },
      },
      isDisabled: false,
    };
  },
  watch: {
    "learnAbiDiagStore.learnAbilitySurveySelected": function (newValue) {
      this.learnAbilitySurSelected = newValue;
      this.learnDiagnosisModel.learnAbilitySurveySeq =
        this.learnAbilitySurSelected.surveySeq;
      this.learnDiagnosisModel.learnAbilitySurveyNm =
        this.learnAbilitySurSelected.surveyNm;
    },
    "learnDiagnosisModel.startDate"(newValue) {
      if (!this.learnDiagnosisModel.endDate) {
        this.learnDiagnosisModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.learnDiagnosisModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.learnDiagnosisModel.startDate =
              this.learnDiagnosisModel.endDate;
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
    "learnDiagnosisModel.endDate"(newValue) {
      if (!this.learnDiagnosisModel.startDate) {
        this.learnDiagnosisModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(this.learnDiagnosisModel.startDate);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.learnDiagnosisModel.endDate =
              this.learnDiagnosisModel.startDate;
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
    "learnDiagnosisModel.listUniversity"(newValue, oldValue) {
      this.listDepartment = [];
      if (newValue.length > 0) {
        if (newValue.length < this.listUniversity.length) {
          this.getListDepartment();
        } else {
          this.learnDiagnosisModel.listDepartment = [];
        }
      } else {
        this.listDepartment = [];
      }
      if (newValue && oldValue && oldValue.length > newValue.length) {
        this.listDeparmentCopy = [];
      }
    },
  },
  computed: {
    isRequiredValidate() {
      const { check } = this.cmn;
      const {
        diagnosticGuide,
        diagnosticGuideCn,
        diagnosticGuideEn,
        languageYn,
      } = this.learnDiagnosisModel;

      const isMultiLanguageCheck =
        languageYn === this.multiLanguageY &&
        (!diagnosticGuideCn || !diagnosticGuideEn);

      return check || !diagnosticGuide || isMultiLanguageCheck;
    },
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.id = window.history.state.id;
    this.getListCode();
    if (this.modeScreen === MODE_CREATE) {
      this.learnDiagnosisModel.languageYn = MULTI_LANGUAGE_N;
      this.learnDiagnosisModel.year = this.yearCurrent + "";
      this.learnDiagnosisModel.semester = SEMESTER_1;
      this.learnDiagnosisModel.status = SHOW_Y;
      this.learnDiagnosisModel.publicInfoYn = PUBLIC_INFO_Y;
      this.learnDiagnosisModel.genderObject = "";
      this.learnDiagnosisModel.listSubjectiveType = [];
      this.learnDiagnosisModel.listGender = [];
      this.initDataSubjectType();
    }
    this.getListUniversity();
    if (this.modeScreen === MODE_DETAIL) {
      this.getDatadiagnosis();
    }
  },
  methods: {
    getDatadiagnosis() {
      this.cmn.setLoading(true);
      detailDiagLearnAbility({ diagSeq: this.id }).then((res) => {
        this.listDeparmentCopy = res.data.data.listDepartment;
        res.data.data.listDepartment = [];
        this.learnDiagnosisModel = res.data.data;

        this.isDisabled = this.learnDiagnosisModel.isDisabled;

        if (this.id && this.$refs.diagnosticGuide) {
          this.$refs.diagnosticGuide.setHTML(
            this.learnDiagnosisModel.diagnosticGuide
          );
        }
        if (this.id && this.$refs.diagnosticGuideCn) {
          this.$refs.diagnosticGuideCn.setHTML(
            this.learnDiagnosisModel.diagnosticGuideCn
          );
        }
        if (this.id && this.$refs.diagnosticGuideEn) {
          this.$refs.diagnosticGuideEn.setHTML(
            this.learnDiagnosisModel.diagnosticGuideEn
          );
        }
        if (this.learnDiagnosisModel.listSubjectiveType.length === 0) {
          this.initDataSubjectType();
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
      if (this.isDisabled) {
        this.$swal({
          text: this.t(
            "07.coreCompetencyDiagnosis.detail.messageValidateSaveDiag"
          ),
          type: "success",
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.t("common.confirm"),
        }).then(() => {});
        return;
      }
      this.$swal({
        text: this.t(
          "07.diagnosisLearningAbility.modalConfirm.titleConfirmSaveDiag"
        ),
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
    saveData() {
      this.updateDataGender();
      this.cmn.setLoading(true);
      saveDiagLearnAbility(this.learnDiagnosisModel)
        .then((res) => {
          this.$swal({
            text: this.t(
              "07.diagnosisLearningAbility.modalConfirm.titleModifySave"
            ),
            type: "success",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: this.t("common.confirm"),
          }).then(() => {
            this.gotoList();
          });
        })
        .catch((err) => {
          if (err.response.data.code === "400701") {
            this.$swal({
              text: this.t(
                "07.coreCompetencyDiagnosis.detail.messageValidateSaveDiag"
              ),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.confirm"),
            }).then(() => {});
            return;
          }
          if (err.response.data.code === "400702") {
            this.$swal({
              text: this.t(
                "07.coreCompetencyDiagnosis.detail.messageValidateQuantityDiagTarget"
              ),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.confirm"),
            }).then(() => {});
            return;
          }
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    getListDepartment() {
      this.cmn.setLoading(true);
      getDepartmentList({
        deptCd: [],
        deptDivCd: [],
        upDeptCd: this.learnDiagnosisModel.listUniversity,
        useYn: "",
      })
        .then((res) => {
          res.data.data.forEach((item) => {
            if (item.deptDivCd === DIV_CD_DEPT_DEPART) {
              this.listDepartment.push({
                cdId: item.deptCd,
                cdNm: item.deptNm,
              });
              this.cmn.setLoading(false);
            }
          });
          if (this.modeScreen === this.modedetail) {
            this.learnDiagnosisModel.listDepartment = this.listDeparmentCopy;
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    async getListUniversity() {
      try {
        this.cmn.setLoading(true);

        const res = await getDepartmentList({
          deptCd: [],
          deptDivCd: [DIV_CD_DEPT_MAJOR],
          upDeptCd: [],
          useYn: "",
        });

        res.data.data.forEach((item) => {
          if (item.deptDivCd === DIV_CD_DEPT_MAJOR) {
            this.listUniversity.push({
              cdId: item.deptCd,
              cdNm: item.deptNm,
            });
          }
        });
      } finally {
        this.cmn.setLoading(false);
      }
    },
    getListCode() {
      getListCodeMng({
        upCdIdList: [
          UP_CD_ID_PUBLIC_INFO,
          UP_CD_ID_SHOW_YN,
          UP_CD_ID_MULTI_LANG_USE_YN,
          UP_CD_ID_GRADE_LEVEL,
          UP_CD_ID_SEMESTER,
          UP_CD_ID_GENDER,
          UP_CD_ID_TARGET_PERSON,
        ],
      }).then((response) => {
        response.data.data.forEach((item) => {
          if (item.upCdId === UP_CD_ID_PUBLIC_INFO) {
            this.listPublicInfo.push(item);
          }
          if (item.upCdId === UP_CD_ID_SHOW_YN) {
            this.listShowYn.push(item);
          }
          if (item.upCdId === UP_CD_ID_MULTI_LANG_USE_YN) {
            this.listLanguageYn.push(item);
          }
          if (item.upCdId === UP_CD_ID_GRADE_LEVEL) {
            this.listYearLevel.push(item);
          }
          if (item.upCdId === UP_CD_ID_SEMESTER) {
            this.listSemester.push(item);
          }
          if (item.upCdId === UP_CD_ID_GENDER) {
            this.listGender.push(item);
          }
          if (item.upCdId === UP_CD_ID_TARGET_PERSON) {
            this.listTargetPerson.push(item);
          }
        });
      });
    },
    closeModalCoreCompDiag() {
      this.modalOpenCoreCompDiag = false;
    },
    openModalCoreCompDiag() {
      this.modalOpenCoreCompDiag = true;
    },
    gotoList() {
      this.$router.push({
        name: SCREEN.diagnosisLearningAbility.name,
      });
    },
    updateDataGender() {
      this.learnDiagnosisModel.listGender = [];
      if (this.learnDiagnosisModel.genderObject === "") {
        this.listGender.forEach((item) => {
          if (item.cdId !== "") {
            this.learnDiagnosisModel.listGender.push(item.cdId);
          }
        });
      } else {
        this.learnDiagnosisModel.listGender.push(
          this.learnDiagnosisModel.genderObject
        );
      }
    },
    createObjectSubjectiveType() {
      const activeSubjectiveTypesCount =
        this.learnDiagnosisModel.listSubjectiveType.filter(
          (subType) => subType.listItem[0].delYn === this.statusNo
        ).length;

      const subjectiveTypeIndex =
        this.learnDiagnosisModel.listSubjectiveType.findIndex(
          (subType) => subType.sbvtNumOrd === activeSubjectiveTypesCount + 1
        );

      if (subjectiveTypeIndex !== -1) {
        const subjectiveType =
          this.learnDiagnosisModel.listSubjectiveType[subjectiveTypeIndex];
        subjectiveType.listItem.forEach((item) => {
          item.delYn = this.statusNo;
          item.content = "";
        });
      } else {
        let newSubjectiveType = ref<SubjectiveType>({
          sbvtNumOrd: activeSubjectiveTypesCount + 1,
          listItem: [
            {
              sbvtSeq: null,
              multiLanguageCd: LANGUAGE_KOREA_CODE,
              content: "",
              delYn: this.statusNo,
            },
            {
              sbvtSeq: null,
              multiLanguageCd: LANGUAGE_CHINA_CODE,
              content: "",
              delYn: this.statusNo,
            },
            {
              sbvtSeq: null,
              multiLanguageCd: LANGUAGE_ENGLISH_CODE,
              content: "",
              delYn: this.statusNo,
            },
          ],
        });
        this.learnDiagnosisModel.listSubjectiveType.push(
          newSubjectiveType.value
        );
      }
    },
    deleteObjectSubjectType(index: number) {
      const subjectiveType = this.learnDiagnosisModel.listSubjectiveType[index];
      if (!subjectiveType) return;

      if (subjectiveType.listItem[0].sbvtSeq == null) {
        this.learnDiagnosisModel.listSubjectiveType.splice(index, 1);
      } else {
        subjectiveType.listItem.forEach((item, idx) => {
          item.delYn = this.statusYes;
        });
      }
      let count = 1;
      this.learnDiagnosisModel.listSubjectiveType.forEach((subType) => {
        if (subType.listItem[0].delYn === this.statusNo) {
          subType.sbvtNumOrd = count;
          count++;
        }
      });
    },
    shouldShowRow(subjectiveType: any) {
      return subjectiveType.listItem.some(
        (itemSub) => itemSub.delYn !== this.statusYes
      );
    },
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    changeEditorDiagnosticGuide() {
      this.learnDiagnosisModel.diagnosticGuide = this.$refs.diagnosticGuide
        .getHTML()
        .toString()
        .replace("<p><br></p>", "");
    },
    changeEditorDiagnosticGuideCn() {
      this.learnDiagnosisModel.diagnosticGuideCn = this.$refs.diagnosticGuideCn
        .getHTML()
        .toString()
        .replace("<p><br></p>", "");
    },
    changeEditorDiagnosticGuideEn() {
      this.learnDiagnosisModel.diagnosticGuideEn = this.$refs.diagnosticGuideEn
        .getHTML()
        .toString()
        .replace("<p><br></p>", "");
    },
    initDataSubjectType() {
      let objectSubjectiveType = ref<SubjectiveType>({
        sbvtNumOrd: 1,
        listItem: [],
      });
      objectSubjectiveType.value.listItem.push({
        sbvtSeq: null,
        multiLanguageCd: LANGUAGE_KOREA_CODE,
        content: "",
        delYn: this.statusNo,
      });
      objectSubjectiveType.value.listItem.push({
        sbvtSeq: null,
        multiLanguageCd: LANGUAGE_CHINA_CODE,
        content: "",
        delYn: this.statusNo,
      });
      objectSubjectiveType.value.listItem.push({
        sbvtSeq: null,
        multiLanguageCd: LANGUAGE_ENGLISH_CODE,
        content: "",
        delYn: this.statusNo,
      });
      this.learnDiagnosisModel.listSubjectiveType.push(
        objectSubjectiveType.value
      );
    },
  },
});
</script>
<style>
.btn-select-subjective-type {
  height: 135px;
}

@media (max-width: 768px) {
  .btn-select-subjective-type {
    height: 45px;
  }
}

.quill-editor-custom .ql-editor {
  min-height: 175px;
}
</style>
