<template>
  <div class="search_section search_tab mg_b50">
    <div class="search_toggle sm">
      <div class="left">
        <div class="radio_tab_lg_wrap">
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round1"
              @change="stageChild < 11 ? '' : tabChange1(11)"
              :checked="tabCheck == 11 ? true : false"
            />
            <label for="radio_round1">
              <!-- 1-1. 현 교육과정표 -->{{
                t("eduProcessCreation.analysisAchievement.title1")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round2"
              @change="stageChild < 12 ? '' : tabChange1(12)"
              :checked="tabCheck == 12 ? true : false"
            />
            <label for="radio_round2">
              <!-- 1-2. 교육과정CQI 분석 결과 -->{{
                t("eduProcessCreation.analysisAchievement.title2")
              }}
            </label>
          </p>
        </div>
      </div>
    </div>
  </div>
  <EduProcessNow @tabChange1="tabChange1" v-if="tabName == 'EduProcessNow'">
  </EduProcessNow>
  <EduProcessResultCQI
    @nextTab="nextTab"
    v-if="tabName == 'EduProcessResultCQI'"
  >
  </EduProcessResultCQI>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import EduProcessNow from "./EduProcessNow.vue";
import EduProcessResultCQI from "./EduProcessResultCQI.vue";
export default {
  components: {
    EduProcessNow,
    EduProcessResultCQI,
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
      tabCheck: 11,
      stageChild: this.stage,
    };
  },
  beforeMount() {
    this.tabChange1(this.stageChild == 10 || this.stageChild > 12 ? 11 : this.stageChild);
  },
  methods: {
    nextTab() {
      this.$emit("tabChange", 20);
    },
    tabChange1(tabId: any) {
      switch (tabId) {
        case 11:
          this.tabName = "EduProcessNow";
          this.tabCheck = 11;
          break;
        case 12:
          this.tabCheck = 12;
          this.tabName = "EduProcessResultCQI";
          break;
        default:
          break;
      }
      this.$emit("updateStage", this.stageChild)
    },
  },
};
</script>
