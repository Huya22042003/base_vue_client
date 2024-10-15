<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

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
              <th scope="row">
                <!-- 대학 -->
                {{ t("06.evalCourse.field1") }}  
              </th>
              <td class="td_input">
                {{ dataDetail.major }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 학과 -->
                {{ t("06.evalCourse.field2") }}
              </th>
              <td>
                {{ dataDetail.department }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 상태 -->
                {{ t("06.evalCourse.field3") }}
                </th>
              <td>
                {{ dataDetail.status }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 총점 -->
                {{ t("06.evalCourse.field4") }}
              </th>
              <td>{{ dataDetail.totalScale }} / 100</td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 자체평가 결과 요약 -->
                {{ t("06.evalCourse.field5") }}
              </th>
              <td>
                {{ dataDetail.summaryResult }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="box dp_block" id="section17">
      <div class="box_section">
        <CollapseBase
          :isShow="openCollapsePlan"
          :title="t('06.detailReport.plansTitle')"
          :isCheck="checkVald.plans"
          :onClick="() => (openCollapsePlan = !openCollapsePlan)"
        >
          <div
            style="margin-top: 10px"
            v-for="(item, index) in dataDetail.plans"
          >
            <div class="box_section">
              <table class="tbl_row">
                <colgroup>
                  <col style="width: 18%" />
                  <col style="width: auto" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.evaluationFactors"
                        )
                      }}
                    </th>
                    <td class="td_input">
                      {{ item.factor }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.evaluationIndicators"
                        )
                      }}
                    </th>
                    <td>
                      {{ item.criteria }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.indicatorDescription"
                        )
                      }}
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
                        <li
                          class="custom-list"
                          v-for="noteItem in convertIndiEvalNote(item.note)"
                        >
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
                      <div
                        class="select_checkbox"
                        v-for="scale in listScaleRadio"
                      >
                        <RadiobuttonBase
                          :isDisable="!isShowSave"
                          :value="scale.cdId"
                          :id="item.id + scale.cdId"
                          :name="item.id"
                          :key="item.id + scale.cdId"
                          :checked="item.scale == scale.cdId"
                          v-model="item.scale"
                          :label="`(${scale.cdNm}) ${
                            scale.cdId == SCALE_EVAL_A
                              ? item.scaleMet
                              : scale.cdId == SCALE_EVAL_B
                              ? item.scaleInsuf
                              : item.scaleNmet
                          }`"
                        >
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
                        <li
                          class="custom-list"
                          v-for="ttl in convertIndiEvalNote(item.ttl)"
                        >
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
                          <InputFileBase
                            :referKey="`P${searchForm.idDept}${searchForm.year}${item.id}`"
                            :mode="modefile"
                            :id="`plansFile_${item.id}`"
                            :name="`plansFile_${item.id}`"
                            :ref="`P${searchForm.idDept}${searchForm.year}${item.id}`"
                            :orgName="'plansFile_report'"
                            :type="fileType"
                            :category="'plansFile_report'"
                            :sectionName="'plansFile_report'"
                          >
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
        <CollapseBase
          :isShow="openCollapseDo"
          :title="t('06.detailReport.dosTitle')"
          :isCheck="checkVald.dos"
          :onClick="() => (openCollapseDo = !openCollapseDo)"
        >
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
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.evaluationFactors"
                        )
                      }}
                    </th>
                    <td class="td_input">
                      {{ item.factor }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.evaluationIndicators"
                        )
                      }}
                    </th>
                    <td>
                      {{ item.criteria }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.indicatorDescription"
                        )
                      }}
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
                        <li
                          class="custom-list"
                          v-for="noteItem in convertIndiEvalNote(item.note)"
                        >
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
                      <div
                        class="select_checkbox"
                        v-for="scale in listScaleRadio"
                      >
                        <RadiobuttonBase
                          :isDisable="!isShowSave"
                          :value="scale.cdId"
                          :id="item.id + scale.cdId"
                          :name="item.id"
                          :key="item.id + scale.cdId"
                          :checked="item.scale == scale.cdId"
                          v-model="item.scale"
                          :label="`(${scale.cdNm}) ${
                            scale.cdId == SCALE_EVAL_A
                              ? item.scaleMet
                              : scale.cdId == SCALE_EVAL_B
                              ? item.scaleInsuf
                              : item.scaleNmet
                          }`"
                        >
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
                        <li
                          class="custom-list"
                          v-for="ttl in convertIndiEvalNote(item.ttl)"
                        >
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
                          <InputFileBase
                            :referKey="`D${searchForm.idDept}${searchForm.year}${item.id}`"
                            :mode="modefile"
                            :id="`dosFile_${index}`"
                            :name="`dosFile_${index}`"
                            :ref="`D${searchForm.idDept}${searchForm.year}${item.id}`"
                            :orgName="'dosFile_report'"
                            :type="fileType"
                            :category="'dosFile_report'"
                            :sectionName="'dosFile_report'"
                          >
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
        <CollapseBase
          :isShow="openCollapseCheck"
          :title="t('06.detailReport.checksTitle')"
          :isCheck="checkVald.checks"
          :onClick="() => (openCollapseCheck = !openCollapseCheck)"
        >
          <div
            style="margin-top: 10px"
            v-for="(item, index) in dataDetail.checks"
          >
            <div class="box_section">
              <table class="tbl_row">
                <colgroup>
                  <col style="width: 18%" />
                  <col style="width: auto" />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.evaluationFactors"
                        )
                      }}
                    </th>
                    <td class="td_input">
                      {{ item.factor }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.evaluationIndicators"
                        )
                      }}
                    </th>
                    <td>
                      {{ item.criteria }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.indicatorDescription"
                        )
                      }}
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
                        <li
                          class="custom-list"
                          v-for="noteItem in convertIndiEvalNote(item.note)"
                        >
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
                      <div
                        class="select_checkbox"
                        v-for="scale in listScaleRadio"
                      >
                        <RadiobuttonBase
                          :isDisable="!isShowSave"
                          :value="scale.cdId"
                          :id="item.id + scale.cdId"
                          :name="item.id"
                          :key="item.id + scale.cdId"
                          :checked="item.scale == scale.cdId"
                          v-model="item.scale"
                          :label="`(${scale.cdNm}) ${
                            scale.cdId == SCALE_EVAL_A
                              ? item.scaleMet
                              : scale.cdId == SCALE_EVAL_B
                              ? item.scaleInsuf
                              : item.scaleNmet
                          }`"
                        >
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
                        <li
                          class="custom-list"
                          v-for="ttl in convertIndiEvalNote(item.ttl)"
                        >
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
                          <InputFileBase
                            :referKey="`C${searchForm.idDept}${searchForm.year}${item.id}`"
                            :mode="modefile"
                            :id="`checkFile_${index}`"
                            :name="`checkFile_${index}`"
                            :ref="`C${searchForm.idDept}${searchForm.year}${item.id}`"
                            :orgName="'checkFile_report'"
                            :type="fileType"
                            :category="'checkFile_report'"
                            :sectionName="'checkFile_report'"
                          >
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
        <CollapseBase
          :isShow="openCollapseAct"
          :title="t('06.detailReport.actsTitle')"
          :isCheck="checkVald.acts"
          :onClick="() => (openCollapseAct = !openCollapseAct)"
        >
          <div
            style="margin-top: 10px"
            v-for="(item, index) in dataDetail.acts"
          >
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
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.evaluationFactors"
                        )
                      }}
                    </th>
                    <td class="td_input">
                      {{ item.factor }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.evaluationIndicators"
                        )
                      }}
                    </th>
                    <td>
                      {{ item.criteria }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {{
                        t(
                          "06.detailReport.collapsePlan.table.indicatorDescription"
                        )
                      }}
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
                        <li
                          class="custom-list"
                          v-for="noteItem in convertIndiEvalNote(item.note)"
                        >
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
                      <div
                        class="select_checkbox"
                        v-for="scale in listScaleRadio"
                      >
                        <RadiobuttonBase
                          :isDisable="!isShowSave"
                          :value="scale.cdId"
                          :id="item.id + scale.cdId"
                          :name="item.id"
                          :key="item.id + scale.cdId"
                          :checked="item.scale == scale.cdId"
                          v-model="item.scale"
                          :label="`(${scale.cdNm}) ${
                            scale.cdId == SCALE_EVAL_A
                              ? item.scaleMet
                              : scale.cdId == SCALE_EVAL_B
                              ? item.scaleInsuf
                              : item.scaleNmet
                          }`"
                        >
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
                        <li
                          class="custom-list"
                          v-for="ttl in convertIndiEvalNote(item.ttl)"
                        >
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
                          <strong class="required"> </strong>
                          <span style="color: red">
                            {{
                              t(
                                "06.detailReport.collapsePlan.table.titleRequired"
                              )
                            }}
                          </span>
                          <InputFileBase
                            :referKey="`A${searchForm.idDept}${searchForm.year}${item.id}`"
                            :mode="modefile"
                            :id="`actsFile_${index}`"
                            :name="`actsFile_${index}`"
                            :ref="`A${searchForm.idDept}${searchForm.year}${item.id}`"
                            :orgName="'actsFile_report'"
                            :type="fileType"
                            :category="'actsFile_report'"
                            :sectionName="'actsFile_report'"
                          >
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
    </div>

    <div class="box dp_block" id="section1">
      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <!-- 심사자 종합의견 -->
                 {{ t('06.evalCourse.field6') }}
                </th>
              <td class="td_input">
                <TextArea
                  id="rslt"
                  :disabled="!isShowSave"
                  v-model="dataDetail.summaryOpinion"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn_group btn_end mg_t20">
        <button
          type="button"
          class="button btn_xs btn_primary bo_rd6"
          v-if="isShowTemporarySave && mode == MODE_CREATE"
          @click="showAlertTemporarySave"
        >
          {{ t("06.detailReport.button.temporaryStorage") }}
        </button>
        <button
          type="button"
          class="button btn_xs btn_primary bo_rd6"
          :disabled="!isDisable || store.check"
          v-if="isShowSave && mode == MODE_CREATE"
          @click="showAlertSave"
        >
          {{ t("06.detailReport.button.save") }}
        </button>
        <button
          type="button"
          class="button btn_xs btn_white bo_rd6"
          @click="gotoPage"
        >
          {{ t("06.detailReport.button.list") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { defineComponent } from "vue";
import InputBase from "@/components/common/input/InputBase.vue";
import CollapseBase from "@/components/common/collapse/CollapseBase.vue";
import RadiobuttonBase from "@/components/common/input/RadiobuttonBase.vue";
import { useI18n } from "vue-i18n";
import {
  getApproveDetail,
  approveTemporaryDetail,
  approveDetail,
} from "@/stores/evalCourseService/evalCourseCert.service";
import type {
  ApproveEvalCourseDetailDTO,
  ApproveEvalCourseReqDTO,
} from "@/stores/evalCourseService/evalCourseCert.type";
import { SCREEN } from "@/router/screen";
import {
  SCALE_EVAL_A,
  SCALE_EVAL_B,
  SCALE_EVAL_C,
  SCALE_EVAL,
  MESSAGE_ERROR_API,
  EVAL_COURSE_BEFFOR_APPROVE,
  EVAL_COURSE_NOT_CERTIFIED,
  EVAL_COURSE_CERTIFIED_BASIC,
  EVAL_COURSE_CERTIFIED_HIGH,
} from "@/constants/common.const";
import { MODE_DETAIL, MODE_CREATE, MODE_SHOW } from "@/constants/screen.const";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { commonStore } from "@/stores/common";
import Swal from "sweetalert2";

export default defineComponent({
  components: {
    Breadcrumb,
    InputBase,
    CollapseBase,
    RadiobuttonBase,
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
      MODE_CREATE,
    };
  },
  data() {
    return {
      /* "교육과정 인증제 승인 관리" */
      pageTitle: this.t("06.evalCourse.title1"),
      breadcrumbItems: [],
      openCollapsePlan: false,
      openCollapseDo: false,
      openCollapseCheck: false,
      openCollapseAct: false,
      searchForm: {
        idDept: "",
        year: "",
      },
      dataView: {
        majorNm: "",
        deptNm: "",
      },
      checkVald: {
        plans: false,
        dos: false,
        checks: false,
        acts: false,
      },
      isDisable: false,
      listScaleRadio: [] as CodeMngModel[],
      dataDetail: {} as ApproveEvalCourseDetailDTO,
      modefile: MODE_DETAIL,
      fileImage: [],
      fileType: "office",
      isShowTemporarySave: false,
      isShowApprove: false,
      isShowSave: false,
      mode: "",
    };
  },
  beforeMount() {
    this.searchForm.idDept = window.history.state.idDept;
    this.searchForm.year = window.history.state.year;
    this.dataView.majorNm = window.history.state.majorNm;
    this.dataView.deptNm = window.history.state.deptNm;

    this.store.setLoading(true);
    getApproveDetail(window.history.state.id).then((res: any) => {
      this.dataDetail = res.data.data;
      if (this.dataDetail.statusCd == EVAL_COURSE_BEFFOR_APPROVE) {
        this.mode = MODE_CREATE;
      } else {
        this.mode = MODE_DETAIL;
      }
      this.totalScore();
      this.checkButton();
    }).finally(() => {
      this.store.setLoading(false);
    });
    getListCodeMng({ upCdIdList: [SCALE_EVAL] }).then((res) => {
      this.listScaleRadio = res.data.data.filter(
        (el: CodeMngModel) => el.upCdId == SCALE_EVAL
      );
    });
  },
  watch: {
    dataDetail: {
      handler() {
        if (this.dataDetail.plans.every((el) => el.scale))
          this.checkVald.plans = true;
        if (this.dataDetail.dos.every((el) => el.scale))
          this.checkVald.dos = true;
        if (this.dataDetail.checks.every((el) => el.scale))
          this.checkVald.checks = true;
        if (this.dataDetail.acts.every((el) => el.scale))
          this.checkVald.acts = true;

        this.isDisable =
          this.checkVald.plans &&
          this.checkVald.dos &&
          this.checkVald.checks &&
          this.checkVald.acts;

        this.totalScore();
      },
      deep: true,
    },
  },
  methods: {
    checkButton() {
      if (this.dataDetail.statusCd == EVAL_COURSE_BEFFOR_APPROVE) {
        this.isShowSave = true;
        this.isShowTemporarySave = true;
      } else {
        this.isShowSave = false;
        this.isShowTemporarySave = false;
      }
    },
    convertIndiEvalNote(data: string): string[] {
      return data
        .split("◦")
        .map((part) => part.trim())
        .filter((part) => part.length > 0);
    },
    showAlertTemporarySave() {
      this.$swal({
        text: this.t(
          "06.detailReport.message.confirmTemporarySave"
        ) /* "임시저장하시겠어요?" */,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.confirmTemporarySave();
        }
      });
    },
    confirmTemporarySave() {
      this.store.setLoading(true);

      approveTemporaryDetail(this.getFormData())
        .then((res) => {
          Swal.fire({
            text: this.t("06.detailReport.message.successTemporarySave"),
            showConfirmButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: this.t("common.confirm"),
          }).then(() => {
            this.gotoPage();
          });
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    showAlertSave() {
      this.$swal({
        text: this.t(
          "06.detailReport.message.confirmSave"
        ) /* "작성 완료(저장)하시겠어요?" */,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t('common.confirm'),
        cancelButtonText: this.t('common.cancel'),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.confirmSave();
        }
      });
    },
    confirmSave() {
      this.store.setLoading(true);

      approveDetail(this.getFormData())
        .then((res) => {
          Swal.fire({
            text: this.t("06.detailReport.message.eduSaveSuccess", {
              score: this.dataDetail.totalScale,
              status: this.checkStatusNm(),
            }),
            showConfirmButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: this.t("common.confirm"),
          }).then(() => {
            this.gotoPage();
          });
        })
        .catch((err) => {
          throw new Error(MESSAGE_ERROR_API);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    showAlert(message: string) {
      Swal.fire({
        text: message,
        showConfirmButton: true,
        confirmButtonColor: "#DD6B55",
        cancelButtonText: this.t("common.confirm"),
      });
    },
    getFormData(): ApproveEvalCourseReqDTO {
      return {
        id: this.dataDetail.id,
        opinion: this.dataDetail.summaryOpinion,
        status: this.checkStatus(),
        plans: this.dataDetail.plans.map((el) => {
          return {
            id: el.id,
            scaleSel: el.scale,
          };
        }),
        dos: this.dataDetail.dos.map((el) => {
          return {
            id: el.id,
            scaleSel: el.scale,
          };
        }),
        checks: this.dataDetail.checks.map((el) => {
          return {
            id: el.id,
            scaleSel: el.scale,
          };
        }),
        acts: this.dataDetail.acts.map((el) => {
          return {
            id: el.id,
            scaleSel: el.scale,
          };
        }),
      };
    },
    gotoPage() {
      this.$router.push({ name: SCREEN.evalCourseReportApprove.name });
    },
    totalScore() {
      let totalScore = 0;
      totalScore += this.switchScoreEdu("plans");
      totalScore += this.switchScoreEdu("dos");
      totalScore += this.switchScoreEdu("checks");
      totalScore += this.switchScoreEdu("acts");
      this.dataDetail.totalScale = totalScore;
    },
    checkStatus() {
      if (this.dataDetail.totalScale >= 0 && this.dataDetail.totalScale <= 69) {
        return EVAL_COURSE_NOT_CERTIFIED;
      }
      if (
        this.dataDetail.totalScale >= 70 &&
        this.dataDetail.totalScale <= 89
      ) {
        return EVAL_COURSE_CERTIFIED_BASIC;
      }
      if (this.dataDetail.totalScale >= 90 && this.dataDetail.totalScale <= 100) {
        return EVAL_COURSE_CERTIFIED_HIGH;
      }
      return "";
    },
    checkStatusNm() {
      if (this.dataDetail.totalScale >= 0 && this.dataDetail.totalScale <= 69) {
        return this.t("06.detailReport.status.ECCS02");
      }
      if (
        this.dataDetail.totalScale >= 70 &&
        this.dataDetail.totalScale <= 89
      ) {
        return this.t("06.detailReport.status.ECCS03");
      }
      if (this.dataDetail.totalScale >= 0 && this.dataDetail.totalScale <= 69) {
        return this.t("06.detailReport.status.ECCS04");
      }
      return "";
    },
    switchScoreEdu(scale: string) {
      let totalScore = 0;
      this.dataDetail[scale].forEach((el) => {
        if (el.scale == SCALE_EVAL_A) {
          totalScore += el.scoreMet;
        }
        if (el.scale == SCALE_EVAL_B) {
          totalScore += el.scoreInsuf;
        }
        if (el.scale == SCALE_EVAL_C) {
          totalScore += el.scoreNmet;
        }
      });
      return totalScore;
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
