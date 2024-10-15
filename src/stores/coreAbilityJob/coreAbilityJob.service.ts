import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { CoreAbilityJobSearchModel, ChldBaseReg } from "./coreAbilityJob.type";

const url = `${SITE_ADMIN}/core-ability-job`;

export const list = (data: CoreAbilityJobSearchModel) => {
  return http.post(`${url}/list`, data);
};

export const listBaseJob = () => {
  return http.get(`${url}/listBaseJob`);
};

export const saveBaseJob = (data: ChldBaseReg) => {
  return http.post(`${url}/save`, data);
};

export const detailBaseJob = (data: String) => {
  return http.post(`${url}/detail`, data);
};
