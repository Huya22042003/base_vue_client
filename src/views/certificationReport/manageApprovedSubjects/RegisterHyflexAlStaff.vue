<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>

    <div class="box dp_block">
      <div class="box_section">
        <table class="tbl_row">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <!-- 교과목명 -->
                 {{ t("certificationReport.manageApprovedSubjects.field5") }}
                </th>
              <td class="td_input">
                {{ dataForm.name }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 수강코드 -->
                 {{ t("certificationReport.manageApprovedSubjects.field6") }}
                </th>
              <td>
                {{ dataForm.codeLect }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 구분 -->
                 {{ t("certificationReport.manageApprovedSubjects.field7") }}
                </th>
              <td class="td_input">
                {{ dataForm.typeSubject }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 성명 -->
                 {{ t("certificationReport.manageApprovedSubjects.field8") }}
                </th>
              <td>
                {{ dataForm.teacher }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 소속학과 -->
                 {{ t("certificationReport.manageApprovedSubjects.field9") }}
                </th>
              <td class="td_input">
                {{ dataForm.department }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 대상학년 -->
                 {{ t("certificationReport.manageApprovedSubjects.field10") }}
                </th>
              <td>
                {{ dataForm.yearEdu }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 교과목 특성 -->
                 {{ t("certificationReport.manageApprovedSubjects.field11") }}
                </th>
              <td class="td_input">
                {{ dataForm.subjectCharacter }}
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 신청트랙 -->
                 {{ t("certificationReport.manageApprovedSubjects.field12") }}
                </th>
              <td>
                <RadiobuttonBase
                  v-for="(item, index) in listRadioTrack"
                  :value="item.cdId"
                  v-model="dataForm.trackCd"
                  :isDisable="!checkButton"
                  :id="`${item.cdId}_${index}_field`"
                  :name="`${item.cdId}_${index}_field`"
                  :key="`${item.cdId}_${index}_field`"
                  :checked="item.cdId == dataForm.trackCd"
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 운영방식 -->
                 {{ t("certificationReport.manageApprovedSubjects.field13") }}
                </th>
              <td class="td_input">
                <RadiobuttonBase
                  v-for="(item, index) in listMethod"
                  :value="item.cdId"
                  v-model="dataForm.oprtMethCd"
                  :isDisable="!checkButton"
                  :id="`${item.cdId}_${index}_field`"
                  :name="`${item.cdId}_${index}_field`"
                  :key="`${item.cdId}_${index}_field`"
                  :checked="item.cdId == dataForm.oprtMethCd"
                  :label="item.cdNm"
                >
                </RadiobuttonBase>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 적용과정 -->
                 {{ t("certificationReport.manageApprovedSubjects.field14") }}
                </th>
              <td>
                <div class="select_checkbox">
                  <CheckboxBase
                    v-for="item in listProcess"
                    :mode="'show'"
                    :value="item.cdId"
                    :isDisable="!checkButton"
                    v-model="dataForm.applyCd"
                    :id="`${item.cdId}`"
                    :name="`${item.cdId}`"
                    :key="item.cdId"
                    :label="`${item.cdNm}`"
                  >
                  </CheckboxBase>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- 적용주차 -->
                 {{ t("certificationReport.manageApprovedSubjects.field15") }}
                </th>
              <td>
                <TextArea
                  id="applyWeek"
                  placeholder=""
                  required
                  :readonly="!checkButton"
                  v-model="dataForm.applyWeek"
                ></TextArea>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <!-- Y’sU Hyflex AL 수업 운영에 대한 소개 -->
                 {{ t("certificationReport.manageApprovedSubjects.field16") }}
                </th>
              <td>
                <TextArea
                  id="intro"
                  placeholder=""
                  required
                  :readonly="!checkButton"
                  v-model="dataForm.intro"
                ></TextArea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box_section mt-6">
        <div class="btn_group btn_end">
          <button
            v-if="checkButton"
            type="button"
            class="button btn_xs btn_blue"
            :disabled="isDisable || store.check"
            @click="register"
          >
            <!-- 심사 신청 -->
            {{ t("certificationReport.manageApprovedSubjects.button1") }}
          </button>
          <button type="button" class="button btn_sm btn_white" @click="back()">
            {{ t("06.capstoneDesign.tableAchievements.button.list") }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import InputBase from "@/components/common/input/InputBase.vue";
import TextArea from "@/components/common/input/TextArea.vue";
import { useI18n } from "vue-i18n";
import type { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  APPLICATION_PROCESS,
  LIST_TRACK_HYFLEX,
  METHOD_HYFLEX_UP_CD_ID,
  APPLICATION_PROCESS_OTHER,
  LIST_TRACK_HYFLEX_B,
  METHOD_HYFLEX_PRE_CLASS,
  HYFLEX_AL_STATUS_APPROVE,
  HYFLEX_AL_STATUS_BEFORE_APPROVE
} from "@/constants/common.const";
import { MODE_SHOW } from "@/constants/screen.const";
import CheckboxBase from "@/components/common/input/CheckboxBase.vue";
import {
  getDetailHyflex,
  registerHyflex,
} from "@/stores/approvedSubjectsStaff/approvedSubjectsStaff.service";
import type { HyflexRequestDTO } from "@/stores/approvedSubjectsStaff/approvedSubjectsStaff.type";

export default {
  components: {
    Breadcrumb,
    InputBase,
    TextArea,
    CheckboxBase,
  },
  data() {
    return {
      /* 'Hyflex AL 교과목 인증제 신청 ' */
      pageTitle: this.t("certificationReport.manageApprovedSubjects.title2"),
      breadcrumbItems: [],
      modeScreen: "" as any,
      listRadioTrack: [] as CodeMngModel[],
      listMethod: [] as CodeMngModel[],
      listProcess: [] as CodeMngModel[],
      dataForm: {
        idCert: "",
        status: "",
        name: "",
        codeLect: "",
        typeSubject: "",
        teacher: "",
        department: "",
        yearEdu: "",
        subjectCharacter: "",
        trackCd: "",
        oprtMethCd: "",
        applyCd: [],
        applyWeek: "",
        intro: "",
      },
      id: "",
      modefile: MODE_SHOW,
      isDisable: true,
      checkButton: true,
    };
  },
  setup() {
    const { t } = useI18n();
    const store = commonStore();

    return {
      t,
      store,
    };
  },
  watch: {
    "dataForm.applyCd": "checkValidate",
  },
  async beforeMount() {
    this.id = window.history.state.id;
    await getListCodeMng({
      upCdIdList: [
        LIST_TRACK_HYFLEX,
        METHOD_HYFLEX_UP_CD_ID,
        APPLICATION_PROCESS,
      ],
    }).then((res) => {
      this.listRadioTrack = res.data.data.filter(
        (el: CodeMngModel) => el.upCdId == LIST_TRACK_HYFLEX
      );
      this.listMethod = res.data.data.filter(
        (el: CodeMngModel) => el.upCdId == METHOD_HYFLEX_UP_CD_ID
      );
      this.listProcess = res.data.data.filter(
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
    register() {
      this.$swal({
        /* "교과목 인증제 승인처리하시겠어요?" */
        text: this.t("certificationReport.manageApprovedSubjects.message"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "승인",
        cancelButtonText: "취소",
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.store.setLoading(true);

          let params = {
            idCert: this.dataForm.idCert,
            track: this.dataForm.trackCd,
            method: this.dataForm.oprtMethCd,
            progress: this.joinApplyCd(this.dataForm.applyCd),
            week: this.dataForm.applyWeek,
            introduce: this.dataForm.intro,
          } as HyflexRequestDTO;

          registerHyflex(params)
            .then((res) => {
              this.$swal({
                /* "승인처리됐습니다." */
                text: this.t("certificationReport.manageApprovedSubjects.message1"),
                confirmButtonColor: "#DD6B55",
                confirmButtonText: this.t("common.confirm"),
              });
              this.back();
            })
            .finally(() => {
              this.store.setLoading(false);
            });
        }
      });
    },
    checkValidate() {
      if (this.dataForm.applyCd.length == 0) {
        this.isDisable = true;
      } else {
        this.isDisable = false;
      }
    },
    back() {
      this.$router.push({
        name: SCREEN.approveSubjectStaff.name,
      });
    },
    goToDetail() {
      this.store.setLoading(true);
      getDetailHyflex(this.id)
        .then((res) => {
          this.dataForm = res.data.data;
          
          if (
            this.dataForm.status == HYFLEX_AL_STATUS_BEFORE_APPROVE ||
            this.dataForm.status == HYFLEX_AL_STATUS_APPROVE
          ) {
            this.checkButton = false;
          } else {
            this.checkButton = true;
          }

          this.dataForm.trackCd = this.dataForm.trackCd
            ? this.dataForm.trackCd
            : LIST_TRACK_HYFLEX_B;
          this.dataForm.oprtMethCd = this.dataForm.oprtMethCd
            ? this.dataForm.oprtMethCd
            : METHOD_HYFLEX_PRE_CLASS;
          this.dataForm.applyCd = this.splitApplyCd(this.dataForm.applyCd);
        })
        .finally(() => {
          this.store.setLoading(false);
        });
    },
    splitApplyCd(applyCd: string): string[] {
      return applyCd
        ? applyCd
            .split(", ")
            .map((cd) => cd.trim())
            .filter((cd) => cd.length > 0)
        : [];
    },
    joinApplyCd(applyCdArray: string[]): string {
      return applyCdArray.join(", ");
    },
  },
};
</script>

<style scoped lang="scss"></style>
