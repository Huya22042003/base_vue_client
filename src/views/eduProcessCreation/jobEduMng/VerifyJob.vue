<template>
  <div class="box_section mt-5">
    <div
      class="box_section mt-13"
      v-for="coreJobSelc in listVerifyJobAbility"
      :key="coreJobSelc.coreJobSelcSeq"
    >
      <p class="box_title_sm">{{ coreJobSelc.jobNm }}</p>
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 15%" />
            <col style="width: 10%" />
            <col style="width: 20%" />
            <col style="width: 7%" />
            <col style="width: 7%" />
            <col style="width: 7%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 능력단위 구분 -->{{
                  t("eduProcessCreation.jobEduMng.title13")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 능력단위 코드 -->{{
                  t("eduProcessCreation.jobEduMng.title14")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 직무역량 -->{{ t("eduProcessCreation.jobEduMng.title15") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 교육 필요도 -->{{
                  t("eduProcessCreation.jobEduMng.title16")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 직무 중요도 -->{{
                  t("eduProcessCreation.jobEduMng.title17")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평균 -->{{ t("eduProcessCreation.jobEduMng.title18") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 활용 -->{{ t("eduProcessCreation.jobEduMng.title19") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="ncsKcs in coreJobSelc.listNcsKcs"
              :key="ncsKcs.code"
              ><tr>
                <td
                  scope="row"
                  :colspan="1"
                  :rowspan="ncsKcs.listVerifyJobAbility.length + 1"
                >
                  {{ ncsKcs.code }}
                </td>
              </tr>
              <template
                v-for="(jobAbility, indexJob) in ncsKcs.listVerifyJobAbility"
                :key="jobAbility.jobAbilSeq"
              >
                <tr>
                  <td scope="row" :colspan="1">{{ jobAbility.jobAbilCd }}</td>
                  <td scope="row" :colspan="1">
                    <CheckboxBase
                      :mode="'show'"
                      v-model="jobAbility.isCheck"
                      :id="
                        'checkbox' +
                        coreJobSelc.coreJobSelcSeq +
                        jobAbility.jobAbilSeq
                      "
                      :name="
                        'checkbox' +
                        coreJobSelc.coreJobSelcSeq +
                        jobAbility.jobAbilSeq
                      "
                      :key="
                        'checkbox' +
                        coreJobSelc.coreJobSelcSeq +
                        jobAbility.jobAbilSeq
                      "
                      :label="jobAbility.jobAbilNm"
                    >
                    </CheckboxBase>
                  </td>
                  <td scope="row" :colspan="1">
                    <InputBase
                      :id="
                        'eduNeed' +
                        coreJobSelc.coreJobSelcSeq +
                        jobAbility.jobAbilSeq
                      "
                      :is-number="true"
                      v-model="jobAbility.eduNeed"
                      v-if="jobAbility.isCheck"
                      :max-value="5"
                      :min-value="0"
                      required
                    />
                    <span v-else> - </span>
                  </td>
                  <td scope="row" :colspan="1">
                    <InputBase
                      :id="
                        'jobImpt' +
                        coreJobSelc.coreJobSelcSeq +
                        jobAbility.jobAbilSeq
                      "
                      :is-number="true"
                      v-model="jobAbility.jobImpt"
                      v-if="jobAbility.isCheck"
                      :max-value="5"
                      :min-value="0"
                      required
                    />
                    <span v-else> - </span>
                  </td>
                  <td scope="row" :colspan="1">
                    <span v-if="jobAbility.isCheck">{{
                      jobAbility.average
                    }}</span>
                    <span v-else>-</span>
                  </td>
                  <td
                    scope="row"
                    :colspan="1"
                    :class="
                      jobAbility.useYn === stateN ? 'font_red' : 'font_green'
                    "
                  >
                    <span v-if="jobAbility.isCheck">{{
                      jobAbility.useYn === stateN
                        ? t("eduProcessCreation.noUse")
                        : t("eduProcessCreation.use")
                    }}</span
                    ><span v-else>-</span>
                  </td>
                </tr></template
              >
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn_group btn_end mg_t35">
      <!-- <button
        v-if="version && isSave"
        type="button"
        class="btn_round btn_md btn_primary"
        @click="confirmSave()"
      >
        {{ t("common.save") }}
      </button> -->
      <ButtonBase
        v-if="version && isSave"
        type="button"
        class="btn_round btn_md btn_primary"
        :buttonName="t('common.save')"
        @click="confirmSave()"
      ></ButtonBase>
      <button
        type="button"
        class="btn_round btn_md btn_primary"
        :disabled="isDisabled"
        @click="next()"
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
import { JobEduVerifyCoreJobListModel } from "../../../stores/eduProcessCreation/jobEduMng/jobEduMng.type";
import {
  STATUS_NO,
  STATUS_YES,
  VERSION_V1,
} from "../../../constants/common.const";
import {
  getListVerifyJobAbility,
  saveListVerifyJobAbility,
} from "../../../stores/eduProcessCreation/jobEduMng/jobEduMng.service";
import { EduCourseDetailReqDTO } from "../../../stores/eduProcessCreation/eduCourse/eduProcess.type";
import InputBase from "../../../components/common/input/InputBase.vue";

export default defineComponent({
  components: {
    InputBase,
  },
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const version = window.history.state.version == VERSION_V1;
    const isSave = window.history.state.isSave;

    return { router, storeCommon, t, id, version, isSave };
  },
  data() {
    return {
      listVerifyJobAbility: [] as Array<JobEduVerifyCoreJobListModel>,
      stateN: STATUS_NO,
      stateY: STATUS_YES,
      isDisabled: true,
      eduCourseDetailReqDTO: {} as EduCourseDetailReqDTO,
    };
  },
  beforeMount() {
    this.eduCourseDetailReqDTO.eduCourseSeq = this.id;

    this.getListVerifyJobAbil();
  },
  watch: {
    listVerifyJobAbility: {
      deep: true,
      handler() {
        this.calculateAverages();
      },
    },
  },
  methods: {
    getListVerifyJobAbil() {
      this.storeCommon.setLoading(true);
      getListVerifyJobAbility(this.eduCourseDetailReqDTO).then((res) => {
        this.listVerifyJobAbility = res.data.data;
        this.listVerifyJobAbility.forEach((jobAbility) => {
          jobAbility.listNcsKcs.forEach((ncsKcs) => {
            ncsKcs.listVerifyJobAbility.forEach((item) => {
              if (item.isCheck) {
                this.isDisabled = false;
              }
            });
          });
        });
        this.storeCommon.setLoading(false);
      });
    },
    calculateAverages() {
      this.listVerifyJobAbility.forEach((coreJob) => {
        coreJob.listNcsKcs.forEach((ncsKcs) => {
          ncsKcs.listVerifyJobAbility.forEach((jobAbility) => {
            const { eduNeed, jobImpt } = jobAbility;

            const average = ((Number(eduNeed) + Number(jobImpt)) / 2).toFixed(
              1
            );

            jobAbility.average = Number(average);

            if (Number(average) >= 3.5) {
              jobAbility.useYn = this.stateY;
            } else {
              jobAbility.useYn = this.stateN;
            }
          });
        });
      });
    },
    confirmSave() {
      let isValid = true;

      this.listVerifyJobAbility.forEach((coreJob) => {
        let count = 0;

        coreJob.listNcsKcs.forEach((ncsKcs) => {
          ncsKcs.listVerifyJobAbility.forEach((jobAbility) => {
            if (
              jobAbility.isCheck === true &&
              jobAbility.useYn === this.stateY
            ) {
              count++;
            }
          });
        });

        if (count > 4) {
          this.$alert(
            this.t(
              "eduProcessCreation.jobEduMng.messageValidateChooseJobAbility4"
            )
          );
          isValid = false;
          return false;
        } else if (count < 1) {
          this.$alert(
            this.t(
              "eduProcessCreation.jobEduMng.messageValidateChooseJobAbility1"
            )
          );
          isValid = false;
          return false;
        }
      });

      if (isValid) {
        if (this.storeCommon.check) {
          this.$alert(this.t("common.messageValidateRequired"));
          return;
        }

        this.$confirm(
          this.t("eduProcessCreation.jobEduMng.messageConfirmSave"),
          "",
          (isConfirm: Boolean) => {
            if (isConfirm) {
              this.saveData();
            }
          }
        );
      }
    },
    saveData() {
      this.storeCommon.setLoading(true);
      saveListVerifyJobAbility(this.listVerifyJobAbility).then((res) => {
        this.$confirm(
          this.t("common.messageSuccessNextTab"),
          "",
          (isConfirm: Boolean) => {
            if (isConfirm) {
              this.next();
            }
            this.$emit("updateStage", 43);
            this.isDisabled = false;
          }
        );
        this.storeCommon.setLoading(false);
      });
    },
    next() {
      this.$emit("tabChange4", 43);
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

.font_green {
  color: #026700;
}
</style>
