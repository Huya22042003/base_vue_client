import { defineStore } from "pinia";
import { ref } from "vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { checkDelete } from "./talentAndGoals.service";

export const talentStore = defineStore("talentStore", () => {
  const status = ref<number>();
  const errorResponse = ref<any>();

  const checkRemoveSch= async (item: string) => {
    try {
      const response = await checkDelete(item);
      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

  
  return {
    status,
    checkRemoveSch,
    errorResponse,
  };
});
