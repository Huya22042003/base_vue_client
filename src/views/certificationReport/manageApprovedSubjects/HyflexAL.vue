<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="box dp_block" id="section1">
      <!-- 교과목 정보 -->
      <div class="box_section">
        <p class="box_title_sm">{{ t("06.hyflexAL.tableSubject.title") }}</p>
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                {{ t("06.hyflexAL.tableSubject.subjectName") }}
              </th>
              <td class="td_input">
                {{ dataDetail.name }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("06.hyflexAL.tableSubject.courseCode") }}
              </th>
              <td>
                {{ dataDetail.code }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("06.hyflexAL.tableSubject.applicant") }}
              </th>
              <td class="td_input">
                {{ dataDetail.register }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("06.hyflexAL.tableSubject.operatingMethod") }}
              </th>
              <td class="td_input">
                {{ dataDetail.operatingMethod }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("06.hyflexAL.tableSubject.applicationTrack") }}
              </th>
              <td class="td_input">
                {{ dataDetail.trackRegister }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                {{ t("06.hyflexAL.tableSubject.applicationProcess") }}
              </th>
              <td class="td_input">
                <div class="select_checkbox">
                  <CheckboxBase
                    v-for="item in listApplicationProcess"
                    :isDisable="true"
                    :value="item.cdId"
                    v-model="dataDetail.applicationProcess"
                    :id="`${item.cdId}`"
                    :name="`${item.cdId}`"
                    :key="item.cdId"
                    :label="`${item.cdNm}`"
                  >
                  </CheckboxBase>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="box dp_block" id="section1">
      <!-- 수업 전 평가서 -->
      <div class="box_section">
        <p class="box_title_sm">
          {{ t("06.hyflexAL.tablePreClassAssessment.title") }}
        </p>
        <div class="scrollx_table sm">
          <table class="tbl_col">
            <colgroup>
              <col style="width: 8%" />
              <col style="width: 40%" />
              <col style="width: 2%; text-align: center" />
              <col style="width: 9%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  {{ t("06.hyflexAL.tablePreClassAssessment.evaluationItems") }}
                </th>
                <th scope="col">
                  {{
                    t("06.hyflexAL.tablePreClassAssessment.evaluationFactors")
                  }}
                </th>
                <th scope="col">
                  {{ t("06.hyflexAL.tablePreClassAssessment.points") }}
                </th>
                <th scope="col">
                  {{ t("06.hyflexAL.tablePreClassAssessment.score") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataDetail.dataAfterClass">
                <td>{{ item.factorEval }}</td>
                <td>
                  <ul class="custom-list">
                    <li
                      class="custom-list"
                      v-for="noteItem in convertIndiEvalNote(item.topic)"
                    >
                      {{ noteItem }}
                    </li>
                  </ul>
                </td>
                <td class="ta_c">{{ item.score }}</td>
                <td class="ta_c">
                  <SelectBoxBase
                    :id="'selectbox'"
                    :name="'selectbox'"
                    v-model="item.scoreResult"
                    :data="listAllocation20Score"
                    :is-disable="dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE"
                  />
                </td>
              </tr>
              <tr>
                <th class="styleTh" scope="col" colspan="2">
                  {{ t("06.hyflexAL.tablePreClassAssessment.totalScore") }}
                </th>
                <th class="styleTh" scope="col">100</th>
                <th
                  v-if="dataDetail.dataAfterClass"
                  class="styleTh"
                  scope="col"
                >
                  {{
                    sumScoreClass(
                      dataDetail.dataAfterClass.map((el) => el.scoreResult)
                    )
                  }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="box dp_block" id="section1">
      <div class="box_section">
        <p class="box_title_sm">{{ t("06.hyflexAL.textNote") }}</p>
        <TextArea
          id="opinionAfterClass"
          v-if="dataDetail.opinionAfterClass"
          required
          v-model="dataDetail.opinionAfterClass.opinion"
          :readonly="dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE"
        />
      </div>
    </div>
    <div class="box dp_block" id="section1">
      <div class="box_section">
        <!-- 수업 중 Hyflex AL / B트랙 수업 평가서 -->
        <p class="box_title_sm">{{ t("06.hyflexAL.table-B-track.title") }}</p>
        <div class="scrollx_table sm">
          <table class="tbl_col">
            <colgroup>
              <col style="width: 8%" />
              <col style="width: 40%" />
              <col style="width: 2%" />
              <col style="width: 9%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  {{ t("06.hyflexAL.table-B-track.evaluationItems") }}
                </th>
                <th scope="col">
                  {{ t("06.hyflexAL.table-B-track.evaluationFactors") }}
                </th>
                <th scope="col">{{ t("06.hyflexAL.table-B-track.points") }}</th>
                <th scope="col">{{ t("06.hyflexAL.table-B-track.score") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataDetail.dataTrackBClass">
                <td>{{ item.factorEval }}</td>
                <td>
                  <ul class="custom-list">
                    <li
                      class="custom-list"
                      v-for="noteItem in convertIndiEvalNote(item.topic)"
                    >
                      {{ noteItem }}
                    </li>
                  </ul>
                </td>
                <td class="ta_c">{{ item.score }}</td>
                <td class="ta_c">
                  <SelectBoxBase
                    :id="'selectbox'"
                    :name="'selectbox'"
                    v-model="item.scoreResult"
                    :data="listAllocation20Score"
                    :isDisable="dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE"
                  />
                </td>
              </tr>
              <tr>
                <th scope="col" colspan="1" class="styleTh">
                  {{ t("06.hyflexAL.table-B-track.classManagement") }}
                </th>
                <th scope="col" colspan="3" class="styleTh">
                  {{ t("06.hyflexAL.table-B-track.titleClassManagement") }}
                </th>
              </tr>
              <tr v-for="(item, index) in dataDetail.dataTrackBClassSelect">
                <td :class="`${item.id != trackBClassSelect && 'data-select'}`">
                  <RadiobuttonBase
                    :value="item.id"
                    :mode="dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE ? 'detail' : 'show'"
                    v-model="trackBClassSelect"
                    :id="item.id"
                    :name="item.id"
                    :key="item.id"
                    :checked="item.id == trackBClassSelect"
                    :label="item.factorEval"
                  >
                  </RadiobuttonBase>
                </td>
                <td :class="`${item.id != trackBClassSelect && 'data-select'}`">
                  <ul class="custom-list">
                    <li
                      class="custom-list"
                      v-for="noteItem in convertIndiEvalNote(item.topic)"
                    >
                      {{ noteItem }}
                    </li>
                  </ul>
                </td>
                <td
                  :class="`${
                    item.id != trackBClassSelect && 'data-select'
                  } ta_c`"
                >
                  {{ item.score }}
                </td>
                <td :class="`${item.id != trackBClassSelect && 'data-select'} ta_c`">
                  <SelectBoxBase
                    :id="'selectbox'"
                    :name="'selectbox'"
                    v-model="item.scoreResult"
                    :data="listAllocation60Score"
                    :isDisable="item.id != trackBClassSelect || dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE"
                  />
                </td>
              </tr>
              <tr>
                <th scope="col" colspan="2" class="styleTh">
                  {{ t("06.hyflexAL.table-B-track.totalScore") }}
                </th>
                <th scope="col" colspan="1" class="styleTh">100</th>
                <th scope="col" colspan="1" class="styleTh">
                  {{ sumScoreTrackB }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="box dp_block" id="section1">
      <div class="box_section">
        <p class="box_title_sm">{{ t("06.hyflexAL.textNote") }}</p>
        <TextArea
          id="opinionTrackBClass"
          v-if="dataDetail.opinionTrackBClass"
          required
          v-model="dataDetail.opinionTrackBClass.opinion"
          :readonly="dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE"
        />
      </div>
    </div>
    <div class="box dp_block" id="section1">
      <!-- 수업 중 Hyflex AL / A트랙 수업 평가서 -->
      <div class="box_section">
        <p class="box_title_sm">{{ t("06.hyflexAL.table-A-track.title") }}</p>
        <div class="scrollx_table sm">
          <table class="tbl_col">
            <colgroup>
              <col style="width: 8%" />
              <col style="width: 40%" />
              <col style="width: 2%" />
              <col style="width: 9%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  {{ t("06.hyflexAL.table-A-track.evaluationItems") }}
                </th>
                <th scope="col">
                  {{ t("06.hyflexAL.table-A-track.evaluationFactors") }}
                </th>
                <th scope="col">{{ t("06.hyflexAL.table-A-track.points") }}</th>
                <th scope="col">{{ t("06.hyflexAL.table-A-track.score") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataDetail.dataTrackAClass">
                <td>
                  {{ item.factorEval }}
                </td>
                <td>
                  <ul class="custom-list">
                    <li
                      class="custom-list"
                      v-for="noteItem in convertIndiEvalNote(item.topic)"
                    >
                      {{ noteItem }}
                    </li>
                  </ul>
                </td>
                <td class="ta_c">{{ item.score }}</td>
                <td class="ta_c">
                  <SelectBoxBase
                    :id="'selectbox'"
                    :name="'selectbox'"
                    v-model="item.scoreResult"
                    :data="listAllocation20Score"
                    :isDisable="dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE"
                  />
                </td>
              </tr>
              <tr>
                <th scope="col" colspan="1" class="styleTh">
                  {{ t("06.hyflexAL.table-A-track.classManagement") }}
                </th>
                <th scope="col" colspan="3" class="styleTh">
                  {{ t("06.hyflexAL.table-A-track.titleClassManagement") }}
                </th>
              </tr>
              <tr v-for="(item, index) in dataDetail.dataTrackAClassSelect">
                <td :class="`${item.id != trackAClassSelect && 'data-select'}`">
                  <RadiobuttonBase
                    :mode="dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE ? 'detail' : 'show'"
                    :value="item.id"
                    v-model="trackAClassSelect"
                    :id="item.id"
                    :name="'radioFunc'"
                    :key="item.id"
                    :label="item.factorEval"
                    :checked="item.id == trackAClassSelect"
                  >
                  </RadiobuttonBase>
                </td>
                <td :class="`${item.id != trackAClassSelect && 'data-select'}`">
                  <ul class="custom-list">
                    <li
                      class="custom-list"
                      v-for="noteItem in convertIndiEvalNote(item.topic)"
                    >
                      {{ noteItem }}
                    </li>
                  </ul>
                </td>
                <td
                  :class="`${
                    item.id != trackAClassSelect && 'data-select'
                  } ta_c`"
                >
                  {{ item.score }}
                </td>
                <td :class="`${item.id != trackAClassSelect && 'data-select'} ta_c`">
                  <SelectBoxBase
                    :id="'selectbox'"
                    :name="'selectbox'"
                    v-model="item.scoreResult"
                    :data="listAllocation60Score"
                    :isDisable="item.id != trackAClassSelect || dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE"
                  />
                </td>
              </tr>
              <tr>
                <th scope="col" colspan="2" class="styleTh">
                  {{ t("06.hyflexAL.table-A-track.totalScore") }}
                </th>
                <th scope="col" class="styleTh">100</th>
                <th scope="col" class="styleTh">{{ sumScoreTrackA }}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="box dp_block" id="section1">
      <div class="box_section">
        <p class="box_title_sm">{{ t("06.hyflexAL.textNote") }}</p>
        <TextArea
          id="opinionTrackAClass"
          v-if="dataDetail.opinionTrackAClass"
          :readonly="dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE"
          required
          v-model="dataDetail.opinionTrackAClass.opinion"
        />
      </div>
    </div>
    <div class="box dp_block" id="section1">
      <!-- 수업 후 평가서 -->
      <div class="box_section">
        <p class="box_title_sm">{{ t("06.hyflexAL.tableAfter.title") }}</p>
        <div class="scrollx_table sm">
          <table class="tbl_col">
            <colgroup>
              <col style="width: 8%" />
              <col style="width: 40%" />
              <col style="width: 2%" />
              <col style="width: 9%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  {{ t("06.hyflexAL.tableAfter.evaluationItems") }}
                </th>
                <th scope="col">
                  {{ t("06.hyflexAL.tableAfter.evaluationFactors") }}
                </th>
                <th scope="col">{{ t("06.hyflexAL.tableAfter.points") }}</th>
                <th scope="col">{{ t("06.hyflexAL.tableAfter.score") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in dataDetail.dataBeforeClass">
                <td>{{ item.factorEval }}</td>
                <td>
                  <li
                    class="custom-list"
                    v-for="noteItem in convertIndiEvalNote(item.topic)"
                  >
                    {{ noteItem }}
                  </li>
                </td>
                <td class="ta_c">{{ item.score }}</td>
                <td class="ta_c">
                  <SelectBoxBase
                    :id="'selectbox'"
                    :name="'selectbox'"
                    v-model="item.scoreResult"
                    :is-disable="dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE"
                    :data="listAllocation20Score"
                  />
                </td>
              </tr>
              <tr>
                <th scope="col" colspan="2" class="styleTh">
                  {{ t("06.hyflexAL.tableAfter.totalScore") }}
                </th>
                <th scope="col" class="styleTh">100</th>
                <th
                  v-if="dataDetail.dataBeforeClass"
                  scope="col"
                  class="styleTh"
                >
                  {{
                    sumScoreClass(
                      dataDetail.dataBeforeClass.map((el) => el.scoreResult)
                    )
                  }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="box dp_block" id="section1">
      <div class="box_section">
        <p class="box_title_sm">{{ t("06.hyflexAL.textNote") }}</p>
        <TextArea
          id="opinionBeforeClass"
          v-if="dataDetail.opinionBeforeClass"
          required
          :readonly="dataDetail.status != HYFLEX_AL_STATUS_BEFORE_APPROVE"
          v-model="dataDetail.opinionBeforeClass.opinion"
        />
      </div>

      <div class="box_section mt-6">
        <div class="btn_group btn_end">
          <button type="button" class="button btn_sm btn_medium_gray bo_rd6">
            {{ t("06.capstoneDesign.tableDesign.button.print") }}
          </button>
          <button
            type="button"
            class="button btn_sm btn_blue"
            :disabled="store.check || isDisable"
            v-if="dataDetail.status == HYFLEX_AL_STATUS_BEFORE_APPROVE"
            @click="showAlert"
          >
            {{ t("06.manageAssessmentReports.grid.approve") }}
          </button>
          <button
            type="button"
            v-if="dataDetail.status == HYFLEX_AL_STATUS_BEFORE_APPROVE"
            class="button btn_sm btn_medium_gray"
            :disabled="store.check || isDisable"
            @click="reject()"
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
  </section>

  <RejectSubjectModal v-if="isOpenReject" @content="handleRejectReason" :id-detail="dataDetail.id" :isOpen='isOpenReject' :onClose="closeModalReason"></RejectSubjectModal>

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
import CheckboxBase from "@/components/common/input/CheckboxBase.vue";
import { SCREEN } from "@/router/screen";
import type {
  HyflexAlReqDTO,
  HyflexAlResDetailDTO,
HyflexClassroomEvalDTO,
} from "@/stores/manageApprovedSubjects/manageApprovedSubjects.type";
import { commonStore } from "@/stores/common";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import {
  approveHyflexAl,
  getHyflexAlResDetail,
  rejectHyflexAl 
} from "@/stores/manageApprovedSubjects/manageApprovedSubjects.service";
import {
  HYFLEX_AL_FIELD_BEFORE_CLASS,
  HYFLEX_AL_FIELD_TRACK_B_CLASS,
  HYFLEX_AL_FIELD_TRACK_A_CLASS,
  HYFLEX_AL_FIELD_AFTER_CLASS,
  STATUS_YES,
  STATUS_NO,
  HYFLEX_AL_STATUS_BEFORE_APPROVE,
APPLICATION_PROCESS,
APPLICATION_PROCESS_OTHER,
} from "@/constants/common.const";
import RejectSubjectModal from './modal/RejectSubjectModal.vue'
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";

export default defineComponent({
  components: {
    Breadcrumb,
    SelectBoxBase,
    GridComponentV2,
    LinkGridComponent,
    InputBase,
    TextArea,
    CheckboxBase,
    RejectSubjectModal
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();

    return {
      store,
      t,
      HYFLEX_AL_STATUS_BEFORE_APPROVE,
    };
  },
  watch: {
    trackAClassSelect: {
      handler: function () {
        this.sumScoreTrackA = this.sumScoreAClass();
        this.isDisable = this.shouldDisableButton();
      },
    },
    "dataDetail.dataTrackAClass": {
      handler: function () {
        this.sumScoreTrackA = this.sumScoreAClass();
      },
      deep: true,
    },
    "dataDetail.dataTrackAClassSelect": {
      handler: function () {
        this.sumScoreTrackA = this.sumScoreAClass();
      },
      deep: true,
    },
    trackBClassSelect: {
      handler: function () {
        this.sumScoreTrackB = this.sumScoreBClass();
        this.isDisable = this.shouldDisableButton();
      },
    },
    "dataDetail.dataTrackBClass": {
      handler: function () {
        this.sumScoreTrackB = this.sumScoreBClass();
      },
      deep: true,
    },
    "dataDetail.dataTrackBClassSelect": {
      handler: function () {
        this.sumScoreTrackB = this.sumScoreBClass();
      },
      deep: true,
    },
    "dataDetail": {
      handler: function () {
        this.isDisable = this.shouldDisableButton();
      },
      deep: true
    },
  },
  data() {
    return {
      /* "Hyflex AL 교과목 인증 심사" */
      pageTitle: this.t("certificationReport.manageApprovedSubjects.title3"),
      breadcrumbItems: [],
      listApplicationProcess: [] as CodeMngModel[],
      trackBClassSelect: "",
      trackAClassSelect: "",
      sumScoreTrackA: 0,
      sumScoreTrackB: 0,
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
      listAllocation60Score: [
        {
          cdId: null,
          cdNm: this.t("common.select"),
          upCdId: 60,
        },
        {
          cdId: 0,
          cdNm: 0,
          upCdId: 60,
        },
        {
          cdId: 30,
          cdNm: 30,
          upCdId: 60,
        },
        {
          cdId: 60,
          cdNm: 60,
          upCdId: 60,
        },
      ] as any,
      dataDetail: {} as HyflexAlResDetailDTO,
      isOpenReject: false,
      id: "",
      isDisable: true,
    };
  },
  async beforeMount() {
    this.id = window.history.state.id;

    await getListCodeMng({
      upCdIdList: [
        APPLICATION_PROCESS,
      ],
    }).then((res) => {
      this.listApplicationProcess = res.data.data.filter(
        (el: CodeMngModel) =>
          el.upCdId == APPLICATION_PROCESS &&
          el.cdId != APPLICATION_PROCESS_OTHER
      );
    });
    if (this.id) {
      await this.goToDetail();
    }
  },
  methods: {
    shouldDisableButton() {
      return (!this.hasValidScore(this.dataDetail.dataAfterClass) || 
      !this.hasValidScore(this.dataDetail.dataTrackAClass) ||
      !this.hasValidScoreASelect(this.dataDetail.dataTrackAClassSelect) ||
      !this.hasValidScore(this.dataDetail.dataTrackBClass) ||
      !this.hasValidScoreBSelect(this.dataDetail.dataTrackBClassSelect) ||
      !this.hasValidScore(this.dataDetail.dataBeforeClass));
    },
    hasValidScore(dataArray:HyflexClassroomEvalDTO[]) {
      let check = true;
      dataArray.forEach(element => {
        if (element.scoreResult == null) {
          check = false;
        }
      });
      return check;
    },
    hasValidScoreASelect(dataArray:HyflexClassroomEvalDTO[]) {
      let check = true;
      dataArray.forEach(element => {
        if (element.scoreResult == null && element.id == this.trackAClassSelect) {
          check = false;
        }
      });
      return check;
    },
    hasValidScoreBSelect(dataArray:HyflexClassroomEvalDTO[]) {
      let check = true;
      dataArray.forEach(element => {
        if (element.scoreResult == null && element.id == this.trackBClassSelect) {
          check = false;
        }
      });
      return check;
    },
    handleRejectReason(data) {
      this.dataDetail.content = data;
      this.store.setLoading(true);
      rejectHyflexAl(this.getFormData()).then((res) => {
          this.$swal({
            /* "반려처리됐습니다." */
            text: this.t("certificationReport.manageApprovedSubjects.message2"),
            confirmButtonColor: "#DD6B55",
            confirmButtonText: this.t('common.confirm'),
          });
          this.gotoPage();
        }).finally(() => {
          this.store.setLoading(false);
        });
    },
    closeModalReason() {
      this.isOpenReject = false;
    },
    reject() {
        this.isOpenReject = true;
    },
    goToDetail() {
      this.store.setLoading(true);
      getHyflexAlResDetail({ id: this.id }).then((res: any) => {
        this.dataDetail = res.data.data;

        this.dataDetail.applicationProcess = this.dataDetail.applicationProcess ? this.splitApplyCd(this.dataDetail.applicationProcess) : []

        this.dataDetail.dataAfterClass = this.dataDetail.dataEval.filter(
          (el) => {
            if (el.divCd.includes(HYFLEX_AL_FIELD_AFTER_CLASS)) return true;
          }
        );
        this.dataDetail.dataTrackBClass = this.dataDetail.dataEval.filter(
          (el) => {
            if (
              el.divCd.includes(HYFLEX_AL_FIELD_TRACK_B_CLASS) &&
              el.score == "20"
            )
              return true;
          }
        );
        this.dataDetail.dataTrackBClassSelect = this.dataDetail.dataEval.filter(
          (el) => {
            if (
              el.divCd.includes(HYFLEX_AL_FIELD_TRACK_B_CLASS) &&
              el.score == "60"
            )
              return true;
          }
        );
        this.dataDetail.dataTrackAClass = this.dataDetail.dataEval.filter(
          (el) => {
            if (
              el.divCd.includes(HYFLEX_AL_FIELD_TRACK_A_CLASS) &&
              el.score == "20"
            )
              return true;
          }
        );
        this.dataDetail.dataTrackAClassSelect = this.dataDetail.dataEval.filter(
          (el) => {
            if (
              el.divCd.includes(HYFLEX_AL_FIELD_TRACK_A_CLASS) &&
              el.score == "60"
            )
              return true;
          }
        );
        this.dataDetail.dataBeforeClass = this.dataDetail.dataEval.filter(
          (el) => {
            if (el.divCd.includes(HYFLEX_AL_FIELD_BEFORE_CLASS)) return true;
          }
        );

        this.dataDetail.opinionAfterClass = this.dataDetail.opinionAll.find(
          (el) => el.divCd.includes(HYFLEX_AL_FIELD_AFTER_CLASS)
        ) || {
          id: "",
          divCd: HYFLEX_AL_FIELD_AFTER_CLASS,
          opinion: "",
        };
        this.dataDetail.opinionTrackAClass = this.dataDetail.opinionAll.find(
          (el) => el.divCd.includes(HYFLEX_AL_FIELD_TRACK_A_CLASS)
        ) || {
          id: "",
          divCd: HYFLEX_AL_FIELD_TRACK_A_CLASS,
          opinion: "",
        };
        this.dataDetail.opinionTrackBClass = this.dataDetail.opinionAll.find(
          (el) => el.divCd.includes(HYFLEX_AL_FIELD_TRACK_B_CLASS)
        ) || {
          id: "",
          divCd: HYFLEX_AL_FIELD_TRACK_B_CLASS,
          opinion: "",
        };
        this.dataDetail.opinionBeforeClass = this.dataDetail.opinionAll.find(
          (el) => el.divCd.includes(HYFLEX_AL_FIELD_BEFORE_CLASS)
        ) || {
          id: "",
          divCd: HYFLEX_AL_FIELD_BEFORE_CLASS,
          opinion: "",
        };

        this.trackBClassSelect = (
          this.dataDetail.dataTrackBClassSelect.find(
            (el) => el.useYn === STATUS_YES
          ) || this.dataDetail.dataTrackBClassSelect[0]
        ).id.toString();

        this.trackAClassSelect = (
          this.dataDetail.dataTrackAClassSelect.find(
            (el) => el.useYn === STATUS_YES
          ) || this.dataDetail.dataTrackAClassSelect[0]
        ).id.toString();
      }).finally(() => {
        this.store.setLoading(false);
      });
    },
    showAlert() {
      this.$swal({
        /* "교과목 인증제 승인처리하시겠어요?" */
        text: this.t("certificationReport.manageApprovedSubjects.message3"),
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("certificationReport.manageApprovedSubjects.approve"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.handleIsConfirm();
        }
      });
    },
    showAlertOk() {
      this.$swal({
        /* "승인처리됐습니다." */
        text: this.t("certificationReport.manageApprovedSubjects.message4"),
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t('common.confirm'),
      });
    },
    showAlertFail() {
      this.$swal({
        /* "반려처리됐습니다." */
        text: this.t("certificationReport.manageApprovedSubjects.message5"),
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t('common.confirm'),
      });
    },
    handleIsConfirm() {
      this.store.setLoading(true);
      approveHyflexAl(this.getFormData()).then((res) => {
        this.gotoPage();
        this.showAlertOk();
      }).finally(() => {
        this.store.setLoading(false);
      });
    },
    getFormData() {
      let listEval = [] as any[];
      listEval.push(
        ...this.dataDetail.dataAfterClass.map((el) => {
          return {
            id: el.id,
            scoreEval: el.scoreResult,
            useYn: STATUS_YES,
          };
        })
      );
      listEval.push(
        ...this.dataDetail.dataBeforeClass.map((el) => {
          return {
            id: el.id,
            scoreEval: el.scoreResult,
            useYn: STATUS_YES,
          };
        })
      );
      listEval.push(
        ...this.dataDetail.dataTrackAClass.map((el) => {
          return {
            id: el.id,
            scoreEval: el.scoreResult,
            useYn: STATUS_YES,
          };
        })
      );
      listEval.push(
        ...this.dataDetail.dataTrackBClass.map((el) => {
          return {
            id: el.id,
            scoreEval: el.scoreResult,
            useYn: STATUS_YES,
          };
        })
      );

      listEval.push(
        ...this.dataDetail.dataTrackAClassSelect.map((el) => {
          return {
            id: el.id,
            scoreEval: el.scoreResult,
            useYn: this.trackAClassSelect == el.id ? STATUS_YES : STATUS_NO,
          };
        })
      );
      listEval.push(
        ...this.dataDetail.dataTrackBClassSelect.map((el) => {
          return {
            id: el.id,
            scoreEval: el.scoreResult,
            useYn: this.trackBClassSelect == el.id ? STATUS_YES : STATUS_NO,
          };
        })
      );

      let opinionAll = [] as any[];

      opinionAll.push(this.dataDetail.opinionAfterClass);
      opinionAll.push(this.dataDetail.opinionBeforeClass);
      opinionAll.push(this.dataDetail.opinionTrackAClass);
      opinionAll.push(this.dataDetail.opinionTrackBClass);

      let dataForm = {
        id: this.dataDetail.id,
        content: this.dataDetail.content,
        opinionAll: opinionAll,
        listEval: listEval,
      } as HyflexAlReqDTO;

      return dataForm;
    },
    gotoPage() {
      this.$router.push({
        name: SCREEN.manageApprovedSubjects.name,
      });
    },
    convertIndiEvalNote(data: string): string[] {
      return data
        .split("*")
        .map((part) => part.trim())
        .filter((part) => part.length > 0);
    },
    sumScoreClass(data: number[]): number {
      return data.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue !== null ? currentValue : 0);
      }, 0);
    },
    sumScoreAClass() {
      if (
        this.dataDetail.dataTrackAClass &&
        this.dataDetail.dataTrackAClassSelect
      ) {
        let scoreTrackA = this.dataDetail.dataTrackAClass.reduce(
          (accumulator, currentValue) => {
            return (
              accumulator +
              (currentValue.scoreResult !== null ? currentValue.scoreResult : 0)
            );
          },
          0
        );
        let scoreTrackASelect = this.dataDetail.dataTrackAClassSelect
          .filter((el) => el.id == this.trackAClassSelect)
          .reduce((accumulator, currentValue) => {
            return (
              accumulator +
              (currentValue.scoreResult !== null ? currentValue.scoreResult : 0)
            );
          }, 0);

        return scoreTrackA + scoreTrackASelect;
      }
      return 0;
    },
    sumScoreBClass() {
      if (
        this.dataDetail.dataTrackBClass &&
        this.dataDetail.dataTrackBClassSelect
      ) {
        let scoreTrackA = this.dataDetail.dataTrackBClass.reduce(
          (accumulator, currentValue) => {
            return (
              accumulator +
              (currentValue.scoreResult !== null ? currentValue.scoreResult : 0)
            );
          },
          0
        );
        let scoreTrackASelect = this.dataDetail.dataTrackBClassSelect
          .filter((el) => el.id == this.trackBClassSelect)
          .reduce((accumulator, currentValue) => {
            return (
              accumulator +
              (currentValue.scoreResult !== null ? currentValue.scoreResult : 0)
            );
          }, 0);

        return scoreTrackA + scoreTrackASelect;
      }
      return 0;
    },
    splitApplyCd(applyCd: string): string[] {
      return applyCd
        ? applyCd
            .split(", ")
            .map((cd) => cd.trim())
            .filter((cd) => cd.length > 0)
        : [];
    },
  },
});
</script>
<style scoped>
.styleTh {
  background-color: #edeff2;
  text-align: center;
}
.custom-list {
  list-style-type: disc;
  padding-left: 1.5rem;
}
.data-select {
  opacity: 0.7;
}
</style>
