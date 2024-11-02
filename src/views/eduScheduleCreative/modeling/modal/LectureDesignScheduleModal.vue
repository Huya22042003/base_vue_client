<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'lectureDesignSchudeModel'"
    @close-modal="closeModal"
  >
    <!-- Modal content goes here -->
    <template #title>
      <strong v-if="modalType === 'type1'">
        {{ t("lectureDesignSchedule.modal.title") }}
      </strong>
      <strong v-if="modalType === 'type2'">
        {{ t("lectureDesignSchedule.modal.titleChooseDivision") }}
      </strong>
      <strong v-if="modalType === 'type3'">
        {{ t("lectureDesignSchedule.modal.titleChooseCheckbox") }}
      </strong>
    </template>
    <template #default>
      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 33%" />
            <col style="width: 67%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                {{ t("lectureDesignSchedule.modal.year") }}
              </th>
              <td>
                <SelectBoxBase
                  v-if="modalType == 'type3'"
                  :id="'year'"
                  :name="'year'"
                  :data="listSelectBoxSchoolYear"
                  v-model="schoolYear"
                ></SelectBoxBase>
                <div v-if="modalType == 'type2'">{{ yearDivision }}</div>
                <div v-if="modalType == 'type1'">{{ yearAdd }}</div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("lectureDesignSchedule.modal.term") }}
              </th>
              <td>
                <SelectBoxBase
                  v-if="modalType == 'type3'"
                  :id="'term'"
                  :name="'term'"
                  :data="listSelectBoxSemester"
                  v-model="termCd"
                ></SelectBoxBase>
                <div v-if="modalType == 'type2'">{{ termDivision }}</div>
                <div v-if="modalType == 'type1'">{{ termAdd }}</div>
              </td>
            </tr>
            <tr v-if="modalType == 'type2'">
              <th scope="row">
                {{ t("lectureDesignSchedule.modal.subjectName") }}
              </th>
              <td class="td_input">
                <p>{{ sbjtDivision }}</p>
              </td>
            </tr>
            <tr v-if="modalType == 'type2'">
              <th scope="row">
                {{ t("lectureDesignSchedule.modal.classDivision") }}
              </th>
              <td class="td_input">
                <p>{{ division }}</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("lectureDesignSchedule.modal.lecturePlanWritingPeriod") }}
              </th>
              <td>
                <div class="flex items-center justify-between time">
                  <div class="flex time-start-end">
                    <div>
                      <BaseDatePicker
                        v-model="dataInfo.lectPlanStrDate"
                        :placeholder="t('common.startDate')"
                        :id="'start-date1'"
                        isRequired
                      ></BaseDatePicker>
                    </div>
                  </div>
                  <div class="ml-2 mr-2 tilde">~</div>
                  <div class="flex time-start-end">
                    <div>
                      <BaseDatePicker
                        v-model="dataInfo.lectPlanEndDate"
                        :placeholder="t('common.endDate')"
                        :id="'end-date2'"
                        isRequired
                      ></BaseDatePicker>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("lectureDesignSchedule.modal.evalPlanPeriod") }}
              </th>
              <td>
                <div class="flex items-center justify-between time">
                  <div class="flex time-start-end">
                    <div>
                      <BaseDatePicker
                        v-model="dataInfo.evalPlanStrDate"
                        :placeholder="t('common.startDate')"
                        :id="'start-date3'"
                        isRequired
                      ></BaseDatePicker>
                    </div>
                  </div>
                  <div class="ml-2 mr-2 tilde">~</div>
                  <div class="flex time-start-end">
                    <div>
                      <BaseDatePicker
                        v-model="dataInfo.evalPlanEndDate"
                        :placeholder="t('common.endDate')"
                        :id="'end-date4'"
                        isRequired
                      ></BaseDatePicker>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("lectureDesignSchedule.modal.studentJobEval") }}
              </th>
              <td>
                <div class="flex items-center justify-between time">
                  <div class="flex time-start-end">
                    <div>
                      <BaseDatePicker
                        v-model="dataInfo.jobCapaStrDate"
                        :placeholder="t('common.startDate')"
                        :id="'start-date5'"
                        isRequired
                      ></BaseDatePicker>
                    </div>
                  </div>
                  <div class="ml-2 mr-2 tilde">~</div>
                  <div class="flex time-start-end">
                    <div>
                      <BaseDatePicker
                        v-model="dataInfo.jobCapaEndDate"
                        :placeholder="t('common.endDate')"
                        :id="'end-date6'"
                        isRequired
                      ></BaseDatePicker>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("lectureDesignSchedule.modal.subjectCqiWritingPeriod") }}
              </th>
              <td>
                <div class="flex items-center justify-between time">
                  <div class="flex time-start-end">
                    <div>
                      <BaseDatePicker
                        v-model="dataInfo.cqiStrDate"
                        :placeholder="t('common.startDate')"
                        :id="'start-date7'"
                        isRequired
                      ></BaseDatePicker>
                    </div>
                  </div>
                  <div class="ml-2 mr-2 tilde">~</div>
                  <div class="flex time-start-end">
                    <div>
                      <BaseDatePicker
                        v-model="dataInfo.cqiEndDate"
                        :placeholder="t('common.endDate')"
                        :id="'end-date8'"
                        isRequired
                      ></BaseDatePicker>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #footer>
      <!-- Footer content goes here -->
      <ButtonBase
        type="button"
        class="btn_round btn_lg btn_primary mg_l10"
        :buttonName="t('lectureDesignSchedule.modal.save')"
        @click="confirmAction"
      >
      </ButtonBase>
      <button
        type="button"
        class="btn_round btn_lg btn_gray mg_l10"
        @click="closeModal"
      >
        {{ t("lectureDesignSchedule.modal.close") }}
      </button>
    </template>
  </TModal>
</template>
<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
import type {
  LectureDesignSchudeModel,
  LectRegModel,
  LectRegItem,
} from "@/stores/LectureDesignSchedule/LectureDesignSchedule.type";
import {
  getDetailData,
  saveLectDetail,
  saveLectChecked,
  saveLectAll,
} from "@/stores/LectureDesignSchedule/LectureDesignSchedule.service";
import { UP_CD_ID_SEMESTER } from "@/constants/common.const";
import { getCodeMngByUpCdId } from "@/stores/common/codeMng/codeMng.service";
import Swal from "sweetalert2";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default defineComponent({
  name: "lectureDesignSchudeModel",
  components: {
    ButtonBase,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    modalType: {
      type: String as PropType<"type1" | "type2" | "type3">,
      required: true,
    },
    writeSchdlSeq: {
      type: String,
      required: false,
    },
    listSubjectItem: {
      type: Array<LectRegItem>,
      required: false,
    },
    yearAdd: {
      type: String,
      required: false,
    },
    termAdd: {
      type: String,
      required: false,
    },
    termDivision: {
      type: String,
      required: false,
    },
    sbjtDivision: {
      type: String,
      required: false,
    },
    division: {
      type: String,
      required: false,
    },
    yearDivision: {
      type: String,
      required: false,
    },
    cdDivision: {
      type: String,
      required: false,
    },
    getDataAll: {
      type: Function,
    },
  },
  setup: (props) => {
    const { t } = useI18n();
    const cmn = commonStore();
    const currentYear = new Date().getFullYear();
    return { t, cmn, props, currentYear };
  },
  data() {
    return {
      schoolYear: this.currentYear,
      listSelectBoxSchoolYear: [
        {
          cdId: this.currentYear.toString(),
          cdNm: this.currentYear.toString(),
        },
        {
          cdId: (this.currentYear + 1).toString(),
          cdNm: (this.currentYear + 1).toString(),
        },
      ],
      termCd: "",
      messageInfo: "",
      dataInfo: {} as LectureDesignSchudeModel,
      regData: {} as LectRegModel,
      listSelectBoxSemester: [],
    };
  },
  mounted() {
    if (this.modalType == "type2") {
      if (this.writeSchdlSeq != null) {
        this.getLectInfo(this.writeSchdlSeq);
      }
    } else if (this.modalType == "type3") {
      this.getCodeType();
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    getCodeType() {
      this.cmn.setLoading(true);
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_SEMESTER })
        .then((response: any) => {
          response.data.data.forEach((item: any) => {
            this.listSelectBoxSemester.push(item);
          });
          if (this.listSelectBoxSemester.length > 0) {
            this.termCd = this.listSelectBoxSemester[0].cdId;
          }
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    confirmAction() {
      this.regData.divCd = this.cdDivision;
      this.regData.listLectCd = this.listSubjectItem;
      this.regData.lectPlanStrDate = this.dataInfo.lectPlanStrDate;
      this.regData.lectPlanEndDate = this.dataInfo.lectPlanEndDate;
      this.regData.evalPlanStrDate = this.dataInfo.evalPlanStrDate;
      this.regData.evalPlanEndDate = this.dataInfo.evalPlanEndDate;
      this.regData.jobCapaStrDate = this.dataInfo.jobCapaStrDate;
      this.regData.jobCapaEndDate = this.dataInfo.jobCapaEndDate;
      this.regData.cqiStrDate = this.dataInfo.cqiStrDate;
      this.regData.cqiEndDate = this.dataInfo.cqiEndDate;
      this.regData.year = this.schoolYear;
      this.regData.termCd = this.termCd;
      if (this.cmn.check) {
        Swal.fire({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: this.t("common.cancel"),
        });
      } else {
        Swal.fire({
          text: this.t("common.message.save"),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: this.t("common.save"),
          cancelButtonText: this.t("common.cancel"),
        }).then((result) => {
          if (result.isConfirmed) {
            this.cmn.setLoading(true);
            let savePromise;
            if (this.modalType == "type2") {
              savePromise = saveLectDetail(this.regData);
            } else if (this.modalType == "type1") {
              savePromise = saveLectChecked(this.regData);
            } else if (this.modalType == "type3") {
              savePromise = saveLectAll(this.regData);
            }
            if (savePromise) {
              savePromise
                .then((res) => {
                  Swal.fire({
                    text: this.t("common.message.saveSuccess"),
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonText: this.t("common.confirm"),
                  });
                })
                .finally(async () => {
                  await this.getDataAll(1, 10);
                  await this.closeModal();
                  this.cmn.setLoading(false);
                });
            } else {
              this.cmn.setLoading(false);
            }
          }
        });
      }
    },

    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    getLectInfo(writeSchdlSeq: any) {
      this.cmn.setLoading(true);
      getDetailData(writeSchdlSeq)
        .then((res) => {
          this.dataInfo = res.data.data;
        })
        .finally(() => {
          this.cmn.setLoading(false);
        });
    },
    validateDates(startDate, endDate, type, startKey, endKey) {
      if (startDate && endDate) {
        const dStart = this.formatDate(startDate);
        const dEnd = this.formatDate(endDate);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            if (type === "start") {
              this.dataInfo[startKey] = endDate;
            } else {
              this.dataInfo[endKey] = startDate;
            }
            Swal.fire({
              text: this.t("common.messageCheckDate"),
              type: "warning",
              showCancelButton: true,
              showConfirmButton: false,
              cancelButtonText: this.t("common.cancel"),
            });
          });
        }
      }
    },
  },
  watch: {
    "dataInfo.lectPlanStrDate"(newValue) {
      this.validateDates(
        newValue,
        this.dataInfo.lectPlanEndDate,
        "start",
        "lectPlanStrDate",
        "lectPlanEndDate"
      );
    },
    "dataInfo.lectPlanEndDate"(newValue) {
      this.validateDates(
        this.dataInfo.lectPlanStrDate,
        newValue,
        "end",
        "lectPlanStrDate",
        "lectPlanEndDate"
      );
    },
    "dataInfo.evalPlanStrDate"(newValue) {
      this.validateDates(
        newValue,
        this.dataInfo.evalPlanEndDate,
        "start",
        "evalPlanStrDate",
        "evalPlanEndDate"
      );
    },
    "dataInfo.evalPlanEndDate"(newValue) {
      this.validateDates(
        this.dataInfo.evalPlanStrDate,
        newValue,
        "end",
        "evalPlanStrDate",
        "evalPlanEndDate"
      );
    },
    "dataInfo.jobCapaStrDate"(newValue) {
      this.validateDates(
        newValue,
        this.dataInfo.jobCapaEndDate,
        "start",
        "jobCapaStrDate",
        "jobCapaEndDate"
      );
    },
    "dataInfo.jobCapaEndDate"(newValue) {
      this.validateDates(
        this.dataInfo.jobCapaStrDate,
        newValue,
        "end",
        "jobCapaStrDate",
        "jobCapaEndDate"
      );
    },
    "dataInfo.cqiStrDate"(newValue) {
      this.validateDates(
        newValue,
        this.dataInfo.cqiEndDate,
        "start",
        "cqiStrDate",
        "cqiEndDate"
      );
    },
    "dataInfo.cqiEndDate"(newValue) {
      this.validateDates(
        this.dataInfo.cqiStrDate,
        newValue,
        "end",
        "cqiStrDate",
        "cqiEndDate"
      );
    },
  },
});
</script>

<style scoped>
.time {
  display: flex;
  align-items: baseline;
}

.time-start-end {
  display: flex;
}

.tilde {
  display: flex;
}
</style>
