<template>
  <div class="content_wrap">
    <div class="grid_content">
      <div class="page_toparea">
        <h2 class="page_title">{{ t("createTrainingProcess.title") }}</h2>
      </div>
    </div>
    <div class="grid_content">
      <div class="sub_section">
        <div class="box">
          <div class="search_toggle sm">
            <div class="left">
              <div class="radio_tab_lg_wrap">
                <p class="radio_tab_lg">
                  <input
                    type="radio"
                    id="radio_1"
                    value="One"
                    v-model="picked"
                  />
                  <label for="radio_1">{{
                    t("createTrainingProcess.tab1")
                  }}</label>
                </p>
                <p class="radio_tab_lg">
                  <input
                    type="radio"
                    id="radio_2"
                    value="Two"
                    v-model="picked"
                  />
                  <label for="radio_2">{{
                    t("createTrainingProcess.tab2")
                  }}</label>
                </p>
                <p class="radio_tab_lg">
                  <input
                    type="radio"
                    id="radio_3"
                    value="Three"
                    v-model="picked"
                  />
                  <label for="radio_2">{{
                    t("createTrainingProcess.tab3")
                  }}</label>
                </p>
              </div>
            </div>
          </div>
          <div v-if="mode === 'major'">
            <MajorTab1 ref="majorTab1Ref" v-if="picked === 'One'" />
            <MajorTab2 ref="majorTab2Ref" v-else-if="picked === 'Two'" />
            <FormAddFile v-else />
          </div>
          <div v-else>
            <GeneralTab1 ref="generalTab1Ref" v-if="picked === 'One'" />
            <GeneralTab2 ref="generalTab2Ref" v-else-if="picked === 'Two'" />
            <FormAddFile v-else />
          </div>
          <div class="btn_area ta_r">
            <button 
              v-if="picked !== 'Three'" class="button btn_md btn_secondary" @click="saveTemp">
              {{ t("common.saveTemp") }}
            </button>
            <button
              v-if="picked === 'One'"
              class="button btn_md btn_primary ml-4"
              @click="handleNext"
            >
              {{ t("common.next") }}
            </button>
            <button
              v-else-if="picked === 'Two'"
              class="button btn_md btn_primary ml-4"
              @click="handleNextTwo"
            >
              {{ t("common.next") }}
            </button>
            <button
              v-else
              class="button btn_md btn_primary ml-4"
              @click="saveData"
            >
              {{ t("common.save") }}
            </button>
            <button
              class="button btn_md btn_white ml-4"
              @click="handleRedirectMenu"
            >
              {{ t("common.list") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MajorTab1 from "@/views/CQItrainingProcess/majorQualityManagement/MajorTab1.vue";
import MajorTab2 from "@/views/CQItrainingProcess/majorQualityManagement/MajorTab2.vue";
import GeneralTab1 from "@/views/CQItrainingProcess/generalQualityManagement/GeneralTab1.vue";
import GeneralTab2 from "@/views/CQItrainingProcess/generalQualityManagement/GeneralTab2.vue";
import { onMounted } from "vue";
import { type RouteParamValue, useRoute, useRouter } from "vue-router";
import { commonStore } from "@/stores/common";
import { SCREEN } from "@/router/screen";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { getCurrentInstance } from "vue";
import { EduCourseCqiReq } from "@/stores/cqiTrainingProcess/cqiTrainingProcess.type";
import { saveEduCourseCqi } from "@/stores/cqiTrainingProcess/cqiTrainingProcess.service";
import { STS_EDU_CQI_CREATE, STS_EDU_CQI_SUCCESS } from "@/constants/common.const";
import FormAddFile from "./FormAddFile.vue";

const { t } = useI18n();
const route = useRoute();
const picked = ref("");
const mode = ref<string | RouteParamValue[]>("");
const store = commonStore();
const router = useRouter();

onMounted(() => {
  picked.value = "One";
  mode.value = route.params.mode;
});

const majorTab1Ref = ref(null);
const majorTab2Ref = ref(null);
const generalTab1Ref = ref(null);
const generalTab2Ref = ref(null);

const { proxy } = getCurrentInstance();

const dataOverview = ref();
const dataResult = ref();

const state = window.history.state;
const { deptCd, typeSeq, year } = state;

const saveTemp = () => {
  
  proxy.$confirm(t("common.message.confirmSaveTemp"), "", (isConfirm: Boolean) => {
    if (isConfirm) {
      store.setLoading(true);
      if (dataOverview.value && dataResult.value) {
        const dataSave = {
          eduCursCqiSeq: "",
          year: year,
          deptCd: deptCd,
          eduCursTypeSeq: typeSeq,
          stsCd: STS_EDU_CQI_CREATE,
          usagePlan: dataOverview.value.usagePlan,
          overview: dataOverview.value,
          evalStnrd: dataResult.value,
        };
        saveEduCourseCqi(dataSave)
          .then((res) => {
            handleRedirectMenu();
            proxy.$alert(proxy.$t("common.message.successSaveTemp"));
          })
          .finally(() => {
            store.setLoading(false);
          });
      }
    }
  });
};

const saveData = () => {
  if (store.check) {
    proxy.$alert(proxy.$t("common.messageValidateRequired"));
    return;
  }

  proxy.$confirm(t("common.message.save"), "", (isConfirm: Boolean) => {
    if (isConfirm) {
      store.setLoading(true);
      if (dataOverview.value && dataResult.value) {
        const dataSave = {
          eduCursCqiSeq: "",
          year: year,
          deptCd: deptCd,
          eduCursTypeSeq: typeSeq,
          stsCd: STS_EDU_CQI_SUCCESS,
          usagePlan: dataOverview.value.usagePlan,
          overview: dataOverview.value,
          evalStnrd: dataResult.value,
        };
        saveEduCourseCqi(dataSave)
          .then((res) => {
            handleRedirectMenu();
            proxy.$alert(proxy.$t("common.message.saveSuccess"));
          })
          .finally(() => {
            store.setLoading(false);
          });
      }
    }
  });
};

const handleNext = () => {
  if (store.check) {
    proxy.$alert(proxy.$t("common.messageValidateRequired"));
    return;
  }
  if (mode.value === "major") {
    if (majorTab1Ref.value) {
      dataOverview.value = majorTab1Ref.value.getData();
    }
  } else {
    if (generalTab1Ref.value) {
      dataOverview.value = generalTab1Ref.value.getData();
    }
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  picked.value = "Two";
};

const handleNextTwo = () => {
  if (store.check) {
    proxy.$alert(proxy.$t("common.messageValidateRequired"));
    return;
  }
  if (mode.value === "major") {
    if (majorTab2Ref.value) {
      dataResult.value = majorTab2Ref.value.getData();
    }
  } else {
    if (generalTab2Ref.value) {
      dataResult.value = generalTab2Ref.value.getData();
    }
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  picked.value = "Three";
};

const handleRedirectMenu = () => {
  router.push({ path: SCREEN.CQITrainingProcess.path });
};
</script>

<style scoped>
.radio_tab_lg {
  pointer-events: none;
}
</style>
