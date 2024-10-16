<template>
  <div class="search_section search_tab mg_b50">
    <div class="search_toggle sm">
      <div class="left">
        <div class="radio_tab_lg_wrap">
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round1"
              @change="stageChild < 41 ? '' : tabChange4(41)"
              :checked="tabCheck == 41 ? true : false"
              :disabled="stageChild < 41"
            />
            <label for="radio_round1">
              <!-- 4-1.분류체계 기술 -->{{
                t("eduProcessCreation.jobEduMng.title1")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round2"
              @change="stageChild < 42 ? '' : tabChange4(42)"
              :checked="tabCheck == 42 ? true : false"
              :disabled="stageChild < 42"
            />
            <label for="radio_round2">
              <!-- 4-2.직무역량 검증 -->{{
                t("eduProcessCreation.jobEduMng.title2")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round3"
              @change="stageChild < 43 ? '' : tabChange4(43)"
              :checked="tabCheck == 43 ? true : false"
              :disabled="stageChild < 43"
            />
            <label for="radio_round3">
              <!-- 4-3.하위역량 및 수행준거 검증 -->{{
                t("eduProcessCreation.jobEduMng.title3")
              }}
            </label>
          </p>
        </div>
      </div>
    </div>
  </div>
  <TechniqueEdu
    @tabChange4="tabChange4"
    @updateStage="updateStage"
    v-if="tabName == 'TechniqueEdu'"
  >
  </TechniqueEdu>
  <VerifyJob
    @tabChange4="tabChange4"
    @updateStage="updateStage"
    v-if="tabName == 'VerifyJob'"
  >
  </VerifyJob>
  <VerifyCapaChld
    @nextTab="nextTab"
    @updateStage="updateStage"
    v-if="tabName == 'VerifyCapaChld'"
  >
  </VerifyCapaChld>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import TechniqueEdu from "./TechniqueEdu.vue";
import VerifyJob from "./VerifyJob.vue";
import VerifyCapaChld from "./VerifyCapaChld.vue";
export default {
  components: {
    TechniqueEdu,
    VerifyJob,
    VerifyCapaChld,
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
      tabCheck: 41,
      stageChild: this.stage,
    };
  },
  beforeMount() {
    this.tabChange4(
      this.stageChild == 40 || this.stageChild > 43 ? 41 : this.stageChild
    );
  },
  methods: {
    updateStage(stage: number) {
      this.stageChild = stage;
    },
    nextTab() {
      this.$emit("tabChange", 50);
    },
    tabChange4(tabId: any) {
      switch (tabId) {
        case 41:
          this.tabName = "TechniqueEdu";
          this.tabCheck = 41;
          break;
        case 42:
          this.tabCheck = 42;
          this.tabName = "VerifyJob";
          break;
        case 43:
          this.tabCheck = 43;
          this.tabName = "VerifyCapaChld";
          break;
        default:
          break;
      }
      this.$emit("updateStage", this.stageChild);
    },
  },
};
</script>
