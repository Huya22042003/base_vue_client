import { defineStore } from "pinia";
import { ref } from "vue";
import { MESSAGE_ERROR_API } from "@/constants/common.const";
import type { WisePrideCreDTO, ProfAbiSearch } from "./profAbility.type";
import { checkDelete, checkProf, detailProf, listProf } from "./profAbility.service";

export const profStore = defineStore("profStore", () => {
  const status = ref<number>();
  const errorResponse = ref<any>();
  const profAbi = ref<WisePrideCreDTO>();
  const profAbiLst = ref<WisePrideCreDTO[]>([]);

  const fetchDetail = async (params: string) => {
    try {
      const response = await detailProf(params);
      profAbi.value = response.data.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const fetchList = async (params: ProfAbiSearch) => {
    try {
      const response = await listProf(params);
      profAbiLst.value = response.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  // const checkDupNm = async (params: WisePrideCreDTO) => {
  //   try {
  //     const response = await checkProf(params);
  //     status.value = response.status;
  //   } catch (error) {
  //     status.value = error.response.status;
  //     errorResponse.value = error.response.data;
  //   }
  // };

  // const checkDel = async (params: string) => {
  //   try {
  //     const response = await checkDelete(params);

  //     status.value = response.status;
  //   } catch (error) {
  //     status.value = error.response.status;
  //     errorResponse.value = error.response.data;
  //   }
  // };

  return {
    profAbi,
    status,
    fetchDetail,
    errorResponse,
    // checkDupNm,
    // checkDel,
    profAbiLst,
    fetchList
  };
});
