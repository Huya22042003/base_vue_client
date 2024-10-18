<template>
  <div class="box_section mt-5">
    <div class="tbl_col tbl">
      <table>
        <thead>
          <tr>
            <th scope="row" class="ta_c" :colspan="1" :rowspan="2">
              <!-- 교과목 -->{{ t("eduProcessCreation.roadmapMng.title5") }}
            </th>
            <th scope="row" class="ta_c" :colspan="dataYear.length">
              <!-- 학년-학기 -->{{ t("eduProcessCreation.roadmapMng.title6") }}
            </th>
            <th scope="row" class="ta_c" :colspan="1" :rowspan="2" v-for="item in dataCurriculum">
              {{ item.cdNm }}
            </th>
          </tr>
          <tr>
            <th scope="row" class="ta_c" :colspan="1" v-for="year in dataYear">{{ year.cdNm }}</th>
          </tr>
          <!-- Semester 1 -->
        </thead>
        <tbody>
          <tr v-for="overview in dataOverview">
            <td scope="row" class="ta_c" :colspan="1">{{ overview.sbjtNm }}</td>
            <td scope="row" class="ta_c" :colspan="1" v-for="year in dataYear">{{ `${overview.termCd} - ${overview.gradeCd}` == year.cdId ? '●' : '' }}</td>
            <td scope="row" class="ta_c" :colspan="1" v-for="item in dataCurriculum">
              {{ 
                overview.select.some(sel => sel.selCd == item.cdId) ? '●' : ''
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btn_group btn_end mg_t30">
      <div class="btn_group btn_end">
        <button type="button" class="btn_md btn_round btn_gray">
          {{ t("common.print") }}
        </button>
        <button type="button" class="btn_md btn_round btn_primary" @click="next()">
          {{ t("common.next") }}
        </button>
        <button type="button" class="btn_md btn_round btn_white" @click="back()">
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
import { getOverviewRoadMap } from "@/stores/eduProcessCreation/roadmapMng/roadmapMng.service";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { UP_CD_ID_GENDER, UP_CD_ID_GRADE_LEVEL, UP_CD_ID_SEMESTER } from "@/constants/common.const";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";
import { OverviewSubjectDTO } from "@/stores/eduProcessCreation/roadmapMng/roadmapMng.type";

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
      dataYear: [] as CodeMngModel[],
      dataCurriculum: [] as CodeMngModel[],
      dataOverview: [] as OverviewSubjectDTO[],
    }
  },
  beforeMount() { 
    this.getAllData();
  },
  methods: {
    async getAllData() {
      this.storeCommon.setLoading(true);
      await getListCodeMng({upCdIdList: [UP_CD_ID_SEMESTER, UP_CD_ID_GRADE_LEVEL]}).then((res) => {
        const listSemester = res.data.data.filter((item:CodeMngModel) => item.upCdId == UP_CD_ID_SEMESTER);
        const listGrade = res.data.data.filter((item:CodeMngModel) => item.upCdId == UP_CD_ID_GRADE_LEVEL);

        listSemester.forEach((semester:CodeMngModel) => {
          listGrade.forEach((grade:CodeMngModel) => {
            this.dataYear.push({cdId: `${semester.cdId} - ${grade.cdId}`, cdNm: `${semester.cdNm} - ${grade.cdNm}`, upCdId: `semester - grade`});
          })
        });
        this.dataYear.sort((a, b) => {
            return `${a.cdId}`.localeCompare(`${b.cdId}`);
        });
      })

      await getOverviewRoadMap({eduCourseSeq: this.id}).then((res) => {
        this.dataCurriculum = res.data.data.listCurriculum
        this.dataOverview = res.data.data.listOverview
      }).finally(() => {
        this.storeCommon.setLoading(false);
      })
    },
    next() {
      this.$emit("tabChange7", 72);
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
@import url("../eduCourseCustom.css");
</style>
