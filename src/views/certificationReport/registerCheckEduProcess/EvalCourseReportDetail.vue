<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <p class="box_title_sm">
          <!-- 교육과정 인증 신청 -->
          {{ t("06.evalCourse.title2") }}
        </p>
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <!-- 학과 -->
                {{ t("06.evalCourse.field2") }}
              </th>
              <td class="td_input">
                {{ dataDetail.deptNm }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 교육과정 학년도 -->
                {{ t("06.evalCourse.field7") }}
              </th>
              <td class="td_input">
                {{ dataDetail.yearEdu }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 교육과정 유형 -->
                {{ t("06.evalCourse.field8") }}
              </th>
              <td class="td_input">
                {{ dataDetail.typeEdu }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 학과 인원수 -->
                {{ t("06.evalCourse.field9") }}
              </th>
              <td class="td_input">
                {{ dataDetail.countDept }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 학과장 학과 -->
                {{ t("06.evalCourse.field10") }}
              </th>
              <td class="td_input">
                {{ dataDetail.mngDept }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 성명 -->
                {{ t("06.evalCourse.field3") }}
              </th>
              <td class="td_input">
                {{ dataDetail.staffNm }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 연락처 -->
                {{ t("06.evalCourse.field11") }}
              </th>
              <td class="td_input">
                {{ dataDetail.phone }}
              </td>
            </tr>
            <tr>
              <th scope="row">E-mail</th>
              <td class="td_input">
                {{ dataDetail.email }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 자체평가 결과요약 -->
                {{ t("06.evalCourse.field12") }}
              </th>
              <td class="td_input">
                <TextArea id="rslt" v-model="dataDetail.rslt" required :readonly="dataDetail.status != EVAL_COURSE_NOT_CERTIFIED && dataDetail.status != EVAL_COURSE_NOT_REVIEW" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section">
        <div class="btn_area">
          <button type="button" v-if="dataDetail.status == EVAL_COURSE_NOT_REVIEW" :disabled="store.check"
            @click="registerEvalCourseCert" class="button btn_xs btn_blue">
            <!-- 신청 -->
            {{ t("06.evalCourse.btn1") }}
          </button>
          <button type="button" v-if="dataDetail.status == EVAL_COURSE_NOT_CERTIFIED" :disabled="store.check"
            @click="registerRepeatEvalCourseCert" class="button btn_xs btn_blue">
            <!-- 재신청 -->
            {{ t("06.evalCourse.btn2") }}
          </button>
          <button type="button" class="button btn_xs btn_white" @click="back()">
            <!-- 목록 -->
            {{ t("departmentMng.typeTalentNurturingMng.form.btnBack") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { commonStore } from "@/stores/common";
import { MODE_DETAIL, MODE_SHOW, MODE_CREATE } from "@/constants/screen.const";
import { SCREEN } from "@/router/screen";
import { useI18n } from "vue-i18n";
import {
  MESSAGE_ERROR_API,
  EVAL_COURSE_BEFFOR_APPROVE,
  EVAL_COURSE_NOT_CERTIFIED,
  EVAL_COURSE_CERTIFIED_BASIC,
  EVAL_COURSE_CERTIFIED_HIGH,
  EVAL_COURSE_NOT_REVIEW,
} from "@/constants/common.const";
import {
  evalCourseDetail,
  registerApproveEvalCourse,
  registerRepeatApproveEvalCourse,
} from "@/stores/evalCourseService/evalCourseCert.service";
import type {
  EvalEduCourseDetailDTO,
  RegistEduCourseApproveDTO,
} from "@/stores/evalCourseService/evalCourseCert.type";

export default {
  components: {
    Breadcrumb,
  },
  data() {
    return {
      pageTitle: this.t('06.evalCourse.title')/* "교육과정 인증제 신청" */,
      breadcrumbItems: [],
      id: "" as any,
      dataDetail: {} as EvalEduCourseDetailDTO,
    };
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();

    return {
      t,
      store,
      MODE_DETAIL,
      MODE_SHOW,
      MODE_CREATE,
      EVAL_COURSE_BEFFOR_APPROVE,
      EVAL_COURSE_NOT_CERTIFIED,
      EVAL_COURSE_CERTIFIED_BASIC,
      EVAL_COURSE_CERTIFIED_HIGH,
      EVAL_COURSE_NOT_REVIEW,
    };
  },
  beforeMount() {
    this.id = window.history.state.id;

    if (this.id) {
      this.detailEvalCourse();
    }
  },
  methods: {
    back() {
      this.$router.push({ name: SCREEN.evalCourseReport.name });
    },
    detailEvalCourse() {
      this.store.setLoading(true);
      evalCourseDetail(this.id)
        .then((res: any) => {
          this.dataDetail = res.data.data;
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    registerEvalCourseCert() {
      this.$swal({
        /* "교육과정 인증 신청하시겠어요?" */
        text: this.t('06.evalCourse.requestApprove'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("06.manageAssessmentReports.grid.approve"),
        cancelButtonText: "취소",
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);

          let dataForm = {
            id: this.dataDetail.id,
            reason: this.dataDetail.rslt,
          } as RegistEduCourseApproveDTO;

          registerApproveEvalCourse(dataForm)
            .then((res: any) => {
              this.$swal
                .fire({
                  /* 신청됐습니다 */
                  text: this.t('06.evalCourse.requestApproveSuccess'),
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: this.t("common.confirm"),
                })
                .then(() => {
                  this.back();
                });
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
    registerRepeatEvalCourseCert() {
      this.$swal({
        /* "교육과정 인증 신청하시겠어요?" */
        text: this.t('06.evalCourse.requestApprove'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("06.manageAssessmentReports.grid.approve"),
        cancelButtonText: this.t('common.cancel'),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);

          let dataForm = {
            id: this.dataDetail.id,
            reason: this.dataDetail.rslt,
          } as RegistEduCourseApproveDTO;

          registerRepeatApproveEvalCourse(dataForm)
            .then((res: any) => {
              this.$swal
                .fire({
                  /* 신청됐습니다 */
                  text: this.t('06.evalCourse.requestApproveSuccess'),
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: this.t("common.confirm"),
                })
                .then(() => {
                  this.back();
                });
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
  },
};
</script>

<style scoped lang="scss"></style>
