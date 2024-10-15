import { defineStore } from "pinia";
import { ref } from "vue";

export const learnAbilityDiagnosisStore = defineStore(
  "learnAbilityDiagnosis",
  () => {
    const status = ref<number>();
    const learnAbilitySurveySelected = ref<any>();

    const setLernAbilitySurveySelected = (data: any) => {
      learnAbilitySurveySelected.value = data;
    };

    const resetSelected = () => {
      learnAbilitySurveySelected.value = null;
    };
    return {
      status,
      learnAbilitySurveySelected,
      setLernAbilitySurveySelected,
      resetSelected,
    };
  }
);
