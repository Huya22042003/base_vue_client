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
        <!-- 교육과정 인증제 심사 종합의견 -->
        {{ t('06.evalCourse.modal.title1') }}
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
              <!-- 심사자 성명 -->
              {{ t('06.evalCourse.modal.field1') }}
            </th>
            <td class="td_input">
              {{ dataDetail.createdName }}
            </td>
          </tr>
          <tr>
            <th scope="row"><!-- 심사자 소속 -->
              {{ t('06.evalCourse.modal.field2') }}</th>
            <td>
              {{ dataDetail.department }}
            </td>
          </tr>
          <tr>
            <th scope="row"><!-- 심사자 종합의견 -->
              {{ t('06.evalCourse.modal.field3') }}</th>
            <td>
              {{ dataDetail.opinion }}
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
import { getEvalCourseOpinion } from "@/stores/evalCourseService/evalCourseCert.service";
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
      type: String,
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
        createdName: "",
        department: "",
        opinion: "",
      },
    };
  },
  beforeMount() {
    this.goToDetail();
  },
  methods: {
    goToDetail() {
      this.store.setLoading(true);
      getEvalCourseOpinion({ reportId: this.idDetail })
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
