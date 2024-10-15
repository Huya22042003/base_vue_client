<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.coreCompetencyDiagnosis.detail.subTitlePageDetail") }}
          </p>
          <table class="tbl_row">
            <caption>
              {{
                t("07.coreCompetencyDiagnosis.detail.subTitlePageDetail")
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
                    {{ t("07.coreCompetencyDiagnosis.detail.multiLanguageYn") }}
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
                    v-model="coreCompDiagnosisModel.languageYn"
                    :checked="item.cdId === coreCompDiagnosisModel.languageYn"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreCompetencyDiagnosis.detail.name") }}
                  </p>
                </th>
                <td colspan="3">
                  <div>
                    <InputBase
                      :mode="modeShow"
                      :id="'nameSheet'"
                      :name="'nameSheet'"
                      :placeholder="
                        t('07.coreCompetencyDiagnosis.detail.placeholderKR')
                      "
                      v-model="coreCompDiagnosisModel.name"
                      required
                    ></InputBase>
                  </div>
                  <div
                    class="mt-2"
                    v-if="coreCompDiagnosisModel.languageYn === multiLanguageY"
                  >
                    <InputBase
                      :mode="modeShow"
                      :id="'nameSheetCN'"
                      :name="'nameSheetCN'"
                      :placeholder="
                        t('07.coreCompetencyDiagnosis.detail.placeholderCN')
                      "
                      v-model="coreCompDiagnosisModel.nameCn"
                      required
                    ></InputBase>
                  </div>
                  <div
                    class="mt-2"
                    v-if="coreCompDiagnosisModel.languageYn === multiLanguageY"
                  >
                    <InputBase
                      :mode="modeShow"
                      :id="'nameSheetEN'"
                      :name="'nameSheetEN'"
                      :placeholder="
                        t('07.coreCompetencyDiagnosis.detail.placeholderEN')
                      "
                      v-model="coreCompDiagnosisModel.nameEn"
                      required
                    ></InputBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreCompetencyDiagnosis.detail.year") }}
                  </p>
                </th>
                <td colspan="3">
                  <div style="width: 15%">
                    <SelectBoxBase
                      :id="'selectYear'"
                      :name="'selectYear'"
                      :data="listYear"
                      v-model="coreCompDiagnosisModel.year"
                    >
                    </SelectBoxBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreCompetencyDiagnosis.detail.semester") }}
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
                    v-model="coreCompDiagnosisModel.semester"
                    :checked="item.cdId === coreCompDiagnosisModel.semester"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreCompetencyDiagnosis.detail.dateCoreComp") }}
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
                        v-model="coreCompDiagnosisModel.startDate"
                        required
                        :id="'startDatePicker'"
                      >
                      </BaseDatePicker>
                      ~
                      <BaseDatePicker
                        :placeholder="t('common.endDate')"
                        v-model="coreCompDiagnosisModel.endDate"
                        required
                        :id="'endDatePicker'"
                      >
                      </BaseDatePicker>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreCompetencyDiagnosis.detail.status") }}
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
                    v-model="coreCompDiagnosisModel.status"
                    :checked="coreCompDiagnosisModel.status === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreCompetencyDiagnosis.detail.publicInfo") }}
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
                    v-model="coreCompDiagnosisModel.publicInfoYn"
                    :checked="coreCompDiagnosisModel.publicInfoYn === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreCompetencyDiagnosis.detail.compPlan") }}
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
                    v-show="
                      coreCompDiagnosisModel.languageYn === multiLanguageY
                    "
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
                    v-show="
                      coreCompDiagnosisModel.languageYn === multiLanguageY
                    "
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
                    {{ t("07.coreCompetencyDiagnosis.detail.object1") }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      coreCompDiagnosisModel.listUniversity ||
                      modeScreen === modeCreate
                    "
                    :id="'listUniversity'"
                    :name="'listUniversity'"
                    :hasCheckAll="true"
                    :listData="listUniversity"
                    v-model="coreCompDiagnosisModel.listUniversity"
                    :useArray="true"
                    :requireId="'listRequiredListUniversity'"
                    :isRequire="true"
                  ></ListCheckBoxBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreCompetencyDiagnosis.detail.object2") }}
                  </p>
                </th>
                <td colspan="3">
                  <div
                    v-if="
                      coreCompDiagnosisModel.listUniversity &&
                      coreCompDiagnosisModel.listUniversity.length <
                        listUniversity.length &&
                      coreCompDiagnosisModel.listUniversity.length > 0
                    "
                  >
                    <ListCheckBoxBase
                      v-if="
                        (coreCompDiagnosisModel.listDepartment &&
                          listDepartment.length > 0) ||
                        modeScreen === modeCreate
                      "
                      :id="'listDepartment'"
                      :name="'listDepartment'"
                      :useArray="true"
                      :hasCheckAll="true"
                      :listData="listDepartment"
                      v-model="coreCompDiagnosisModel.listDepartment"
                      :requireId="'listRequiredListDepartment'"
                      :isRequire="true"
                    ></ListCheckBoxBase>
                  </div>
                  <div v-else>-</div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreCompetencyDiagnosis.detail.object3") }}
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
                    v-model="coreCompDiagnosisModel.genderObject"
                    :checked="item.cdId === coreCompDiagnosisModel.genderObject"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreCompetencyDiagnosis.detail.object4") }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      coreCompDiagnosisModel.listGrade ||
                      modeScreen === modeCreate
                    "
                    :id="'listYear'"
                    :name="'listYear'"
                    :hasCheckAll="true"
                    :useArray="true"
                    :listData="listYearLevel"
                    v-model="coreCompDiagnosisModel.listGrade"
                    :requireId="'listRequiredListYear'"
                    :isRequire="true"
                  ></ListCheckBoxBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreCompetencyDiagnosis.detail.object5") }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      coreCompDiagnosisModel.listPeopleInvolved ||
                      modeScreen === modeCreate
                    "
                    :id="'listPeopleInvolved'"
                    :name="'listPeopleInvolved'"
                    :hasCheckAll="true"
                    :useArray="true"
                    :listData="listTargetPerson"
                    v-model="coreCompDiagnosisModel.listPeopleInvolved"
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
                t("07.coreCompetencyDiagnosis.detail.selectCompSheet")
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
                    {{ t("07.coreCompetencyDiagnosis.detail.selectCompSheet") }}
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
                        v-model="coreCompDiagnosisModel.coreAbilitySurveyNm"
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
                        {{ t("07.coreCompetencyDiagnosis.detail.btnSelect") }}
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
                t("07.coreCompetencyDiagnosis.detail.subjectiveType")
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
                ) in coreCompDiagnosisModel.listSubjectiveType"
                :key="index"
              >
                <tr v-if="shouldShowRow(subjectiveType)">
                  <th scope="row">
                    <p>
                      <span v-if="subjectiveType.sbvtNumOrd > 1">{{
                        subjectiveType.sbvtNumOrd
                      }}</span>
                      {{
                        t("07.coreCompetencyDiagnosis.detail.subjectiveType")
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
                                coreCompDiagnosisModel.languageYn ===
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
                            coreCompDiagnosisModel.languageYn === multiLanguageY
                              ? 'button btn_xs btn_blue btn_responsive btn-select-subjective-type'
                              : 'button btn_xs btn_blue btn_responsive'
                          "
                        >
                          {{
                            t("07.coreCompetencyDiagnosis.detail.btnAdd")
                          }}</button
                        ><button
                          v-if="index > 0"
                          @click="deleteObjectSubjectType(index)"
                          type="button"
                          :class="
                            coreCompDiagnosisModel.languageYn === multiLanguageY
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
            class="button btn_xs btn_blue btn_responsive"
            @click="confirmSaveData"
          >
            {{ t("common.save") }}
          </button>
          <button class="button btn_xs btn_white" @click="gotoList">
            {{ t("common.list") }}
          </button>
        </div>
      </div>
    </section>
  </div>
  <ModalCoreCompDiagSheetList
    :isOpen="modalOpenCoreCompDiag"
    :multiLanguageUseYn="coreCompDiagnosisModel.languageYn"
    @close-modal="closeModalCoreCompDiag"
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
  CoreCompDiagnosisModel,
  SubjectiveType,
} from "../../../stores/coreCompetencyDiagnosis/coreCompetencyDiagnosis/coreCompetencyDiagnosis.type";
import ListCheckBoxBase from "@/components/common/input/ListCheckBoxBase.vue";
import ModalCoreCompDiagSheetList from "./ModalCoreCompDiagSheetList.vue";
import {
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
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
} from "../../../constants/common.const";
import { SCREEN } from "../../../router/screen";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import { commonStore } from "@/stores/common";
import { saveDiagCoreAbility } from "@/stores/coreCompetencyDiagnosis/coreCompetencyDiagnosis/coreCompetencyDiagnosis.service";
import { coreCompetencyDiagnosisStore } from "@/stores/coreCompetencyDiagnosis/coreCompetencyDiagnosis";
import { detailDiagCoreAbility } from "@/stores/coreCompetencyDiagnosis/coreCompetencyDiagnosis/coreCompetencyDiagnosis.service";
import { getDepartmentList } from "@/stores/common/department/department.service";
import ImageUploader from "quill-image-uploader";
import { QuillEditor } from "@vueup/vue-quill";
import { uploadFileEditor } from "@/stores/common/fileMng/fileMng.service";

export default defineComponent({
  name: "CoreCompetencyDiagnosisList",
  components: {
    Breadcrumb,
    LinkGridComponent,
    BaseDatePicker,
    CheckboxBase,
    ListCheckBoxBase,
    ModalCoreCompDiagSheetList,
    QuillEditor,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const coreAbiDiagStore = coreCompetencyDiagnosisStore();
    return { t, cmn, coreAbiDiagStore };
  },
  data() {
    const currentYear = new Date().getFullYear();
    return {
      modalOpenCoreCompDiag: false,
      id: "",
      modeDetail: MODE_DETAIL,
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
      listGender: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listYearLevel: [],
      listTargetPerson: [],
      pageTitle: this.t("07.coreCompetencyDiagnosis.detail.pageTitleDetail"),
      breadcrumbItems: [],
      coreCompDiagnosisModel: {} as CoreCompDiagnosisModel,
      coreAbilitySurSelected: null,
      listDeparmentCopy: [],
      key: 1,
      isDisabled: false,
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
                formData.append("category", "DIAG_CORE_ABILITY_EDITOR");
                formData.append("orgName", "DIAG_CORE_ABILITY_EDITOR");
                formData.append("sectionName", "DIAG_CORE_ABILITY_EDITOR");
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
    };
  },
  computed: {
    isRequiredValidate() {
      const { check } = this.cmn;
      const {
        diagnosticGuide,
        diagnosticGuideCn,
        diagnosticGuideEn,
        languageYn,
      } = this.coreCompDiagnosisModel;

      const isMultiLanguageCheck =
        languageYn === this.multiLanguageY &&
        (!diagnosticGuideCn || !diagnosticGuideEn);

      return check || !diagnosticGuide || isMultiLanguageCheck;
    },
  },
  watch: {
    "coreCompDiagnosisModel.listUniversity"(newValue, oldValue) {
      this.listDepartment = [];
      if (newValue.length > 0) {
        if (newValue.length < this.listUniversity.length) {
          this.getListDepartment();
        } else {
          this.coreCompDiagnosisModel.listDepartment = [];
        }
      } else {
        this.listDepartment = [];
      }

      if (newValue && oldValue && oldValue.length > newValue.length) {
        this.listDeparmentCopy = [];
      }
    },
    "coreAbiDiagStore.coreAbilitySurveySelected": function (newValue) {
      this.coreAbilitySurSelected = newValue;
      this.coreCompDiagnosisModel.coreAbilitySurveySeq =
        this.coreAbilitySurSelected.id;
      this.coreCompDiagnosisModel.coreAbilitySurveyNm =
        this.coreAbilitySurSelected.surveyNm;
    },
    "coreCompDiagnosisModel.startDate"(newValue) {
      if (!this.coreCompDiagnosisModel.endDate) {
        this.coreCompDiagnosisModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.coreCompDiagnosisModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.coreCompDiagnosisModel.startDate =
              this.coreCompDiagnosisModel.endDate;
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
    "coreCompDiagnosisModel.endDate"(newValue) {
      if (!this.coreCompDiagnosisModel.startDate) {
        this.coreCompDiagnosisModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(this.coreCompDiagnosisModel.startDate);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.coreCompDiagnosisModel.endDate =
              this.coreCompDiagnosisModel.startDate;
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
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.id = window.history.state.id;
    this.getCodeYearLevel();
    this.getCodeTargetPerson();
    this.getCodeGender();
    this.getCodeSemester();
    this.getMultiLanguageUseYn();
    this.getShowYn();
    this.getPublicInfo();
    this.getListUniversity();
    if (this.modeScreen === MODE_CREATE) {
      this.coreCompDiagnosisModel.languageYn = MULTI_LANGUAGE_N;
      this.coreCompDiagnosisModel.year = this.yearCurrent + "";
      this.coreCompDiagnosisModel.semester = SEMESTER_1;
      this.coreCompDiagnosisModel.status = SHOW_Y;
      this.coreCompDiagnosisModel.publicInfoYn = PUBLIC_INFO_Y;
      this.coreCompDiagnosisModel.genderObject = "";
      this.coreCompDiagnosisModel.listSubjectiveType = [];
      this.coreCompDiagnosisModel.listGender = [];
      this.initDataSubjectType();
    }
    if (this.modeScreen === MODE_DETAIL) {
      this.getDataDetail();
    }
  },
  methods: {
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
    getListDepartment() {
      this.cmn.setLoading(true);
      getDepartmentList({
        deptCd: [],
        deptDivCd: [],
        upDeptCd: this.coreCompDiagnosisModel.listUniversity,
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
          if (this.modeScreen === this.modeDetail) {
            this.coreCompDiagnosisModel.listDepartment = this.listDeparmentCopy;
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    getDataDetail() {
      this.cmn.setLoading(true);
      detailDiagCoreAbility({ diagSeq: this.id }).then((res) => {
        this.listDeparmentCopy = res.data.data.listDepartment;
        res.data.data.listDepartment = [];
        this.coreCompDiagnosisModel = res.data.data;
        this.isDisabled = this.coreCompDiagnosisModel.isDisabled;

        if (this.id && this.$refs.diagnosticGuide) {
          this.$refs.diagnosticGuide.setHTML(
            this.coreCompDiagnosisModel.diagnosticGuide
          );
        }
        if (this.id && this.$refs.diagnosticGuideCn) {
          this.$refs.diagnosticGuideCn.setHTML(
            this.coreCompDiagnosisModel.diagnosticGuideCn
          );
        }
        if (this.id && this.$refs.diagnosticGuideEn) {
          this.$refs.diagnosticGuideEn.setHTML(
            this.coreCompDiagnosisModel.diagnosticGuideEn
          );
        }
        if (this.coreCompDiagnosisModel.listSubjectiveType.length === 0) {
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
          cancelButtonText: this.t("common.cancel"),
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
          cancelButtonText: this.t("common.cancel"),
        }).then(() => {});
        return;
      }
      this.$swal({
        text: this.t("07.coreCompetencyDiagnosis.detail.messageConfirmSave"),
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
      if (
        this.listUniversity.length ===
        this.coreCompDiagnosisModel.listUniversity.length
      ) {
        this.coreCompDiagnosisModel.listDepartment = [];
      }
      this.cmn.setLoading(true);
      saveDiagCoreAbility(this.coreCompDiagnosisModel)
        .then((res) => {
          this.$swal({
            text: this.t(
              "07.coreCompetencyDiagnosis.detail.messageSaveSuccess"
            ),
            type: "success",
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: this.t("common.cancel"),
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
              cancelButtonText: this.t("common.cancel"),
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
              cancelButtonText: this.t("common.cancel"),
            }).then(() => {});
            return;
          }
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    getPublicInfo() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_PUBLIC_INFO }).then((response) => {
        response.data.data.forEach((item) => {
          this.listPublicInfo.push(item);
        });
      });
    },
    getShowYn() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SHOW_YN }).then((response) => {
        response.data.data.forEach((item) => {
          this.listShowYn.push(item);
        });
      });
    },
    getMultiLanguageUseYn() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_MULTI_LANG_USE_YN }).then(
        (response) => {
          response.data.data.forEach((item) => {
            this.listLanguageYn.push(item);
          });
        }
      );
    },
    getCodeYearLevel() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_GRADE_LEVEL }).then((response) => {
        this.listYearLevel = response.data.data;
      });
    },
    getCodeSemester() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SEMESTER }).then((response) => {
        response.data.data.forEach((item) => {
          this.listSemester.push(item);
        });
      });
    },
    getCodeGender() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_GENDER }).then((response) => {
        response.data.data.forEach((item) => {
          this.listGender.push(item);
        });
      });
    },
    getCodeTargetPerson() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_TARGET_PERSON }).then(
        (response) => {
          response.data.data.forEach((item) => {
            this.listTargetPerson.push(item);
          });
        }
      );
    },
    closeModalCoreCompDiag() {
      this.modalOpenCoreCompDiag = false;
    },
    openModalCoreCompDiag() {
      this.modalOpenCoreCompDiag = true;
    },
    gotoList() {
      this.$router.push({
        name: SCREEN.coreCompetencyDiagnosis.name,
      });
    },
    updateDataGender() {
      this.coreCompDiagnosisModel.listGender = [];
      if (this.coreCompDiagnosisModel.genderObject === "") {
        this.listGender.forEach((item) => {
          if (item.cdId !== "") {
            this.coreCompDiagnosisModel.listGender.push(item.cdId);
          }
        });
      } else {
        this.coreCompDiagnosisModel.listGender.push(
          this.coreCompDiagnosisModel.genderObject
        );
      }
    },
    createObjectSubjectiveType() {
      const activeSubjectiveTypesCount =
        this.coreCompDiagnosisModel.listSubjectiveType.filter(
          (subType) => subType.listItem[0].delYn === this.statusNo
        ).length;

      const subjectiveTypeIndex =
        this.coreCompDiagnosisModel.listSubjectiveType.findIndex(
          (subType) => subType.sbvtNumOrd === activeSubjectiveTypesCount + 1
        );

      if (subjectiveTypeIndex !== -1) {
        const subjectiveType =
          this.coreCompDiagnosisModel.listSubjectiveType[subjectiveTypeIndex];
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
        this.coreCompDiagnosisModel.listSubjectiveType.push(
          newSubjectiveType.value
        );
      }
    },
    deleteObjectSubjectType(index: number) {
      const subjectiveType =
        this.coreCompDiagnosisModel.listSubjectiveType[index];
      if (!subjectiveType) return;

      if (subjectiveType.listItem[0].sbvtSeq == null) {
        this.coreCompDiagnosisModel.listSubjectiveType.splice(index, 1);
      } else {
        subjectiveType.listItem.forEach((item, idx) => {
          item.delYn = this.statusYes;
        });
      }
      let count = 1;
      this.coreCompDiagnosisModel.listSubjectiveType.forEach((subType) => {
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
      this.coreCompDiagnosisModel.diagnosticGuide = this.$refs.diagnosticGuide
        .getHTML()
        .toString()
        .replace("<p><br></p>", "");
    },
    changeEditorDiagnosticGuideCn() {
      this.coreCompDiagnosisModel.diagnosticGuideCn =
        this.$refs.diagnosticGuideCn
          .getHTML()
          .toString()
          .replace("<p><br></p>", "");
    },
    changeEditorDiagnosticGuideEn() {
      this.coreCompDiagnosisModel.diagnosticGuideEn =
        this.$refs.diagnosticGuideEn
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
      this.coreCompDiagnosisModel.listSubjectiveType.push(
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
