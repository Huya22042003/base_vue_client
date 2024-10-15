<template>
  <div class="search_section search_tab mg_b50">
    <div class="search_toggle sm">
      <div class="left">
        <div class="radio_tab_lg_wrap">
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round1"
              @change="tabChange7(71)"
              :checked="tabCheck == 71 ? true : false"
            />
            <label for="radio_round1"> 7-1.교과목 총괄도 </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round2"
              @change="tabChange7(72)"
              :checked="tabCheck == 72 ? true : false"
            />
            <label for="radio_round2"> 7-2.학기별 직무역량 연계성 </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round3"
              @change="tabChange7(73)"
              :checked="tabCheck == 73 ? true : false"
            />
            <label for="radio_round3"> 7-3.교육과정 로드맵 </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round4"
              @change="tabChange7(74)"
              :checked="tabCheck == 74 ? true : false"
            />
            <label for="radio_round4"> 7-4.교육과정 개발 결과 종합 </label>
          </p>
        </div>
      </div>
    </div>
  </div>
  <OverviewRoadmap @tabChange7="tabChange7" v-if="tabName == 'OverviewRoadmap'">
  </OverviewRoadmap>
  <LinkRoadmap @tabChange7="tabChange7" v-if="tabName == 'LinkRoadmap'">
  </LinkRoadmap>
  <RoadmapEduProcess
    @tabChange7="tabChange7"
    v-if="tabName == 'RoadmapEduProcess'"
  >
  </RoadmapEduProcess>
  <SyntheticRoadmap @nextTab="nextTab" v-if="tabName == 'SyntheticRoadmap'">
  </SyntheticRoadmap>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import OverviewRoadmap from "./OverviewRoadmap.vue";
import LinkRoadmap from "./LinkRoadmap.vue";
import SyntheticRoadmap from "./SyntheticRoadmap.vue";
import RoadmapEduProcess from "./RoadmapEduProcess.vue";
export default {
  components: {
    OverviewRoadmap,
    LinkRoadmap,
    RoadmapEduProcess,
    SyntheticRoadmap,
  },
  props: {
    stage: {
      type: Number,
      default: true,
    },
  },
  setup: () => {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      tabName: "",
      tabCheck: 71,
      stageChild: this.stage,
    };
  },
  beforeMount() {
    this.tabChange7(
      this.stageChild == 70 ? 71 : this.stageChild
    );
  },
  methods: {
    nextTab() {
      this.$emit("tabChange", 80);
    },
    tabChange7(tabId: any) {
      switch (tabId) {
        case 71:
          this.tabName = "OverviewRoadmap";
          this.tabCheck = 71;
          break;
        case 72:
          this.tabCheck = 72;
          this.tabName = "LinkRoadmap";
          break;
        case 73:
          this.tabCheck = 73;
          this.tabName = "RoadmapEduProcess";
          break;
        case 74:
          this.tabCheck = 74;
          this.tabName = "SyntheticRoadmap";
          break;
        default:
          break;
      }
      this.$emit("updateStage", this.stageChild);
    },
  },
};
</script>
