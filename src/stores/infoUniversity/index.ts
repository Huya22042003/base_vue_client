import { defineStore } from "pinia";
import { ref } from "vue";
import { checkDelete } from "./infoUniversity.service";

export const infoUniStore = defineStore("infoUniStore", () => {
  const status = ref<number>();
  const errorResponse = ref<any>();

  const checkRemoveSch = async (item: string) => {
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
