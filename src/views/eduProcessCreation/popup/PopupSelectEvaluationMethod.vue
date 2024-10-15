<template>
  <TModal
    :is-open="isOpen"
    :is-show-header="true"
    :is-show-footer="true"
    :modal-id="'PopupSelectMethod'"
    @close-modal="closeModalMethod"
    :classCustom="'modal_class_custom'"
  >
    <!-- Modal content goes here -->
    <template #title>
      <strong>{{
        t(
          "05.eduProcessCreation.subjectProfile.create.modalCreateSubject.title"
        )
      }}</strong>
    </template>
    <template #default>
      <div class="box_section">
        <table class="tbl_col">
          <caption>
            table col
          </caption>
          <colgroup>
            <col style="width: auto" />
            <col style="width: 30%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">성명</th>
              <th scope="col">제도구분</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="index">
              <td>{{ item.methNm }}</td>
              <td>
                <button
                  class="button btn_blue btn_xs"
                  @click="handleChooseMethod(item)"
                >
                  {{ t("common.select") }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
    <template #footer>
      <!-- Footer content goes here -->
      <button
        type="button"
        class="button btn_md btn_medium_gray"
        @click="closeModalMethod"
      >
        확인
      </button>
    </template>
  </TModal>
</template>

<script lang="ts">
import TModal from "@/components/common/modal/TModal.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { defineComponent } from "vue";
import { inject } from "vue";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      require: true,
    },
    data: {
      type: Map,
      require: true,
    },
  },
  setup: () => {
    const { t } = useI18n();
    const swal = inject("$swal");
    const isMethod = ref(false);

    return { t, swal, isMethod };
  },
  methods: {
    handleChooseMethod(value: any) {
      this.swal({
        text:
          value.methNm +
          this.t("05.eduProcessCreation.subjectProfile.create.alert3"),
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.select"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.$emit("selectEvaluationMethod", value);
        }
      });
    },

    closeModalMethod() {
      this.isMethod = false;
      this.$emit("closeModalEvaluation");
    },
  },
});
</script>

<style scoped></style>
