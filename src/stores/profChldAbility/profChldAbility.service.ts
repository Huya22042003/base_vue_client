import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type {
  ProfAbilityCreDTO
  , ProfAbilityDTO
  , ProfAbilityChldCreDTOn
  , ProfSearch
  , ProfAbilityChldIdDTO
  , ProfAbilityIdDTO
  , ElemPageSearchDTO
  , ChldIdDTO
  , ElemDetailDTO
  , ElemIdDTO
} from "./profChldAbility.type";

const url = `${SITE_ADMIN}/profAbility`;


export const listProf = (params: ProfSearch) => {
  return http.post(`${url}/subProf/`, params);
};

export const checkDuplicateNm = (params: ProfAbilityDTO) => {
  return http.post(`${url}/subProf/check`, params);
};

export const detailProfChld = (params: string) => {
  return http.post(`${url}/subProf/detailSub`, params);
};

export const delProfChld = (params: string) => {
  return http.put(`${url}/subProf/deleteChld`, params);
};

export const delProfChldElem = (params: string) => {
  return http.put(`${url}/subProf/deleteElem`, params);
};



export const checkDelProfElem = (params: ProfAbilityChldIdDTO) => {
  return http.post(`${url}/subProf/checkDelElem`, params);
};

export const checkDelAll = (params: string) => {
  return http.post(`${url}/subProf/checkDelAll`, params);
};

export const delAll = (params: string) => {
  return http.put(`${url}/subProf/delAll`, params);
};

export const checkDelElem = (params: ProfAbilityIdDTO) => {
  return http.post(`${url}/subProf/checkDelChld`, params);
};

export const subElemList = (params: ElemPageSearchDTO) => {
  return http.post(`${url}/subElem/`, params);
};

export const subElemDetail = (params: ChldIdDTO) => {
  return http.post(`${url}/subElem/detail`, params);
};

export const saveElem = (params: ElemDetailDTO) => {
  return http.post(`${url}/subElem/saveElem`, params);
};

export const checkElemDel = (params: ElemIdDTO) => {
  return http.post(`${url}/subElem/delElem`, params);
};
