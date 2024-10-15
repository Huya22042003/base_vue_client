import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { ChildAbility, CoreAbility } from "./mainAbility.type";

const url = `${SITE_ADMIN}/core-ability`;
export const createCoreAbility = (params: Array<CoreAbility>) => {
  return http.post(`${url}/`, params);
};

export const checkDupCoreAbility = (params: Array<CoreAbility>) => {
    return http.post(`${url}/check`, params);
  };

export const listCoreAbility = () => {
  return http.get(`${url}/list`);
};

export const removeCoreAbility = (params: CoreAbility) => {
  return http.put(`${url}/core`, params);
};

export const removeChildAbility = (params: ChildAbility) => {
  return http.put(`${url}/child`, params);
};

export const checkRemoveCoreAbility = (params: CoreAbility) => {
  return http.post(`${url}/vali`, params);
};

export const checkRemoveChildAbility = (params: ChildAbility) => {
  return http.post(`${url}/vali-chld`, params);
};