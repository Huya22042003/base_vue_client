import { SITE_ADMIN } from "@/constants/common.const";
import http from "@/utils/http";
import type { LevelOfJobAbilitySearchModel } from "./levelOfJobAbility.type";

const url = `${SITE_ADMIN}/level-of-job-ability`;

export const getLevelOfJobAbilityList = (data: LevelOfJobAbilitySearchModel) => {
  return http.post(`${url}/list`, data);
};

export const getListJob = () => {
  return http.post(`${url}/list-job`);
};
