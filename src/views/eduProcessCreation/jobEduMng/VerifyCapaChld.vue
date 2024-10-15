<template>
  <div class="box_section mt-5">
    <div
      class="box_section mt-13"
      v-for="coreJobSelc in listCoreJobSelc"
      :key="coreJobSelc.coreJobSelcSeq"
    >
      <p class="box_title_sm">{{ coreJobSelc.jobNm }}</p>
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 10%" />
            <col style="width: 13%" />
            <col style="width: 15%" />
            <col style="width: 35%" />
            <col style="width: 5%" />
            <col style="width: 20%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 능력단위 구분 -->{{
                  t("eduProcessCreation.jobEduMng.title20")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 직무역량(직무역량코드) -->{{
                  t("eduProcessCreation.jobEduMng.title21")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 하위역량 -->{{ t("eduProcessCreation.jobEduMng.title22") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 수행준거 -->{{ t("eduProcessCreation.jobEduMng.title23") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 활용 -->{{ t("eduProcessCreation.jobEduMng.title24") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 미활용 사유 -->{{
                  t("eduProcessCreation.jobEduMng.title25")
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="ncsKcs in coreJobSelc.listNcsKcs"
              :key="ncsKcs.code"
              ><tr>
                <td scope="row" :colspan="1" :rowspan="ncsKcs.rowSpan">
                  {{ ncsKcs.code }}
                </td>
              </tr>
              <template
                v-for="jobAbility in ncsKcs.listJobAbility"
                :key="jobAbility.jobAbilSeq"
              >
                <tr>
                  <td scope="row" :colspan="1" :rowspan="jobAbility.rowSpan">
                    {{
                      jobAbility.jobAbilNm + " (" + jobAbility.jobAbilCd + ")"
                    }}
                  </td>
                </tr>
                <template
                  v-for="jobCapaUnit in jobAbility.listJobCapaUnit"
                  :key="jobCapaUnit.jobCapaUnitSeq"
                  ><tr>
                    <td scope="row" :colspan="1" :rowspan="jobCapaUnit.rowSpan">
                      <CheckboxBase
                        :mode="'show'"
                        v-model="jobCapaUnit.isCheck"
                        :id="
                          'capaUnitCheckbox' +
                          coreJobSelc.coreJobSelcSeq +
                          jobAbility.jobAbilSeq +
                          jobCapaUnit.jobCapaUnitSeq
                        "
                        :name="
                          'capaUnitCheckbox' +
                          coreJobSelc.coreJobSelcSeq +
                          jobAbility.jobAbilSeq +
                          jobCapaUnit.jobCapaUnitSeq
                        "
                        :label="jobCapaUnit.capaUnitNm"
                        @change="handleChangeCheckboxJobCapaUnit(jobCapaUnit)"
                      >
                      </CheckboxBase>
                    </td>
                  </tr>
                  <template
                    v-for="capaUnitPerform in jobCapaUnit.listJobCapaUnitPerform"
                    :key="capaUnitPerform.capaUnitPerformStnrdSeq"
                  >
                    <tr>
                      <td scope="row" :colspan="1">
                        {{ capaUnitPerform.cont }}
                      </td>
                      <td>
                        <CheckboxBase
                          :mode="'show'"
                          v-model="capaUnitPerform.isCheck"
                          :is-disable="!jobCapaUnit.isCheck"
                          :id="
                            'capaUnitPerform' +
                            coreJobSelc.coreJobSelcSeq +
                            jobAbility.jobAbilSeq +
                            jobCapaUnit.jobCapaUnitSeq +
                            capaUnitPerform.capaUnitPerformStnrdSeq
                          "
                          :name="
                            'capaUnitPerform' +
                            coreJobSelc.coreJobSelcSeq +
                            jobAbility.jobAbilSeq +
                            jobCapaUnit.jobCapaUnitSeq +
                            capaUnitPerform.capaUnitPerformStnrdSeq
                          "
                        >
                        </CheckboxBase>
                      </td>
                      <td>
                        <InputBase
                          v-if="!capaUnitPerform.isCheck && jobCapaUnit.isCheck"
                          :id="
                            'unuseRsn' +
                            coreJobSelc.coreJobSelcSeq +
                            jobAbility.jobAbilSeq +
                            jobCapaUnit.jobCapaUnitSeq +
                            capaUnitPerform.capaUnitPerformStnrdSeq
                          "
                          v-model="capaUnitPerform.unuseRsn"
                          required
                        />
                      </td>
                    </tr>
                  </template>
                </template>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div class="btn_group btn_end mg_t30">
      <div class="btn_group btn_end">
        <button type="button" class="btn_round btn_md btn_gray">
          <!-- 4.직무 정의 및 직무모형 설정 인쇄 -->{{
            t("eduProcessCreation.jobEduMng.title26")
          }}
        </button>
        <button
          v-if="version"
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
import { commonStore } from "../../../stores/common";
import { SCREEN } from "../../../router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import {
  JobEduVerifyChildCoreJobListModel,
  JobEduVerifyChildNcsKcsModel,
  JobEduVerifyCmmnJobAbilityModel,
  JobEduVerifyJobCapaUnitModel,
} from "../../../stores/eduProcessCreation/jobEduMng/jobEduMng.type";
import { EduCourseDetailReqDTO } from "../../../stores/eduProcessCreation/eduCourse/eduProcess.type";
import {
  getListVerifyChildCoreJob,
  saveListVerifyChildCoreJob,
} from "../../../stores/eduProcessCreation/jobEduMng/jobEduMng.service";
import { VERSION_V1 } from "@/constants/common.const";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const version = window.history.state.version == VERSION_V1;

    return { router, storeCommon, t, id, version };
  },
  data() {
    return {
      listCoreJobSelc: [] as Array<JobEduVerifyChildCoreJobListModel>,
      eduCourseDetailReqDTO: {} as EduCourseDetailReqDTO,
      isDisabled: true,
    };
  },
  beforeMount() {
    this.eduCourseDetailReqDTO.eduCourseSeq = this.id;

    this.getListCoreJobSelc();
  },
  methods: {
    getListCoreJobSelc() {
      this.storeCommon.setLoading(true);
      getListVerifyChildCoreJob(this.eduCourseDetailReqDTO).then((res) => {
        this.listCoreJobSelc = res.data.data.map(
          (job: JobEduVerifyChildCoreJobListModel) => {
            job.listNcsKcs = job.listNcsKcs.map(
              (ncsKcs: JobEduVerifyChildNcsKcsModel) => {
                ncsKcs.listJobAbility = ncsKcs.listJobAbility.map(
                  (ability: JobEduVerifyCmmnJobAbilityModel) => {
                    ability.rowSpan = this.calculateJobAbilityRowSpan(ability);
                    ability.listJobCapaUnit = ability.listJobCapaUnit.map(
                      (capaUnit: JobEduVerifyJobCapaUnitModel) => {
                        if (capaUnit.isCheck) {
                          this.isDisabled = false;
                        }
                        capaUnit.rowSpan =
                          this.calculateCapaUnitRowSpan(capaUnit);
                        return capaUnit;
                      }
                    );
                    return ability;
                  }
                );
                ncsKcs.rowSpan = this.calculateNcsKcsRowSpan(ncsKcs);
                return ncsKcs;
              }
            );
            return job;
          }
        );
        this.storeCommon.setLoading(false);
      });
    },
    calculateNcsKcsRowSpan(ncsKcs: JobEduVerifyChildNcsKcsModel): number {
      let sum = 0;
      ncsKcs.listJobAbility.forEach((jobAbility) => {
        jobAbility.listJobCapaUnit.forEach((capaUnit) => {
          sum += capaUnit.listJobCapaUnitPerform.length + 1;
        });
        sum += 2;
      });
      return sum;
    },
    calculateJobAbilityRowSpan(
      ability: JobEduVerifyCmmnJobAbilityModel
    ): number {
      return (
        ability.listJobCapaUnit.reduce((sum, capaUnit) => {
          return sum + capaUnit.listJobCapaUnitPerform.length + 1;
        }, 0) + 1
      );
    },
    calculateCapaUnitRowSpan(capaUnit: JobEduVerifyJobCapaUnitModel): number {
      return capaUnit.listJobCapaUnitPerform.length + 1;
    },
    handleChangeCheckboxJobCapaUnit(item: JobEduVerifyJobCapaUnitModel) {
      if (!item.isCheck) {
        item.listJobCapaUnitPerform.forEach((capaUnitPerform) => {
          capaUnitPerform.isCheck = false;
          capaUnitPerform.unuseRsn = "";
        });
      }
    },
    confirmSave() {
      let isValid = true;

      this.listCoreJobSelc.forEach((coreJob) => {
        let countChild = 0;
        let countPerform = 0;

        coreJob.listNcsKcs.forEach((ncsKcs) => {
          ncsKcs.listJobAbility.forEach((jobAbility) => {
            jobAbility.listJobCapaUnit.forEach((jobCapaUnit) => {
              if (jobCapaUnit.isCheck) {
                countChild++;
              }
              jobCapaUnit.listJobCapaUnitPerform.forEach((capaUnitPerform) => {
                if (capaUnitPerform.isCheck) {
                  countPerform++;
                }
              });
            });
          });
        });

        if (countChild === 0 || countPerform === 0) {
          this.$alert(
            this.t("eduProcessCreation.jobEduMng.messageValidateChildAbility")
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
      saveListVerifyChildCoreJob(this.listCoreJobSelc).then((res) => {
        this.storeCommon.setLoading(false);
        this.$confirm(
          this.t("common.messageSuccessNextTab"),
          "",
          (isConfirm: Boolean) => {
            if (isConfirm) {
              this.next();
            } else {
              if (this.isDisabled) {
                this.$emit("updateStage", 51);
              }
            }
            this.isDisabled = false;
          }
        );
      });
    },
    next() {
      this.$emit("nextTab", 51);
    },
    back() {
      this.router.push({
        name: SCREEN.eduProcessCreation.name,
      });
    },
  },
});
</script>
<style>
.check_row > label {
  min-height: 20px;
}
</style>
