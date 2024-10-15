import { defineStore } from "pinia";
import { ref } from "vue";

export const coreCompetencyDiagnosisStore = defineStore(
  "coreCompetencyDiagnosis",
  () => {
    const status = ref<number>();
    const coreAbilitySurveySelected = ref<any>();

    const setCoreAbilitySurveySelected = (data) => {
      coreAbilitySurveySelected.value = data;
    };

    const resetSelected = () => {
      coreAbilitySurveySelected.value = null;
    };
    return {
      status,
      coreAbilitySurveySelected,
      setCoreAbilitySurveySelected,
      resetSelected,
    };
  }
);
