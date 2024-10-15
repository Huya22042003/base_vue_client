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
        <!-- 자체평가보고서 반려 사유 -->
        {{ t("06.manageAssessmentReports.popUp.title2") }}
      </strong>
    </template>
    <template #default>
      <table class="tbl_row">
        <colgroup>
          <col style="width: 30%" />
          <col style="width: auto" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              {{
                t("06.manageAssessmentReports.popUp.popUpFail.nameOfApprover")
              }}
            </th>
            <td class="td_input">
              {{ dataDetail.userCreated }}
            </td>
          </tr>
          <tr>
            <th scope="row">
              {{
                t(
                  "06.manageAssessmentReports.popUp.popUpFail.approverAffiliation"
                )
              }}
            </th>
            <td>
              {{ dataDetail.departCreated }}
            </td>
          </tr>
          <tr>
            <th scope="row">
              {{
                t(
                  "06.manageAssessmentReports.popUp.popUpFail.reasonForRejection"
                )
              }}
            </th>
            <td>
              {{ dataDetail.reason }}
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template #footer>
      <button
        type="button"
        class="button btn_sm btn_primary"
        @click="onClose()"
      >
        {{ t("06.manageAssessmentReports.popUp.popUpFail.completed") }}
      </button>
    </template>
  </TModal>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { reasonRejectEval } from "@/stores/manageAssessmentReports/manageAssessmentReports.service";
import { commonStore } from "@/stores/common";
import { MESSAGE_ERROR_API } from "@/constants/common.const";

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
      store,
      t,
    };
  },
  data() {
    return {
      dataDetail: {
        id: "",
        userCreated: "",
        departCreated: "",
        reason: "",
      },
    };
  },
  beforeMount() {
    this.goToDetail();
  },
  methods: {
    goToDetail() {
      this.store.setLoading(true);
      reasonRejectEval(this.idDetail)
        .then((res: any) => {
          this.dataDetail = res.data.data;
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
