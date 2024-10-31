<template>
  <div class="box_section mt-5">
    <p class="box_title_sm">
      <!-- 작성 지침 -->{{ t("eduProcessCreation.subjectMng.title5") }}
    </p>
    <div class="box_section mg_l50">
      <ul class="list_style_disc">
        <li class="list_style_disc mg_b20">
          <span
            ><!-- 동일교과목: 폐지 교과목과 현재 교과목의 명칭이 동일하며, 학점 이론
            실습 중 하나라도 변경이 있는 교과목 -->{{
              t("eduProcessCreation.subjectMng.title6")
            }}</span
          >
        </li>
        <li class="list_style_disc mg_b20">
          <span
            ><!-- 대체교과목: 폐지 교과목과 현재 교과목의 교과내용이 동일하나, 한글
            또는 영문 교과목 명칭이 바뀐 교과목 -->{{
              t("eduProcessCreation.subjectMng.title7")
            }}</span
          >
        </li>
        <li class="list_style_disc mg_b20">
          <span
            ><!-- 지정사유: -->{{ t("eduProcessCreation.subjectMng.title8") }}
            <ul class="mg_l20">
              <li>
                <!-- (1 Level) 교과 폐지, 교과 신설 -->{{
                  t("eduProcessCreation.subjectMng.title9")
                }}
              </li>
              <li>
                <!-- (2 Level) -->{{
                  t("eduProcessCreation.subjectMng.title10")
                }}
                <ul class="mg_l20">
                  <li>
                    <!-- ① 이수구분 변경: 전공필수⤑전공선택 혹은 전공선택⤑전공필수와
                    같이 이수구분이 변경되는 교과목 -->{{
                      t("eduProcessCreation.subjectMng.title11")
                    }}
                  </li>
                  <li>
                    <!-- ② 교과목명 변경: 한글 또는 영문 교과목 명이 변경되는 교과목 -->{{
                      t("eduProcessCreation.subjectMng.title12")
                    }}
                  </li>
                  <li>
                    <!-- ③ 학점/시수 변경: 학점 또는 이론/실습 시수가 변경되는 교과목 -->{{
                      t("eduProcessCreation.subjectMng.title13")
                    }}
                  </li>
                  <li>
                    <!-- ④ 기타: 회의록에 변경사유 작성 -->{{
                      t("eduProcessCreation.subjectMng.title14")
                    }}
                  </li>
                </ul>
              </li>
            </ul>
          </span>
        </li>
        <li class="list_style_disc">
          <span>
            <!-- 참고사항: -->{{ t("eduProcessCreation.subjectMng.title15") }}
            <ul class="mg_l20">
              <li>
                <!-- (1) 동일•대체교과목 지정은 교과폐지, 교과신설에 따른 교육과정
                연계를 위한 처리로 학과에서 자율적으로 설정하되, -->{{
                  t("eduProcessCreation.subjectMng.title16")
                }}
              </li>
              <li class="mg_l20">
                <!-- 동일•대체교과목 미지정에 따른 재학생(복학생) 수강 문제가
                발생하지 않도록 숙려 필요 -->{{
                  t("eduProcessCreation.subjectMng.title17")
                }}
              </li>
              <li>
                <!-- (2) 운영 중인 기존 교과목을 동일/대체교과목으로 신규 지정 시
                학기 이동 자제(재학생 수강에 영향) -->{{
                  t("eduProcessCreation.subjectMng.title18")
                }}
              </li>
              <li>
                <!-- (3) 운영 중인 기존 교과목의 학년도 변경 시 수강신청 전 재학생
                공지 필수(최소 2년간) -->{{
                  t("eduProcessCreation.subjectMng.title19")
                }}
              </li>
            </ul>
          </span>
        </li>
      </ul>
    </div>

    <div class="box_section mt-5">
      <div class="box_section mt-7">
        <div
          class="dp_flex box_title_sm"
          style="flex-direction: column; align-items: flex-end"
        >
          <div>
            <CheckboxBase
              :mode="'show'"
              v-model="isSameSbjt"
              :id="'checkboxSameSbjt'"
              :name="'checkboxSameSbjt'"
              :key="'checkboxSameSbjt'"
              :label="t('eduProcessCreation.subjectMng.title50')"
              :isDisable="listSameMapping.length > 0"
            >
            </CheckboxBase>
            <button
              class="btn_round btn_primary btn_lg"
              @click="createSameReplace"
              :disabled="isSameSbjt"
            >
              {{ t("common.add") }}
            </button>
          </div>
          <div class="mg_t10 font_16 font_red">
            {{ t("eduProcessCreation.subjectMng.title96") }}
          </div>
        </div>
        <div class="tbl tbl_col">
          <table>
            <colgroup></colgroup>
            <thead>
              <tr>
                <th scope="row" class="ta_c" :colspan="6">
                  <!-- 변경 전 교과목 -->{{
                    t("eduProcessCreation.subjectMng.title20")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="2">
                  <!-- 지정 사유 -->{{
                    t("eduProcessCreation.subjectMng.title21")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 동일/대체 -->{{
                    t("eduProcessCreation.subjectMng.title22")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="5">
                  <!-- 변경 후 교과목 -->{{
                    t("eduProcessCreation.subjectMng.title23")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 관리 -->{{ t("eduProcessCreation.subjectMng.title24") }}
                </th>
              </tr>
              <tr>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 구분 -->{{ t("eduProcessCreation.subjectMng.title25") }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 교과목 -->{{ t("eduProcessCreation.subjectMng.title26")
                  }}<br /><!-- 코드 -->{{
                    t("eduProcessCreation.subjectMng.title27")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 개설 -->{{ t("eduProcessCreation.subjectMng.title28")
                  }}<br /><!-- 학기 -->{{
                    t("eduProcessCreation.subjectMng.title29")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 이수 -->{{ t("eduProcessCreation.subjectMng.title30")
                  }}<br /><!-- 구분 -->{{
                    t("eduProcessCreation.subjectMng.title31")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 교과목명 -->{{
                    t("eduProcessCreation.subjectMng.title32")
                  }}<br /><!-- (영문명) -->{{
                    t("eduProcessCreation.subjectMng.title33")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 학점 -->{{ t("eduProcessCreation.subjectMng.title34")
                  }}<br /><!-- (이론/실습) -->{{
                    t("eduProcessCreation.subjectMng.title35")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 지정사유1 -->{{
                    t("eduProcessCreation.subjectMng.title36")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 지정사유2 -->{{
                    t("eduProcessCreation.subjectMng.title37")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 동일/대체 -->{{
                    t("eduProcessCreation.subjectMng.title38")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 교과목 코드 -->{{
                    t("eduProcessCreation.subjectMng.title39")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 개설 -->{{ t("eduProcessCreation.subjectMng.title40")
                  }}<br /><!-- 학기 -->{{
                    t("eduProcessCreation.subjectMng.title41")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 이수 -->{{ t("eduProcessCreation.subjectMng.title42")
                  }}<br /><!-- 구분 -->{{
                    t("eduProcessCreation.subjectMng.title43")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 교과목명 -->{{
                    t("eduProcessCreation.subjectMng.title44")
                  }}<br /><!-- (영문명) -->{{
                    t("eduProcessCreation.subjectMng.title45")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 학점 -->{{ t("eduProcessCreation.subjectMng.title46")
                  }}<br /><!-- (이론/실습) -->{{
                    t("eduProcessCreation.subjectMng.title47")
                  }}
                </th>
                <th scope="row" class="ta_c" :colspan="1">
                  <!-- 관리 -->{{ t("eduProcessCreation.subjectMng.title48") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <template
                v-for="(sameReplace, index) in listSameMapping"
                :key="index"
              >
                <tr v-if="sameReplace.delYn === statusNo">
                  <td scope="row" class="ta_c" :colspan="1">
                    {{ sameReplace.rowNum }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    <button
                      type="button"
                      class="btn_round btn_sm btn_gray wd_100"
                      @click="chooseSbjt(index, 1)"
                    >
                      <!-- 교과목 선택 -->{{
                        t("eduProcessCreation.subjectMng.title51")
                      }}
                    </button>
                    {{
                      sameReplace.sbjtBeforeCd ? sameReplace.sbjtBeforeCd : ""
                    }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{
                      sameReplace.gradeBeforeNm
                        ? sameReplace.gradeBeforeNm +
                          "-" +
                          sameReplace.termBeforeNm
                        : "-"
                    }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{
                      sameReplace.sustDivBeforeNm
                        ? sameReplace.sustDivBeforeNm
                        : "-"
                    }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{
                      sameReplace.sbjtBeforeNmEng
                        ? sameReplace.sbjtBeforeNmEng
                        : "-"
                    }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{
                      sameReplace.acqGpaBefore
                        ? sameReplace.acqGpaBefore +
                          "(" +
                          sameReplace.thryHrsBefore +
                          "/" +
                          sameReplace.pracHrsBefore +
                          ")"
                        : "-"
                    }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    <SelectBoxBase
                      :id="'listRsnFstCd' + index"
                      :name="'listRsnFstCd' + index"
                      :data="listRsnFstCd"
                      v-model="sameReplace.rsnFstCd"
                      class="wd_100"
                      required
                    >
                    </SelectBoxBase>
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    <SelectBoxBase
                      :id="'listRsnSecCd' + index"
                      :name="'listRsnSecCd' + index"
                      :data="listRsnSecCd"
                      v-model="sameReplace.rsnSecCd"
                      class="wd_100"
                      required
                    >
                    </SelectBoxBase>
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    <SelectBoxBase
                      :id="'listSameReplaceDivCd' + index"
                      :name="'listSameReplaceDivCd' + index"
                      :data="listSameReplaceDivCd"
                      v-model="sameReplace.sameReplaceDivCd"
                      class="wd_100"
                      required
                    >
                    </SelectBoxBase>
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    <button
                      type="button"
                      class="btn_round btn_sm btn_gray wd_100"
                      @click="chooseSbjt(index, 2)"
                    >
                      <!-- 교과목 선택 -->{{
                        t("eduProcessCreation.subjectMng.title51")
                      }}
                    </button>
                    {{ sameReplace.sbjtAfterCd ? sameReplace.sbjtAfterCd : "" }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{
                      sameReplace.gradeAfterNm
                        ? sameReplace.gradeAfterNm +
                          "-" +
                          sameReplace.termAfterNm
                        : "-"
                    }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{
                      sameReplace.sustDivAfterNm
                        ? sameReplace.sustDivAfterNm
                        : "-"
                    }}
                  </td>
                  <td scope="row" class="ta_c wd_150" :colspan="1">
                    {{
                      sameReplace.sbjtAfterNmEng
                        ? sameReplace.sbjtAfterNmEng
                        : "-"
                    }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{
                      sameReplace.acqGpaAfter
                        ? sameReplace.acqGpaAfter +
                          "(" +
                          sameReplace.thryHrsAfter +
                          "/" +
                          sameReplace.pracHrsAfter +
                          ")"
                        : "-"
                    }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    <button
                      type="button"
                      class="btn_round btn_sm btn_gray wd_60"
                      @click="deleteSameReplace(index)"
                    >
                      {{ t("common.deleteItem") }}
                    </button>
                  </td>
                </tr>
                <!-- Empty -->
              </template>
              <tr v-if="listSameMapping.length === 0">
                <td :colspan="15">
                  <span class="font_17 font_gray"
                    ><!-- [추가] 버튼을 눌러 입력란을 추가해주세요. -->{{
                      t("eduProcessCreation.subjectMng.title49")
                    }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="btn_group btn_end mg_t30">
      <div class="btn_group btn_end">
        <button type="button" class="btn_round btn_lg btn_gray">
          <!-- 5.교과목 도출 인쇄 -->{{
            t("eduProcessCreation.subjectMng.title52")
          }}
        </button>

        <!-- <button
          v-if="isSave"
          type="button"
          class="btn_round btn_lg btn_primary"
          @click="confirmSave"
        >
          {{ t("common.save") }}
        </button> -->
        <ButtonBase
          v-if="isSave"
          type="button"
          class="btn_round btn_lg btn_primary"
          :buttonName="t('common.save')"
          @click="confirmSave"
        ></ButtonBase>
        <button
          type="button"
          class="btn_round btn_lg btn_primary"
          :disabled="isDisabled"
          @click="next()"
        >
          {{ t("common.next") }}
        </button>
        <button
          type="button"
          class="btn_round btn_lg btn_white"
          @click="back()"
        >
          {{ t("common.list") }}
        </button>
      </div>
    </div>
  </div>
  <SubjectAssignModal
    v-if="modalOpen"
    @dataSelect="dataSelected"
    :type="type"
    :isOpen="modalOpen"
    :onClose="closeModal"
  />
</template>

<script lang="ts">
import { commonStore } from "../../../stores/common";
import { SCREEN } from "../../../router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import SubjectAssignModal from "./SubjectAssignModal.vue";
import { CodeMngModel } from "../../../stores/common/codeMng/codeMng.type";
import {
  STATUS_NO,
  STATUS_YES,
  UP_CD_ID_RSN_FST_CD,
  UP_CD_ID_RSN_SEC_CD,
  UP_CD_ID_SAME_REPLACE_DIV_CD,
} from "../../../constants/common.const";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
import { EduCourseDetailReqDTO } from "../../../stores/eduProcessCreation/eduCourse/eduProcess.type";
import {
  getSubMngSameReplaceMapping,
  saveSubMngSameReplaceMapping,
} from "../../../stores/eduProcessCreation/subjectMng/subjectMng.service";
import {
  SubMngSameListAndSameSbjtModel,
  SubMngSameReplaceMappingModel,
  SubMngSaveSameReplaceMappingModel,
  SubMngSbjtInfoListModel,
} from "../../../stores/eduProcessCreation/subjectMng/subjectMng.type";

export default defineComponent({
  components: {
    SubjectAssignModal,
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const isSave = window.history.state.isSave;

    return { router, storeCommon, t, id, isSave };
  },
  data() {
    return {
      listSameReplaceDivCd: [
        { cdId: "", cdNm: this.t("common.select") },
      ] as Array<CodeMngModel>,
      listRsnFstCd: [
        { cdId: "", cdNm: this.t("common.select") },
      ] as Array<CodeMngModel>,
      listRsnSecCd: [
        { cdId: "", cdNm: this.t("common.select") },
      ] as Array<CodeMngModel>,
      modalOpen: false,
      type: 1,
      eduCourseDetailReqDTO: {} as EduCourseDetailReqDTO,
      listSameMapping: [] as Array<SubMngSameReplaceMappingModel>,
      sameMappingIndexSelected: -1 as number,
      isDisabled: true,
      statusNo: STATUS_NO,
      statusYes: STATUS_YES,
      isSameSbjt: false,
      subMngSaveSameReplaceMappingModel:
        {} as SubMngSaveSameReplaceMappingModel,
      subMngSameListAndSameSbjtModel: {} as SubMngSameListAndSameSbjtModel,
    };
  },
  computed: {
    isInvalidMapping(): boolean {
      return this.listSameMapping.some(
        (mapping) => !mapping.sbjtAfterCd || !mapping.sbjtBeforeCd
      );
    },
  },
  async beforeMount() {
    this.storeCommon.setLoading(true);
    await this.getCodeSameReplaceDivCd();
    await this.getCodeRsnFstCd();
    await this.getCodeRsnSecCd();

    this.eduCourseDetailReqDTO.eduCourseSeq = this.id;

    this.getDetailReplaceMapping();
  },
  methods: {
    getDetailReplaceMapping() {
      getSubMngSameReplaceMapping(this.eduCourseDetailReqDTO).then((res) => {
        const { listSameReplaceMapping, sameSbjtYn } = res.data.data;
        this.listSameMapping = listSameReplaceMapping;
        this.isSameSbjt = sameSbjtYn === this.statusYes;
        if (
          (this.listSameMapping.length > 0 &&
            this.listSameMapping[0].sameReplaceMappSeq != null) ||
          sameSbjtYn != null
        ) {
          this.isDisabled = false;
        }
        this.storeCommon.setLoading(false);
      });
    },
    async getCodeSameReplaceDivCd() {
      const response = await getCodeMngByUpCdId({
        upCdId: UP_CD_ID_SAME_REPLACE_DIV_CD,
      });
      response.data.data.forEach((item: CodeMngModel) => {
        this.listSameReplaceDivCd.push(item);
      });
    },
    async getCodeRsnFstCd() {
      const response = await getCodeMngByUpCdId({
        upCdId: UP_CD_ID_RSN_FST_CD,
      });
      response.data.data.forEach((item: CodeMngModel) => {
        this.listRsnFstCd.push(item);
      });
    },
    async getCodeRsnSecCd() {
      const response = await getCodeMngByUpCdId({
        upCdId: UP_CD_ID_RSN_SEC_CD,
      });
      response.data.data.forEach((item: CodeMngModel) => {
        this.listRsnSecCd.push(item);
      });
    },
    chooseSbjt(index: number, type: number) {
      this.modalOpen = !this.modalOpen;
      this.type = type;
      this.sameMappingIndexSelected = index;
    },
    createSameReplace() {
      const validItems = this.listSameMapping.filter(
        (item) => item.delYn === STATUS_NO
      );
      const obj = ref<SubMngSameReplaceMappingModel>({
        rowNum: validItems.length + 1,

        sameReplaceMappSeq: null,
        sbjtBeforeCd: null,
        eduCursSeq: this.id,
        sbjtBeforeNm: null,
        gradeBeforeNm: null,
        termBeforeNm: null,
        sustDivBeforeNm: null,
        sbjtBeforeNmEng: null,
        acqGpaBefore: null,
        thryHrsBefore: null,
        pracHrsBefore: null,
        sbjtAfterCd: null,
        sbjtAfterNm: null,
        gradeAfterNm: null,
        termAfterNm: null,
        sustDivAfterNm: null,
        sbjtAfterNmEng: null,
        acqGpaAfter: null,
        thryHrsAfter: null,
        pracHrsAfter: null,
        sameReplaceDivCd: "",
        rsnFstCd: "",
        rsnSecCd: "",
        delYn: STATUS_NO,
      });
      this.listSameMapping.push(obj.value);
    },
    deleteSameReplace(index: number) {
      const item = this.listSameMapping[index];

      if (item.sameReplaceMappSeq) {
        this.listSameMapping[index].delYn = STATUS_YES;
      } else {
        this.listSameMapping.splice(index, 1);
      }

      let rowNum = 1;
      this.listSameMapping.forEach((item) => {
        if (item.delYn === STATUS_NO) {
          item.rowNum = rowNum++;
        }
      });
    },
    next() {
      this.$emit("nextTab", 61);
    },
    back() {
      this.router.push({
        path: SCREEN.eduProcessCreation.path,
      });
    },
    closeModal() {
      this.modalOpen = false;
    },
    confirmAction() {
      this.closeModal();
    },
    cancelAction() {
      this.closeModal();
    },
    dataSelected(data: SubMngSbjtInfoListModel) {
      this.listSameMapping.forEach((sameMapping, index) => {
        if (
          index === this.sameMappingIndexSelected &&
          sameMapping.delYn === STATUS_NO
        ) {
          const prefix = this.type === 1 ? "Before" : "After";

          sameMapping[`sbjt${prefix}Cd`] = data.sbjtCd;
          sameMapping[`sbjt${prefix}Nm`] = data.sbjtNm;
          sameMapping[`grade${prefix}Nm`] = data.gradeNm;
          sameMapping[`term${prefix}Nm`] = data.termNm;
          sameMapping[`sustDiv${prefix}Nm`] = data.sustDivNm;
          sameMapping[`sbjt${prefix}NmEng`] = data.sbjtNmEng;
          sameMapping[`acqGpa${prefix}`] = data.acqGpa;
          sameMapping[`thryHrs${prefix}`] = data.thryHrs;
          sameMapping[`pracHrs${prefix}`] = data.pracHrs;
        }
      });
    },
    confirmSave() {
      if (this.storeCommon.check || this.isInvalidMapping) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }

      if (this.handleValidateDuplicateSbjt()) {
        this.$alert(
          this.t("eduProcessCreation.subjectMng.messageValidateDuplicateSbjt")
        );
        return;
      }

      this.$confirm(this.t("common.message.save"), "", (isConfirm: Boolean) => {
        if (isConfirm) {
          this.saveData();
        }
      });
    },
    handleValidateDuplicateSbjt(): boolean {
      const sbjtBeforeSet = new Set<string>();
      const sbjtAfterSet = new Set<string>();

      for (const item of this.listSameMapping) {
        if (item.sbjtBeforeCd) {
          if (sbjtBeforeSet.has(item.sbjtBeforeCd)) {
            return true;
          }
          sbjtBeforeSet.add(item.sbjtBeforeCd);
        }

        if (item.sbjtAfterCd) {
          if (sbjtAfterSet.has(item.sbjtAfterCd)) {
            return true;
          }
          sbjtAfterSet.add(item.sbjtAfterCd);
        }
      }

      return false;
    },
    saveData() {
      this.subMngSaveSameReplaceMappingModel.eduCourseSeq = this.id;
      this.subMngSaveSameReplaceMappingModel.isSameSbjt = this.isSameSbjt;
      this.subMngSaveSameReplaceMappingModel.listSameReplaceMapping =
        this.listSameMapping;
      this.storeCommon.setLoading(true);
      saveSubMngSameReplaceMapping(this.subMngSaveSameReplaceMappingModel).then(
        (res) => {
          this.storeCommon.setLoading(false);
          this.$confirm(
            this.t("common.messageSuccessNextTab"),
            "",
            (isConfirm: Boolean) => {
              if (isConfirm) {
                this.next();
              } 
              this.$emit("updateStage", 61);
              this.isDisabled = false;
            }
          );
        }
      );
    },
  },
});
</script>
<style scoped>
@import url("../eduCourseCustom.css");
.list_style_disc {
  list-style: disc;
  font-size: 16px;
}
</style>
