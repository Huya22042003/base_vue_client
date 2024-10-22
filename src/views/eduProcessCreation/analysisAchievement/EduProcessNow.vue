<template>
  <div class="box_section mt-5">
    <div class="box_section">
      <h3 class="box_title_sm">
        <!-- 현 교육과정표 -->{{
          t("eduProcessCreation.analysisAchievement.title3")
        }}
      </h3>
      <p class="box_title">
        <!-- 운영기간 : -->{{
          t("eduProcessCreation.analysisAchievement.title6")
        }}
        {{
          analysisAchievementModel && analysisAchievementModel.startDate
            ? analysisAchievementModel.startDate +
              " - " +
              analysisAchievementModel.endDate
            : ""
        }}
      </p>
      <div class="tbl_col tbl">
        <table>
          <tbody>
            <tr>
              <th scope="row" class="ta_c td_custom_color" :colspan="7">
                {{ analysisAchievementModel && analysisAchievementModel.year
                }}{{ t("eduProcessCreation.analysisAchievement.title4") }}
              </th>
            </tr>
            <tr>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                <!-- 학과명 -->{{
                  t("eduProcessCreation.analysisAchievement.title5")
                }}
              </th>
              <td scope="row" :colspan="6" class="deptnm-style-custom">
                {{
                  analysisAchievementModel && analysisAchievementModel.deptNm
                }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                <!-- 학기 -->{{
                  t("eduProcessCreation.analysisAchievement.title7")
                }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                <!-- 교과목명 -->{{
                  t("eduProcessCreation.analysisAchievement.title8")
                }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                <!-- 학점 -->{{
                  t("eduProcessCreation.analysisAchievement.title9")
                }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                <!-- 이론 -->{{
                  t("eduProcessCreation.analysisAchievement.title10")
                }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                <!-- 실습 -->{{
                  t("eduProcessCreation.analysisAchievement.title11")
                }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                <!-- KCS -->{{
                  t("eduProcessCreation.analysisAchievement.title12")
                }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                <!-- NCS -->{{
                  t("eduProcessCreation.analysisAchievement.title13")
                }}
              </th>
            </tr>
            <template
              v-if="analysisAchievementModel"
              v-for="(analysis, index) in analysisAchievementModel.listTerm"
              :key="analysis.gradeCd + analysis.termCd"
            >
              <tr>
                <td
                  scope="row"
                  class="ta_c"
                  :rowspan="analysis.listSbjt.length + 1"
                >
                  {{ analysis.gradeNm + "-" + analysis.termNm }}
                </td>
              </tr>
              <template
                v-for="sbjt in analysis.listSbjt"
                :key="sbjt.sbjtCandSeq"
                ><tr>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{ sbjt.sbjtNm }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{ sbjt.acqGpa }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{ sbjt.thryHrs }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{ sbjt.pracHrs }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{ sbjt.kcsYn === statusY ? "●" : "" }}
                  </td>
                  <td scope="row" class="ta_c" :colspan="1">
                    {{ sbjt.ncsYn === statusY ? "●" : "" }}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    class="ta_c td_custom_color"
                    :colspan="1"
                  ></th>
                  <th scope="row" class="ta_c td_custom_color" :colspan="1">
                    {{ t("eduProcessCreation.analysisAchievement.title14") }}
                  </th>
                  <th scope="row" class="ta_c td_custom_color" :colspan="1">
                    {{ termTotals[index].totalAcqGpa }}
                  </th>
                  <th scope="row" class="ta_c td_custom_color" :colspan="1">
                    {{ termTotals[index].totalThryHrs }}
                  </th>
                  <th scope="row" class="ta_c td_custom_color" :colspan="1">
                    {{ termTotals[index].totalPracHrs }}
                  </th>
                  <th scope="row" class="ta_c td_custom_color" :colspan="1">
                    {{ termTotals[index].totalKcsCount }}
                  </th>
                  <th scope="row" class="ta_c td_custom_color" :colspan="1">
                    {{ termTotals[index].totalNcsCount }}
                  </th>
                </tr>
              </template>
            </template>
            <tr>
              <th scope="row" class="ta_c td_custom_color" :colspan="2">
                {{ t("eduProcessCreation.analysisAchievement.title15") }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                {{ overallTotals.totalAcqGpa }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                {{ overallTotals.totalThryHrs }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                {{ overallTotals.totalPracHrs }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                {{ overallTotals.totalKcsCount }}
              </th>
              <th scope="row" class="ta_c td_custom_color" :colspan="1">
                {{ overallTotals.totalNcsCount }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btn_group btn_end mg_t30">
      <div class="btn_group btn_end">
        <button
          type="button"
          class="btn_round btn_md btn_primary"
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
import { getAnalysisAchievement } from "@/stores/eduProcessCreation/analysisAchievement/analysisAchievement.service";
import { AnalysisAchievementModel } from "@/stores/eduProcessCreation/analysisAchievement/analysisAchievement.type";
import { STATUS_YES } from "@/constants/common.const";

export default defineComponent({
  setup: () => {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = window.history.state.id;

    return { router, storeCommon, t, id };
  },
  computed: {
    termTotals() {
      if (
        !this.analysisAchievementModel ||
        !this.analysisAchievementModel.listTerm
      ) {
        return [];
      }
      return this.analysisAchievementModel.listTerm.map((term) => {
        const totalAcqGpa = term.listSbjt.reduce(
          (sum, sbjt) => sum + sbjt.acqGpa,
          0
        );
        const totalThryHrs = term.listSbjt.reduce(
          (sum, sbjt) => sum + sbjt.thryHrs,
          0
        );
        const totalPracHrs = term.listSbjt.reduce(
          (sum, sbjt) => sum + sbjt.pracHrs,
          0
        );
        const totalKcsCount = term.listSbjt.reduce(
          (count, sbjt) => count + (sbjt.kcsYn === this.statusY ? 1 : 0),
          0
        );
        const totalNcsCount = term.listSbjt.reduce(
          (count, sbjt) => count + (sbjt.ncsYn === this.statusY ? 1 : 0),
          0
        );
        return {
          gradeCd: term.gradeCd,
          termCd: term.termCd,
          totalAcqGpa,
          totalThryHrs,
          totalPracHrs,
          totalKcsCount,
          totalNcsCount,
        };
      });
    },
    overallTotals() {
      const totalAcqGpa = this.termTotals.reduce(
        (sum, term) => sum + term.totalAcqGpa,
        0
      );
      const totalThryHrs = this.termTotals.reduce(
        (sum, term) => sum + term.totalThryHrs,
        0
      );
      const totalPracHrs = this.termTotals.reduce(
        (sum, term) => sum + term.totalPracHrs,
        0
      );
      const totalKcsCount = this.termTotals.reduce(
        (count, term) => count + term.totalKcsCount,
        0
      );
      const totalNcsCount = this.termTotals.reduce(
        (count, term) => count + term.totalNcsCount,
        0
      );

      return {
        totalAcqGpa,
        totalThryHrs,
        totalPracHrs,
        totalKcsCount,
        totalNcsCount,
      };
    },
  },
  data() {
    return {
      analysisAchievementModel: {} as AnalysisAchievementModel,
      statusY: STATUS_YES,
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    getData() {
      this.storeCommon.setLoading(true);
      getAnalysisAchievement({ eduCourseSeq: this.id }).then((res) => {
        this.analysisAchievementModel = res.data.data;
        this.storeCommon.setLoading(false);
      });
    },
    next() {
      this.$emit("tabChange1", 12);
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

.deptnm-style-custom {
  text-align: left;
  padding-left: 20px;
}
</style>
