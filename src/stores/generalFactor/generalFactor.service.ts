import http from "@/utils/http";
import type { AbilityCmpnElem, AbilityDetail, AbilitySearch } from "./generalFactor.type";
import { SITE_ADMIN } from "@/constants/common.const";

const url = `${SITE_ADMIN}/cmpn-elem`;
export const createAbilityCmpnElem = (params: Array<any>) => {
  return http.post(`${url}/`, params);
};

export const listCoreAndChildAbility = (params: AbilitySearch) => {
  return http.post(`${url}/list`, params);
};

export const detailCoreAndChildAbility = (params: AbilityDetail) => {
    return http.post(`${url}/detail`, params);
};

export const removeAbilityCmpn = (params: AbilityCmpnElem) => {
  return http.put(`${url}/`, params);
};

export const dupAbilityCmpn = (params: Array<any>) => {
  return http.post(`${url}/check`, params);
};

export const checkRmAbilityCmpn = (params: AbilityCmpnElem) => {
  return http.post(`${url}/vali`, params);
};
