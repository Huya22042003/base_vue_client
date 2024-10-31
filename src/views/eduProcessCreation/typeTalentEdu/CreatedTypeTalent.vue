<template>
  <div class="box_section mt-5">
    <div class="box_section mt-7">
      <div class="tbl_col tbl">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 80%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 대학 비전 -->{{
                  t("eduProcessCreation.typeTalentEdu.title14")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <div
                  v-if="data.schEduGoal && data.schEduGoal.length != 0"
                  v-for="(item, index) in data.schEduGoal.filter(
                    (el: EduGoalResDTO) => el.divCd == CD_SCH_VISION
                  )"
                >
                  {{ item.cont }}
                </div>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 대학 교육목표 -->{{
                  t("eduProcessCreation.typeTalentEdu.title15")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <div
                  v-if="data.schEduGoal && data.schEduGoal.length != 0"
                  v-for="(item, index) in data.schEduGoal.filter(
                    (el: EduGoalResDTO) => el.divCd == CD_SCH_TARGET
                  )"
                >
                  {{ item.cont }}
                </div>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 대학 인재상 -->{{
                  t("eduProcessCreation.typeTalentEdu.title16")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <div
                  v-if="data.schEduGoal && data.schEduGoal.length != 0"
                  v-for="(item, index) in data.schEduGoal.filter(
                    (el: EduGoalResDTO) => el.divCd == CD_SCH_TALENT
                  )"
                >
                  {{ item.cont }}
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="box_section mt-10">
      <div class="tbl_col tbl">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 80%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 학과(학부) 비전 -->{{
                  t("eduProcessCreation.typeTalentEdu.title17")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <div
                  v-if="data.deptEduGoal && data.deptEduGoal.length != 0"
                  v-for="(item, index) in data.deptEduGoal.filter(
                    (el: EduGoalResDTO) => el.divCd == CD_DEPT_VISION
                  )"
                >
                  {{ item.cont }}
                </div>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 학과(학부) 교육목표 -->{{
                  t("eduProcessCreation.typeTalentEdu.title18")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <div
                  v-if="data.deptEduGoal && data.deptEduGoal.length != 0"
                  v-for="(item, index) in data.deptEduGoal.filter(
                    (el: EduGoalResDTO) => el.divCd == CD_DEPT_TARGET
                  )"
                >
                  <CheckboxBase
                    :mode="'show'"
                    :value="item.eduGoalSeq"
                    :id="item.eduGoalSeq"
                    :name="item.eduGoalSeq"
                    :key="item.eduGoalSeq"
                    :label="item.cont"
                    v-model:modelValue="dataSave.dataSelTarget"
                  >
                  </CheckboxBase>
                </div>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 학과(학부) 인재상 -->{{
                  t("eduProcessCreation.typeTalentEdu.title19")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <div
                  v-if="data.deptEduGoal && data.deptEduGoal.length != 0"
                  v-for="(item, index) in data.deptEduGoal.filter(
                    (el: EduGoalResDTO) => el.divCd == CD_DEPT_TALENT
                  )"
                >
                  <CheckboxBase
                    :mode="'show'"
                    :value="item.eduGoalSeq"
                    :id="item.eduGoalSeq"
                    :name="item.eduGoalSeq"
                    :key="item.eduGoalSeq"
                    :label="item.cont"
                    v-model:modelValue="dataSave.dataSelTalent"
                  >
                  </CheckboxBase>
                </div>
              </th>
            </tr>
            <tr>
              <th scope="row" :colspan="1" class="td_custom_color">
                <!-- 교육과정 세부 교육목표 -->{{
                  t("eduProcessCreation.typeTalentEdu.title20")
                }}
              </th>
              <th scope="row" :colspan="1" class="ta_l">
                <TextArea
                  :id="'dataTargetDetail'"
                  v-model:modelValue="dataSave.dataTargetDetail"
                  required
                  rows="5"
                ></TextArea>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn_group btn_end mg_t30">
      <div class="btn_group btn_end">
        <ButtonBase
          type="button"
          @click="save"
          :buttonName="t('common.save')"
          class="btn_round btn_md btn_primary"
          v-if="isSave"
        />
        <button
          type="button"
          class="btn_round btn_md btn_primary"
          :disabled="isDisabled"
          @click="next()"
        >
          {{ t("common.next") }}
        </button>
        <button
          type="button"
          class="btn_round btn_md btn_white"
          @click="back()"
        >
          {{ t("common.list") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { getEduGoal } from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.service";
import {
  EduGoalResDTO,
  TypeTalentGoalResDTO,
} from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";
import {
  CD_SCH_VISION,
  CD_SCH_TARGET,
  CD_SCH_TALENT,
  CD_DEPT_VISION,
  CD_DEPT_TARGET,
  CD_DEPT_TALENT,
} from "@/constants/common.const";
import { EduCourseDescReqDTO } from "@/stores/eduProcessCreation/eduCourse/eduProcess.type";
import { CD_DEPT_TARGET_DETAIL, CD_STG033 } from "@/constants/common.const";
import { createEduCourseDesc } from "@/stores/eduProcessCreation/eduCourse/eduProcess.service";
import { createEduCourseSel } from "@/stores/eduProcessCreation/eduCourse/eduProcess.service";
import {
  EduCourseSelReqDTO,
  EduCourseSelRegistDTO,
} from "@/stores/eduProcessCreation/eduCourse/eduProcess.type";
import ButtonBase from "@/components/common/button/ButtonBase.vue";

export default defineComponent({
  components:{
    ButtonBase
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const isSave = window.history.state.isSave;

    return {
      router,
      storeCommon,
      t,
      id,
      CD_SCH_VISION,
      CD_SCH_TARGET,
      CD_SCH_TALENT,
      CD_DEPT_VISION,
      CD_DEPT_TARGET,
      CD_DEPT_TALENT,
      isSave,
    };
  },
  data() {
    return {
      data: {} as TypeTalentGoalResDTO,
      isDisabled: true,
      dataSave: {
        dataSelTalent: [],
        dataSelTarget: [],
        dataTargetDetail: "",
      },
    };
  },
  beforeMount() {
    this.getEduGoal();
  },
  methods: {
    getEduGoal() {
      this.storeCommon.setLoading(true);
      getEduGoal({ eduCourseSeq: this.id })
        .then((res: any) => {
          this.data = res.data.data;
          this.dataSave.dataSelTalent = this.data.eduSel
            .filter((item: any) => item.dataCd == CD_DEPT_TALENT)
            .map((item: any) => item.selCd);
          this.dataSave.dataSelTarget = this.data.eduSel
            .filter((item: any) => item.dataCd == CD_DEPT_TARGET)
            .map((item: any) => item.selCd);
          this.dataSave.dataTargetDetail = this.data.eduDesc[0]
            ? this.data.eduDesc[0].cont
            : "";

          if (this.dataSave.dataTargetDetail) {
            this.isDisabled = false;
          }
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    save() {
      if (
        this.storeCommon.check ||
        this.dataSave.dataSelTalent.length == 0 ||
        this.dataSave.dataSelTarget.length == 0
      ) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }

      this.$confirm(
        this.t("common.message.save"),
        "",
        async (isConfirm: Boolean) => {
          if (isConfirm) {
            this.storeCommon.setLoading(true);
            let dataDesc = {
              cont: this.dataSave.dataTargetDetail,
              dataCd: CD_DEPT_TARGET_DETAIL,
              dataNm: "",
              eduCourseSeq: this.id,
              proStep: CD_STG033,
              refrSeq: CD_DEPT_TARGET_DETAIL,
            } as EduCourseDescReqDTO;

            let dataSel = [] as EduCourseSelReqDTO[];
            this.dataSave.dataSelTalent.forEach((item: string) => {
              dataSel.push({
                dataCd: CD_DEPT_TALENT,
                dataNm: "",
                selCd: item,
                refrSeq: CD_DEPT_TARGET_DETAIL,
                etc: "",
                eduCourseSeq: this.id,
              });
            });
            this.dataSave.dataSelTarget.forEach((item: string) => {
              dataSel.push({
                dataCd: CD_DEPT_TARGET,
                dataNm: "",
                selCd: item,
                refrSeq: CD_DEPT_TARGET_DETAIL,
                etc: "",
                eduCourseSeq: this.id,
              });
            });

            const dataSaveSel = {
              proStep: CD_STG033,
              eduCourseSelReqDTOs: dataSel,
              eduCourseDescSelDTO: {
                eduCourseSeq: this.id,
                refrSeq: CD_DEPT_TARGET_DETAIL,
                upCdId: [CD_DEPT_TARGET, CD_DEPT_TALENT],
              },
            } as EduCourseSelRegistDTO;

            this.storeCommon.setLoading(true);
            await createEduCourseDesc([dataDesc]);
            await createEduCourseSel(dataSaveSel).finally(() => {
              this.storeCommon.setLoading(false);
              this.$confirm(
                this.t("common.messageSuccessNextTab"),
                "",
                (isConfirm: Boolean) => {
                  if (isConfirm) {
                    this.next();
                  }
                  if (this.isDisabled) {
                    this.$emit("updateStage", 33);
                  }
                  this.isDisabled = false;
                }
              );
            });
          }
          this.isDisabled = false;
        }
      );
    },
    next() {
      this.$emit("tabChange3", 33);
    },
    back() {
      this.router.push({
        path: SCREEN.eduProcessCreation.path,
      });
    },
  },
});
</script>
<style scoped>
@import url("../eduCourseCustom.css");
</style>
