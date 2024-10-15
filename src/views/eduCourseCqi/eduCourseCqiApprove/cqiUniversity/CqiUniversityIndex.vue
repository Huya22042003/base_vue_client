<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="box dp_block">
      <div class="radio_tab_wrap black">
        <p class="radio_tab inline">
          <input
            type="radio"
            id="radio_round_black1"
            name="radio_tab"
            @click="tabChange(10)"
            :checked="tabCheck == 10"
          />
          <label for="radio_round_black1"
            >교육과정 자체평가 개요(교양)</label
          >
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            id="radio_round_black2"
            name="radio_tab"
            @click="tabChange(20)"
            :checked="tabCheck == 20"
          />
          <label for="radio_round_black2">교육과정 자체평가 결과 및 개선계획(교양)</label>
        </p>
      </div>
    </div>
    <CqiUniversityOverview v-if="tabName == 'CqiUniversityOverview'" />
    <CqiUniversityResult v-if="tabName == 'CqiUniversityResult'" />
  </section>
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import CqiUniversityOverview from "./CqiUniversityOverview.vue";
import CqiUniversityResult from "./CqiUniversityResult.vue";

export default {
  components: {
    CqiUniversityOverview,
    CqiUniversityResult
  },
  props: {
    dataDetail: {
      type: Object,
    },
  },
  setup() {
    const router = useRouter();
    const storeCommon = commonStore();
    const { t } = useI18n();
    const id = ref<string>();

    return {
      router,
      storeCommon,
      t,
      id,
    };
  },
  data() {
    return {
      tabCheck: 10,
      tabName: "CqiUniversityOverview",
      pageTitle: "교육과정CQI 작성",
      breadcrumbItems: [],
    };
  },
  beforeMount() {},
  methods: {
    tabChange(tabId: any) {
      switch (tabId) {
        case 10:
          this.tabCheck = 10;
          this.tabName = "CqiUniversityOverview";
          break;
        case 20:
          this.tabCheck = 20;
          this.tabName = "CqiUniversityResult";
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
