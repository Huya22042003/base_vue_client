<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.basicAcademicDiagnosis.detail.subTitlePageDetail") }}
          </p>
          <table class="tbl_row">
            <caption>
              {{
                t("07.basicAcademicDiagnosis.detail.subTitlePageDetail")
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
                    {{ t("07.basicAcademicDiagnosis.detail.name") }}
                  </p>
                </th>
                <td colspan="3">
                  <div>
                    <InputBase
                      :mode="modeShow"
                      :id="'name'"
                      :name="'name'"
                      v-model="diagBaseLearnReqModel.name"
                      required
                    ></InputBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.basicAcademicDiagnosis.detail.dateCoreComp") }}
                  </p>
                </th>
                <td colspan="3">
                  <div class="search_box col_4">
                    <div
                      class="search_flex"
                      style="position: relative; width: 50%"
                    >
                      <BaseDatePicker
                        :id="'datePickerStart'"
                        v-model="diagBaseLearnReqModel.startDate"
                        :placeholder="t('common.startDate')"
                        required
                      >
                      </BaseDatePicker>
                      ~
                      <BaseDatePicker
                        :id="'datePickerEnd'"
                        v-model="diagBaseLearnReqModel.endDate"
                        :placeholder="t('common.endDate')"
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
                    {{ t("07.basicAcademicDiagnosis.detail.compPlan") }}
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
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.basicAcademicDiagnosis.detail.year") }}
                  </p>
                </th>
                <td colspan="3">
                  <div style="width: 15%">
                    <SelectBoxBase
                      :id="'selectYear'"
                      :name="'selectYear'"
                      :data="listYear"
                      v-model="diagBaseLearnReqModel.year"
                      required
                    >
                    </SelectBoxBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.basicAcademicDiagnosis.detail.semester") }}
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
                    v-model="diagBaseLearnReqModel.semester"
                    :checked="diagBaseLearnReqModel.semester === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.basicAcademicDiagnosis.detail.publicInfo") }}
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
                    v-model="diagBaseLearnReqModel.publicInfoYn"
                    :checked="diagBaseLearnReqModel.publicInfoYn === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.basicAcademicDiagnosis.detail.status") }}
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
                    v-model="diagBaseLearnReqModel.status"
                    :checked="diagBaseLearnReqModel.status === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>

              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.basicAcademicDiagnosis.detail.object1") }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      diagBaseLearnReqModel.listUniversity ||
                      modeScreen === modeCreate
                    "
                    :id="'listUniversity'"
                    :name="'listUniversity'"
                    :hasCheckAll="true"
                    :listData="listUniversity"
                    v-model="diagBaseLearnReqModel.listUniversity"
                    :useArray="true"
                    :requireId="'listRequiredListUniversity'"
                    :isRequire="true"
                  ></ListCheckBoxBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.basicAcademicDiagnosis.detail.object2") }}
                  </p>
                </th>
                <td colspan="3">
                  <div
                    v-if="
                      diagBaseLearnReqModel.listUniversity &&
                      diagBaseLearnReqModel.listUniversity.length <
                        listUniversity.length &&
                      diagBaseLearnReqModel.listUniversity.length > 0
                    "
                  >
                    <ListCheckBoxBase
                      v-if="
                        listDepartment.length > 0 &&
                        (diagBaseLearnReqModel.listDepartment ||
                          modeScreen === modeCreate)
                      "
                      :id="'listDepartment'"
                      :name="'listDepartment'"
                      :hasCheckAll="true"
                      :useArray="true"
                      :listData="listDepartment"
                      v-model="diagBaseLearnReqModel.listDepartment"
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
                    {{ t("07.basicAcademicDiagnosis.detail.object3") }}
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
                    v-model="diagBaseLearnReqModel.genderObject"
                    :checked="item.cdId === diagBaseLearnReqModel.genderObject"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.basicAcademicDiagnosis.detail.object4") }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      diagBaseLearnReqModel.listGrade ||
                      modeScreen === modeCreate
                    "
                    :id="'listYear'"
                    :name="'listYear'"
                    :hasCheckAll="true"
                    :useArray="true"
                    :listData="listGrade"
                    v-model="diagBaseLearnReqModel.listGrade"
                    :requireId="'listRequiredListGrade'"
                    :isRequire="true"
                  ></ListCheckBoxBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.basicAcademicDiagnosis.detail.object5") }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      diagBaseLearnReqModel.listPeopleInvolved ||
                      modeScreen === modeCreate
                    "
                    :id="'listPeopleInvolved'"
                    :name="'listPeopleInvolved'"
                    :useArray="true"
                    :hasCheckAll="true"
                    :listData="listTargetPerson"
                    v-model="diagBaseLearnReqModel.listPeopleInvolved"
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
                t("07.basicAcademicDiagnosis.detail.selectCompSheet")
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
                    {{ t("07.basicAcademicDiagnosis.detail.selectCompSheet") }}
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
                        v-model="diagBaseLearnReqModel.baseLearnSurveyNm"
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
                        {{ t("07.basicAcademicDiagnosis.detail.btnSelect") }}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dp_flex btn_group btn_end mt_7" style="gap: 10px">
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
  <ModalBasicAcademicSheet
    :isOpen="modalOpenCoreCompDiag"
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
import ListCheckBoxBase from "@/components/common/input/ListCheckBoxBase.vue";
import ModalBasicAcademicSheet from "./ModalBasicAcademicSheet.vue";
import {
  DIV_CD_DEPT_DEPART,
  DIV_CD_DEPT_MAJOR,
  LANGUAGE_CHINA_CODE,
  LANGUAGE_ENGLISH_CODE,
  LANGUAGE_KOREA_CODE,
  MESSAGE_ERROR_API,
  PUBLIC_INFO_Y,
  SEMESTER_1,
  SHOW_Y,
  STATUS_NO,
  STATUS_YES,
  UP_CD_ID_GENDER,
  UP_CD_ID_GRADE_LEVEL,
  UP_CD_ID_PUBLIC_INFO,
  UP_CD_ID_SEMESTER,
  UP_CD_ID_SHOW_YN,
  UP_CD_ID_TARGET_PERSON,
} from "../../../constants/common.const";
import { SCREEN } from "../../../router/screen";
import { DiagBaseLearnReqModel } from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosis/basicAcademicDiagnosis.type";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
import { commonStore } from "../../../stores/common";
import { basicAcademicDiagnosisStore } from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosis";
import { BaseLearnSurveyListModel } from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosisSheet/basicAcademicDiagnosisSheet.type";
import {
  detailDiagBaseLearn,
  saveDiagBaseLearn,
} from "../../../stores/basicAcademicDiagnosis/basicAcademicDiagnosis/basicAcademicDiagnosis.service";
import { getDepartmentList } from "@/stores/common/department/department.service";
import ImageUploader from "quill-image-uploader";
import { QuillEditor } from "@vueup/vue-quill";
import { uploadFileEditor } from "@/stores/common/fileMng/fileMng.service";

export default defineComponent({
  name: "BasicAcademicDiagCrud",
  components: {
    Breadcrumb,
    LinkGridComponent,
    BaseDatePicker,
    CheckboxBase,
    ListCheckBoxBase,
    QuillEditor,
    ModalBasicAcademicSheet,
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    const baseLearnDiagStore = basicAcademicDiagnosisStore();
    return { t, cmn, baseLearnDiagStore };
  },
  data() {
    const currentYear = new Date().getFullYear();
    return {
      modalOpenCoreCompDiag: false,
      id: "",
      modeScreen: "" as String,
      modeShow: MODE_SHOW,
      languageKR: LANGUAGE_KOREA_CODE,
      languageCN: LANGUAGE_CHINA_CODE,
      languageEN: LANGUAGE_ENGLISH_CODE,
      yearCurrent: currentYear,
      statusYes: STATUS_YES,
      statusNo: STATUS_NO,
      listYear: [
        { cdId: currentYear - 1, cdNm: currentYear - 1 },
        { cdId: currentYear, cdNm: currentYear },
        { cdId: currentYear + 1, cdNm: currentYear + 1 },
      ],
      listSemester: [],
      listPublicInfo: [],
      listShowYn: [],
      listUniversity: [],
      listDepartment: [],
      listGender: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listGrade: [],
      listTargetPerson: [],
      pageTitle: this.t("07.basicAcademicDiagnosis.detail.pageTitleDetail"),
      breadcrumbItems: [],
      diagBaseLearnReqModel: {} as DiagBaseLearnReqModel,
      modeCreate: MODE_CREATE,
      diagBaseLearnSelected: {} as BaseLearnSurveyListModel,
      listDeparmentCopy: [],
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
  watch: {
    "diagBaseLearnReqModel.listUniversity"(newValue, oldValue) {
      this.listDepartment = [];
      if (newValue.length > 0) {
        if (newValue.length < this.listUniversity.length) {
          this.getListDepartment();
        } else {
          this.diagBaseLearnReqModel.listDepartment = [];
        }
      } else {
        this.listDepartment = [];
      }

      if (newValue && oldValue && oldValue.length > newValue.length) {
        this.listDeparmentCopy = [];
      }
    },
    "baseLearnDiagStore.baseLearnSurveySelected": function (newValue) {
      this.diagBaseLearnSelected = newValue;
      this.diagBaseLearnReqModel.baseLearnSurveySeq =
        this.diagBaseLearnSelected.surveySeq;
      this.diagBaseLearnReqModel.baseLearnSurveyNm =
        this.diagBaseLearnSelected.surveyNm;
    },
    "diagBaseLearnReqModel.startDate"(newValue) {
      if (!this.diagBaseLearnReqModel.endDate) {
        this.diagBaseLearnReqModel.startDate = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.diagBaseLearnReqModel.endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagBaseLearnReqModel.startDate =
              this.diagBaseLearnReqModel.endDate;
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
    "diagBaseLearnReqModel.endDate"(newValue) {
      if (!this.diagBaseLearnReqModel.startDate) {
        this.diagBaseLearnReqModel.endDate = newValue;
      } else {
        const dStart = this.formatDate(this.diagBaseLearnReqModel.startDate);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagBaseLearnReqModel.endDate =
              this.diagBaseLearnReqModel.startDate;
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
  computed: {
    isRequiredValidate() {
      const { check } = this.cmn;
      const { diagnosticGuide } = this.diagBaseLearnReqModel;

      return check || !diagnosticGuide;
    },
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.id = window.history.state.id;
    this.getCodeYearLevel();
    this.getCodeTargetPerson();
    this.getCodeGender();
    this.getCodeSemester();
    this.getShowYn();
    this.getPublicInfo();
    this.getListUniversity();
    if (this.modeScreen === MODE_CREATE) {
      this.diagBaseLearnReqModel.year = this.yearCurrent + "";
      this.diagBaseLearnReqModel.semester = SEMESTER_1;
      this.diagBaseLearnReqModel.status = SHOW_Y;
      this.diagBaseLearnReqModel.publicInfoYn = PUBLIC_INFO_Y;
      this.diagBaseLearnReqModel.genderObject = "";
      this.diagBaseLearnReqModel.listGender = [];
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
        upDeptCd: this.diagBaseLearnReqModel.listUniversity,
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
          if (this.modeScreen === MODE_DETAIL) {
            this.diagBaseLearnReqModel.listDepartment = this.listDeparmentCopy;
          }
        })
        .catch(() => {
          throw new Error(MESSAGE_ERROR_API);
        });
    },
    getDataDetail() {
      this.cmn.setLoading(true);
      detailDiagBaseLearn({ diagSeq: this.id }).then((res) => {
        this.listDeparmentCopy = res.data.data.listDepartment;
        res.data.data.listDepartment = [];
        this.diagBaseLearnReqModel = res.data.data;
        this.isDisabled = this.diagBaseLearnReqModel.isDisabled;

        if (this.id && this.$refs.diagnosticGuide) {
          this.$refs.diagnosticGuide.setHTML(
            this.diagBaseLearnReqModel.diagnosticGuide
          );
        }
        this.cmn.setLoading(false);
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
        name: SCREEN.basicAcademicDiagnosis.name,
      });
    },
    getPublicInfo() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_PUBLIC_INFO }).then((response) => {
        response.data.data.forEach((item: any) => {
          this.listPublicInfo.push(item);
        });
      });
    },
    getShowYn() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SHOW_YN }).then((response) => {
        response.data.data.forEach((item: any) => {
          this.listShowYn.push(item);
        });
      });
    },
    getCodeYearLevel() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_GRADE_LEVEL }).then((response) => {
        this.listGrade = response.data.data;
      });
    },
    getCodeSemester() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SEMESTER }).then((response) => {
        response.data.data.forEach((item: any) => {
          this.listSemester.push(item);
        });
      });
    },
    getCodeGender() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_GENDER }).then((response) => {
        response.data.data.forEach((item: any) => {
          this.listGender.push(item);
        });
      });
    },
    getCodeTargetPerson() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_TARGET_PERSON }).then(
        (response) => {
          response.data.data.forEach((item: any) => {
            this.listTargetPerson.push(item);
          });
        }
      );
    },
    updateDataGender() {
      this.diagBaseLearnReqModel.listGender = [];
      if (this.diagBaseLearnReqModel.genderObject === "") {
        this.listGender.forEach((item) => {
          if (item.cdId !== "") {
            this.diagBaseLearnReqModel.listGender.push(item.cdId);
          }
        });
      } else {
        this.diagBaseLearnReqModel.listGender.push(
          this.diagBaseLearnReqModel.genderObject
        );
      }
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
        this.diagBaseLearnReqModel.listUniversity.length
      ) {
        this.diagBaseLearnReqModel.listDepartment = [];
      }
      this.cmn.setLoading(true);
      saveDiagBaseLearn(this.diagBaseLearnReqModel)
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
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    changeEditorDiagnosticGuide() {
      this.diagBaseLearnReqModel.diagnosticGuide = this.$refs.diagnosticGuide
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
