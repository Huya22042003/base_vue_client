<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'modal_form'"
    @close-modal="onClose"
  >
    <template #title>
      <strong>
        <!-- 교육목 인증제 반려 -->
         {{ t("certificationReport.manageApprovedSubjects.title5") }}
        </strong>
    </template>
    <template #default>
      <p>{{ t("06.capstoneDesign.popUp.required") }}</p>
      <div class="box_section">
        <TextArea
          id="textArea_validate"
          placeholder=""
          required
          v-model="reason"
        />
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_md btn_black"
        :disabled="reason == ''"
        @click="reasonReject"
      >
      {{ t("certificationReport.manageApprovedSubjects.reject") }}
      </button>
      <button
        type="button"
        class="button btn_md btn_black"
        @click="onClose()"
      >
      {{ t("common.cancel") }}
      </button>
    </template>
  </TModal>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { commonStore } from "@/stores/common";
export default {
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    idDetail: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    return {
      t,
      store,
    };
  },
  data() {
    return {
      reason: "",
    };
  },
  methods: {
    reasonReject() {
      this.$emit('content', this.reason);
      
      this.onClose();
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
