<template>
  <p class="box_title_custom">
    교육과정 로드맵
  </p>
  <div class="box_section mt-5">
    <div class="tbl_row tbl">
      <table v-if="dataView.taltNrtgType">
        <colgroup>
          <col style="width: 150px" />
          <col style="width: 100px" />
          <col style="width: 100px" v-for="index in getRowSpanEduCourse()" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row" class="ta_c" :colspan="2">
              교육과정
            </th>
            <td scope="row" class="ta_c" :colspan="getRowSpanEduCourse()">
              {{ dataView.eduCourseNm }}
            </td>
          </tr>
          <tr>
            <th scope="row" class="ta_c" :colspan="2">인재양성유형</th>
            <template v-for="(talt, index) in dataView.taltNrtgType">
              <td scope="row" class="ta_c" :colspan="talt.job.length">
                {{ talt.name }}
              </td>
            </template>
          </tr>
          <tr>
            <th scope="row" class="ta_c" :colspan="2">핵심직무</th>
            <template v-for="(talt, index) in dataView.taltNrtgType">
              <template v-for="(job, indexJob) in talt.job">
                <td scope="row" class="ta_c">{{ job.name }}</td>
              </template>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="dataView.taltNrtgType" class="tbl_row tbl mt-5" v-for="typeSbjt in listTypeSbjt">
      <table>
        <colgroup>
          <col style="width: 150px" />
          <col style="width: 100px" />
          <col style="width: 100px" v-for="index in getRowSpanEduCourse()" />
        </colgroup>
        <tbody>
          <template v-for="(grade, indexGrade) in listGrade">
            <template v-for="(term, indexTerm) in listTerm">
              <tr>
                <th
                  scope="row"
                  class="ta_c"
                  :colspan="1"
                  :rowspan="listTerm.length * listGrade.length"
                  v-if="indexGrade == 0 && indexTerm == 0"
                >
                  {{ typeSbjt.cdNm }}
                </th>
                <td scope="row" class="ta_c" :colspan="1">
                  {{ grade.cdNm }} - {{ term.cdNm }}
                </td>
                <template v-for="job in getListJobAll()">
                  <td scope="row" class="ta_c" :colspan="1">
                    {{
                      filterSubject(job, typeSbjt.cdId, term.cdId, grade.cdId)
                    }}
                  </td>
                </template>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
    <div class="btn_group btn_end mg_t30">
      <div class="btn_group btn_end">
        <button type="button" class="btn_lg btn_round btn_gray">
          {{ t("common.print") }}
        </button>
        <button
          type="button"
          class="btn_round btn_lg btn_primary"
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
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { getRoadMapEduProcess } from "@/stores/eduProcessCreation/roadmapMng/roadmapMng.service";
import { RoadMapEduProcessDTO } from "@/stores/eduProcessCreation/roadmapMng/roadmapMng.type";
import { getListCodeMng } from "@/stores/common/codeMng/codeMng.service";
import { UP_CD_ID_GRADE_LEVEL, UP_CD_ID_SEMESTER, UP_CD_TRACK } from "@/constants/common.const";
import { CodeMngModel } from "@/stores/common/codeMng/codeMng.type";

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
      dataView: {} as RoadMapEduProcessDTO,
      listTypeSbjt: [] as CodeMngModel[],
      listGrade: [] as CodeMngModel[],
      listTerm: [] as CodeMngModel[],
    };
  },
  async beforeMount() {
    this.storeCommon.setLoading(true);
    await getListCodeMng({upCdIdList: [UP_CD_TRACK, UP_CD_ID_GRADE_LEVEL, UP_CD_ID_SEMESTER]}).then((res) => {
      this.listTypeSbjt = res.data.data.filter((item:CodeMngModel) => item.upCdId == UP_CD_TRACK);
      this.listGrade = res.data.data.filter((item:CodeMngModel) => item.upCdId == UP_CD_ID_GRADE_LEVEL);
      this.listTerm = res.data.data.filter((item:CodeMngModel) => item.upCdId == UP_CD_ID_SEMESTER);
    })
    await getRoadMapEduProcess({eduCourseSeq: this.id}).then((res) => {
      this.dataView = res.data.data as RoadMapEduProcessDTO;
    })
    this.storeCommon.setLoading(false);
  },
  methods: {
    next() {
      this.$emit("tabChange7", 74);
    },
    back() {
      this.router.push({
        path: SCREEN.eduProcessCreation.path,
      });
    },
    getRowSpanTaltNrtgType(data: any) {
      return data.job.length;
    },
    getRowSpanEduCourse() {
      let courseData = 0;
      this.dataView.taltNrtgType.forEach((data) => {
        courseData += data.job.length;
      });
      return courseData;
    },
    getListJobAll() {
      let courseData = [] as any;

      this.dataView.taltNrtgType.forEach((data) => {
        data.job.forEach((job) => {
          courseData.push(job);
        });
      });

      return courseData;
    },
    filterSubject(
      jobData: any,
      trackType: string | number,
      termCd: string | number,
      gradeCd: string | number
    ) {
      return jobData.subject
        .filter(
          (item: any) =>
            item.trackType.includes(trackType) &&
            item.termCd == termCd &&
            item.gradeCd == gradeCd
        )
        .map((item: any) => item.subjectNm)
        .join(", ");
    },
  },
});
</script>
<style scoped>
@import url("../eduCourseCustom.css");
</style>
