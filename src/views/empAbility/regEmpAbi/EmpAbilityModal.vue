<template>
  <div>
    <TModal
      :is-open="isOpen"
      :is-show-header="true"
      :is-show-footer="true"
      @close-modal="closeModal"
    >
      <template #title>
        <p class="section_tit">{{ t("02.empAbility.popup.title") }}</p>
      </template>
      <template #default>
        <table class="tbl_row">
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">
                {{ t("02.empAbility.popup.progNm") }}
              </th>

              <td class="td_input">
                <InputBase
                  required
                  :id="'programName'"
                  v-model="dataInsert.progNm"
                />
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">
                {{ t("02.empAbility.popup.url") }}
              </th>
              <td>
                <InputBase
                  required
                  :id="'programUrl'"
                  v-model="dataInsert.url"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template #footer>
        <button
          type="button"
          class="button btn_xs btn_white"
          @click="closeModal"
        >
          {{ t("02.empAbility.popup.save") }}
        </button>
        <button
          type="button"
          class="button btn_xs btn_blue popup_close"
          @click="showAlert"
        >
          {{ t("02.empAbility.popup.close") }}
        </button>
      </template>
    </TModal>
  </div>
</template>

<script lang="ts">
import InputBase from "@/components/common/input/InputBase.vue";
import { defineComponent } from "vue";
import type { PopUpInfo } from "@/stores/empAbility/empAbility.type";
import { commonStore } from "@/stores/common";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "ModalComponent",
  props: {
    statusPopUp: {
      type: String,
      required: true,
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
  data() {
    return {
      dataInsert: {} as PopUpInfo,
      isCheckModal: false,
    };
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  beforeMount() {
    this.dataInsert = { ...this.popUpInfo };
  },
  watch: {
    dataInsert: {
      handler: "checkValid",
      deep: true,
    },
  },
  methods: {
    confirmAction() {
      this.dataInsert.status = this.statusPopUp;
      this.$emit("select-item", this.dataInsert);
      this.closeModal();
    },
    closeModal() {
      this.$emit("close-modal");
      this.dataInsert.progNm = "";
      this.dataInsert.url = "";
      this.dataInsert.status = "";
      this.dataInsert.id = -1;
    },
    showAlert() {
      if (this.isCheckModal) {
        Swal.fire({
          text: this.t("02.empAbility.message.quesSave"),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "확인",
          cancelButtonText: "취소",
        })
          .then((result: any) => {
            if (result.isConfirmed) {
              this.confirmAction();
            }
          })
          .finally(() => {});
      } else {
        Swal.fire({
          text: this.t("02.empAbility.message.validNotEmpty"),
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "확인",
        });
      }
    },
    checkValid() {
      this.isCheckModal = this.dataInsert.progNm && this.dataInsert.url;
    },
  },
});
</script>
