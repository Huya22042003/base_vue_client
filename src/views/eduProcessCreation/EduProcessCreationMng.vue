<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <p class="box_title_custom" v-if="data && data.year">
      {{
        data.year +
        t("05.eduProcessCreation.title2") +
        data.deptNm +
        t("05.eduProcessCreation.title3")
      }}
    </p>
    <div class="box dp_block">
      <div class="radio_tab_wrap black">
        <p class="radio_tab inline">
          <input
            type="radio"
            :key="`radio_round_black1_${checkKey}`"
            id="radio_round_black1"
            name="radio_tab"
            @click="tabChange(10)"
            :checked="tabCheck == 10"
          />
          <label for="radio_round_black1"
            >1.전년도 교육과정 운영 실적 분석</label
          >
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            :key="`radio_round_black2_${checkKey}`"
            id="radio_round_black2"
            :disabled="stage < 15"
            name="radio_tab"
            @click="tabChange(20)"
            :checked="tabCheck == 20"
          />
          <label for="radio_round_black2">2.환경분석 및 요구분석</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            :key="`radio_round_black3_${checkKey}`"
            id="radio_round_black3"
            :disabled="stage < 26"
            name="radio_tab"
            @click="tabChange(30)"
            :checked="tabCheck == 30"
          />
          <label for="radio_round_black3"
            >3.인재양성유형 설정 및 교육목표 수립</label
          >
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            :key="`radio_round_black4_${checkKey}`"
            id="radio_round_black4"
            :disabled="stage < 36"
            name="radio_tab"
            @click="tabChange(40)"
            :checked="tabCheck == 40"
          />
          <label for="radio_round_black4">4.직무 정의 및 직무모형 설정</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            :key="`radio_round_black5_${checkKey}`"
            id="radio_round_black5"
            :disabled="stage < 48"
            name="radio_tab"
            @click="tabChange(50)"
            :checked="tabCheck == 50"
          />
          <label for="radio_round_black5">5.교과목 도출</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            :key="`radio_round_black6_${checkKey}`"
            id="radio_round_black6"
            :disabled="stage < 57"
            name="radio_tab"
            @click="tabChange(60)"
            :checked="tabCheck == 60"
          />
          <label for="radio_round_black6">6.교과목 프로파일 작성</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            :key="`radio_round_black7_${checkKey}`"
            id="radio_round_black7"
            :disabled="stage < 57"
            name="radio_tab"
            @click="tabChange(70)"
            :checked="tabCheck == 70"
          />
          <label for="radio_round_black7">7.교육과정 로드맵 및 결론</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            :key="`radio_round_black8_${checkKey}`"
            id="radio_round_black8"
            :disabled="stage < 57"
            name="radio_tab"
            @click="tabChange(80)"
            :checked="tabCheck == 80"
          />
          <label for="radio_round_black8">8.교육과정개발위원회 회의록</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            :key="`radio_round_black9_${checkKey}`"
            id="radio_round_black9"
            :disabled="stage < 57"
            name="radio_tab"
            @click="tabChange(90)"
            :checked="tabCheck == 90"
          />
          <label for="radio_round_black9">9.별첨</label>
        </p>
      </div>
      <EduProcessAnalysisMng
        @tabChange="tabChange"
        :stage="stage"
        @updateStage="updateStage"
        v-if="tabName == 'EduProcessAnalysisMng'"
      >
      </EduProcessAnalysisMng>
      <EnvironmentDemandMng
        @tabChange="tabChange"
        :stage="stage"
        @updateStage="updateStage"
        v-if="tabName == 'EnvironmentDemandMng'"
      >
      </EnvironmentDemandMng>
      <TypeTalentEduMng
        @tabChange="tabChange"
        :stage="stage"
        @updateStage="updateStage"
        v-if="tabName == 'TypeTalentEduMng'"
      >
      </TypeTalentEduMng>
      <JobEduMng
        @tabChange="tabChange"
        :stage="stage"
        @updateStage="updateStage"
        v-if="tabName == 'JobEduMng'"
      >
      </JobEduMng>
      <SubjectMng
        @tabChange="tabChange"
        :stage="stage"
        @updateStage="updateStage"
        v-if="tabName == 'SubjectMng'"
      >
      </SubjectMng>
      <SubjectProfileMng
        @tabChange="tabChange"
        :stage="stage"
        @updateStage="updateStage"
        v-if="tabName == 'SubjectProfileMng'"
      >
      </SubjectProfileMng>
      <RoadmapMng
        @tabChange="tabChange"
        :stage="stage"
        @updateStage="updateStage"
        v-if="tabName == 'RoadmapMng'"
      >
      </RoadmapMng>
      <MeetingReportMng
        @tabChange="tabChange"
        :stage="stage"
        @updateStage="updateStage"
        v-if="tabName == 'MeetingReportMng'"
      >
      </MeetingReportMng>
      <AttachFileMng
        @tabChange="tabChange"
        :stage="stage"
        @updateStage="updateStage"
        v-if="tabName == 'AttachFileMng'"
      >
      </AttachFileMng>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import EduProcessAnalysisMng from "./analysisAchievement/EduProcessAnalysisMng.vue";
import { EduCourseStore } from "@/stores/eduProcessCreation";
import { commonStore } from "@/stores/common";
import EnvironmentDemandMng from "./environmentDemand/EnvironmentDemandMng.vue";
import TypeTalentEduMng from "./typeTalentEdu/TypeTalentEduMng.vue";
import JobEduMng from "./jobEduMng/JobEduMng.vue";
import SubjectMng from "./subjectMng/SubjectMng.vue";
import SubjectProfileMng from "./subjectProfile/SubjectProfileMng.vue";
import RoadmapMng from "./roadmapMng/RoadmapMng.vue";
import MeetingReportMng from "./meetingReport/MeetingReportMng.vue";
import AttachFileMng from "./attachFile/AttachFileMng.vue";
import { detailEduCourse } from "@/stores/eduProcessCreation/eduCourse/eduProcess.service";
import { EduCourseDetailDTO } from "@/stores/eduProcessCreation/eduCourse/eduProcess.type";

export default defineComponent({
  components: {
    EduProcessAnalysisMng,
    EnvironmentDemandMng,
    TypeTalentEduMng,
    JobEduMng,
    SubjectMng,
    SubjectProfileMng,
    RoadmapMng,
    MeetingReportMng,
    AttachFileMng,
  },
  setup: () => {
    const { t } = useI18n();
    const storeCommon = commonStore();
    const eduCourseStore = EduCourseStore();
    const id = window.history.state.id;

    const stage = 11;
    const parentStage = 10;
    const isFirst = window.history.state.first;

    return {
      t,
      id,
      stage,
      parentStage,
      eduCourseStore,
      storeCommon,
      isFirst,
    };
  },
  data() {
    return {
      tabName: "",
      tabCheck: 10,
      pageTitle: "교육과정개발",
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        { label: "", link: "#" },
        {
          label: "교육과정개발",
          link: "/edu-process-creation",
        },
      ],
      data: {} as EduCourseDetailDTO,
      checkKey: 1,
    };
  },
  beforeMount() {
    try {
      this.getEduCourse();
    } catch (error: any) {
      this.$swal({
        text: error.message,
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: this.t("common.confirm"),
      });
    }
  },
  methods: {
    async getEduCourse() {
      this.storeCommon.setLoading(true);
      await detailEduCourse({ eduCourseSeq: this.id }).then((res: any) => {
        this.data = res.data.data as EduCourseDetailDTO;
        this.parentStage = parseInt(this.data.parentStage);
        this.stage = parseInt(this.data.stage);
      });
      this.tabChange(this.isFirst ? 10 : this.parentStage);
      this.storeCommon.setLoading(false);
    },
    updateStage(stage: number) {
      this.stage = stage;
      this.checkKey++;
    },
    tabChange(tabId: any) {
      switch (tabId) {
        case 10:
          this.tabCheck = 10;
          this.tabName = "EduProcessAnalysisMng";
          break;
        case 20:
          if (this.stage < 20) {
            this.stage = 20;
          }
          this.tabCheck = 20;
          this.tabName = "EnvironmentDemandMng";
          break;
        case 30:
          if (this.stage < 30) {
            this.stage = 30;
          }
          this.tabCheck = 30;
          this.tabName = "TypeTalentEduMng";
          break;
        case 40:
          if (this.stage < 40) {
            this.stage = 40;
          }
          this.tabName = "JobEduMng";
          this.tabCheck = 40;
          break;
        case 50:
          if (this.stage < 50) {
            this.stage = 50;
          }
          this.tabName = "SubjectMng";
          this.tabCheck = 50;
          break;
        case 60:
          if (this.stage < 60) {
            this.stage = 60;
          }
          this.tabName = "SubjectProfileMng";
          this.tabCheck = 60;
          break;
        case 70:
          if (this.stage < 70) {
            this.stage = 70;
          }
          this.tabCheck = 70;
          this.tabName = "RoadmapMng";
          break;
        case 80:
          if (this.stage < 80) {
            this.stage = 80;
          }
          this.tabCheck = 80;
          this.tabName = "MeetingReportMng";
          break;
        case 90:
          if (this.stage < 90) {
            this.stage = 90;
          }
          this.tabCheck = 90;
          this.tabName = "AttachFileMng";
          break;
        default:
          break;
      }
    },
  },
});
</script>
<style></style>
