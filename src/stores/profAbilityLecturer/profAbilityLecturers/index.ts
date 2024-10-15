import { defineStore } from "pinia";
import { ref } from "vue";

export const diagLecurer = defineStore("diagLecurer", () => {
  const abilitySurveySelected = ref<any>();

  const setDiagLecurerSelected = (data) => {
    abilitySurveySelected.value = data;
  };

  const resetSelected = () => {
    abilitySurveySelected.value = null;
  };
  return {
    setDiagLecurerSelected,
    resetSelected,
    abilitySurveySelected,
  };
});
