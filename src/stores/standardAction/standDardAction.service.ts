import http from "@/utils/http";
import type { AbilityCmpnElemItem, AbilityItemSearch, AbilityItemSeq } from "./standDardAction.type";
import { SITE_ADMIN } from "@/constants/common.const";

const url = `${SITE_ADMIN}/cmpn-elem-item`;
export const createAbilityCmpnElemItem = (params: AbilityCmpnElemItem) => {
  return http.put(`${url}/`, params);
};

export const listAbilityCmpnElemItem = (params: AbilityItemSearch) => {
  return http.post(`${url}/list`, params);
};

export const detailAbilityCmpnElemItem = (params: AbilityItemSeq) => {
  return http.post(`${url}/detail`, params);
};

export const codeAndChildList = () => {
  return http.get(`${url}/search`);
};

export const getListChildAbility = (data: any) => {
  return http.post(`${url}/list-child`, data);
};

export const delAbilityCmpnElemItem = (params: string) => {
  return http.put(`${url}/delete`, params);
};