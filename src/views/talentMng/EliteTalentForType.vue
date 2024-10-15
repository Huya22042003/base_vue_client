<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <Breadcrumb
      :pageTitle="pageTitle"
      :breadcrumbItems="breadcrumbItems"
    ></Breadcrumb>
    <div class="radio_tab_wrap black">
      <p v-for="tab in tabFor" :key="tab.id" class="radio_tab inline">
        <input
          type="radio"
          :id="'radio_round_black_' + tab.id"
          :checked="currentTabId === tab.id"
          @click="tabChange(tab.id, tab.name)"
        />
        <label :for="'radio_round_black_' + tab.id">{{ tab.name }}</label>
      </p>
    </div>
    <EliteTalentTab
      v-if="tabName === 'EliteTalentTab'"
      :idCapacity="currentTabId"
      :nameCapacity="currentTabName"
    >
    </EliteTalentTab>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import EliteTalentTab from "./EliteTalentTab.vue";
import type { TabAbilityGoodResponseModel } from "../../stores/talentMng/abilityGoodTalent/abilityGoodMng.type";
import { commonStore } from "../../stores/common";
import { abilityGoodTalentStore } from "../../stores/talentMng/abilityGoodTalent";

export default defineComponent({
  components: {
    EliteTalentTab,
  },

  setup() {
    const { t } = useI18n();
    const currentTabId = ref("");
    const currentTabName = ref("");
    const storeCommon = commonStore();
    const storeAbilityGoodTalent = abilityGoodTalentStore();

    return {
      t,
      currentTabId,
      currentTabName,
      storeCommon,
      storeAbilityGoodTalent,
    };
  },

  data() {
    return {
      fileArray: [],
      modalOpenModify: false,
      changeFlag: false,
      keyId: 0,
      benefitInfo: {},
      currentEduTypeNm: ref([]),
      tabName: "",
      isDisable: false,
      pageTitle: this.t("08.eliteTalentForType.title"),
      breadcrumbItems: [
        { label: this.t("common.home"), link: "/" },
        { label: "", link: "#" },
        {
          label: this.t("08.eliteTalentForType.title"),
          link: "/edu-process-creation",
        },
      ],
      tabFor: [] as Array<TabAbilityGoodResponseModel>,
    };
  },

  beforeMount() {
    this.getListTab();
  },

  methods: {
    getListTab() {
      this.storeCommon.setLoading(true);

      this.storeAbilityGoodTalent
        .getList()
        .then(() => {
          this.tabFor = this.storeAbilityGoodTalent.resultListTab;
          this.tabChange(this.tabFor[0].id, this.tabFor[0].name);
        })
        .finally(() => {
          this.storeCommon.setLoading(false);
        });
    },

    tabChange(tabId: string, tabName: string) {
      this.currentTabId = tabId;
      this.currentTabName = tabName;
      this.tabName = "EliteTalentTab";
    },
  },
});
</script>
