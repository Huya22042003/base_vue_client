<template>
  <div class="search_section search_tab mg_b50">
    <div class="search_toggle sm">
      <div class="left">
        <div class="radio_tab_lg_wrap">
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round1"
              @change="stageChild < 31 ? '' : tabChange3(31)"
              :checked="tabCheck == 31 ? true : false"
              :disabled="stageChild < 31"
            />
            <label for="radio_round1">
              <!-- 3-1. 교육과정개발운영위원회 구성 -->{{
                t("eduProcessCreation.typeTalentEdu.title1")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round2"
              @change="stageChild < 32 ? '' : tabChange3(32)"
              :checked="tabCheck == 32 ? true : false"
              :disabled="stageChild < 32"
            />
            <label for="radio_round2">
              <!-- 3-2. 교육목표 및 인재상 수립 -->{{
                t("eduProcessCreation.typeTalentEdu.title2")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round3"
              @change="stageChild < 33 ? '' : tabChange3(33)"
              :checked="tabCheck == 33 ? true : false"
              :disabled="stageChild < 33"
            />
            <label for="radio_round3">
              <!-- 3-3. 인재양성유형 설정 -->{{
                t("eduProcessCreation.typeTalentEdu.title3")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round4"
              @change="stageChild < 34 ? '' : tabChange3(34)"
              :checked="tabCheck == 34 ? true : false"
              :disabled="stageChild < 34"
            />
            <label for="radio_round4">
              <!-- 3-4. 핵심직무 선정 -->{{
                t("eduProcessCreation.typeTalentEdu.title4")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round5"
              @change="stageChild < 35 ? '' : tabChange3(35)"
              :checked="tabCheck == 35 ? true : false"
              :disabled="stageChild < 35"
            />
            <label for="radio_round5">
              <!-- 3-5. 인재양성유형 선정 결과 -->{{
                t("eduProcessCreation.typeTalentEdu.title5")
              }}
            </label>
          </p>
        </div>
      </div>
    </div>
  </div>
  <CompositionTalent
    @tabChange3="tabChange3"
    @updateStage="updateStage"
    v-if="tabName == 'CompositionTalent'"
  >
  </CompositionTalent>
  <CreatedTypeTalent
    @tabChange3="tabChange3"
    @updateStage="updateStage"
    v-if="tabName == 'CreatedTypeTalent'"
  >
  </CreatedTypeTalent>
  <SetGoalTalent
    @tabChange3="tabChange3"
    @updateStage="updateStage"
    v-if="tabName == 'SetGoalTalent'"
  >
  </SetGoalTalent>
  <SelectionTalent
    @tabChange3="tabChange3"
    @updateStage="updateStage"
    v-if="tabName == 'SelectionTalent'"
  >
  </SelectionTalent>
  <ResultTypeTalent @nextTab="nextTab" v-if="tabName == 'ResultTypeTalent'">
  </ResultTypeTalent>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import CompositionTalent from "./CompositionTalent.vue";
import CreatedTypeTalent from "./CreatedTypeTalent.vue";
import SetGoalTalent from "./SetGoalTalent.vue";
import SelectionTalent from "./SelectionTalent.vue";
import ResultTypeTalent from "./ResultTypeTalent.vue";
export default {
  components: {
    CompositionTalent,
    CreatedTypeTalent,
    SetGoalTalent,
    SelectionTalent,
    ResultTypeTalent,
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
      tabCheck: 31,
      stageChild: this.stage,
    };
  },
  beforeMount() {
    this.tabChange3(
      this.stageChild == 30 || this.stageChild > 35 ? 31 : this.stageChild
    );
  },
  methods: {
    updateStage(stage: number) {
      this.stageChild = stage;
    },
    nextTab() {
      this.$emit("tabChange", 40);
    },
    tabChange3(tabId: any) {
      switch (tabId) {
        case 31:
          this.tabName = "CompositionTalent";
          this.tabCheck = 31;
          break;
        case 32:
          this.tabCheck = 32;
          this.tabName = "CreatedTypeTalent";
          break;
        case 33:
          this.tabCheck = 33;
          this.tabName = "SetGoalTalent";
          break;
        case 34:
          this.tabCheck = 34;
          this.tabName = "SelectionTalent";
          break;
        case 35:
          this.tabCheck = 35;
          this.tabName = "ResultTypeTalent";
          break;
        default:
          break;
      }
      this.$emit("updateStage", this.stageChild);
    },
  },
};
</script>
