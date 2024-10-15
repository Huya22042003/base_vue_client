<template>
    <TModal :is-open="isOpen" :is-show-header="true" :is-show-footer="true" :modal-id="'modal_form'"
            @close-modal="onClose">
        <template #title>
            <strong>
              <!-- 자체평가보고서 반려 사유 -->
              {{ t("06.manageAssessmentReports.popUp.title") }}
            </strong>
        </template>
        <template #default>
        <div class="box_section">
          <p class="mb-3">
            <!-- ※ 반려 사유를 입력해주세요. -->
            {{ t("06.manageAssessmentReports.popUp.subTitle") }}
          </p>
          <TextArea v-model="dataDetail.reason" id="textArea_validate" required />
        </div>
        </template>
        <template #footer>
          <button
            type="button"
            class="button btn_sm btn_primary"
            :disabled="store.check"
            @click="reasonReject()"
          >
          {{ t("06.manageAssessmentReports.search.table.selectBoxStatus.reject") }}
          </button>
          <button
            type="button"
            class="button btn_sm btn_white"
            @click="onClose()"
          >
            {{ t("common.cancel") }}
          </button>
        </template>
    </TModal>
  </template>
  
  <script lang="ts">
import { useI18n } from "vue-i18n";
import { commonStore } from '@/stores/common';
import { rejectEval } from '@/stores/manageAssessmentReports/manageAssessmentReports.service';
import {
    MESSAGE_ERROR_API,
} from '@/constants/common.const';
  export default {
    components: {
    },
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      onClose: {
        type: Function,
        required: true
      },
      idDetail: {
        type: Object,
        required: true
      },
      onEvent: {
        type: Function,
      }
    },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    return {
      t,
      store
    };
  },
    data() {
      return {
        dataDetail: {
          reason: ""
        },
      }
    },
    methods: {
      reasonReject() {
        this.store.setLoading(true);
        rejectEval({id: this.idDetail, reason: this.dataDetail.reason}).then((res: any) => {
          this.$swal.fire({
          /* 반려처리됐습니다 */
          text: this.t('06.detailReport.message.successReject'),
          confirmButtonColor: '#DD6B55',
          confirmButtonText: this.t('common.confirm')
          }).then(() => {
              this.onEvent();
              this.onClose();
          })
        }).catch((err) => {
            throw new Error(MESSAGE_ERROR_API);
        }).finally(() => {
            this.store.setLoading(false);
        });
      }
    }
  }
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  