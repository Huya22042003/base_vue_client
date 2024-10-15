import { defineStore } from "pinia";
import { ref } from "vue";

export const coreMajorDiagnosisStore = defineStore(
  "coreMajorDiagnosis",
  () => {
    const status = ref<number>();
    const coreMajorSurveySelected = ref<any>();

    const setCoreMajorSurveySelected = (data) => {
      coreMajorSurveySelected.value = data;
    };

    const resetSelected = () => {
      coreMajorSurveySelected.value = null;
    };
    return {
      status,
      coreMajorSurveySelected,
      setCoreMajorSurveySelected,
      resetSelected,
    };
  }
);
