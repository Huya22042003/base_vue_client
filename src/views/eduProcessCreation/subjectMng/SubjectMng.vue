<template>
  <div class="search_section search_tab mg_b50">
    <div class="search_toggle sm">
      <div class="left">
        <div class="radio_tab_lg_wrap">
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round1"
              @change="stageChild < 51 ? '' : tabChange5(51)"
              :checked="tabCheck == 51 ? true : false"
              :disabled="stageChild < 51"
            />
            <label for="radio_round1">
              <!-- 5-1.신설 교과목 코드 신청 -->{{
                t("eduProcessCreation.subjectMng.title1")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round2"
              @change="stageChild < 52 ? '' : tabChange5(52)"
              :checked="tabCheck == 52 ? true : false"
              :disabled="stageChild < 52"
            />
            <label for="radio_round2">
              <!-- 5-2.교과목 도출 -->{{
                t("eduProcessCreation.subjectMng.title2")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round3"
              @change="stageChild < 53 ? '' : tabChange5(53)"
              :checked="tabCheck == 53 ? true : false"
              :disabled="stageChild < 53"
            />
            <label for="radio_round3">
              <!-- 5-3.교과목별 역량 매핑 -->{{
                t("eduProcessCreation.subjectMng.title3")
              }}
            </label>
          </p>
          <p class="radio_tab_lg">
            <input
              type="radio"
              id="radio_round4"
              @change="stageChild < 54 ? '' : tabChange5(54)"
              :checked="tabCheck == 54 ? true : false"
              :disabled="stageChild < 54"
            />
            <label for="radio_round4">
              <!-- 5-4.신설/폐지/동일대체교과목 지정 -->{{
                t("eduProcessCreation.subjectMng.title4")
              }}
            </label>
          </p>
        </div>
      </div>
    </div>
  </div>
  <ShowSubject
    @tabChange5="tabChange5"
    @updateStage="updateStage"
    v-if="tabName == 'ShowSubject'"
  >
  </ShowSubject>
  <CreatedSubject
    @tabChange5="tabChange5"
    @updateStage="updateStage"
    v-if="tabName == 'CreatedSubject'"
  >
  </CreatedSubject>
  <MappingSubject
    @tabChange5="tabChange5"
    @updateStage="updateStage"
    v-if="tabName == 'MappingSubject'"
  >
  </MappingSubject>
  <AssignSubject
    @nextTab="nextTab"
    @updateStage="updateStage"
    v-if="tabName == 'AssignSubject'"
  >
  </AssignSubject>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import ShowSubject from "./ShowSubject.vue";
import CreatedSubject from "./CreatedSubject.vue";
import AssignSubject from "./AssignSubject.vue";
import MappingSubject from "./MappingSubject.vue";
export default {
  components: {
    ShowSubject,
    CreatedSubject,
    AssignSubject,
    MappingSubject,
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
      tabCheck: 51,
      stageChild: this.stage,
    };
  },
  beforeMount() {
    this.tabChange5(
      this.stageChild == 50 || this.stageChild > 55 ? 51 : this.stageChild
    );
  },
  methods: {
    updateStage(stage: number) {
      this.stageChild = stage;
      if (stage > 54) {
        this.$emit("updateStage", stage)
      }
    },
    nextTab() {
      this.$emit("tabChange", 60);
    },
    tabChange5(tabId: any) {
      switch (tabId) {
        case 51:
          this.tabName = "ShowSubject";
          this.tabCheck = 51;
          break;
        case 52:
          this.tabCheck = 52;
          this.tabName = "CreatedSubject";
          break;
        case 53:
          this.tabCheck = 53;
          this.tabName = "MappingSubject";
          break;
        case 54:
          this.tabCheck = 54;
          this.tabName = "AssignSubject";
          break;
        default:
          break;
      }
      this.$emit("updateStage", this.stageChild);
    },
  },
};
</script>
