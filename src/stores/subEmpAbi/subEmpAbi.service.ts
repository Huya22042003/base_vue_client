import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { EmpAbilityChld, EmpAbilityElem, EmpAbilitySub, EmpSubSearch } from "./subEmpAbi.type";

const url = `${SITE_ADMIN}/empAbility/subEmp`;

export const createSubAbility = (params: Array<EmpAbilitySub>) => {
  return http.post(`${url}/create`, params);
};

export const checkDuplicateNm = (params: Array<EmpAbilitySub>) => {
  return http.post(`${url}/check`, params);
};

export const detailSubAbility = (params: string) => {
  return http.post(`${url}/detailSub`, params);
};

export const checkDelSub = (params: EmpAbilityChld) => {
  return http.post(`${url}/chkDel`, params);
};

export const checkDelElem = (params: EmpAbilityElem) => {
  return http.post(`${url}/chkDelElem`, params);
};

export const getListSub = (params: EmpSubSearch) => {
  return http.post(`${url}/`, params);
};

export const checkDelAll = (params: string) => {
  return http.post(`${url}/chkDelAll`, params);
};

export const delAll = (params: string) => {
  return http.put(`${url}/delete`, params);
};