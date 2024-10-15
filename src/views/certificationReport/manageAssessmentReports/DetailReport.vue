<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems"></Breadcrumb>

    <div class="box dp_block" id="section1">
      <div class="box_section">
        <p class="box_title_sm">{{ t("06.detailReport.titleScreen") }}</p>
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">{{ t("06.detailReport.detail.university") }}</th>
              <td class="td_input">
                {{ dataView.majorNm }}
              </td>
            </tr>
            <tr>
              <th scope="row">{{ t("06.detailReport.detail.department") }}</th>
              <td>
                {{ dataView.deptNm }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn_group btn_start mt-4">
        <button type="button" class="button btn_xs btn_blue btn_responsive" @click="showAlertDownload">
          {{ t("06.detailReport.detail.downloadManual") }}
        </button>
      </div>
    </div>

    <div class="box dp_block" id="section17">
      <div class="box_section">
        <CollapseBase :isShow="openCollapsePlan" :title="t('06.detailReport.plansTitle')" :mode="false" :isCheck="checkVald.plans"
          :onClick="() => openCollapsePlan = !openCollapsePlan">
          <div style="margin-top: 10px" v-for="(item) in dataDetail.plans">
            <div class="box_section">
              <table class="tbl_row">
                <colgroup>
                  <col style="width: 18%" />
                  <col style="width: auto" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluationFactors") }}
                    </th>
                    <td class="td_input">
                      {{ item.factor }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluationIndicators") }}
                    </th>
                    <td>
                      {{ item.criteria }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.indicatorDescription") }}
                    </th>
                    <td class="td_input">
                      {{ item.explain }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluation") }}
                    </th>
                    <td>
                      <ul class="custom-list">
                        <li class="custom-list" v-for="(noteItem) in convertIndiEvalNote(item.note)">
                          {{ noteItem }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.ratingScale") }}
                    </th>
                    <td>
                      <div class="select_checkbox" v-for="scale in listScaleRadio">
                        <RadiobuttonBase :isDisable="!isShowSave" :value="scale.cdId" :id="item.id + scale.cdId" :name="item.id"
                          :key="item.id + scale.cdId" :checked="item.scale == scale.cdId" v-model="item.scale"
                          :label="`(${scale.cdNm}) ${scale.cdId == SCALE_EVAL_A ? item.scaleMet : scale.cdId == SCALE_EVAL_B ? item.scaleInsuf : item.scaleNmet}`">
                        </RadiobuttonBase>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evidence1") }}
                    </th>
                    <td>
                      <ul class="custom-list">
                        <li class="custom-list" v-for="(ttl) in convertIndiEvalNote(item.ttl)">
                          {{ ttl }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evidence2") }}
                    </th>
                    <td class="td_input">
                      <div class="box_section">
                        <div class="attach_filebox">
                          <InputFileBase :referKey="`P${searchForm.idDept}${searchForm.year}${item.id}`"
                          v-model="item.fileUpLoad" :mode="modefile" :id="`plansFile_${item.id}`"
                          :name="`plansFile_${item.id}`" :ref="`P${searchForm.idDept}${searchForm.year}${item.id}`"
                          :orgName="'plansFile_report'" :type="fileType" :category="'plansFile_report'"
                          :sectionName="'plansFile_report'">
                        </InputFileBase>
                        <strong class="required">
                        </strong>
                        <span style="color: red">
                          {{ t("06.detailReport.collapsePlan.table.titleRequired")}}
                        </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CollapseBase>
      </div>
      <div class="box_section">
        <CollapseBase :isShow="openCollapseDo" :title="t('06.detailReport.dosTitle')" :mode="false" :isCheck="checkVald.dos"
          :onClick="() => openCollapseDo = !openCollapseDo">
          <div style="margin-top: 10px" v-for="(item, index) in dataDetail.dos">
            <div class="box_section">
              <table class="tbl_row">
                <colgroup>
                  <col style="width: 18%" />
                  <col style="width: auto" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluationFactors") }}
                    </th>
                    <td class="td_input">
                      {{ item.factor }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluationIndicators") }}
                    </th>
                    <td>
                      {{ item.criteria }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.indicatorDescription") }}
                    </th>
                    <td class="td_input">
                      {{ item.explain }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluation") }}
                    </th>
                    <td>
                      <ul class="custom-list">
                        <li class="custom-list" v-for="(noteItem) in convertIndiEvalNote(item.note)">
                          {{ noteItem }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.ratingScale") }}
                    </th>
                    <td>
                      <div class="select_checkbox" v-for="scale in listScaleRadio">
                        <RadiobuttonBase :isDisable="!isShowSave" :value="scale.cdId" :id="item.id + scale.cdId" :name="item.id"
                          :key="item.id + scale.cdId" :checked="item.scale == scale.cdId" v-model="item.scale"
                          :label="`(${scale.cdNm}) ${scale.cdId == SCALE_EVAL_A ? item.scaleMet : scale.cdId == SCALE_EVAL_B ? item.scaleInsuf : item.scaleNmet}`">
                        </RadiobuttonBase>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evidence1") }}
                    </th>
                    <td>
                      <ul class="custom-list">
                        <li class="custom-list" v-for="(ttl) in convertIndiEvalNote(item.ttl)">
                          {{ ttl }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evidence2") }}
                    </th>
                    <td class="td_input">
                      <div class="box_section">
                        <div class="attach_filebox">
                          <strong class="required">
                          </strong>
                          <span style="color: red">
                            {{ t("06.detailReport.collapsePlan.table.titleRequired") }}
                          </span>
                          <InputFileBase :referKey="`D${searchForm.idDept}${searchForm.year}${item.id}`"
                            v-model="item.fileUpLoad" :mode="modefile" :id="`dosFile_${index}`"
                            :name="`dosFile_${index}`" :ref="`D${searchForm.idDept}${searchForm.year}${item.id}`"
                            :orgName="'dosFile_report'" :type="fileType" :category="'dosFile_report'"
                            :sectionName="'dosFile_report'">
                          </InputFileBase>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CollapseBase>
      </div>
      <div class="box_section">
        <CollapseBase :isShow="openCollapseCheck" :title="t('06.detailReport.checksTitle')" :mode="false" :isCheck="checkVald.checks"
          :onClick="() => openCollapseCheck = !openCollapseCheck">
          <div style="margin-top: 10px" v-for="(item, index) in dataDetail.checks">
            <div class="box_section">
              <table class="tbl_row">
                <colgroup>
                  <col style="width: 18%" />
                  <col style="width: auto" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluationFactors") }}
                    </th>
                    <td class="td_input">
                      {{ item.factor }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluationIndicators") }}
                    </th>
                    <td>
                      {{ item.criteria }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.indicatorDescription") }}
                    </th>
                    <td class="td_input">
                      {{ item.explain }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluation") }}
                    </th>
                    <td>
                      <ul class="custom-list">
                        <li class="custom-list" v-for="(noteItem) in convertIndiEvalNote(item.note)">
                          {{ noteItem }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.ratingScale") }}
                    </th>
                    <td>
                      <div class="select_checkbox" v-for="scale in listScaleRadio">
                        <RadiobuttonBase :isDisable="!isShowSave" :value="scale.cdId" :id="item.id + scale.cdId" :name="item.id"
                          :key="item.id + scale.cdId" :checked="item.scale == scale.cdId" v-model="item.scale"
                          :label="`(${scale.cdNm}) ${scale.cdId == SCALE_EVAL_A ? item.scaleMet : scale.cdId == SCALE_EVAL_B ? item.scaleInsuf : item.scaleNmet}`">
                        </RadiobuttonBase>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evidence1") }}
                    </th>
                    <td>
                      <ul class="custom-list">
                        <li class="custom-list" v-for="(ttl) in convertIndiEvalNote(item.ttl)">
                          {{ ttl }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evidence2") }}
                    </th>
                    <td class="td_input">
                      <div class="box_section">
                        <div class="attach_filebox">
                          <InputFileBase :referKey="`C${searchForm.idDept}${searchForm.year}${item.id}`"
                          v-model="item.fileUpLoad" :mode="modefile" :id="`checkFile_${index}`"
                          :name="`checkFile_${index}`" :ref="`C${searchForm.idDept}${searchForm.year}${item.id}`"
                          :orgName="'checkFile_report'" :type="fileType" :category="'checkFile_report'"
                          :sectionName="'checkFile_report'">
                        </InputFileBase>
                        <strong class="required"></strong>
                        <span style="color: red">
                          {{ t("06.detailReport.collapsePlan.table.titleRequired") }}
                        </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CollapseBase>
      </div>
      <div class="box_section">
        <CollapseBase :isShow="openCollapseAct" :title="t('06.detailReport.actsTitle')" :mode="false" :isCheck="checkVald.acts"
          :onClick="() => openCollapseAct = !openCollapseAct">
          <div style="margin-top: 10px" v-for="(item, index) in dataDetail.acts">
            <div class="box_section">
              <table class="tbl_row">
                <caption>
                  table row
                </caption>
                <colgroup>
                  <col style="width: 18%" />
                  <col style="width: auto" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluationFactors") }}
                    </th>
                    <td class="td_input">
                      {{ item.factor }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluationIndicators") }}
                    </th>
                    <td>
                      {{ item.criteria }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.indicatorDescription") }}
                    </th>
                    <td class="td_input">
                      {{ item.explain }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evaluation") }}
                    </th>
                    <td>
                      <ul class="custom-list">
                        <li class="custom-list" v-for="(noteItem) in convertIndiEvalNote(item.note)">
                          {{ noteItem }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.ratingScale") }}
                    </th>
                    <td>
                      <div class="select_checkbox" v-for="scale in listScaleRadio">
                        <RadiobuttonBase :isDisable="!isShowSave" :value="scale.cdId" :id="item.id + scale.cdId" :name="item.id"
                          :key="item.id + scale.cdId" :checked="item.scale == scale.cdId" v-model="item.scale"
                          :label="`(${scale.cdNm}) ${scale.cdId == SCALE_EVAL_A ? item.scaleMet : scale.cdId == SCALE_EVAL_B ? item.scaleInsuf : item.scaleNmet}`">
                        </RadiobuttonBase>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evidence1") }}
                    </th>
                    <td>
                      <ul class="custom-list">
                        <li class="custom-list" v-for="(ttl) in convertIndiEvalNote(item.ttl)">
                          {{ ttl }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{ t("06.detailReport.collapsePlan.table.evidence2") }}
                    </th>
                    <td class="td_input">
                      <div class="attach_filebox">
                        <div class="box_section">
                          <InputFileBase :referKey="`A${searchForm.idDept}${searchForm.year}${item.id}`"
                          v-model="item.fileUpLoad" :mode="modefile" :id="`actsFile_${index}`"
                          :name="`actsFile_${index}`" :ref="`A${searchForm.idDept}${searchForm.year}${item.id}`"
                          :orgName="'actsFile_report'" :type="fileType" :category="'actsFile_report'"
                          :sectionName="'actsFile_report'">
                        </InputFileBase>
                        <strong class="required">
                        </strong>
                        <span style="color: red">
                          {{ t("06.detailReport.collapsePlan.table.titleRequired") }}
                        </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CollapseBase>
      </div>
      <div class="btn_group btn_end">
        <button type="button" class="button btn_xs btn_blue" v-if="isShowApprove && mode == MODE_DETAIL"
            @click="approve()">
            {{ t('06.manageAssessmentReports.grid.approve') }}
        </button>
        <button type="button" class="button btn_xs btn_blue" v-if="isShowApprove && mode == MODE_DETAIL"
            @click="reject()">
            {{ t('06.manageAssessmentReports.grid.reject') }}
        </button>
        <button type="button" class="button btn_xs btn_primary bo_rd6" v-if="isShowTemporarySave && mode == MODE_CREATE"
          @click="showAlertTemporarySave">
          {{ t("06.detailReport.button.temporaryStorage") }}
        </button>
        <button type="button" class="button btn_xs btn_primary bo_rd6" :disabled="!isDisable" v-if="isShowSave && mode == MODE_CREATE"
          @click="showAlertSave">
          {{ t("06.detailReport.button.save") }}
        </button>
        <button type="button" class="button btn_xs btn_white bo_rd6" @click="gotoPage">
          {{ t("06.detailReport.button.list") }}
        </button>
      </div>
    </div>
  </section>
  <ReasonRejeactModal v-if="isOpenReject" :onEvent="gotoPage" :id-detail="objectSelect" :isOpen='isOpenReject' :onClose="closeModalReason"></ReasonRejeactModal>

</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { defineComponent } from "vue";
import InputBase from "@/components/common/input/InputBase.vue";
import CollapseBase from "@/components/common/collapse/CollapseBase.vue";
import RadiobuttonBase from "@/components/common/input/RadiobuttonBase.vue";
import { useI18n } from "vue-i18n";
import { detailEvalReport, temporarySaveEvalReport, saveEvalReport, underInvestigation, approveEval } from '@/stores/manageAssessmentReports/manageAssessmentReports.service';
import type { EvalFactorResDTO, EvalFactorReqDTO } from '@/stores/manageAssessmentReports/manageAssessmentReports.type'
import { SCREEN } from '@/router/screen';
import ReasonRejeactModal from './modal/ReasonRejeactModal.vue'
import {
  SCALE_EVAL_A,
  SCALE_EVAL_B,
  SCALE_EVAL_C,
  SCALE_EVAL,
  STATUS_EVAL_REPORT_NO_SETUP,
  STATUS_EVAL_REPORT_TEMPORARY_SAVE,
  STATUS_EVAL_REPORT_SAVE_SUCCESS,
  STATUS_EVAL_REPORT_BEFFOR_APPROVE,
  STATUS_EVAL_REPORT_APPROVE_SUCCESS,
  STATUS_EVAL_REPORT_REJECT,
  MESSAGE_ERROR_API
} from '@/constants/common.const';
import {
  MODE_DETAIL,
  MODE_CREATE,
  MODE_EDIT,
} from "@/constants/screen.const";
import type {
  CodeMngModel
} from "@/stores/common/codeMng/codeMng.type";
import {
  getListCodeMng
} from "@/stores/common/codeMng/codeMng.service";
import { commonStore } from '@/stores/common';
import Swal from 'sweetalert2';

export default defineComponent({
  components: {
    Breadcrumb,
    InputBase,
    CollapseBase,
    RadiobuttonBase,
    ReasonRejeactModal
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();

    return {
      t,
      store,
      SCALE_EVAL_A,
      SCALE_EVAL_B,
      SCALE_EVAL_C,
      MODE_DETAIL,
      MODE_CREATE
    };
  },
  data() {
    return {
      pageTitle: this.t("06.detailReport.title")/* "자체평가보고서 관리" */,
      breadcrumbItems: [],
      openCollapsePlan: true,
      openCollapseDo: false,
      openCollapseCheck: false,
      openCollapseAct: false,
      searchForm: {
        idDept: "",
        year: ""
      },
      dataView: {
        majorNm: "",
        deptNm: "",
      },
      checkVald: {
        plans: false,
        dos: false,
        checks: false,
        acts: false
      },
      isDisable: false,
      listScaleRadio: [] as CodeMngModel[],
      dataDetail: {} as EvalFactorResDTO,
      modefile: MODE_EDIT,
      fileImage: [],
      fileType: 'office',
      isShowTemporarySave: false,
      isShowApprove: false,
      isShowSave: false,
      isOpenReject: false,
      mode: "",
      objectSelect: {}
    };
  },
  beforeMount() {
    this.searchForm.idDept = window.history.state.idDept;
    this.searchForm.year = window.history.state.year;
    this.dataView.majorNm = window.history.state.majorNm;
    this.dataView.deptNm = window.history.state.deptNm;
    this.mode = window.history.state.mode;

    this.store.setLoading(true);
    detailEvalReport(this.searchForm).then((res: any) => {
      this.dataDetail = res.data.data;
      this.checkButton();
    }).finally(() => {
      this.store.setLoading(false);
    })
    getListCodeMng({ upCdIdList: [SCALE_EVAL] }).then(res => {
      this.listScaleRadio = res.data.data.filter((el: CodeMngModel) => el.upCdId == SCALE_EVAL);
    })
  },
  watch: {
    'dataDetail': {
      handler() {
        this.checkVald.plans = this.dataDetail.plans.every(el => el.fileUpLoad && el.fileUpLoad.length > 0);
        this.checkVald.dos = this.dataDetail.dos.every(el => el.fileUpLoad && el.fileUpLoad.length > 0);
        this.checkVald.checks = this.dataDetail.checks.every(el => el.fileUpLoad && el.fileUpLoad.length > 0);
        this.checkVald.acts = this.dataDetail.acts.every(el => el.fileUpLoad && el.fileUpLoad.length > 0);

        this.isDisable = this.checkVald.plans && this.checkVald.dos && this.checkVald.checks && this.checkVald.acts
      },
      deep: true
    }
  },
  methods: {
    closeModalReason() {
      this.isOpenReject = false;
      this.objectSelect = null;
    },
    approve() {
        this.$swal({
            /* "승인처리하시겠어요?" */
            text: this.t('06.detailReport.message.confirmApprove'),
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: this.t('06.manageAssessmentReports.grid.approve')/* "승인" */,
            cancelButtonText: "취소",
        }).then((result: any) => {
            if (result.isConfirmed) {
                this.store.setLoading(true);
                approveEval(this.dataDetail.id)
                .then((res) => {
                    this.$swal.fire({
                    /* 반려처리됐습니다 */
                    text: this.t('06.detailReport.message.successApprove'),
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: this.t('common.confirm')
                    }).then(() => {
                        this.gotoPage();
                    });
                }).catch((err) => {
                    throw new Error(MESSAGE_ERROR_API);
                }).finally(() => {
                    this.store.setLoading(false);
                })
            }
        });
    },
    reject() {
        this.isOpenReject = true;
        this.objectSelect = this.dataDetail.id
    },
    checkData(metlSeq: any) {
      const childComponent = this.$refs[metlSeq];
      
      childComponent[0].upLoadFile(metlSeq);
    },
    checkButton() {
      if (this.dataDetail.status == STATUS_EVAL_REPORT_NO_SETUP
       || this.dataDetail.status == STATUS_EVAL_REPORT_TEMPORARY_SAVE
       || this.dataDetail.status == STATUS_EVAL_REPORT_REJECT) {
        this.isShowSave = true;
        this.isShowTemporarySave = true;
        this.modefile = MODE_EDIT
      }
      if (this.dataDetail.status == STATUS_EVAL_REPORT_SAVE_SUCCESS
        || this.dataDetail.status == STATUS_EVAL_REPORT_BEFFOR_APPROVE
        || this.dataDetail.status == STATUS_EVAL_REPORT_APPROVE_SUCCESS
      ) {
        this.isShowSave = false;
        this.isShowTemporarySave = false;
        this.modefile = MODE_DETAIL
      }
      if (this.dataDetail.status == STATUS_EVAL_REPORT_BEFFOR_APPROVE) {
        this.isShowSave = false;
        this.isShowApprove = true;
        this.modefile = MODE_DETAIL
      }
    },
    convertIndiEvalNote(data: string): string[] {
      return data.split('◦').map(part => part.trim()).filter(part => part.length > 0);
    },
    showAlertDownload() {
      this.$swal({
        /* "매뉴얼을 다운로드 하시겠어요?" */
        text: this.t('06.detailReport.confirmDownload'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.confirmDownload();
        } else if (result.isDismissed) {
          this.cancelDownload();
        }
      });
    },
    // TODO: Report
    confirmDownload() {
    },
    // TODO: Report
    cancelDownload() {
    },
    showAlertTemporarySave() {
      this.$swal({
        text: this.t('06.detailReport.message.confirmTemporarySave')/* "임시저장하시겠어요?" */,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t('common.save'),
        cancelButtonText: this.t('common.cancel'),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.confirmTemporarySave();
        }
      });
    },
    confirmTemporarySave() {
      this.store.setLoading(true);

      temporarySaveEvalReport(this.getFormData())
      .then((res) => {
        this.getSaveFile().forEach(item => {
          this.checkData(item);
        })
        Swal.fire({
          text: this.t('06.detailReport.message.successTemporarySave'),
          showConfirmButton: true,
          confirmButtonColor: '#DD6B55',
          cancelButtonText: this.t('common.confirm'),
        }).then(() => {
          this.gotoPage();
        })
      }).catch((err) => {
        throw new Error(MESSAGE_ERROR_API);
      }).finally(() => {
        this.store.setLoading(false);
      })
    },

    showAlertSave() {
      this.$swal({
        /* "작성 완료(저장)하시겠어요?" */
        text: this.t('06.detailReport.message.confirmSave'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.confirmSave();
        }
      });
    },
    confirmSave() {
      this.store.setLoading(true);

      saveEvalReport(this.getFormData())
      .then((res) => {
        this.getSaveFile().forEach(item => {
          this.checkData(item);
        })
        this.confirmBeforeApprove()
      }).catch((err) => {
        throw new Error(MESSAGE_ERROR_API);
      }).finally(() => {
        this.store.setLoading(false);
      })
    },
    confirmBeforeApprove() {
      this.$swal({
        /* "정상처리됐습니다.  승인 신청하시겠어요? 목록에서도 승인 신청할 수 있습니다." */
        text: this.t('06.detailReport.message.successSave'),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        /* "승인 신청" */
        confirmButtonText: this.t('06.detailReport.message.btnUnderInvest'),
        cancelButtonText: this.t('common.cancel'),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);
          underInvestigation(this.searchForm)
          .then((res) => {
            this.gotoPage();
          }).catch((err) => {
            throw new Error(MESSAGE_ERROR_API);
          }).finally(() => {
            this.store.setLoading(false);
          })
        } else if (result.isDismissed) {
          this.gotoPage();
        }
      });
    },
    showAlert(message: string) {
      Swal.fire({
        text: message,
        showConfirmButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonText: this.t('common.confirm'),
      })
    },
    getFormData(): EvalFactorReqDTO {
      return {
        id: this.dataDetail.id,
        departmentCd: this.searchForm.idDept,
        year: this.searchForm.year,
        plans: this.dataDetail.plans.map(el => {
          return {
            id: el.id,
            scaleSel: el.scale,
          }
        }),
        dos: this.dataDetail.dos.map(el => {
          return {
            id: el.id,
            scaleSel: el.scale,
          }
        }),
        checks: this.dataDetail.checks.map(el => {
          return {
            id: el.id,
            scaleSel: el.scale,
          }
        }),
        acts: this.dataDetail.acts.map(el => {
          return {
            id: el.id,
            scaleSel: el.scale,
          }
        })
      }
    },
    getSaveFile() {
      let dataResult = [] as Array<string>
      this.dataDetail.plans.forEach(item => {
        if (item.fileUpLoad && item.fileUpLoad.length > 0) {
          dataResult.push(`P${this.searchForm.idDept}${this.searchForm.year}${item.id}`)
        }
      });
      this.dataDetail.dos.forEach(item => {
        if (item.fileUpLoad && item.fileUpLoad.length > 0) {
          dataResult.push(`D${this.searchForm.idDept}${this.searchForm.year}${item.id}`)
        }
      });
      this.dataDetail.checks.forEach(item => {
        if (item.fileUpLoad && item.fileUpLoad.length > 0) {
          dataResult.push(`C${this.searchForm.idDept}${this.searchForm.year}${item.id}`)
        }
      });
      this.dataDetail.acts.forEach(item => {
        if (item.fileUpLoad && item.fileUpLoad.length > 0) {
          dataResult.push(`A${this.searchForm.idDept}${this.searchForm.year}${item.id}`)
        }
      });
      return dataResult;
    },
    gotoPage() {
      if (this.mode === MODE_CREATE) {
        this.$router.push({ name: SCREEN.manageAssessmentReports.name })
      } else {
        this.$router.push({ name: SCREEN.registerCheckEduProcess.name })
      }
    },
  },
});
</script>
<style>
.custom-list {
  list-style-type: disc;
  padding-left: 1.5rem;
}
</style>
