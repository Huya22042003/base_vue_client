import http from "@/utils/http";
import type { LearnComponent, LearnComponentRes, LearnComponentSearch } from "./learnCom.type";
import { SITE_ADMIN } from "@/constants/common.const";

const url = `${SITE_ADMIN}/learn-cmpn`;
export const createLearnComponent = (params: Array<LearnComponent>) => {
  return http.put(`${url}/`, params);
};

export const listLearnComponent = (params: LearnComponentSearch) => {
  return http.post(`${url}/list`, params);
};

export const detailLearnComponent = (params: any) => {
  return http.post(`${url}/detail`, params);
};

export const checkBeforeDel = (params: LearnComponentRes) => {
  return http.post(`${url}/vali`, params);
};

export const delCom = (params: LearnComponentRes) => {
  return http.put(`${url}/del`, params);
};

export const checkBeforeSave = (params: Array<LearnComponent>) => {
  return http.post(`${url}/check`, params);
};