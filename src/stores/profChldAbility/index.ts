import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  ProfAbility,
  ProfAbilityDTO,
  ProfAbilityCreDTO,
  ProfSearch,
  ProfAbilityChldIdDTO
  , ProfAbilityIdDTO
} from "./profChldAbility.type";
import {
  checkDelAll,
  checkDelProfElem,
  checkDuplicateNm,
  detailProfChld,
  listProf,
} from "./profChldAbility.service";
import { MESSAGE_ERROR_API } from "@/constants/common.const";

export const profChldStore = defineStore("profChldStore", () => {
  const status = ref<number>();
  const errorResponse = ref<any>();
  const profChldList = ref<ProfAbilityDTO[]>([]);
  const proList = ref<ProfAbility[]>([]);

  const fetchList = async (params: string) => {
    try {
      const response = await detailProfChld(params);
      profChldList.value = response.data.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  const checkDupNm = async (params: ProfAbilityDTO) => {
    try {
      const response = await checkDuplicateNm(params);
      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };


  const checkDelElem = async (params: ProfAbilityIdDTO) => {
    try {
      const response = await checkDelProfElem(params);

      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

  const checkDelAllChld = async (params: String) => {
    try {
      const response = await checkDelAll(params);

      status.value = response.status;
    } catch (error) {
      status.value = error.response.status;
      errorResponse.value = error.response.data;
    }
  };

  const fetchProfList = async (params: ProfSearch) => {
    try {
      const response = await listProf(params);
      proList.value = response.data;
      status.value = response.status;
    } catch (error) {
      throw new Error(MESSAGE_ERROR_API);
    }
  };

  return {
    profChldList,
    status,
    fetchList,
    errorResponse,
    checkDupNm,
    checkDelElem,
    checkDelAllChld,
    fetchProfList,
    proList,
  };
});
