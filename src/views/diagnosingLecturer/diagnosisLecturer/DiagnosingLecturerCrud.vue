<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="box dp_block">
        <div class="box_section">
          <p class="box_title_sm">
            {{ t("07.diagnosingLecturer.diagnosis.crud.title") }}
          </p>
          <table class="tbl_row">
            <caption>
              {{
                t("07.diagnosingLecturer.diagnosis.crud.title")
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
                    {{ t("07.diagnosingLecturer.diagnosis.crud.name") }}
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
                      v-model="diagLecturerCrudModel.diagNm"
                      required
                    ></InputBase>
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{
                      t("07.diagnosingLecturer.diagnosis.crud.diagnosisTime")
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
                        id="startDate"
                        :placeholder="t('common.startDate')"
                        v-model="diagLecturerCrudModel.diagDurStr"
                        required
                      >
                      </BaseDatePicker>
                      <span> ~ </span>
                      <BaseDatePicker
                        id="endDate"
                        :placeholder="t('common.endDate')"
                        v-model="diagLecturerCrudModel.diagDurEnd"
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
                    {{ t("07.diagnosingLecturer.diagnosis.crud.eduYear") }}
                  </p>
                </th>
                <td colspan="3">
                  <div style="width: 15%">
                    <SelectBoxBase
                      :id="'selectYear'"
                      :name="'selectYear'"
                      :data="listYear"
                      v-model="diagLecturerCrudModel.year"
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
                    v-model="diagLecturerCrudModel.termCd"
                    :checked="diagLecturerCrudModel.termCd === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.diagnosingLecturer.diagnosis.crud.instruct") }}
                  </p>
                </th>
                <td colspan="3">
                  <QuillEditor
                    :modules="modules"
                    toolbar="full"
                    class="quill-editor-custom"
                    @editorChange="changeEditorDiagnosticGuide()"
                    ref="diagGuide"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.diagnosingLecturer.diagnosis.crud.infomation") }}
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
                    v-model="diagLecturerCrudModel.indvInfoAgrApplyYn"
                    :checked="
                      diagLecturerCrudModel.indvInfoAgrApplyYn === item.cdId
                    "
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.diagnosingLecturer.diagnosis.crud.show") }}
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
                    v-model="diagLecturerCrudModel.stsCd"
                    :checked="diagLecturerCrudModel.stsCd === item.cdId"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.diagnosingLecturer.diagnosis.crud.object1") }}
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
                    v-model="diagLecturerCrudModel.genderObject"
                    :checked="item.cdId === diagLecturerCrudModel.genderObject"
                  >
                  </RadiobuttonBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.diagnosingLecturer.diagnosis.crud.object2") }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    v-if="
                      diagLecturerCrudModel.listIndustrySector ||
                      modeScreen === modeCreate
                    "
                    :id="'listIndustrySector'"
                    :name="'listIndustrySector'"
                    :hasCheckAll="true"
                    :listData="listIndustrySector"
                    v-model="diagLecturerCrudModel.listIndustrySector"
                    :useArray="true"
                    :requireId="'listRequiredListIndustrySector'"
                    :isRequire="true"
                  ></ListCheckBoxBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.diagnosingLecturer.diagnosis.crud.object3") }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    :id="'listExperience'"
                    :name="'listExperience'"
                    :useArray="true"
                    :hasCheckAll="true"
                    :listData="listExperience"
                    v-model="diagLecturerCrudModel.listExperience"
                    v-if="
                      diagLecturerCrudModel.listExperience ||
                      modeScreen === modeCreate
                    "
                    :requireId="'requireListExperience'"
                    :isRequire="true"
                  ></ListCheckBoxBase>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <p class="required">
                    {{ t("07.diagnosingLecturer.diagnosis.crud.object4") }}
                  </p>
                </th>
                <td colspan="3">
                  <ListCheckBoxBase
                    :id="'listProfLevel'"
                    :name="'listProfLevel'"
                    :useArray="true"
                    :hasCheckAll="true"
                    :listData="listProfLevel"
                    v-model="diagLecturerCrudModel.listProfLevel"
                    v-if="
                      diagLecturerCrudModel.listProfLevel ||
                      modeScreen === modeCreate
                    "
                    :requireId="'listRequireListProfLevel'"
                    :isRequire="true"
                  ></ListCheckBoxBase>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="tbl_row mt-8">
            <caption>
              {{
                t("07.diagnosingLecturer.diagnosis.crud.selectSheet")
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
                    {{ t("07.diagnosingLecturer.diagnosis.crud.selectSheet") }}
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
                        :id="'surveyNm'"
                        :name="'surveyNm'"
                        readonly
                        v-model="diagLecturerCrudModel.surveyNm"
                        required
                      ></InputBase>
                    </div>
                    <div>
                      <button
                        type="button"
                        class="button btn_xs btn_blue btn_responsive"
                        @click="openModalCoreCompDiag"
                      >
                        {{ t("07.diagnosingLecturer.button.select") }}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dp_flex btn_group btn_end mt_8" style="gap: 10px">
          <button
            type="button"
            class="button btn_xs btn_blue btn_responsive"
            @click="confirmSaveData()"
          >
            {{ t("common.save") }}
          </button>
          <button class="button btn_xs btn_white" @click="gotoList()">
            {{ t("common.list") }}
          </button>
        </div>
      </div>
    </section>
  </div>
  <ModalDiagnosis
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
  SUCCSESS_STATUS,
} from "../../../constants/screen.const";
import ListCheckBoxBase from "@/components/common/input/ListCheckBoxBase.vue";
import {
  PUBLIC_INFO_Y,
  SEMESTER_1,
  SHOW_Y,
  STATUS_1,
  STATUS_NO,
  STATUS_YES,
  UP_CD_ID_AFFILIATED_BLOCK,
  UP_CD_ID_GENDER,
  UP_CD_ID_PROFESSOR_LEVEL,
  UP_CD_ID_PUBLIC_INFO,
  UP_CD_ID_SEMESTER,
  UP_CD_ID_SHOW_YN,
  UP_CD_ID_TEACHING_EXPERIENCE,
} from "../../../constants/common.const";
import { SCREEN } from "../../../router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import ModalDiagnosis from "./ModalDiagnosingLecturer.vue";
import { diagLecurer } from "../../../stores/profAbilityLecturer/profAbilityLecturers";
import {
  getListCodeMng,
  getCodeMngByUpCdId,
} from "../../../stores/common/codeMng/codeMng.service";
import { commonStore } from "../../../stores/common";
import {
  saveDiagProfAbility,
  detailDiagProfAbility,
} from "../../../stores/profAbilityLecturer/profAbilityLecturers/profAbilityLecurer.service";
import { DiagLecturerCrudModel } from "../../../stores/profAbilityLecturer/profAbilityLecturers/ProfAbilityLecturer.type";
import ImageUploader from "quill-image-uploader";
import { QuillEditor } from "@vueup/vue-quill";
import { uploadFileEditor } from "@/stores/common/fileMng/fileMng.service";

export default defineComponent({
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
    const diagLecurerStore = diagLecurer();
    const store = commonStore();
    const { t } = useI18n();
    return { t, diagLecurerStore, store };
  },
  watch: {
    "diagLecurerStore.abilitySurveySelected": function (newValue) {
      this.abilitySurveySelected = newValue;
      this.diagLecturerCrudModel.surveyNm = this.abilitySurveySelected.surveyNm;
      this.diagLecturerCrudModel.surveySeq =
        this.abilitySurveySelected.surveySeq;
    },
    "diagLecturerCrudModel.diagDurStr"(newValue) {
      if (!this.diagLecturerCrudModel.diagDurEnd) {
        this.diagLecturerCrudModel.diagDurStr = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.diagLecturerCrudModel.diagDurEnd);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagLecturerCrudModel.diagDurStr =
              this.diagLecturerCrudModel.diagDurEnd;
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
    "diagLecturerCrudModel.diagDurEnd"(newValue) {
      if (!this.diagLecturerCrudModel.diagDurStr) {
        this.diagLecturerCrudModel.diagDurEnd = newValue;
      } else {
        const dStart = this.formatDate(this.diagLecturerCrudModel.diagDurStr);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.diagLecturerCrudModel.diagDurEnd =
              this.diagLecturerCrudModel.diagDurStr;
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
    const currentYear = new Date().getFullYear();
    return {
      modalOpenCoreCompDiag: false,
      id: "",
      modeScreen: "",
      modeCreate: MODE_CREATE,
      modeShow: MODE_SHOW,
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
      listGender: [
        {
          cdId: "",
          cdNm: this.t("common.all"),
        },
      ],
      listIndustrySector: [],
      listExperience: [],
      listProfLevel: [],
      pageTitle: this.t("07.diagnosingLecturer.diagnosis.crud.pageTitle"),
      diagLecturerCrudModel: {} as DiagLecturerCrudModel,
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
                this.store.setLoading(true);
                const formData = new FormData();
                formData.append("file", file);
                formData.append("category", "DIAG_PROF_ABILITY_EDITOR");
                formData.append("orgName", "DIAG_PROF_ABILITY_EDITOR");
                formData.append("sectionName", "DIAG_PROF_ABILITY_EDITOR");
                uploadFileEditor(formData)
                  .then((res) => {
                    resolve(res.data.data.urlFile);
                    this.store.setLoading(false);
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
  async beforeMount() {
    this.modeScreen = this.$route.params.mode;
    this.id = window.history.state.id;
    if (this.modeScreen === MODE_CREATE) {
      this.diagLecturerCrudModel.year = this.yearCurrent + "";
      this.diagLecturerCrudModel.termCd = SEMESTER_1;
      this.diagLecturerCrudModel.indvInfoAgrApplyYn = PUBLIC_INFO_Y;
      this.diagLecturerCrudModel.stsCd = SHOW_Y;
      this.diagLecturerCrudModel.listGender = [];
      this.diagLecturerCrudModel.genderObject = "";
    }
    this.getCodeSemester();
    this.getPublicInfo();
    await this.getListCode();

    if (this.modeScreen === MODE_DETAIL) {
      this.getDataDetail();
    } else {
      this.store.setLoading(false);
    }
  },
  computed: {
    isRequiredValidate() {
      const { check } = this.store;
      const { diagGuide } = this.diagLecturerCrudModel;

      return check || !diagGuide;
    },
  },
  methods: {
    getCodeSemester() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SEMESTER }).then((response) => {
        response.data.data.forEach((item) => {
          this.listSemester.push(item);
        });
      });
    },
    getPublicInfo() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_PUBLIC_INFO }).then((response) => {
        response.data.data.forEach((item) => {
          this.listPublicInfo.push(item);
        });
      });
    },
    async getListCode() {
      this.store.setLoading(true);
      const res = await getListCodeMng({
        upCdIdList: [
          UP_CD_ID_GENDER,
          UP_CD_ID_SHOW_YN,
          UP_CD_ID_AFFILIATED_BLOCK,
          UP_CD_ID_TEACHING_EXPERIENCE,
          UP_CD_ID_PROFESSOR_LEVEL,
        ],
      });
      if (res.status === SUCCSESS_STATUS) {
        res.data.data.forEach((item) => {
          if (item.upCdId === UP_CD_ID_GENDER) {
            this.listGender.push(item);
          }
          if (item.upCdId === UP_CD_ID_SHOW_YN) {
            this.listShowYn.push(item);
          }
          if (item.upCdId === UP_CD_ID_AFFILIATED_BLOCK) {
            this.listIndustrySector.push(item);
          }
          if (item.upCdId === UP_CD_ID_TEACHING_EXPERIENCE) {
            this.listExperience.push(item);
          }
          if (item.upCdId === UP_CD_ID_PROFESSOR_LEVEL) {
            this.listProfLevel.push(item);
          }
        });
      }
    },
    closeModalCoreCompDiag() {
      this.modalOpenCoreCompDiag = false;
    },
    openModalCoreCompDiag() {
      this.modalOpenCoreCompDiag = true;
    },
    getDataDetail() {
      detailDiagProfAbility({ diagSeq: this.id }).then((res) => {
        this.diagLecturerCrudModel = res.data.data;
        this.isDisabled = this.diagLecturerCrudModel.isDisabled;

        if (this.id && this.$refs.diagGuide) {
          this.$refs.diagGuide.setHTML(this.diagLecturerCrudModel.diagGuide);
        }

        this.store.setLoading(false);
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
        text: this.t("07.diagnosingLecturer.modalConfirm.titleConfirmSaveDiag"),
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
      this.store.setLoading(true);
      this.updateDataGender();
      saveDiagProfAbility(this.diagLecturerCrudModel)
        .then((res) => {
          if (res.status === SUCCSESS_STATUS) {
            this.store.setLoading(false);
            this.$swal({
              text: this.t(
                "07.diagnosingLecturer.modalConfirm.titleModifySave"
              ),
              type: "success",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.confirm"),
            }).then(() => {
              this.gotoList();
            });
          }
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
          this.store.setLoading(false);
        });
    },
    updateDataGender() {
      this.diagLecturerCrudModel.listGender = [];
      if (this.diagLecturerCrudModel.genderObject === "") {
        this.listGender.forEach((item) => {
          if (item.cdId !== "") {
            this.diagLecturerCrudModel.listGender.push(item.cdId);
          }
        });
      } else {
        this.diagLecturerCrudModel.listGender.push(
          this.diagLecturerCrudModel.genderObject
        );
      }
    },
    gotoList() {
      this.$router.push({
        name: SCREEN.diagnosingLecturer.name,
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
      this.diagLecturerCrudModel.diagGuide = this.$refs.diagGuide
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
