import http from "@/utils/http";
import { SITE_ADMIN } from "@/constants/common.const";
import type {
  WisePrideCreDTO
  , WisePrideId
  , ProfChldId
  , ProfId
  , WisePrideSubDetailDTO
  , WisePrideAbiSearch
} from "./profAbility.type";

const url = `${SITE_ADMIN}/profAbility`;

export const createProf = (params: WisePrideCreDTO) => {
  return http.post(`${url}/regProf/create`, params);
};

export const listProf = (params: WisePrideAbiSearch) => {
  return http.post(`${url}/regProf/`, params);
};

export const checkProf = (params: WisePrideCreDTO) => {
  return http.post(`${url}/check`, params);
};

export const deleteProg = (params: String) => {
  return http.put(`${url}/deleteProg`, params);
};

export const detailProf = (params: WisePrideId) => {
  return http.post(`${url}/regProf/detail`, params);
};

export const checkDelete = (params: String) => {
  return http.post(`${url}/regProf/checkDel`, params);
};

export const deleteProf = (params: WisePrideId) => {
  return http.put(`${url}/regProf/delete`, params);
};


export const detailSubWise = (data: WisePrideId) => {
  return http.post(`${url}/subProf/detailSub`, data);
};

export const checkDelProfChld1 = (params: ProfChldId) => {
  return http.post(`${url}/subProf/checkDelChld`, params);
};

export const checkDelProf = (params: ProfId) => {
  return http.post(`${url}/subProf/checkDelProf`, params);
};

export const checkDelAllProf = (params: ProfChldId) => {
  return http.post(`${url}/subProf/checkDelAll`, params);
};

export const delAllWisePride = (params: WisePrideId) => {
  return http.post(`${url}/subProf/delSubAll`, params);
};

export const createProfChld = (params: WisePrideSubDetailDTO) => {
  return http.post(`${url}/subProf/create`, params);
};

export const editSubProf = (params: WisePrideSubDetailDTO) => {
  return http.post(`${url}/subProf/updSub`, params);
};

export const updateProf = (params: WisePrideCreDTO) => {
  return http.post(`${url}/regProf/updateProf`, params);
};