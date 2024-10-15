import { defineStore } from "pinia";
import { ref } from "vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import type { EmpAbilityChld, EmpAbilityElem, EmpAbilitySub, EmpSubSearch } from "./subEmpAbi.type";
import { checkDelAll, checkDelElem, checkDelSub, checkDuplicateNm, detailSubAbility, getListSub } from "./subEmpAbi.service";

export const empAbiStore = defineStore("empAbiStore", () => {
  const coreList = ref<EmpAbilitySub[]>([]);
  const subDetail = ref<EmpAbilitySub>();
  const status = ref<number>();
  const errorResponse = ref<any>();

  const fetchList = async (params: EmpSubSearch) => {
    try {
      const response = await getListSub(params);
      coreList.value = response.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

 
  const checkDupName = async (item: Array<EmpAbilitySub>) => {
    try {
      const response = await checkDuplicateNm(item);
      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

  const checkDelAllChld = async (item: string) => {
    try {
      const response = await checkDelAll(item);
      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

    const fetchDetail = async (params: string) => {
    try {
      const response = await detailSubAbility(params);
      subDetail.value = response.data.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  return {
    coreList,
    status,
    fetchList,
    errorResponse,
    checkDupName,
    subDetail,
    fetchDetail,
    checkDelAllChld
  };
});