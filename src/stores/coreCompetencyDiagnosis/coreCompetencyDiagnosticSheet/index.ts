import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  CoreAbilityListModel,
  CoreAbilitySearchModel,
  CoreAbilitySearchPopupModel,
} from "./coreCompetencyDiagnosticSheet.type";
import { getPage, getPagePopup } from "./coreCompetencyDiagnosticSheet.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";

export const coreAbilitySurveyStore = defineStore("coreAbilitySurvey", () => {
  const coreAbilitySurveyList = ref<CoreAbilityListModel[]>([]);
  const coreAbilitySurveyListPopup = ref<CoreAbilityListModel[]>([]);
  const status = ref<number>();

  const getPageCoreAbilitySurvey = async (data: CoreAbilitySearchModel) => {
    try {
      const response = await getPage(data);
      coreAbilitySurveyList.value = response.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const getPagePopupCoreAbilitySurvey = async (
    data: CoreAbilitySearchPopupModel
  ) => {
    try {
      const response = await getPagePopup(data);
      coreAbilitySurveyListPopup.value = response.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  return {
    getPageCoreAbilitySurvey,
    coreAbilitySurveyList,
    status,
    getPagePopupCoreAbilitySurvey,
    coreAbilitySurveyListPopup,
  };
});
