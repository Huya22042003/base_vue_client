<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    @close-modal="closeModal"
    ><template #title>
      <strong> {{ t("11.diagEmployeeAbility.titleModal") }}</strong>
    </template>
    <template #default>
      <div>
        <p>{{ t("11.diagEmployeeAbility.content1") }}</p>
        <p>{{ t("11.diagEmployeeAbility.content2") }}</p>
        <p>{{ t("11.diagEmployeeAbility.content3") }}</p>
      </div>
      <div class="mt_5">
        <p>{{ t("11.diagEmployeeAbility.confirm") }}</p>
      </div>
      <div class="mt_8">
        <div class="dp_flex btn_group btn_center" style="gap: 10px">
          <button
            class="btn_round btn_xs btn_lightgray"
            @click="completePublicInfo"
          >
            {{ t("11.diagEmployeeAbility.yes") }}
          </button>
          <button class="btn_round btn_xs btn_white" @click="closeModal">
            {{ t("11.diagEmployeeAbility.no") }}
          </button>
        </div>
      </div>
    </template>
  </TModal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { commonStore } from "../../stores/common";
import { SCREEN } from "../../router/screen";
import { updatePublicInfo } from "../../stores/diagEmployeeAbilityStaff/diagEmployeeAbility.service";

export default defineComponent({
  name: "ModalPublicInfo",
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    diagSeq: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      diagSeqSelected: "",
    };
  },
  watch: {
    diagSeq(newValue) {
      this.diagSeqSelected = newValue;
    },
  },
  beforeMount() {},
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    completePublicInfo() {
      this.cmn.setLoading(true);
      updatePublicInfo({ diagSeq: this.diagSeqSelected }).then((res) => {
        this.cmn.setLoading(false);
        this.closeModal();
        this.gotoDetail();
      });
    },
    rejectPublicInfo() {
      this.closeModal();
    },
    gotoDetail() {
      this.$router.push({
        name: SCREEN.detailDiagEmployeeAbilityStaff.name,
        state: { id: this.diagSeqSelected },
      });
    },
  },
});
</script>
