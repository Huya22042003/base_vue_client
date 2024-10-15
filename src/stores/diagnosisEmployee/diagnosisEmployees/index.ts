import { defineStore } from "pinia";
import { ref } from "vue";

export const diagEmployee = defineStore("diagEmployee", () => {
  const abilitySurveySelected = ref<any>();

  const setDiagEmployeeSelected = (data) => {
    abilitySurveySelected.value = data;
  };

  const resetSelected = () => {
    abilitySurveySelected.value = null;
  };
  return {
    setDiagEmployeeSelected,
    resetSelected,
    abilitySurveySelected,
  };
});
