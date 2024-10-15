<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.coreMajorCompDiagnosis.crud.title") }}
          </p>
          <table class="tbl_row">
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
                    {{ t("07.coreMajorCompDiagnosis.crud.languageYn") }}
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
                    v-model="diagMajorCapaReqModel.multiLangUseYn"
                    :checked="
                      item.cdId === diagMajorCapaReqModel.multiLangUseYn
                    "
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreMajorCompDiagnosis.crud.name") }}
                  </p>
                </th>
                <td colspan="3">
                  <div>
                    <InputBase
                      :mode="modeShow"
                      :id="'nameSheet'"
                      :name="'nameSheet'"
                      :placeholder="
                        t('07.coreMajorCompDiagnosis.crud.placeholderKR')
                      "
                      v-model="diagMajorCapaReqModel.diagNm"
                      required
                    ></InputBase>
                  </div>
                  <div
                    class="mt-2"
                    v-if="
                      diagMajorCapaReqModel.multiLangUseYn === multiLanguageY
                    "
                  >
                    <InputBase
                      :mode="modeShow"
                      :id="'nameSheetCN'"
                      :name="'nameSheetCN'"
                      :placeholder="
                        t('07.coreMajorCompDiagnosis.crud.placeholderCN')
                      "
                      v-model="diagMajorCapaReqModel.diagNmCh"
                      required
                    ></InputBase>
                  </div>
                  <div
                    class="mt-2"
                    v-if="
                      diagMajorCapaReqModel.multiLangUseYn === multiLanguageY
                    "
                  >
                    <InputBase
                      :mode="modeShow"
                      :id="'nameSheetEN'"
                      :name="'nameSheetEN'"
                      :placeholder="
                        t('07.coreMajorCompDiagnosis.crud.placeholderEN')
                      "
                      v-model="diagMajorCapaReqModel.diagNmEn"
                      required
                    ></InputBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreMajorCompDiagnosis.crud.time") }}
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
                        v-model="diagMajorCapaReqModel.diagDurStr"
                        required
                      >
                      </BaseDatePicker>
                      ~
                      <BaseDatePicker
                        :placeholder="t('common.endDate')"
                        v-model="diagMajorCapaReqModel.diagDurEnd"
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
                    {{ t("07.coreMajorCompDiagnosis.crud.year") }}
                  </p>
                </th>
                <td colspan="3">
                  <div style="width: 15%">
                    <SelectBoxBase
                      :id="'selectYear'"
                      :name="'selectYear'"
                      :data="listYear"
                      v-model="diagMajorCapaReqModel.year"
                    >
                    </SelectBoxBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreMajorCompDiagnosis.crud.semester") }}
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
                    v-model="diagMajorCapaReqModel.termCd"
                    :checked="item.cdId === diagMajorCapaReqModel.termCd"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreMajorCompDiagnosis.crud.instruct") }}
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
                      diagMajorCapaReqModel.multiLangUseYn === multiLanguageY
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
                      diagMajorCapaReqModel.multiLangUseYn === multiLanguageY
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
                    {{ t("07.coreMajorCompDiagnosis.crud.checkProcedure") }}
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
                    v-model="diagMajorCapaReqModel.publicInfoYn"
                    :checked="diagMajorCapaReqModel.publicInfoYn === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreMajorCompDiagnosis.crud.status") }}
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
                    v-model="diagMajorCapaReqModel.stsCd"
                    :checked="diagMajorCapaReqModel.stsCd === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreMajorCompDiagnosis.crud.object1") }}
                  </p>
                </th>
                <td colspan="3">
                  <div style="width:50%">
                    <SelectBoxBase
                      :id="'department'"
                      :name="'department'"
                      :data="listDepartment"
                      v-model="diagMajorCapaReqModel.majorCapaDeptCd"
                      :disabled="true"
                      v-if="listDepartment.length > 1"
                    >
                    </SelectBoxBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreMajorCompDiagnosis.crud.object2") }}
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
                    v-model="diagMajorCapaReqModel.genderObject"
                    :checked="item.cdId === diagMajorCapaReqModel.genderObject"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreMajorCompDiagnosis.crud.object3") }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      diagMajorCapaReqModel.listGrade ||
                      modeScreen === modeCreate
                    "
                    :id="'listYear'"
                    :name="'listYear'"
                    :hasCheckAll="true"
                    :useArray="true"
                    :listData="listYearLevel"
                    v-model="diagMajorCapaReqModel.listGrade"
                  ></ListCheckBoxBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.coreMajorCompDiagnosis.crud.object4") }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      diagMajorCapaReqModel.listPeopleInvolved ||
                      modeScreen === modeCreate
                    "
                    :id="'listPeopleInvolved'"
                    :name="'listPeopleInvolved'"
                    :hasCheckAll="true"
                    :useArray="true"
                    :listData="listTargetPerson"
                    v-model="diagMajorCapaReqModel.listPeopleInvolved"
                  ></ListCheckBoxBase>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="tbl_row mt-8">
            <caption>
              {{
                t("07.coreMajorCompDiagnosis.crud.selectCompSheet")
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
                    {{ t("07.coreMajorCompDiagnosis.crud.selectCompSheet") }}
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
                        v-model="diagMajorCapaReqModel.majorCapaSurveyNm"
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
                        {{ t("common.select") }}
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
                t("07.coreMajorCompDiagnosis.crud.subjectiveType")
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
                ) in diagMajorCapaReqModel.listSubjectiveType"
                :key="index"
              >
                <tr v-if="shouldShowRow(subjectiveType)">
                  <th scope="row">
                    <p>
                      <span v-if="subjectiveType.sbvtNumOrd > 1">{{
                        subjectiveType.sbvtNumOrd
                      }}</span>
                      {{ t("07.coreMajorCompDiagnosis.crud.subjectiveType") }}
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
                                diagMajorCapaReqModel.multiLangUseYn ===
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
                            diagMajorCapaReqModel.multiLangUseYn ===
                            multiLanguageY
                              ? 'button btn_xs btn_blue btn_responsive btn-select-subjective-type'
                              : 'button btn_xs btn_blue btn_responsive'
                          "
                        >
                          {{
                            t("07.coreMajorCompDiagnosis.crud.button.add")
                          }}</button
                        ><button
                          v-if="index > 0"
                          @click="deleteObjectSubjectType(index)"
                          type="button"
                          :class="
                            diagMajorCapaReqModel.multiLangUseYn ===
                            multiLanguageY
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
  <CoreMajorCompDiagnosisModal
    :isOpen="modalOpenCoreCompDiag"
    @close-modal="closeModalCoreCompDiag"
    :multiLanguageUseYn="diagMajorCapaReqModel.multiLangUseYn"
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
import ListCheckBoxBase from "@/components/common/input/ListCheckBoxBase.vue";
import {
  DIV_CD_DEPT_DEPART,
  LANGUAGE_CHINA_CODE,
  LANGUAGE_ENGLISH_CODE,
  LANGUAGE_KOREA_CODE,
  MESSAGE_ERROR_API,
  MULTI_LANGUAGE_N,
  MULTI_LANGUAGE_Y,
  PUBLIC_INFO_Y,
  SEMESTER_1,
  SHOW_Y,
  STATUS_1,
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
import { DiagMajorCapaReqModel } from "../../../stores/coreMajorCompDiagnosis/coreMajorCompDiagnosis/coreMajorCompDiagnosis.type";
import { SubjectiveType } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosis/coreMajorCompDiagnosis.type";
import CoreMajorCompDiagnosisModal from "./CoreMajorCompDiagnosisModal.vue";
import { coreMajorDiagnosisStore } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosis";
import { saveDiagMajorCapa } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosis/coreMajorCompDiagnosis.service";
import { detailDiagMajorCapa } from "@/stores/coreMajorCompDiagnosis/coreMajorCompDiagnosis/coreMajorCompDiagnosis.service";
import { getDepartmentList } from "../../../stores/common/department/department.service";
import ImageUploader from "quill-image-uploader";
import { QuillEditor } from "@vueup/vue-quill";
import { uploadFileEditor } from "@/stores/common/fileMng/fileMng.service";
import { getUserInfo } from "../../../utils/storage";

export default defineComponent({
  name: "CoreCompetencyDiagnosisList",
  components: {
    Breadcrumb,
    LinkGridComponent,
    BaseDatePicker,
    CheckboxBase,
    ListCheckBoxBase,
    CoreMajorCompDiagnosisModal,
    QuillEditor,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const coreMajDiagStore = coreMajorDiagnosisStore();
    return { t, cmn, coreMajDiagStore };
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
      listDepartment: [
        {
          cdId: "",
          cdNm: this.t("common.select"),
        },
      ],
      listGender: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listYearLevel: [],
      listTargetPerson: [],
      pageTitle: this.t("07.coreMajorCompDiagnosis.crud.pageTitle"),
      breadcrumbItems: [],
      diagMajorCapaReqModel: {} as DiagMajorCapaReqModel,
      coreMajorSurSelected: null,
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
                formData.append("category", "DIAG_MAJOR_CAPA_EDITOR");
                formData.append("orgName", "DIAG_MAJOR_CAPA_EDITOR");
                formData.append("sectionName", "DIAG_MAJOR_CAPA_EDITOR");
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
  watch: {
    "coreMajDiagStore.coreMajorSurveySelected"(newValue) {
      this.coreMajorSurSelected = newValue;
      this.diagMajorCapaReqModel.majorCapaSurveySeq =
        this.coreMajorSurSelected.surveySeq;
      this.diagMajorCapaReqModel.majorCapaSurveyNm =
        this.coreMajorSurSelected.surveyNm;
    },
    "diagMajorCapaReqModel.diagDurStr"(newValue) {
      if (!this.diagMajorCapaReqModel.diagDurEnd) {
        this.diagMajorCapaReqModel.diagDurStr = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.diagMajorCapaReqModel.diagDurEnd);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagMajorCapaReqModel.diagDurStr =
              this.diagMajorCapaReqModel.diagDurEnd;
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
    "diagMajorCapaReqModel.diagDurEnd"(newValue) {
      if (!this.diagMajorCapaReqModel.diagDurStr) {
        this.diagMajorCapaReqModel.diagDurEnd = newValue;
      } else {
        const dStart = this.formatDate(this.diagMajorCapaReqModel.diagDurStr);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagMajorCapaReqModel.diagDurEnd =
              this.diagMajorCapaReqModel.diagDurStr;
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
    this.getListDeptInfo();
    if (this.modeScreen === MODE_CREATE) {
      this.diagMajorCapaReqModel.multiLangUseYn = MULTI_LANGUAGE_N;
      this.diagMajorCapaReqModel.year = this.yearCurrent + "";
      this.diagMajorCapaReqModel.termCd = SEMESTER_1;
      this.diagMajorCapaReqModel.stsCd = SHOW_Y;
      this.diagMajorCapaReqModel.majorCapaDeptCd = "";
      this.diagMajorCapaReqModel.publicInfoYn = PUBLIC_INFO_Y;
      this.diagMajorCapaReqModel.genderObject = "";
      this.diagMajorCapaReqModel.listSubjectiveType = [];
      this.diagMajorCapaReqModel.listGender = [];
      const userInfo = JSON.parse(getUserInfo())
      this.diagMajorCapaReqModel.majorCapaDeptCd = userInfo.deptCd
      this.initDataSubjectType();
    }
    if (this.modeScreen === MODE_DETAIL) {
      this.getDataDetail();
    }
  },
  computed: {
    isRequiredValidate() {
      const { check } = this.cmn;
      const {
        diagnosticGuide,
        diagnosticGuideCn,
        diagnosticGuideEn,
        multiLangUseYn,
      } = this.diagMajorCapaReqModel;

      const isMultiLanguageCheck =
        multiLangUseYn === this.multiLanguageY &&
        (!diagnosticGuideCn || !diagnosticGuideEn);

      return check || !diagnosticGuide || isMultiLanguageCheck;
    },
  },
  methods: {
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
      this.diagMajorCapaReqModel.listSubjectiveType.push(
        objectSubjectiveType.value
      );
    },
    getDataDetail() {
      this.cmn.setLoading(true);
      detailDiagMajorCapa({ diagSeq: this.id }).then((res) => {
        this.diagMajorCapaReqModel = res.data.data;

        this.isDisabled = this.diagMajorCapaReqModel.isDisabled;

        if (this.id && this.$refs.diagnosticGuide) {
          this.$refs.diagnosticGuide.setHTML(
            this.diagMajorCapaReqModel.diagnosticGuide
          );
        }
        if (this.id && this.$refs.diagnosticGuideCn) {
          this.$refs.diagnosticGuideCn.setHTML(
            this.diagMajorCapaReqModel.diagnosticGuideCn
          );
        }
        if (this.id && this.$refs.diagnosticGuideEn) {
          this.$refs.diagnosticGuideEn.setHTML(
            this.diagMajorCapaReqModel.diagnosticGuideEn
          );
        }
        if (this.diagMajorCapaReqModel.listSubjectiveType.length === 0) {
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

      this.cmn.setLoading(true);
      saveDiagMajorCapa(this.diagMajorCapaReqModel)
        .then((res) => {
          this.$swal({
            text: this.t(
              "07.coreCompetencyDiagnosis.detail.messageSaveSuccess"
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
    getListDeptInfo() {
      getDepartmentList({
        deptCd: [],
        deptDivCd: [DIV_CD_DEPT_DEPART],
        upDeptCd: [],
        useYn: "",
      })
        .then((res) => {
          res.data.data.forEach((item) => {
            if (item.deptDivCd === DIV_CD_DEPT_DEPART) {
              this.listDepartment.push({
                cdId: item.deptCd,
                cdNm: item.deptNm,
              });
            }
          });
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
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
        name: SCREEN.coreMajorCompDiagnosis.name,
      });
    },
    updateDataGender() {
      this.diagMajorCapaReqModel.listGender = [];
      if (this.diagMajorCapaReqModel.genderObject === "") {
        this.listGender.forEach((item) => {
          if (item.cdId !== "") {
            this.diagMajorCapaReqModel.listGender.push(item.cdId);
          }
        });
      } else {
        this.diagMajorCapaReqModel.listGender.push(
          this.diagMajorCapaReqModel.genderObject
        );
      }
    },
    createObjectSubjectiveType() {
      const activeSubjectiveTypesCount =
        this.diagMajorCapaReqModel.listSubjectiveType.filter(
          (subType) => subType.listItem[0].delYn === this.statusNo
        ).length;

      const subjectiveTypeIndex =
        this.diagMajorCapaReqModel.listSubjectiveType.findIndex(
          (subType) => subType.sbvtNumOrd === activeSubjectiveTypesCount + 1
        );

      if (subjectiveTypeIndex !== -1) {
        const subjectiveType =
          this.diagMajorCapaReqModel.listSubjectiveType[subjectiveTypeIndex];
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
        this.diagMajorCapaReqModel.listSubjectiveType.push(
          newSubjectiveType.value
        );
      }
    },
    deleteObjectSubjectType(index: number) {
      const subjectiveType =
        this.diagMajorCapaReqModel.listSubjectiveType[index];
      if (!subjectiveType) return;

      if (subjectiveType.listItem[0].sbvtSeq == null) {
        this.diagMajorCapaReqModel.listSubjectiveType.splice(index, 1);
      } else {
        subjectiveType.listItem.forEach((item, idx) => {
          item.delYn = this.statusYes;
        });
      }
      let count = 1;
      this.diagMajorCapaReqModel.listSubjectiveType.forEach((subType) => {
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
      this.diagMajorCapaReqModel.diagnosticGuide = this.$refs.diagnosticGuide
        .getHTML()
        .toString()
        .replace("<p><br></p>", "");
    },
    changeEditorDiagnosticGuideCn() {
      this.diagMajorCapaReqModel.diagnosticGuideCn =
        this.$refs.diagnosticGuideCn
          .getHTML()
          .toString()
          .replace("<p><br></p>", "");
    },
    changeEditorDiagnosticGuideEn() {
      this.diagMajorCapaReqModel.diagnosticGuideEn =
        this.$refs.diagnosticGuideEn
          .getHTML()
          .toString()
          .replace("<p><br></p>", "");
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
