<template>
  <TModal :is-open="modalOpen" :is-show-header="true" :is-show-footer="true" :modal-id="modalId"
          @close-modal="closeModal" class-size="small">
    <!-- Modal content goes here -->
    <template #title>
      <strong>{{ title }}</strong>
    </template>
    <template #default>
      <div class="modal_custom">
        <p>{{ itemName }}</p>
        <InputBase v-model="iValue" />
      </div>
    </template>
    <template #footer>
      <!-- Footer content goes here -->
      <button type="button" class="button btn_xl btn_blue"
              :disabled="!iValue?.length"
              @click="handleConfirmAction">
        저장
      </button>
      <button type="button" class="button btn_xl btn_white popup_close"
              @click="cancelAction">닫기
      </button>
    </template>
  </TModal>
</template>

<script setup lang="ts">

import TModal from "@/components/common/modal/TModal.vue";
import { watch } from "vue";
import InputBase from "@/components/common/input/InputBase.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
  inputValue: {
    type: String,
    required: false,
  },
  modalId: {
    type: String,
    required: false,
    default: "modal",
  },
  title: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "update:inputValue", "confirmAction"]);

const modalOpen = ref(false);
const iValue = ref<string>();

watch(
  () => props.modelValue,
  (newValue) => {
    modalOpen.value = newValue;
  },
);

watch(
  () => props.inputValue,
  (newValue) => {
    iValue.value = props.inputValue;
  },
);

const handleConfirmAction = () => {
  emit("confirmAction", iValue.value);
  closeModal();
};
const cancelAction = () => {
  closeModal();
};

const closeModal = () => {
  emit("update:modelValue", false);
  iValue.value = "";
};
</script>

<style scoped lang="scss">
.modal_custom {
  display: flex;
  gap: 16px;
  align-items: center;
}

.modal_custom p {
  flex-shrink: 0;
  padding-right: 10px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.2em;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  text-align: right;
}
</style>