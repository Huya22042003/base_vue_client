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
      <p class="box_title_sm">{{ title }}</p>
    </template>
    <template #default v-if="reasonModel">
      <div class="box_section">
        <table class="tbl_row">
          <caption></caption>
          <colgroup>
            <col style="width: 30%" />
            <col style="width: 70%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" class="required">
                {{
                  t("05.eduProcessCreation.listAndApprove.label.approverName")
                }}
              </th>
              <td>
                {{ reasonModel.procNm }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">
                {{
                  t(
                    "05.eduProcessCreation.listAndApprove.label.approverDepartment"
                  )
                }}
              </th>
              <td>
                {{ reasonModel.deptNm }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="required">
                {{
                  t("05.eduProcessCreation.listAndApprove.label.rejectReason")
                }}
              </th>
              <td>
                {{ reasonModel.rejectRsn }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="box_section mt-5">
          <div class="btn_group btn_end">
            <button
              type="button"
              class="btn_xs btn_blue popup_close mr-2"
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
import TModal from "@/components/common/modal/TModal.vue";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import { EduCourseStore } from "@/stores/eduProcessCreation";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  },
  components: {},
  setup() {
    const { t } = useI18n();
    const storeCommon = commonStore();
    const eduCourseStore = EduCourseStore();
    const sectionName = ref("RESEARCH_ACHIE");

    return { sectionName, t, storeCommon, eduCourseStore };
  },
  data() {
    return {
      modalId: "example-modal",
      modalOpen: false,
      reasonModel: {} as any,
    };
  },
  beforeMount() {
    this.openModal();
    this.getReason();
  },
  mounted() {},
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    async getReason() {
      try {
        this.storeCommon.setLoading(true);
        await this.eduCourseStore.getRejectReason({ data: this.data });
        if (
          this.eduCourseStore.RejectReasonModel &&
          this.eduCourseStore.status == SUCCSESS_STATUS
        ) {
          this.reasonModel = this.eduCourseStore.RejectReasonModel;
        }
        this.storeCommon.setLoading(false);
      } catch (error: any) {
        this.$swal({
          text: error.message,
          type: "warning",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this.t("common.confirm"),
        });
      }
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
.note {
  color: red;
}
</style>
