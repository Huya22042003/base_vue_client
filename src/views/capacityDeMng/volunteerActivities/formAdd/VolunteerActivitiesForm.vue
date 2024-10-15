<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <!-- 사회봉사 등록 -->
        <p class="box_title_sm">
          {{ t("capacityDeMng.volunteerActivities.form.title") }}
        </p>
        <table v-if="dataForm" class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <!-- 봉사유형 -->
                <p class="required">
                  {{
                    t("capacityDeMng.volunteerActivities.form.typeVolunteer")
                  }}
                </p>
              </th>
              <td class="td_input">
                <RadiobuttonBase
                  v-for="(item, index) in listType"
                  :mode="'show'"
                  :value="item.cdId"
                  v-model="dataForm.typeVolunteer"
                  :id="`${item.cdId}_${index}`"
                  :name="`${item.cdId}_${index}`"
                  :key="`${item.cdId}_${index}`"
                  :checked="item.cdId == dataForm.typeVolunteer"
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 봉사제목 -->
                <p class="required">
                  {{ t("capacityDeMng.volunteerActivities.form.topic") }}
                </p>
              </th>
              <td>
                <InputBase
                  v-model="dataForm.topic"
                  id="dataForm_topic"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 봉사내용 -->
                <p class="required">
                  {{
                    t("capacityDeMng.volunteerActivities.form.contentVolunteer")
                  }}
                </p>
              </th>
              <td class="td_input">
                <QuillEditor
                  :modules="modules"
                  toolbar="full"
                  @editorChange="changeEditor()"
                  ref="myEditor"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 인정봉사시간 -->
                  {{
                    t("capacityDeMng.volunteerActivities.form.uptimeAdmitted")
                  }}
                </p>
              </th>
              <td>
                <div class="flex items-center">
                  <InputBase
                    class="wd_200 mr-3"
                    type="number"
                    v-model="dataForm.uptimeAdmitted"
                    id="dataForm_uptimeAdmitted"
                    required
                  />
                  <span>{{
                    t("capacityDeMng.volunteerActivities.form.hour")
                  }}</span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 봉시기간 -->
                  {{ t("capacityDeMng.volunteerActivities.form.workTime") }}
                </p>
              </th>
              <td>
                <div class="dp_flex al_center wd_300">
                  <BaseDatePicker
                    v-model="dataForm.workTimeStart"
                    id="workTimeStart"
                    :isRequired="true"
                  />
                  <span class="mx-2"> ~ </span>
                  <BaseDatePicker
                    v-model="dataForm.workTimeEnd"
                    id="workTimeEnd"
                    :isRequired="true"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 활동시간 및 요일 -->
                  {{ t("capacityDeMng.volunteerActivities.form.workDate") }}
                </p>
              </th>
              <td>
                <div
                  class="select_checkbox mb-3"
                  v-for="item in dataForm.workDate"
                >
                  <CheckboxBase
                    :mode="'show'"
                    :value="item.id"
                    :id="item.id"
                    v-model="item.checked"
                    :name="item.id"
                    :key="item.id"
                    :label="item.cdNm"
                  >
                  </CheckboxBase>
                  <SelectBoxBase
                    class="wd_200 mr-3"
                    :id="'hour' + item.id"
                    :name="'hour' + item.id"
                    v-model="item.hour"
                    :disabled="!item.checked"
                    :data="listHour"
                  >
                  </SelectBoxBase>
                  <SelectBoxBase
                    class="wd_200"
                    :id="'min' + item.id"
                    :name="'min' + item.id"
                    v-model="item.minute"
                    :disabled="!item.checked"
                    :data="listMinute"
                  >
                  </SelectBoxBase>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 모집기간 -->
                  {{
                    t("capacityDeMng.volunteerActivities.form.recruitmentTime")
                  }}
                </p>
              </th>
              <td>
                <div class="dp_flex al_center wd_300">
                  <BaseDatePicker
                    v-model="dataForm.recruitmentTimeStart"
                    id="recruitmentTimeStart"
                    :isRequired="true"
                  />
                  <span class="mx-2"> ~ </span>
                  <BaseDatePicker
                    v-model="dataForm.recruitmentTimeEnd"
                    id="recruitmentTimeEnd"
                    :isRequired="true"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 모집인원 -->
                  {{
                    t(
                      "capacityDeMng.volunteerActivities.form.recruitmentQuantity"
                    )
                  }}
                </p>
              </th>
              <td>
                <div class="flex items-center">
                  <InputBase
                    :min="1"
                    :max="100"
                    class="wd_200 mr-3"
                    type="number"
                    v-model="dataForm.recruitmentQuantity"
                    id="dataForm_recruitmentQuantity"
                    required
                  />
                  <span
                    >{{ t("capacityDeMng.volunteerActivities.form.peopel") }}
                    <span class="note_custom">
                      {{
                        t("capacityDeMng.volunteerActivities.form.subPeopel")
                      }}</span
                    >
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 봉사대상 -->
                  {{
                    t("capacityDeMng.volunteerActivities.form.objectVolunteer")
                  }}
                </p>
              </th>
              <td>
                <CheckboxBase
                  v-for="item in listObject"
                  :value="item.cdId"
                  v-model="dataForm.objectVolunteer"
                  :id="item.cdId + 'objectVolunteer'"
                  :name="item.cdId + 'objectVolunteer'"
                  :key="item.cdId + 'objectVolunteer'"
                  :label="item.cdNm"
                >
                </CheckboxBase>

                <InputBase
                  class="wd_100 mr-3"
                  type="text"
                  v-if="onCheckObjectVolunteerOther()"
                  v-model="dataForm.objectVolunteerOther"
                  id="dataForm_objectVolunteer"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 봉사분야 -->
                  {{
                    t("capacityDeMng.volunteerActivities.form.fieldVolunteer")
                  }}
                </p>
              </th>
              <td>
                <CheckboxBase
                  v-for="item in listField"
                  :value="item.cdId"
                  v-model="dataForm.fieldVolunteer"
                  :id="item.cdId + 'fieldVolunteer'"
                  :name="item.cdId + 'fieldVolunteer'"
                  :key="item.cdId + 'fieldVolunteer'"
                  :label="item.cdNm"
                >
                </CheckboxBase>

                <InputBase
                  class="wd_100 mr-3"
                  type="text"
                  v-if="onCheckFieldVolunteerOther()"
                  v-model="dataForm.fieldVolunteerOther"
                  id="dataForm_fieldVolunteer"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 봉사장소 -->
                  {{
                    t("capacityDeMng.volunteerActivities.form.addressVolunteer")
                  }}
                </p>
              </th>
              <td>
                <InputBase
                  v-model="dataForm.addressVolunteer"
                  id="dataForm_addressVolunteer"
                  required
                />
              </td>
            </tr>
            <tr v-show="dataForm.typeVolunteer == SOCIAL_IN_SCHOOL">
              <th scope="row">
                <p class="required">
                  <!-- 첨부파일 -->
                  {{ t("capacityDeMng.volunteerActivities.form.file") }}
                </p>
              </th>
              <td>
                <InputFileBase
                  :referKey="dataForm.id"
                  :mode="modeScreen"
                  id="imageFile"
                  name="imageFile"
                  :type="fileTypeImg"
                  v-model="fileImage"
                  ref="imageRef"
                  :orgName="'SOCIAL_SERVE'"
                  :category="'SOCIAL_SERVE'"
                  :sectionName="'SOCIAL_SERVE'"
                  previewFlag="true"
                ></InputFileBase>
              </td>
            </tr>
            <tr v-if="dataForm.typeVolunteer == SOCIAL_NOT_IN_SCHOOL">
              <th scope="row">
                <p class="required">
                  <!-- URL -->
                  {{ t("capacityDeMng.volunteerActivities.form.url") }}
                </p>
              </th>
              <td>
                <InputBase v-model="dataForm.url" id="dataForm_url" required />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 담당자 성명 -->
                  {{ t("capacityDeMng.volunteerActivities.form.chargeName") }}
                </p>
              </th>
              <td>
                <InputBase
                  v-model="dataForm.personCharge"
                  id="dataForm_chargeName"
                  required
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                <p class="required">
                  <!-- 담당자 연락처 -->
                  {{ t("capacityDeMng.volunteerActivities.form.chargePhone") }}
                </p>
              </th>
              <td>
                <InputBase
                  class="wd_100"
                  type="number"
                  v-model="dataForm.chargePhone.first"
                  id="dataForm_chargePhone1"
                  required
                  @input="handleInput($event, 'first', 3)"
                />
                <span class="mx-2"> - </span>
                <InputBase
                  class="wd_120"
                  type="number"
                  v-model="dataForm.chargePhone.between"
                  id="dataForm_chargePhone2"
                  required
                  @input="handleInput($event, 'between', 4)"
                />
                <span class="mx-2"> - </span>
                <InputBase
                  class="wd_140"
                  type="number"
                  v-model="dataForm.chargePhone.last"
                  id="dataForm_chargePhone3"
                  required
                  @input="handleInput($event, 'last', 4)"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="box_section">
          <div class="btn_area">
            <button
              type="button"
              class="button btn_xs btn_blue"
              v-if="modeScreen == MODE_SHOW"
              @click="goToRegist()"
            >
              <!-- 인재양성유형 삭제 -->
              {{ t("capacityDeMng.volunteerActivities.form.btnCheckPer") }}
            </button>
            <button
              type="button"
              class="button btn_xs btn_blue"
              @click="eventSave()"
            >
              <!-- 저장 -->
              {{ t("common.save") }}
            </button>
            <button
              type="button"
              class="button btn_xs btn_white"
              @click="back()"
            >
              <!-- 목록 -->
              {{ t("common.title.list") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  MODE_SHOW,
  FORMAT_YYY_MM_DD,
  FILE_TYPE_IMAGE,
} from "@/constants/screen.const";
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { commonStore } from "@/stores/common";
import { useI18n } from "vue-i18n";
import { SCREEN } from "@/router/screen";
import {
  SOCIAL_TYPE_UP_CD_ID,
  SOCIAL_FIELD_UP_CD_ID,
  SOCIAL_OBJECT_UP_CD_ID,
  SOCIAL_DATE_UP_CD_ID,
  SOCIAL_FIELD_OTHER,
  SOCIAL_OBJECT_OTHER,
  SOCIAL_IN_SCHOOL,
  SOCIAL_NOT_IN_SCHOOL,
} from "@/constants/common.const";
import {
  createVolunteer,
  updateVolunteer,
  detailVolunteer,
  countPer,
} from "@/stores/capacityDeMng/socialServe/volunteerActivities/volunteerActivities.service";
import type {
  SocialServeReqDTO,
  SocialServeSimpleDTO,
} from "@/stores/capacityDeMng/socialServe/volunteerActivities/volunteerActivities.type";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import ImageUploader from "quill-image-uploader";
import { uploadFileEditor } from "@/stores/common/fileMng/fileMng.service";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Breadcrumb,
  },
  data() {
    return {
      pageTitle: this.t(
        "capacityDeMng.volunteerActivities.title"
      ) /* 사회봉사 관리 */,
      breadcrumbItems: [],
      modeScreen: "" as any,
      listType: [] as CodeMngModel[],
      isLoad: false,
      listField: [] as CodeMngModel[],
      listObject: [] as CodeMngModel[],
      listHour: [{ cdId: -1, cdNm: "시", upCdId: "1" }] as Array<any>,
      listMinute: [{ cdId: -1, cdNm: "분", upCdId: "1" }] as Array<any>,
      dataForm: {
        id: "",
        typeVolunteer: SOCIAL_IN_SCHOOL,
        topic: "",
        contentVolunteer: "",
        uptimeAdmitted: "",
        workTimeStart: "",
        workTimeEnd: "",
        workDate: [],
        recruitmentTimeStart: "",
        recruitmentTimeEnd: "",
        recruitmentQuantity: "",
        objectVolunteer: [] as string[],
        fieldVolunteer: [] as string[],
        addressVolunteer: "",
        url: "",
        personCharge: "",
        chargePhone: {
          first: "",
          between: "",
          last: "",
        },
        objectVolunteerOther: "",
        fieldVolunteerOther: "",
      },
      fileImage: [],
      fileTypeImg: FILE_TYPE_IMAGE,
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
                formData.append("category", "SOCIAL_SERVE");
                formData.append("orgName", "SOCIAL_SERVE");
                formData.append("sectionName", "SOCIAL_SERVE");
                uploadFileEditor(formData)
                  .then((res: any) => {
                    resolve(res.data.urlFile);
                    this.store.setLoading(false);
                  })
                  .catch(() => {
                    reject("Upload failed");
                  });
              }
            });
          },
        },
      },
    };
  },
  setup: () => {
    const store = commonStore();
    const { t } = useI18n();
    return { t, store, SOCIAL_IN_SCHOOL, SOCIAL_NOT_IN_SCHOOL, MODE_SHOW };
  },
  beforeMount() {
    for (let index = 0; index < 24; index++) {
      this.listHour.push({ cdId: index, cdNm: index + " 시", upCdId: index });
    }

    const minuteSteps = [0, 10, 20, 30, 40, 50];

    for (let index = 0; index < minuteSteps.length; index++) {
      const value = minuteSteps[index];

      this.listMinute.push({
        cdId: value,
        cdNm: value + " 분",
        upCdId: value,
      });
    }
    this.modeScreen = this.$route.params.mode;
    this.dataForm.id = window.history.state.id;
    this.getData();
  },
  watch: {
    "dataForm.workTimeEnd": function (newValue) {
      if (!this.dataForm.workTimeStart) {
        this.dataForm.workTimeEnd = newValue;
      } else {
        const dStart = this.dataForm.workTimeStart;
        const dEnd = newValue;
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.dataForm.workTimeEnd = this.dataForm.workTimeStart;
            this.showAlert(
              this.t("capacityDeMng.volunteerActivities.form.errorDate")
            );
          });
        }
      }
      this.validateTime();
    },
    "dataForm.workTimeStart": function (newValue) {
      if (!this.dataForm.workTimeEnd) {
        this.dataForm.workTimeStart = newValue;
      } else {
        const dStart = newValue;
        const dEnd = this.dataForm.workTimeEnd;
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.dataForm.workTimeStart = this.dataForm.workTimeEnd;
            this.showAlert(
              this.t("capacityDeMng.volunteerActivities.form.errorDate")
            );
          });
        }
      }
      this.validateTime();
    },
    "dataForm.recruitmentTimeStart": function (newValue) {
      if (!this.dataForm.recruitmentTimeEnd) {
        this.dataForm.recruitmentTimeStart = newValue;
      } else {
        const dStart = newValue;
        const dEnd = this.dataForm.recruitmentTimeEnd;
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.dataForm.recruitmentTimeStart =
              this.dataForm.recruitmentTimeEnd;
            this.showAlert(
              this.t("capacityDeMng.volunteerActivities.form.errorDate")
            );
          });
        }
      }
      this.validateTime();
    },
    "dataForm.recruitmentTimeEnd": function (newValue) {
      if (!this.dataForm.recruitmentTimeStart) {
        this.dataForm.recruitmentTimeEnd = newValue;
      } else {
        const dStart = this.dataForm.recruitmentTimeStart;
        const dEnd = newValue;
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.dataForm.recruitmentTimeEnd =
              this.dataForm.recruitmentTimeStart;
            this.showAlert(
              this.t("capacityDeMng.volunteerActivities.form.errorDate")
            );
          });
        }
      }
      this.validateTime();
    },
  },
  methods: {
    checkData(metlSeq: any) {
      const childComponent = this.$refs.imageRef;
      childComponent.upLoadFile(metlSeq);
    },
    validate() {
      if (this.dataForm.contentVolunteer.trim().length == 0) {
        return false;
      }

      if (this.dataForm.recruitmentQuantity) {
        if (
          !/^\d*$/.test(this.dataForm.recruitmentQuantity) ||
          parseInt(this.dataForm.recruitmentQuantity) < 1 ||
          parseInt(this.dataForm.recruitmentQuantity) > 100
        ) {
          return false;
        }
      }

      if (
        !this.dataForm.objectVolunteer ||
        this.dataForm.objectVolunteer.length == 0
      ) {
        return false;
      }

      if (
        !this.dataForm.fieldVolunteer ||
        this.dataForm.fieldVolunteer.length == 0
      ) {
        return false;
      }

      if (
        this.dataForm.chargePhone.first &&
        (this.dataForm.chargePhone.first.length > 3 ||
          this.dataForm.chargePhone.first.length < 2 ||
          !/^\d*$/.test(this.dataForm.chargePhone.first))
      ) {
        return false;
      }

      if (
        this.dataForm.chargePhone.between &&
        (this.dataForm.chargePhone.between.length > 4 ||
          this.dataForm.chargePhone.between.length < 3 ||
          !/^\d*$/.test(this.dataForm.chargePhone.between))
      ) {
        return false;
      }

      if (
        this.dataForm.chargePhone.last &&
        (!(this.dataForm.chargePhone.last.length == 4) ||
          !/^\d*$/.test(this.dataForm.chargePhone.last))
      ) {
        return false;
      }

      if (this.dataForm.workDate) {
        let isChecked = false;
        let isInvalid = false;

        this.dataForm.workDate.forEach((dayItem) => {
          if (dayItem.checked) {
            isChecked = true;
            if (dayItem.hour == -1 || dayItem.minute == -1) {
              isInvalid = true;
            }
          }
        });

        if (!isChecked || isInvalid) {
          return false;
        }
      }

      if (
        this.dataForm.workTimeStart &&
        this.dataForm.workTimeEnd &&
        this.dataForm.recruitmentTimeStart &&
        this.dataForm.recruitmentTimeEnd
      ) {
        const workTimeStart = this.dataForm.workTimeStart;
        const recruitmentTimeStart = this.dataForm.recruitmentTimeStart;
        const recruitmentTimeEnd = this.dataForm.recruitmentTimeEnd;

        if (workTimeStart < recruitmentTimeStart) {
          return false;
        }

        if (workTimeStart < recruitmentTimeEnd) {
          return false;
        }
      }

      return true;
    },
    validateTime() {
      if (
        this.dataForm.workTimeStart &&
        this.dataForm.workTimeEnd &&
        this.dataForm.recruitmentTimeStart &&
        this.dataForm.recruitmentTimeEnd
      ) {
        const workTimeStart = this.dataForm.workTimeStart;
        const recruitmentTimeStart = this.dataForm.recruitmentTimeStart;
        const recruitmentTimeEnd = this.dataForm.recruitmentTimeEnd;

        if (workTimeStart < recruitmentTimeStart) {
          this.showAlert(
            this.t(
              "capacityDeMng.volunteerActivities.form.errorRecruitmentDate"
            )
          );
        }

        if (workTimeStart < recruitmentTimeEnd) {
          this.showAlert(
            this.t(
              "capacityDeMng.volunteerActivities.form.errorRecruitmentDate"
            )
          );
        }
      }
    },
    showAlert(message: string) {
      Swal.fire({
        text: message,
        showConfirmButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.save"),
      });
    },
    back() {
      this.$router.push({ path: SCREEN.volunteerActivites.path });
    },
    goToRegist() {
      this.$router.push({
        path: SCREEN.volunteerActivitesUserRegist.path,
        state: { id: this.dataForm.id },
      });
    },
    eventSave() {
      if (this.store.check || !this.validate()) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: this.t("common.cancel"),
        });
      } else {
        this.$swal({
          /* 저장하시겠어요? */
          text: this.t("capacityDeMng.volunteerActivities.form.confirmSave"),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.saveData();
          }
        });
      }
    },
    saveData() {
      this.store.setLoading(true);
      const dataSave = {
        id: this.dataForm.id,
        typeServe: {
          cdId: this.dataForm.typeVolunteer,
          cdNm: "",
          etc: "",
          upCdId: SOCIAL_TYPE_UP_CD_ID,
        },
        topic: this.dataForm.topic,
        contentVolunteer: this.dataForm.contentVolunteer,
        timeActive: this.dataForm.uptimeAdmitted,
        activeDateStart: format(this.dataForm.workTimeStart, FORMAT_YYY_MM_DD),
        activeDateEnd: format(this.dataForm.workTimeEnd, FORMAT_YYY_MM_DD),
        activeDay: this.convertToSocialServeSimpleDTO(this.dataForm.workDate),
        recruitmentDateStart: format(
          this.dataForm.recruitmentTimeStart,
          FORMAT_YYY_MM_DD
        ),
        recruitmentDateEnd: format(
          this.dataForm.recruitmentTimeEnd,
          FORMAT_YYY_MM_DD
        ),
        recruitmentNumb: this.dataForm.uptimeAdmitted,
        objectServe: this.convertCheckBoxToSimple(
          this.dataForm.objectVolunteer,
          SOCIAL_OBJECT_UP_CD_ID,
          SOCIAL_OBJECT_OTHER,
          this.dataForm.objectVolunteerOther
        ),
        fieldServe: this.convertCheckBoxToSimple(
          this.dataForm.fieldVolunteer,
          SOCIAL_FIELD_UP_CD_ID,
          SOCIAL_FIELD_OTHER,
          this.dataForm.fieldVolunteerOther
        ),
        addressServe: this.dataForm.addressVolunteer,
        url: this.dataForm.url,
        personCharge: this.dataForm.personCharge,
        numberCharge: `${this.dataForm.chargePhone.first} - ${this.dataForm.chargePhone.between} - ${this.dataForm.chargePhone.last}`,
      } as SocialServeReqDTO;

      if (this.dataForm.id) {
        countPer(this.dataForm.id).then((res) => {
          if (res.data.data > 0) {
            this.$swal({
              text: this.t("capacityDeMng.volunteerActivities.perAplyAlert"),
              type: "warning",
              showConfirmButton: false,
              showCancelButton: true,
              cancelButtonText: this.t("common.cancel"),
            });
            this.store.setLoading(false);
          } else {
            updateVolunteer(dataSave)
              .then((res) => {
                this.checkData(res.data.data);
                this.$swal
                  .fire({
                    text: this.t(
                      "capacityDeMng.volunteerActivities.form.saveSuccess"
                    ),
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: this.t("common.confirm"),
                  })
                  .then((res) => {
                    this.back();
                  });
              })
              .finally(() => {
                this.store.setLoading(false);
              });
          }
        });
      } else {
        createVolunteer(dataSave)
          .then((res) => {
            this.checkData(res.data.data);
            this.$swal
              .fire({
                text: this.t(
                  "capacityDeMng.volunteerActivities.form.saveSuccess"
                ),
                confirmButtonColor: "#DD6B55",
                confirmButtonText: this.t("common.confirm"),
              })
              .then((res) => {
                this.back();
              });
          })
          .finally(() => {
            this.store.setLoading(false);
          });
      }
    },
    convertToSocialServeSimpleDTO(workDateArray: any) {
      return workDateArray
        .filter((item: any) => item.checked)
        .map((item: any) => {
          return {
            cdId: item.id,
            cdNm: "",
            upCdId: SOCIAL_DATE_UP_CD_ID,
            etc: `${item.hour} - ${item.minute}`,
          };
        });
    },
    convertCheckBoxToSimple(
      data: string[],
      type: string,
      check: string,
      etc: string
    ) {
      return data.map((codeItem) => {
        return {
          cdId: codeItem,
          cdNm: "",
          upCdId: type,
          etc: codeItem == check ? etc : null,
        };
      });
    },
    onCheckObjectVolunteerOther() {
      return this.dataForm.objectVolunteer.includes(SOCIAL_OBJECT_OTHER);
    },
    onCheckFieldVolunteerOther() {
      return this.dataForm.fieldVolunteer.includes(SOCIAL_FIELD_OTHER);
    },
    changeEditor() {
      // Get content
      let content = this.$refs.myEditor
        .getHTML()
        .toString()
        .replace("<p><br></p>", "");
      this.dataForm.contentVolunteer = content;
    },
    async getData() {
      this.store.setLoading(true);
      await getListCodeMng({
        upCdIdList: [
          SOCIAL_TYPE_UP_CD_ID,
          SOCIAL_FIELD_UP_CD_ID,
          SOCIAL_OBJECT_UP_CD_ID,
          SOCIAL_DATE_UP_CD_ID,
        ],
      })
        .then((res) => {
          this.listType = res.data.data.filter(
            (el: CodeMngModel) => el.upCdId == SOCIAL_TYPE_UP_CD_ID
          );
          this.listField = res.data.data
            .filter((el: CodeMngModel) => el.upCdId == SOCIAL_FIELD_UP_CD_ID)
            .map((el: CodeMngModel) => {
              return {
                cdId: el.cdId,
                cdNm: el.cdNm,
                upCdId: el.upCdId,
              };
            });
          this.listObject = res.data.data
            .filter((el: CodeMngModel) => el.upCdId == SOCIAL_OBJECT_UP_CD_ID)
            .map((el: CodeMngModel) => {
              return {
                cdId: el.cdId,
                cdNm: el.cdNm,
                upCdId: el.upCdId,
              };
            });

          this.dataForm.workDate = res.data.data
            .filter((el: CodeMngModel) => el.upCdId == SOCIAL_DATE_UP_CD_ID)
            .map((el: CodeMngModel) => {
              return {
                id: el.cdId,
                cdNm: el.cdNm,
                hour: -1,
                minute: -1,
                checked: false,
              };
            });
        })
        .finally(() => {
          this.store.setLoading(false);
        });

      if (this.dataForm.id) {
        await this.goToDetail();
      }
    },
    goToDetail() {
      this.store.setLoading(true);
      const workDate = [...this.dataForm.workDate];
      detailVolunteer(this.dataForm.id)
        .then((res) => {
          this.dataForm = res.data.data;
          const phone = this.dataForm.numberCharge.split(" - ");

          this.dataForm.chargePhone = {
            first: phone[0],
            between: phone[1],
            last: phone[2],
          };

          this.dataForm.objectVolunteer = this.dataForm.objectServe.map(
            (objectItem: SocialServeSimpleDTO) => {
              return objectItem.cdId;
            }
          );
          const indexObjectOther = this.dataForm.objectServe.findIndex(
            (objectItem: SocialServeSimpleDTO) =>
              objectItem.cdId === SOCIAL_OBJECT_OTHER
          );
          if (indexObjectOther !== -1) {
            this.dataForm.objectVolunteerOther =
              this.dataForm.objectServe[indexObjectOther].etc;
          }
          this.dataForm.fieldVolunteer = this.dataForm.fieldServe.map(
            (objectItem: SocialServeSimpleDTO) => {
              return objectItem.cdId;
            }
          );
          const indexFieldOther = this.dataForm.fieldServe.findIndex(
            (objectItem: SocialServeSimpleDTO) =>
              objectItem.cdId === SOCIAL_FIELD_OTHER
          );
          if (indexFieldOther !== -1) {
            this.dataForm.fieldVolunteerOther =
              this.dataForm.fieldServe[indexFieldOther].etc;
          }

          workDate.forEach((day) => {
            const index = this.dataForm.activeDay.findIndex(
              (active) => active.cdId === day.id
            );
            if (index !== -1) {
              day.checked = true;

              const activeObject = this.dataForm.activeDay[index];
              let time = activeObject.etc.split(" - ");
              day.hour = time[0];
              day.minute = time[1];
            }
          });

          this.dataForm.workDate = workDate;

          this.$refs.myEditor.setHTML(this.dataForm.contentVolunteer);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    handleInput(
      event: Event,
      target: "first" | "between" | "last",
      maxLengh: number
    ) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.value.length > maxLengh) {
        inputElement.value = inputElement.value.slice(0, maxLengh);
      }
      this.dataForm.chargePhone[target] = inputElement.value;
    },
  },
});
</script>
<style scoped lang="scss">
.ql-editor {
  height: 120px;
}
.select_checkbox {
  display: flex;
  align-items: center;
  width: 300px;
}
.select_component_custom {
  width: 100px !important;
  margin: 0 !important;
}
</style>
