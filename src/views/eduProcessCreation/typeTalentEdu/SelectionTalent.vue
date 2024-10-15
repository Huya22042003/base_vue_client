<template>
  <div class="box_section mt-5">
    <div class="box_section mt-13">
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: 5%" />
            <col style="width: 8%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 인재양성유형 -->{{
                  t("eduProcessCreation.typeTalentEdu.title32")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 직무 -->{{ t("eduProcessCreation.typeTalentEdu.title33") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 비전 -->{{ t("eduProcessCreation.typeTalentEdu.title34") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 중요도 -->{{
                  t("eduProcessCreation.typeTalentEdu.title35")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 가능성 -->{{
                  t("eduProcessCreation.typeTalentEdu.title36")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 공간 면적 및 -->{{
                  t("eduProcessCreation.typeTalentEdu.title37")
                }}<br /><!-- 시설 적합성 -->{{
                  t("eduProcessCreation.typeTalentEdu.title38")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 기자재 구비 -->{{
                  t("eduProcessCreation.typeTalentEdu.title39")
                }}<br /><!-- 및 활 적합성 -->{{
                  t("eduProcessCreation.typeTalentEdu.title40")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 재학생 -->{{ t("eduProcessCreation.typeTalentEdu.title41")
                }}<br /><!-- 선호도 -->{{
                  t("eduProcessCreation.typeTalentEdu.title42")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 합계 -->{{ t("eduProcessCreation.typeTalentEdu.title43") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 판정 -->{{ t("eduProcessCreation.typeTalentEdu.title44") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in dataRes" :key="item.taltNrtgSeq">
              <template
                v-for="(job, indexJob) in item.listJob"
                :key="job.jobSeq"
              >
                <tr>
                  <td
                    scope="row"
                    :colspan="1"
                    v-if="indexJob == 0"
                    :rowspan="item.listJob.length"
                  >
                    {{ item.taltNrtNm }}
                  </td>
                  <td scope="row" :colspan="1">
                    <CheckboxBase
                      :mode="'show'"
                      :value="`check_${job.jobSeq}`"
                      :id="`check_${job.jobSeq}`"
                      :name="`check_${job.jobSeq}`"
                      :key="`check_${job.jobSeq}`"
                      :label="job.jobNm"
                      v-model:model-value="job.check"
                    >
                    </CheckboxBase>
                  </td>
                  <td scope="row" :colspan="1">
                    <InputBase
                      :isNumber="true"
                      :disabled="!job.check"
                      :max-value="20"
                      :min-value="0"
                      :id="`visn_${job.jobSeq}`"
                      required
                      v-model="job.visn"
                    />
                  </td>
                  <td scope="row" :colspan="1">
                    <InputBase
                      :isNumber="true"
                      :disabled="!job.check"
                      :max-value="10"
                      :min-value="0"
                      :id="`impt_${job.jobSeq}`"
                      required
                      v-model="job.impt"
                    />
                  </td>
                  <td scope="row" :colspan="1">
                    <InputBase
                      :isNumber="true"
                      :disabled="!job.check"
                      :max-value="10"
                      :min-value="0"
                      :id="`psbl_${job.jobSeq}`"
                      required
                      v-model="job.psbl"
                    />
                  </td>
                  <td scope="row" :colspan="1">
                    <InputBase
                      :isNumber="true"
                      :disabled="!job.check"
                      :max-value="15"
                      :min-value="0"
                      :id="`factSutb_${job.jobSeq}`"
                      required
                      v-model="job.factSutb"
                    />
                  </td>
                  <td scope="row" :colspan="1">
                    <InputBase
                      :isNumber="true"
                      :disabled="!job.check"
                      :max-value="15"
                      :min-value="0"
                      :id="`matlSutb_${job.jobSeq}`"
                      required
                      v-model="job.matlSutb"
                    />
                  </td>
                  <td scope="row" :colspan="1">
                    <InputBase
                      :isNumber="true"
                      :disabled="!job.check"
                      :max-value="30"
                      :min-value="0"
                      :id="`prfr_${job.jobSeq}`"
                      required
                      v-model="job.prfr"
                    />
                  </td>
                  <td scope="row" :colspan="1">{{ getSumScore(job) }}</td>
                  <td
                    scope="row"
                    :colspan="1"
                    :class="getSumScore(job) < 70 ? 'font_red' : 'font_green'"
                  >
                    {{
                      getSumScore(job) < 70
                        ? t("eduProcessCreation.noUse")
                        : t("eduProcessCreation.use")
                    }}
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div class="btn_group btn_end mg_t20">
      <div class="btn_group btn_end">
        <button
          type="button"
          class="btn_round btn_md btn_primary"
          @click="save()"
        >
          {{ t("common.save") }}
        </button>
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
import { CoreJobSelDTO } from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";
import {
  getCoreJobSel,
  saveCoreJobSel,
} from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.service";
import { CD_SELCT_TALT_NO, CD_SELCT_TALT_YES } from "@/constants/common.const";

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
      data: [] as CoreJobSelDTO[],
      dataRes: [] as any[],
      isDisabled: true,
    };
  },
  beforeMount() {
    this.goToDetail();
  },
  methods: {
    goToDetail() {
      this.storeCommon.setLoading(true);
      const dataFilter = {
        eduCourseSeq: this.id,
      };
      getCoreJobSel(dataFilter)
        .then((res: any) => {
          this.data = res.data.data.map((item: any) => {
            if (item.coreJobSelcSeq) {
              item.check = true;
              this.isDisabled = false;
            } else {
              item.check = false;
            }
            return item;
          }) as CoreJobSelDTO[];
          this.convertDataRes();
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    getSumScore(data: CoreJobSelDTO) {
      const sumScore =
        parseFloat(data.visn) +
        parseFloat(data.impt) +
        parseFloat(data.psbl) +
        parseFloat(data.factSutb) +
        parseFloat(data.matlSutb) +
        parseFloat(data.prfr);
      return parseFloat(sumScore ? sumScore.toFixed(3) : "0");
    },
    convertDataRes() {
      const setTalt: Set<string> = new Set<string>();
      this.dataRes = [] as any[];

      this.data.forEach((item: CoreJobSelDTO) => {
        setTalt.add(item.taltNrtgTypeSeq);
      });

      setTalt.forEach((item: string) => {
        const listJob = this.data.filter(
          (data: CoreJobSelDTO) => data.taltNrtgTypeSeq == item
        );
        this.dataRes.push({
          taltNrtgSeq: item,
          taltNrtNm: listJob[0].typeNm,
          listJob: listJob,
        });
      });
    },
    save() {
      if (this.storeCommon.check) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }

      if (!this.validate()) {
        this.$alert("하나 이상의 인재양성유형이 선정되어야 합니다");
        return;
      }

      this.$confirm(this.t("common.message.save"), "", (isConfirm: Boolean) => {
        if (isConfirm) {
          this.storeCommon.setLoading(true);
          let dataSave = [] as any[];
          this.dataRes.forEach((item: any) => {
            item.listJob.forEach((job: any) => {
              if (job.check) {
                job.eduCurseSeq = this.id;
                job.selcCd =
                  this.getSumScore(job) < 70
                    ? CD_SELCT_TALT_NO
                    : CD_SELCT_TALT_YES;
                dataSave.push(job);
              }
            });
          });

          saveCoreJobSel(dataSave)
            .then((res: any) => {
              if (res.data.data) {
                this.goToDetail();
              }

              this.$confirm(
                this.t("common.messageSuccessNextTab"),
                "",
                (isConfirm: Boolean) => {
                  if (isConfirm) {
                    this.next();
                  } else {
                    if (this.isDisabled) {
                      this.$emit("updateStage", 35);
                    }
                  }
                  this.isDisabled = false;
                }
              );
            })
            .finally(() => {
              this.storeCommon.setLoading(false);
            });
        }
      });
    },
    validate() {
      let checkIndex = 0;
      this.dataRes.forEach((item: any) => {
        item.listJob.forEach((job: any) => {
          if (job.check) {
            checkIndex += 1;
          }
        });
      });

      return checkIndex != 0;
    },
    next() {
      this.$emit("tabChange3", 35);
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
.font_green {
  color: #026700;
}
</style>
