<template>
  <div class="box_section mt-5">
    <div class="box_section mt-13">
      <div class="tbl_col tbl">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 80%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 평가일 -->{{
                  t("eduProcessCreation.typeTalentEdu.title45")
                }}
              </th>
              <td scope="row" :colspan="1" class="ta_l">
                <div class="wd_300">
                  <BaseDatePicker
                    id="evalDate"
                    v-model="data.evalDate"
                    :isRequired="true"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 평가 참여자 수 -->{{
                  t("eduProcessCreation.typeTalentEdu.title46")
                }}
              </th>
              <td scope="row" :colspan="1" class="ta_l">
                <InputBase
                  :isNumber="true"
                  id="evalPartiCnt"
                  required
                  v-model:model-value="data.evalPartiCnt"
                  placeholder="숫자만 입력할 수 있습니다."
                />
              </td>
            </tr>
            <tr>
              <th scope="row" :colspan="1">
                <!-- 직무 분야 -->{{
                  t("eduProcessCreation.typeTalentEdu.title47")
                }}
              </th>
              <td scope="row" :colspan="1" class="ta_l">
                <InputBase
                  id="jobField"
                  required
                  v-model:model-value="data.jobField"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="box_section mt-13">
      <div class="tbl tbl_col">
        <table>
          <colgroup>
            <col style="width: 20%" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: auto" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 20%" v-if="data.eduCourseType && !data.eduCourseType.includes(EDU_TYPE_OTHER)"/>
          </colgroup>
          <thead>
            <tr>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 인재양성유형(명) -->{{
                  t("eduProcessCreation.typeTalentEdu.title48")
                }}<br /><!-- 직업(군) -->{{
                  t("eduProcessCreation.typeTalentEdu.title49")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 직무중요도 -->{{
                  t("eduProcessCreation.typeTalentEdu.title50")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 직업전망 -->{{
                  t("eduProcessCreation.typeTalentEdu.title51")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 취업성과 -->{{
                  t("eduProcessCreation.typeTalentEdu.title52")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 학과비전 -->{{
                  t("eduProcessCreation.typeTalentEdu.title53")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 교육효과성 -->{{
                  t("eduProcessCreation.typeTalentEdu.title54")
                }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 평균 -->{{ t("eduProcessCreation.typeTalentEdu.title55") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1">
                <!-- 결과 -->{{ t("eduProcessCreation.typeTalentEdu.title56") }}
              </th>
              <th scope="row" class="ta_c" :colspan="1" v-if="data.eduCourseType && !data.eduCourseType.includes(EDU_TYPE_OTHER)">
                <!-- 전공 선택 -->{{
                  t("eduProcessCreation.typeTalentEdu.title57")
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data.taltNrtgSel">
              <td scope="row" :colspan="1">
                <CheckboxBase
                  :mode="'show'"
                  :value="`check_${index}`"
                  :id="`check_${index}`"
                  :name="`check_${index}`"
                  :key="`check_${index}`"
                  :label="item.typeNm"
                  v-model:model-value="item.check"
                >
                </CheckboxBase>
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :isNumber="true"
                  :disabled="!item.check"
                  :max-value="5"
                  :min-value="0"
                  :id="`jobImpt_${index}`"
                  required
                  v-model="item.jobImpt"
                />
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :isNumber="true"
                  :disabled="!item.check"
                  :max-value="5"
                  :min-value="0"
                  :id="`jobOl_${index}`"
                  required
                  v-model="item.jobOl"
                />
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :isNumber="true"
                  :disabled="!item.check"
                  :max-value="5"
                  :min-value="0"
                  :id="`employFruitage_${index}`"
                  required
                  v-model="item.employFruitage"
                />
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :isNumber="true"
                  :disabled="!item.check"
                  :max-value="5"
                  :min-value="0"
                  :id="`deptVisn_${index}`"
                  required
                  v-model="item.deptVisn"
                />
              </td>
              <td scope="row" :colspan="1">
                <InputBase
                  :isNumber="true"
                  :disabled="!item.check"
                  :max-value="5"
                  :min-value="0"
                  :id="`eduEfft_${index}`"
                  required
                  v-model="item.eduEfft"
                />
              </td>
              <td scope="row" :colspan="1">{{ getAvgScore(item) }}</td>
              <td
                scope="row"
                :colspan="1"
                :class="getAvgScore(item) < 3.5 ? 'font_red' : 'font_green'"
              >
                {{
                  getAvgScore(item) < 3.5
                    ? t("eduProcessCreation.noUse")
                    : t("eduProcessCreation.use")
                }}
              </td>
              <td scope="row" :colspan="1" v-if="data.eduCourseType && !data.eduCourseType.includes(EDU_TYPE_OTHER)">
                <SelectBoxBase
                  :id="`major_${index}`"
                  :name="`major_${index}`"
                  :disabled="!item.check"
                  :data="listMajorCd"
                  v-model="item.majCd"
                >
                </SelectBoxBase>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="btn_group btn_end mg_t20">
      <div class="btn_group btn_end">
        <button
          v-if="version && isSave"
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
import {
  getTaltNrtgSel,
  saveTaltNrtgSel,
} from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.service";
import { TaltNrtgResDTO } from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import {
  UP_CD_MAJOR,
  CD_SELCT_TALT_NO,
  CD_SELCT_TALT_YES,
  EDU_TYPE_OTHER,
  VERSION_V1
} from "@/constants/common.const";
import { TaltNrtgSelResDTO } from "@/stores/eduProcessCreation/typeTalentEdu/typeTalentEdu.type";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;
    const version = window.history.state.version == VERSION_V1;
    const isSave = window.history.state.isSave;

    return { router, storeCommon, t, id, EDU_TYPE_OTHER, version, isSave };
  },
  beforeMount() {
    this.goToDetail();
  },
  data() {
    return {
      listMajorCd: [] as Array<any>,
      data: {} as TaltNrtgResDTO,
      isDisabled: true,
    };
  },
  methods: {
    async goToDetail() {
      this.storeCommon.setLoading(true);
      await getListCodeMng({ upCdIdList: [UP_CD_MAJOR] }).then((res: any) => {
        this.listMajorCd = res.data.data;
        this.listMajorCd.unshift({
          id: 0,
          cdId: "",
          cdNm: this.t("common.all"),
        });
      });
      await getTaltNrtgSel({ eduCourseSeq: this.id })
        .then((res: any) => {
          this.data = res.data.data as TaltNrtgResDTO;

          if (this.data.taltNrtgSeq) {
            this.isDisabled = false;
          }
          this.data.taltNrtgSel = this.data.taltNrtgSel.map(
            (item: TaltNrtgSelResDTO) => {
              if (item.taltNrtgSelcSeq) {
                item.check = true;
              }
              return item;
            }
          );
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },
    getAvgScore(data: TaltNrtgSelResDTO) {
      const avgScore =
        (parseFloat(data.jobImpt) +
          parseFloat(data.jobOl) +
          parseFloat(data.employFruitage) +
          parseFloat(data.deptVisn) +
          parseFloat(data.eduEfft)) /
        5;
      return parseFloat(avgScore ? avgScore.toFixed(3) : "0");
    },
    getSelCdScore(avgScore: number) {
      return avgScore < 3.5 ? CD_SELCT_TALT_NO : CD_SELCT_TALT_YES;
    },
    save() {
      if (this.storeCommon.check) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }

      if (!this.data.eduCourseType.includes(EDU_TYPE_OTHER) && !this.validateTaltNrtgSel()) {
        this.$alert("하나 이상의 인재양성유형이 선정되어야 합니다");
        return;
      }

      if (!this.data.eduCourseType.includes(EDU_TYPE_OTHER) && !this.validateTaltNrtgSelMajor()) {
        this.$alert(this.t("common.messageValidateRequired"));
        return;
      }

      this.$confirm(this.t("common.message.save"), "", (isConfirm: Boolean) => {
        if (isConfirm) {
          this.storeCommon.setLoading(true);

          saveTaltNrtgSel(this.getValueForm())
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
                  }
                  this.$emit("updateStage", 34);
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
    validateTaltNrtgSel() {
      const dataSelect = this.data.taltNrtgSel.filter(
        (item: TaltNrtgSelResDTO) => item.check
      );

      if (dataSelect.length == 0) {
        return false;
      }

      for (let index = 0; index < dataSelect.length; index++) {
        const element = dataSelect[index] as TaltNrtgSelResDTO;

        if (!element.majCd) {
          return false;
        }
      }

      return true;
    },
    validateTaltNrtgSelMajor() {
      const dataSelect = this.data.taltNrtgSel.filter(
        (item: TaltNrtgSelResDTO) => item.check
      );

      if (dataSelect.length != 0) {
        for (let index = 0; index < dataSelect.length; index++) {
          const element = dataSelect[index] as TaltNrtgSelResDTO;

          if (!element.majCd) {
            return false;
          }
        }
      }

      return true;
    },
    getValueForm() {
      let dataResult = {...this.data}
      dataResult.taltNrtgSel = dataResult.taltNrtgSel
        .filter((item: TaltNrtgSelResDTO) => item.check)
        .map((item: TaltNrtgSelResDTO) => {
          item.selCd = this.getSelCdScore(this.getAvgScore(item));
          return item;
        });

        return dataResult;
    },
    next() {
      this.$emit("tabChange3", 34);
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
