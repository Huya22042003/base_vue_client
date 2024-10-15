
import http from "@/utils/http";
import type { LearnAbility } from "./learnAbility.type";
import { SITE_ADMIN } from "@/constants/common.const";

const url = `${SITE_ADMIN}/learn-ability`;
export const createLearnAbility = (params: Array<any>) => {
  return http.put(`${url}/`, params);
};

export const listLearnAbility = () => {
  return http.get(`${url}/list`);
};

export const checkDuplicateNm = (params: Array<LearnAbility>) => {
  return http.post(`${url}/check`, params);
}

export const checkdeleteLearnAbility = (params: any) => {
  return http.post(`${url}/vali-use`, params);
};

export const checkdeleteLearnChldAbility = (params: any) => {
  return http.post(`${url}/vali-use-chld`, params);
};