import { SITE_ADMIN, SITE_STAFF } from "@/constants/common.const";
import http from "@/utils/http";
import type { PlanDocRequest, ProfReq, SubjectPlanSearch } from "./planDoc.type";


const url = `${SITE_STAFF}/lect-plan`;
export const createPlanDoc = (params: PlanDocRequest) => {
  return http.post(`${url}/`, params);
};

export const getInfo = (params: ProfReq) => {
    return http.post(`${url}/info`, params);
};

export const detailPlan = (params: ProfReq) => {
  return http.post(`${url}/detail`, params);
};

export const listPlan = (params: SubjectPlanSearch) => {
  return http.post(`${url}/list`, params);
};

export const getMaxYear = () => {
  return http.get(`${url}/search`);
};