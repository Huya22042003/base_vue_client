<template>
  <div class="page_wrapper">
    <section id="content" class="content_wrapper grid_content" tabindex="0">
      <Breadcrumb :pageTitle="pageTitle"></Breadcrumb>
      <div class="radio_tab_wrap black">
        <p class="radio_tab inline">
          <input
            type="radio"
            id="tab1"
            value="tab1"
            :checked="tabSelected === 'tab1'"
          />
          <label> {{ t("jobAbilityManagement.tab1.titleTab") }}</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            id="tab2"
            value="tab2"
            :checked="tabSelected === 'tab2'"
          />
          <label> {{ t("jobAbilityManagement.tab2.titleTab") }}</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            id="tab3"
            value="tab3"
            :checked="tabSelected === 'tab3'"
          />
          <label> {{ t("jobAbilityManagement.tab3.titleTab") }}</label>
        </p>
        <p class="radio_tab inline">
          <input
            type="radio"
            id="tab4"
            value="tab4"
            :checked="tabSelected === 'tab4'"
          />
          <label> {{ t("jobAbilityManagement.tab4.titleTab") }}</label>
        </p>
      </div>
      <!-- UI Tab -->
      <div>
        <CrudJobAbility v-if="tabSelected === 'tab1'" @change-tab="changeTab" />
        <CrudChildAbility
          v-if="tabSelected === 'tab2'"
          :id="idSelected"
          @change-tab="changeTab"
        />
        <ScopeAppAndImplement
          v-if="tabSelected === 'tab3'"
          :id="idSelected"
          @change-tab="changeTab"
        />
        <DevelopmentHistory
          v-if="tabSelected === 'tab4'"
          :id="idSelected"
          @change-tab="changeTab"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import THeader from "@/layouts/components/THeader.vue";
import TFooter from "@/layouts/components/TFooter.vue";
import { commonStore } from "../../stores/common";
import LoaddingComponent from "@/components/common/loading/LoaddingComponent.vue";
import { MODE_DETAIL } from "../../constants/screen.const";
import BaseDatePicker from "@/components/common/datepicker/BaseDatePicker.vue";
import CrudJobAbility from "./listTab/CrudJobAbility.vue";
import CrudChildAbility from "./listTab/CrudChildAbility.vue";
import ScopeAppAndImplement from "./listTab/ScopeAppAndImplement.vue";
import DevelopmentHistory from "./listTab/DevelopmentHistory.vue";
import { useI18n } from "vue-i18n";

export default {
  components: {
    TFooter,
    THeader,
    Breadcrumb,
    LoaddingComponent,
    BaseDatePicker,
    CrudJobAbility,
    CrudChildAbility,
    ScopeAppAndImplement,
    DevelopmentHistory,
  },
  setup() {
    const cmn = commonStore();
    const { t } = useI18n();

    return {
      cmn,
      t,
    };
  },
  data() {
    return {
      pageTitle: this.t("jobAbilityManagement.pageTitleCrud"),
      modeScreen: "" as any,
      modeDetail: MODE_DETAIL,
      tabSelected: "tab1",
      idSelected: "",
    };
  },
  beforeMount() {
    this.modeScreen = this.$route.params.mode;

    if (this.tabSelected === "tab4") {
      this.pageTitle = this.t("jobAbilityManagement.pageHistory");
    }
  },
  methods: {
    changeTab(tabNo: string, id) {
      this.tabSelected = tabNo;
      this.idSelected = id;
      if (tabNo === "tab4") {
        this.pageTitle = this.t("jobAbilityManagement.pageHistory");
      }
    },
  },
};
</script>
