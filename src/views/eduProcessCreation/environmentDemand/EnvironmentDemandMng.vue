<template>
  <div class="search_section search_tab mg_b50">
    <div class="search_toggle sm">
      <div class="left">
        <div class="radio_tab_lg_wrap">
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round1"
              @change="stageChild < 21 ? '' : tabChange2(21)"
              :checked="tabCheck == 21 ? true : false"
            />
            <label for="radio_round1">
              <!-- 2-1. 내부환경 분석 -->{{
                t("eduProcessCreation.environmentDemand.title1")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round2"
              @change="stageChild < 22 ? '' : tabChange2(22)"
              :checked="tabCheck == 22 ? true : false"
            />
            <label for="radio_round2">
              <!-- 2-2. 외부환경 분석 -->{{
                t("eduProcessCreation.environmentDemand.title2")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round3"
              @change="stageChild < 23 ? '' : tabChange2(23)"
              :checked="tabCheck == 23 ? true : false"
            />
            <label for="radio_round3">
              <!-- 2-3. 요구분석 및 시사점 도출 -->{{
                t("eduProcessCreation.environmentDemand.title3")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round4"
              @change="stageChild < 24 ? '' : tabChange2(24)"
              :checked="tabCheck == 24 ? true : false"
            />
            <label for="radio_round4">
              <!-- 2-4. 교육과정 개선방향 도출 -->{{
                t("eduProcessCreation.environmentDemand.title4")
              }}
            </label>
          </p>
        </div>
      </div>
    </div>
  </div>
  <EnvironmentInternal
    @tabChange2="tabChange2"
    @updateStage="updateStage"
    v-if="tabName == 'EnvironmentInternal'"
  >
  </EnvironmentInternal>
  <EnvironmentOutside
    @updateStage="updateStage"
    @tabChange2="tabChange2"
    v-if="tabName == 'EnvironmentOutside'"
  >
  </EnvironmentOutside>
  <DemandAttention
    @updateStage="updateStage"
    @tabChange2="tabChange2"
    v-if="tabName == 'DemandAttention'"
  >
  </DemandAttention>
  <DemandImprove
    @updateStage="updateStage"
    @nextTab="nextTab"
    v-if="tabName == 'DemandImprove'"
  >
  </DemandImprove>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import DemandImprove from "./DemandImprove.vue";
import EnvironmentInternal from "./EnvironmentInternal.vue";
import EnvironmentOutside from "./EnvironmentOutside.vue";
import DemandAttention from "./DemandAttention.vue";
export default {
  components: {
    DemandImprove,
    EnvironmentInternal,
    EnvironmentOutside,
    DemandAttention,
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
      tabCheck: 21,
      stageChild: this.stage,
    };
  },
  beforeMount() {
    this.tabChange2(
      this.stageChild == 20 || this.stageChild > 24 ? 21 : this.stageChild
    );
  },
  methods: {
    nextTab() {
      this.$emit("tabChange", 30);
    },
    updateStage(stage: number) {
      this.stageChild = stage;
      if (stage > 25) {
        this.$emit("updateStage", stage)
      }
    },
    tabChange2(tabId: any) {
      switch (tabId) {
        case 21:
          this.tabName = "EnvironmentInternal";
          this.tabCheck = 21;
          break;
        case 22:
          this.tabCheck = 22;
          this.tabName = "EnvironmentOutside";
          break;
        case 23:
          this.tabCheck = 23;
          this.tabName = "DemandAttention";
          break;
        case 24:
          this.tabCheck = 24;
          this.tabName = "DemandImprove";
          break;
        default:
          break;
      }
      this.$emit("updateStage", this.stageChild);
    },
  },
};
</script>
