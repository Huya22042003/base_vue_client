<template lang="html">
  <TModal
    :is-open="modalOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="modalId"
    :size="'md'"
    @close-modal="closeModal"
  >
    <template #title>
      <p class="box_title_sm">
        {{ t("05.eduProcessCreation.listAndApprove.title5") }}
      </p>
    </template>
    <template #default>
      <div class="box_section">
        <div class="tbl_row">
          <p class="note_custom">
            {{ t("05.eduProcessCreation.listAndApprove.warning.warning6") }}
          </p>
          <TextArea
            v-model="apprReqModel.rejectRsn"
            required
            id="textarea"
            cols="30"
            rows="5"
          ></TextArea>
        </div>
        <div class="box_section mt-5">
          <div class="btn_group btn_end">
            <button type="button" class="btn_xs btn_blue" @click="rejectAppro">
              {{ t("05.eduProcessCreation.listAndApprove.button.reject") }}
            </button>
            <button
              type="button"
              class="btn_xs btn_white popup_close mr-2"
              @click="closeModal"
            >
              {{ t("common.confirm") }}
            </button>
          </div>
        </div>
      </div>
    </template>
    <template #footer> </template>
  </TModal>
</template>

<script lang="ts">
import TextArea from "@/components/common/input/TextArea.vue";
import TModal from "@/components/common/modal/TModal.vue";
import { CODE_103980, CREATED_STATUS } from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { EduCourseStore } from "@/stores/eduProcessCreation";
import type { EduCourseAppReqReqModel } from "@/stores/eduProcessCreation/eduCourse/eduProcess.type";
import { useI18n } from "vue-i18n";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
  },
  components: {},
  setup() {
    const { t } = useI18n();
    const storeCommon = commonStore();
    const eduCourseStore = EduCourseStore();

    return { t, storeCommon, eduCourseStore };
  },
  data() {
    return {
      modalId: "example-modal",
      modalOpen: false,
      apprReqModel: {} as EduCourseAppReqReqModel,
    };
  },
  beforeMount() {
    this.openModal();
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.$emit("close-modal");
    },
    async rejectAppro() {
      if (this.storeCommon.check) {
        this.$swal({
          text: this.t("common.messageValidateRequired"),
          type: "warning",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.confirm"),
        }).then((result: any) => {});
      } else {
        this.storeCommon.setLoading(true);
        this.apprReqModel.apprReqSeq = this.id;
        this.apprReqModel.stsCd = CODE_103980;
        await this.eduCourseStore.requestEduCourseApprove([this.apprReqModel]);
        if (this.eduCourseStore.status == CREATED_STATUS) {
          this.openRejectAlert();
        }
        this.storeCommon.setLoading(false);
      }
    },
    openRejectAlert() {
      this.$swal({
        text: this.t(
          "05.eduProcessCreation.listAndApprove.message.rejectSuccess"
        ),
        type: "warning",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.confirm"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.closeModal();
        }
      });
    },
  },
};
</script>

<style scoped>
.note {
  color: red;
}
</style>
