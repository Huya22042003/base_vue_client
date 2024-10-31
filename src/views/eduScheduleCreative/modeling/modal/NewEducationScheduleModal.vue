<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'NewEducationScheduleModal'"
    @close-modal="closeModal"
  >
    <!-- Modal content goes here -->
    <template #title>
      <strong>
        {{
          checkSetup
            ? t("04.eduScheduleCreativeMng.newEducationSchedule.modal.title")
            : t("04.eduScheduleCreativeMng.newEducationSchedule.modal.title2")
        }}
      </strong>
    </template>
    <template #default>
      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 30%" />
            <col style="width: 70%" />
          </colgroup>
          <tbody>
            <tr v-if="checkSetup == false">
              <th scope="row">
                {{
                  t(
                    "04.eduScheduleCreativeMng.newEducationSchedule.modal.schoolYear"
                  )
                }}
              </th>
              <td>
                <SelectBoxBase
                  :data="listSelectBoxSchoolYear"
                  v-model="schoolYear"
                ></SelectBoxBase>
              </td>
            </tr>
            <tr v-if="checkSetup == true">
              <th scope="row">
                {{
                  t(
                    "04.eduScheduleCreativeMng.newEducationSchedule.modal.schoolYear"
                  )
                }}
              </th>
              <td>
                <p>{{ newEducationScheduleModel.year }}</p>
              </td>
            </tr>
            <tr v-if="checkSetup == true">
              <th scope="row">
                {{
                  t(
                    "04.eduScheduleCreativeMng.newEducationSchedule.modal.specializedUniversity"
                  )
                }}
              </th>
              <td class="td_input">
                <p>{{ newEducationScheduleModel.deptUniNm }}</p>
              </td>
            </tr>
            <tr v-if="checkSetup == true">
              <th scope="row">
                {{
                  t(
                    "04.eduScheduleCreativeMng.newEducationSchedule.modal.faculty"
                  )
                }}
              </th>
              <td class="td_input">
                <p>{{ newEducationScheduleModel.deptNm }}</p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{
                  t(
                    "04.eduScheduleCreativeMng.newEducationSchedule.modal.newCreationTime"
                  )
                }}
              </th>
              <td>
                <div class="flex items-center justify-between time">
                  <div class="flex time-start-end">
                    <div>
                      <BaseDatePicker
                        v-model="creationTimeBegin"
                        :placeholder="t('common.startDate')"
                        :id="'start-date'"
                        isRequired
                      ></BaseDatePicker>
                    </div>
                  </div>
                  <div class="ml-2 mr-2 tilde">~</div>
                  <div class="flex time-start-end">
                    <div>
                      <BaseDatePicker
                        v-model="creationTimeEnd"
                        :placeholder="t('common.endDate')"
                        :id="'end-date'"
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
        class="button btn_xl btn_primary"
        :buttonName="
          t('04.eduScheduleCreativeMng.newEducationSchedule.modal.action.save')
        "
        @click="confirmAction"
      >
      </ButtonBase>
      <ButtonBase
        type="button"
        class="button btn_xl btn_white popup_close"
        @click="cancelAction"
        :buttonName="
          t(
            '04.eduScheduleCreativeMng.newEducationSchedule.modal.action.cancel'
          )
        "
      >
      </ButtonBase>
    </template>
  </TModal>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import type {
  NewEducationScheduleModel,
  NewEducationScheduleReqModel,
} from "../../../../stores/newEducationSchedule/NewEducationSchedule.type";
import {
  SUCCSESS_STATUS,
  START_YEAR,
} from "../../../../constants/screen.const.ts";
import { commonStore } from "../../../../stores/common.ts";
import { NewEducationScheduleStore } from "../../../../stores/newEducationSchedule";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default defineComponent({
  components: {
    ButtonBase,
  },
  name: "NewEducationScheduleModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    checkSetup: {
      type: Boolean,
      required: true,
    },
    newEducationScheduleModel: {
      type: Object as () => NewEducationScheduleModel,
      required: true,
    },
  },
  created() {
    this.generateHours();
    this.generateYear();
  },
  components: {},
  setup: (props) => {
    const { t } = useI18n();
    const cmn = commonStore();
    const store = NewEducationScheduleStore();
    return { t, cmn, store, props };
  },
  beforeMount() {
    if (this.checkSetup) {
      this.creationHourBegin = this.extractHour(
        this.newEducationScheduleModel.strDate
      );
      this.creationHourEnd = this.extractHour(
        this.newEducationScheduleModel.endDate
      );
      if (this.newEducationScheduleModel.strDate != null) {
        this.creationTimeBegin = this.extractDate(
          this.newEducationScheduleModel.strDate
        );
      }
      if (this.newEducationScheduleModel.endDate != null) {
        this.creationTimeEnd = this.extractDate(
          this.newEducationScheduleModel.endDate
        );
      }
    } else {
      this.creationHourBegin = "00";
      this.creationHourEnd = "00";
    }
  },
  data() {
    return {
      listSelectBoxHour: [],
      listSelectBoxSchoolYear: [],
      creationTimeBegin: null,
      creationTimeEnd: null,
      creationHourBegin: "00",
      creationHourEnd: "00",
      schoolYear: new Date().getFullYear() + 1,
      newEducationScheduleReqModel: {} as NewEducationScheduleReqModel,
      messageInfo: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    confirmAction() {
      if (this.checkSetup) {
        this.showAlertConfirm(
          this.newEducationScheduleModel.deptNm +
            this.t("04.eduScheduleCreativeMng.alert.save")
        );
      } else {
        this.showAlertConfirm(
          this.t("04.eduScheduleCreativeMng.alert.saveAll")
        );
      }
    },
    cancelAction() {
      this.closeModal();
    },
    generateHours() {
      for (let i = 0; i < 24; i++) {
        let hour = i.toString().padStart(2, "0");
        this.listSelectBoxHour.push({
          cdId: hour,
          cdNm: hour + this.t("04.eduScheduleCreativeMng.hour"),
        });
      }
    },
    generateYear() {
      const currentYear = new Date().getFullYear();
      for (let i = START_YEAR; i <= currentYear; i++) {
        this.listSelectBoxSchoolYear.unshift({ cdId: i, cdNm: i });
      }
      this.listSelectBoxSchoolYear.unshift({
        cdId: currentYear + 1,
        cdNm: currentYear + 1,
      });
    },
    extractHour(dateTimeStr: any) {
      if (dateTimeStr == null) {
        return "00";
      }
      const parts = dateTimeStr.split(" ");
      const timePart = parts[1];
      const timeParts = timePart.split(":");
      const hour = timeParts[0];
      return hour;
    },
    extractDate(dateTimeStr: any) {
      if (dateTimeStr == null) {
        return new Date();
      }
      return new Date(dateTimeStr.replace(" ", "T"));
    },
    formatDate(date: any) {
      const originalDate = new Date(date);
      const year = originalDate.getFullYear();
      const month = String(originalDate.getMonth() + 1).padStart(2, "0");
      const day = String(originalDate.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
    formatDateToString(date: any, hour: any) {
      return `${this.formatDate(date)}T${hour}:00:00`;
    },
    async handleModifyAction() {
      this.cmn.setLoading(true);
      if (this.checkSetup) {
        this.newEducationScheduleReqModel.deptCd =
          this.newEducationScheduleModel.deptCd;
        this.newEducationScheduleReqModel.writeSchdlSeq =
          this.newEducationScheduleModel.writeSchdlSeq;
        this.newEducationScheduleReqModel.year =
          this.newEducationScheduleModel.year;
        this.newEducationScheduleReqModel.strDate = this.formatDateToString(
          this.creationTimeBegin,
          this.creationHourBegin
        );
        this.newEducationScheduleReqModel.endDate = this.formatDateToString(
          this.creationTimeEnd,
          this.creationHourEnd
        );
        await this.store.setupSchedule(this.newEducationScheduleReqModel);
        if (this.store && this.store.status == SUCCSESS_STATUS) {
          this.$emit("getDataAll");
          this.$emit("closeModal");
          this.showAlert(this.t("04.mesStatusActiton.success"));
        }
      } else {
        this.newEducationScheduleReqModel.year = this.schoolYear;
        this.newEducationScheduleReqModel.strDate = this.formatDateToString(
          this.creationTimeBegin,
          this.creationHourBegin
        );
        this.newEducationScheduleReqModel.endDate = this.formatDateToString(
          this.creationTimeEnd,
          this.creationHourEnd
        );
        await this.store.setupScheduleAll(this.newEducationScheduleReqModel);
        if (this.store && this.store.status == SUCCSESS_STATUS) {
          this.$emit("getDataAll");
          this.$emit("closeModal");
          this.showAlert(this.t("04.mesStatusActiton.success"));
        }
      }
      this.cmn.setLoading(false);
    },

    showAlert(mess: any) {
      this.$swal({
        text: mess,
        type: "warning",
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.confirm"),
      });
    },
    showAlertConfirm(mess: any) {
      if (this.cmn.check) {
        this.showAlert(this.t("common.messageValidateRequired"));
        return;
      }
      this.$swal({
        text: mess,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          this.handleModifyAction();
        }
      });
    },
  },
  watch: {
    creationTimeBegin(newValue) {
      if (!this.creationTimeEnd) {
        this.creationTimeBegin = newValue;
      } else {
        const dStart = this.formatDate(newValue);
        const dEnd = this.formatDate(this.creationTimeEnd);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.creationTimeBegin = this.creationTimeEnd;
            this.showAlert(this.t("common.messageCheckDate"));
          });
        }
      }
    },
    creationTimeEnd(newValue) {
      if (!this.creationTimeBegin) {
        this.creationTimeEnd = newValue;
      } else {
        const dStart = this.formatDate(this.creationTimeBegin);
        const dEnd = this.formatDate(newValue);
        if (dStart > dEnd) {
          this.$nextTick(() => {
            this.creationTimeEnd = this.creationTimeBegin;
            this.showAlert(this.t("common.messageCheckDate"));
          });
        }
      }
    },
    creationHourBegin(newValue) {
      if (!this.creationTimeEnd) {
        this.creationHourBegin = newValue;
      } else {
        const dStart = this.formatDate(this.creationTimeBegin);
        const dEnd = this.formatDate(this.creationTimeEnd);
        if (dStart == dEnd) {
          if (this.creationHourBegin > this.creationHourEnd) {
            this.$nextTick(() => {
              this.creationHourBegin = this.creationHourEnd;
              this.showAlert(this.t("common.messageCheckDate"));
            });
          }
        }
      }
    },
    creationHourEnd(newValue) {
      if (!this.creationHourBegin) {
        this.creationHourEnd = newValue;
      } else {
        const dStart = this.formatDate(this.creationTimeBegin);
        const dEnd = this.formatDate(this.creationTimeEnd);
        if (dStart == dEnd) {
          if (this.creationHourEnd < this.creationHourBegin) {
            this.$nextTick(() => {
              this.creationHourEnd = this.creationHourBegin;
              this.showAlert(this.t("common.messageCheckDate"));
            });
          }
        }
      }
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
