<template>
  <div>
    <TModal
      :is-open="isOpen"
      :is-show-header="true"
      :is-show-footer="true"
      @close-modal="closeModal"
    >
      <template #title>
        <strong>{{ t("02.modal.title") }}</strong>
      </template>
      <template #default>
        <table class="tbl_row">
          <caption>
            Popup high
          </caption>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">
                {{ t("02.modal.programNm") }}
              </th>
              <td class="td_input">
                <InputBase
                  :id="'progNm'"
                  type="text"
                  class="mg_l5"
                  v-model="dataInsert.progNm"
                >
                </InputBase>
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">{{ t("02.modal.url") }}</th>
              <td>
                <InputBase
                  :id="'url'"
                  type="text"
                  class="mg_l5"
                  v-model="dataInsert.url"
                >
                </InputBase>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template #footer>
        <button
          type="button"
          class="button btn_sm btn_white"
          @click="cancelAction"
        >
          {{ t("02.modal.btnClose") }}
        </button>
        <button
          type="button"
          class="button btn_sm btn_blue btn_responsive"
          @click="confirmAction"
        >
          {{ t("02.modal.btnSave") }}
        </button>
      </template>
    </TModal>
  </div>
</template>
<script lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import { commonStore } from "@/stores/common";
import { defineComponent } from "vue";
import type { PopUpInfo } from "@/stores/profAbility/profAbility.type";

export default defineComponent({
  name: "ModalComponent",
  props: {
    statusPopUp: {
      type: String,
      required: false,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    popUpInfo: {
      type: Object as () => PopUpInfo,
      required: false,
      default: () => null,
    },
  },
  components: {
    InputBase,
  },
  setup: () => {
    const idxHigh = 0;
    const store = commonStore();
    const { t } = useI18n();
    return { idxHigh, store, t };
  },
  updated() {
    this.checkRequired = this.store.check;
  },
  watch: {
    isOpen(newValue) {
      if (!newValue) {
        this.reset();
      }
    },
  },
  computed: {
    check() {
      return !this.dataInsert.progNm || !this.dataInsert.url;
    },
  },
  beforeMount() {
    this.dataInsert = { ...this.popUpInfo };
  },
  data() {
    return {
      modalOpen: false,
      progNm: "",
      url: "",
      dataInsert: {} as PopUpInfo,
      checkRequired: true,
    };
  },
  methods: {
    confirmAction() {
      if (!this.check) {
        this.$emit("action-modal", this.dataInsert);
      } else {
        this.$swal({
          text: this.t("02.profAbilityAction.message.checkEmpty"),
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "확인",
        });
      }
    },
    closeModal() {
      this.$emit("close-modal");
      this.reset();
    },
    cancelAction() {
      this.closeModal();
    },
    reset() {
      this.dataInsert.progNm = "";
      this.dataInsert.url = "";
    },
  },
});
</script>
