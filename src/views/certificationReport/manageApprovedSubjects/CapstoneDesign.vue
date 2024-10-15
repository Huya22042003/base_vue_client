<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="box dp_block" id="section1">
      <div class="box_section">
        <p class="box_title_sm">
          {{ t("06.capstoneDesign.tableSubject.title") }}
        </p>
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                {{ t("06.capstoneDesign.tableSubject.subjectName") }}
              </th>
              <td class="td_input">
                {{ dataDetail.name }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("06.capstoneDesign.tableSubject.courseCode") }}
              </th>
              <td>
                {{ dataDetail.code }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("06.capstoneDesign.tableSubject.applicant") }}
              </th>
              <td class="td_input">
                {{ dataDetail.register }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("06.capstoneDesign.tableSubject.category") }}
              </th>
              <td class="td_input">
                {{ dataDetail.type }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("06.capstoneDesign.tableSubject.applicationField") }}
              </th>
              <td class="td_input">
                {{ dataDetail.fieldRegister }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="box dp_block" id="section1">
      <div class="box_section">
        <p class="box_title_sm">
          {{ t("06.capstoneDesign.tableDesign.title") }}
        </p>
        <table class="tbl_row" v-if="dataDetail.dataEvalDegist">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                {{ t("06.capstoneDesign.tableDesign.attachment") }}
              </th>
              <td class="td_input" :colspan="4">
                <ul>
                  <li>
                    <!-- 1.강의계획서 -->
                    {{
                      t("certificationReport.manageApprovedSubjects.field26")
                    }}
                    <!-- TODO: Report 강의계획서 -->
                    <!-- <InputFileBase :referKey="`P${searchForm.idDept}${searchForm.year}${item.id}`"
                          v-model="item.fileUpLoad" :mode="modefile" :id="`plansFile_${item.id}`"
                          :name="`plansFile_${item.id}`" :ref="`P${searchForm.idDept}${searchForm.year}${item.id}`"
                          :orgName="'plansFile_report'" :type="fileType" :category="'plansFile_report'"
                          :sectionName="'plansFile_report'">
                        </InputFileBase> -->
                  </li>
                  <li>
                    <span class="dp_flex al_center">
                      <!-- 2.교육계획서 -->
                      {{
                        t("certificationReport.manageApprovedSubjects.field27")
                      }}
                      <InputFileBase
                        :referKey="`${dataDetail.idCert}`"
                        :mode="modefile"
                        :id="`result_education_${dataDetail.idCert}`"
                        :showMess="false"
                        :name="`result_education_${dataDetail.idCert}`"
                        :ref="`result_education_${dataDetail.idCert}`"
                        :orgName="'result_education'"
                        :category="'result_education'"
                        :sectionName="'result_education'"
                      >
                      </InputFileBase>
                    </span>
                  </li>
                  <li>
                    <span class="dp_flex al_center">
                      <!-- 3.계획서(학습자) -->
                      {{
                        t("certificationReport.manageApprovedSubjects.field28")
                      }}
                      <InputFileBase
                        :referKey="`${dataDetail.idCert}`"
                        :mode="modefile"
                        :id="`result_education_user_${dataDetail.idCert}`"
                        :showMess="false"
                        :name="`result_education_user_${dataDetail.idCert}`"
                        :ref="`result_education_user_${dataDetail.idCert}`"
                        :orgName="'result_education_user'"
                        :category="'result_education_user'"
                        :sectionName="'result_education_user'"
                      >
                      </InputFileBase>
                    </span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row" :rowspan="dataDetail.dataEvalDegist.length + 1">
                {{ t("06.capstoneDesign.tableDesign.certificationCriteria") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.certificationCriteria") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.point") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.evaluationScore") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.supplementaryMatters") }}
              </th>
            </tr>
            <tr v-for="(item, index) in dataDetail.dataEvalDegist">
              <td>
                {{ item.content }}
              </td>
              <td>
                {{ item.score }}
              </td>
              <td>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  v-model="item.scoreEval"
                  :isDisable="
                    dataDetail.status != CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE
                  "
                  :data="listAllocation20Score"
                />
              </td>
              <td>
                <TextArea
                  v-model="item.supportIssue"
                  required
                  :readonly="
                    dataDetail.status != CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE
                  "
                  :id="`${item.id}`"
                ></TextArea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="box_section mt-6"
        v-if="dataDetail.status == CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE"
      >
        <div class="btn_group btn_end">
          <button type="button" class="button btn_sm btn_medium_gray bo_rd6">
            {{ t("06.capstoneDesign.tableDesign.button.print") }}
          </button>
          <button
            type="button"
            class="button btn_sm btn_white"
            :disabled="store.check || checkRequired"
            @click="approveCapstone()"
          >
            {{ t("06.capstoneDesign.tableDesign.button.1stApproval") }}
          </button>
          <button
            type="button"
            class="button btn_sm btn_white"
            :disabled="store.check || checkRequired"
            @click="reject"
          >
            {{ t("06.capstoneDesign.tableDesign.button.companion") }}
          </button>
          <button
            type="button"
            class="button btn_sm btn_white"
            @click="gotoPage"
          >
            {{ t("06.capstoneDesign.tableDesign.button.list") }}
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="dataDetail.status != CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE"
      class="box dp_block"
      id="section1"
    >
      <div class="box_section">
        <p class="box_title_sm">
          {{ t("06.capstoneDesign.tabelOperate.tabelOperate") }}
        </p>
        <table class="tbl_row" v-if="dataDetail.dataEvalOperate">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                {{ t("06.capstoneDesign.tableDesign.attachment") }}
              </th>
              <td class="td_input">
                <ul>
                  <li>
                    <span class="dp_flex al_center">
                      <!-- 4.결과보고서(학습자) -->
                      {{
                        t("certificationReport.manageApprovedSubjects.field30")
                      }}
                      <InputFileBase
                        :referKey="`${dataDetail.idCert}`"
                        :mode="modefile"
                        :id="`plan_education_user_${dataDetail.idCert}`"
                        :showMess="false"
                        :name="`plan_education_user_${dataDetail.idCert}`"
                        :ref="`plan_education_user_${dataDetail.idCert}`"
                        :orgName="'plan_education_user'"
                        :category="'plan_education_user'"
                        :sectionName="'plan_education_user'"
                      >
                      </InputFileBase>
                    </span>
                  </li>
                  <li>
                    <span class="dp_flex al_center">
                      <!-- 5.수업운영결과보고서 -->
                      {{
                        t("certificationReport.manageApprovedSubjects.field31")
                      }}
                      <InputFileBase
                        :referKey="`${dataDetail.idCert}`"
                        :mode="modefile"
                        :id="`result_plan_operate_${dataDetail.idCert}`"
                        :showMess="false"
                        :name="`result_plan_operate_${dataDetail.idCert}`"
                        :ref="`result_plan_operate_${dataDetail.idCert}`"
                        :orgName="'result_plan_operate'"
                        :category="'result_plan_operate'"
                        :sectionName="'result_plan_operate'"
                      >
                      </InputFileBase>
                    </span>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row" :rowspan="dataDetail.dataEvalOperate.length + 1">
                {{ t("06.capstoneDesign.tableDesign.certificationCriteria") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.certificationCriteria") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.point") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.evaluationScore") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.supplementaryMatters") }}
              </th>
            </tr>
            <tr v-for="(item, index) in dataDetail.dataEvalOperate">
              <td>
                {{ item.content }}
              </td>
              <td>
                {{ item.score }}
              </td>
              <td>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  v-model="item.scoreEval"
                  :isDisable="
                    dataDetail.status == CAPSTONE_DESIGN_STATUS_APPROVE_2 ||
                    dataDetail.status == CAPSTONE_DESIGN_STATUS_REJECT
                  "
                  :data="listAllocation10Score"
                />
              </td>
              <td>
                <TextArea
                  v-model="item.supportIssue"
                  required
                  :readonly="
                    dataDetail.status == CAPSTONE_DESIGN_STATUS_APPROVE_2 ||
                    dataDetail.status == CAPSTONE_DESIGN_STATUS_REJECT
                  "
                  :id="`${item.id}`"
                ></TextArea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      v-if="dataDetail.status != CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE"
      class="box dp_block"
      id="section1"
    >
      <div class="box_section">
        <p class="box_title_sm">
          {{ t("06.capstoneDesign.tableAchievements.title") }}
        </p>
        <table class="tbl_row" v-if="dataDetail.dataEvalAchievement">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                {{ t("06.capstoneDesign.tableAchievements.title") }}
              </th>
              <td class="td_input">
                <ul>
                  <li>
                    <span class="dp_flex al_center">
                      <!-- 6.평가결과표 -->
                      {{
                        t("certificationReport.manageApprovedSubjects.field33")
                      }}
                      <InputFileBase
                        :referKey="`${dataDetail.idCert}`"
                        :mode="modefile"
                        :id="`result_plan_eval_${dataDetail.idCert}`"
                        :showMess="false"
                        :name="`result_plan_eval_${dataDetail.idCert}`"
                        :ref="`result_plan_eval_${dataDetail.idCert}`"
                        :orgName="'result_plan_eval'"
                        :category="'result_plan_eval'"
                        :sectionName="'result_plan_eval'"
                      >
                      </InputFileBase>
                    </span>
                  </li>
                  <li>
                    <!-- 7.CQI보고서 -->
                    {{
                      t("certificationReport.manageApprovedSubjects.field34")
                    }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                :rowspan="dataDetail.dataEvalAchievement.length + 1"
              >
                {{ t("06.capstoneDesign.tableDesign.certificationCriteria") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.certificationCriteria") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.point") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.evaluationScore") }}
              </th>
              <th scope="col">
                {{ t("06.capstoneDesign.tableDesign.supplementaryMatters") }}
              </th>
            </tr>
            <tr v-for="(item, index) in dataDetail.dataEvalAchievement">
              <td>
                {{ item.content }}
              </td>
              <td>
                {{ item.score }}
              </td>
              <td>
                <SelectBoxBase
                  :id="'selectbox'"
                  :name="'selectbox'"
                  v-model="item.scoreEval"
                  :isDisable="
                    dataDetail.status == CAPSTONE_DESIGN_STATUS_APPROVE_2 ||
                    dataDetail.status == CAPSTONE_DESIGN_STATUS_REJECT
                  "
                  :data="listAllocation10Score"
                />
              </td>
              <td>
                <TextArea
                  v-model="item.supportIssue"
                  required
                  :readonly="
                    dataDetail.status == CAPSTONE_DESIGN_STATUS_APPROVE_2 ||
                    dataDetail.status == CAPSTONE_DESIGN_STATUS_REJECT
                  "
                  :id="`${item.id}`"
                ></TextArea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section mt-6">
        <div class="btn_group btn_end">
          <button type="button" class="button btn_sm btn_medium_gray bo_rd6">
            {{ t("06.capstoneDesign.tableAchievements.button.print") }}
          </button>
          <button
            v-if="dataDetail.status == CAPSTONE_DESIGN_STATUS_APPROVE_1"
            type="button"
            :disabled="store.check || checkRequired"
            class="button btn_sm btn_white"
            @click="approveCapstone()"
          >
            {{ t("06.capstoneDesign.tableDesign.button.2stApproval") }}
          </button>
          <button
            type="button"
            v-if="dataDetail.status == CAPSTONE_DESIGN_STATUS_APPROVE_1"
            :disabled="store.check || checkRequired"
            class="button btn_sm btn_white"
            @click="reject"
          >
            {{ t("06.capstoneDesign.tableAchievements.button.companion") }}
          </button>
          <button
            type="button"
            class="button btn_sm btn_white"
            @click="gotoPage"
          >
            {{ t("06.capstoneDesign.tableAchievements.button.list") }}
          </button>
        </div>
      </div>
    </div>
  </section>

  <RejectSubjectModal
    v-if="isOpenReject"
    @content="handleRejectReason"
    :id-detail="dataDetail.idCert"
    :isOpen="isOpenReject"
    :onClose="closeModalReason"
  ></RejectSubjectModal>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { defineComponent } from "vue";
import SelectBoxBase from "@/components/common/input/SelectBoxBase.vue";
import GridComponentV2 from "@/components/common/grid/GridComponentV2.vue";
import LinkGridComponent from "@/components/common/grid/LinkGridComponent.vue";
import { useI18n } from "vue-i18n";
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import { SCREEN } from "@/router/screen";
import type {
  CapstoneDesignDetailDTO,
  ExcellenceRegisterReqDTO,
  ExcellenceRegisterResDTO,
} from "@/stores/manageApprovedSubjects/manageApprovedSubjects.type";
import {
  getCapstoneDetail,
  approveCapstoneSecond,
  approveCapstone,
  rejectCapstone,
  rejectCapstoneSecond,
} from "@/stores/manageApprovedSubjects/manageApprovedSubjects.service";
import {
  CAPSTONE_FIELD_DESIGN,
  CAPSTONE_FIELD_OPERATE,
  CAPSTONE_FIELD_ACHIEVEMENT,
  CAPSTONE_DESIGN_STATUS_APPROVE_1,
  CAPSTONE_DESIGN_STATUS_APPROVE_2,
  CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE,
  CAPSTONE_DESIGN_STATUS_REJECT,
} from "@/constants/common.const";
import { MODE_DETAIL } from "@/constants/screen.const";
import { commonStore } from "@/stores/common";
import RejectSubjectModal from "./modal/RejectSubjectModal.vue";

export default defineComponent({
  components: {
    Breadcrumb,
    SelectBoxBase,
    GridComponentV2,
    LinkGridComponent,
    InputBase,
    TextArea,
    RejectSubjectModal,
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();
    return {
      t,
      store,
      CAPSTONE_DESIGN_STATUS_APPROVE_1,
      CAPSTONE_DESIGN_STATUS_APPROVE_2,
      CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE,
      CAPSTONE_DESIGN_STATUS_REJECT,
    };
  },

  data() {
    return {
      pageTitle: "캡스톤 디자인 교과목 인증 심사",
      breadcrumbItems: [],
      listAllocation20Score: [
        {
          cdId: null,
          cdNm: this.t("common.select"),
          upCdId: 20,
        },
        {
          cdId: 0,
          cdNm: 0,
          upCdId: 20,
        },
        {
          cdId: 10,
          cdNm: 10,
          upCdId: 20,
        },
        {
          cdId: 20,
          cdNm: 20,
          upCdId: 20,
        },
      ] as any,
      listAllocation10Score: [
        {
          cdId: null,
          cdNm: this.t("common.select"),
          upCdId: 10,
        },
        {
          cdId: 0,
          cdNm: 0,
          upCdId: 10,
        },
        {
          cdId: 5,
          cdNm: 5,
          upCdId: 10,
        },
        {
          cdId: 10,
          cdNm: 10,
          upCdId: 10,
        },
      ] as any,
      dataDetail: {} as CapstoneDesignDetailDTO,
      modefile: MODE_DETAIL,
      modeStatus: true,
      content: "" as string,
      checkRequired: true,
      idCert: "",
      isOpenReject: false,
    };
  },
  beforeMount() {
    this.idCert = window.history.state.id;

    if (this.idCert) {
      this.goToDetail();
    }
  },
  watch: {
    dataDetail: {
      handler: function () {
        if (this.dataDetail.status === CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE) {
          this.checkRequired = this.dataDetail.dataEvalDegist.some(
            (el) => el.scoreEval == null
          );
        } else if (
          this.dataDetail.status === CAPSTONE_DESIGN_STATUS_APPROVE_1
        ) {
          this.checkRequired =
            this.dataDetail.dataEvalOperate.some(
              (el) => el.scoreEval == null
            ) ||
            this.dataDetail.dataEvalAchievement.some(
              (el) => el.scoreEval == null
            );
        } else {
          this.checkRequired = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    handleRejectReason(data) {
      this.store.setLoading(true);
      this.content = data;

      if (this.dataDetail.status == CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE) {
        rejectCapstone(this.getFormData())
          .then((res) => {
            this.$swal({
              /* "반려처리됐습니다." */
              text: this.t("certificationReport.manageApprovedSubjects.message7"),
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t('common.confirm'),
            });
            this.gotoPage();
          })
          .finally(() => {
            this.store.setLoading(false);
          });
      }

      if (this.dataDetail.status == CAPSTONE_DESIGN_STATUS_APPROVE_1) {
        rejectCapstoneSecond(this.getFormData())
          .then((res) => {
            this.$swal({
              /* "반려처리됐습니다." */
              text: this.t("certificationReport.manageApprovedSubjects.message7"),
              confirmButtonColor: "#DD6B55",
              confirmButtonText: this.t('common.confirm'),
            });
            this.gotoPage();
          })
          .finally(() => {
            this.store.setLoading(false);
          });
      }
    },
    closeModalReason() {
      this.isOpenReject = false;
    },
    goToDetail() {
      this.store.setLoading(true);
      getCapstoneDetail({ id: this.idCert })
        .then((res) => {
          this.dataDetail = res.data.data;

          this.dataDetail.dataEvalDegist = this.dataDetail.dataEval.filter(
            (el) => {
              if (el.divCd.includes(CAPSTONE_FIELD_DESIGN)) return true;
            }
          );
          this.dataDetail.dataEvalOperate = this.dataDetail.dataEval.filter(
            (el) => {
              if (el.divCd.includes(CAPSTONE_FIELD_OPERATE)) return true;
            }
          );
          this.dataDetail.dataEvalAchievement = this.dataDetail.dataEval.filter(
            (el) => {
              if (el.divCd.includes(CAPSTONE_FIELD_ACHIEVEMENT)) return true;
            }
          );
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    approveCapstone() {
      this.$swal({
        /* "교과목 인증제 승인처리하시겠어요?" */
        text: this.t("certificationReport.manageApprovedSubjects.message8"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("certificationReport.manageApprovedSubjects.approve"),
        cancelButtonText: this.t('common.cancel'),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.approve();
        }
      });
    },
    approve() {
      this.store.setLoading(true);
      if (this.dataDetail.status == CAPSTONE_DESIGN_STATUS_BEFORE_APPROVE) {
        approveCapstone(this.getFormData())
          .then((res) => {
            this.showAlertOk();
            this.gotoPage();
          })
          .finally(() => {
            this.store.setLoading(false);
          });
      } else {
        approveCapstoneSecond(this.getFormData())
          .then((res) => {
            this.showAlertOk();
            this.gotoPage();
          })
          .finally(() => {
            this.store.setLoading(false);
          });
      }
    },
    reject() {
      this.isOpenReject = true;
    },
    showAlertOk() {
      this.$swal({
        /* "승인처리됐습니다." */
        text: this.t("certificationReport.manageApprovedSubjects.message9"),
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t('common.confirm'),
      });
    },
    showAlertFail() {
      this.$swal({
        /* "반려처리됐습니다." */
        text: this.t("certificationReport.manageApprovedSubjects.message10"),
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t('common.confirm'),
      });
    },
    getFormData() {
      let listDetail = [] as ExcellenceRegisterReqDTO[];

      listDetail.push(
        ...this.dataDetail.dataEvalDegist.map(
          (item: ExcellenceRegisterResDTO) => {
            return {
              id: item.id,
              scoreEval: item.scoreEval,
              content: item.supportIssue,
            };
          }
        )
      );

      listDetail.push(
        ...this.dataDetail.dataEvalOperate.map(
          (item: ExcellenceRegisterResDTO) => {
            return {
              id: item.id,
              scoreEval: item.scoreEval,
              content: item.supportIssue,
            };
          }
        )
      );

      listDetail.push(
        ...this.dataDetail.dataEvalAchievement.map(
          (item: ExcellenceRegisterResDTO) => {
            return {
              id: item.id,
              scoreEval: item.scoreEval,
              content: item.supportIssue,
            };
          }
        )
      );

      let dataParam = {
        id: this.dataDetail.idCert,
        content: this.content,
        listDetail: listDetail,
      };

      return dataParam;
    },
    gotoPage() {
      this.$router.push({
        name: SCREEN.manageApprovedSubjects.name,
      });
    },
  },
});
</script>
<style>
.file_name > p {
  padding: 0;
  margin-left: 10px;
}
</style>
