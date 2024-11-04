<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle" :breadcrumbItems="breadcrumbItems" />
      <div class="radio_tab_wrap black">
        <p class="radio_tab inline">
          <input
            type="radio"
            id="tab1"
            value="tab1"
            :checked="tabSelected === 'tab1'"
            @change="changeTab('tab1')"
          />
          <label for="tab1"> {{ t("levelJobPerformance.tab1") }}</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            id="tab2"
            value="tab2"
            :checked="tabSelected === 'tab2'"
            @change="changeTab('tab2')"
          />
          <label for="tab2"> {{ t("levelJobPerformance.tab2") }}</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            id="tab3"
            value="tab3"
            :checked="tabSelected === 'tab3'"
            @change="changeTab('tab3')"
          />
          <label for="tab3"> {{ t("levelJobPerformance.tab3") }}</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            id="tab4"
            value="tab4"
            :checked="tabSelected === 'tab4'"
            @change="changeTab('tab4')"
          />
          <label for="tab4"> {{ t("levelJobPerformance.tab4") }}</label>
        </p>
      </div>
      <div class="">
        <LevelOfStudent v-if="tabSelected === 'tab1'" />
        <LevelOfJobAbility v-if="tabSelected === 'tab2'" />
        <LevelOfDept v-if="tabSelected === 'tab3'" />
        <LevelOfSchool v-if="tabSelected === 'tab4'" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { commonStore } from "@/stores/common";
import LevelOfStudent from "./LevelOfStudent.vue";
import LevelOfJobAbility from "./LevelOfJobAbility.vue";
import LevelOfDept from "./LevelOfDept.vue";
import LevelOfSchool from "./LevelOfSchool.vue";

export default defineComponent({
  components: { LevelOfStudent, LevelOfJobAbility, LevelOfDept, LevelOfSchool },
  setup() {
    const { t } = useI18n();
    const cmn = commonStore();
    return { t, cmn };
  },
  data() {
    return {
      breadcrumbItems: [],
      pageTitle: this.t("levelJobPerformance.pageTitle"),
      tabSelected: "tab3",
    };
  },
  beforeMount() {},
  methods: {
    search() {},
    reset() {},
    changeTab(tab: string) {
      this.tabSelected = tab;
    },
  },
});
</script>

<style scoped lang="scss"></style>
