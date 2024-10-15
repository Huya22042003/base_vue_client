<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="''"></Breadcrumb>
    <div class="box dp_block">
      <div class="box_section">
        <div class="tab_list mb-5">
          <p class="radio_tab">
            <input
              type="radio"
              id="radio_tab1"
              @click="changeTab(1)"
              name="radio_tab"
              :value="1"
              v-model="currentTab"
            />
            <label for="radio_tab1">
              {{ t("capacityDeMng.tutoring.detail.tab.tab1") }}
              <!-- 학습튜터링 관리 -->
            </label>
          </p>
          <p class="radio_tab">
            <input
              type="radio"
              id="radio_tab2"
              @click="changeTab(2)"
              name="radio_tab"
              :value="2"
              v-model="currentTab"
            />
            <label for="radio_tab2">
              {{ t("capacityDeMng.tutoring.detail.tab.tab2") }}
              <!-- 활동계획서 -->
            </label>
          </p>
          <p
            class="radio_tab"
            v-if="
              statusMentoring != beforeApproveStatus &&
              statusMentoring != rejectStatus
            "
          >
            <input
              type="radio"
              id="radio_tab3"
              name="radio_tab"
              @click="changeTab(3)"
              :value="3"
              v-model="currentTab"
            />
            <label for="radio_tab3">
              {{ t("capacityDeMng.tutoring.detail.tab.tab3") }}
              <!-- 학습보고서  -->
            </label>
          </p>
        </div>
        <RegistrationForm :idDetail="id" v-if="currentTab === 1" />
        <ActivityPlan :idDetail="id" v-if="currentTab === 2" />
        <StudyReport :idDetail="id" v-if="currentTab === 3" />
      </div>
      <div class="box_section mt-7">
        <p class="note_custom text-end">
          {{ t("capacityDeMng.tutoring.detail.table.subtitle") }}
        </p>
        <div class="btn_group btn_end btn_area">
          <button
            type="button"
            v-if="statusMentoring == beforeApproveStatus"
            class="button btn_xs btn_white btn_responsive"
            @click="approve()"
          >
            {{ t("capacityDeMng.tutoring.detail.button.approve") }}
            <!-- 승인 -->
          </button>
          <button
            type="button"
            v-if="statusMentoring == beforeApproveStatus"
            class="button btn_xs btn_white btn_responsive"
            @click="reject()"
          >
            {{ t("capacityDeMng.tutoring.detail.button.reject") }}
            <!-- 반려 -->
          </button>
          <button type="button" class="button btn_xs btn_blue btn_responsive">
            {{ t("capacityDeMng.tutoring.detail.button.print") }}
            <!-- 인쇄 -->
          </button>
          <button
            type="button"
            class="button btn_xs btn_gray btn_responsive"
            @click="back()"
          >
            {{ t("capacityDeMng.tutoring.detail.button.back") }}
            <!-- 목록 -->
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { useI18n } from "vue-i18n";
import { defineComponent } from "vue";
import RegistrationForm from "./RegistrationForm.vue";
import ActivityPlan from "./ActivityPlan.vue";
import StudyReport from "./StudyReport.vue";
import { SCREEN } from "@/router/screen";
import { commonStore } from "@/stores/common";
import {
  approveTutoring,
  rejectTutoring,
} from "@/stores/capacityDeMng/mentoring/tutoring/tutoring.service";
import { SUCCSESS_STATUS } from "@/constants/screen.const";
import {
  MENTORING_STATUS_BEFOR_APPROVE,
  MESSAGE_ERROR_API,
  MENTORING_STATUS_APPROVE,
  MENTORING_STATUS_STOP,
  MENTORING_STATUS_REJECT,
} from "@/constants/common.const";
import { checkStatus } from "@/stores/capacityDeMng/mentoring/tutoring/tutoring.service";

export default defineComponent({
  components: {
    RegistrationForm,
    ActivityPlan,
    StudyReport,
  },
  setup: () => {
    const { t } = useI18n();
    const store = commonStore();
    const beforeApproveStatus = MENTORING_STATUS_BEFOR_APPROVE;
    const approveStatus = MENTORING_STATUS_APPROVE;
    const stopStatus = MENTORING_STATUS_STOP;
    const rejectStatus = MENTORING_STATUS_REJECT;

    return {
      t,
      store,
      beforeApproveStatus,
      approveStatus,
      stopStatus,
      rejectStatus,
    };
  },
  data() {
    return {
      pageTitle: this.t(
        "capacityDeMng.tutoring.breadcrumb.pageTitle"
      ) /* 학습튜터링 관리 */,
      id: "" as string,
      statusMentoring: "" as string,
      currentTab: 1,
    };
  },
  beforeMount() {
    this.id = window.history.state.id;
    const plan = window.history.state.plan;

    if (plan) {
      this.changeTab(3);
    }

    checkStatus(this.id).then((res) => {
      this.statusMentoring = res.data.data;
    });
  },
  methods: {
    back() {
      this.$router.push({ path: SCREEN.tutoring.path });
    },
    approve() {
      this.$swal({
        /* 승인처리하시겠어요? */
        text: this.t("capacityDeMng.tutoring.detail.message.confirmApprove"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.save"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);
          approveTutoring(this.id)
            .then((res) => {
              if (res.status === SUCCSESS_STATUS) {
                if (res.data.data) {
                  this.$swal
                    .fire({
                      /* 승인처리됐습니다. */
                      text: this.t(
                        "capacityDeMng.tutoring.detail.message.approveSuccess"
                      ),
                      confirmButtonColor: "#DD6B55",
                      confirmButtonText: this.t("common.confirm"),
                    })
                    .then(() => {
                      this.back();
                    });
                } else {
                  this.$swal
                    .fire({
                      /* 승인처리됐습니다. */
                      text: this.t(
                        "capacityDeMng.tutoring.detail.message.approveError"
                      ),
                      confirmButtonColor: "#DD6B55",
                      confirmButtonText: this.t("common.confirm"),
                    })
                    .then(() => {
                      this.back();
                    });
                }
              }
            })
            .catch((err) => {
              throw new Error(MESSAGE_ERROR_API);
            })
            .finally(() => {
              this.store.setLoading(false);
            });
        }
      });
    },
    reject() {
      this.$swal({
        /* 반려처리하시겠어요 */
        text: this.t("capacityDeMng.tutoring.detail.message.confirmReject"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.confirm"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);
          rejectTutoring(this.id)
            .then((res) => {
              if (res.status === SUCCSESS_STATUS) {
                if (res.data.data) {
                  this.$swal
                    .fire({
                      /* 반려처리됐습니다 */
                      text: this.t(
                        "capacityDeMng.tutoring.detail.message.rejectSuccess"
                      ),
                      confirmButtonColor: "#DD6B55",
                      confirmButtonText: this.t("common.confirm"),
                    })
                    .then(() => {
                      this.back();
                    });
                } else {
                  this.$swal
                    .fire({
                      /* 거절할 수는 없어 */
                      text: this.t(
                        "capacityDeMng.tutoring.detail.message.rejectError"
                      ),
                      confirmButtonColor: "#DD6B55",
                      confirmButtonText: this.t("common.confirm"),
                    })
                    .then(() => {
                      this.back();
                    });
                }
              }
            })
            .catch((err) => {
              throw new Error(MESSAGE_ERROR_API);
            })
            .finally(() => {
              this.store.setLoading(false);
            });
        }
      });
    },
    changeTab(tabNumber: number) {
      this.currentTab = tabNumber;
    },
  },
});
</script>
