import { defineStore } from "pinia";
import { ref } from "vue";

export const basicAcademicDiagnosisStore = defineStore(
  "basicAcademicDiagnosis",
  () => {
    const status = ref<number>();
    const baseLearnSurveySelected = ref<any>();

    const setBaseLearnSurveySelected = (data: any) => {
      baseLearnSurveySelected.value = data;
    };

    const resetSelected = () => {
      baseLearnSurveySelected.value = null;
    };
    return {
      status,
      baseLearnSurveySelected,
      setBaseLearnSurveySelected,
      resetSelected,
    };
  }
);
