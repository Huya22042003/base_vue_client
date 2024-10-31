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
          <div
            class="search_toggle sm"
            v-if="
              eduCourseTypeCd == CD_TYPE_BACHELOR ||
              eduCourseTypeCd == CD_TYPE_SPECIAL
            "
          >
            <div class="left">
              <div class="radio_tab_lg_wrap">
                <p class="radio_tab_lg">
                  <input
                    type="radio"
                    id="radio_1"
                    :checked="picked == 'One'"
                    @change="changeTab('One')"
                    :disabled="checkTab('One')"
                  />
                  <label for="radio_1">{{
                    mode === "major"
                      ? t("createTrainingProcess.tab1")
                      : t("createTrainingProcess.tab3")
                  }}</label>
                </p>
                <p class="radio_tab_lg">
                  <input
                    type="radio"
                    id="radio_2"
                    :checked="picked == 'Two'"
                    @change="changeTab('Two')"
                    :disabled="checkTab('Two')"
                  />
                  <label for="radio_2">{{
                    mode === "major"
                      ? t("createTrainingProcess.tab2")
                      : t("createTrainingProcess.tab4")
                  }}</label>
                </p>
              </div>
            </div>
          </div>
          <template
            v-if="
              eduCourseTypeCd == CD_TYPE_BACHELOR ||
              eduCourseTypeCd == CD_TYPE_SPECIAL
            "
          >
            <div v-if="mode === 'major'">
              <MajorTab1
                :dataDetail="dataOverview"
                ref="majorTab1Ref"
                v-if="picked === 'One'"
              />
              <MajorTab2
                :dataResult="dataResult"
                :countTab2="countTab2"
                ref="majorTab2Ref"
                v-else-if="picked === 'Two'"
              />
            </div>
            <div v-else>
              <GeneralTab1
                :dataDetail="dataOverview"
                ref="generalTab1Ref"
                v-if="picked === 'One'"
              />
              <GeneralTab2
                :dataResult="dataResult"
                :countTab2="countTab2"
                ref="generalTab2Ref"
                v-else-if="picked === 'Two'"
              />
            </div>
          </template>
          <template v-else>
            <FormAddFile ref="majorTab3Ref" />
          </template>
          <div class="btn_area ta_r">
            <template
              v-if="
                eduCourseTypeCd == CD_TYPE_BACHELOR ||
                eduCourseTypeCd == CD_TYPE_SPECIAL
              "
            >
              <button
                v-if="status != STS_EDU_CQI_SUCCESS"
                class="button btn_lg btn_secondary"
                @click="saveTemp"
              >
                {{ t("common.saveTemp") }}
              </button>
              <button
                v-if="picked === 'One'"
                class="button btn_lg btn_primary ml-4"
                @click="handleNext"
              >
                {{ t("common.next") }}
              </button>
              <button
                v-if="picked === 'Two'"
                class="button btn_lg btn_primary ml-4"
                @click="saveData"
              >
                {{ t("common.save") }}
              </button>
            </template>
            <template v-else>
              <button
                class="button btn_lg btn_primary ml-4"
                @click="saveData"
              >
                {{ t("common.save") }}
              </button>
            </template>
            <button
              class="button btn_lg btn_white ml-4"
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
import { saveEduCourseCqi } from "@/stores/cqiTrainingProcess/cqiTrainingProcess.service";
import {
  CD_TYPE_BACHELOR,
  CD_TYPE_SPECIAL,
  STS_EDU_CQI_CREATE,
  STS_EDU_CQI_SUCCESS,
} from "@/constants/common.const";
import FormAddFile from "./FormAddFile.vue";

const { t } = useI18n();
const route = useRoute();
const picked = ref("");
const mode = ref<string | RouteParamValue[]>("");
const store = commonStore();
const router = useRouter();
const countTab2 = ref(0);

onMounted(() => {
  picked.value = "One";
  mode.value = route.params.mode;
});

const majorTab1Ref = ref(null);
const majorTab2Ref = ref(null);
const generalTab1Ref = ref(null);
const generalTab2Ref = ref(null);
const majorTab3Ref = ref(null);

const { proxy } = getCurrentInstance();

const dataOverview = ref();
const dataResult = ref();

const state = window.history.state;
const { deptCd, typeSeq, year, status, eduCourseTypeCd } = state;

const checkTab = (current: string) => {
  if (status != STS_EDU_CQI_SUCCESS) {
    if (!store.check) {
      if (picked.value == "One" && current == "Three") {
        return true;
      }
      return false;
    } else {
      if (picked.value == "Two" && current == "One") {
        return false;
      }
      return true;
    }
  }
  return false;
};

const changeTab = (tab: string) => {
  if (tab === "Two") {
    countTab2.value++;
  }
  if (mode.value === "major") {
    if (majorTab1Ref.value) {
      dataOverview.value = majorTab1Ref.value.getData();
    }
    if (majorTab2Ref.value) {
      dataResult.value = majorTab2Ref.value.getData();
    }
  } else {
    if (generalTab1Ref.value) {
      dataOverview.value = generalTab1Ref.value.getData();
    }
    if (generalTab2Ref.value) {
      dataResult.value = generalTab2Ref.value.getData();
    }
  }
  picked.value = tab;
};

const saveTemp = () => {
  if (mode.value === "major") {
    if (majorTab1Ref.value) {
      dataOverview.value = majorTab1Ref.value.getData();
    }
    if (majorTab2Ref.value) {
      dataResult.value = majorTab2Ref.value.getData();
    }
  } else {
    if (generalTab1Ref.value) {
      dataOverview.value = generalTab1Ref.value.getData();
    }
    if (generalTab2Ref.value) {
      dataResult.value = generalTab2Ref.value.getData();
    }
  }
  proxy
    .$swal({
      title: "",
      html: t("common.message.confirmSaveTemp"),
        confirmButtonColor: "#5D87FF",
        showCancelButton: true,
        cancelButtonColor: "#fff",
        reverseButtons: true,
        confirmButtonText: t("common.confirm"),
        cancelButtonText: t("common.cancel"),
    })
    .then((result) => {
      if (result.isConfirmed) {
        store.setLoading(true);
        const dataSave = {
          eduCursCqiSeq: "",
          year: year,
          deptCd: deptCd,
          eduCursTypeSeq: typeSeq,
          stsCd: STS_EDU_CQI_CREATE,
          usagePlan: dataOverview.value?.usagePlan,
          overview: dataOverview.value,
          evalStnrd: dataResult.value,
        };
        saveEduCourseCqi(dataSave)
          .then((res) => {
            proxy.$alert(proxy.$t("common.message.successSaveTemp"));
            handleRedirectMenu();
          })
          .finally(() => {
            store.setLoading(false);
          });
      }
    });
};

const saveData = () => {
  if (
    eduCourseTypeCd == CD_TYPE_BACHELOR ||
    eduCourseTypeCd == CD_TYPE_SPECIAL
  ) {
    if (store.check) {
      proxy.$alert(proxy.$t("common.messageValidateRequired"));
      return;
    }
  }

  if (mode.value === "major") {
    if (majorTab1Ref.value) {
      dataOverview.value = majorTab1Ref.value.getData();
    }
    if (majorTab2Ref.value) {
      dataResult.value = majorTab2Ref.value.getData();
    }
  } else {
    if (generalTab1Ref.value) {
      dataOverview.value = generalTab1Ref.value.getData();
    }
    if (generalTab2Ref.value) {
      dataResult.value = generalTab2Ref.value.getData();
    }
  }

  proxy.$confirm(t("common.message.save"), "", (isConfirm: Boolean) => {
    if (isConfirm) {
      store.setLoading(true);
      const dataSave = {
        eduCursCqiSeq: "",
        year: year,
        deptCd: deptCd,
        eduCursTypeSeq: typeSeq,
        stsCd: STS_EDU_CQI_SUCCESS,
        usagePlan: dataOverview.value?.usagePlan,
        overview: dataOverview.value,
        evalStnrd: dataResult.value,
      };
      saveEduCourseCqi(dataSave)
        .then((res) => {
          if (
            !(
              eduCourseTypeCd == CD_TYPE_BACHELOR ||
              eduCourseTypeCd == CD_TYPE_SPECIAL
            )
          ) {
            majorTab3Ref.value.saveDataFile(res.data.data);
          }
          proxy.$alert(proxy.$t("common.message.saveSuccess"), "", () => {
            handleRedirectMenu();
          });
        })
        .finally(() => {
          store.setLoading(false);
        });
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
  countTab2.value++;
};

const handleRedirectMenu = () => {
  router.push({ path: SCREEN.CQITrainingProcess.path });
};
</script>

<style scoped>
.radio_tab_lg label {
  white-space: nowrap;
  max-width: 100%;
}
</style>
