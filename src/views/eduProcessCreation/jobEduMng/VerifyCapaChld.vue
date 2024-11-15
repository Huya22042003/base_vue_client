<template>
  <div class="box_section mt-5">
    <div
      class="box_section mt-13"
      v-for="coreJobSelc in listCoreJobSelc"
      :key="coreJobSelc.coreJobSelcSeq"
    >
      <p class="box_title_sm">{{ coreJobSelc.jobNm }}</p>
      <div class="tbl tbl_col tbl_border_vertify_capa_chld">
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
            >
              <template
                v-for="(jobAbility, indexJobAbility) in ncsKcs.listJobAbility"
                :key="jobAbility.jobAbilSeq"
              >
                <template
                  v-for="(
                    jobCapaUnit, indexJobCapaUnit
                  ) in jobAbility.listJobCapaUnit"
                  :key="jobCapaUnit.jobCapaUnitSeq"
                >
                  <template
                    v-for="(
                      capaUnitPerform, indexCapaUnitPerform
                    ) in jobCapaUnit.listJobCapaUnitPerform"
                    :key="capaUnitPerform.capaUnitPerformStnrdSeq"
                  >
                    <tr>
                      <td
                        v-if="
                          indexJobAbility === 0 &&
                          indexJobCapaUnit === 0 &&
                          indexCapaUnitPerform === 0
                        "
                        :rowspan="ncsKcs.rowSpan"
                      >
                        {{ ncsKcs.code }}
                      </td>
                      <td
                        :rowspan="jobAbility.rowSpan"
                        v-if="
                          indexJobCapaUnit === 0 && indexCapaUnitPerform === 0
                        "
                      >
                        {{
                          jobAbility.jobAbilNm +
                          " (" +
                          jobAbility.jobAbilCd +
                          ")"
                        }}
                      </td>
                      <td
                        :rowspan="jobCapaUnit.rowSpan"
                        v-if="indexCapaUnitPerform === 0"
                      >
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
                          :is-disable="true"
                          :label="jobCapaUnit.capaUnitNm"
                        >
                        </CheckboxBase>
                      </td>
                      <td>{{ capaUnitPerform.cont }}</td>
                      <td>
                        <CheckboxBase
                          :mode="'show'"
                          v-model="capaUnitPerform.isCheck"
                          :id="
                            'capaUnitPerform' +
                            coreJobSelc.coreJobSelcSeq +
                            jobAbility.jobAbilSeq +
                            jobCapaUnit.jobCapaUnitSeq +
                            capaUnitPerform.capaUnitPerformStnrdSeq
                          "
                          @change="handleChangeCheckboxJobCapaUnit(jobCapaUnit)"
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
                          v-if="!capaUnitPerform.isCheck"
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
        <button type="button" class="btn_round btn_lg btn_gray" @click="print()">
          <!-- 4.직무 정의 및 직무모형 설정 인쇄 -->{{
            t("eduProcessCreation.jobEduMng.title26")
          }}
        </button>
        <!-- <button
          v-if="version && isSave"
          type="button"
          class="btn_round btn_lg btn_primary"
          @click="confirmSave"
        >
          {{ t("common.save") }}
        </button> -->
        <ButtonBase
          v-if="version && isSave"
          type="button"
          class="btn_round btn_lg btn_primary"
          :buttonName="t('common.save')"
          @click="confirmSave"
        ></ButtonBase>
        <button
          type="button"
          class="btn_round btn_lg btn_primary"
          @click="next()"
          :disabled="isDisabled"
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
</template>

<script lang="ts">
import { commonStore } from "../../../stores/common";
import { SCREEN } from "../../../router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import {
  JobEduCoreJobSelcListModel,
  JobEduVerifyChildCoreJobListModel,
  JobEduVerifyChildNcsKcsModel,
  JobEduVerifyCmmnJobAbilityModel,
  JobEduVerifyCoreJobListModel,
  JobEduVerifyJobCapaUnitModel,
  JobEduVerifyJobCapaUnitPerformModel,
} from "../../../stores/eduProcessCreation/jobEduMng/jobEduMng.type";
import { EduCourseDetailReqDTO } from "../../../stores/eduProcessCreation/eduCourse/eduProcess.type";
import {
  getJobEduCoreJobSelcList,
  getListVerifyChildCoreJob,
  getListVerifyJobAbility,
  saveListVerifyChildCoreJob,
} from "../../../stores/eduProcessCreation/jobEduMng/jobEduMng.service";
import { VERSION_V1 } from "@/constants/common.const";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";

export default defineComponent({
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
      listCoreJobSelc: [] as Array<JobEduVerifyChildCoreJobListModel>,
      eduCourseDetailReqDTO: {} as EduCourseDetailReqDTO,
      isDisabled: true,
      nameFormRp: "07_04_job_edu",
      datasetListRp: {} as any,
      paramListRp: {} as any,
      listCodeResponse: [] as CodeMngModel[],
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
          sum += capaUnit.listJobCapaUnitPerform.length;
        });
      });
      return sum;
    },
    calculateJobAbilityRowSpan(
      ability: JobEduVerifyCmmnJobAbilityModel
    ): number {
      return ability.listJobCapaUnit.reduce((sum, capaUnit) => {
        return sum + capaUnit.listJobCapaUnitPerform.length;
      }, 0);
    },
    calculateCapaUnitRowSpan(capaUnit: JobEduVerifyJobCapaUnitModel): number {
      return capaUnit.listJobCapaUnitPerform.length;
    },
    handleChangeCheckboxJobCapaUnit(item: JobEduVerifyJobCapaUnitModel) {
      item.isCheck = item.listJobCapaUnitPerform.some(
        (perform) => perform.isCheck
      );
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

        const message = this.isDisabled
          ? this.t("common.message.save")
          : this.t("eduProcessCreation.jobEduMng.messageConfirmSave");
        this.$confirm(message, "", (isConfirm: Boolean) => {
          if (isConfirm) {
            this.saveData();
          }
        });
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
            }
            this.$emit("updateStage", 51);
            this.isDisabled = false;
          }
        );
      });
    },
    next() {
      this.$emit("nextTab", 50);
    },
    back() {
      this.router.push({
        path: SCREEN.eduProcessCreation.path,
      });
    },

    async getTechniqueEdu() {
      await getJobEduCoreJobSelcList({
        eduCourseSeq: this.id,
      }).then((res) => {
        const response = res.data.data as JobEduCoreJobSelcListModel[];
        this.datasetListRp.techniqueEdu = response.map((item) => {
          return {
            typeNm: item.typeNm,
            jobNm: item.jobNm,
            defn: item.defn,
          };
        });
      });
    },
    async getVerifyJob() {
      await getListVerifyJobAbility({
        eduCourseSeq: this.id,
      }).then((res) => {
        const response = res.data.data as JobEduVerifyCoreJobListModel[];
        this.datasetListRp.verifyJob = [];
        response.forEach((job) => {
          job.listNcsKcs.forEach((item) => {
            item.listVerifyJobAbility.forEach((jobAbili) => {
              if (jobAbili.isCheck) {
                this.datasetListRp.verifyJob.push({
                  jobNm: job.jobNm,
                  jobAbilCd: jobAbili.jobAbilCd,
                  jobAbilNm: jobAbili.jobAbilNm,
                  eduNeed: jobAbili.eduNeed,
                  jobImpt: jobAbili.jobImpt,
                  average: this.getAvgScore([
                    jobAbili.eduNeed.toString(),
                    jobAbili.jobImpt.toString(),
                  ]),
                  useYn: jobAbili.useYn,
                });
              }
            });
          });
        });
      });
    },
    async getVerifyCapaChld() {
      getListVerifyChildCoreJob({ eduCourseSeq: this.id }).then((res) => {
        const response = res.data.data as JobEduVerifyChildCoreJobListModel[];

        this.datasetListRp.verifyJob2 = [];
        this.datasetListRp.verifyCapaChld = [];

        response.forEach((job) => {
          job.listNcsKcs.forEach((ncs) => {
            ncs.listJobAbility.forEach((jobAbi) => {
              jobAbi.listJobCapaUnit.forEach((jobCapa) => {
                if (jobCapa.isCheck) {
                  jobCapa.listJobCapaUnitPerform.forEach((perform) => {
                    this.datasetListRp.verifyJob2.push({
                      jobNm: job.jobNm,
                      jobAbiNm: jobAbi.jobAbilNm,
                      jobCapaNm: jobCapa.capaUnitNm,
                      performNm: perform.cont,
                      isUse: perform.isCheck ? "Y" : "N",
                      notUseCont: perform.unuseRsn ? perform.unuseRsn : "",
                    });

                    if (perform.isCheck) {
                      this.datasetListRp.verifyCapaChld.push({
                        jobNm: job.jobNm,
                        jobAbiNm: jobAbi.jobAbilNm,
                        jobCapaNm: jobCapa.capaUnitNm,
                        performNm: perform.cont,
                      });
                    }
                  });
                }
              });
            });
          });
        });
      });
    },
    async cloneData() {
      await this.getTechniqueEdu();
      await this.getVerifyJob();
      await this.getVerifyCapaChld();
    },
    getAvgScore(scores: string[]) {
      const sum = scores.reduce((acc, score) => acc + parseFloat(score), 0);
      const avgScore = sum / scores.length;
      return parseFloat(avgScore ? avgScore.toFixed(3) : "0");
    },
    convertData() {
      this.datasetListRp.techniqueEdu = JSON.stringify(
        this.datasetListRp.techniqueEdu
      );
      this.datasetListRp.verifyJob = JSON.stringify(
        this.datasetListRp.verifyJob
      );
      this.datasetListRp.verifyJob2 = JSON.stringify(
        this.datasetListRp.verifyJob2
      );
      this.datasetListRp.verifyCapaChld = JSON.stringify(
        this.datasetListRp.verifyCapaChld
      );
    },
    async print() {
      this.storeCommon.setLoading(true);

      await this.cloneData();

      await this.convertData();

      await this.storeCommon.fn_viewer_open(
        this.nameFormRp,
        this.datasetListRp,
        this.paramListRp
      );
      this.storeCommon.setLoading(false);
    },
  },
});
</script>
<style>
.check_row > label {
  min-height: 20px !important;
}
</style>
<style scoped>
@import url("../eduCourseCustom.css");
</style>
