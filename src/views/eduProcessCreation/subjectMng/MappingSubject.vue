<template>
  <div class="box_section mt-5">
    <div class="box_section mt-13">
      <div class="tbl tbl_col tbl_scroll scrollx_tbl_xl">
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 10%" />
          <col style="width: 10%" />
          <col style="width: 10%" />
          <col style="width: 10%" />
          <col style="width: 10%" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
          <col style="width: auto" />
        </colgroup>
        <table>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
                <!-- 학기구분 -->{{
                  t("eduProcessCreation.subjectMng.title61")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
                <!-- 교과목명 -->{{
                  t("eduProcessCreation.subjectMng.title62")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
                <!-- 이수구분 -->{{
                  t("eduProcessCreation.subjectMng.title63")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
                <!-- 직무역량 -->{{
                  t("eduProcessCreation.subjectMng.title64")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
                <!-- 하위역량 -->{{
                  t("eduProcessCreation.subjectMng.title65")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
                <!-- 비율 -->{{ t("eduProcessCreation.subjectMng.title66") }}
              </th>
              <template
                v-for="coreAbility in listCoreAbility"
                :key="coreAbility.coreAbilitySeq"
                ><th scope="row" class="ta_c" :colspan="3" :rowspan="1">
                  {{ coreAbility.coreAbilityNm }}
                </th></template
              >
            </tr>
            <tr>
              <template
                v-for="childAbility in listChildAbility"
                :key="childAbility.childAbilitySeq"
                ><th scope="row" class="ta_c" :colspan="1" :rowspan="1">
                  {{ childAbility.childAbilityNm }}
                </th></template
              >
            </tr>
          </thead>
          <tbody>
            <template
              v-for="sbjtMapping in listSbjtMapping"
              :key="sbjtMapping.termCd"
            >
              <tr>
                <td scope="row" :rowspan="sbjtMapping.rowSpan">
                  {{ sbjtMapping.gradeNm + "-" + sbjtMapping.termNm }}
                </td>
              </tr>
              <template v-for="sbjtCand in sbjtMapping.listSbjt">
                <tr>
                  <td scope="row" :rowspan="sbjtCand.rowSpan">
                    <span
                      :class="{
                        font_black: !sbjtCand.isCheck,
                        medium: !sbjtCand.isCheck,
                        font_red: sbjtCand.isCheck,
                        bold: sbjtCand.isCheck,
                      }"
                      >{{ sbjtCand.sbjtNm }}</span
                    >
                  </td>
                  <td scope="row" :rowspan="sbjtCand.rowSpan">
                    <span
                      :class="{
                        font_black: !sbjtCand.isCheck,
                        medium: !sbjtCand.isCheck,
                        font_red: sbjtCand.isCheck,
                        bold: sbjtCand.isCheck,
                      }"
                      >{{ sbjtCand.cateComplete }}</span
                    >
                  </td>
                </tr>
                <template
                  v-for="(jobAbility, indexJob) in sbjtCand.listJobAbility"
                  ><tr>
                    <td scope="row" :rowspan="jobAbility.listChild.length">
                      <span
                        :class="{
                          font_black: !sbjtCand.isCheck,
                          medium: !sbjtCand.isCheck,
                          font_red: sbjtCand.isCheck,
                          bold: sbjtCand.isCheck,
                        }"
                        >{{ jobAbility.jobAbilNm }}</span
                      >
                    </td>
                    <template
                      v-for="(child, index) in jobAbility.listChild.slice(0, 1)"
                      ><td scope="row">
                        <span
                          :class="{
                            font_black: !sbjtCand.isCheck,
                            medium: !sbjtCand.isCheck,
                            font_red: sbjtCand.isCheck,
                            bold: sbjtCand.isCheck,
                          }"
                        >
                          {{ child.childNm }}</span
                        >
                      </td>
                      <td scope="row">
                        <SelectBoxBase
                          :id="
                            'rateChild' +
                            sbjtMapping.termCd +
                            sbjtCand.sbjtCd +
                            child.childSeq
                          "
                          :name="
                            'rateChild' +
                            sbjtMapping.termCd +
                            sbjtCand.sbjtCd +
                            child.childSeq
                          "
                          :data="listRateCd"
                          class="wd_75"
                          v-model="child.rate"
                        >
                        </SelectBoxBase>
                      </td>
                      <template
                        v-for="rateCore in sbjtCand.listRateCoreAbility"
                        v-if="indexJob === 0"
                        ><td
                          scope="row"
                          :rowspan="jobAbility.listChild.length + 1"
                          style="position: relative"
                          class="td__rate__core"
                        >
                          <div
                            style="position: absolute; top: calc(50% - 20px)"
                          >
                            <SelectBoxBase
                              :id="'rateCoreAbility'"
                              :name="'selectbox'"
                              :data="listRateCd"
                              class="wd_75"
                              v-model="rateCore.rate"
                            >
                            </SelectBoxBase>
                          </div></td
                      ></template>
                    </template>
                  </tr>
                  <tr v-for="child in jobAbility.listChild.slice(1)">
                    <td scope="row">
                      <span
                        :class="{
                          font_black: !sbjtCand.isCheck,
                          medium: !sbjtCand.isCheck,
                          font_red: sbjtCand.isCheck,
                          bold: sbjtCand.isCheck,
                        }"
                      >
                        {{ child.childNm }}</span
                      >
                    </td>
                    <td scope="row">
                      <SelectBoxBase
                        :id="
                          'rateChild' +
                          sbjtMapping.termCd +
                          sbjtCand.sbjtCd +
                          child.childSeq
                        "
                        :name="
                          'rateChild' +
                          sbjtMapping.termCd +
                          sbjtCand.sbjtCd +
                          child.childSeq
                        "
                        :data="listRateCd"
                        class="wd_75"
                        v-model="child.rate"
                      >
                      </SelectBoxBase>
                    </td></tr
                ></template>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn_group btn_end mg_t30">
      <button
        type="button"
        class="btn_round btn_md btn_gray"
        @click="confirmSaveTemp"
        :disabled="saveType === cdSave"
      >
        {{ t("common.saveTemp") }}
      </button>
      <button
        type="button"
        class="btn_round btn_md btn_primary"
        @click="confirmSave"
      >
        {{ t("common.save") }}
      </button>
      <button
        type="button"
        class="btn_round btn_md btn_primary"
        @click="next()"
        :disabled="isDisabled"
      >
        {{ t("common.next") }}
      </button>
      <button type="button" class="btn_round btn_md btn_white" @click="back()">
        {{ t("common.list") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { commonStore } from "../../../stores/common";
import { SCREEN } from "../../../router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { getCodeMngByUpCdId } from "../../../stores/common/codeMng/codeMng.service";
import {
  STS_CD_SAVE,
  STS_CD_SAVE_TEMP,
  UP_CD_ID_RATE00,
} from "../../../constants/common.const";
import { CodeMngModel } from "../../../stores/common/codeMng/codeMng.type";
import {
  SubMngChildAbilityModel,
  SubMngCoreAbilityModel,
  SubMngCoreAndMappingModel,
  SubMngMappingSubjectModel,
  SubMngSaveSbjtCandModel,
  SubMngSbjtCandModel,
} from "../../../stores/eduProcessCreation/subjectMng/subjectMng.type";
import {
  getSubMngMappingSubject,
  saveSubMngCoreAndMapping,
} from "../../../stores/eduProcessCreation/subjectMng/subjectMng.service";
import { EduCourseDetailReqDTO } from "../../../stores/eduProcessCreation/eduCourse/eduProcess.type";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;

    return { router, storeCommon, t, id };
  },
  data() {
    return {
      listRateCd: [
        { cdId: "", cdNm: this.t("common.select"), upCdId: "1" },
      ] as Array<any>,
      listCoreAbility: [] as Array<SubMngCoreAbilityModel>,
      listChildAbility: [] as Array<SubMngChildAbilityModel>,
      listSbjtMapping: [] as Array<SubMngMappingSubjectModel>,
      subMngCoreAndMappingModel: {} as SubMngCoreAndMappingModel,
      eduCourseDetailReqModel: {} as EduCourseDetailReqDTO,
      subMngSaveSbjtCandModel: {} as SubMngSaveSbjtCandModel,
      isDisabled: true,
      saveType: "",
      cdSave: STS_CD_SAVE,
      cdSaveTemp: STS_CD_SAVE_TEMP,
    };
  },
  beforeMount() {
    this.getListRateCd();
    this.eduCourseDetailReqModel.eduCourseSeq = this.id;
    this.subMngSaveSbjtCandModel.eduCourseSeq = this.id;

    this.getSubMngMapping();
  },
  methods: {
    getSubMngMapping() {
      this.storeCommon.setLoading(true);

      getSubMngMappingSubject(this.eduCourseDetailReqModel).then((res) => {
        const {
          listCoreAbility,
          listChildAbility,
          listMappingSubject,
          saveType,
        } = res.data.data;

        this.listCoreAbility = listCoreAbility;
        this.listChildAbility = listChildAbility;
        this.listSbjtMapping = listMappingSubject;

        this.isDisabled = saveType == this.cdSaveTemp || saveType == null;

        this.listSbjtMapping.forEach((sbjtMapping) => {
          sbjtMapping.rowSpan = this.calculatorRowSpanTerm(sbjtMapping);

          sbjtMapping.listSbjt.forEach((sbjt) => {
            sbjt.rowSpan = this.calculatorRowSpanSbjtCand(sbjt);
          });
        });

        this.storeCommon.setLoading(false);
      });
    },
    getListRateCd() {
      getCodeMngByUpCdId({ upCdId: UP_CD_ID_RATE00 }).then((response) => {
        response.data.data.forEach((item: CodeMngModel) => {
          this.listRateCd.push({ cdId: item.cdNm, cdNm: item.cdNm });
        });
      });
    },
    calculatorRowSpanTerm(item: SubMngMappingSubjectModel) {
      let sum = 0;
      item.listSbjt.forEach((sbjt) => {
        sum += this.calculatorRowSpanSbjtCand(sbjt);
      });
      return sum + 1;
    },
    calculatorRowSpanSbjtCand(item: SubMngSbjtCandModel) {
      let sum = 1;
      item.listJobAbility.forEach((job) => {
        sum += job.listChild.length;
      });
      return sum;
    },
    confirmSaveTemp() {
      this.$confirm(
        this.t("common.message.confirmSaveTemp"),
        "",
        (isConfirm: Boolean) => {
          if (isConfirm) {
            this.saveData("saveTemp");
          }
        }
      );
    },
    confirmSave() {
      let isCheckCoreAbility = this.handleValidateCoreAbility();
      if (isCheckCoreAbility) {
        this.$alert(
          this.t("eduProcessCreation.subjectMng.messageValidate3CoreAbility")
        );
        return;
      }

      let isCheckRate = this.handleValidateRate();
      if (isCheckRate) {
        this.$alert(this.t("eduProcessCreation.subjectMng.messageValidate100"));
        return;
      }

      this.$confirm(this.t("common.message.save"), "", (isConfirm: Boolean) => {
        if (isConfirm) {
          this.saveData("save");
        }
      });
    },
    handleValidateRate() {
      let isCheck = false;

      this.listSbjtMapping.forEach((sbjtMapping) => {
        sbjtMapping.listSbjt.forEach((sbjt) => {
          let totalChildRate = 0;
          let totalCoreAbilityRate = 0;
          sbjt.listJobAbility.forEach((jobAbility) => {
            totalChildRate += jobAbility.listChild.reduce((sum, child) => {
              return sum + parseInt(child.rate || "0");
            }, 0);
          });
          totalCoreAbilityRate = sbjt.listRateCoreAbility.reduce(
            (sum, coreAbility) => {
              return sum + parseInt(coreAbility.rate || "0");
            },
            0
          );
          const isInvalid =
            totalChildRate !== 100 || totalCoreAbilityRate !== 100;
          sbjt.isCheck = isInvalid;
          if (isInvalid) {
            isCheck = true;
          }
        });
      });

      return isCheck;
    },
    handleValidateCoreAbility() {
      let isCheck = false;

      const coreAbilityMap: { [key: string]: number } = {};

      this.listSbjtMapping.forEach((sbjtMapping) => {
        sbjtMapping.listSbjt.forEach((sbjt) => {
          for (let key in coreAbilityMap) {
            delete coreAbilityMap[key];
          }
          sbjt.listRateCoreAbility.forEach((rateCoreAbility) => {
            const coreAbilitySeq = rateCoreAbility.coreAbilitySeq;
            const rate = rateCoreAbility.rate;
            if (coreAbilitySeq && rate !== "") {
              coreAbilityMap[coreAbilitySeq] =
                (coreAbilityMap[coreAbilitySeq] || 0) + 1;
            }
          });
          const numberOfCoreAbilitiesSelected =
            Object.keys(coreAbilityMap).length;
          if (numberOfCoreAbilitiesSelected > 3) {
            sbjt.isCheck = true;
            isCheck = true;
          } else {
            sbjt.isCheck = false;
          }
        });
      });

      return isCheck;
    },
    saveData(type: string) {
      this.subMngSaveSbjtCandModel.listMappingSubject = this.listSbjtMapping;
      this.subMngSaveSbjtCandModel.saveType = type;
      this.storeCommon.setLoading(true);
      saveSubMngCoreAndMapping(this.subMngSaveSbjtCandModel).then((res) => {
        this.storeCommon.setLoading(false);
        if (type === "saveTemp") {
          this.$alert(this.t("common.message.successSaveTemp"));
        } else {
          this.$confirm(
            this.t("common.messageSuccessNextTab"),
            "",
            (isConfirm: Boolean) => {
              if (isConfirm) {
                this.next();
              } else {
                if (this.isDisabled) {
                  this.$emit("updateStage", 54);
                }
              }
              this.isDisabled = false;
            }
          );
        }
      });
    },
    next() {
      this.$emit("tabChange5", 54);
    },
    back() {
      this.router.push({
        name: SCREEN.eduProcessCreation.name,
      });
    },
  },
});
</script>
<style scoped>
.core__ability__center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.td__rate__core {
  min-width: 85px;
}
</style>
