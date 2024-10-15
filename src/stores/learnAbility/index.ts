import { defineStore } from "pinia";
import { ref } from "vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import { LearnAbility } from "./learnAbility.type";
import {
  checkdeleteLearnAbility,
  checkdeleteLearnChldAbility,
  checkDuplicateNm,
  deleteChildAbility,
  deleteLearnAbility,
  listLearnAbility,
} from "./learnAbility.service";
export const learnAbiStore = defineStore("learnStore", () => {
  const learnList = ref<LearnAbility[]>([]);
  const status = ref<number>();
  const errorResponse = ref<any>();

  const fetchList = async () => {
    try {
      const response = await listLearnAbility();
      learnList.value = response.data.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const checkDupNm = async (params: Array<LearnAbility>) => {
    try {
      const response = await checkDuplicateNm(params);

      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

  const checkRmLearn = async (params: any) => {
    try {
      const response = await checkdeleteLearnAbility(params);

      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

  const checkRmChild = async (params: any) => {
    try {
      const response = await checkdeleteLearnChldAbility(params);

      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

  return {
    learnList,
    status,
    fetchList,
    checkRmLearn,
    checkRmChild,
    checkDupNm,
    errorResponse
  };
});
